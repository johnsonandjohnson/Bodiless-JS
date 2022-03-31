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

import { asBodilessChameleon, useChameleonContext } from '@bodiless/components';
import { withDesign, flowHoc, Div } from '@bodiless/fclasses';
import {
  asBox, asBlue, asOrange, asTeal, withBlueBorder,
} from './Box';

const useToggleOverrides = () => {
  const isOn = useChameleonContext();
  return {
    groupLabel: 'Fill',
    label: isOn ? 'Teal' : 'Blue',
  };
};

export const useSwapOverrides = () => ({
  groupLabel: 'Fill',
});

const ChameleonBox = flowHoc(
  asBox,
  asBodilessChameleon('chameleon', undefined, useToggleOverrides),
  // asBodilessChameleon('chameleon', undefined, useSwapOverrides),
  withBlueBorder,
  withDesign({
    Teal: flowHoc(asTeal, { title: 'Color Teal' }),
    Orange: asOrange,
    _default: asBlue,
  }),
)(Div);

export default ChameleonBox;
