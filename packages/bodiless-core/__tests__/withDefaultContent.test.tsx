/**
 * Copyright © 2020 Johnson & Johnson
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

import React, { FC, ComponentType } from 'react';
import { mount } from 'enzyme';
import { flow } from 'lodash';
import { DefaultContentNode } from '../src/ContentNode';
import NodeProvider, { useNode } from '../src/NodeProvider';
import withNode, { withNodeKey } from '../src/withNode';
import withDefaultContent from '../src/Contentful/withDefaultContent';

const mockedActions = {
  setNode: jest.fn(),
  deleteNode: jest.fn(),
};

interface Store {
  [key: string]: string | undefined | object;
}

const createGetters = (store: Store) => ({
  getNode: (path: string[]) => {
    const key = path.join('$');
    return store[key] || '';
  },
  getKeys: jest.fn(),
  hasError: jest.fn(),
  getPagePath: jest.fn(() => '/'),
  getBaseResourcePath: jest.fn(() => '/'),
});

const createNodeConsumer = (displayName?: string) => {
  const NodeConsumer: FC = () => {
    const { node } = useNode();
    const { data } = node;
    const data$ = Object.keys(data).length === 0 ? '' : data;
    // ToDo: find a better way how to test react hooks
    return <>{data$}</>;
  };
  NodeConsumer.displayName = displayName || 'NodeConsumer';
  return NodeConsumer;
};

const defaultStore = {
  root$foo: 'fooValue',
  root$foo$bar: 'barValue',
};

const withRootNode = (store: Store) => <P extends object>(Component: ComponentType<P>) => {
  const node = new DefaultContentNode(mockedActions, createGetters(store), 'root');
  const WithRootNode = (props: P) => (
    <NodeProvider node={node}>
      <Component {...props as P} />
    </NodeProvider>
  );
  return WithRootNode;
};

describe('withDefaultContent', () => {
  it('allows passing default content for an item as an object', () => {
    const FooConsumer = createNodeConsumer('Foo');
    const Foo = flow(
      withNode,
      withNodeKey('foo'),
      withDefaultContent({
        foo: 'defaultFooValue',
      }),
    )(FooConsumer);
    const wrapper = mount(<Foo />);
    expect(wrapper.find('Foo').html()).toBe('defaultFooValue');
  });
  it('allows passing default content for an item as a function', () => {
    const FooConsumer = createNodeConsumer('Foo');
    const Foo = flow(
      withNode,
      withNodeKey('foo'),
      withDefaultContent({
        foo: () => 'defaultFooValue',
      }),
    )(FooConsumer);
    const wrapper = mount(<Foo />);
    expect(wrapper.find('Foo').html()).toBe('defaultFooValue');
  });
  it('allows passing default content for a compound component', () => {
    const Foo = flow(
      withNode,
      withNodeKey('foo'),
    )(createNodeConsumer('Foo'));
    const Bar = flow(
      withNode,
      withNodeKey('bar'),
    )(createNodeConsumer('Bar'));
    const BazBase = () => (
      <>
        <Foo />
        <Bar />
      </>
    );
    const Baz = withDefaultContent({
      foo: 'defaultFooValue',
      bar: 'defaultBarValue',
    })(BazBase);
    const wrapper = mount(<Baz />);
    expect(wrapper.find('Foo').html()).toBe('defaultFooValue');
    expect(wrapper.find('Bar').html()).toBe('defaultBarValue');
  });
  it('allows providing default content for current node', () => {
    const FooConsumer = createNodeConsumer('Foo');
    const Foo = flow(
      withDefaultContent({
        '': 'defaultFooValue',
      }),
      withNode,
      withNodeKey('foo'),
    )(FooConsumer);
    const wrapper = mount(<Foo />);
    expect(wrapper.find('Foo').html()).toBe('defaultFooValue');
  });
  describe('when default content is specified as a function for an item', () => {
    it('passes node as an argument to the functon', () => {
      const FooConsumer = createNodeConsumer('Foo');
      const Foo = flow(
        withNode,
        withNodeKey('foo'),
        withDefaultContent({
          foo: (node: any) => node.path.join('$'),
        }),
      )(FooConsumer);
      const wrapper = mount(<Foo />);
      expect(wrapper.find('Foo').html()).toBe('root$foo');
    });
    it('allows getting sibling node data', () => {
      const Foo = flow(
        withNode,
        withNodeKey('foo'),
      )(createNodeConsumer('Foo'));
      const Bar = flow(
        withNode,
        withNodeKey('bar'),
      )(createNodeConsumer('Bar'));
      const BazBase = () => (
        <>
          <Foo />
          <Bar />
        </>
      );
      const Baz = withDefaultContent({
        foo: (node: any) => node.peer(['root', 'bar']).data,
        bar: 'defaultBarValue',
      })(BazBase);
      const wrapper = mount(<Baz />);
      expect(wrapper.find('Foo').html()).toBe('');
    });
    it('allows merging default content with node data', () => {
      const FooConsumer = createNodeConsumer('Foo');
      const Foo = flow(
        withNode,
        withNodeKey('foo'),
        withDefaultContent({
          foo: (node: any) => node.path.join('$').concat('=').concat(node.data),
        }),
        withRootNode({
          root$foo: 'fooValue',
        }),
      )(FooConsumer);
      const wrapper = mount(<Foo />);
      expect(wrapper.find('Foo').html()).toBe('root$foo=fooValue');
    });
  });
  describe('when a component with single node is wrapped', () => {
    describe('when the wrapped component node data is not empty', () => {
      test('wrapped component takes node data from store', () => {
        const Foo = flow(
          withNode,
          withNodeKey('foo'),
          withDefaultContent({
            foo: 'defaultFooContent',
          }),
          withRootNode({
            ...defaultStore,
            root$foo: 'fooValue',
          }),
        )(createNodeConsumer('Foo'));
        const wrapper = mount(<Foo />);
        expect(wrapper.find('Foo').html()).toBe('fooValue');
      });
    });
    describe('when the wrapped component node data is empty object', () => {
      test('wrapped component takes default content', () => {
        const Foo = flow(
          withNode,
          withNodeKey('foo'),
          withDefaultContent({
            foo: 'defaultFooContent',
          }),
          withRootNode({
            ...defaultStore,
            root$foo: {},
          }),
        )(createNodeConsumer('Foo'));
        const wrapper = mount(<Foo />);
        expect(wrapper.find('Foo').html()).toBe('defaultFooContent');
      });
    });
    describe('when the wrapped component node data is undefined', () => {
      test('wrapped component takes default content', () => {
        const Foo = flow(
          withNode,
          withNodeKey('foo'),
          withDefaultContent({
            foo: 'defaultFooContent',
          }),
          withRootNode({
            ...defaultStore,
            root$foo: undefined,
          }),
        )(createNodeConsumer('Foo'));
        const wrapper = mount(<Foo />);
        expect(wrapper.find('Foo').html()).toBe('defaultFooContent');
      });
    });
  });
});
