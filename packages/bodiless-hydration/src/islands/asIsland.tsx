/**
 * Copyright © 2023 Johnson & Johnson
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
import React from 'react';
import { HOC, Span } from '@bodiless/fclasses';
import {
  useNode,
  withNodeKeyParentTrail,
  childKeys,
  ContentNode
} from '@bodiless/data';
import { isEditClientSide, isStaticClientSide } from '../utils';

const stringifyReplacer = (key: string, value: any): any => {
  const propsToRemove = ['__source', '__self', 'stateNode', '_context', 'return', 'children'];
  return propsToRemove.includes(key) ? undefined : value;
};
const createSerializedData = (props: any) => JSON.stringify(props, stringifyReplacer);

const extractNodeData = (
  source: ContentNode<any>
) => childKeys(source).reduce((acc, k): Object => ({
  ...acc,
  [`${source.path.join('$')}$${k}`]: source.child(k).data,
  ...extractNodeData(source.child(k)) as Object
}), {});

const asIsland = (ComponentName: string) : HOC => (Component) => {
  const AsIsland = (props: any) => {
    if (isStaticClientSide || isEditClientSide) return <Component {...props} />;

    const { node } = useNode();
    const data = extractNodeData(node);

    // @ts-ignore
    const content = Object.keys(node.data).length ? node.data : node.content || undefined;

    const serializedProps = createSerializedData(props);
    const serializedContent = createSerializedData(data);
    const ComponentWithNodeKeyParentTrail = withNodeKeyParentTrail(Span);

    return (
      // The Island must be wrapped in this span to use this span as the portal root.
      <span style={{display: 'content'}}>
        <ComponentWithNodeKeyParentTrail
          data-island-component={ComponentName}
          data-island-props={serializedProps}
          style={{display: 'content'}}
        >
          <Component
            {...props}
          />
          <script
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: serializedContent
            }}
          />
        </ComponentWithNodeKeyParentTrail>
      </span>
    );
  };

  return AsIsland;
};

export {
  asIsland,
};

export default asIsland;
