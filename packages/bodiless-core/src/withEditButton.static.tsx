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

import identity from 'lodash/identity';
import type { OptionGroupDefinition } from './Types/EditButtonTypes';
import { TMenuOption } from './Types/ContextMenuTypes';

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
):TMenuOption[] => [baseOption];

/**
 * Uses the provided options to create a HOC which adds an edit button provider
 * to the wrapped component.
 *
 * @param options The options defining the edit button.
 *
 * @return A HOC which will add an edit button for the wrapped component.
 */
const withEditButton = identity;

export default withEditButton;
