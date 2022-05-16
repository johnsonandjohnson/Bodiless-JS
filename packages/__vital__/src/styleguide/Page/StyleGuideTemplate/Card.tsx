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
  flowHoc, replaceWith, as, Div, H2
} from '@bodiless/fclasses';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { vitalTypography } from '@bodiless/vital-elements';
import { asCardToken, CardClean, vitalCard } from '@bodiless/vital-card';

const Subtitle = as(vitalTypography.H2, 'pt-4')(H2);

/**
 * Default Card component.
 */
const DefaultCard = as(
  vitalCard.Default,
  withNodeKey('default-card'),
)(CardClean);

/**
 * Vertical Card component.
 */
const VerticalCard = as(asCardToken({
  ...vitalCard.Default,
  Schema: {
    ...vitalCard.Default.Schema,
    Wrapper: withNodeKey('vertical-card'),
  },
  Spacing: {
    ...vitalCard.WithVerticalOrientation.Spacing,
  },
  Layout: {
    ...vitalCard.WithVerticalOrientation.Layout,
  },
}))(CardClean);
const HorizontalCard = as(asCardToken({
  ...vitalCard.Default,
  Schema: {
    ...vitalCard.Default.Schema,
    Wrapper: withNodeKey('horizontal-card'),
  },
  Spacing: {
    ...vitalCard.WithHorizontalOrientation.Spacing,
  },
  Layout: {
    ...vitalCard.WithHorizontalOrientation.Layout,
  },
}))(CardClean);

const HeroCard = as(
  vitalCard.Hero,
  withNodeKey('hero-card'),
)(CardClean);

const CardVariations = (props: any) => (
  <>
    <Div className="md:w-1/3 mb-8">
      <Subtitle>Default Card</Subtitle>
      <DefaultCard />
      <Subtitle>Vertical Card</Subtitle>
      <VerticalCard />
      <Subtitle>Horizontal Card</Subtitle>
      <HorizontalCard />
    </Div>
    <Div className="mb-8">
      <Subtitle>Hero Card</Subtitle>
      <HeroCard />
    </Div>
  </>
);

export const Card = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Card'),
  Content: {
    Title: replaceWith(() => <>Card</>),
    Examples: replaceWith(CardVariations),
  },
});
