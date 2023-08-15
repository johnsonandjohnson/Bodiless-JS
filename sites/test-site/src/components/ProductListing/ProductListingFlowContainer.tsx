/**
 * Copyright © 2021 Johnson & Johnson
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
import { flowHoc, addProps } from '@bodiless/fclasses';
import { withNodeKey } from '@bodiless/data';
// @ts-ignore Could not find a declaration file
import resolvedConfigs from
  '@bodiless/fclasses/src/tailwindcss/resolveConfig';
import { getSnapFrom, withTailwindClasses } from '@bodiless/layouts';
import { FlowContainer } from '@bodiless/layouts-ui';
import withProductVariations from './withProductVariations';
import { asFilterableProductContainer } from '../ProductCard/token';
import { asFlowContainerWithMargins, asFlowContainerFullWidth } from '../FlowContainer/token';
// @ts-ignore Could not find a declaration file

const snapData = getSnapFrom(
  withTailwindClasses(resolvedConfigs)('w-1/3'),
);

const withProductStrictSnapSize = addProps({ snapData });

const ProductListingFlowContainer = flowHoc(
  asFilterableProductContainer,
  withProductStrictSnapSize,
  withProductVariations,
  asFlowContainerFullWidth,
  asFlowContainerWithMargins,
  withNodeKey({ nodeKey: 'product_listing_cards', nodeCollection: 'site' }),
)(FlowContainer);

// eslint-disable-next-line import/prefer-default-export
export { ProductListingFlowContainer };
