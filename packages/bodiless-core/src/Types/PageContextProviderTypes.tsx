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

import { DefinesLocalEditContext } from '../PageEditContext/types';
import { TMenuOption } from './ContextMenuTypes';

export type TMenuOptionGetter = () => TMenuOption[];

export type PageContextProviderProps = Partial<DefinesLocalEditContext>;

/**
 * An object which defines a group of menu options.
 */
export type MenuOptionsDefinition<P> = Omit<PageContextProviderProps, 'getMenuOptions'> & {
  /**
   * A custom hook which returns an array of menu options.  Will be passed the props of
   * the component.
   */
  useMenuOptions?: (props: P) => TMenuOption[],
  /**
   * When true, specifies that the menu options should be attached to the current context.
   * Otherwise, a new context will be created as a child of the current context.
   */
  peer?: boolean,
  /**
   * When true, specifies that the menu option sshould be attached to the root context. Options
   * attached to the root context are always visible.
   */
  root?: boolean,
};
