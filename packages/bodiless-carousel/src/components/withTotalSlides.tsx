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

import React, { ComponentType } from 'react';
import { useNode } from '@bodiless/core';
import identity from 'lodash/identity';
import type { WithNodeKeyProps } from '@bodiless/core';
import type { ListData } from '@bodiless/components';
import { observer } from 'mobx-react-lite';

const withTotalSlides = (nodeKeys?: WithNodeKeyProps) => (
  Component: ComponentType<any>,
) => {
  if (nodeKeys === undefined) return identity;
  const nodeKeys$ = typeof nodeKeys === 'string'
    ? { nodeKey: nodeKeys, nodeCollection: undefined }
    : nodeKeys;
  const { nodeKey, nodeCollection } = nodeKeys$;
  if (nodeKey === undefined) return identity;
  const WithTotalSlides = observer((props: any) => {
    const { node } = useNode(nodeCollection);
    const { data } = node.child<ListData>(nodeKey);
    const totalSlides = data.items !== undefined ? data.items.length : 1;
    return <Component {...props} totalSlides={totalSlides} />;
  });
  return WithTotalSlides;
};

export default withTotalSlides;
