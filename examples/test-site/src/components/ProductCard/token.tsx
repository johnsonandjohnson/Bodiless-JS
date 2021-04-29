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
  asToken,
} from '@bodiless/fclasses';
import { asFilterableByGroup } from '@bodiless/organisms';
import {
  asImageRounded,
  asXMargin,
  asYMargin,
  asHeader2,
  asBlockItem,
  asTextColorPrimary,
} from '../Elements.token';

const asProductCardDefaultStyle = withDesign({
  Wrapper: asToken(asBlockItem, asTextColorPrimary),
  Image: asToken(
    asImageRounded,
    addClasses('w-full'),
  ),
  Title: asToken(
    asHeader2,
    asXMargin,
    asYMargin,
  ),
  BvReviewLink: asToken(
    asXMargin,
    asYMargin,
    addClasses('block'),
  ),
  Body: asToken(
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
