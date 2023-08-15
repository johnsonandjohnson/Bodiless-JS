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

import { on, as } from '@bodiless/fclasses';
import { asFilterableByGroup } from '@bodiless/filtering';
import { asFluidToken, vitalColor } from '@bodiless/vital-elements';
import { CardStatic, vitalCardStatic } from '@bodiless/vital-card';
import { withViewItemsGA4Event, withSelectItemGA4Event, withRegisterGA4ProductData } from '@bodiless/ga4';

const Default = asFluidToken({
  Core: {
    ComponentWrapper: asFilterableByGroup(),
  },
  Components: {
    FilterableContent: on(CardStatic)(
      vitalCardStatic.Default,
      vitalCardStatic.WithVerticalOrientation,
      vitalCardStatic.WithNoDescription,
      vitalCardStatic.WithFlexGrowImage,
    ),
  },
  Spacing: {
    ComponentWrapper: 'p-8',
  },
  Theme: {
    ComponentWrapper: as('border-2', vitalColor.BorderGrid),
  },
  Analytics: {
    Wrapper: withViewItemsGA4Event,
    ComponentWrapper: as(
      withSelectItemGA4Event,
      withRegisterGA4ProductData
    ),
  },
});

export default {
  Default,
};
