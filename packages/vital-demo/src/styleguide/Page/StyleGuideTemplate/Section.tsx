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
import {
  flowHoc,
  replaceWith,
  on,
  addProps,
} from '@bodiless/fclasses';
import { asFluidToken } from '@bodiless/vital-elements';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { withDefaultContent } from '@bodiless/data';
import { SectionClean, asSectionToken, vitalSection } from '@bodiless/vital-section';
import { CardClean, vitalCard } from '@bodiless/vital-card';
import { StyleGuideExamplesClean, vitalStyleGuideExamples } from '../../Examples';

const WithLinkToken = asSectionToken({
  ...vitalSection.WithLink,
  Content: {
    Link: addProps({ children: 'Section Link' })
  }
});

const DefaultSection = on(SectionClean)(
  vitalSection.Default,
  asSectionToken({
    Components: {
      Content: on(CardClean)(
        vitalCard.Hero,
      )
    }
  }),
  withDefaultContent({
    title: {
      text: 'This is section title!'
    },
    description: {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  }),
);

const vitalSectionFlowContainer = asFluidToken({
  Components: {
    DefaultSection,
    SectionWithTitle: on(SectionClean)(
      DefaultSection,
      vitalSection.WithTitle,
    ),
    SectionWithLink: on(SectionClean)(
      DefaultSection,
      WithLinkToken,
    ),
    SectionWithDescription: on(SectionClean)(
      DefaultSection,
      vitalSection.WithDescription,
    ),
    SectionFull: on(SectionClean)(
      DefaultSection,
      vitalSection.WithTitle,
      vitalSection.WithDescription,
      WithLinkToken,
    ),
  },
});

export const Section = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Section'),
  Content: {
    Title: replaceWith(() => <>Section</>),
    Description: replaceWith(() => <>The following are examples of Vital Section.</>),
    Examples: on(StyleGuideExamplesClean)(
      vitalStyleGuideExamples.Default,
      vitalSectionFlowContainer,
    ),
  },
});
