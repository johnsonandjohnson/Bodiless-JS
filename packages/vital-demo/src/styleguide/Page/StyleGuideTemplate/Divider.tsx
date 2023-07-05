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
  as,
  replaceWith,
  H3,
} from '@bodiless/fclasses';
import { vitalDividers ,DividerClean } from '@bodiless/vital-divider';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { vitalTypography } from '@bodiless/vital-elements';

const C = {
  H3: as(vitalTypography.H3)(H3),
};

const DefaultDivider = as(
  vitalDividers.Default,
)(DividerClean);

const PrimaryDivider = as(
  vitalDividers.Primary
)(DividerClean);

/* @todo
 * Rendered only the two types of images available in flow container as separate components.
 * To do is provide all variations we want tested individually.
 */
const Examples = (props: any) => (
  <>
    <C.H3>Plain Divider</C.H3>
    <DefaultDivider />
    <C.H3>Primary Divider</C.H3>
    <PrimaryDivider />
  </>
);

export const Divider = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Dividers'),
  Content: {
    Title: replaceWith(() => <>Divider</>),
    Examples: replaceWith(Examples),
  },
});
