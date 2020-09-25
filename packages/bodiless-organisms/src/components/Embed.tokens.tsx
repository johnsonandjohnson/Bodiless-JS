/**
 * Copyright © 2020 Johnson & Johnson
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

import { withDesign, addClasses } from "@bodiless/fclasses";
import { flowRight } from 'lodash';

const asResponsiveEmbed = withDesign({
  Wrapper: addClasses('relative overflow-hidden w-full'),
  Item: addClasses('absolute w-full h-full inset-0'),
});

const asResponsive21By9Embed = flowRight(
  withDesign({
    AspectRatio: addClasses('aspect-ratio-21\/9'),
  }),
  asResponsiveEmbed,
);

const asResponsive16By9Embed = flowRight(
  withDesign({
    AspectRatio: addClasses('aspect-ratio-16\/9'),
  }),
  asResponsiveEmbed,
);

const asResponsive4By3Embed = flowRight(
  withDesign({
    AspectRatio: addClasses('aspect-ratio-4\/3'),
  }),
  asResponsiveEmbed,
);

const asResponsive1By1Embed = flowRight(
  withDesign({
    AspectRatio: addClasses('aspect-ratio-square'),
  }),
  asResponsiveEmbed,
);

export {
  asResponsive21By9Embed,
  asResponsive16By9Embed,
  asResponsive4By3Embed,
  asResponsive1By1Embed,
}
