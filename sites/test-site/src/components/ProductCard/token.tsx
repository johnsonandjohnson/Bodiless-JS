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

import {
  addClasses,
  withDesign,
  flowHoc,
} from '@bodiless/fclasses';
import { asFilterableByGroup } from '@bodiless/filtering';
import {
  asImageRounded,
  asXMargin,
  asYMargin,
  asHeader2,
  asBlockItem,
  asTextColorPrimary,
} from '../Elements.token';

const asProductCardDefaultStyle = withDesign({
  Wrapper: flowHoc(asBlockItem, asTextColorPrimary),
  Image: flowHoc(
    asImageRounded,
    addClasses('w-full'),
  ),
  Title: flowHoc(
    asHeader2,
    asXMargin,
    asYMargin,
  ),
  BvReviewLink: flowHoc(
    asXMargin,
    asYMargin,
    addClasses('block'),
  ),
  Body: flowHoc(
    asXMargin,
    asYMargin,
  ),
});

const asFilterableProductContainer = withDesign({
  ComponentWrapper: asFilterableByGroup(),
});

export {
  asProductCardDefaultStyle,
  asFilterableProductContainer,
};
