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
import flow from 'lodash/flow';
import { ComponentWithMeta, flowHoc } from '@bodiless/fclasses';
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
    )(FooConsumer) as ComponentType<any>;
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
    )(FooConsumer) as ComponentType<any>;
    const wrapper = mount(<Foo />);
    expect(wrapper.find('Foo').html()).toBe('defaultFooValue');
  });
  it('allows passing default content for a compound component', () => {
    const Foo = flow(
      withNode,
      withNodeKey('foo'),
    )(createNodeConsumer('Foo')) as ComponentType<any>;
    const Bar = flow(
      withNode,
      withNodeKey('bar'),
    )(createNodeConsumer('Bar')) as ComponentType<any>;
    const BazBase = () => (
      <>
        <Foo />
        <Bar />
      </>
    );
    const Baz = flow(
      withDefaultContent({
        foo: 'defaultFooValue',
      }),
      withDefaultContent({
        bar: 'defaultBarValue',
      }),
    )(BazBase) as ComponentType<any>;
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
    )(FooConsumer) as ComponentType<any>;
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
      )(FooConsumer) as ComponentType<any>;
      const wrapper = mount(<Foo />);
      expect(wrapper.find('Foo').html()).toBe('root$foo');
    });
    it('allows getting sibling node data', () => {
      const Foo = flow(
        withNode,
        withNodeKey('foo'),
      )(createNodeConsumer('Foo')) as ComponentType<any>;
      const Bar = flow(
        withNode,
        withNodeKey('bar'),
      )(createNodeConsumer('Bar')) as ComponentType<any>;
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
  describe('when default content providers are nested', () => {
    const fooContent = {
      foo: 'defaultFooContent',
    };
    const barContent = {
      bar: 'defaultBarContent',
    };
    const Foo = flow(
      withNode,
      withNodeKey('foo'),
    )(createNodeConsumer('Foo'));
    const Bar: ComponentType<any> = flow(
      withNode,
      withNodeKey('bar'),
    )(createNodeConsumer('Bar'));

    it('renders default content from both layers', () => {
      const Test$: FC = () => (
        <>
          <Foo />
          <Bar />
        </>
      );
      const Test = flow(
        withDefaultContent(fooContent),
        withDefaultContent(barContent),
      )(Test$);
      const wrapper = mount(<Test />);
      expect(wrapper.find('Foo').html()).toBe('defaultFooContent');
      expect(wrapper.find('Bar').html()).toBe('defaultBarContent');
    });

    it('lists keys from both layers', () => {
      const KeyPrinter$ = () => {
        const { node } = useNode();
        const { keys } = node;
        return <>{keys.join(',')}</>;
      };
      const KeyPrinter = flow(
        withDefaultContent(fooContent),
        withDefaultContent(barContent),
      )(KeyPrinter$);
      const wrapper = mount(<KeyPrinter />);
      const keys = wrapper.find(KeyPrinter).html().split(',');
      const expectedKeys = ['root', 'root$foo', 'root$bar'];
      expect(keys.sort()).toEqual(expectedKeys.sort());
    });

    it('uses default content from outermost layer', () => {
      const fooContentOuter = {
        foo: 'fooOuterContent',
      };
      const Test = flow(
        withDefaultContent(fooContent),
        withDefaultContent(fooContentOuter)
      )(Foo);
      const wrapper = mount(<Test />);
      const text = wrapper.html();
      expect(text).toBe('fooOuterContent');
    });

    it('gets correct content from a peer node', () => {
      const Bar$ = () => {
        const { node } = useNode();
        const peer = node.peer('root$foo');
        const content = {
          fooData: peer.data,
          barData: node.data,
        };
        return <pre id="test">{JSON.stringify(content)}</pre>;
      };
      const Bar = flow(
        withNode,
        withNodeKey('bar'),
        withDefaultContent(barContent),
      )(Bar$);
      const Test$ = () => <Bar />;
      const Test = withDefaultContent(fooContent)(Test$);
      const wrapper = mount(<Test />);
      const json = wrapper.find('pre#test').text();
      const data = JSON.parse(json);
      expect(data.fooData).toBe(fooContent.foo);
      expect(data.barData).toBe(barContent.bar);
    });
  });

  describe('when a component with single node is wrapped', () => {
    const ValuePrinter: FC = () => {
      const { node } = useNode();
      return <pre id="test">{JSON.stringify(node.data)}</pre>;
    };
    const FooBase = flow(
      withNode,
      withNodeKey('foo'),
      withDefaultContent({
        foo: 'fooDefaultContent',
      }),
    )(ValuePrinter);
    const withFooStore = (value: any) => withRootNode({
      ...defaultStore,
      root$foo: value,
    })(FooBase);
    it('uses store data when store data is an empty array', () => {
      const fooValue: any[] = [];
      const Foo = withFooStore(fooValue);
      const wrapper = mount(<Foo />);
      expect(JSON.parse(wrapper.find('pre#test').text())).toEqual(fooValue);
    });
    it('uses store data when store data is an object', () => {
      const fooValue = { foo: 'bar '};
      const Foo = withFooStore(fooValue);
      const wrapper = mount(<Foo />);
      expect(JSON.parse(wrapper.find('pre#test').text())).toEqual(fooValue);
    });
    it('uses default data when store data is an empty object', () => {
      const fooValue = {};
      const Foo = withFooStore(fooValue);
      const wrapper = mount(<Foo />);
      expect(JSON.parse(wrapper.find('pre#test').text())).toEqual('fooDefaultContent');
    });
    it('uses default data when store data is undefined', () => {
      const fooValue = undefined;
      const Foo = withFooStore(fooValue);
      const wrapper = mount(<Foo />);
      expect(JSON.parse(wrapper.find('pre#test').text())).toEqual('fooDefaultContent');
    });
  });
});
