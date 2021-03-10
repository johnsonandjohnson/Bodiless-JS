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

export type FlowContainerItem = {
  uuid: string,
  wrapperProps: { [key: string]: string; },
  type: string,
};

type FlowContainerItemData = {
  [ itemNodeKey: string ] : any;
};

type FlowContainerData = {
  '': {
    items: FlowContainerItem[],
  },
} & FlowContainerItemData;

export type Deserializer = {
  type: string,
  match: (element: Element) => boolean,
  map: (element: Element) => FlowContainerItem,
  deserialize: (item: FlowContainerItem, html: string) => FlowContainerItemData,
};

type DeserializeElement = (element: Element, deserializers: Deserializer[]) => FlowContainerData;

const deserializeElement: DeserializeElement = (
  element: Element,
  deserializers: Deserializer[],
) => {
  const deserializer = deserializers.find(
    deserializer$ => deserializer$.match(element),
  );
  if (deserializer !== undefined) {
    const flowContainerItem = deserializer.map(element);
    return {
      '': {
        items: [flowContainerItem],
      },
      ...deserializer.deserialize(flowContainerItem, element.outerHTML),
    };
  }

  const initialFlowContainerData = { '': { items: [] } };
  const flowContainerData = Array.from(element.children).reduce<FlowContainerData>((
    previousValue: FlowContainerData,
    currentValue: Element,
  ) => {
    const currentFlowContainerData = deserializeElement(currentValue, deserializers);
    return {
      '': {
        items: [
          ...previousValue[''].items,
          ...currentFlowContainerData[''].items,
        ],
      },
      ...omit(previousValue, ''),
      ...omit(currentFlowContainerData, ''),
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
  return deserializeElement(parsed.body, deserializers);
};

export { deserializeHtml };
