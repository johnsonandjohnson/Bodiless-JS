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

import React, { FC, HTMLProps } from 'react';
import flowRight from 'lodash/flowRight';
import { withBVLoader } from '../BVLoader';
import { asDesignableBVComponent } from '../asBVComponent';
import { BVProps } from '../BVProps';
import { asEditableBV } from '../asEditableBV';

type DivProps = HTMLProps<HTMLDivElement>;

type Props = DivProps & BVProps;

const onLoaded = ({ productId }: BVProps) => {
  // @ts-ignore since $BV variable is defined in external script
  if (typeof $BV !== 'undefined') {
    // @ts-ignore
    $BV.ui('rr', 'show_reviews', { productId }); // eslint-disable-line no-undef
  }
};

const BVPlainRatingsSummary: FC<Props> = () => <div id="BVRRSummaryContainer" />;

export const BVRatingsSummaryBase = asDesignableBVComponent('BV Ratings Summary', onLoaded)(BVPlainRatingsSummary);

const BVRatingsSummary = flowRight(
  withBVLoader,
  asEditableBV,
)(BVRatingsSummaryBase);

export default BVRatingsSummary;
