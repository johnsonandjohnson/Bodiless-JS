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

describe('GatsbyMobxStoreItem', () => {
  beforeEach(() => {
    pendingRequests = [];
    jest.useFakeTimers();
    jest.clearAllTimers();
    jest.clearAllMocks();
  });
  describe('when item is created', () => {
    it('should send the item data to the server', async () => {
      const key = 'Page$foo$bar';
      const data = {
        foo: 'bar',
      };
      // eslint-disable-next-line no-new
      new GatsbyMobxStoreItem(new GatsbyMobxStore(dataSource), key, data);
      jest.runAllTimers();
      // fulfill the request
      await pendingRequests[0].resolve(true);
      expect(savePathMock.mock.calls.length).toBe(1);
      expect(savePathMock.mock.calls[0][0]).toBe('pages/foo$bar');
      expect(savePathMock.mock.calls[0][1]).toStrictEqual(data);
    });
  });
  describe('when item is created and then updated by browser', () => {
    it('should not send the second request to the server until the first request is finished', async () => {
      const key = 'Page$foo$bar';
      const data = {
        foo: 'bar',
      };
      const item = new GatsbyMobxStoreItem(new GatsbyMobxStore(dataSource), key, data);
      jest.runAllTimers();
      const data1 = {
        foo1: 'bar1',
      };
      item.update(data1);
      jest.runAllTimers();
      expect(savePathMock.mock.calls.length).toBe(1);
      expect(savePathMock.mock.calls[0][0]).toBe('pages/foo$bar');
      expect(savePathMock.mock.calls[0][1]).toStrictEqual(data);
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
});
