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

import React from 'react';
import { mount } from 'enzyme';
import NodeProvider, {
  useNode,
  useNodeDataHandlers,
} from '../src/NodeProvider';
import { ContentNode } from '../src/ContentNode';

type Data = {
  foo: string;
};

class MockContentNode implements ContentNode<Data> {
  data: Data = { foo: Math.random().toString() };

  setData = jest.fn();

  delete = jest.fn();

  keys = [];

  path = [];

  child = jest.fn();

  peer = jest.fn();

  hasError = jest.fn();

  pagePath: string = '/';

  baseResourcePath: string = '/';

  proxy = jest.fn();
}

const ShowNode: React.FC<any> = ({ collection, id }) => {
  const { node } = useNode<Data>(collection);
  return <div id={id}>{node.data.foo}</div>;
};

describe('NodeProvicer', () => {
  it('provides correct default node data handlers', () => {
    const newData = Math.random().toString();
    const Foo = () => {
      const { setComponentData, componentData } = useNodeDataHandlers<Data>();
      setComponentData({ foo: newData });
      return <div>{componentData.foo}</div>;
    };
    const node = new MockContentNode();
    const wrapper = mount(
      <NodeProvider node={node}>
        <Foo />
      </NodeProvider>,
    );
    expect(wrapper.find('div').text()).toBe(node.data.foo);
    expect(node.setData.mock.calls.length).toBe(1);
    expect(node.setData.mock.calls[0][0]).toEqual({ foo: newData });
  });

  it('Provides a default node in the context which is available via useNode', () => {
    const node = new MockContentNode();
    const wrapper = mount(
      <NodeProvider node={node}>
        <ShowNode />
      </NodeProvider>,
    );
    expect(wrapper.find('div').text()).toBe(node.data.foo);
  });

  it('Provides a node in the active collection', () => {
    const node1 = new MockContentNode();
    const node2 = new MockContentNode();
    const node3 = new MockContentNode();
    const wrapper = mount(
      <NodeProvider node={node1}>
        <NodeProvider node={node2} collection="col1">
          <ShowNode id="col1before" collection="col1" />
          <NodeProvider node={node3}>
            <ShowNode id="col1" collection="col1" />
            <ShowNode id="_default" collection="_default" />
          </NodeProvider>
        </NodeProvider>
      </NodeProvider>,
    );
    expect(wrapper.find('div#col1').text()).toBe(node3.data.foo);
    expect(wrapper.find('div#col1before').text()).toBe(node2.data.foo);
    expect(wrapper.find('div#_default').text()).toBe(node1.data.foo);
  });

  it('Retrieves a node from the active collection', () => {
    const defaultNode = new MockContentNode();
    const specialNode = new MockContentNode();
    const wrapper = mount(
      <NodeProvider node={defaultNode}>
        <NodeProvider node={specialNode} collection="other">
          <ShowNode />
        </NodeProvider>
      </NodeProvider>,
    );
    expect(wrapper.find('div').text()).toBe(specialNode.data.foo);
  });

  it('Provides multiple node collections', () => {
    const defaultNode = new MockContentNode();
    const otherNode = new MockContentNode();
    const wrapper = mount(
      <NodeProvider node={defaultNode}>
        <NodeProvider node={otherNode} collection="other">
          <ShowNode id="default" collection="_default" />
          <ShowNode id="other" collection="other" />
        </NodeProvider>
      </NodeProvider>,
    );
    expect(wrapper.find('div#default').text()).toBe(defaultNode.data.foo);
    expect(wrapper.find('div#other').text()).toBe(otherNode.data.foo);
  });
});
