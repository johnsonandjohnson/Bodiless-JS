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

import {
  observable, action,
} from 'mobx';
import { AxiosPromise } from 'axios';
// import isEqual from 'react-fast-compare';
import BackendClient from './BackendClient';
import addPageLeaver from './addPageLeaver';
// eslint-disable-next-line import/no-cycle
import Item from './GatsbyMobxStoreItem';
import { ItemStateEvent } from './types';

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
  deletePath(resourcePath: string): AxiosPromise<any>;
};

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

  data: any = {};

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
          this.deleteItem(key, false);
        }
      }
    });
  }

  getKeys = () => Array.from(this.store.keys());

  getNode = (keyPath: string[]) => {
    const key = keyPath.join(nodeChildDelimiter);
    const item = this.store.get(key);
    const storeValue = item && !item.isDeleted ? item.data : null;
    const dataValue = this.data[key];
    return storeValue || dataValue || {};
  };

  @action setItem = (key: string, item: Item) => {
    this.store.set(key, item);
  };

  @action deleteItem = (key: string, soft = true) => {
    if (soft) {
      const item = this.store.get(key);
      return item && item.delete();
    }
    return this.store.delete(key);
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

  getChildrenNodes = (keyPath: string[]) => {
    const key = keyPath.join(nodeChildDelimiter);
    const children = Array.from(this.store)
      .filter(item => item[0].indexOf(key) === 0 && item[0] !== key);
    return children;
  };

  deleteNode = (keyPath: string[]) => {
    const children = this.getChildrenNodes(keyPath);
    children.forEach(child => {
      this.deleteItem(child[0]);
    });
    const key = keyPath.join(nodeChildDelimiter);
    this.deleteItem(key);
  };

  hasError = () => {
    const itemsWithError = Array.from(this.store.values())
      .filter(item => item.hasFlushingError);
    return itemsWithError.length > 0;
  };
}
