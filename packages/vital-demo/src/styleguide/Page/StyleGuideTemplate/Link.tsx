/**
 * Copyright © 2023 Johnson & Johnson
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
  on,
  withProps,
} from '@bodiless/fclasses';
import { asFluidToken } from '@bodiless/vital-elements';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { LinkClean, vitalLink } from '@bodiless/vital-link';
import { StyleGuideExamplesClean, vitalStyleGuideExamples } from '../../Examples';

const LinkVariation = {
  Link: on(LinkClean)(
    vitalLink.Default,
    vitalLink.Sidecar,
    withProps({ children: 'An example of the Link', href: '/test/' })
  ),
  DisabledLink: on(LinkClean)(
    vitalLink.Disabled,
    withProps({ children: 'An example of the Disabled Link', href: '/test/' })
  ),
};

const vitalLinkFlowContainer = asFluidToken({
  Components: {
    ...LinkVariation,
  },
});

export const Link = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Link'),
  Content: {
    Title: replaceWith(() => <>Link</>),
    Description: replaceWith(() => <>The following are examples of Vital Link.</>),
    Examples: on(StyleGuideExamplesClean)(
      vitalStyleGuideExamples.Default,
      vitalLinkFlowContainer,
    ),
  },
});
