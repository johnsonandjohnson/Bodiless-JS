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

import React from 'react';
import {
  flowHoc, replaceWith, on,
} from '@bodiless/fclasses';
import { asFluidToken } from '@bodiless/vital-elements';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { YouTubeClean, vitalYouTube } from '@bodiless/vital-youtube';
import { StyleGuideExamplesClean, vitalStyleGuideExamples } from '../../Examples';

const WithYouTubeVariations = asFluidToken({
  Components: {
    // TBD (we want to remove base exporting and switch it to Basic)
    Basic: on(YouTubeClean)(vitalYouTube.Base),
    WithFullScreenEnabled: on(YouTubeClean)(
      vitalYouTube.Base,
      vitalYouTube.WithFullScreenEnabled,
    ),
    WithSchema: on(YouTubeClean)(
      vitalYouTube.Base,
      vitalYouTube.WithSchema
    ),
    WithResponsive16By9Embed: on(YouTubeClean)(
      vitalYouTube.Base,
      vitalYouTube.WithResponsive16By9Embed
    ),
    Default: on(YouTubeClean)(vitalYouTube.Default),
    Hero: on(YouTubeClean)(vitalYouTube.Hero),
  },
});

export const Video = asStyleGuideTemplateToken({
  ...vitalStyleGuideTemplate.Default,
  Meta: flowHoc.meta.term('Token')('Video'),
  Content: {
    Title: replaceWith(() => <>Video</>),
    Examples: on(StyleGuideExamplesClean)(
      vitalStyleGuideExamples.Default,
      WithYouTubeVariations,
    ),
  },
});
