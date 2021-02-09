/**
 * Copyright © 2020 Johnson & Johnson
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

import React, { ComponentType } from 'react';
import { flowRight } from 'lodash';
import { useNode, withNode } from '@bodiless/core';
import { Node } from 'slate';
import type { Value } from './Type';

const DEFAULT_DELIMITER = '\n';

/**
 * @todo make delimiter configurable similar to how it was done in slate-plain-serializer
 * @see https://github.com/ianstormtaylor/slate/blob/slate%400.44.13/packages/slate-plain-serializer/src/index.js#L19
 */
const serialize = (nodes: Node[]) => nodes.map(n => Node.string(n)).join(DEFAULT_DELIMITER);

const useRichtextPlainSerializer = () => {
  const { node } = useNode<Value>();
  const value = node.data;
  return value ? serialize(value) : '';
};

const withRichtextPlainSerializer$ = (Component: ComponentType) => {
  const WithRichtextPlainSerializer = (props: any) => {
    const plainData = useRichtextPlainSerializer();
    return <Component {...props}>{plainData}</Component>;
  };
  return WithRichtextPlainSerializer;
};

const withRichtextPlainSerializer = flowRight(
  withNode,
  withRichtextPlainSerializer$,
);

export {
  useRichtextPlainSerializer,
  withRichtextPlainSerializer,
};
