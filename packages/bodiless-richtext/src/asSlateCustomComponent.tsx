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

import React, { ComponentType as CT } from 'react';
import { WithNodeProps, DefaultContentNode, NodeProvider } from '@bodiless/core';
import { CustomComponentProps } from './Type';

const asSlateCustomComponent = <P extends WithNodeProps>(Component: CT<P>) => ({
  componentData,
  setComponentData,
  ...rest
}: P & CustomComponentProps) => {
  const getters = {
    getNode: () => componentData,
    getKeys: () => ['slatenode'],
    hasError: () => false,
  };
  const actions = {
    // tslint: disable-next-line:no-unused-vars
    setNode: (path: string[], data: any) => setComponentData(data),
    deleteNode: () => {},
  };
  const contentNode = new DefaultContentNode(actions, getters, 'slatenode');
  return (
    <NodeProvider node={contentNode}>
      <Component {...rest as P} />
    </NodeProvider>
  );
};

export default asSlateCustomComponent;
