/**
 * Copyright © 2022 Johnson & Johnson
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

import { withImagePlaceholder } from '@bodiless/components';
import { asBodilessImage } from '@bodiless/components-ui';
import { Img, on } from '@bodiless/fclasses';
import { YouTubeClean, vitalYouTube } from '@bodiless/vital-youtube/';
import { asHeroToken } from '../HeroClean';
// @ts-ignore Cannot find module
import landscapeHero from '../../../../assets/landscape_hero.png';

const Base = asHeroToken({
  Spacing: {
    Wrapper: 'pb-9'
  }
});

const Default = asHeroToken({
  ...Base,
});

const Image = asHeroToken({
  ...Default,
  Components: {
    Content: on(Img)(asBodilessImage()),
  },
  Content: {
    Content: withImagePlaceholder({ src: landscapeHero }),
  },
  Layout: {
    Content: 'w-full'
  },
});

const Video = asHeroToken({
  ...Default,
  Components: {
    Content: on(YouTubeClean)(
      vitalYouTube.Responsive16By9Embed,
      vitalYouTube.WithSchema,
    ),
  },
});

const vitalHero = {
  Base,
  Default,
  Image,
  Video,
};

export default vitalHero;