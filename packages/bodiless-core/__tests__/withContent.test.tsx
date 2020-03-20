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

import React, { HTMLProps, FC } from 'react';
import { mount, shallow } from 'enzyme';
import { flow } from 'lodash';
import { ContentNode, DefaultContentNode } from '../src/ContentNode';
import NodeProvider, { useNode } from '../src/NodeProvider';
import withNode, { withNodeKey } from '../src/withNode';
import withContent from '../src/Contentful/WithContent';

const mockedActions = {
  setNode: jest.fn(),
  deleteNode: jest.fn(),
};

interface Store {
  [key: string]: string | undefined | object;
}

const createGetters = (store: Store) => {
  return {
    getNode: (path: string[]) => {
      const key = path.join('$');
      return store[key] || '';
    },
    getKeys: jest.fn(),
  }
}

const createRootNode = (store: Store) => {
  const RootNode: FC = ( {children} ) => {
    const node = new DefaultContentNode(mockedActions, createGetters(store), 'root');
    return (
      <NodeProvider node={node}>
        {children}
      </NodeProvider>
    );
  }
  return RootNode;
}

const defaultStore = {
  'root$foo': 'fooValue',
  'root$foo$bar': 'barValue',
};

describe('withContent', () => {
  describe('when wrapped component node data is not empty', () => {
    test('wrapped component takes node data', () => {
      // ToDo: find a better way how to test react hooks
      // ToDo: avoiod duplicatioon
      const Foo: FC = () => {
        const { node } = useNode();
        const { data } = node;
        return <>{data}</>;
      }
      const FooWithNode = flow(
        withNode,
        withNodeKey('foo'),
        withContent('defaultFooContent'),
      )(Foo);
      const RootNode = createRootNode({
        ...defaultStore,
        'root$foo': 'fooValue',
      });
      const wrapper = mount(
        <RootNode>
          <FooWithNode />
        </RootNode>
      );
      expect(wrapper.find('Foo').html()).toBe('fooValue');
    });
  });
  describe('when wrapped component node data is empty object', () => {
    test('wrapped component takes default content', () => {
      const Foo: FC = () => {
        const { node } = useNode();
        const { data } = node;
        return <>{data}</>;
      }
      const FooWithNode = flow(
        withNode,
        withNodeKey('foo'),
        withContent('defaultFooContent'),
      )(Foo);
      const RootNode = createRootNode({
        ...defaultStore,
        'root$foo': {},
      });
      const wrapper = mount(
        <RootNode>
          <FooWithNode />
        </RootNode>
      );
      expect(wrapper.find('Foo').html()).toBe('defaultFooContent');
    });
  });
  describe('when wrapped component node data is undefined', () => {
    test('wrapped component takes default content', () => {
      // ToDo: find a better way how to test react hooks
      const Foo: FC = () => {
        const { node } = useNode();
        const { data } = node;
        return <>{data}</>;
      }
      const FooWithNode = flow(
        withNode,
        withNodeKey('foo'),
        withContent('defaultFooContent'),
      )(Foo);
      const RootNode = createRootNode({
        ...defaultStore,
        'root$foo': undefined,
      });
      const wrapper = mount(
        <RootNode>
          <FooWithNode />
        </RootNode>
      );
      expect(wrapper.find('Foo').html()).toBe('defaultFooContent');
    });
  });
});
