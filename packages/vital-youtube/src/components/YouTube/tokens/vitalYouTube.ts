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

import {
  addProps,
  as,
  flowHoc,
} from '@bodiless/fclasses';
import {
  asResponsive16By9Embed as asBodilessResponsive16By9Embed,
} from '@bodiless/organisms';
import { asSchemaSource, WithVideoSchema } from '@bodiless/schema-org';
import {
  asResponsiveYouTube as asBodilessResponsiveYouTube,
  withFullScreenEnabled as withBodilessFullScreenEnabled,
  withYouTubePlayerSettings,
} from '@bodiless/youtube';
import { withNodeKey } from '@bodiless/data';
import { asYouTubeToken } from '../YouTubeClean';
import { defaultPlayerSettings } from '../util';

/**
 * Token that provides VitalDS YouTube base component.
 */
const Base = asYouTubeToken({
  Core: {
    _: as(
      withNodeKey('youtube'),
      asBodilessResponsiveYouTube,
    ),
    Item: withYouTubePlayerSettings(defaultPlayerSettings),
  },
  Content: {
    // Video placeholder.
    Item: addProps({ src: 'https://www.youtube.com/embed/ukz74aLMvhc' }),
  },
  Meta: flowHoc.meta.term('Type')('YouTube'),
});

/**
 * WithResponsive16By9Embed provides responsive YouTube component in widescreen format (16:9).
 */
const WithResponsive16By9Embed = asYouTubeToken({
  Components: {
    _: asBodilessResponsive16By9Embed,
  },
  Meta: flowHoc.meta.term('Screen')('Widescreen (16:9)'),
});

/**
 * WithFullScreenEnabled allows YouTube video to be full screen.
 */
const WithFullScreenEnabled = asYouTubeToken({
  Behavior: {
    Item: withBodilessFullScreenEnabled,
  },
  Meta: flowHoc.meta.term('Settings')('Full Screen'),
});

/**
 * WithSchema allows YouTube video to generate structure data schema.
 */
const WithSchema = asYouTubeToken({
  SEO: {
    Item: asSchemaSource('youtube-iframe'),
    Wrapper: WithVideoSchema,
  },
  Meta: flowHoc.meta.term('SEO')('With Schema'),
});

const Default = asYouTubeToken({
  ...Base,
  Compose: {
    WithFullScreenEnabled,
    WithResponsive16By9Embed,
    WithSchema,
  }
});

const Hero = asYouTubeToken(Default);

export default {
  Base, // TBD Switch to Basic
  Default,
  WithFullScreenEnabled,
  WithSchema,
  WithResponsive16By9Embed,
  Hero,
};
