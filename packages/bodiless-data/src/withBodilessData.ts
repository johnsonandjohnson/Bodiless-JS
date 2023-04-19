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

import flowRight from 'lodash/flowRight';
import type { Enhancer } from '@bodiless/fclasses';
import withNode, { withNodeKey } from './withNode';
import { withNodeDataHandlers } from './hoc';
import type { WithNodeProps, WithNodeKeyProps } from './NodeTypes';

/**
 * Convenience HOC to plug a component into the bodiless data model.
 *
 * @param nodeKeys The nodekeys which will be used to locate the component's data.
 *
 * @param defaultData Default data to be provided for this component.
 */
export const withBodilessData = <D extends object>(
  nodeKey?: WithNodeKeyProps,
  defaultData?: D,
) => flowRight(
    withNodeKey(nodeKey),
    withNode,
    withNodeDataHandlers(defaultData),
  ) as Enhancer<Partial<WithNodeProps>>;
