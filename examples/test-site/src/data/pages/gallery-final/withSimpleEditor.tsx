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

import { RichText } from '@bodiless/richtext-ui';
import {
  Strong,
  addClasses,
  withDesign,
  asToken,
  Design,
  startWith,
} from '@bodiless/fclasses';
import { asBodilessLink, withPlaceholder } from '@bodiless/components';
import { withNodeKey, withChild } from '@bodiless/core';

const asBold = startWith(Strong);
const asItalic = addClasses('');
const asUnderline = addClasses('underline');
const asLink = asToken(asBodilessLink(), addClasses('text-blue-700 underline'));

const simpleDesign: Design = {
  Bold: asBold,
  Italic: asItalic,
  Underline: asUnderline,
  Link: asLink,
};

const withSimpleEditor = (nodeKey?: string, placeholder?: string) => asToken(
  addClasses('overflow-hidden'),
  withChild(
    asToken(
      withDesign(simpleDesign),
      withPlaceholder(placeholder),
      withNodeKey(nodeKey),
    )(RichText),
    'Editor',
  ),
);

export default withSimpleEditor;
