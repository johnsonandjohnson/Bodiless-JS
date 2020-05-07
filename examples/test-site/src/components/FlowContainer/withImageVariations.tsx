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

import { flow } from 'lodash';
import {
  withTitle,
  withDesc,
} from '@bodiless/layouts';
import {
  replaceWith,
  withDesign,
} from '@bodiless/fclasses';
import { withType } from './Categories';
import {
  SquareImage,
  SquareLinkableImage,
  LandscapeImage,
  LandscapeLinkableImage,
} from '../Image';

const images = {
  SquareImage: flow(
    replaceWith(SquareImage),
    withTitle('Square Image'),
    withDesc('Adds a square image'),
    withType('Image')(),
  ),
  LandscapeImage: flow(
    replaceWith(LandscapeImage),
    withTitle('Landscape Image'),
    withDesc('Adds a landscape image'),
    withType('Image')(),
  ),
  SquareLinkableImage: flow(
    replaceWith(SquareLinkableImage),
    withTitle('Square Linkable Image'),
    withDesc('Adds a square linkable image'),
    withType('Linkable Image')(),
  ),
  LandscapeLinkableImage: flow(
    replaceWith(LandscapeLinkableImage),
    withTitle('Landscape Linkable Image'),
    withDesc('Adds a linkable landscape image'),
    withType('Linkable Image')(),
  ),
};

export default withDesign(images);
