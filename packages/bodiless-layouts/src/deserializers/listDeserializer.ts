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

import type { Deserializer } from './deserializer';
import { createFlowContainerItem, generateUuid } from './createFlowContainerItem';
import type { FlowContainerItem } from './createFlowContainerItem';

type ListData = {
  [ itemNodeKey: string ] : any;
};

const deserializeList = (
  linkKey: string,
  titleKey: string,
) => (item: FlowContainerItem, elements: Element[]) => {
  let result: ListData = {
    [item.uuid]: {
      items: [],
    },
  };
  const listElement = elements[0];
  if (listElement === null) return result;
  Array.from(listElement.children).forEach((listItem, index) => {
    if (listItem.tagName === 'LI') {
      const itemKey = generateUuid(listItem.innerHTML, index);
      result[item.uuid].items.push(itemKey);
      const linkNodeKey = [item.uuid, itemKey, linkKey].join('$');
      const textNodeKey = [item.uuid, itemKey, titleKey].join('$');
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

const createListDeserializer = (type: string, linkKey: string, titleKey: string) => ({
  type,
  match: element => ['UL', 'OL'].includes(element.tagName),
  map: (element, elementIndex) => createFlowContainerItem({
    type,
    element,
    elementIndex,
  }),
  deserialize: deserializeList(linkKey, titleKey),
  merge: false,
}) as Deserializer;

export {
  deserializeList,
  createListDeserializer,
};
