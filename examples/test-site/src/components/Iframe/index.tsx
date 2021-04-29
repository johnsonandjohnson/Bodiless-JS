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
  asToken,
} from '@bodiless/fclasses';

import { ComponentType } from 'react';
import { WithNodeProps } from '@bodiless/core';
import {
  asResponsive21By9Embed,
  asResponsive16By9Embed,
  asResponsive4By3Embed,
  asResponsive1By1Embed,
} from '../Elements.token';

const withPlaceholder = addProps({ src: 'https://johnsonandjohnson.github.io/Bodiless-JS/' });
const BodilessIframe: ComponentType<WithNodeProps> = asToken(
  asBodilessIframe(),
  withPlaceholder,
)(Iframe);

const withResponsiveWidth = addClasses('w-full');

const asResponsiveIframe = asToken(
  asBaseResponsiveIframe,
  withDesign({
    Item: flowRight(
      withPlaceholder,
    ),
  }),
);

const asReponsive21By9Iframe = asToken(
  asResponsiveIframe,
  asResponsive21By9Embed,
);

const asReponsive16By9Iframe = asToken(
  asResponsiveIframe,
  asResponsive16By9Embed,
);

const asReponsive4By3Iframe = asToken(
  asResponsiveIframe,
  asResponsive4By3Embed,
);

const asReponsive1By1Iframe = asToken(
  asResponsiveIframe,
  asResponsive1By1Embed,
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
};
