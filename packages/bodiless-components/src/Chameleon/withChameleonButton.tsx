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

import React, { ComponentType } from 'react';
import { flowRight } from 'lodash';
import {
  withMenuOptions, useContextMenuForm, useMenuOptionUI, withContextActivator, withLocalContextMenu,
  MenuOptionsDefinition, EditButtonProps, UseBodilessOverrides,
} from '@bodiless/core';

import { ChameleonButtonProps, ChameleonData } from './types';
import { useChameleonContext, DEFAULT_KEY } from './withChameleonContext';

const useToggleButtonMenuOption = () => {
  const {
    isOn, selectableComponents, setActiveComponent,
  } = useChameleonContext();
  const newKey = isOn ? null
    : Object.keys(selectableComponents).find(key => key !== DEFAULT_KEY) || null;
  return {
    label: 'Toggle',
    icon: isOn ? 'toggle_off' : 'toggle_on',
    handler: () => setActiveComponent(newKey),
  };
};

const useSwapButtonMenuOption = (formTitle: string = 'Choose a component') => {
  const { selectableComponents, activeComponent, setActiveComponent } = useChameleonContext();
  const renderForm = () => {
    const {
      ComponentFormLabel,
      ComponentFormRadioGroup,
      ComponentFormRadio,
      ComponentFormTitle,
    } = useMenuOptionUI();

    const radios = Object.getOwnPropertyNames(selectableComponents).map(name => (
      <ComponentFormLabel id={`bl-component-form-chameleon-radio-${name}`} key={name}>
        <ComponentFormRadio value={name} />
        {/* @ts-ignore */}
        {selectableComponents[name].title || name}
      </ComponentFormLabel>
    ));
    return (
      <>
        <ComponentFormTitle>{formTitle}</ComponentFormTitle>
        <ComponentFormRadioGroup field="component">
          {radios}
        </ComponentFormRadioGroup>
      </>
    );
  };
  const render = useContextMenuForm({
    initialValues: {
      component: activeComponent === DEFAULT_KEY
        ? Object.keys(selectableComponents)[0]
        : activeComponent,
    },
    submitValues: (d: ChameleonData) => setActiveComponent(d.component || null),
    renderForm,
  });
  return {
    icon: 'repeat',
    label: 'Swap',
    handler: () => render,
  };
};

export const withUnwrap = <P extends object>(Component: ComponentType<P>) => {
  const WithUnwrapChameleon = (props: P & ChameleonButtonProps) => {
    const { isOn, setActiveComponent } = useChameleonContext();
    if (!isOn) return <Component {...props} />;
    const unwrap = () => setActiveComponent(null);
    return <Component {...props} unwrap={unwrap} />;
  };
  return WithUnwrapChameleon;
};

/**
 * Adds a menu button which controls the state of the chameleon.
 *
 * If the chameleon has more than one element in it's design, this will show a form allowing
 * the user to choose which to apply.  Otherwise, this will be a toggle button.
 *
 * @param nodeKeys Location of the chameleon state data
 * @param defaultData Default chameleon state data.
 * @param useOverrides Menu option overrides.
 *
 * @return HOC which adds the menu button.
 */
const withChameleonButton = <P extends object, D extends object>(
  useOverrides?: UseBodilessOverrides<P, D>,
  contextProps?: Partial<MenuOptionsDefinition<P>>,
) => {
  const useMenuOptions = (props: P & EditButtonProps<D>) => {
    const { selectableComponents } = useChameleonContext();
    const overrides = useOverrides ? useOverrides(props) : {};
    const formTitle = typeof overrides !== 'undefined' ? overrides.formTitle : undefined;
    const extMenuOptions = Object.keys(selectableComponents).length > 1
      ? useSwapButtonMenuOption
      : useToggleButtonMenuOption;
    const baseDefinition = {
      name: 'chameleon-toggle',
      global: false,
      local: true,
      ...extMenuOptions(formTitle),
    };
    // if useOverrides returns undefined, it means not to provide the button.
    return typeof overrides !== 'undefined' ? [{ ...baseDefinition, ...overrides }] : [];
  };
  return flowRight(
    withMenuOptions({ useMenuOptions, name: 'Chameleon', ...contextProps }),
    withContextActivator('onClick'),
    withLocalContextMenu,
    // withUnwrap,
  );
};

export default withChameleonButton;
