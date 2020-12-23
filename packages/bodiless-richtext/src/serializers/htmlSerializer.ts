/**
 * Copyright © 2020 Johnson & Johnson
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

import { jsx } from 'slate-hyperscript';
import type { Node as SlateNode } from 'slate';
import wrapTopLevelInlineNodesInParagraphs from './wrapTopLevelInlineNodesInParagraphs';

type Element = HTMLElement;

type HTMLElementMatch = (element: Element) => boolean;
type HTMLElementMap = (element: Element) => object;
enum TagName {
  Element = 'element',
  Text = 'text',
  Fragment = 'fragment',
}

type Deserializer = {
  match: HTMLElementMatch,
  map: HTMLElementMap,
  tagName: TagName,
};

type DeserializeElementParams = {
  element: Element,
  deserializers: Deserializer[],
};
type DeserializeElement = (params: DeserializeElementParams) => SlateNode[];
type Deserializers = {
  [key: string]: Deserializer,
};

const NODE_TEXT_NODE = 3;
const NODE_ELEMENT_NODE = 1;
const DEFAULT_ELEMENTS = [
  'P',
];

// @ts-ignore todo: resolve types
const deserializeElement: DeserializeElement = ({
  element,
  deserializers,
}) => {
  if (element.nodeType === NODE_TEXT_NODE) return element.textContent;
  if (element.nodeType !== NODE_ELEMENT_NODE) return [];

  const children = Array.from(element.childNodes)
    .map((element$: ChildNode) => deserializeElement({
      element: element$ as Element,
      deserializers,
    }))
    .flat();

  if (element.nodeName === 'BODY') {
    return jsx(TagName.Fragment, {}, children);
  }

  const elementDeserializer = deserializers.find(
    deserializer$ => deserializer$.tagName === TagName.Element && deserializer$.match(element),
  );
  if (elementDeserializer) {
    const attrs = elementDeserializer.map(element);
    return jsx(TagName.Element, attrs, children);
  }

  const textDeserializer = deserializers.find(
    deserializer$ => deserializer$.tagName === TagName.Text && deserializer$.match(element),
  );
  if (textDeserializer) {
    return children.map(child => jsx(TagName.Text, textDeserializer.map(element), child));
  }

  if (DEFAULT_ELEMENTS.includes(element.nodeName)) {
    return jsx(TagName.Element, { type: 'paragraph' }, children);
  }

  return children;
};

const deserializeHtml = (
  html: string,
  deserializers: Deserializers,
  domParser?: DOMParser,
) => {
  const domParser$ = domParser || new DOMParser();
  const parsed = domParser$.parseFromString(html, 'text/html');
  const result = deserializeElement({
    element: parsed.body,
    deserializers: Object.values(deserializers),
  });
  const result$ = wrapTopLevelInlineNodesInParagraphs(result);
  return result$;
};

type CreateDeserializerSettings = {
  nodeName: string,
  tagName: TagName,
};

const createDeserializer = ({
  nodeName,
  tagName,
}: CreateDeserializerSettings) => ({
  match: (element: Element) => element.nodeName === nodeName,
  map: () => ({ type: nodeName }),
  tagName,
});

export {
  deserializeElement,
  deserializeHtml,
  createDeserializer,
  TagName,
};

export type {
  HTMLElementMatch,
  HTMLElementMap,
  Deserializer,
};
