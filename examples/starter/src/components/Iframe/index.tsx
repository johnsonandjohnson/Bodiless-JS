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
import { asBodilessIframe } from '@bodiless/components';
import {
  Embed,
  asResponsiveIframe as asBaseResponsiveIframe,
} from '@bodiless/organisms';
import {
  Iframe,
  withDesign,
  addClasses,
  addProps,
} from '@bodiless/fclasses';

import {
  asResponsive21By9Embed,
  asResponsive16By9Embed,
  asResponsive4By3Embed,
  asResponsive1By1Embed,
} from '../Elements.token';

const withPlaceholder = addProps({ src: 'https://www.youtube.com/embed/_LBdqpscwi0' });
const BodilessIframe = withPlaceholder(asBodilessIframe()(Iframe));

const withResponsiveWidth = addClasses('w-full');

const asResponsiveIframe = flowRight(
  withDesign({
    Item: flowRight(
      withPlaceholder,
    ),
  }),
  asBaseResponsiveIframe,
);

const asReponsive21By9Iframe = flowRight(
  asResponsive21By9Embed,
  asResponsiveIframe,
);

const asReponsive16By9Iframe = flowRight(
  asResponsive16By9Embed,
  asResponsiveIframe,
);

const asReponsive4By3Iframe = flowRight(
  asResponsive4By3Embed,
  asResponsiveIframe,
);

const asReponsive1By1Iframe = flowRight(
  asResponsive1By1Embed,
  asResponsiveIframe,
);

const IframeWithResponsiveWidth = withResponsiveWidth(BodilessIframe);
const Reponsive21By9Iframe = asReponsive21By9Iframe(Embed);
const Reponsive16By9Iframe = asReponsive16By9Iframe(Embed);
const Reponsive4By3Iframe = asReponsive4By3Iframe(Embed);
const Reponsive1By1Iframe = asReponsive1By1Iframe(Embed);

export {
  withResponsiveWidth,
  asReponsive21By9Iframe,
  asReponsive16By9Iframe,
  asReponsive4By3Iframe,
  asReponsive1By1Iframe,
  IframeWithResponsiveWidth,
  Reponsive21By9Iframe,
  Reponsive16By9Iframe,
  Reponsive4By3Iframe,
  Reponsive1By1Iframe,
  withPlaceholder,
};
