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
import pick from 'lodash/pick';
import { v1 } from 'uuid';
// @todo We should not depend on a ui package (bu we already do for withImageLibary)
import { componentSelectorForm } from '@bodiless/layouts';
import {
  withMenuOptions, useContextMenuForm, useMenuOptionUI, withContextActivator, withLocalContextMenu,
  TMenuOption, EditButtonProps, UseBodilessOverrides, createMenuOptionGroup,
  MenuOptionsDefinition, useEditContext,
} from '@bodiless/core';
import {
  flowIf, flowHoc, DesignableComponents, withoutProps,
} from '@bodiless/fclasses';

import type { ComponentSelectorFormProps } from '@bodiless/layouts';
import type { ChameleonButtonProps, ChameleonData } from './types';
import { useChameleonContext, DEFAULT_KEY } from './withChameleonContext';

const useToggleButtonMenuOption = () => {
  const context = useChameleonContext();
  const { isOn } = context;
  const setNewKey = () => {
    const {
      selectableComponents, setActiveComponent,
    } = context;
    const newKey = isOn ? null
      : Object.keys(selectableComponents).find(key => key !== DEFAULT_KEY) || null;
    setActiveComponent(newKey);
  };
  return {
    label: 'Toggle',
    icon: isOn ? 'toggle_off' : 'toggle_on',
    handler: setNewKey,
  };
};

/**
 * Bodiless `useOverrides` hook which forces a chameleon buton to use the "swap"
 * form in all cases.
 *
 * @example
 * ```ts
 * withChameleonButton('node-key', defaultData, useChameleonSwapForm);
 * ```
 */
export const useChameleonSwapForm = () => {
  const context = useChameleonContext();
  const { activeComponent, setActiveComponent } = context;
  const renderForm = () => {
    const { selectableComponents } = context;
    const {
      ComponentFormLabel,
      ComponentFormRadioGroup,
      ComponentFormRadio,
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
        <ComponentFormRadioGroup name="component">
          {radios}
        </ComponentFormRadioGroup>
      </>
    );
  };
  const render = useContextMenuForm({
    initialValues: {
      // component: activeComponent === DEFAULT_KEY
      //   ? Object.keys(selectableComponents)[0]
      //   : activeComponent,
      component: activeComponent || DEFAULT_KEY,
    },
    submitValues: (d: ChameleonData) => setActiveComponent(d.component || null),
    renderForm,
  });
  return {
    icon: 'repeat',
    label: 'Swap',
    handler: () => render,
    formTitle: 'Choose a component',
  };
};

/**
 * Bodiless `useOverrides` hook which forces a chameleon buton to use the component selector
 * form in all cases.
 *
 * @example
 * ```ts
 * withChameleonButton('node-key', defaultData, useChameleonSelectorForm);
 * ```
 */
export const useChameleonSelectorForm = (
  props: Omit<ComponentSelectorFormProps, 'onSelect'>,
) => {
  const context = useChameleonContext();
  const handler = () => {
    // Defer destructuring selectableComponents until handler is invoked.
    const { selectableComponents, setActiveComponent } = context;
    const onSelect = ([componentName]: string[]) => setActiveComponent(componentName);
    return componentSelectorForm({
      ...props,
      components: selectableComponents as DesignableComponents,
      onSelect,
    });
  };
  return {
    icon: 'repeat',
    label: 'Swap',
    handler,
    formTitle: 'Choose a component',
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
 * Removes props used by the component selector in withChameleonButton
 */
export const withoutChameleonButtonProps = withoutProps(
  'blacklistCategories',
  'mandatoryCategories',
  'scale',
  'mode',
);

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
  useOverrides: UseBodilessOverrides<P, D> = () => ({}),
) => {
  const useMenuOptions = (props: P & EditButtonProps<D>) => {
    const overrides = useOverrides(props);
    // if useOverrides returns falsy, it means not to provide the button.
    const { isToggle } = useChameleonContext();
    const extMenuOptions = isToggle ? useToggleButtonMenuOption : useChameleonSwapForm;
    const baseDefinition:TMenuOption = {
      name: `chameleon-${v1()}`,
      ...extMenuOptions(),
      ...overrides,
    };
    return createMenuOptionGroup(baseDefinition);
  };
  const useMenuOptionsDefinition = (
    props: P & EditButtonProps<D>,
  ): MenuOptionsDefinition<P & EditButtonProps<D>> => ({
    useMenuOptions,
    name: 'Chameleon',
    ...pick(useOverrides(props), 'root', 'peer'),
  });
  const useHasLocalContext = (props: P & EditButtonProps<D>): boolean => {
    const def = useMenuOptionsDefinition(props);
    const isRoot = def.root || (def.peer && !useEditContext().parent);
    return !isRoot;
  };
  return flowHoc(
    flowIf(useHasLocalContext as (props: P) => boolean)(
      withContextActivator('onClick'),
      withLocalContextMenu,
    ),
    withoutChameleonButtonProps,
    withMenuOptions(useMenuOptionsDefinition),
  );
};

export default withChameleonButton;
