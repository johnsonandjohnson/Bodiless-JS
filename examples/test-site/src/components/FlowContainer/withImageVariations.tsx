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
  HorizontalImage,
  LinkableSquareImage,
  LinkableHorizontalImage,
} from '../Image';

const images = {
  SquareImage: flow(
    replaceWith(SquareImage),
    // ToDo: provide a better title and description
    withTitle('Square Image'),
    withDesc('Adds a square image'),
    withType('Image')(),
  ),
  HorizontalImage: flow(
    replaceWith(HorizontalImage),
    withTitle('Horizontal Image'),
    withDesc('Adds a horizontal image'),
    withType('Image')(),
  ),
  LinkableSquareImage: flow(
    replaceWith(LinkableSquareImage),
    withTitle('Linkable Square Image'),
    withDesc('Adds a linkable square image'),
    withType('Linkable Image')(),
  ),
  LinkableHorizontalImage: flow(
    replaceWith(LinkableHorizontalImage),
    withTitle('Linkable Horizontal Image'),
    withDesc('Adds a linkable horizontal image'),
    withType('Linkable Image')(),
  ),
};

export default withDesign(images);
