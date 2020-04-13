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

import GatsbyMobxStore from '../src/dist/GatsbyMobxStore';
import { ItemStateEvent } from '../src/dist/types';

jest.mock('../src/dist/BackendClient', () => () => ({
  savePath: jest.fn().mockResolvedValue(true),
  deletePath: jest.fn().mockResolvedValue(true),
}));

const flushPromises = () => new Promise(setImmediate);

const generateData = (name: string, data: any) => ({
  Page: {
    edges: [
      {
        node: {
          name,
          content: JSON.stringify(data),
        },
      },
    ],
  },
});

const dataSource = {
  slug: 'slug',
};

describe('GatsbyMobxStore', () => {
  describe('when it receives data from backend', () => {
    it('accepts the data', () => {
      const store = new GatsbyMobxStore(dataSource);
      const data = generateData('foo', { text: 'bar' });
      store.updateData(data);
      const data$0 = generateData('foo', { text: 'bar2' });
      store.updateData(data$0);
      const node$0 = store.getNode(['Page', 'foo']);
      expect(node$0.text).toBe('bar2');
    });
  });
  describe('when node is deleted by browser', () => {
    it('should not be removed from store', () => {
      const store = new GatsbyMobxStore(dataSource);
      const keyPath = ['foo'];
      store.setNode(keyPath, 'bar', ItemStateEvent.UpdateFromBrowser);
      store.deleteNode(keyPath);
      const node = store.getNode(keyPath);
      expect(node).toBeDefined();
    });
    it('should return empty data', () => {
      const store = new GatsbyMobxStore(dataSource);
      const keyPath = ['foo'];
      store.setNode(keyPath, 'bar', ItemStateEvent.UpdateFromBrowser);
      store.deleteNode(keyPath);
      const node = store.getNode(keyPath);
      expect(node).toStrictEqual({});
    });
    it('should not be overwritten by data received from server for a period of time', () => {
      const store = new GatsbyMobxStore(dataSource);
      const keyPath = ['foo'];
      store.setNode(keyPath, 'bar', ItemStateEvent.UpdateFromBrowser);
      store.deleteNode(keyPath);
      store.setNode(keyPath, 'bar', ItemStateEvent.UpdateFromServer);
      const node = store.getNode(keyPath);
      expect(node).toStrictEqual({});
    });
    it('should be overwritten by data received from server after a period of time', async () => {
      jest.useFakeTimers();
      const store = new GatsbyMobxStore(dataSource);
      const keyPath = ['foo'];
      store.setNode(keyPath, 'bar', ItemStateEvent.UpdateFromBrowser);
      store.deleteNode(keyPath);
      // run timer to trigger delete request
      jest.runAllTimers();
      // flush promises to wait until delete is finished
      await flushPromises();
      // run timer to unlock the item
      jest.runAllTimers();
      store.setNode(keyPath, 'bar', ItemStateEvent.UpdateFromServer);
      const node = store.getNode(keyPath);
      expect(node).toBe('bar');
    });
    it('should be overwritten by data received from browser', () => {
      const store = new GatsbyMobxStore(dataSource);
      const keyPath = ['foo'];
      store.setNode(keyPath, 'bar', ItemStateEvent.UpdateFromBrowser);
      store.deleteNode(keyPath);
      store.setNode(keyPath, 'bar', ItemStateEvent.UpdateFromBrowser);
      const node = store.getNode(keyPath);
      expect(node).toStrictEqual('bar');
    });
  });
});
