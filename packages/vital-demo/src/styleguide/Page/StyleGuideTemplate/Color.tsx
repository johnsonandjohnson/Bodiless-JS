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
  as,
  startWith,
  Button,
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
  BackgroundInteractiveLightThemeIdle: vitalColor.BackgroundInteractiveLightIdle,
  BackgroundInteractiveLightThemeHover: 'bg-kenvue-green-tint-60',
  BackgroundInteractiveLightThemeFocus: 'bg-kenvue-green-tint-60',
  BackgroundInteractiveLightThemePressed: 'bg-kenvue-green-tint-20',
  BackgroundInteractiveLightThemeDisabled: as(
    startWith(Button),
    addProps({ disabled: true }),
    vitalColor.BackgroundInteractiveLightDisabled,
  ),
  BackgroundInteractiveDarkThemeIdle: vitalColor.BackgroundInteractiveDarkIdle,
  BackgroundInteractiveDarkThemeHover: 'bg-kenvue-green-shade-80',
  BackgroundInteractiveDarkThemeFocus: 'bg-kenvue-green-shade-80',
  BackgroundInteractiveDarkThemePressed: 'bg-kenvue-green-shade-60',
  BackgroundInteractiveDarkThemeDisabled: as(
    startWith(Button),
    addProps({ disabled: true }),
    vitalColor.BackgroundInteractiveDarkDisabled,
  ),
};

const BaseTextVariation = {
  '': on(Span)(
    'w-[100px] h-[100px]',
    'block',
    'text-24.2px',
    addProps({children: 'Text'}),
  ),
};

const TextVariations = {
  TextInteractiveDarkThemeIdle: vitalColor.TextInteractiveDarkIdle,
  TextInteractiveDarkThemeHover: 'text-kenvue-green-shade-80',
  TextInteractiveDarkThemeFocus: 'text-kenvue-green-shade-80',
  TextInteractiveDarkThemePressed: 'text-kenvue-green-shade-60',
  TextInteractiveDarkThemeDisabled: as(
    startWith(Button),
    addProps({ disabled: 'true'}),
    vitalColor.TextInteractiveDarkDisabled,
  ),
  TextInteractiveLightThemeIdle: vitalColor.TextInteractiveLightIdle,
  TextInteractiveLightThemeHover: 'text-kenvue-green-tint-60',
  TextInteractiveLightThemeFocus: 'text-kenvue-green-tint-60',
  TextInteractiveLightThemePressed: 'text-kenvue-green-tint-20',
  TextInteractiveLightThemeDisabled: as(
    startWith(Button),
    addProps({ disabled: 'true'}),
    vitalColor.TextInteractiveLightDisabled,
  ),
  // eslint-disable-next-line max-len
  TextDarkThemeBase: vitalColor.TextDarkBase,
  TextLightThemeBase: as(vitalColor.TextLightBase, vitalColor.BackgroundInteractiveDarkIdle, 'p-8px'),
  BorderInteractiveLightThemeFocus: 'text-kenvue-green-tint-60',
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
