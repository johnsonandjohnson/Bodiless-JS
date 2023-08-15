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

import type {
  ComponentOrTag, HOCWithMeta
} from '@bodiless/fclasses';
import type { WithNodeProps, WithNodeKeyProps } from '@bodiless/data';
import type { EditButtonOptions, UseBodilessOverrides } from './EditButtonTypes';

/**
 * Options for making a component "bodiless".
 */
export type BodilessOptions<P, D> = EditButtonOptions<P, D> & {
  /**
   * The event used to activate the edit button.  Default is 'onClick'
   */
  activateEvent?: string,
  /**
   * An optional component to use as a wrapper in edit mode. Useful if the underlying component
   * cannot produce an activation event (eg if it does not accept an 'onClick' prop).
   */
  Wrapper?: ComponentOrTag<any>,
  /**
   * An object providing default/initial values for the editable props. Should be keyed by the
   * prop name.
   */
  defaultData?: D,
};

export type AsBodiless<P, D, E = {}> = (
  nodeKeys?: WithNodeKeyProps,
  defaultData?: D,
  useOverrides?: UseBodilessOverrides<P, D, E>,
) => HOCWithMeta<{}, Partial<WithNodeProps>>;
