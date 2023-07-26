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
} from '@bodiless/fclasses';
import { asFluidToken, vitalColor } from '@bodiless/vital-elements';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { StyleGuideExamplesClean, vitalStyleGuideExamples } from '../../Examples';

const BaseVariation = {
  '': on(Div)(
    'w-[100px] h-[100px]',
    'block border',
  ),
};

const BorderColorVariations = {
  BorderLightThemeBase: vitalColor.BorderLightThemeBase,
  BorderInteractiveLightThemeIdle: vitalColor.BorderInteractiveLightThemeIdle,
  BorderInteractiveLightThemeDisabled: vitalColor.BorderInteractiveLightThemeDisabled,
  BorderInteractiveLightThemeFocus: vitalColor.BorderInteractiveLightThemeFocus,
  BorderInteractiveLightThemePressed: vitalColor.BorderInteractiveLightThemePressed,
  BorderInteractiveLightThemeHover: vitalColor.BorderInteractiveLightThemeHover,
  BorderDarkThemeBase: vitalColor.BorderDarkThemeBase,
  BorderInteractiveDarkThemeIdle: vitalColor.BorderInteractiveDarkThemeIdle,
  BorderInteractiveDarkThemeHover: vitalColor.BorderInteractiveDarkThemeHover,
  BorderInteractiveDarkThemeDisabled: vitalColor.BorderInteractiveDarkThemeDisabled,
  BorderInteractiveDarkThemePressed: vitalColor.BorderInteractiveDarkThemePressed,
  BorderInteractiveDarkThemeFocus: vitalColor.BorderInteractiveDarkThemeFocus,
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
  Rounded0: 'rounded-0',
  Rounded2: 'rounded-2',
  Rounded4: 'rounded-4',
  Rounded6: 'rounded-6',
  Rounded8: 'rounded-8',
  Rounded10: 'rounded-10',
  Rounded12: 'rounded-12',
  Rounded20: 'rounded-20',
  Rounded150: 'rounded-150',
  Rounded600: 'rounded-600',
  RoundedFull: 'rounded-pill',
};

const vitalBorderVariations = varyDesigns(
  BaseVariation,
  BorderColorVariations,
);
const vitalWidthVariations = varyDesigns(
  BaseVariation,
  BorderWidthVariations,
);
const vitalRoundingVariations = varyDesigns(
  BaseVariation,
  BorderRoundingVariations,
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
