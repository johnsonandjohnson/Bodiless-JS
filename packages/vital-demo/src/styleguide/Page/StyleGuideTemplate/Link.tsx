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
  as,
  flowHoc,
  replaceWith,
  on,
  A,
  withDesign,
  Span,
} from '@bodiless/fclasses';
import { EditorPlainClean, vitalEditorPlain } from '@bodiless/vital-editors';
import { asFluidToken, vitalLinkElement } from '@bodiless/vital-elements';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { withParent } from '@bodiless/core';
import { withDefaultContent, withNodeKey } from '@bodiless/data';
import { vitalLink } from '@bodiless/vital-link';
import { StyleGuideExamplesClean, vitalStyleGuideExamples } from '../../Examples';

const LinkVariation = {
  Link: on(EditorPlainClean)(
    vitalEditorPlain.Default,
    withParent(A),
    withDesign({
      Parent: as(
        vitalLink.Default,
        vitalLink.Sidecar,
      )
    }),
    withNodeKey('linktext'),
  ),
  DisabledLink: on(EditorPlainClean)(
    vitalEditorPlain.Default,
    withParent(Span), // Changed to span to disable link
    withDesign({
      Parent: as(
        vitalLink.Default,
        vitalLink.Sidecar,
        vitalLinkElement.TextLightThemeDisabled,
      )
    }),
    withNodeKey('linktext'),
  ),
};

const vitalLinkFlowContainer = asFluidToken({
  Components: {
    ...LinkVariation,
  },
});

const data = {
  examples$Link$linktext: { text: 'An example of the Link' },
  examples$Link: { href: '/test/' },
  examples$DisabledLink$linktext: { text: 'An example of the Link' },
  examples$DisabledLink: { href: '/test/' },
};

export const Link = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Link'),
  Content: {
    Title: replaceWith(() => <>Typography</>),
    Description: replaceWith(() => <>The following are examples of Vital Link.</>),
    Examples: on(StyleGuideExamplesClean)(
      vitalStyleGuideExamples.Default,
      vitalLinkFlowContainer,
      withDefaultContent(data),
    ),
  },
});
