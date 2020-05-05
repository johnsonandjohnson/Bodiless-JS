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

import {
  asBodilessImage,
  asBodilessLink,
  Image,
} from '@bodiless/components';
import HImagePlaceholder from './horizontal_image.png';

const SquareImage = Image;
const HorizontalImage = asBodilessImage('horizontalImage', {
  src: HImagePlaceholder,
})('img');
const LinkableSquareImage = asBodilessLink('link')(SquareImage);
const LinkableHorizontalImage = asBodilessLink('link')(HorizontalImage);

export {
  SquareImage,
  HorizontalImage,
  LinkableSquareImage,
  LinkableHorizontalImage,
};
