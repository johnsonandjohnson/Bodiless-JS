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
  ToutClean, asTestableTout,
} from '@bodiless/organisms';
import {
  withDesign,
} from '@bodiless/fclasses';
import {
  asEditableImage, asEditableLink,
} from '../Elements.token';
import { asEditorBasic, asEditorSimple } from '../Editors';

const asTout = flow(
  withDesign({
    Image: asEditableImage('image'),
    ImageLink: asEditableLink('cta'),
    Title: asEditorSimple('title', 'Tout Title Text'),
    Link: flow(
      asEditorSimple('ctaText', 'CTA'),
      asEditableLink('cta'),
    ),
    Body: asEditorBasic('body', 'Tout Body Text'),
  }),
  asTestableTout,
);
const Tout = asTout(ToutClean);
export default Tout;
