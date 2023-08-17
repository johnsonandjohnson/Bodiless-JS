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
import { StoreItem } from './StoreItem.bl-edit';
import type { BodilessStoreConfig } from './types';
import { addPageLeaver } from './util';
import { BodilessMobxStore as StaticBodilessMobxStore } from './BodilessMobxStore.static';

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
export abstract class BodilessMobxStore<D> extends StaticBodilessMobxStore<D> {
  static nodeChildDelimiter = '$';

  @observable store = new Map<string, StoreItem>();

  constructor(config: BodilessStoreConfig = {}) {
    super(config);
    makeObservable(this);
    addPageLeaver(this.getPendingItems.bind(this));
  }

  @action setItem(key: string, item: StoreItem) {
    super.setItem(key, item);
  }

  @action deleteItem(key: string, soft = true) {
    return super.deleteItem(key, soft);
  }
}
