/**
 * Copyright © 2023 Johnson & Johnson
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

import { BodilessMobxStore } from '@bodiless/core';

export type Node = {
  node: {
    content: string;
    name: string;
  };
};

export type Data = {
  [collection: string]: Node[];
};

export default class NextMobxStore extends BodilessMobxStore<Data> {
  // eslint-disable-next-line class-methods-use-this
  protected parseData(data: Data) {
    const result = new Map();
    Object.keys(data).forEach(collection => {
      if (data[collection] === null) return;
      data[collection].forEach(({ node }) => {
        try {
          // Namespace the key name to the query name.
          const key = `${collection}${BodilessMobxStore.nodeChildDelimiter}${node.name}`;
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
}
