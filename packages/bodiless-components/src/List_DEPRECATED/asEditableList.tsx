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

import React, { ComponentType, useMemo } from 'react';
import {
  withMenuOptions, withLocalContextMenu,
  withContextActivator, withoutProps, ifEditable,
} from '@bodiless/core';
import { flow, identity } from 'lodash';
import { Design } from '@bodiless/fclasses/lib/Design';

import { TitleProps, FinalProps, ListDesignableComponents } from './types';

const useMenuOptions = (props: TitleProps) => {
  const {
    onAdd, onDelete, canDelete,
  } = props;

  const menuOptions = useMemo(() => ([
    {
      name: 'Add',
      icon: 'add',
      label: 'Add',
      handler: onAdd,
      global: false,
      local: true,
    },
    {
      name: 'Remove',
      icon: 'delete',
      label: 'Delete',
      isHidden: () => !canDelete(),
      handler: onDelete,
      global: false,
      local: true,
    },
  ]), []);

  return menuOptions;
};

// TODO: Maybe generalize this as an "alterDesign()" method.
const asEditableList = (List: ComponentType<FinalProps>) => (
  ({ design, ...rest }: FinalProps) => {
    const { Title, ItemMenuOptionsProvider } = (design || {}) as Design<ListDesignableComponents>;
    const newDesign = {
      ...(design || {}),
      Title: flow(
        Title || identity,
        ifEditable(
          withContextActivator('onClick'),
          withLocalContextMenu,
        ),
        withoutProps(['onAdd', 'onDelete', 'canDelete']),
        ItemMenuOptionsProvider || identity,
        ifEditable(
          withMenuOptions({ useMenuOptions, name: 'list-item' }),
        ),
      ),
    };
    return <List design={newDesign} {...rest} />;
  }
);

export default asEditableList;
