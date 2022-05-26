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

import React from 'react';
import {
  flowHoc,
  H1,
  H2,
  H3,
  H4,
  H5,
  P,
  as,
  replaceWith,
} from '@bodiless/fclasses';
import { withEditorPlain } from '@bodiless/vital-editors';
import { vitalTypography } from '@bodiless/vital-elements';
import { LinkClean, vitalLink } from '@bodiless/vital-link';
import { withNodeKey } from '@bodiless/core';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';

const H1Title = flowHoc(
  withEditorPlain('title', 'Page Title'),
  as(vitalTypography.H1, 'py-5'),
)(H1);
const VitalH1 = flowHoc(
  withEditorPlain('H1', 'Header 1'),
  as(vitalTypography.H1),
)(H1);
const VitalH2 = flowHoc(
  withEditorPlain('H2', 'Header 2'),
  as(vitalTypography.H2),
)(H2);
const VitalH3 = flowHoc(
  withEditorPlain('H3', 'Header 3'),
  as(vitalTypography.H3),
)(H3);
const VitalH4 = flowHoc(
  withEditorPlain('H4', 'Header 4'),
  as(vitalTypography.H4),
)(H4);
const VitalH5 = flowHoc(
  withEditorPlain('H5', 'Header 5'),
  as(vitalTypography.H5),
)(H5);
const VitalBody = flowHoc(
  withEditorPlain('Body', 'Body Copy'),
  as(vitalTypography.Body),
)(P);
const VitalEyebrow = flowHoc(
  withEditorPlain('Eyebrow', 'Eyebrow'),
  as(vitalTypography.Eyebrow),
)(P);
const VitalRest = flowHoc(
  withEditorPlain('Rest', 'Rest: i.e. Breadcrumbs / Review Numbers'),
  as(vitalTypography.Rest),
)(P);
const VitalDemoLink = flowHoc(
  withEditorPlain('Link1', 'Link'),
  as(
    vitalTypography.Link,
    vitalLink.Default,
    vitalLink.Sidecar,
  ),
  withNodeKey('demo-link'),
)(LinkClean);
const Gradient = flowHoc(
  withEditorPlain('Gradient', 'Gradient'),
  as(vitalTypography.Gradient),
)(P);

const Examples = (props: any) => (
  <>
    <H1Title />
    <VitalH1 />
    <VitalH2 />
    <VitalH3 />
    <VitalH4 />
    <VitalH5 />
    <VitalBody />
    <VitalEyebrow />
    <VitalDemoLink />
    <VitalRest />
    <br />
    <Gradient />
  </>
);

export const Typography = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Typography'),
  Content: {
    Title: replaceWith(() => <>Typography</>),
    Examples: replaceWith(Examples),
  },
});
