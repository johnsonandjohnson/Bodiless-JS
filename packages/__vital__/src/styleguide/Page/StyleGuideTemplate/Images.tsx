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

import React from 'react';
import { withNodeKey } from '@bodiless/core';
import {
  flowHoc,
  as,
  replaceWith,
  Img,
  H3,
} from '@bodiless/fclasses';
import { vitalImage } from '@bodiless/vital-image';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { vitalTypography } from '@bodiless/vital-elements';

const C = {
  H3: as(vitalTypography.H3)(H3),
};

const DefaultImage = as(
  vitalImage.Default,
  withNodeKey('defaultimage'),
)(Img);

const DefaultLandscapeImage = as(
  vitalImage.Default,
  vitalImage.WithLandscapePlaceholder,
  withNodeKey('defaultlandscapeimage'),
)(Img);

const ImageHero = as(
  vitalImage.Hero,
  withNodeKey('imagehero'),
)(Img);

/* @todo
 * Rendered only the two types of images available in flow container as separate components.
 * To do is provide all variations we want tested individually.
 */
const Examples = (props: any) => (
  <>
    <C.H3>Default</C.H3>
    <DefaultImage />
    <hr className="my-4" />
    <C.H3>Landscape</C.H3>
    <DefaultLandscapeImage />
    <hr className="my-4" />
    <C.H3>Hero</C.H3>
    <ImageHero />
  </>
);

export const Images = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Images'),
  Content: {
    Title: replaceWith(() => <>Images</>),
    Examples: replaceWith(Examples),
  },
});
