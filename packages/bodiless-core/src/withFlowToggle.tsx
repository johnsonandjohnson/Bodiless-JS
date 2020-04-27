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

import React, { ComponentType as CT } from 'react';
import { flowRight } from 'lodash';
import { observer } from 'mobx-react-lite';

type ToggleHook = (props: any) => boolean;

/**
 * Allow components to be toggled on/off based on the value of useToggle function
 *
 * @param {ToggleHook} useToggle
 *  Define the conditions to toggle on/off.
 * @returns {<P extends object, Q extends object>
 *   (On: React.ComponentType<P>, Off: React.ComponentType<Q>) => any}
 */
export const withFlowToggle = (useToggle: ToggleHook) => <P extends object, Q extends object>(
  On: CT<P>,
  Off: CT<Q>,
) => observer((props: P & Q) => (useToggle(props) ? <On {...props} /> : <Off {...props} />));

export const ifToggledOn = (useToggle: ToggleHook) => <H extends Function>(
  ...hocs: Function[]
) => (
    Component: CT<any>,
  //  @ts-ignore Expected at least 1  arguments, but got 0 or more.ts(2557)
  ) => withFlowToggle(useToggle)(flowRight(...hocs)(Component), Component);

export const ifToggledOff = (useToggle: ToggleHook) => <H extends Function>(
  ...hocs: Function[]
) => (
    Component: CT<any>,
  // @ts-ignore
  ) => withFlowToggle(useToggle)(Component, flowRight(...hocs)(Component));
