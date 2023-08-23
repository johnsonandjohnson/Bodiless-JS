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
  replaceWith,
  on
} from '@bodiless/fclasses';
import { vitalDividers, DividerClean } from '@bodiless/vital-divider';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { asFluidToken } from '@bodiless/vital-elements';
import { StyleGuideExamplesClean } from '../../Examples';

const DemoFlowContainer = asFluidToken({
  Components: {
    Primary: on(DividerClean)(vitalDividers.Base, vitalDividers.WithPrimaryDivider),
    Secondary: on(DividerClean)(vitalDividers.Base, vitalDividers.WithSecondaryDivider),
    VerticalPrimary: on(DividerClean)(vitalDividers.Base, vitalDividers.WithPrimaryDivider, vitalDividers.WithVerticalOrientation),
// eslint-disable-next-line max-len
    VerticalSecondary: on(DividerClean)(vitalDividers.Base, vitalDividers.WithSecondaryDivider, vitalDividers.WithVerticalOrientation),
  },
});

export const Divider = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Dividers'),
  Content: {
    Title: replaceWith(() => <>Divider</>),
    Description: replaceWith(() => (
      <>
        The following are examples of Divider elements.
        {' '}
      </>
    )),
    Examples: on(StyleGuideExamplesClean)(
      StyleGuideSpacing,
      DemoFlowContainer
    ),
  },
});
