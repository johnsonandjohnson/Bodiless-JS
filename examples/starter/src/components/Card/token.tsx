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

import { flow } from 'lodash';
import {
  addClasses,
  withDesign,
} from '@bodiless/fclasses';
import {
  asCardVertical as asBCardVertical,
  asCardHorizontal as asBCardHorizontal,
  asCardNoTitle,
  asCardNoBody,
  asCardNoCta,
  asCardOverlayTitle,
  asCardOverlayCta,
  asCardNoBodyNoTitle,
} from '@bodiless/card';
import {
  asImageRounded,
  asCta,
  asHeader2,
  asBlockItem,
  asTextColorPrimary,
} from '../Elements.token';

const asCardHorizontal = flow(
  withDesign({
    Title: addClasses(''),
    Body: addClasses(''),
    Link: addClasses(''),
  }),
  asBCardHorizontal,
);
const asCardVertical = flow(
  withDesign({
    Title: addClasses(''),
    Body: addClasses(''),
  }),
  asBCardVertical,
);

const asCardDefaultStyle = withDesign({
  Wrapper: asTextColorPrimary,
  Image: asImageRounded,
  Title: asHeader2,
  Link: asCta,
});

const asCardWithPaddings = withDesign({
  Wrapper: asBlockItem,
});

const asCardTextWhite = withDesign({
  ContentWrapper: addClasses('text-white'),
});

const asCardMainMenu = flow(
  asCardTextWhite,
  asCardWithPaddings,
  asCardDefaultStyle,
  asCardHorizontal,
);

export {
  asCardHorizontal,
  asCardVertical,
  asCardNoTitle,
  asCardNoBody,
  asCardNoCta,
  asCardDefaultStyle,
  asCardOverlayTitle,
  asCardOverlayCta,
  asCardNoBodyNoTitle,
  asCardWithPaddings,
  asCardTextWhite,
  asCardMainMenu,
};
