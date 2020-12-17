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

const path = require('path');
const { JSDOM } = require('jsdom');

const {
  DefaultNormalHref,
} = require('@bodiless/components/lib/Link');
const {
  createDefaultDeserializers,
  createLinkDeserializer,
  deserializeHtml,
} = require('@bodiless/richtext/lib/serializers');

const normalizeHref = href => new DefaultNormalHref(href).toString();
const deserializers = {
  ...createDefaultDeserializers(),
  Link: createLinkDeserializer({ normalizeHref }),
};

DOMParser = (new JSDOM()).window.DOMParser;
const domParser = new DOMParser();

const richtextPlugin = {
  onPageCreate: ({
    document,
    api,
  }) => {
    const body = document('body').html();
    const richTextData = deserializeHtml(body, deserializers, domParser);
    const rictTextFile = path.resolve(api.getPagePath(), 'rte.json');
    api.writeJsonFileSync(rictTextFile, richTextData);
  },
};

module.exports = richtextPlugin;
