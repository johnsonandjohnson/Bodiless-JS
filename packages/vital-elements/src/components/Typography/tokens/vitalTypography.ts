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

import { as } from '@bodiless/fclasses';
import { asElementToken, asTokenGroup } from '../../../util';
import { vitalColor } from '../../Color';
import { vitalFontSize } from '../../FontSize';
import { vitalTextDecoration } from '../../TextDecoration';
import { TypographyMeta } from '../meta';

const Link = asElementToken({
  Theme: {
    _: as(
      vitalTextDecoration.Bold,
      vitalTextDecoration.Underline,
      vitalColor.TextPrimaryInteractive,
    ),
  },
  Meta: TypographyMeta,
});

const H1 = asElementToken({
  Core: {
    /**
     * Note that in scope of a Typography Token, we consider
     * `font-size` and `font-weight` as an attribute of the 'Core' Domain
     * since they are likely to be preserved when changing H1 Theme.
     */
    _: as(
      vitalFontSize.XXXL,
      vitalTextDecoration.Bold,
    ),
  },
  Theme: {
    _: vitalColor.TextPrimaryHeaderCopy,
  },
  Spacing: {
    _: 'mt-10 mb-5 lg:mb-6',
  },
  Meta: TypographyMeta,
});

const H2 = asElementToken({
  Core: {
    /**
     * Note that in scope of a Typography Token, we consider
     * `font-size` and `font-weight` as an attribute of the 'Core' Domain
     * since they are likely to be preserved when changing H1 Theme.
     */
    _: as(
      vitalTextDecoration.Bold,
      vitalFontSize.XXL,
    ),
  },
  Theme: {
    _: vitalColor.TextPrimaryHeaderCopy,
  },
  Spacing: {
    _: 'mb-5',
  },
  Meta: TypographyMeta,
});

const H3 = asElementToken({
  Core: {
    /**
     * Note that in scope of a Typography Token, we consider
     * `font-size` and `font-weight` as an attribute of the 'Core' Domain
     * since they are likely to be preserved when changing H1 Theme.
     */
    _: as(
      vitalFontSize.XL,
      vitalTextDecoration.Medium,
    ),
  },
  Theme: {
    _: vitalColor.TextPrimaryHeaderCopy,
  },
  Spacing: {
    _: 'mb-5',
  },
  Meta: TypographyMeta,
});

const H4 = asElementToken({
  Core: {
    /**
     * Note that in scope of a Typography Token, we consider
     * `font-size` and `font-weight` as an attribute of the 'Core' Domain
     * since they are likely to be preserved when changing H1 Theme.
     */
    _: as(
      vitalFontSize.XL,
      vitalTextDecoration.Normal,
    ),
  },
  Theme: {
    _: vitalColor.TextPrimaryHeaderCopy,
  },
  Spacing: {
    _: 'mb-5.75 lg:mb-9',
  },
});

const H5 = asElementToken({
  Core: {
    /**
     * Note that in scope of a Typography Token, we consider
     * `font-size` and `font-weight` as an attribute of the 'Core' Domain
     * since they are likely to be preserved when changing H1 Theme.
     */
    _: as(
      vitalFontSize.Base,
      vitalTextDecoration.Medium,
    ),
  },
  Theme: {
    _: vitalColor.TextPrimaryHeaderCopy,
  },
  Spacing: {
    _: 'mb-5 lg:mb-4.5',
  },
  Meta: TypographyMeta,
});

const HeaderLink = asElementToken({
  Theme: {
    _: as(
      vitalColor.TextPrimaryInteractive,
      vitalTextDecoration.Underline,
    )
  }
});

const Body = asElementToken({
  Core: {
    _: vitalFontSize.Base,
  },
  Theme: {
    _: as(
      vitalTextDecoration.Normal,
      vitalColor.TextPrimaryBodyCopy,
    ),
  },
  Spacing: {
    _: 'mb-6',
  },
  Meta: TypographyMeta,
});

const Eyebrow = asElementToken({
  Core: {
    _: vitalFontSize.XS,
  },
  Theme: {
    _: as(
      vitalTextDecoration.Uppercase,
      vitalTextDecoration.ExtraBold,
      vitalColor.TextSecondaryEyebrow,
    ),
  },
  Spacing: {
    _: 'mb-3',
  },
});
const EyebrowNoSpacing = asElementToken({
  ...Eyebrow,
  Spacing: {},
});

// This probably will need a better name as Design team defines the uses of this token.
// They have called it crumbs & reviews now.
const Rest = asElementToken({
  Core: {
    _: vitalFontSize.XS,
  },
  Theme: {
    _: as(
      vitalTextDecoration.Normal,
      vitalColor.TextPrimaryBodyCopy,
    ),
  },
  Meta: TypographyMeta,
});

// Variant testing autoprefixer
const Gradient = asElementToken({
  Core: {
    _: vitalFontSize.L,
  },
  Theme: {
    _: as('bg-clip-text text-transparent bg-gradient-to-r',
      'from-vital-secondary-eyebrow via-vital-primary-interactive to-vital-secondary-eyebrow',),
  },
  Meta: TypographyMeta,
});

/**
 * Vital 2.0 Colors coming from Figma Tokens. Tokens above will be deprecated.
 * @TODO: What should be the name for these token groups with vital 2.0 semantic tokens?
 * Eventually it will just replace the vitalTypography.
 */
export const vital2Typography = asTokenGroup(TypographyMeta)({
  H1: 'text-4xl leading-5 font-normal font-2',
  H2: 'text-3xl leading-5 font-normal font-2',
  H3: 'text-2xl leading-5 font-normal font-2',
  H4: 'text-xl leading-5 font-normal font-2',
  H5: 'text-lg leading-5 font-normal font-2',
  BodyRegular: 'text-base leading-6 font-normal font-2',
  BodyBold: 'text-base leading-6 font-bold font-2',
  BodyInlineLink: 'text-base leading-6 font-bold font-2 underline',
  BodyLargeRegular: 'text-lg leading-6 font-normal font-2',
  BodyLargeBold: 'text-lg leading-6 font-bold font-2',
  BodyLargeInlineLink: 'text-lg leading-6 font-bold font-2 underline',
  Eyebrow: 'text-sm leading-6 font-bold font-2 uppercase',
  Link: 'text-base leading-6 font-bold font-2 uppercase',
  CrumbsReviewsRegular: 'text-sm leading-6 font-normal font-2',
});

export default {
  Link,
  H1,
  H2,
  H3,
  H4,
  H5,
  HeaderLink,
  Body,
  Eyebrow,
  EyebrowNoSpacing,
  Rest,
  Gradient,
};
