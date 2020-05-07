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

import { withDefaultContent } from '@bodiless/core';
import { flowRight } from 'lodash';
import {
  asBodilessImage,
  asBodilessLink,
  Image,
} from '@bodiless/components';
import { Img } from '@bodiless/fclasses';
import landscapeImage from './landscape_image.png';


type Data = {
  src: string;
  alt: string;
};

const asContentfulImage = (nodeKey: string, nodeContent: Partial<Data>) => flowRight(
  withDefaultContent({
    [nodeKey]: nodeContent,
  }),
  asBodilessImage(nodeKey),
)(Img);

const SquareImage = Image;
const SquareLinkableImage = asBodilessLink('link')(SquareImage);
const LandscapeImage = asContentfulImage('landscapeImage', { src: landscapeImage });
const LandscapeLinkableImage = asBodilessLink('link')(LandscapeImage);

export {
  SquareImage,
  LandscapeImage,
  SquareLinkableImage,
  LandscapeLinkableImage,
  asContentfulImage,
};
