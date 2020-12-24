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

import { identity } from 'lodash';
import { createDeserializer, TagName } from './htmlSerializer';

const createBoldDeserializer = () => ({
  ...createDeserializer({
    nodeName: 'B',
    tagName: TagName.Text,
  }),
  map: () => ({ Bold: true }),
});

const createItalicDeserializer = () => ({
  ...createDeserializer({
    nodeName: 'I',
    tagName: TagName.Text,
  }),
  map: () => ({ Italic: true }),
});

const createLinkDeserializer = ({ normalizeHref } = { normalizeHref: identity }) => ({
  ...createDeserializer({
    nodeName: 'A',
    tagName: TagName.Element,
  }),
  map: (element: Element) => ({
    type: 'Link',
    data: {
      slatenode: {
        href: normalizeHref(element.getAttribute('href')),
      },
    },
  }),
});

const createStrikeDeserializer = () => ({
  ...createDeserializer({
    nodeName: 'STRIKE',
    tagName: TagName.Text,
  }),
  map: () => ({ StrikeThrough: true }),
});

const createHeader1Deserializer = () => ({
  ...createDeserializer({
    nodeName: 'H1',
    tagName: TagName.Element,
  }),
});

const createHeader2Deserializer = () => ({
  ...createDeserializer({
    nodeName: 'H2',
    tagName: TagName.Element,
  }),
});

const createHeader3Deserializer = () => ({
  ...createDeserializer({
    nodeName: 'H3',
    tagName: TagName.Element,
  }),
});

const createDefaultDeserializers = () => ({
  Bold: createBoldDeserializer(),
  Italic: createItalicDeserializer(),
  Link: createLinkDeserializer(),
  StrikeThrough: createStrikeDeserializer(),
  Header1: createHeader1Deserializer(),
  Header2: createHeader2Deserializer(),
  Header3: createHeader3Deserializer(),
});

export {
  createBoldDeserializer,
  createItalicDeserializer,
  createLinkDeserializer,
  createStrikeDeserializer,
  createHeader1Deserializer,
  createHeader2Deserializer,
  createHeader3Deserializer,
  createDefaultDeserializers,
};
