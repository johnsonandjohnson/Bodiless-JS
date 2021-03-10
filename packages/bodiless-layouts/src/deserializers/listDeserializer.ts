/**
 * Copyright © 2021 Johnson & Johnson
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

import { v4 } from 'uuid';
import type { FlowContainerItem, Deserializer } from './htmlDeserializer';
import { createFlowContainerItem } from './createFlowContainerItem';

type ListData = {
  [ itemNodeKey: string ] : any;
};

const deserializeList = (item: FlowContainerItem, html: string) => {
  const domParser = new DOMParser();
  const parsed = domParser.parseFromString(html, 'text/html');
  let result: ListData = {
    [item.uuid]: {
      items: [],
    },
  };
  const listElement = parsed.body.firstElementChild;
  if (listElement === null) return result;
  Array.from(listElement.children).forEach(listItem => {
    if (listItem.tagName === 'LI') {
      const itemKey = v4();
      result[item.uuid].items.push(itemKey);
      const linkNodeKey = `${item.uuid}$${itemKey}$link`;
      const textNodeKey = `${item.uuid}$${itemKey}$link$text`;
      if (listItem.firstElementChild !== null && listItem.firstElementChild.tagName === 'A') {
        const href = listItem.firstElementChild.getAttribute('href');
        result = {
          ...result,
          [linkNodeKey]: {
            href: href || '#',
          },
          [textNodeKey]: {
            text: listItem.firstElementChild.textContent,
          },
        };
      } else {
        result = {
          ...result,
          [textNodeKey]: {
            text: listItem.textContent,
          },
        };
      }
    }
  });
  return result;
};

const createListDeserializer = (type: string) => ({
  type,
  match: element => ['UL', 'OL'].includes(element.tagName),
  map: () => createFlowContainerItem(type),
  deserialize: deserializeList,
}) as Deserializer;

export {
  deserializeList,
  createListDeserializer,
};
