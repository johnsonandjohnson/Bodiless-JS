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
  addClasses,
  withDesign,
} from '@bodiless/fclasses';
import {
  asToutVertical as asBToutVertical,
  asToutHorizontal as asBToutHorizontal,
  asToutNoTitle,
  asToutNoBody,
  asToutNoCta,
  asToutOverlayTitle,
  asToutOverlayCta,
  asToutNoBodyNoTitle,
} from '@bodiless/organisms';
import {
  asImageRounded,
  asCta,
  asHeader2,
  asBlockItem,
  asTextColorPrimary,
} from '../Elements.token';

const asToutHorizontal = flow(
  withDesign({
    Title: addClasses('px-2'),
    Body: addClasses('px-2'),
    Link: addClasses('md:mx-2'),
  }),
  asBToutHorizontal,
);
const asToutVertical = flow(
  withDesign({
    Title: addClasses('px-2'),
    Body: addClasses('px-2'),
  }),
  asBToutVertical,
);

const asToutDefaultStyle = withDesign({
  Wrapper: asTextColorPrimary,
  Image: asImageRounded,
  Title: asHeader2,
  Link: asCta,
});

const asToutWithPaddings = withDesign({
  Wrapper: asBlockItem,
});

const asToutTextWhite = withDesign({
  ContentWrapper: addClasses('text-white'),
});

const asToutMainMenu = flow(
  asToutTextWhite,
  asToutWithPaddings,
  asToutDefaultStyle,
  asToutHorizontal,
);

export {
  asToutHorizontal,
  asToutVertical,
  asToutNoTitle,
  asToutNoBody,
  asToutNoCta,
  asToutDefaultStyle,
  asToutOverlayTitle,
  asToutOverlayCta,
  asToutNoBodyNoTitle,
  asToutWithPaddings,
  asToutTextWhite,
  asToutMainMenu,
};
