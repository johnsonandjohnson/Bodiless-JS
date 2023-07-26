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
import { EditorPlainClean, vitalEditorPlain } from '@bodiless/vital-editors';
import { asFluidToken } from '@bodiless/vital-elements';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { withParent } from '@bodiless/core';
import { StyleGuideExamplesClean, vitalStyleGuideExamples } from '../../Examples';

const BaseVariation = {
  '': on(EditorPlainClean)(
    vitalEditorPlain.Default,
    withParent(Div),
  ),
};

const ColorVariations = {

};

const vitalColorVariations = varyDesigns(
  BaseVariation,
  ColorVariations,
);

const vitalColorFlowContainer = asFluidToken({
  Components: {
    ...vitalColorVariations,
  },
});

export const Color = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Color'),
  Content: {
    Title: replaceWith(() => <>Color</>),
    Description: replaceWith(() => <>The following are examples of Vital Color.</>),
    Examples: on(StyleGuideExamplesClean)(
      vitalStyleGuideExamples.Default,
      vitalColorFlowContainer,
    ),
  },
});
