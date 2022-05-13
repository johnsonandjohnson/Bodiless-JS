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

import { withNodeKey } from '@bodiless/core';
import {
  flowHoc, replaceWith, on, Div, extendMeta, H1, H4, as
} from '@bodiless/fclasses';
import { withPlaceholder } from '@bodiless/components';
import { asBodilessLink } from '@bodiless/components-ui';
import { vitalImage } from '@bodiless/vital-image';
import { vitalLink } from '@bodiless/vital-link';
import { vitalTypography, vitalColor } from '@bodiless/vital-elements';
import {
  EditorPlainClean, vitalEditorPlain, RichTextClean, vitalRichText,
} from '@bodiless/vital-editors';
import { asCardToken } from '../CardClean';
import { CardNodeKeys } from './constants';

/**
 * Basic Card Design.
 */
const Base = asCardToken({
  Editors: {
    Wrapper: asBodilessLink(),
    Title: on(EditorPlainClean)(vitalEditorPlain.Default),
    Eyebrow: on(EditorPlainClean)(vitalEditorPlain.Default),
    Description: on(RichTextClean)(vitalRichText.BasicNoLink),
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

/**
 * WithNoTitle removes title from the card
 */
const WithNoTitle = asCardToken({
  Components: {
    TitleWrapper: replaceWith(() => null),
  },
  Meta: flowHoc.meta.term('Description')('No Title'),
});

/**
 * WithNoDescription removes the description from the card and adjusts title.
 *
 *  where
 *     Title - adds grow because description will not exist
 */
const WithNoDescription = asCardToken({
  Components: {
    DescriptionWrapper: replaceWith(() => null),
  },
  Layout: {
    Title: 'flex-grow',
  },
  Meta: flowHoc.meta.term('Description')('No Description'),
});

/**
 * Hero Card Design.
 */
const Hero = asCardToken({
  ...Base,
  Editors: {
    ...Base.Editors,
    CTALink: asBodilessLink(),
    Wrapper: undefined,
  },
  Components: {
    ...Base.Components,
    Wrapper: replaceWith(Div),
    EyebrowWrapper: replaceWith(() => null),
    Image: vitalImage.Default,
    CTAWrapper: replaceWith(Div),
    TitleWrapper: replaceWith(H1),
    DescriptionWrapper: replaceWith(H4),
  },
  Behavior: {
    Image: vitalImage.WithEager,
  },
  Layout: {
    ...Base.Layout,
    Wrapper: 'md:flex-row w-full flex flex-col',
    Image: 'w-full',
    ImageWrapper: 'md:w-1/2 flex flex-col',
    ContentWrapper: 'md:w-1/2 flex flex-col',
    Description: 'flex-grow',
    CTAWrapper: 'md:w-1/2 flex flex-col mx-auto justify-center items-center',
    CTALink: 'w-full text-center',
  },
  Spacing: {
    ...Base.Spacing,
    ContentWrapper: 'px-10',
    ImageWrapper: 'p-0',
    CTALink: 'px-8 py-4',
  },
  Theme: {
    ...Base.Theme,
    CTAWrapper: vitalColor.BgPrimaryPage,
    TitleWrapper: vitalTypography.H1,
    DescriptionWrapper: vitalTypography.H4,
    CTALink: as(vitalLink.WithDownloadStyles, vitalLink.WithExternalStyles),
  },
  Meta: extendMeta(
    flowHoc.meta.term('Description')('Hero'),
    flowHoc.meta.term('Orientation')('Horizontal'),
  ),
});

const Default = asCardToken({
  ...Base,
});

export default {
  Base,
  Default,
  Hero,
  WithNoDescription,
  WithNoTitle,
  WithHorizontalOrientation,
  WithVerticalOrientation,
};
