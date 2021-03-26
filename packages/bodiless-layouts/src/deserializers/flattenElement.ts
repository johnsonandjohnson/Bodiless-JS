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

type FlattenElementArgs = {
  element: Element,
  deserializers: Deserializer[],
};
type FlattenedElement = {
  elements: Element[],
  deserializer: Deserializer,
};
type FlattenElement = (args: FlattenElementArgs) => FlattenedElement[];

const shouldMergeElement = (prevElement: FlattenedElement, nextElement: FlattenedElement) => (
  nextElement.deserializer.merge
    && prevElement.deserializer.type === nextElement.deserializer.type
);

const flattenElement: FlattenElement = ({
  element,
  deserializers,
}) => {
  const deserializer = deserializers.find(
    deserializer$ => deserializer$.match(element),
  );
  if (deserializer !== undefined) {
    return [{
      elements: [element],
      deserializer,
    }];
  }
  return Array.from(element.children).reduce<FlattenedElement[]>((
    previousValue,
    currentValue,
  ) => {
    const flattenedElement = flattenElement({
      element: currentValue,
      deserializers,
    });
    const prevElement = previousValue.pop();
    const nextElement = flattenedElement[0];
    const otherNextElements = flattenedElement.slice(1);
    return [
      ...previousValue,
      ...(
        prevElement !== undefined && shouldMergeElement(prevElement, nextElement)
          ? [{
            elements: [
              ...prevElement.elements,
              ...nextElement.elements,
            ],
            deserializer: prevElement.deserializer,
          }]
          : [
            ...(prevElement !== undefined ? [prevElement] : []),
            nextElement,
          ]
      ),
      ...otherNextElements,
    ];
  }, []);
};

export default flattenElement;
