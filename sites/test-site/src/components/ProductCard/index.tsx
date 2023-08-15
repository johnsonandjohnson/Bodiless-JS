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

import { withSidecarNodes } from '@bodiless/data';
import {
  withDesign, startWith, flowHoc, A
} from '@bodiless/fclasses';
import { ProductClean } from '@bodiless/organisms';
import { BVInlineRatings } from '@bodiless/bv';
import { withEditorBasic, withEditorSimple } from '../Editors';
import {
  asEditableLink,
} from '../Elements.token';
import { asEditableImagePlain as asEditableImage } from '../Image';
import { asProductCardDefaultStyle } from './token';

export const asProductCard = flowHoc(
  withDesign({
    ImageLink: withSidecarNodes(
      asEditableLink('cta'),
      startWith(A),
    ),
    Image: asEditableImage('image'),
    TitleLink: withSidecarNodes(
      asEditableLink('cta'),
      startWith(A),
    ),
    Title: withEditorSimple('title', 'Product Title Text'),
    BvReviewLink: withSidecarNodes(
      asEditableLink('cta'),
      startWith(A),
    ),
    BvReview: () => BVInlineRatings,
    Body: withEditorBasic('body', 'Product Body Text'),
  }),
);

export const ProductCard = flowHoc(
  asProductCard,
  asProductCardDefaultStyle,
)(ProductClean);
