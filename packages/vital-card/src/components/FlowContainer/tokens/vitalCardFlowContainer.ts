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

import { asFluidToken } from '@bodiless/vital-elements';
import {
  on, varyDesigns, flowHoc, extendDesign,
} from '@bodiless/fclasses';
import {
  CardClean, vitalCard, asCardToken,
} from '../../Card';

/*
 * Content Variations to use all fields or remove specic fields.
 */
const ContentVariations = {
  All: asCardToken({
    Meta: flowHoc.meta.term('Features')('With All Fields'),
  }),
  NoTitle: vitalCard.WithNoTitle,
  NoDescription: vitalCard.WithNoDescription,
  NoEyebrow: vitalCard.WithNoEyebrow,
};

/*
 * Horizontal Variations to vary on Left or Right Images & Content Top & Centered.
 */
const HorizontalVariations = varyDesigns(
  {
    Left: vitalCard.WithHorizontalLeftOrientation,
    Right: vitalCard.WithHorizontalRightOrientation,
  },
  {
    ContentTop: vitalCard.WithHorizontalContentAtTop,
    ContentCentered: vitalCard.WithHorizontalContentCentered,
  },
);

/*
  * Vary Horizontal Variations over Content Varitions
  */
const HorizontalOrientationVariations = varyDesigns(
  HorizontalVariations,
  ContentVariations,
);

/*
 * Vary Vertical Variations over Content Varitions
 */
const VerticalOrientationVariations = varyDesigns(
  {
    Vertical: vitalCard.WithVerticalOrientation,
  },
  ContentVariations,
);

/*
 * Combine Horizontal with Vertical
 */
const OrientationVariations = extendDesign(
  HorizontalOrientationVariations,
  VerticalOrientationVariations,
);

/*
 * Link CTA variations
 */
const LinkVariations = {
  Link: vitalCard.WithPrimaryTextLink,
  PrimaryButton: vitalCard.WithPrimaryButton,
  SecondaryButton: vitalCard.WithSecondaryButton,
};

const BasicVariation = {
  Card: on(CardClean)(vitalCard.Basic, vitalCard.WithFlowContainerPreview),
};

const BasicVariations = varyDesigns(
  BasicVariation,
  OrientationVariations,
);

const WithBasicVariations = asFluidToken({
  Components: {
    ...BasicVariations,
  },
});

const HeroVariations = varyDesigns(
  {
    Hero: on(CardClean)(vitalCard.HeroBase, vitalCard.WithFlowContainerPreview),
  },
  LinkVariations,
  HorizontalVariations,
);

const WithHeroVariations = asFluidToken({
  Components: {
    ...HeroVariations,
  },
});

/*
  * TBD: Stubbing out future Category / Topic / Product
  * Will comment out so these don't have to fully built & tested yet.
  */

const CategoryVariations = {
  Category: on(CardClean)(vitalCard.Category, vitalCard.WithFlowContainerPreview),
};

const WithCategoryVariations = asFluidToken({
  Components: {
    ...CategoryVariations,
  },
});

const TopicVariations = varyDesigns(
  {
    Topic: on(CardClean)(vitalCard.Topic, vitalCard.WithFlowContainerPreview),
  },
  LinkVariations,
  {
    All: asCardToken({
      Meta: flowHoc.meta.term('Features')('With All Fields'),
    }),
    NoEyebrow: vitalCard.WithNoEyebrow,
  }
);

const WithTopicVariations = asFluidToken({
  Components: {
    ...TopicVariations,
  },
});

/*
 * Product Content Variations to use all fields or remove specic fields.
 */
const ProductContentVariations = {
  All: asCardToken({
    Meta: flowHoc.meta.term('Features')('With All Fields'),
  }),
  NoDescription: vitalCard.WithNoDescription,
  NoEyebrow: vitalCard.WithNoEyebrow,
  NoRatings: asCardToken({
    Meta: flowHoc.meta.term('Features')('No Ratings'),
  }),
};

const ProductVariations = varyDesigns(
  {
    Product: on(CardClean)(vitalCard.Product, vitalCard.WithFlowContainerPreview),
  },
  {
    FullyClickable: asCardToken({ Meta: flowHoc.meta.term('CTA Type')('Fully Clickable'), }),
    ...LinkVariations,
  },
  ProductContentVariations,
);

const WithProductVariations = asFluidToken({
  Components: {
    ...ProductVariations,
  },
});

const WithCardVariations = asFluidToken({
  Compose: {
    WithBasicVariations,
    WithHeroVariations,
    WithCategoryVariations,
    WithTopicVariations,
    WithProductVariations,
  },
});

const fluidToken = asFluidToken();
type FluidToken = typeof fluidToken;

/**
 * Tokens for the vital card flow container
 *
 * @category Token Collection
 */
export interface VitalCardFlowContainer {
  /**
   * Composable token which adds all card variations.
   *
   * #### Shadowing:
   *
   * @example Add a component
   * ```js
   * const WithCardVariations = asFluidToken({
   *   Components: {
   *     ...vitalCardFlowContainerBase.BasicVariations,
   *     ...vitalCardFlowContainerBase.HeroVariations
   *   },
   * });
   */
  WithCardVariations: FluidToken,
  /**
   * Token defining the basic variations
   * Defined by Fully clickable card with no visible CTA varied over
   *  - Orientation Properties
   *  - Content Varitions
   */
  BasicVariations: FluidToken,
  /**
   * Token defining the hero variations
   * Defined by HeroBase - horizontal only cards with visible CTA varied over
   *  - Link Styles
   *  - Horizontal Variations to vary on Left or Right Images & Content Top & Centered.
   */
  HeroVariations: FluidToken,
  /**
   * Token defining the topic variations
   * Defined by vertical only cards and with CTA varied over
   * - Link Variations
   * - Content remove of eyebrow
   */
  TopicVariations: FluidToken,
  /**
   * Token defining the product variations
   * Defined by vertical only cards
   * - Fully Clickable or with Link Variations
   * - Product content varations
   */
  ProductVariations: FluidToken,
  /**
   * Composable token which adds basic card variations.
   */
  WithBasicVariations: FluidToken,
  /**
   * Composable token which adds hero card variations.
   */
  WithHeroVariations: FluidToken,
  /**
   * Composable token which adds category card - no variations.
   */
  WithCategoryVariations: FluidToken,
  /**
   * Composable token which adds topic card variations.
   */
  WithTopicVariations: FluidToken,
  /**
   * Composable token which adds product card variations.
   */
  WithProductVariations: FluidToken,
}

/**
 *
 * @category Token Collection
 */
const vitalCardFlowContainer: VitalCardFlowContainer = {
  BasicVariations,
  HeroVariations,
  TopicVariations,
  ProductVariations,
  WithBasicVariations,
  WithHeroVariations,
  WithCategoryVariations,
  WithTopicVariations,
  WithProductVariations,
  WithCardVariations,
};

export default vitalCardFlowContainer;
