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

import {
  useCallback,
} from 'react';
import {
  useEditContext,
  withMenuOptions,
  TMenuOption,
  MenuOptionsDefinition,
} from '@bodiless/core';
import {
  asToken, HOC, withOnlyProps,
} from '@bodiless/fclasses';

const useMenuOptions = (): TMenuOption[] => {
  const context = useEditContext();
  const menuOptions$: TMenuOption[] = [
    {
      name: 'page-clone',
      icon: 'collections',
      label: 'Clone',
      group: 'page-group',
      isHidden: useCallback(() => !context.isEdit, []),
    },
  ];
  return menuOptions$;
};

const menuOptions: MenuOptionsDefinition<object> = {
  useMenuOptions,
  name: 'PageClone',
  root: true,
};

// Remove temporary props before rendering.
// Fix "Invalid prop `...` supplied to `React.Fragment`.
// React.Fragment can only have `key` and `children` props.
const withPropsCleanUp = withOnlyProps('key', 'children') as HOC;

const withPageCloneButton = asToken(
  withPropsCleanUp,
  withMenuOptions(menuOptions),
);

export default withPageCloneButton;
