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
import { ifReadOnly } from '@bodiless/core';
import { withYouTubePlayerSettings } from '@bodiless/components';
import type { YouTubePlayerSettings } from '@bodiless/components';
import {
  Embed,
  asResponsiveYouTube as asBaseResponsiveYouTube,
} from '@bodiless/organisms';
import {
  addProps,
  withDesign,
} from '@bodiless/fclasses';

import { asResponsive16By9Embed } from '../Elements.token';

const withPlaceholder = addProps({ src: 'https://www.youtube.com/embed/_LBdqpscwi0' });

const asResponsiveYouTube = flowRight(
  withDesign({
    Item: flowRight(
      withPlaceholder,
    ),
  }),
  asBaseResponsiveYouTube,
);

const asReponsive16By9YouTube = flowRight(
  asResponsive16By9Embed,
  asResponsiveYouTube,
);

const getOrigin = () => process.env.SITE_URL || '';

const defaultPlayerSettings: YouTubePlayerSettings = {
  cc_load_policy: 0,
  controls: 1,
  loop: 0,
  enablejsapi: 1,
  modestbranding: 1,
  rel: 0,
  origin: getOrigin(),
};

const withYouTubeDefaults = withDesign({
  Item: withYouTubePlayerSettings(defaultPlayerSettings),
});

const Reponsive16By9YouTube = asReponsive16By9YouTube(Embed);
const DefaultReponsive16By9YouTube = withYouTubeDefaults(Reponsive16By9YouTube);

const withAutoPlay = withDesign({
  Item: ifReadOnly(
    withYouTubePlayerSettings({
      autoplay: true,
      mute: true,
    }),
  ),
});

const Reponsive16By9AutoPlayYouTube = flowRight(
  withAutoPlay,
  withYouTubeDefaults,
  asReponsive16By9YouTube,
)(Embed);

export {
  asResponsiveYouTube,
  Reponsive16By9YouTube,
  Reponsive16By9AutoPlayYouTube,
  DefaultReponsive16By9YouTube,
  defaultPlayerSettings,
};
