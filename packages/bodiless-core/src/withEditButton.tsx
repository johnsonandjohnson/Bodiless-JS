/**
 * Copyright © 2019 Johnson & Johnson
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

import flowRight from 'lodash/flowRight';
import omit from 'lodash/omit';
import { withoutProps } from './hoc';
import withCompoundForm from './withCompoundForm';
import type { EditButtonOptions, OptionGroupDefinition } from './Types/EditButtonTypes';
import { TMenuOption } from './Types/ContextMenuTypes';
import withEditFormSnippet from './withEditFormSnippet';

/**
 * Given a base option, creates a pair of menu options including
 * the base option and a group which contains it.
 *
 * @param baseOption The option for which to create the group.
 *
 * @return The base option and a group which contains it.
 */
export const createMenuOptionGroup = (
  baseOption: OptionGroupDefinition,
):TMenuOption[] => {
  // Don't create a group if the option already specifies one.
  if (baseOption.group) return [baseOption];

  const {
    groupLabel,
    groupMerge,
    ...menuOption
  } = baseOption;

  const menuGroup:TMenuOption = {
    name: `${menuOption.name}-group`,
    label: groupLabel || menuOption.label,
    groupMerge: groupMerge || 'none',
    local: baseOption.local,
    global: baseOption.global,
    Component: 'group',
  };

  menuOption.group = menuGroup.name;
  return [menuOption, menuGroup];
};

/**
 * Uses the provided options to create an HOC which adds an edit button provider
 * to the wrapped component.
 *
 * @param options The options defining the edit button.
 *
 * @return An HOC which will add an edit button for the wrapped component.
 */
const withEditButton = <P extends object, D extends object>(
  options: EditButtonOptions<P, D> | ((props: P) => EditButtonOptions<P, D>),
) => {
  const useMenuOptions = (props: P) => createMenuOptionGroup(
    omit(
      typeof options === 'function' ? options(props) : options,
      'renderForm', 'initialValueHandler', 'submitValueHandler',
    ),
  );
  const useMenuDefinition = (props: P) => {
    const { root, peer, name } = typeof options === 'function' ? options(props) : options;
    return {
      root,
      peer,
      useMenuOptions,
      name: `Edit ${name}`,
    };
  };
  return flowRight(
    withCompoundForm(useMenuDefinition),
    withEditFormSnippet(options),
    withoutProps(['setComponentData', 'isActive']),
  );
};

export default withEditButton;
