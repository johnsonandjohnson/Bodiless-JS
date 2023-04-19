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

import { StoreItem, DEFAULT_REQUEST_DELAY } from '../src/Store/StoreItem';
import { BodilessMobxStore } from '../src/Store/BodilessMobxStore.bl-edit';
import { BodilessBackendClient } from '../src/BackendClient/BodilessBackendClient';
import { ItemStateEvent } from '../src/Store/types';

class RequestsMock {
  requests: any[] = [];

  public add({ resolve, reject }: any) {
    this.requests.push({ resolve, reject });
  }

  public reject(requestId: number) {
    this.requests[requestId].reject(false);
  }

  public resolve(requestId: number) {
    this.requests[requestId].resolve(true);
  }

  public clear() {
    this.requests = [];
  }
}

const requestsMock = new RequestsMock();

const savePathMock = jest.fn().mockImplementation(
  () => new Promise((resolve, reject) => {
    requestsMock.add({ resolve, reject });
  }),
);
const deletePathMock = jest.fn().mockImplementation(
  () => new Promise((resolve, reject) => {
    requestsMock.add({ resolve, reject });
  }),
);
jest.mock('../src/BackendClient/BodilessBackendClient', () => ({
  BodilessBackendClient: () => ({
    savePath: savePathMock,
    deletePath: deletePathMock,
  }),
}));

jest.mock('../src/Store/BodilessMobxStore.bl-edit', () => ({
  BodilessMobxStore: () => ({
    client: new BodilessBackendClient(),
  }),
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

const defaultKey = 'Page$foo$bar';

const defaultData = {
  foo: 'bar',
};

const createItem = (key?: string, data?: any) => {
  const key$ = key || defaultKey;
  const data$ = data || defaultData;
  return new StoreItem(new TestStore(dataSource), key$, data$);
};

const flushPromises = () => new Promise(setImmediate);
const flushItems = () => jest.runAllTimers();
const processResponse = flushPromises;

describe('StoreItem', () => {
  beforeEach(() => {
    requestsMock.clear();
    jest.useFakeTimers();
    jest.clearAllTimers();
    jest.clearAllMocks();
  });
  describe('when item is created', () => {
    it('should send the item data to the server', async () => {
      createItem();
      jest.runAllTimers();
      await requestsMock.resolve(0);
      expect(savePathMock.mock.calls.length).toBe(1);
      expect(savePathMock.mock.calls[0][0]).toBe('pages/foo$bar');
      expect(savePathMock.mock.calls[0][1]).toStrictEqual(defaultData);
    });
  });
  describe('when item request fails', () => {
    it('should retry sending the request until it succeeds', async () => {
      createItem();
      await flushItems();
      expect(savePathMock.mock.calls.length).toBe(1);
      // reject the first request
      await requestsMock.reject(0);
      await processResponse();
      await flushItems();
      // reject the second request
      await requestsMock.reject(1);
      await processResponse();
      await flushItems();
      // resolve the third request
      await requestsMock.resolve(2);
      await processResponse();
      expect(savePathMock.mock.calls.length).toBe(3);
      expect(savePathMock.mock.calls[2][0]).toBe('pages/foo$bar');
      expect(savePathMock.mock.calls[2][1]).toStrictEqual(defaultData);
      // flush again and test nothing is flushed
      await flushItems();
      expect(savePathMock.mock.calls.length).toBe(3);
    });
    it('should incrementally increase delay between subsequent failed requests', async () => {
      const delay = DEFAULT_REQUEST_DELAY;
      createItem();
      await flushItems();
      expect(savePathMock.mock.calls.length).toBe(1);
      // reject the first request
      await requestsMock.reject(0);
      await processResponse();
      // increment delay and use jest.advanceTimersByTime instead of flushItems
      await jest.advanceTimersByTime(delay * 2);
      expect(savePathMock.mock.calls.length).toBe(2);
      await requestsMock.reject(1);
      await processResponse();
      await jest.advanceTimersByTime(delay);
      // test the request has not flushed yet since delay was increased
      expect(savePathMock.mock.calls.length).toBe(2);
      await jest.advanceTimersByTime(delay * 3);
      expect(savePathMock.mock.calls.length).toBe(3);
    });
    it('should reset increased delay after a request succeeds', async () => {
      const delay = DEFAULT_REQUEST_DELAY;
      const item = createItem();
      await flushItems();
      expect(savePathMock.mock.calls.length).toBe(1);
      await requestsMock.reject(0);
      await processResponse();
      await jest.advanceTimersByTime(delay * 2);
      expect(savePathMock.mock.calls.length).toBe(2);
      await requestsMock.resolve(1);
      await processResponse();
      item.update({
        foo1: 'bar1',
      });
      await jest.advanceTimersByTime(delay);
      expect(savePathMock.mock.calls.length).toBe(3);
    });
  });
  describe('when a new request to modify the same node is made, and the original request has no succeeded', () => {
    it('should abandon original request and retry the new request until successful', async () => {
      const item = createItem();
      await flushItems();
      const data1 = {
        foo1: 'bar1',
      };
      item.update(data1);
      // reject the first request
      await requestsMock.reject(0);
      await processResponse();
      await flushItems();
      // resolve the second request
      await requestsMock.resolve(1);
      await processResponse();
      expect(savePathMock.mock.calls.length).toBe(2);
      expect(savePathMock.mock.calls[1][0]).toBe('pages/foo$bar');
      expect(savePathMock.mock.calls[1][1]).toStrictEqual(data1);
    });
  });
  describe('when a request to delete the same node is made, and the original request has no succeeded', () => {
    it('should abandon original request and retry the delete request until successful', async () => {
      const item = createItem();
      await flushItems();
      expect(savePathMock.mock.calls.length).toBe(1);
      expect(deletePathMock.mock.calls.length).toBe(0);
      item.delete();
      // reject the first request
      await requestsMock.reject(0);
      await processResponse();
      await flushItems();
      // reject the second request
      await requestsMock.reject(1);
      await processResponse();
      expect(savePathMock.mock.calls.length).toBe(1);
      expect(deletePathMock.mock.calls.length).toBe(1);
      await flushItems();
      // reject the second request
      await requestsMock.resolve(2);
      await processResponse();
      expect(savePathMock.mock.calls.length).toBe(1);
      expect(deletePathMock.mock.calls.length).toBe(2);
      // flush again and test nothing is flushed
      await flushItems();
      expect(savePathMock.mock.calls.length).toBe(1);
      expect(deletePathMock.mock.calls.length).toBe(2);
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
      await requestsMock.resolve(0);
      jest.runAllTimers();
      // fulfill the second request
      await requestsMock.resolve(1);
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
      await requestsMock.resolve(0);
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
      await requestsMock.resolve(0);
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
      await requestsMock.resolve(0);
      expect(item.isPending()).toBe(false);
    });
  });
  describe('delete', () => {
    describe('when item is deleted from browser', () => {
      it('should invoke backendClient delete', () => {
        const item = new StoreItem(new TestStore(dataSource), 'Page$foo$bar');
        item.delete();
        jest.runAllTimers();
        expect(deletePathMock.mock.calls[0][0]).toBe('pages/foo$bar');
      });
    });
  });
  describe('saveDisabled', () => {
    let defaultSaveEnabled = '0';
    beforeEach(() => {
      defaultSaveEnabled = process.env.BODILESS_BACKEND_SAVE_ENABLED || '1';
      process.env.BODILESS_BACKEND_SAVE_ENABLED = '0';
    });
    afterEach(() => {
      process.env.BODILESS_BACKEND_SAVE_ENABLED = defaultSaveEnabled;
    });
    describe('when item updated by browser', () => {
      it('should be sent to the server', async () => {
        // eslint-disable-next-line global-require
        const StoreItem$ = require('../src/Store/StoreItem').StoreItem;
        // eslint-disable-next-line no-new
        new StoreItem$(new TestStore(dataSource), defaultKey, defaultData);
        jest.runAllTimers();
        expect(savePathMock.mock.calls.length).toBe(0);
      });
    });
    describe('when item deleted by browser', () => {
      it('should not be sent to the server', async () => {
        // eslint-disable-next-line global-require
        const StoreItem$ = require('../src/Store/StoreItem').StoreItem;
        // eslint-disable-next-line max-len
        const item = new StoreItem$(new TestStore(dataSource), defaultKey, defaultData);
        item.delete();
        jest.runAllTimers();
        expect(deletePathMock.mock.calls.length).toBe(0);
      });
    });
  });
});
