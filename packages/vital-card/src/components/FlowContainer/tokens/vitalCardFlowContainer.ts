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
  on, varyDesigns, flowHoc, extendDesign, removeClasses,
} from '@bodiless/fclasses';
import type { FluidToken } from '@bodiless/vital-elements';
import {
  CardStatic, vitalCardStatic, asCardToken,
} from '../../Card';

/*
 * Content Variations to use all fields or remove specic fields.
 */
const ContentVariations = {
  All: asCardToken({
    Meta: flowHoc.meta.term('Features')('With All Fields'),
  }),
  NoTitle: vitalCardStatic.WithNoTitle,
  NoDescription: vitalCardStatic.WithNoDescription,
  NoEyebrow: vitalCardStatic.WithNoEyebrow,
};

const resetVerticalPadding = asCardToken({
  Spacing: {
    ImageWrapper: removeClasses('py-4')
  }
});

/*
 * Horizontal Variations to vary on Left or Right Images & Content Top & Centered.
 */
const HorizontalVariations = varyDesigns(
  {
    Left: vitalCardStatic.WithHorizontalLeftOrientation,
    Right: vitalCardStatic.WithHorizontalRightOrientation,
  },
  {
    ContentTop: vitalCardStatic.WithHorizontalContentAtTop,
    ContentCentered: vitalCardStatic.WithHorizontalContentCentered,
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
    Vertical: vitalCardStatic.WithVerticalOrientation,
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
  Link: vitalCardStatic.WithPrimaryTextLink,
  PrimaryButton: vitalCardStatic.WithPrimaryButton,
  SecondaryButton: vitalCardStatic.WithSecondaryButton,
};

const BasicVariation = {
  Card: on(CardStatic)(vitalCardStatic.Basic, vitalCardStatic.WithFlowContainerPreview),
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
    Hero: on(CardStatic)(
      vitalCardStatic.Hero,
      vitalCardStatic.WithFlowContainerPreview,
      resetVerticalPadding
    ),
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
  Category: on(CardStatic)(vitalCardStatic.Category, vitalCardStatic.WithFlowContainerPreview),
};

const WithCategoryVariations = asFluidToken({
  Components: {
    ...CategoryVariations,
  },
});

const TopicVariations = varyDesigns(
  {
    Topic: on(CardStatic)(vitalCardStatic.Topic, vitalCardStatic.WithFlowContainerPreview),
  },
  LinkVariations,
  {
    All: asCardToken({
      Meta: flowHoc.meta.term('Features')('With All Fields'),
    }),
    NoEyebrow: vitalCardStatic.WithNoEyebrow,
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
  NoDescription: vitalCardStatic.WithNoDescription,
  NoEyebrow: vitalCardStatic.WithNoEyebrow,
  NoRatings: asCardToken({
    Meta: flowHoc.meta.term('Features')('No Ratings'),
  }),
};

const ProductVariations = varyDesigns(
  {
    Product: on(CardStatic)(vitalCardStatic.Product, vitalCardStatic.WithFlowContainerPreview),
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
   * @example Add components via shadowing.
   * ```js
   * const WithCardVariations = asFluidToken(vitalCardFlowContainerBase, {
   *   Components: {
   *     ...vitalCardFlowContainerBase.ProductVariations,
   *     ...myCustomVariations
   *   },
   * });
   * ```
   */
  WithCardVariations: FluidToken,
  /**
   * Composable token which adds basic card variations.
   * Defined by Fully clickable card with no visible CTA varied over
   *  - Orientation Properties
   *  - Content Varitions
   */
  WithBasicVariations: FluidToken,
  /**
   * Composable token which adds hero card variations.
   * Defined by HeroBase - horizontal only cards with visible CTA varied over
   *  - Link Styles
   *  - Horizontal Variations to vary on Left or Right Images & Content Top & Centered.
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
   * Defined by vertical only cards and with CTA varied over
   * - Link Variations
   * - Content remove of eyebrow
   */
  WithProductVariations: FluidToken,
}

/**
 * @category Token Collection
 */
const vitalCardFlowContainer: VitalCardFlowContainer = {
  WithBasicVariations,
  WithHeroVariations,
  WithCategoryVariations,
  WithTopicVariations,
  WithProductVariations,
  WithCardVariations,
};

export default vitalCardFlowContainer;
