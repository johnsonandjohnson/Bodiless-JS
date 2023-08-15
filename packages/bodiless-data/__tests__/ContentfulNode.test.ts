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

import ContentfulNode from '../src/Contentful/ContentfulNode';
import { DefaultContentNode } from '../src/ContentNode';

interface StoreData {
  [key: string]: string | undefined | object;
}

const createMockStore = (storeData: StoreData) => {
  const getNode = (path: string[]) => {
    const key = path.join('$');
    return storeData[key] || '';
  };
  const setNode = jest.fn();
  const getKeys = jest.fn(() => Object.keys(storeData));
  const getPagePath = jest.fn(() => '/');
  const getBaseResourcePath = jest.fn(() => '/');
  const hasError = jest.fn();
  const deleteNode = jest.fn();
  const actions = { setNode, deleteNode };
  const getters = {
    getKeys, getNode, hasError, getPagePath, getBaseResourcePath,
  };
  return { actions, getters };
};

const defaultStoreData = {
  root$foo: 'fooValue',
  root$foo$bar: 'barValue',
};

describe('ContentfulNode', () => {
  it('Includes default content keys in list of keys', () => {
    const { actions, getters } = createMockStore(defaultStoreData);
    const rootNode = new DefaultContentNode(actions, getters, 'root');
    const defaultContent = {
      foo: 'fooDefaultContent',
      foo$bar: 'fooBarDefaultContent',
      baz: 'bazDefaultContent',
    };
    const contentfulNode = ContentfulNode.create(rootNode, defaultContent);
    const finalKeys = ['root$foo', 'root$foo$bar', 'root$baz'];
    expect(contentfulNode.keys.sort()).toEqual(finalKeys.sort());
  });

  describe('when there is a single node', () => {
    describe('when node data exists in store', () => {
      it('returns data from store', () => {
        const { actions, getters } = createMockStore({
          ...defaultStoreData,
          root$foo: 'fooValue',
        });
        const defaultContentNode = new DefaultContentNode(actions, getters, 'root');
        const defaultContent = {
          foo: 'fooDefaultContent',
        };
        const contentfulNode = ContentfulNode.create(defaultContentNode, defaultContent);
        const fooNode = contentfulNode.child('foo');
        expect(fooNode.data).toBe('fooValue');
      });
    });
    describe('when node data does not exist in store', () => {
      it('returns default content', () => {
        const { actions, getters } = createMockStore({
          ...defaultStoreData,
          root$foo: undefined,
        });
        const defaultContentNode = new DefaultContentNode(actions, getters, 'root');
        const defaultContent = {
          foo: 'fooDefaultContent',
        };
        const contentfulNode = ContentfulNode.create(defaultContentNode, defaultContent);
        const fooNode = contentfulNode.child('foo');
        expect(fooNode.data).toBe('fooDefaultContent');
      });
    });
  });
  describe('when there is a composite node', () => {
    describe('when parent and child are in store', () => {
      it('should return parent and child data from the store', () => {
        const { actions, getters } = createMockStore({
          ...defaultStoreData,
          root$foo: 'fooValue',
          root$foo$bar: 'barValue',
        });
        const defaultContentNode = new DefaultContentNode(actions, getters, 'root');
        const defaultContent = {
          foo: 'fooDefaultContent',
          foo$bar: 'barDefaultContent',
        };
        const contentfulNode = ContentfulNode.create(defaultContentNode, defaultContent);
        const fooNode = contentfulNode.child('foo');
        expect(fooNode.data).toBe('fooValue');
        const barNode = fooNode.child('bar');
        expect(barNode.data).toBe('barValue');
      });
    });
    describe('when parent and child are not in store', () => {
      it('should return parent and child data from default content', () => {
        const { actions, getters } = createMockStore({
          ...defaultStoreData,
          root$foo: undefined,
          root$foo$bar: undefined,
        });
        const defaultContentNode = new DefaultContentNode(actions, getters, 'root');
        const defaultContent = {
          foo: 'fooDefaultContent',
          foo$bar: 'barDefaultContent',
        };
        const contentfulNode = ContentfulNode.create(defaultContentNode, defaultContent);
        const fooNode = contentfulNode.child('foo');
        expect(fooNode.data).toBe('fooDefaultContent');
        const barNode = fooNode.child('bar');
        expect(barNode.data).toBe('barDefaultContent');
      });
    });
    describe('when parent is not in store but child is in store', () => {
      it('should return parent from default content and child data from the store', () => {
        const { actions, getters } = createMockStore({
          ...defaultStoreData,
          root$foo: undefined,
          root$foo$bar: 'barValue',
        });
        const defaultContentNode = new DefaultContentNode(actions, getters, 'root');
        const defaultContent = {
          foo: 'fooDefaultContent',
          foo$bar: 'barDefaultContent',
        };
        const contentfulNode = ContentfulNode.create(defaultContentNode, defaultContent);
        const fooNode = contentfulNode.child('foo');
        expect(fooNode.data).toBe('fooDefaultContent');
        const barNode = fooNode.child('bar');
        expect(barNode.data).toBe('barValue');
      });
    });
  });
});
