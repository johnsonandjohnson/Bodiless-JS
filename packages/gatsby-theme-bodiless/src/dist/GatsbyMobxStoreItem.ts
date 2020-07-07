/**
 * Copyright © 2020 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import path from 'path';
import {
  observable, action,
} from 'mobx';
// eslint-disable-next-line import/no-cycle
import GatsbyMobxStore from './GatsbyMobxStore';
import { ItemStateEvent } from './types';

enum ItemState {
  Clean,
  Flushing,
  Locked,
  Queued,
}

export const DEFAULT_REQUEST_DELAY = 500;
const MAXIMUM_REQUEST_DELAY = 5 * 60 * 1000; // 5 minutes

export default class GatsbyMobxStoreItem {
  @observable data = {};

  @observable state: ItemState = ItemState.Clean;

  @observable isDeleted = false;

  key: string;

  store: GatsbyMobxStore;

  lockTimeout?: NodeJS.Timeout;

  requestTimeout?: NodeJS.Timeout;

  requestDelay: number = DEFAULT_REQUEST_DELAY;

  private shouldAccept() {
    const isClean = this.state === ItemState.Clean;
    return isClean;
  }

  // eslint-disable-next-line class-methods-use-this
  private shouldSave() {
    const saveEnabled = (process.env.BODILESS_BACKEND_SAVE_ENABLED || '1') === '1';
    // Determine if the resource path is for a page created for preview purposes
    // we do not want to save data for these pages
    const resourcePath = this.getResoucePath();
    const isPreviewTemplatePage = resourcePath.includes(path.join('pages', '___templates'));
    return saveEnabled && !isPreviewTemplatePage;
  }

  @action private setData(data: any) {
    this.data = data;
    this.isDeleted = false;
  }

  @action private setState(state: ItemState) {
    this.state = state;
  }

  private updateState(event: ItemStateEvent) {
    switch (event) {
      case ItemStateEvent.UpdateFromBrowser:
        if (this.state === ItemState.Clean || this.state === ItemState.Locked) {
          this.scheduleRequest();
        }
        this.setState(ItemState.Queued);
        break;
      case ItemStateEvent.UpdateFromServer:
        break;
      case ItemStateEvent.OnRequestStart:
        this.setState(ItemState.Flushing);
        break;
      case ItemStateEvent.OnRequestEnd:
        this.requestDelay = DEFAULT_REQUEST_DELAY;
        if (this.state === ItemState.Queued) {
          this.scheduleRequest();
          break;
        }
        // Lock the item for a period of time before setting it to clean
        // So that mitigate the problem with stale data coming from the server
        this.setState(ItemState.Locked);
        this.setLockTimeout();
        break;
      case ItemStateEvent.OnRequestError:
        // incrementally increasing time between each subsequent retry
        // ensure new delay is not greater than defined maximum
        this.requestDelay = Math.min(this.requestDelay * 2, MAXIMUM_REQUEST_DELAY);
        this.scheduleRequest();
        this.setState(ItemState.Queued);
        break;
      case ItemStateEvent.OnLockTimeout:
        if (this.state === ItemState.Locked) {
          this.state = ItemState.Clean;
        }
        break;
      default:
        throw new Error('Invalid item event specified.');
    }
  }

  private getResoucePath() {
    // Extract the collection name (query alias) from the left-side of the key name.
    const [collection, ...rest] = this.key.split('$');
    // Re-join the rest of the key's right-hand side.
    const fileName = rest.join('$');

    // The query alias (collection) determines the filesystem location
    // where to store the JSON data files.
    // TODO: Don't hardcode 'pages' and provide mechanism for shared (cross-page) content.
    // const resourcePath = path.join('pages', this.store.slug || '', fileName);
    const resourcePath = collection === 'Page'
      ? path.join('pages', this.store.slug || '', fileName)
      : path.join('site', fileName);
    return resourcePath;
  }

  private request() {
    this.updateState(ItemStateEvent.OnRequestStart);
    if (this.shouldSave()) {
      const requestPromise = this.isDeleted
        ? this.store.client.deletePath(this.getResoucePath())
        : this.store.client.savePath(this.getResoucePath(), this.data);
      requestPromise
        .then(() => this.updateState(ItemStateEvent.OnRequestEnd))
        .catch(() => this.updateState(ItemStateEvent.OnRequestError));
    } else {
      this.updateState(ItemStateEvent.OnRequestEnd);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private scheduleRequest() {
    if (this.requestTimeout !== undefined) {
      clearTimeout(this.requestTimeout);
    }
    this.requestTimeout = setTimeout(this.request.bind(this), this.requestDelay);
  }

  private setLockTimeout() {
    if (this.lockTimeout !== undefined) {
      clearTimeout(this.lockTimeout);
    }
    this.lockTimeout = setTimeout(() => {
      this.updateState(ItemStateEvent.OnLockTimeout);
    }, 10000);
  }

  constructor(
    store: GatsbyMobxStore,
    key: string,
    initialData = {},
    event = ItemStateEvent.UpdateFromBrowser,
  ) {
    this.store = store;
    this.key = key;
    this.setData(initialData);
    this.updateState(event);
  }

  update(data = {}, event = ItemStateEvent.UpdateFromBrowser) {
    switch (event) {
      case ItemStateEvent.UpdateFromBrowser:
        this.setData(data);
        this.updateState(event);
        break;
      case ItemStateEvent.UpdateFromServer:
        if (this.shouldAccept()) {
          this.setData(data);
          this.updateState(event);
        }
        break;
      default:
        throw new Error('Invalid item event specified.');
    }
  }

  delete() {
    this.isDeleted = true;
    this.updateState(ItemStateEvent.UpdateFromBrowser);
  }

  isPending() {
    return this.state === ItemState.Flushing || this.state === ItemState.Queued;
  }

  isClean() {
    return this.state === ItemState.Clean;
  }
}
