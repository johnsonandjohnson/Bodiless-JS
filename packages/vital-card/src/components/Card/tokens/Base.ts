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

import omit from 'lodash/omit';
import { withNodeKey } from '@bodiless/core';
import { ifComponentSelector } from '@bodiless/layouts';
import { flowHoc, replaceWith, on } from '@bodiless/fclasses';
import { withPlaceholder } from '@bodiless/components';
import { asBodilessLink } from '@bodiless/components-ui';
import { vitalImage } from '@bodiless/vital-image';
import { vitalTypography } from '@bodiless/vital-elements';
import {
  EditorPlainClean, vitalEditorPlain, RichTextClean, vitalRichText,
} from '@bodiless/vital-editors';
import { asCardToken, CardDescriptionPreview } from '../CardClean';
import { CardNodeKeys } from './constants';

/**
  * Basic Card Design.
  */
const Base = asCardToken({
  Editors: {
    Wrapper: asBodilessLink(),
    Title: on(EditorPlainClean)(vitalEditorPlain.Default),
    Eyebrow: on(EditorPlainClean)(vitalEditorPlain.Default),
    Description: on(RichTextClean)(omit(vitalRichText.BasicNoLink, 'Theme')),
    CTAText: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Content: {
    Title: withPlaceholder('Card Title'),
    Eyebrow: withPlaceholder('Card Eyebrow'),
    Description: withPlaceholder('Card Description'),
    CTAText: withPlaceholder('Call To Action Link'),
  },
  Schema: {
    Title: withNodeKey(CardNodeKeys.Title),
    Eyebrow: withNodeKey(CardNodeKeys.Eyebrow),
    Description: withNodeKey(CardNodeKeys.Description),
    Image: withNodeKey(CardNodeKeys.Image),
    CTAText: withNodeKey(CardNodeKeys.CTA),
  },
  Components: {
    Image: vitalImage.Default,
    CTAWrapper: replaceWith(() => null),
  },
  Theme: {
    EyebrowWrapper: vitalTypography.Eyebrow,
    TitleWrapper: vitalTypography.H3,
    Description: vitalTypography.Body,
  },
  Layout: {
    Wrapper: 'w-full flex flex-col',
  },
  Spacing: {
    Eyebrow: 'my-4',
  },
  Meta: flowHoc.meta.term('Type')('Card'),
});

/**
 * WithVerticalOrientation removes unnecessary wrappers from the card
 */
const WithVerticalOrientation = asCardToken({
  Layout: {
    Wrapper: 'w-full flex h-full flex-col',
    Image: 'w-full',
    Description: 'flex-grow',
  },
  Spacing: {
    ContentWrapper: 'py-4',
    ImageWrapper: 'py-4 md:py-8',
  },
  Meta: flowHoc.meta.term('Orientation')('Vertical'),
});

/**
 * WithHorizontalOrientation splits the card in half with the image on the left
 */
const WithHorizontalOrientation = asCardToken({
  Layout: {
    Wrapper: 'md:flex-row w-full flex flex-col',
    Image: 'w-full',
    ImageWrapper: 'md:w-1/2 flex flex-col',
    ContentWrapper: 'md:w-1/2 flex flex-col',
    Description: 'flex-grow',
  },
  Spacing: {
    ContentWrapper: 'px-4',
    ImageWrapper: 'py-0 md:py-0',
  },
  Meta: flowHoc.meta.term('Orientation')('Horizontal'),
});

const WithFlowContainerPreview = asCardToken({
  Flow: ifComponentSelector,
  Core: {
    Description: replaceWith(CardDescriptionPreview),
  },
});

export default Base;

export {
  WithVerticalOrientation,
  WithHorizontalOrientation,
  WithFlowContainerPreview,
};
