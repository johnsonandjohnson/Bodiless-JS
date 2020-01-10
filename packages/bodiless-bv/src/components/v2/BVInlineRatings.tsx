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

import React, { HTMLProps, FC } from 'react';
import { flowRight } from 'lodash';
import { withBVLoader } from '../BVLoader';
import { asDesignableBVComponent } from '../asBVComponent';
import { BVProps } from '../BVProps';
import { asEditableBV } from '../asEditableBV';

type DivProps = HTMLProps<HTMLDivElement>;

type Props = DivProps & BVProps;

export const BVPlainInlineRatings: FC<Props> = ({ productId, redirectUrl, seo }) => {
  const props: any = {
    'data-bv-product-id': productId,
    'data-bv-redirect-url': redirectUrl,
    'data-bv-seo': seo,
  };
  return <div data-bv-show="inline_rating" {...props} />;
};

export const BVInlineRatingsBase = asDesignableBVComponent('BV Inline Ratings')(BVPlainInlineRatings);

const BVInlineRatings = flowRight(
  withBVLoader,
  asEditableBV,
)(BVInlineRatingsBase);

export default BVInlineRatings;
