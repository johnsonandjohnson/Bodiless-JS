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
import {
  H1,
  Div,
  Img,
  addClasses,
  addProps,
} from '@bodiless/fclasses';
import Tout from '../Tout';
import { withEditorSimple } from '../Editors';
import {
  asHeader1,
  asImage,
  asEditableImage,
  asYMargin,
  asNegXMargin,
} from '../Elements.token';
import {
  asToutWithPaddings,
  asToutDefaultStyle,
  asToutVertical,
} from '../Tout/token';

const asTestableProductTitle = addProps({ 'data-product-element': 'title' });
export const ProductTitle = flow(
  asHeader1,
  withEditorSimple('product_title', 'Product Title'),
  asTestableProductTitle,
)(H1);

const asProductImage = addClasses('w-full');
const asTestableProductImage = addProps({ 'data-product-element': 'image' });
export const ProductImage = flow(
  asProductImage,
  asImage,
  asEditableImage('product_image'),
  asTestableProductImage,
)(Img);

export const ProductTout = flow(
  asToutWithPaddings,
  asToutDefaultStyle,
  asToutVertical,
)(Tout);

export const SectionMargin = asYMargin(Div);
export const SectionNegXMargin = flow(
  asYMargin,
  asNegXMargin,
)(Div);

const asProductDetailWrapper = addClasses('w-full lg:w-1/2 lg:pr-2');
export const ProductDetailImageWrapper = asProductDetailWrapper(Div);
export const ProductDetailAccWrapper = asProductDetailWrapper(Div);
