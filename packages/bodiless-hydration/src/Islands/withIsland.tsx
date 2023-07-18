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
