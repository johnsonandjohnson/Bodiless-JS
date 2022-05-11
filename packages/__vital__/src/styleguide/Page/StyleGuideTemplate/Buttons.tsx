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
import { LinkClean } from '@bodiless/vital-link';
import { vitalButtons } from '@bodiless/vital-buttons';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { vitalTypography } from '@bodiless/vital-elements';

const C = {
  H3: as(vitalTypography.H3)(H3),
};

const DefaultButton = as(
  vitalButtons.Default,
  withNodeKey('defaultbutton'),
)(LinkClean);
const PrimaryButton = as(
  vitalButtons.Primary,
  withNodeKey('primarybutton'),
)(LinkClean);
const SecondaryButton = as(
  vitalButtons.Secondary,
  withNodeKey('secondarybutton'),
)(LinkClean);
const PrimarySelectedButton = as(
  vitalButtons.PrimarySelected,
  withNodeKey('primarybutton'),
)(LinkClean);
const PrimaryDisabledButton = as(
  vitalButtons.Primary,
  vitalButtons.WithDisabled,
  withNodeKey('primarybutton'),
)(LinkClean);
const SecondarySelectedButton = as(
  vitalButtons.SecondarySelected,
  withNodeKey('secondarybutton'),
)(LinkClean);
const SecondaryDisabledButton = as(
  vitalButtons.Secondary,
  vitalButtons.WithDisabled,
  withNodeKey('secondarybutton'),
)(LinkClean);

/* @todo
  * Rendered only the two types of images available in flow container as separate components.
  * To do is provide all variations we want tested individually.
  */
const Examples = (props: any) => (
  <>
    <hr className="my-4" />
    <C.H3>Default Button</C.H3>
    <DefaultButton />
    <C.H3>Primary Buttons</C.H3>
    <div className="flex flex-wrap w-full p-8 space-x-4">
      <PrimaryButton />
      <PrimarySelectedButton />
      <PrimaryDisabledButton />
    </div>
    <C.H3>Secondary Buttons</C.H3>
    <div className="flex flex-wrap w-full p-8 space-x-4">
      <SecondaryButton />
      <SecondarySelectedButton />
      <SecondaryDisabledButton />
    </div>
  </>
);

export const Buttons = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Buttons'),
  Content: {
    Title: replaceWith(() => <>Buttons</>),
    Examples: replaceWith(Examples),
  },
});
