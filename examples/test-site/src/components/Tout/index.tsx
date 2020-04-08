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
import { withDefaultContent, withNode } from '@bodiless/core';
import {
  ToutClean,
  asTestableTout,
  withToutNodeKeys,
  withToutResetButtons,
} from '@bodiless/organisms';
import { withDesign } from '@bodiless/fclasses';
import {
  asEditableImage, asEditableLink,
} from '../Elements.token';
import {
  withEditorBasic,
  withEditorSimple,
} from '../Editors';

export const withToutEditors = flow(
  withDesign({
    Image: asEditableImage(),
    ImageLink: asEditableLink(),
    Title: flow(
      withEditorSimple(undefined, 'Tout Title Text'),
      withNode,
    ),
    Link: flow(
      withEditorSimple('text', 'CTA'),
      asEditableLink(),
      withNode,
    ),
    Body: flow(
      withEditorBasic(undefined, 'Tout Body Text'),
      withNode,
    ),
  }),
);

export const asEditableTout = flow(
  withToutEditors,
  withToutNodeKeys,
  asTestableTout,
);

export const asContentfulTout = (content: object) => flow(
  withToutEditors,
  withToutResetButtons,
  withToutNodeKeys,
  withDefaultContent(content),
  asTestableTout,
);

const Tout = asEditableTout(ToutClean);
export default Tout;
