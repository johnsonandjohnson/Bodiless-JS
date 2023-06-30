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

import identity from 'lodash/identity';
import flowRight from 'lodash/flowRight';
import { withoutProps } from '@bodiless/fclasses';
import { withData, withBodilessData } from '@bodiless/data';
import type { BodilessOptions, AsBodiless } from '../Types/AsBodilessTypes';

export const withActivatorWrapper = identity;
/**
 * Makes a component "Bodiless" by connecting it to the Bodiless-jS data flow and giving it
 * a form which can be used to edit its props. Returns a standard `asBodiless...` function,
 * which takes `nodeKey` and `defaultData` parameters, and returns a HOC which yields an editable
 * version of the base component.
 *
 * @param options An object describing how this component should be made editable.
 */
// eslint-disable-next-line max-len
const asBodilessReadOnlyComponent = <P extends object, D extends object>(options: BodilessOptions<P, D>): AsBodiless<P, D> => (
  /**
 * Creates a HOC that will make a component "Bodilesss".
 *
 * @param nodeKey The nodeKey identifying where the components data will be stored.
 * @param defaultData An object representing the initial/default data. Supercedes any default
 * data provided as an option.
 * @param useOverrides A hook which returns overrides for edit button options. Will
 * be invoked in the render context of the wrapped component and passed the
 * component's props.
 *
 * @return A HOC which will make the wrapped component "bodiless".
 */
  (
    nodeKeys?,
    defaultData = {} as D,
  ) => {
    const {
      defaultData: defaultDataOption = {},
    } = options;
    const finalData = { ...defaultDataOption, ...defaultData };
    return flowRight(
      withBodilessData(nodeKeys, finalData),
      withoutProps(['setComponentData']),
      withData,
    );
  }
);

export default asBodilessReadOnlyComponent;
