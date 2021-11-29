/* eslint-disable import/prefer-default-export */
/**
 * Copyright © 2021 Johnson & Johnson
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

import React, {
  useCallback
} from 'react';
import {
  useNode,
  useEditContext,
  withMenuOptions,
  TMenuOption,
  MenuOptionsDefinition,
} from '@bodiless/core';
import {
  asToken,
  withOnlyProps,
  HOC,
} from '@bodiless/fclasses';
import type {
  ContextMenuFormProps,
} from '@bodiless/core';
import { withToolsButton } from '../Tools';

const useMenuOptions = (): TMenuOption[] => {
  const menuOptions$: TMenuOption[] = [
    {
      name: 'page-alias',
      icon: 'route',
      label: 'Aliases',
      group: 'tools-group',
      // handler: () => render,
    },
  ];
  return menuOptions$;
};


const menuOptions: MenuOptionsDefinition<object> = {
  useMenuOptions,
  name: 'UrlAlias',
  root: true,
};

const withUrlAliasButton = asToken(
  withOnlyProps('key', 'children') as HOC,
  withMenuOptions(menuOptions),
  withToolsButton,
);

export {
  withUrlAliasButton,
};
