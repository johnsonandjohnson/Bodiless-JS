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
import { withNodeKeyParentTrail } from '@bodiless/data';
import { isStaticClientSide } from '../utils';

const stringifyReplacer = (key: string, value: any): any => {
  const propsToRemove = ['__source', '__self', 'stateNode', '_context', 'return', 'children'];
  return propsToRemove.includes(key) ? undefined : value;
};

const createSerializedData = (props: any) => JSON.stringify(props, stringifyReplacer);

const withIsland = (ComponentName: string) : HOC => (Component) => {
  const WithIsland = (props: any) => {
    if (isStaticClientSide) return <Component {...props} />;
    const serializedData = createSerializedData(props);
    const ComponentWithNodeKeyParentTrail = withNodeKeyParentTrail(Span);

    return (
      <ComponentWithNodeKeyParentTrail
        data-island-component={ComponentName}
        data-island-props={serializedData}
        style={{display: 'content'}}
      >
        <Component
          {...props}
        />
      </ComponentWithNodeKeyParentTrail>
    );
  };

  return WithIsland;
};

export {
  withIsland,
};

export default withIsland;
