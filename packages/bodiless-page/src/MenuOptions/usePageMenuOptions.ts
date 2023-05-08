/**
 * Copyright © 2022 Johnson & Johnson
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

import { useCallback } from 'react';
import {
  ContextSubMenu,
  useEditContext,
} from '@bodiless/core';
import { PageMenuOptions } from '../types';

const usePageMenuGroup = () => {
  const menuOptions = [
    {
      name: 'page-group',
      icon: 'description',
      label: 'Page',
      Component: ContextSubMenu,
    },
  ];
  return menuOptions;
};

const usePageMenuOptions = (
  options: PageMenuOptions,
) => {
  const {
    name, icon, label, handler, isDisabled: isDisabled$,
  } = options;
  const context = useEditContext();

  const saveEnabled = (process.env.BODILESS_BACKEND_SAVE_ENABLED || '1') === '1';

  const isDisabled = useCallback(
    () => (isDisabled$ ? (!context.isEdit || !saveEnabled) : false),
    []
  );

  const menuOptions = [
    ...usePageMenuGroup(),
    {
      name,
      icon,
      label,
      group: 'page-group',
      handler: () => (isDisabled() ? null : handler()),
      isDisabled,
    },
  ];

  return menuOptions;
};

export {
  usePageMenuOptions,
  usePageMenuGroup,
};
