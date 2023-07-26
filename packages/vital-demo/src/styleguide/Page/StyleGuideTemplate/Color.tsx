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
  Span,
  varyDesigns,
  addProps,
} from '@bodiless/fclasses';
import { asFluidToken, vitalColor } from '@bodiless/vital-elements';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { StyleGuideExamplesClean, vitalStyleGuideExamples } from '../../Examples';

const BaseColorVariation = {
  '': on(Div)(
    'w-[100px] h-[100px]',
    'block',
  ),
};

const ColorVariations = {
  BackgroundInteractiveLightThemeIdle: vitalColor.BackgroundInteractiveLightThemeIdle,
  BackgroundInteractiveLightThemeHover: vitalColor.BackgroundInteractiveLightThemeHover,
  BackgroundInteractiveLightThemeFocus: vitalColor.BackgroundInteractiveLightThemeFocus,
  BackgroundInteractiveLightThemePressed: vitalColor.BackgroundInteractiveLightThemePressed,
  BackgroundInteractiveLightThemeDisabled: vitalColor.BackgroundInteractiveLightThemeDisabled,
  BackgroundInteractiveDarkThemeIdle: vitalColor.BackgroundInteractiveDarkThemeIdle,
  BackgroundInteractiveDarkThemeHover: vitalColor.BackgroundInteractiveDarkThemeHover,
  BackgroundInteractiveDarkThemeFocus: vitalColor.BackgroundInteractiveDarkThemeFocus,
  BackgroundInteractiveDarkThemePressed: vitalColor.BackgroundInteractiveDarkThemePressed,
  BackgroundInteractiveDarkThemeDisabled: vitalColor.BackgroundInteractiveDarkThemeDisabled,
};

const BaseTextVariation = {
  '': on(Span)(
    'w-[100px] h-[100px]',
    'block',
    addProps({children: 'Text'}),
  ),
};

const TextVariations = {
  TextInteractiveDarkThemeIdle: vitalColor.TextInteractiveDarkThemeIdle,
  TextInteractiveLightThemeIdle: vitalColor.TextInteractiveLightThemeIdle,
  TextInteractiveDarkThemeHover: vitalColor.TextInteractiveDarkThemeHover,
  TextInteractiveDarkThemeDisabled: vitalColor.TextInteractiveDarkThemeDisabled,
  TextInteractiveDarkThemePressed: vitalColor.TextInteractiveDarkThemePressed,
  TextInteractiveDarkThemeFocus: vitalColor.TextInteractiveDarkThemeFocus,
  TextInteractiveLightThemeDisabled: vitalColor.TextInteractiveLightThemeDisabled,
  BorderInteractiveLightThemeFocus: vitalColor.BorderInteractiveLightThemeFocus,
  TextInteractiveLightThemeFocus: vitalColor.TextInteractiveLightThemeFocus,
  TextInteractiveLightThemePressed: vitalColor.TextInteractiveLightThemePressed,
  TextDarkThemeBase: vitalColor.TextDarkThemeBase,
  TextLightThemeBase: vitalColor.TextLightThemeBase,
  TextInteractiveLightThemeHover: vitalColor.TextInteractiveLightThemeHover,
};

// const SpecialColors = {
//   IconLight: vitalColor.IconLight,
//   IconDark: vitalColor.IconDark,
//   SignalError: vitalColor.SignalError,
//   SignalWarning: vitalColor.SignalWarning,
//   SignalSuccess: vitalColor.SignalSuccess,
//   SignalInformational: vitalColor.SignalInformational,
// };

const vitalColorVariations = varyDesigns(
  BaseColorVariation,
  ColorVariations,
);

const vitalTextVariations = varyDesigns(
  BaseTextVariation,
  TextVariations,
);

const vitalColorFlowContainer = asFluidToken({
  Components: {
    ...vitalColorVariations,
    ...vitalTextVariations,
    // ...SpecialColors,
  },
});

const StyleGuideColumns = asFluidToken({
  ...vitalStyleGuideExamples.Default,
  Layout: {
    Wrapper: 'flex flex-wrap',
    ItemWrapper: 'w-1/2',
  },
});

export const Color = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Color'),
  Content: {
    Title: replaceWith(() => <>Color</>),
    Description: replaceWith(() => <>The following are examples of Vital Color.</>),
    Examples: on(StyleGuideExamplesClean)(
      StyleGuideColumns,
      vitalStyleGuideExamples.Default,
      vitalColorFlowContainer,
    ),
  },
});
