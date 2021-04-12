import React from 'react';
import type { ComponentType } from 'react';
import { ContentNode, NodeProvider } from '@bodiless/core';

class MockContentNode<D> implements ContentNode<D> {
  data: D = {} as D;

  path: string[] = [];

  constructor(data: D = {} as D, path: string[] = []) {
    this.data = data;
    this.path = path;
  }

  setData = jest.fn();

  delete = jest.fn();

  keys = [];

  pagePath = '';

  baseResourcePath = '';

  child = jest.fn(
    (path: string) => new MockContentNode<any>(this.data, [...this.path, ...path.split('$')]),
  );

  peer = jest.fn(
    (path: string | string[]) => {
      const path$ = typeof path === 'string' ? path.split('$') : path;
      return new MockContentNode<any>(this.data, path$);
    },
  );

  hasError = jest.fn().mockReturnValue(false);

  proxy = jest.fn();
}

/**
 * HOC which Wraps the component with a mock node.  The resulting component
 * has a .node property with a reference to the actual mock node.
 */
export const withMockNode = (data?: any) => (Component: ComponentType<any>) => {
  const node = new MockContentNode(data);
  const WithMockNode = (props: any) => (
    <NodeProvider node={node}>
      <Component {...props} />
    </NodeProvider>
  );
  WithMockNode.node = node;
  return WithMockNode;
};

export default MockContentNode;
