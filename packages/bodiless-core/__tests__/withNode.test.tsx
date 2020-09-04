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

import React, { HTMLProps, FC } from 'react';
import { mount, shallow } from 'enzyme';
import { ContentNode } from '../src/ContentNode';
import NodeProvider, { useNode } from '../src/NodeProvider';
import withNode, { withNodeKey } from '../src/withNode';

class MockContentNode<D extends object> implements ContentNode<D> {
  data: D = {} as D;

  delete = jest.fn();

  setData = jest.fn();

  path: string[] = [];

  keys = [];

  hasError = jest.fn();

  pagePath: string = '/';

  resourcePath: string = '/';

  // eslint-disable-next-line class-methods-use-this
  peer<E extends object>(key: string) {
    return new MockContentNode<E>(key);
  }

  child<E extends object>(key: string) {
    return this.peer<E>(this.path.concat([key]).join(''));
  }

  constructor(key: string) {
    this.path = [key];
  }
}

describe('withNode', () => {
  it('passes props to the wrapped component', () => {
    const Foo: FC<HTMLProps<HTMLDivElement>> = props => <div {...props} />;
    const Bar = withNode(Foo);
    const id = Math.random().toString();
    const wrapper = shallow(<Bar nodeKey="foo" id={id} />).find(Foo);
    expect(wrapper.prop('id')).toBe(id);
    expect(wrapper.prop('nodeKey')).toBeUndefined();
  });

  it('spawns a new node and puts it in the context', () => {
    const oldKey = Math.random().toString();
    const newKey = Math.random().toString();
    const oldNode = new MockContentNode(oldKey);
    const Base = () => {
      const { node } = useNode();
      return <div id="old">{node.path.join('')}</div>;
    };
    const Foo = withNode(() => {
      const { node: newNode } = useNode();
      return <div id="new">{newNode.path.join('')}</div>;
    });
    const wrapper = mount(
      <NodeProvider node={oldNode}>
        <Base />
        <Foo nodeKey={newKey} />
      </NodeProvider>,
    );
    expect(wrapper.find('#old').text()).toBe(oldKey);
    expect(wrapper.find('#new').text()).toBe(`${oldKey}${newKey}`);
  });

  it('puts the new node in the right collection', () => {
    const Foo = withNode(() => <></>);
    const topKey = Math.random().toString();
    const newKey = Math.random().toString();
    const baseNode = new MockContentNode(topKey);
    const wrapper = mount(
      <NodeProvider node={baseNode} collection="special">
        <Foo nodeKey={newKey} nodeCollection="special" />
      </NodeProvider>,
    );
    const providerProps = wrapper
      .find(Foo)
      .find(NodeProvider)
      .props() as any;
    expect(providerProps.node.path).toEqual([`${topKey}${newKey}`]);
    expect(providerProps.collection).toEqual('special');
  });
});

describe('withNodeKey', () => {
  const C: FC<any> = () => <></>;
  it('passes a string nodeKey prop to the underlying component', () => {
    const Test = withNodeKey('foo')(C);
    const wrapper = shallow(<Test />);
    expect(wrapper.prop('nodeKey')).toBe('foo');
    expect(wrapper.prop('nodeCollection')).toBeUndefined();
  });
  it('passes a nodeKey and nodeCollection object as props to the underlying component', () => {
    const Test = withNodeKey({ nodeKey: 'foo', nodeCollection: 'bar' })(C);
    const wrapper = shallow(<Test />);
    expect(wrapper.prop('nodeKey')).toBe('foo');
    expect(wrapper.prop('nodeCollection')).toBe('bar');
  });
  it('does not pass any props if called without arguments', () => {
    const Test = withNodeKey()(C);
    const wrapper = shallow(<Test />);
    expect(wrapper.prop('nodeKey')).toBeUndefined();
    expect(wrapper.prop('nodeCollection')).toBeUndefined();
  });
  it('allows nodeKey and nodeCollection to be overridden', () => {
    const Test = withNodeKey({ nodeKey: 'foo', nodeCollection: 'bar' })(C);
    const wrapper = shallow(<Test nodeKey="baz" nodeCollection="bing" />);
    expect(wrapper.prop('nodeKey')).toBe('baz');
    expect(wrapper.prop('nodeCollection')).toBe('bing');
  });
});
