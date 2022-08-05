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
import {
  flowHoc, replaceWith, Div, extendMeta, H1, H4,
} from '@bodiless/fclasses';
import { vitalImage } from '@bodiless/vital-image';
import { vitalTypography } from '@bodiless/vital-elements';
import { asBodilessLink } from '@bodiless/components-ui';
import { asCardToken } from '../CardClean';
import type { CardToken } from '../CardClean';
import Base, {
  WithHorizontalOrientationBase,
  WithHorizontalLeftOrientation,
  WithHorizontalContentCentered,
} from './Base';
import WithBodilessEditor from './Editor';

const HeroBase = asCardToken({
  ...Base,

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
  Layout: WithHorizontalOrientationBase.Layout,
  Spacing: {
    ...Base.Spacing,
    ContentWrapper: 'px-10',
    ImageWrapper: 'py-4 md:p-0',
    TitleWrapper: 'mb-5 lg:mb-6',
    DescriptionWrapper: 'mb-5 lg:mb-6',
  },
  Theme: {
    TitleWrapper: omit(vitalTypography.H1, 'Spacing'),
    DescriptionWrapper: omit(vitalTypography.H4, 'Spacing'),
  },
  Meta: extendMeta(
    flowHoc.meta.term('Type')('Card'),
    flowHoc.meta.term('Sub Type')('Hero'),
  ),
});

const WithHeroEditors = asCardToken(
  WithBodilessEditor,
  {
    // Remove Link Editor from Wrapper and to the CTALink
    Editors: {
      Wrapper: undefined,
      CTALink: asBodilessLink(),
    },
  },
);

const Hero = asCardToken(
  HeroBase,
  WithHorizontalContentCentered,
  WithHorizontalLeftOrientation,
  WithHeroEditors,
);

export interface VitalCardHero {
  /**
   * Defines the Hero card for the Vital DS.  Intended use is first card on a page.
   * - Extends the Base card.
   * - Remove the Wrapper removes setting link for the the fully clickable card.
   * - Components domain:
   *   - Replaces Wrapper 'A' -> 'Div' to remove fully clickable feature
   *   - Enables CTA Wrapper to make the CTA visible.
   *   - Removes Eyebrow
   *   - Title is replaced with H1.
   *   - Description is replaced with H4.
   * - Layout domain defines Hero with Horizontal Base
   * - Spacing domain: add custom spacing to the hero card
   * - Theme: eliminates the Typography spacing to allow Spacing domain to take fully control.
   *
   * #### Customizing:
   *
   * @example Add a component
   * ```js
   * import { vitalCard } from '@bodiless/vital-flowcontainer';
   *
   * const MyCustomHero = asCardToken(
   *   HeroBase,
   *   WithHorizontalContentCentered,
   *   WithHorizontalRightOrientation,
   *   WithNoDescription,
   * );
   * ```
   */
  HeroBase: CardToken,
  /**
   * Hero extends the HeroBase token and combines it to have image on left
   * and content is vertically centered.
   */
  Hero: CardToken,
}

export {
  HeroBase,
  Hero,
};
