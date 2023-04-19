/* eslint-disable class-methods-use-this */
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

import type { BodilessStoreBackend, BodilessStoreConfig, BodilessStore } from './types';

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

  store = new Map<string, any>();

  client: BodilessStoreBackend|undefined;

  slug: string|undefined;

  data: any = {};

  constructor(config: BodilessStoreConfig = {}) {
    this.slug = config.slug;
    this.client = config.client;
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

  getPendingItems() {
    return [];
  }

  updateData(rawData: D) {}

  getKeys = () => Array.from(this.store.keys());

  getNode = (keyPath: string[]) => {
    const key = keyPath.join(BodilessMobxStore.nodeChildDelimiter);
    const item = this.store.get(key);
    const storeValue = item && !item.isDeleted ? item.data : null;
    const dataValue = this.data[key];
    return storeValue || dataValue || {};
  };

  setItem = () => {};

  deleteItem = () => {};

  /**
     * Mobx action saves or updates items.
     */
  setNode = () => {};

  getChildrenNodes = (keyPath: string[]) => {
    const key = keyPath.join(BodilessMobxStore.nodeChildDelimiter);
    const children = Array.from(this.store)
      .filter(item => item[0].indexOf(key) === 0 && item[0] !== key);
    return children;
  };

  deleteNode = () => {};

  hasError = () => false;
}
