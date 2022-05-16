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
import { withNodeKey } from '@bodiless/core';
import {
  flowHoc,
  as,
  replaceWith,
  H3,
} from '@bodiless/fclasses';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { YouTubeClean, vitalYouTube } from '@bodiless/vital-youtube';
import { vitalTypography } from '@bodiless/vital-elements';

const C = {
  H3: as(vitalTypography.H3)(H3),
};

const DefaultVideo = as(
  vitalYouTube.Default,
  withNodeKey('defaultvideo'),
)(YouTubeClean);

const HeroVideo = as(
  vitalYouTube.Hero,
  withNodeKey('herovideo'),
)(YouTubeClean);

const Examples = () => (
  <>
    <C.H3>Default</C.H3>
    <DefaultVideo />
    <hr className="my-4" />
    <C.H3>Hero</C.H3>
    <HeroVideo />
  </>
);

export const Video = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Video'),
  Content: {
    Title: replaceWith(() => <>Video</>),
    Examples: replaceWith(Examples),
  },
});
