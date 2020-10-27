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

import { useMemo } from 'react';
import {
  withMenuOptions, withLocalContextMenu,
  withContextActivator, ifEditable, PageEditContextInterface, useEditContext,
} from '@bodiless/core';
import { v1 } from 'uuid';

import { withFinalDesign } from '@bodiless/fclasses';
import { flow } from 'lodash';
import { ItemProps } from './types';

const hasChildList = (context: PageEditContextInterface): boolean => {
  const descendants = context.activeDescendants || [];
  // The first child list is the one to which this toggle applies,
  // so we check to see if more than one.
  return descendants.filter(c => c.type === 'list-item').length > 1;
};

const useMenuOptions = (props: ItemProps) => {
  const context = useEditContext();
  const {
    addItem, deleteItem, canDelete,
  } = props;

  const menuOptions = useMemo(() => ([
    {
      name: `add-${v1()}`,
      isHidden: () => hasChildList(context),
      icon: 'add',
      label: 'Add',
      handler: addItem,
      global: false,
      local: true,
    },
    {
      name: `remove-${v1()}`,
      icon: 'delete',
      label: 'Delete',
      isHidden: () => !canDelete() || hasChildList(context),
      handler: deleteItem,
      global: false,
      local: true,
    },
  ]), []);

  return menuOptions;
};

/**
 * HOC which adds list edit buttons (Add and Delete Item).
 */
const withListButtons = ifEditable(
  withFinalDesign({
    Item: flow(
      withContextActivator('onClick'),
      withLocalContextMenu,
      withMenuOptions({ useMenuOptions, name: 'List Item', type: 'list-item' }),
    ),
  }),
);

export default withListButtons;
