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

import { flow } from 'lodash';
import { withSidecarNodes } from '@bodiless/core';
import {
  withDesign,
} from '@bodiless/fclasses';
import { ProductClean } from '@bodiless/organisms';
import { BVInlineRatings } from '@bodiless/bv';
import { withEditorBasic, withEditorSimple } from '../Editors';
import {
  asEditableLink,
  asEditableImage,
} from '../Elements.token';
import { asProductToutDefaultStyle } from './token';

export const asProductTout = flow(
  withDesign({
    ImageLink: withSidecarNodes(
      asEditableLink('cta'),
    ),
    Image: asEditableImage('image'),
    TitleLink: withSidecarNodes(
      asEditableLink('cta'),
    ),
    Title: withEditorSimple('title', 'Product Title Text'),
    BvReviewLink: withSidecarNodes(
      asEditableLink('cta'),
    ),
    BvReview: () => BVInlineRatings,
    Body: withEditorBasic('body', 'Product Body Text'),
  }),
);

export const ProductTout = flow(
  asProductTout,
  asProductToutDefaultStyle,
)(ProductClean);
