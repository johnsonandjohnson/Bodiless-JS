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

import React from 'react';
import { observer } from 'mobx-react-lite';
import { asToken } from '@bodiless/fclasses';
import type {
  Condition, AsToken, ComponentWithMeta, ComponentOrTag,
} from '@bodiless/fclasses';

/**
 * Allow components to be toggled on/off based on the value of useToggle function
 *
 * @param useToggle
 *  Define the conditions to toggle on/off.
 * @returns {<P extends object, Q extends object>}
 *   (On: React.ComponentType<P>, Off: React.ComponentType<Q>) => any}
 */
export const withFlowToggle = (useToggle: Condition) => <P extends object, Q extends object>(
  On: ComponentOrTag<P>,
  Off: ComponentOrTag<Q>,
) => observer((props: P & Q) => (useToggle(props) ? <On {...props} /> : <Off {...props} />));

/**
 * Utility to apply a list of tokens conditionally.
 *
 * Similar to `flowIf` from `@bodiless/fclasses` except:
 * - The tokens are applied in reverse order (like lodash `flowRight`)
 * - The condition hook is evaluated in the context of a mobx observer, so that
 *   changes to Bodiless application state will trigger a re-render.
 *
 * @param useToggle
 * A custom React hook returning a boolean. The supplied tokens will be applied
 * only if the condition evaluates to true. The hook will receive the component's
 * props.
 *
 * @returns
 * A function which will compose the provided tokens (like `asToken`) ony if the
 * condition evaluates to true.
 *
 * @see flowIf
 * @see asToken
 */
export const ifToggledOn = <P extends object>(
  useToggle: Condition<P>,
): AsToken<P> => (...hocs) => (Component: ComponentOrTag<any>) => {
    const reversed = [...hocs].reverse();
    const Alt = asToken(...reversed)(Component);
    return withFlowToggle(useToggle)(Alt, Component) as ComponentWithMeta<any>;
  };

/**
 * Utility to apply a list of tokens conditionally. This is the inverse
 * of `ifToggledOn`.
 *
 * @param useToggle
 * A custom React hook returning a boolean. The supplied tokens will be applied
 * only if the condition evaluates to false. The hook will receive the component's
 * props.
 *
 * @returns
 * A function which will compose the provided tokens (like `asToken`) only if the
 * condition evaluates to false.
 *
 * @see ifToggledOn
 */
export const ifToggledOff = <P extends object>(
  useToggle: Condition<P>,
): AsToken<P> => ifToggledOn((props: P) => !useToggle(props));
