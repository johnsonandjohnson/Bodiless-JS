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

import { extendMeta, flowHoc, replaceWith } from '@bodiless/fclasses';
import { ifComponentSelector } from '@bodiless/layouts';
import { asBodilessLink } from '@bodiless/components-ui';
import { vitalCardCore, asCardToken } from '@bodiless/vital-card-core';
import type { CardToken, VitalCard } from '@bodiless/vital-card-core';
import WithBodilessEditor, { VitalCardBodilessEditor } from './Editor';
import { CardDescriptionPreview } from '../CardClean';

const WithFlowContainerPreview = asCardToken({
  Flow: ifComponentSelector,
  Core: {
    Description: replaceWith(CardDescriptionPreview),
  },
});

const Default = asCardToken(
  vitalCardCore.Base,
  WithBodilessEditor,
);

const Basic = asCardToken(Default, {
  Meta: extendMeta(
    flowHoc.meta.term('Sub Type')('Basic'),
    flowHoc.meta.term('CTA Type')('Fully Clickable'),
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
  vitalCardCore.HeroBase,
  vitalCardCore.WithHorizontalContentCentered,
  vitalCardCore.WithHorizontalLeftOrientation,
  WithHeroEditors,
);

/**
 * Tokens for the vital card that make it Editable
 *
 * @category Token Collection
 * @see [[VitalCardClean]]
 */
interface VitalCardEditable {
  /**
   * Defines the base card for the Vital DS.
   * - Editor/Content/Schema domains defines editors on Title/Eyebrow/Description/CTA
   *   and makes the entire Card clickable.
   * - Components domain hides the CTA and adds in vitalImage.Default for Image.
   * - Theme domain styles Wrappers for Eyebrow, Title, Description.
   * - Layout domain defines a basic full-width component in flex.
   * - Spacing domain: add spacing to Eyebrow
   *
   * #### Customizing:
   *
   * @example Add a component
   * ```js
   * import { vitalCard } from '@bodiless/vital-flowcontainer';
   *
   * const Default = asFluidToken(vitalCardStatic.Default, {
   *   Components: {
   *     MyComponent: on(cardClean)(
   *       vitalCardStatic.Default,
   *       WithMyCustomBorder,
   *       WithNoDescription
   *     ),
   *   }
   * });
   * ```
   */
  Default: CardToken,
  /**
   * Defines a primary vertical card
   */
  Basic: CardToken,
  /**
   * Hero extends the HeroBase token and combines it to have image on left
   * and content is vertically centered.
   */
  Hero: CardToken,
  /**
   * Composable token which repaces the flow container description (RTE preview)
   * with the word 'Description'
   */
  WithFlowContainerPreview: CardToken,
}

/**
 * Tokens for the vital card
 *
 * @category Token Collection
 * @see [[CardClean]]
 */
export interface VitalCardBodiless extends
  VitalCard,
  VitalCardEditable,
  VitalCardBodilessEditor
{}

/**
 * Tokens for cards.
 *
 * @category Token Collection
 */
const vitalCard: VitalCardBodiless = {
  ...vitalCardCore,
  Default,
  Basic,
  Hero,
  WithFlowContainerPreview,
  WithBodilessEditor,
};

export default vitalCard;
