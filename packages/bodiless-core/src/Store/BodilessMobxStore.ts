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
  observable, action, makeObservable,
} from 'mobx';
import { StoreItem } from './StoreItem';
import type { BodilessStoreBackend, BodilessStoreConfig, BodilessStore } from './types';
import { ItemStateEvent } from './types';
import addPageLeaver from './addPageLeaver';

export type DataSource = {
  slug: string,
};

// const Logger = require('../service/Logger.js');

// const logger = new Logger('BodilessMobxStore', HttpService);

/**
 * The bodiless store manages a key-value collection of content nodes. These
 * are observable, so that observer components will re-render when relevant
 * data changres.
 *
 * The store also includes handles data serialization using an injectible
 * backend client.
 *
 * Note this is an abstract class. You must implement the `parseData`
 * method to transform the raw data received by the store into a string map.
 */
export abstract class BodilessMobxStore<D> implements BodilessStore<D> {
  static nodeChildDelimiter = '$';

  @observable store = new Map<string, StoreItem>();

  client: BodilessStoreBackend|undefined;

  slug: string|undefined;

  data: any = {};

  constructor(config: BodilessStoreConfig = {}) {
    makeObservable(this);
    this.slug = config.slug;
    this.client = config.client;
    addPageLeaver(this.getPendingItems.bind(this));
  }

  /**
   * Implement this method to transform incoming data.
   *
   * @param rawData
   * The raw data received by the store.
   *
   * @returns
   * A map of bodiless nodes.
   */
  protected abstract parseData(rawData: D): Map<string, any>;

  /**
   * Returns a list of items which have not yet been seriaized.
   */
  getPendingItems() {
    return Array.from(this.store.values())
      .filter(item => item.isPending());
  }

  /**
   * Called at initial page render to initialize our data.
   * Note - we just copy the results to our unobserved data structure unless modifications
   * have been made, in which case we update the observable store.
   *
   * @param rawData
   * The data with which to update the store. Should inclue both page level and site level
   * data necessary to render a page.
   */
  updateData(rawData: D) {
    if (rawData === undefined) {
      return;
    }
    this.data = {};
    const { store } = this;

    const parsedData = this.parseData(rawData);
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
    const key = keyPath.join(BodilessMobxStore.nodeChildDelimiter);
    const item = this.store.get(key);
    const storeValue = item && !item.isDeleted ? item.data : null;
    const dataValue = this.data[key];
    return storeValue || dataValue || {};
  };

  @action setItem = (key: string, item: StoreItem) => {
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
     * Mobx action saves or updates items.
     */
  setNode = (keyPath: string[], value = {}, event = ItemStateEvent.UpdateFromBrowser) => {
    const key = keyPath.join(BodilessMobxStore.nodeChildDelimiter);
    const item = this.store.get(key);
    if (item) {
      item.update(value, event);
    } else {
      this.setItem(key, new StoreItem(this, key, value, event));
    }
  };

  getChildrenNodes = (keyPath: string[]) => {
    const key = keyPath.join(BodilessMobxStore.nodeChildDelimiter);
    const children = Array.from(this.store)
      .filter(item => item[0].indexOf(key) === 0 && item[0] !== key);
    return children;
  };

  deleteNode = (keyPath: string[]) => {
    const children = this.getChildrenNodes(keyPath);
    children.forEach(child => {
      this.deleteItem(child[0]);
    });
    const key = keyPath.join(BodilessMobxStore.nodeChildDelimiter);
    this.deleteItem(key);
  };

  hasError = () => {
    const itemsWithError = Array.from(this.store.values())
      .filter(item => item.hasFlushingError);
    return itemsWithError.length > 0;
  };
}
