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

import GatsbyMobxStoreItem from '../src/dist/GatsbyMobxStoreItem';
import GatsbyMobxStore from '../src/dist/GatsbyMobxStore';
import BackendClient from '../src/dist/BackendClient';
import { ItemStateEvent } from '../src/dist/types';

let pendingRequests: any[] = [];
const savePathMock = jest.fn().mockImplementation(
  () => new Promise((resolve, reject) => {
    pendingRequests.push({ resolve, reject });
  }),
);
jest.mock('../src/dist/BackendClient', () => () => ({
  savePath: savePathMock,
}));
jest.mock('../src/dist/GatsbyMobxStore', () => () => ({
  client: new BackendClient(),
}));

const dataSource = {
  slug: 'slug',
};

const defaultData = {
  foo: 'bar',
};

const createItem = (key?: string, data?: any) => {
  const key$ = key || 'Page$foo$bar';
  const data$ = data || defaultData;
  return new GatsbyMobxStoreItem(new GatsbyMobxStore(dataSource), key$, data$);
};

describe('GatsbyMobxStoreItem', () => {
  beforeEach(() => {
    pendingRequests = [];
    jest.useFakeTimers();
    jest.clearAllTimers();
    jest.clearAllMocks();
  });
  describe('when item is created', () => {
    it('should send the item data to the server', async () => {
      createItem();
      jest.runAllTimers();
      // fulfill the request
      await pendingRequests[0].resolve(true);
      expect(savePathMock.mock.calls.length).toBe(1);
      expect(savePathMock.mock.calls[0][0]).toBe('pages/foo$bar');
      expect(savePathMock.mock.calls[0][1]).toStrictEqual(defaultData);
    });
  });
  describe('when item is created and then updated by browser', () => {
    it('should not send the second request to the server until the first request is finished', async () => {
      const item = createItem();
      jest.runAllTimers();
      const data1 = {
        foo1: 'bar1',
      };
      item.update(data1);
      jest.runAllTimers();
      expect(savePathMock.mock.calls.length).toBe(1);
      expect(savePathMock.mock.calls[0][0]).toBe('pages/foo$bar');
      expect(savePathMock.mock.calls[0][1]).toStrictEqual(defaultData);
      // fulfill the first request
      await pendingRequests[0].resolve(true);
      jest.runAllTimers();
      // fulfill the second request
      await pendingRequests[1].resolve(true);
      expect(savePathMock.mock.calls.length).toBe(2);
      expect(savePathMock.mock.calls[1][0]).toBe('pages/foo$bar');
      expect(savePathMock.mock.calls[1][1]).toStrictEqual(data1);
    });
  });
  describe('when item is updated by browser', () => {
    it('should be locked for a period of time and reject updates from server', async () => {
      const item = createItem();
      jest.runAllTimers();
      // fulfill the request
      await pendingRequests[0].resolve(true);
      const data1 = {
        foo: 'bar1',
      };
      item.update(data1, ItemStateEvent.UpdateFromServer);
      expect(item.data).toStrictEqual(defaultData);
    });
    it('should be unlocked after period of time and accept updates from server', async () => {
      const item = createItem();
      jest.runAllTimers();
      // fulfill the request
      await pendingRequests[0].resolve(true);
      jest.runAllTimers();
      const data1 = {
        foo: 'bar1',
      };
      item.update(data1, ItemStateEvent.UpdateFromServer);
      expect(item.data).toStrictEqual(data1);
    });
    it('should be pending before it is flushed', () => {
      const item = createItem();
      expect(item.isPending()).toBe(true);
    });
    it('should not be pending after it is flushed', async () => {
      const item = createItem();
      jest.runAllTimers();
      // fulfill the request
      await pendingRequests[0].resolve(true);
      expect(item.isPending()).toBe(false);
    });
  });
});
