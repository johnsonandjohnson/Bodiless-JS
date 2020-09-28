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

import { flowRight } from 'lodash';
import { asBodilessYoutube } from '@bodiless/components';
import { Embed } from '@bodiless/organisms';
import {
  Iframe,
  Div,
  withDesign,
  replaceWith,
  addClasses,
} from '@bodiless/fclasses';

import { withPlaceholder } from '../Iframe';
import { asResponsive16By9Embed } from '../Elements.token';

const Wrapper = addClasses('absolute w-full h-full inset-0')(Div);
const ResponsiveBodilessYoutube = asBodilessYoutube(
  undefined,
  undefined,
  undefined,
  Wrapper,
)(Iframe);

const asResponsiveYoutube = withDesign({
  Item: flowRight(
    withPlaceholder,
    replaceWith(ResponsiveBodilessYoutube),
  ),
});

const asReponsive16By9Youtube = flowRight(
  asResponsive16By9Embed,
  asResponsiveYoutube,
);

const Reponsive16By9Youtube = asReponsive16By9Youtube(Embed);

export {
  asReponsive16By9Youtube,
  Reponsive16By9Youtube,
};
