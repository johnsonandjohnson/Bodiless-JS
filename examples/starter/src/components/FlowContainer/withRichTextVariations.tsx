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

import { flow } from 'lodash';
import {
  withTitle,
  withDesc,
  ifComponentSelector,
} from '@bodiless/layouts';
import {
  varyDesign,
  replaceWith,
  withDesign,
} from '@bodiless/fclasses';
import { asPreview } from '@bodiless/richtext';

import {
  EditorBasic,
  EditorFullFeatured,
  EditorSimple,
} from '../Editors';
import { withType } from './Categories';

const richTextVariation = {
  EditorSimple: flow(
    replaceWith(EditorSimple),
    ifComponentSelector(asPreview),
    withType('Rich Text')(),
    withTitle('Simple Rich Text'),
    withDesc('Adds a block of text for a Title.\n'),
  ),
  EditorBasic: flow(
    replaceWith(EditorBasic),
    ifComponentSelector(asPreview),
    withType('Rich Text')(),
    withTitle('Basic Rich Text'),
    withDesc('Adds a block of text with basic formatting.\n'),
  ),
  EditorFullFeatured: flow(
    replaceWith(EditorFullFeatured),
    ifComponentSelector(asPreview),
    withType('Rich Text')(),
    withTitle('Full Rich Text'),
    withDesc('Adds a block of text for more complex HTML.\n'),
  ),
};

export default withDesign(varyDesign(
  richTextVariation,
)());
