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

const { useNode } = require('@bodiless/core');
const { useItemHandlers, useFlowContainerDataHandlers } = require('../../src/FlowContainer/model');

jest.mock('@bodiless/core');

const setMockNode = (items?: any) => {
  const defaultItems = [
    {
      type: 'Foo',
      uuid: 'foo',
      wrapperProps: {},
    },
    {
      type: 'Bar',
      uuid: 'bar',
      wrapperProps: {},
    },
  ];
  const data = { items: items || defaultItems };
  const path = 'foo';
  // Update the closure on setData.
  const setData = jest.fn(newData => { data.items = newData.items; });
  const node = {
    path, data, setData, delete: jest.fn(),
  };
  useNode.mockReturnValue({ node });
  return node;
};

describe('useItemHandlers', () => {
  it('provides a getter which retrieves the items from the current node', () => {
    const originalItems = setMockNode().data.items;
    const { getItems } = useItemHandlers();
    const items = getItems();
    expect(items.length).toBe(originalItems.length);
    expect(items[0]).toEqual(originalItems[0]);
    expect(items[1]).toEqual(originalItems[1]);
  });
  it('provides a setter which sets the items for the current node', () => {
    const node = setMockNode();
    const { setItems } = useItemHandlers();
    node.setData.mockClear();
    const newItems = [
      {
        type: 'Foo',
        uuid: 'foo',
        wrapperProps: {},
      },
      {
        type: 'Bar',
        uuid: 'bar',
        wrapperProps: {},
      },
    ];
    setItems(newItems);
    expect(node.setData).toHaveBeenCalledTimes(1);
    expect(node.setData.mock.calls[0][0]).toEqual({
      items: newItems,
    });
  });
});

describe('useFlowContainerDataHandlers', () => {
  describe('insertFlowContainerItem', () => {
    it('inserts an item after the current item', () => {
      const node = setMockNode();
      const { items } = node.data;
      const { insertFlowContainerItem } = useFlowContainerDataHandlers();
      insertFlowContainerItem('New', node.data.items[0]);
      expect(node.setData).toHaveBeenCalledTimes(1);
      const testItems = node.setData.mock.calls[0][0].items;
      expect(testItems.length).toBe(3);
      expect(testItems[1].type).toBe('New');
      expect(testItems[0]).toEqual(items[0]);
      expect(testItems[2]).toEqual(items[1]);
    });
    it('inserts an item to an empty flow container', () => {
      const node = setMockNode([]);
      const { insertFlowContainerItem } = useFlowContainerDataHandlers();
      insertFlowContainerItem('New');
      expect(node.setData).toHaveBeenCalledTimes(1);
      const testItems = node.setData.mock.calls[0][0].items;
      expect(testItems.length).toBe(1);
      expect(testItems[0].type).toBe('New');
    });
    it('inserts an item at the end if no current item', () => {
      const node = setMockNode();
      const { items } = node.data;
      const { insertFlowContainerItem } = useFlowContainerDataHandlers();
      insertFlowContainerItem('New');
      expect(node.setData).toHaveBeenCalledTimes(1);
      const testItems = node.setData.mock.calls[0][0].items;
      expect(testItems.length).toBe(3);
      expect(testItems[2].type).toBe('New');
      expect(testItems[0]).toEqual(items[0]);
      expect(testItems[1]).toEqual(items[1]);
    });
  });
  describe('deletFlowContainerItem', () => {
    it('Deletes an item correctly from the beginning', () => {
      const node = setMockNode();
      const { items } = node.data;
      const { deleteFlowContainerItem } = useFlowContainerDataHandlers();
      const currentItem = deleteFlowContainerItem(node.data.items[0].uuid);
      expect(node.setData).toHaveBeenCalledTimes(1);
      const testItems = node.setData.mock.calls[0][0].items;
      expect(testItems.length).toBe(1);
      expect(testItems[0]).toEqual(items[1]);
      expect(currentItem).toEqual(items[1]);
    });
    it('Deletes an item correctly from the end', () => {
      const node = setMockNode();
      const { items } = node.data;
      const { deleteFlowContainerItem } = useFlowContainerDataHandlers();
      const currentItem = deleteFlowContainerItem(node.data.items[1].uuid);
      expect(node.setData).toHaveBeenCalledTimes(1);
      const testItems = node.setData.mock.calls[0][0].items;
      expect(testItems.length).toBe(1);
      expect(testItems[0]).toEqual(items[0]);
      expect(currentItem).toEqual(items[0]);
    });
    it('Deletes the last item correctly', () => {
      const node = setMockNode([{ type: 'Foo', uuid: 'foo', wrapperProps: {} }]);
      const { deleteFlowContainerItem } = useFlowContainerDataHandlers();
      const currentItem = deleteFlowContainerItem(node.data.items[0].uuid);
      expect(node.setData).toHaveBeenCalledTimes(1);
      const testItems = node.setData.mock.calls[0][0].items;
      expect(testItems.length).toBe(0);
      expect(currentItem).toBeUndefined();
    });
    it('Does not delete an item which doesnt exist', () => {
      const node = setMockNode();
      const { deleteFlowContainerItem } = useFlowContainerDataHandlers();
      const currentItem = deleteFlowContainerItem('blap');
      expect(node.setData).not.toHaveBeenCalled();
      expect(currentItem).toBeUndefined();
    });
  });
  describe('updateFlowContaineritem', () => {
    it('updates an item by uuid', () => {
      const node = setMockNode();
      const { items } = node.data;
      const newItem = {
        uuid: items[0].uuid,
        type: 'Baz',
        wrapperProps: { bing: 'bat' },
      };
      const { updateFlowContainerItem } = useFlowContainerDataHandlers();
      updateFlowContainerItem(newItem);
      expect(node.setData).toHaveBeenCalledTimes(1);
      const testItems = node.setData.mock.calls[0][0].items;
      expect(testItems.length).toBe(2);
      expect(testItems[0]).toEqual(newItem);
    });
    it('does not alter the items if the specified item does not exist', () => {
      const node = setMockNode();
      const newItem = {
        uuid: 'bizzle',
        type: 'Baz',
        wrapperProps: { bing: 'bat' },
      };
      const { updateFlowContainerItem } = useFlowContainerDataHandlers();
      updateFlowContainerItem(newItem);
      expect(node.setData).not.toHaveBeenCalled();
    });
  });
});
