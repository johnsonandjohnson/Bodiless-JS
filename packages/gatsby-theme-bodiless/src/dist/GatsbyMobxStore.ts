/**
 * Copyright © 2019 Johnson & Johnson
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
  observable,
  action,
  reaction,
  IReactionDisposer,
} from 'mobx';
import { AxiosPromise } from 'axios';
// import isEqual from 'react-fast-compare';
import BackendClient from './BackendClient';
import addPageLeaver from './addPageLeaver';

export type DataSource = {
  slug: string,
};

type GatsbyNode = {
  node: {
    content: string;
    name: string;
  };
};

export type GatsbyData = {
  [collection: string]: {
    edges: GatsbyNode[];
  };
};

// const Logger = require('../service/Logger.js');

// const logger = new Logger('GatsbyMobxStore', HttpService);

const nodeChildDelimiter = '$';

type Client = {
  savePath(resourcePath: string, data: any): AxiosPromise<any>;
};

export enum ItemState {
  Clean,
  Dirty,
  Flushing,
  Locked,
}

enum ItemStateEvent {
  UpdateFromServer,
  UpdateFromBrowser,
  BeginPostData,
  EndPostData,
}

class Item {
  @observable data = {};

  @observable state: ItemState = ItemState.Clean;

  key: string;

  store: GatsbyMobxStore;

  dispose?: IReactionDisposer;

  private shouldAccept() {
    return this.isClean();
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
  }

  @action private updateState(event: ItemStateEvent) {
    switch (event) {
      case ItemStateEvent.UpdateFromBrowser:
        this.state = ItemState.Dirty;
        break;
      case ItemStateEvent.UpdateFromServer:
        // If an update happens from the server
        // Then we do not update state
        break;
      case ItemStateEvent.BeginPostData:
        this.state = ItemState.Flushing;
        break;
      case ItemStateEvent.EndPostData:
        // If an update happens while flushing, the status will be set to dirty.
        // In this case we don't want to reset it to clean.
        if (this.state === ItemState.Dirty) {
          break;
        }
        // Lock the item for a period of time before setting it to clean
        // So that mitigate the problem with stale data coming from the server
        this.state = ItemState.Locked;
        setTimeout(() => {
          this.state = this.state === ItemState.Locked ? ItemState.Clean : this.state;
        }, 10000);
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

  private enableDataTracking() {
    if (this.shouldSave()) {
      const preparePostData = () => (this.state === ItemState.Dirty ? this.data : null);
      // Post this.data back to filesystem if item state is dirty.
      const postData = (data: {} | null) => {
        if (!data) {
          return;
        }
        this.updateState(ItemStateEvent.BeginPostData);
        this.store.client.savePath(this.getResoucePath(), data)
          .then(() => this.updateState(ItemStateEvent.EndPostData));
      };
      this.dispose = reaction(preparePostData, postData, {
        delay: 2000,
      });
    }
  }

  constructor(
    store: GatsbyMobxStore,
    key: string,
    initialData = {},
    event = ItemStateEvent.UpdateFromBrowser,
  ) {
    this.store = store;
    this.key = key;
    this.enableDataTracking();
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

  isPending() {
    return this.state === ItemState.Dirty || this.state === ItemState.Flushing;
  }

  isClean() {
    return this.state === ItemState.Clean;
  }
}

/**
 * Query names returned by GraphQL as object keys, with query results
 * contained in the edges property.
 *
 * Query names can be dynamic therefore is best to not hardcode the query names.
 */

export default class GatsbyMobxStore {
  @observable store = new Map<string, Item>();

  client: Client;

  slug: string | null = null;

  data: any;

  constructor(nodeProvider: DataSource) {
    this.setNodeProvider(nodeProvider);
    this.client = new BackendClient();
    addPageLeaver(this.getPendingItems.bind(this));
  }

  private getPendingItems() {
    return Array.from(this.store.values())
      .filter(item => item.isPending());
  }

  setNodeProvider(nodeProvider: DataSource) {
    this.slug = nodeProvider.slug;
  }

  // eslint-disable-next-line class-methods-use-this
  private parseData(gatsbyData: GatsbyData): Map<string, string> {
    const result = new Map();
    Object.keys(gatsbyData).forEach(collection => {
      if (gatsbyData[collection] === null) return;
      gatsbyData[collection].edges.forEach(({ node }) => {
        try {
          // Namespace the key name to the query name.
          const key = `${collection}${nodeChildDelimiter}${node.name}`;
          const data = JSON.parse(node.content);
          result.set(key, data);
        } catch (e) {
          // console.log(e);
          // Just ignore any nodes which fail to parse.
        }
      });
    });
    return result;
  }

  /**
   * Called at initial page render to initialize our data from the Gatsby Page Query.
   * Note - we just copy the results to our unobserved data structure unless modifications
   * have been made, in which case we update the observable store.
   *
   * @param gatsbyData
   */
  updateData(gatsbyData: GatsbyData) {
    // The gatsbyData parameter comes in as undefined when there is no query data.
    if (gatsbyData === undefined) {
      return;
    }
    this.data = {};
    const { store } = this;

    const parsedData = this.parseData(gatsbyData);
    // Add all query results into the Mobx store.
    parsedData.forEach((data, key) => {
      const existingData = store.get(key);
      // TODO: Determine why isEqual gives (apparently) false positives for RGLGrid data.
      // if (!existingData || !isEqual(existingData.data, data)) {

      // Invoke Mobx @action to update store.
      if (
        !existingData
        || JSON.stringify(existingData.data) !== JSON.stringify(data)
      ) {
        this.setNode([key], data, ItemStateEvent.UpdateFromServer);
      }
    });
    // Remove Mobx store entries that are not present in query results
    Array.from(this.store.keys()).forEach(key => {
      if (!parsedData.has(key)) {
        const item = this.store.get(key);
        // The item should not be removed if it is not clean
        // as far as it may not be delivered to the server yet
        if (item!.isClean()) {
          this.deleteItem(key);
        }
      }
    });
  }

  getKeys = () => Array.from(this.store.keys());

  getNode = (keyPath: string[]) => {
    const key = keyPath.join(nodeChildDelimiter);
    const item = this.store.get(key);
    const storeValue = item ? item.data : null;
    const dataValue = this.data[key];
    return storeValue || dataValue || {};
  };

  @action setItem = (key: string, item: Item) => {
    this.store.set(key, item);
  };

  @action deleteItem = (key: string) => {
    this.store.delete(key);
  };

  /**
   * Mobx action saves or updates items to GatsbyMobxStore.store.
   */
  setNode = (keyPath: string[], value = {}, event = ItemStateEvent.UpdateFromBrowser) => {
    const key = keyPath.join(nodeChildDelimiter);
    const item = this.store.get(key);
    if (item) {
      item.update(value, event);
    } else {
      this.setItem(key, new Item(this, key, value, event));
    }
  };
}
