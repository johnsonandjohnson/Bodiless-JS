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

import { componentSelectorUi as ui } from '@bodiless/layouts-ui';
import { useChameleonSelectorForm as useChameleonSelectorFormBase } from '@bodiless/components';
import { ComponentSelectorFormProps } from '@bodiless/layouts';

/**
 * Bodiless `useOverrides` hook which forces a chameleon buton to use the component selector
 * form in all cases. This version uses the default bodiless admin UI.
 *
 * @example
 * ```ts
 * withChameleonButton('node-key', defaultData, useChameleonSelectorForm);
 * ```
 */
export const useChameleonSelectorForm = (
  props: Omit<ComponentSelectorFormProps, 'onSelect'|'ui'>,
) => useChameleonSelectorFormBase({
  ...props,
  ui,
});
