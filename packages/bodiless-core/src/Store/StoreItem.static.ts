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

import type { BodilessStoreConfig } from './types';
import { ItemState, ItemStateEvent } from './types';

export const DEFAULT_REQUEST_DELAY = 2000;

export class StoreItem {
  data = {};

  state: ItemState = ItemState.Clean;

  isDeleted = false;

  hasFlushingError = false;

  key: string;

  storeConfig: BodilessStoreConfig;

  lockTimeout?: ReturnType<typeof setTimeout>;

  requestTimeout?: ReturnType<typeof setTimeout>;

  requestDelay: number = DEFAULT_REQUEST_DELAY;

  private shouldAccept() {
    const isClean = this.state === ItemState.Clean;
    return isClean;
  }

  // eslint-disable-next-line class-methods-use-this
  protected shouldSave() {
    return false;
  }

  protected setData(data: any) {
    this.data = data;
    this.isDeleted = false;
  }

  protected setState(state: ItemState) {
    this.state = state;
  }

  private updateState(event: ItemStateEvent) {
    switch (event) {
      case ItemStateEvent.UpdateFromBrowser:
        this.setState(ItemState.Queued);
        break;
      case ItemStateEvent.UpdateFromServer:
        break;
      case ItemStateEvent.OnRequestStart:
        this.setState(ItemState.Flushing);
        break;
      case ItemStateEvent.OnRequestEnd:
        this.requestDelay = DEFAULT_REQUEST_DELAY;
        this.hasFlushingError = false;
        // Lock the item for a period of time before setting it to clean
        // So that mitigate the problem with stale data coming from the server
        this.setState(ItemState.Locked);
        this.setLockTimeout();
        break;
      case ItemStateEvent.OnRequestError:
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

  private setLockTimeout() {
    if (this.lockTimeout !== undefined) {
      clearTimeout(this.lockTimeout);
    }
    this.lockTimeout = setTimeout(() => {
      this.updateState(ItemStateEvent.OnLockTimeout);
    }, 10000);
  }

  constructor(
    storeConfig: BodilessStoreConfig,
    key: string,
    initialData = {},
    event = ItemStateEvent.UpdateFromBrowser,
  ) {
    this.storeConfig = storeConfig;
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
