/**
 * Copyright © 2019 Johnson & Johnson
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
import React from 'react';
import { flow } from 'lodash';
import { FlexboxGrid } from '@bodiless/layouts-ui';
import withProductVariations from './withProductVariations';
import { asFlexboxWithMargins } from '../Flexbox/token';

const withProductStrictSnapSize = Component => props => (
  <Component
    {...props}
    snapData={() => ({ className: 'w-full lg:w-1/4' })}
  />
);

const ProductListingFlexBox = flow(
  withProductStrictSnapSize,
  withProductVariations,
  asFlexboxWithMargins,
)(FlexboxGrid);

// eslint-disable-next-line import/prefer-default-export
export { ProductListingFlexBox };
