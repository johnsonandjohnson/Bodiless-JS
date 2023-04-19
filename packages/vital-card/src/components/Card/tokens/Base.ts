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
import {
  flowHoc, replaceWith, on, as, extendMeta, Div,
} from '@bodiless/fclasses';
import { withPlaceholder } from '@bodiless/components';
import { asBodilessLink } from '@bodiless/components-ui';
import { vitalImage } from '@bodiless/vital-image';
import { vitalTypography, asFluidToken } from '@bodiless/vital-elements';
import {
  EditorPlainClean, vitalEditorPlain, RichTextClean, vitalRichText,
} from '@bodiless/vital-editors';
import { ButtonClean, vitalButtons } from '@bodiless/vital-buttons';
import { LinkClean, vitalLink } from '@bodiless/vital-link';
import { asCardToken, CardDescriptionPreview } from '../CardClean';
import type { CardToken } from '../CardClean';
import { CardNodeKeys } from './constants';

const RTENoTheme = asFluidToken(omit(vitalRichText.BasicNoLink, 'Theme'));

const Base = asCardToken({
  Editors: {
    Wrapper: asBodilessLink(),
    Title: on(EditorPlainClean)(vitalEditorPlain.Default),
    Eyebrow: on(EditorPlainClean)(vitalEditorPlain.Default),
    Description: on(RichTextClean)(RTENoTheme),
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

const WithHorizontalOrientationBase = asCardToken({
  Layout: {
    Image: 'w-full',
    ImageWrapper: 'md:w-1/2 flex flex-col',
    ContentWrapper: 'md:w-1/2 flex flex-col',
  },
  Spacing: {
    ContentWrapper: 'px-4',
    ImageWrapper: 'py-0 md:py-0',
  },
  Meta: flowHoc.meta.term('Orientation')('Horizontal'),
});

const WithHorizontalContentAtTop = asCardToken({
  Layout: {
    Description: 'flex-grow',
  },
  Meta: flowHoc.meta.term('Orientation')('Content Top Aligned'),
});

const WithHorizontalContentCentered = asCardToken({
  Layout: {
    ContentWrapper: as(
      'md:grow', // fill all right column
      'md:content-center md:justify-center', // vertically center
    ),
  },
  Meta: flowHoc.meta.term('Orientation')('Content Centered'),
});

const WithHorizontalLeftOrientation = asCardToken(WithHorizontalOrientationBase, {
  Layout: {
    Wrapper: 'flex-col md:flex-row w-full flex',
  },
  Meta: flowHoc.meta.term('Orientation')('Left Image'),
});

const WithHorizontalRightOrientation = asCardToken(WithHorizontalOrientationBase, {
  Layout: {
    Wrapper: 'flex-col md:flex-row-reverse w-full flex',
  },
  Meta: flowHoc.meta.term('Orientation')('Right Image'),
});

const WithFlowContainerPreview = asCardToken({
  Flow: ifComponentSelector,
  Core: {
    Description: replaceWith(CardDescriptionPreview),
  },
});

const WithPrimaryTextLink = asCardToken({
  Components: {
    CTALink: replaceWith(LinkClean),
  },
  Theme: {
    CTALink: vitalLink.PrimaryLink,
  },
  Meta: extendMeta(
    flowHoc.meta.term('CTA Style')('Text Link'),
    flowHoc.meta.term('CTA Type')('Visible Link'),
  ),
});

const WithPrimaryButton = asCardToken({
  Components: {
    CTAWrapper: replaceWith(Div),
    CTALink: replaceWith(ButtonClean),
  },
  Theme: {
    CTALink: as(vitalButtons.Primary, vitalButtons.WithArrow),
  },
  Meta: extendMeta(
    flowHoc.meta.term('CTA Style')('Primary Button'),
    flowHoc.meta.term('CTA Type')('Visible Link'),
  ),
});

const WithSecondaryButton = asCardToken({
  Components: {
    CTAWrapper: replaceWith(Div),
    CTALink: replaceWith(ButtonClean),
  },
  Theme: {
    CTALink: as(vitalButtons.Secondary, vitalButtons.WithArrow),
  },
  Meta: extendMeta(
    flowHoc.meta.term('CTA Style')('Secondary Button'),
    flowHoc.meta.term('CTA Type')('Visible Link'),
  ),
});

export interface VitalCardBase {

  /**
   * Composable token which removes unnecessary wrappers from the card
   */
  WithVerticalOrientation: CardToken,
  /**
   * Composable token which split cards in half with Image / Content on each side.
   */
  WithHorizontalOrientationBase: CardToken,
  /**
   * Composable token that extends WithHorizontalOrientationBase and
   * which defines Image on Left / Content on Right.
   *
   * <b>NOTE</b>:  WithHorizontalLeftOrientation & WithHorizontalRightOrientation are
   * mutually exclusive and shouldn't be combined together.
   */
  WithHorizontalLeftOrientation: CardToken,
  /**
   * Composable token that extends WithHorizontalOrientationBase and
   * which defines Image on Right / Content on Left.
   *
   * <b>NOTE</b>:  WithHorizontalLeftOrientation & WithHorizontalRightOrientation are
   * mutually exclusive and shouldn't be combined together.
   */
  WithHorizontalRightOrientation: CardToken,
  /**
   * Composable token which positions the content at top of card.
   *
   * <b>NOTE</b>: WithHorizontalContentAtTop & WithHorizontalContentCentered are
   * mutually exclusive and shouldn't be combined together.
   */
  WithHorizontalContentAtTop: CardToken,
  /**
   * Composable token which positions the content vertically centered in the card.
   *
   * <b>NOTE</b>: WithHorizontalContentAtTop & WithHorizontalContentCentered are
   * mutually exclusive and shouldn't be combined together.
   */
  WithHorizontalContentCentered: CardToken,
  /**
   * Composable token which repaces the flow container description (RTE preview)
   * with the word 'Description'
   */
  WithFlowContainerPreview: CardToken,
  /**
   * Composable token which adds a visible CTA with style primary text link
   */
  WithPrimaryTextLink: CardToken,
  /**
   * Composable token which adds a visible CTA with style primary button
   */
  WithPrimaryButton: CardToken,
  /**
   * Composable token which adds a visible CTA with style secondary button
   */
  WithSecondaryButton: CardToken,
}

export default Base;

export {
  WithVerticalOrientation,
  WithHorizontalOrientationBase,
  WithHorizontalLeftOrientation,
  WithHorizontalRightOrientation,
  WithHorizontalContentAtTop,
  WithHorizontalContentCentered,
  WithFlowContainerPreview,
  WithPrimaryTextLink,
  WithPrimaryButton,
  WithSecondaryButton,
};
