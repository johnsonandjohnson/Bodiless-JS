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

import {
  flowHoc, replaceWith, Div, extendMeta, H1, H4, as
} from '@bodiless/fclasses';
// import { asBodilessLink } from '@bodiless/components-ui';
import { vitalImage } from '@bodiless/vital-image';
// import { vitalLink } from '@bodiless/vital-link';
import { ButtonClean, vitalButtons } from '@bodiless/vital-buttons';
import { vitalTypography } from '@bodiless/vital-elements';
import { LinkClean, vitalLink } from '@bodiless/vital-link';
import { asCardToken } from '../CardClean';
import Base, { WithHorizontalOrientation } from './Base';

/**
 * Hero Base Card Design.
 */
const BaseHero = asCardToken({
  ...Base,
  Editors: {
    ...Base.Editors,
    Wrapper: undefined, // Remove Link Editor from Cards;
  },
  Components: {
    ...Base.Components,
    Wrapper: replaceWith(Div),
    EyebrowWrapper: replaceWith(() => null),
    CTAWrapper: replaceWith(Div),
    TitleWrapper: replaceWith(H1),
    DescriptionWrapper: replaceWith(H4),
  },
  Behavior: {
    Image: vitalImage.WithEager,
  },
  Layout: WithHorizontalOrientation.Layout,
  Spacing: {
    ...Base.Spacing,
    ContentWrapper: 'px-10', // different
    ImageWrapper: 'p-0', // different
    TitleWrapper: 'mb-5 lg:mb-6',
  },
  Theme: {
    TitleWrapper: vitalTypography.H1NoSpacing,
    DescriptionWrapper: vitalTypography.H4NoSpacing,
  },
  Meta: extendMeta(
    flowHoc.meta.term('Description')('Hero'),
    flowHoc.meta.term('Orientation')('Horizontal'),
  ),
});

/*
 * Hero with vitalArrowLink
 */
const Hero = asCardToken(BaseHero, {
  Components: {
    CTALink: replaceWith(LinkClean),
  },
  Theme: {
    CTALink: vitalLink.Default,
  },
});

/*
 * Hero with vitalPrimaryButton
 */
const HeroWithPrimaryButton = asCardToken(BaseHero, {
  Components: {
    CTALink: replaceWith(ButtonClean),
  },
  Theme: {
    CTALink: as(vitalButtons.Primary, vitalButtons.WithArrow),
  },
});

export {
  Hero,
  HeroWithPrimaryButton,
};
