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
  on,
  Div,
  varyDesigns,
  as,
  withDesign,
} from '@bodiless/fclasses';
import { asFluidToken, vitalColor, vitalSpacing } from '@bodiless/vital-elements';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { withParent } from '@bodiless/core';
import { StyleGuideExamplesClean, vitalStyleGuideExamples } from '../../Examples';

const BaseVariation = {
  '': on(Div)(
    'w-[100px] h-[50px]',
    'block border',
  ),
};

const BorderColorVariations = {
  BorderLightThemeBase: vitalColor.BorderLightBase,
  BorderInteractiveLightThemeIdle: vitalColor.BorderInteractiveLightIdle,
  BorderInteractiveLightThemeDisabled: vitalColor.BorderInteractiveLightDisabled,
  BorderInteractiveLightThemeFocus: 'border-kenvue-green-shade-80',
  BorderInteractiveLightThemePressed: 'border-kenvue-green-shade-60',
  BorderInteractiveLightThemeHover: 'border-kenvue-green-shade-80',
  BorderDarkThemeBase: as(
    withParent(Div),
    withDesign({
      Parent: as(
        vitalSpacing.PaddingXSmall,
        vitalColor.BackgroundAlt5,
        'flex justify-center items-center w-[150px]',
      ),
    }),
    vitalColor.BorderDarkBase,
  ),
  BorderInteractiveDarkThemeIdle: vitalColor.BorderInteractiveDarkIdle,
  BorderInteractiveDarkThemeHover: 'border-kenvue-green-tint-60',
  BorderInteractiveDarkThemeDisabled: vitalColor.BorderInteractiveDarkDisabled,
  BorderInteractiveDarkThemePressed: 'border-kenvue-green-tint-20',
  BorderInteractiveDarkThemeFocus: 'border-kenvue-green-tint-60',
  // Ignoring Alts
  // BorderDarkThemeAlt1: 'border---no-value--',
  // BorderLightThemeAlt1: 'border-kenvue-neutrals-grey',
};

const BorderWidthVariations = {
  Border1: 'border-1px',
  Border2: 'border-2px',
  Border3: 'border-3px',
  Border4: 'border-4px',
};

const BorderRoundingVariations = {
  Rounded0: 'rounded-0px',
  Rounded2: 'rounded-2px',
  Rounded4: 'rounded-4px',
  Rounded6: 'rounded-6px',
  Rounded8: 'rounded-8px',
  Rounded10: 'rounded-10px',
  Rounded12: 'rounded-12px',
  Rounded20: 'rounded-20px',
  Rounded150: 'rounded-150px',
  Rounded600: 'rounded-600px',
  RoundedFull: 'rounded-pill',
};

const vitalBorderVariations = varyDesigns(
  BaseVariation,
  BorderColorVariations,
);
const vitalWidthVariations = varyDesigns(
  BaseVariation,
  BorderWidthVariations,
  {
    '': vitalColor.BorderDarkBase
  }
);
const vitalRoundingVariations = varyDesigns(
  BaseVariation,
  BorderRoundingVariations,
  {
    '': as(
      vitalColor.BackgroundInteractiveLightIdle,
      'border-none',
    ),
  }
);

const vitalBorderFlowContainer = asFluidToken({
  Components: {
    ...vitalBorderVariations,
    ...vitalWidthVariations,
    ...vitalRoundingVariations,
  },
});

const StyleGuideColumns = asFluidToken({
  ...vitalStyleGuideExamples.Default,
  Layout: {
    Wrapper: 'flex flex-wrap',
    ItemWrapper: 'w-1/2',
  },
});

export const Border = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Border'),
  Content: {
    Title: replaceWith(() => <>Border</>),
    Description: replaceWith(() => <>The following are examples of Vital Border.</>),
    Examples: on(StyleGuideExamplesClean)(
      StyleGuideColumns,
      vitalStyleGuideExamples.Default,
      vitalBorderFlowContainer,
    ),
  },
});
