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

import omit from 'lodash/omit';
import type {
  Deserializer,
  FlowContainerItemData,
} from './deserializer';
import type { FlowContainerItem } from './createFlowContainerItem';
import flattenElement from './flattenElement';

type FlowContainerData = {
  [rootNodeKey: string]: {
    items: FlowContainerItem[],
  },
} & FlowContainerItemData;

const ROOT_NODE_KEY = '';

type DeserializeElementArgs = {
  element: Element,
  deserializers: Deserializer[],
};
export type DeserializeElement = (args: DeserializeElementArgs) => FlowContainerData;

const deserializeElement: DeserializeElement = ({
  element,
  deserializers,
}) => {
  const flattenedElements = flattenElement({
    element,
    deserializers,
  });
  const initialFlowContainerData = { [ROOT_NODE_KEY]: { items: [] } };
  const flowContainerData = flattenedElements
    .reduce<FlowContainerData>((
    prevValue,
    curValue,
    index,
  ) => {
    const flowContainerItem = curValue.deserializer.map(curValue.elements, index);
    const deserializedItems = curValue.deserializer.deserialize(
      flowContainerItem,
      curValue.elements,
    );
    return {
      [ROOT_NODE_KEY]: {
        items: [
          ...prevValue[ROOT_NODE_KEY].items,
          flowContainerItem,
        ],
      },
      ...omit(prevValue, [ROOT_NODE_KEY]),
      ...deserializedItems,
    };
  }, initialFlowContainerData);
  return flowContainerData;
};

const deserializeHtml = (
  html: string,
  deserializers: Deserializer[],
  domParser?: DOMParser,
) => {
  if (domParser === undefined && typeof DOMParser === 'undefined') return { '': { items: [] } };
  const domParser$ = domParser || new DOMParser();
  const parsed = domParser$.parseFromString(html, 'text/html');
  return deserializeElement({
    element: parsed.body,
    deserializers,
  });
};

export { deserializeHtml };
