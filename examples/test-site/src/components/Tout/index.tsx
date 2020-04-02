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
import { withNodeKey, withNode } from '@bodiless/core';
import { LinkClean } from '@bodiless/components';
import {
  ToutClean, asTestableTout,
} from '@bodiless/organisms';
import {
  withDesign, startWith, replaceWith, Div,
} from '@bodiless/fclasses';
import {
  asEditableImage, asEditableLink,
} from '../Elements.token';
import { asEditorBasic, asEditorSimple } from '../Editors';

const asEditableTout = flow(
  withDesign({
    Image: asEditableImage(),
    ImageLink: asEditableLink(),
    Title: flow(
      asEditorSimple(undefined, 'Tout Title Text'),
      withNode,
    ),
    Link: flow(
      // ToDo: investigate why startWith does not work here
      replaceWith(LinkClean),
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

const withToutNodeKeys = withDesign({
  Image: withNodeKey('image'),
  ImageLink: withNodeKey('cta'),
  Title: withNodeKey('title'),
  Link: flow(
    withDesign({
      Link: withNodeKey('cta'),
      Content: withNodeKey('text'),
    }),
  ),
  Body: withNodeKey('body'),
});

const asTout = flow(
  asEditableTout,
  withToutNodeKeys,
  asTestableTout,
);
const Tout = asTout(ToutClean);
export default Tout;
export { asEditableTout, withToutNodeKeys }
