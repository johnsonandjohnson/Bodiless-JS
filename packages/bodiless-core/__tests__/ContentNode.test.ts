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

import { DefaultContentNode } from '../src/ContentNode';

const mockStore = () => {
  const getNode = jest.fn();
  const setNode = jest.fn();
  const hasError = jest.fn();
  const getKeys = jest.fn(() => ['foo']);
  const getPagePath = jest.fn(() => '/');
  const getBaseResourcePath = jest.fn(() => '/');
  const deleteNode = jest.fn();
  const actions = { setNode, deleteNode };
  const getters = {
    getKeys, getNode, hasError, getPagePath, getBaseResourcePath,
  };
  return { actions, getters };
};

type D1 = {
  foo: string;
};

type D2 = {
  bar: string;
};

describe('ContentNode', () => {
  it('Correctly splits a compound path', () => {
    const { actions, getters } = mockStore();
    const node = new DefaultContentNode(actions, getters, 'foo$bar$baz');
    expect(node.path).toEqual(['foo', 'bar', 'baz']);
  });

  it('Invokes getters and setters correctly', () => {
    const keys = [Math.random().toString(), Math.random().toString()];
    const { actions, getters } = mockStore();
    const node = new DefaultContentNode<D1>(actions, getters, keys);

    const d = node.data;
    expect(getters.getNode.mock.calls.length).toBe(1);
    expect(getters.getNode.mock.calls[0].length).toBe(1);
    expect(getters.getNode.mock.calls[0][0]).toEqual(keys);
    expect(d).toBeUndefined();

    const e = {
      foo: 'bar',
    };

    node.setData(e);
    expect(actions.setNode.mock.calls.length).toBe(1);
    expect(actions.setNode.mock.calls[0].length).toBe(2);
    expect(actions.setNode.mock.calls[0][0]).toEqual(keys);
    expect(actions.setNode.mock.calls[0][1]).toEqual(e);

    const { keys: mockKeys } = node;
    expect(getters.getKeys.mock.calls.length).toBe(1);
    expect(getters.getKeys.mock.calls[0].length).toBe(0);
    expect(mockKeys.length).toBe(1);
    expect(mockKeys[0]).toBe('foo');
  });

  it('Spawns peers and children correctly', () => {
    const { actions, getters } = mockStore();
    const rootKey = Math.random().toString();
    const rootNode = new DefaultContentNode(actions, getters, rootKey);

    const data = {
      bar: Math.random().toString(),
    };

    const peerKey = Math.random().toString();
    const peerNode = rootNode.peer<D2>(peerKey);
    peerNode.setData(data);
    expect(actions.setNode.mock.calls[0][0]).toEqual([peerKey]);
    expect(actions.setNode.mock.calls[0][1]).toEqual(data);

    actions.setNode.mockReset();
    const childKey = Math.random().toString();
    const childNode = peerNode.child<D2>(childKey);
    childNode.setData(data);
    expect(actions.setNode.mock.calls[0][0]).toEqual([peerKey, childKey]);
    expect(actions.setNode.mock.calls[0][1]).toEqual(data);
  });
});
