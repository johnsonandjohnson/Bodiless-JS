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
import { withSidecarNodes } from '@bodiless/core';
import {
  ToutClean,
} from '@bodiless/organisms';
import {
  withDesign,
} from '@bodiless/fclasses';
import {
  asEditableImage, asEditableLink,
} from '../Elements.token';
import { withEditorBasic, withEditorSimple } from '../Editors';

export const asEditableTout = flow(
  withDesign({
    Image: asEditableImage('image'),
    ImageLink: withSidecarNodes(
      asEditableLink('link', undefined, () => ({ label: 'Link' })),
    ),
    Title: withEditorSimple('title', 'Tout Title Text'),
    Link: flow(
      withEditorSimple('ctaText', 'CTA'),
      withSidecarNodes(
        asEditableLink('link', undefined, () => ({ groupLabel: 'CTA', label: 'Link' })),
      ),
    ),
    Body: withEditorBasic('body', 'Tout Body Text'),
  }),
);

const Tout = asEditableTout(ToutClean);
export default Tout;
