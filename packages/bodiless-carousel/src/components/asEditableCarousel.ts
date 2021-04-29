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

import { withNode } from '@bodiless/core';
import type { WithNodeKeyProps } from '@bodiless/core';
import { asBodilessList } from '@bodiless/components';
import { withDesign, replaceWith, asToken } from '@bodiless/fclasses';
import { Slide } from 'pure-react-carousel';
import withTotalSlides from './withTotalSlides';
import { withIntrinsicHeight, withNoDragIfEditable } from './token';

const asEditableCarousel = (nodeKeys?: WithNodeKeyProps) => asToken(
  withNode,
  withDesign({
    Wrapper: withTotalSlides(nodeKeys),
    Slider: asToken(
      asBodilessList(nodeKeys, undefined, () => ({ groupLabel: 'Slide' })),
      withDesign({
        Item: replaceWith(Slide),
      }),
    ),
  }),
  withIntrinsicHeight,
  withNoDragIfEditable,
);

export default asEditableCarousel;
