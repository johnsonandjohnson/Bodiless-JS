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

import { flowRight } from 'lodash';
import {
  withContextActivator,
  withLocalContextMenu,
} from '../hoc';
import { withMenuOptions } from '../PageContextProvider';
import { useNode } from '../NodeProvider';
import { TMenuOption } from '../Types/ContextMenuTypes';

type MenuOptionWithNodeKey = Partial<TMenuOption> & {
  nodeKey?: string | string[];
};

const useMenuOptions = (menuOptionWithNodeKey?: MenuOptionWithNodeKey) => () => {
  const { node } = useNode();
  const { nodeKey, ...menuOption } = menuOptionWithNodeKey || { nodeKey: undefined };
  const nodeKeys = Array.isArray(nodeKey) ? nodeKey : [nodeKey];
  const nodeKeysToDelete = nodeKeys.map(key => (key ? node.path.concat(key) : undefined));
  // TODO: we should disable or remove the button when the node is already reverted
  const menuOptions: TMenuOption[] = [
    {
      icon: 'undo',
      name: 'reset-default-content',
      label: 'Reset',
      handler: () => nodeKeysToDelete.forEach(key => node.delete(key)),
      local: true,
      global: false,
      group: 'reset-default-content-group',
      ...menuOption,
    },
    {
      name: 'reset-default-content-group',
      label: 'Content',
      local: true,
      global: false,
      Component: 'group',
      groupMerge: 'merge',
    },
  ];
  return menuOptions;
};

const withResetButton = (menuOptionWithNodeKey?: MenuOptionWithNodeKey) => flowRight(
  withMenuOptions({
    useMenuOptions: useMenuOptions(menuOptionWithNodeKey),
    name: 'Default Content',
  }),
  withContextActivator('onClick'),
  withLocalContextMenu,
);

export default withResetButton;
