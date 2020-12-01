import React from 'react';
import type { ComponentType } from 'react';
import { ContentNode, NodeProvider } from '@bodiless/core';

class MockContentNode implements ContentNode<any> {
  data = {};

  setData = jest.fn();

  delete = jest.fn();

  keys = [];

  path = [];

  pagePath = '';

  baseResourcePath = '';

  child = jest.fn();

  peer = jest.fn();

  hasError = jest.fn();
}

/**
 * HOC which Wraps the component with a mock node.  The resulting component
 * has a .node property with a reference to the actual mock node.
 */
export const withMockNode = (Component: ComponentType<any>) => {
  const node = new MockContentNode();
  const WithMockNode = (props: any) => (
    <NodeProvider node={node}>
      <Component {...props} />
    </NodeProvider>
  );
  WithMockNode.node = node;
  return WithMockNode;
};

export default MockContentNode;
