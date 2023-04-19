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
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import identity from 'lodash/identity';
import flowRight from 'lodash/flowRight';
import type { HOC, ComponentOrTag } from '@bodiless/fclasses';
import { withData, withBodilessData } from '@bodiless/data';
import { withoutProps } from '@bodiless/fclasses';
import {
  withContextActivator, withLocalContextMenu,
} from '../hoc.bl-edit';
import { ifReadOnly, ifEditable } from '../withEditToggle.bl-edit';
import withEditButton from '../withEditButton';
import type { EditButtonProps, UseBodilessOverrides } from '../Types/EditButtonTypes';
import { useContextActivator } from '../hooks';
import { ifToggledOn } from '../withFlowToggle';
import type { BodilessOptions, AsBodiless } from '../Types/AsBodilessTypes';

/**
 * Given an event name and a wrapper component, provides an HOC which will wrap the base component
 * the wrapper, passing the event prop to the wrapper, and all other props to the base component.
 *
 * @param event The event name.
 * @param Wrapper The component to wrap with
 * @private
 */
export const withActivatorWrapper = (event: string, Wrapper: ComponentOrTag<any>): HOC => (
  Component => props => {
    const wrapperPropNames = Object.getOwnPropertyNames(useContextActivator(event));
    const eventProps = pick(props, wrapperPropNames);
    const rest = omit(props, wrapperPropNames);
    return (
      <Wrapper {...eventProps}>
        <Component {...rest as any} />
      </Wrapper>
    );
  }
);

/**
 * Makes a component "Bodiless" by connecting it to the Bodiless-jS data flow and giving it
 * a form which can be used to edit its props. Returns a standard `asBodiless...` function,
 * which takes `nodeKey` and `defaultData` parameters, and returns an HOC which yields an editable
 * version of the base component.
 *
 * @param options An object describing how this component should be made editable.
 */
// eslint-disable-next-line max-len
const asBodilessComponent = <P extends object, D extends object>(options: BodilessOptions<P, D>): AsBodiless<P, D> => (
  /**
   * Creates an HOC that will make a component "Bodilesss".
   *
   * @param nodeKey The nodeKey identifying where the components data will be stored.
   * @param defaultData An object representing the initial/default data. Supercedes any default
   * data provided as an option.
   * @param useOverrides A hook which returns overrides for edit button options. Will
   * be invoked in the render context of the wrapped component and passed the
   * component's props.
   *
   * @return An HOC which will make the wrapped component "bodiless".
   */
  (
    nodeKeys?,
    defaultData = {} as D,
    useOverrides?: UseBodilessOverrides<P, D>,
  ) => {
    const {
      activateEvent = 'onClick',
      Wrapper,
      defaultData: defaultDataOption = {},
      ...rest
    } = options;
    const editButtonOptions = useOverrides
      ? (props: P & EditButtonProps<D>) => ({ ...rest, ...useOverrides(props) })
      : rest;
    const useHasLocalContext = (props: P & EditButtonProps<D>): boolean => {
      const def = typeof editButtonOptions === 'function'
        ? editButtonOptions(props) : editButtonOptions;
      return !(def.root || def.peer);
    };
    const finalData = { ...defaultDataOption, ...defaultData };
    return flowRight(
      withBodilessData(nodeKeys, finalData),
      ifReadOnly(
        withoutProps(['setComponentData']),
      ),
      ifEditable(
        withEditButton(editButtonOptions),
        ifToggledOn(useHasLocalContext)(
          withContextActivator(activateEvent),
          withLocalContextMenu,
          Wrapper ? withActivatorWrapper(activateEvent, Wrapper) : identity,
        ),
      ),
      withData,
    );
  }
);

export default asBodilessComponent;
