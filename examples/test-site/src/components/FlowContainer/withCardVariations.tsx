/**
 * Copyright © 2021 Johnson & Johnson
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
  withFacet,
  withDesc,
} from '@bodiless/layouts';
import {
  varyDesign,
  extendDesign,
  replaceWith,
  withDesign,
  asToken,
} from '@bodiless/fclasses';
import Card from '../Card';
import {
  asCardHorizontal,
  asCardVertical,
  asCardNoTitle,
  asCardNoCta,
  asCardNoBody,
  asCardNoBodyNoTitle,
  asCardDefaultStyle,
} from '../Card/token';
import { withType } from './Categories';

export const withStructureFacet = withFacet('Card Structure');
export const withOrientationFacet = withFacet('Orientation');

const baseVariation = {
  Card: asToken(
    replaceWith(Card),
    withDesc('A way to promote a Call to Action.\n'),
    withType('Card')(asCardDefaultStyle),
  ),
};

// Lets make Card version that are Vertical and vary the fields that are used
const verticalVariations = varyDesign(
  {
    Vertical: withOrientationFacet('Vertical')(asCardVertical),
  },
  {
    WithTitleBody: withStructureFacet('With Title and Body')(),
    NoTitle: withStructureFacet('No Title')(asCardNoTitle),
    NoBody: withStructureFacet('No Body')(asCardNoBody),
    NoTitleBody: withStructureFacet('No Title and Body')(asCardNoBodyNoTitle),
  },
);
// Lets make Card version that are Horizontal and vary the fields that are used
const horizontalVariations = varyDesign(
  {
    Horizontal: withOrientationFacet('Horizontal')(asCardHorizontal),
  },
  {
    WithTitleBody: withStructureFacet('With Title and Body')(),
    NoTitle: withStructureFacet('No Title')(asCardNoTitle),
    NoBody: withStructureFacet('No Body')(asCardNoBody),
  },
);
// Lets combine the Vertical and Horizontal
const orientationVariations = extendDesign(
  horizontalVariations,
  verticalVariations,
);

const ctaVariations = {
  WithCTA: withStructureFacet('With CTA')(),
  NoCTA: withStructureFacet('No CTA')(asCardNoCta),
};

export default withDesign(varyDesign(
  baseVariation,
  orientationVariations,
  ctaVariations,
)());
