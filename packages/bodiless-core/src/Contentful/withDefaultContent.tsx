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
import ContentfulNode from './ContentfulNode';
import { DefaultContentNode } from '../ContentNode';

/**
 * Creates an HOC which provides default content to the wrapped component.
 *
 * The default content is an object (or a function returning an object) keyed
 * by the relative node key at which the wrapped component or its children are
 * expecting their content.  The schema of the content at each node key should
 * match the schema expected by the component which will receive the content.
 *
 * Default content is provided to the component or child only if real, saved content
 * does not exist at a particular.
 *
 * @param content
 * An object or function returning an object containing default content keyed by node key.
 *
 * @returns
 * An HOC providing default content to the wrapped component.
 */
const withDefaultContent = <P extends object, D extends object>(content: D|((props:P) => D)) => (
  (Component: CT<P>) => {
    const WithDefaultContent = (props: P) => {
      const { node } = useNode();
      const content$ = typeof content === 'function'
        ? (content as ((props:P) => D))(props) : content;
      // eslint-disable-next-line max-len
      const nodeWithDefaultContent = ContentfulNode.create((node as DefaultContentNode<object>), content$);
      return (
        <NodeProvider node={nodeWithDefaultContent}>
          <Component {...props} />
        </NodeProvider>
      );
    };
    return WithDefaultContent;
  }
);

export default withDefaultContent;
