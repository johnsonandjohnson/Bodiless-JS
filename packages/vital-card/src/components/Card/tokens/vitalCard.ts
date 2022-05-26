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

import { flowHoc, replaceWith } from '@bodiless/fclasses';
import { asCardToken } from '../CardClean';

import Base, { WithFlowContainerPreview, WithHorizontalOrientation, WithVerticalOrientation} from './Base';
import { Hero, HeroWithPrimaryButton, HeroWithSecondaryButton } from './Hero';

/**
 * WithNoTitle removes title from the card
 */
const WithNoTitle = asCardToken({
  Components: {
    TitleWrapper: replaceWith(() => null),
  },
  Meta: flowHoc.meta.term('Description')('No Title'),
});

/**
 * WithNoEyebrow removes title from the card
 */
const WithNoEyebrow = asCardToken({
  Components: {
    EyebrowWrapper: replaceWith(() => null),
  },
  Meta: flowHoc.meta.term('Description')('No Eyebrow'),
});

/**
 * WithNoDescription removes the description from the card and adjusts title.
 *
 *  where
 *     Title - adds grow because description will not exist
 */
const WithNoDescription = asCardToken({
  Components: {
    DescriptionWrapper: replaceWith(() => null),
  },
  Layout: {
    Title: 'flex-grow',
  },
  Meta: flowHoc.meta.term('Description')('No Description'),
});

const Default = asCardToken({
  ...Base,
});

export default {
  Base,
  Default,
  Hero,
  HeroWithPrimaryButton,
  HeroWithSecondaryButton,
  WithNoDescription,
  WithNoTitle,
  WithNoEyebrow,
  WithHorizontalOrientation,
  WithVerticalOrientation,
  WithFlowContainerPreview,
};
