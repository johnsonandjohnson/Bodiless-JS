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
import { withNode } from '@bodiless/core';
import {
  ToutClean,
  asTestableTout,
  withToutContent,
  withToutNodeKeys,
} from '@bodiless/organisms';
import {
  withDesign, startWith, Div,
} from '@bodiless/fclasses';
import {
  asEditableImage, asEditableLink,
} from '../Elements.token';
import { asEditorBasic, asEditorSimple } from '../Editors';

export const withToutEditors = flow(
  withDesign({
    Image: asEditableImage(),
    ImageLink: asEditableLink(),
    Title: flow(
      asEditorSimple(undefined, 'Tout Title Text'),
      withNode,
    ),
    Link: flow(
      withDesign({
        Link: asEditableLink(),
        Content: flow(
          startWith(Div),
          asEditorSimple(undefined, 'CTA'),
          withNode,
        ),
      }),
    ),
    Body: flow(
      asEditorBasic(undefined, 'Tout Body Text'),
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
  withToutContent(content),
  withToutNodeKeys,
  asTestableTout,
);

const Tout = asEditableTout(ToutClean);
export default Tout;
