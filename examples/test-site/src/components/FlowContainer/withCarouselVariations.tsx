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
import {
  withTitle,
  withDesc,
} from '@bodiless/layouts';
import {
  varyDesign,
  replaceWith,
  withDesign,
  asToken,
} from '@bodiless/fclasses';

import { ChameleonCarousel } from '../Carousel';
import { withType } from './Categories';

const carouselVariation = {
  Carousel: asToken(
    replaceWith(ChameleonCarousel),
    withType('Carousel')(),
    withTitle('Carousel'),
    withDesc('Adds a carousel that lets you choose from 4 components: Linkable, Gastby (Performance) Image, Horizontal Card, Video.\n'),
  ),
};

export default withDesign(varyDesign(
  carouselVariation,
)());
