/**
 * Copyright © 2022 Johnson & Johnson
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

import React from 'react';
import { withNodeKey } from '@bodiless/core';
import {
  flowHoc,
  as,
  replaceWith,
  H3,
} from '@bodiless/fclasses';
import { vitalLink, vitalButtons, LinkClean } from '@bodiless/vital-link';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { vitalTypography } from '@bodiless/vital-elements';

const C = {
  H3: as(vitalTypography.H3)(H3),
};

const DefaultLink = as(
  vitalLink.Default,
  withNodeKey('defaultlink'),
)(LinkClean);

const DefaultButton = as(
  vitalButtons.Default,
  withNodeKey('defaultbutton'),
)(LinkClean);
const PrimaryButton = as(
  vitalButtons.Primary,
  withNodeKey('defaultbutton'),
)(LinkClean);

/* @todo
  * Rendered only the two types of images available in flow container as separate components.
  * To do is provide all variations we want tested individually.
  */
const Examples = (props: any) => (
  <>
    <C.H3>Default Link</C.H3>
    <DefaultLink />
    <hr className="my-4" />
    <C.H3>Default Button</C.H3>
    <div className="flex flex-wrap w-full p-8 space-x-2">
      <DefaultButton />
      <PrimaryButton />
    </div>
  </>
);

export const Link = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Links'),
  Content: {
    Title: replaceWith(() => <>Links</>),
    Examples: replaceWith(Examples),
  },
});
