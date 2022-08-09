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

import React, { ComponentType } from 'react';
import {
  designable,
  as,
} from '@bodiless/fclasses';
import { withNode } from '@bodiless/core';
import { CardComponents, cardComponentStart, CardBase, asCardToken } from '@bodiless/vital-card-core';
import type { CardProps, CardToken } from '@bodiless/vital-card-core';
import { withoutHydration } from '@bodiless/hydration';

/**
 * This is the base component for cards.
 *
 * @category Component
 *
 * @example
 * **Create a default card:**
 * ```
 * const DefaultCard = on(CardClean)(vitalCardStatic.Default)
 * ```
 * @example
 * **Create a custom card using a token defined in your package**
 * ```
 * const CustomCard = on(CardClean)(myBrandCard.Custom)
 * ```
 */
const CardClean = as(
  designable(cardComponentStart, 'Card'),
  withNode,
)(CardBase);

const CardDescriptionPreview = () => <span className="bl-text-gray-800">Description</span>;

/**
 * Use this version of the card when all components are static.
 *
 * @category Component
 */
const CardStatic: ComponentType<CardProps> = withoutHydration()(CardClean);

export default CardClean;
export {
  CardStatic,
  CardComponents,
  asCardToken,
  CardDescriptionPreview,
};

export type { CardToken };
