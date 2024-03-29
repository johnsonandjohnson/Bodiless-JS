/**
 * Copyright © 2020 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 dist* Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BodilessMobxStore } from '../src/Store/BodilessMobxStore.bl-edit';
import { StoreItem } from '../src/Store/StoreItem.bl-edit';

const deleteItemMock = jest.fn();

jest.mock('../src/Store/StoreItem.bl-edit', () => (
  jest.fn().mockImplementation(() => ({
    delete: deleteItemMock,
  }))
));

jest.mock('../src/Store/StoreItem.bl-edit', () => ({
  StoreItem: jest.fn().mockImplementation(() => ({
    delete: deleteItemMock,
  })),
}));

class TestStore extends BodilessMobxStore<Map<string, any>> {
  // eslint-disable-next-line class-methods-use-this
  parseData(d: Map<string, any>) {
    return d;
  }
}

const dataSource = {
  slug: 'slug',
};

describe('BodilessMobxStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('getChildrenNodes', () => {
    jest.doMock('../src/Store/StoreItem.bl-edit');
    describe('when node has children', () => {
      it('should return a collection of all children keys', () => {
        const store = new TestStore(dataSource);
        store.setNode(['foo'], 'foo');
        store.setNode(['foo', 'bar'], 'bar');
        store.setNode(['foo', 'bar', 'baz'], 'baz');
        const children = store.getChildrenNodes(['foo']);
        expect(children.length).toBe(2);
      });
    });
    describe('when node does not have children', () => {
      it('should return empty array', () => {
        const store = new TestStore(dataSource);
        store.setNode(['foo'], 'foo');
        store.setNode(['foo', 'bar'], 'bar');
        store.setNode(['foo', 'bar', 'baz'], 'baz');
        const children = store.getChildrenNodes(['baz']);
        expect(children.length).toBe(0);
      });
    });
  });
  describe('deleteNode', () => {
    describe('when node has children', () => {
      it('should invoke deletion of item and all its children', () => {
        const store = new TestStore(dataSource);
        store.setNode(['foo'], 'foo');
        store.setNode(['foo', 'bar'], 'bar');
        store.setNode(['foo', 'bar', 'baz'], 'baz');
        store.deleteNode(['foo']);
        const gatsbyMobxStoreItem = StoreItem as jest.Mock<any, any>;
        expect(gatsbyMobxStoreItem.mock.calls[0][1]).toBe('foo');
        expect(gatsbyMobxStoreItem.mock.calls[1][1]).toBe('foo$bar');
        expect(gatsbyMobxStoreItem.mock.calls[2][1]).toBe('foo$bar$baz');
        expect(deleteItemMock.mock.calls.length).toBe(3);
      });
    });
    describe('when node does not have children', () => {
      it('should not invoke any deletions', () => {
        const store = new TestStore(dataSource);
        store.setNode(['foo'], 'foo');
        store.setNode(['foo', 'bar'], 'bar');
        store.setNode(['foo', 'bar', 'baz'], 'baz');
        store.deleteNode(['baz']);
        expect(deleteItemMock.mock.calls.length).toBe(0);
      });
    });
  });
});
