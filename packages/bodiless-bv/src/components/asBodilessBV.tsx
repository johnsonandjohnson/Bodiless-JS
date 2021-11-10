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

import { withoutProps } from '@bodiless/fclasses';
import {
  withNode,
  withNodeDataHandlers,
  ifReadOnly,
  withNodeKey,
  withData,
} from '@bodiless/core';
import flowRight from 'lodash/flowRight';

const emptyValue = {
  productId: '',
};

const nodeKey = 'bvConfig';

export type DataType = {
  productId: string;
};

export const withBVDataHandlers = flowRight(
  // @ts-ignore: Types of parameters are incompatible.
  withNodeKey(nodeKey),
  withNode,
  withNodeDataHandlers(emptyValue),
  ifReadOnly(withoutProps(['setComponentData'])),
);

export const asBodilessBV = flowRight(
  withBVDataHandlers,
  withData,
);
