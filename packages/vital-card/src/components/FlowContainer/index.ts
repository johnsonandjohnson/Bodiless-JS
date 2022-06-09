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

import { asFluidToken } from '@bodiless/vital-elements';
import {
  as, on, varyDesigns, flowHoc
} from '@bodiless/fclasses';
import identity from 'lodash/identity';
import {
  CardClean, vitalCard, asCardToken,
} from '../Card';

const BaseVariation = {
  Card: on(CardClean)(vitalCard.Base, vitalCard.WithFlowContainerPreview),
};
const OrientationVariations = {
  Vertical: vitalCard.WithVerticalOrientation,
  HorizontalLeft: vitalCard.WithHorizontalLeftOrientation,
  HorizontalRight: vitalCard.WithHorizontalRightOrientation,
};
const ContentVariations = {
  TitleDescription: asCardToken({
    Meta: flowHoc.meta.term('Description')('With Eyebrow + Title + Description'),
  }),
  NoTitle: vitalCard.WithNoTitle,
  NoDescription: vitalCard.WithNoDescription,
  NoEyebrow: vitalCard.WithNoEyebrow,
};

const HeroVariations = varyDesigns(
  {
    HeroCard: on(CardClean)(vitalCard.Hero, vitalCard.WithFlowContainerPreview),
  },
  {
    Link: identity,
    PrimaryButton: as(vitalCard.Hero, vitalCard.WithPrimaryButton),
    SecondaryButton: as(vitalCard.Hero, vitalCard.WithSecondaryButton),
  },
);
/**
 * Token which adds Card variations to a flow container.
 */
const WithCardVariations = asFluidToken({
  Components: {
    ...HeroVariations,
    ...varyDesigns(
      BaseVariation,
      ContentVariations,
      OrientationVariations,
    ),
  }
});

export const vitalCardFlowContainer = { WithCardVariations };
