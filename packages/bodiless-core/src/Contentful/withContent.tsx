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
import NodeProvider, { useNode } from '../NodeProvider';
import { ContentfulNode } from './ContentfulNode';

const withContent = <P extends object>(content: any) => (Component: CT<P>) => {
  const WithContent = (props: P) => {
    const { node } = useNode();
    const nodeWithDefaultContent = new ContentfulNode(node, content);
    return (
      <NodeProvider node={nodeWithDefaultContent}>
        <Component {...props} />
      </NodeProvider>
    );
  }
  return WithContent;
}

export default withContent;
