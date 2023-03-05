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
import { ButtonClean, vitalButtons } from '@bodiless/vital-buttons';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { vitalTypography } from '@bodiless/vital-elements';
import { LinkClean, vitalLink } from '@bodiless/vital-link';
import { withEditorPlain } from '@bodiless/vital-editors';

const C = {
  H3: as(vitalTypography.H3)(H3),
};

const VitalDemoLink = flowHoc(
  withEditorPlain('Link1', 'Link'),
  as(
    vitalTypography.Link,
    vitalLink.Default,
  ),
  withNodeKey('demo-link'),
)(LinkClean);
const VitalPrimaryLink = flowHoc(
  withEditorPlain('Link1', 'Link'),
  as(vitalLink.PrimaryLink),
  withNodeKey('demo-link-arrow'),
)(LinkClean);

const DefaultButton = as(
  vitalButtons.Default,
  withNodeKey('defaultbutton'),
)(ButtonClean);
const PrimaryButton = as(
  vitalButtons.Default,
  vitalButtons.WithPrimary,
  withNodeKey('primarybutton'),
)(ButtonClean);
const SecondaryButton = as(
  vitalButtons.Default,
  vitalButtons.WithSecondary,
  withNodeKey('secondarybutton'),
)(ButtonClean);
const PrimarySelectedButton = as(
  vitalButtons.Default,
  vitalButtons.WithPrimarySelected,
  withNodeKey('primarybutton'),
)(ButtonClean);
const PrimaryDisabledButton = as(
  vitalButtons.Default,
  vitalButtons.WithPrimary,
  vitalButtons.WithDisabled,
  withNodeKey('primarybutton'),
)(ButtonClean);
const SecondarySelectedButton = as(
  vitalButtons.Default,
  vitalButtons.WithSecondarySelected,
  withNodeKey('secondarybutton'),
)(ButtonClean);
const SecondaryDisabledButton = as(
  vitalButtons.Default,
  vitalButtons.WithSecondary,
  vitalButtons.WithDisabled,
  withNodeKey('secondarybutton'),
)(ButtonClean);

const PrimaryButtonWithArrow = as(
  vitalButtons.Default,
  vitalButtons.WithPrimary,
  vitalButtons.WithArrow,
  withNodeKey('primarybutton'),
)(ButtonClean);
const SecondaryButtonWithArrow = as(
  vitalButtons.Default,
  vitalButtons.WithSecondary,
  vitalButtons.WithArrow,
  withNodeKey('secondarybutton'),
)(ButtonClean);
const PrimarySelectedButtonWithArrow = as(
  vitalButtons.Default,
  vitalButtons.WithPrimarySelected,
  vitalButtons.WithArrow,
  withNodeKey('primarybutton'),
)(ButtonClean);
const PrimaryDisabledButtonWithArrow = as(
  vitalButtons.Default,
  vitalButtons.WithPrimary,
  vitalButtons.WithArrow,
  vitalButtons.WithDisabled,
  withNodeKey('primarybutton'),
)(ButtonClean);
const SecondarySelectedButtonWithArrow = as(
  vitalButtons.Default,
  vitalButtons.WithSecondarySelected,
  vitalButtons.WithArrow,
  withNodeKey('secondarybutton'),
)(ButtonClean);
const SecondaryDisabledButtonWithArrow = as(
  vitalButtons.Default,
  vitalButtons.WithSecondary,
  vitalButtons.WithArrow,
  vitalButtons.WithDisabled,
  withNodeKey('secondarybutton'),
)(ButtonClean);

/* @todo
  * Rendered only the two types of images available in flow container as separate components.
  * To do is provide all variations we want tested individually.
  */
const Examples = (props: any) => (
  <>
    <hr className="my-4" />
    <C.H3>Default Vital Link</C.H3>

    <span>
      Vital Link:
      {' '}

    </span>
    <VitalDemoLink />
    <br />
    <span>
      Vital Primary Link with Arrow:
      {' '}

    </span>
    <VitalPrimaryLink />
    <hr className="my-4" />
    <C.H3>Default Button with no Style</C.H3>
    <div className="flex flex-wrap w-full p-8 space-x-4">
      <DefaultButton />
    </div>
    <C.H3>Primary Buttons</C.H3>
    <div className="flex flex-col lg:flex-row lg:flex-wrap w-full p-8 gap-4">
      <PrimaryButton />
      <PrimarySelectedButton />
      <PrimaryDisabledButton />
    </div>
    <C.H3>Primary Buttons With Hover Arrows</C.H3>
    <div className="flex flex-col lg:flex-row lg:flex-wrap w-full p-8 gap-4">
      <PrimaryButtonWithArrow />
      <PrimarySelectedButtonWithArrow />
      <PrimaryDisabledButtonWithArrow />
    </div>
    <C.H3>Secondary Buttons</C.H3>
    <div className="flex flex-col lg:flex-row lg:flex-wrap w-full p-8 gap-4">
      <SecondaryButton />
      <SecondarySelectedButton />
      <SecondaryDisabledButton />
    </div>
    <C.H3>Secondary Buttons With Hover Arrows</C.H3>
    <div className="flex flex-col lg:flex-row lg:flex-wrap w-full p-8 gap-4">
      <SecondaryButtonWithArrow />
      <SecondarySelectedButtonWithArrow />
      <SecondaryDisabledButtonWithArrow />
    </div>
    <p>Note: all Primary buttons share same node key and Secondary buttons share same node key</p>
  </>
);

export const Buttons = asStyleGuideTemplateToken({
  ...vitalStyleGuideTemplate.Default,
  Meta: flowHoc.meta.term('Token')('Buttons'),
  Content: {
    Title: replaceWith(() => <>Buttons</>),
    Examples: replaceWith(Examples),
  },
});
