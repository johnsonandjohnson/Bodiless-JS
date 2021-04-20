/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { mount, render } from 'enzyme';
import { flow } from 'lodash';
import { withDesign, replaceWith } from '@bodiless/fclasses';
import { useNode } from '@bodiless/core';
import List, { useListContext } from '../src/List/List';
import { withMockNode } from './helpers/MockContentNode';

describe('List', () => {
  const UNKNOWN = 'UNKNOWN';
  const ListContextPrinter = () => {
    const {
      items = [UNKNOWN],
      currentItem = UNKNOWN,
      addItem,
      deleteItem,
    } = useListContext();
    const { node } = useNode();
    return (
      <span
        data-item={currentItem}
        data-items={items.join(',')}
        data-node-path={node.path.join('$')}
      >
        {addItem && <button data-add-item onClick={addItem as () => undefined} />}
        {deleteItem && <button data-delete-item onClick={deleteItem as () => undefined} />}
      </span>
    );
  };
  const TestList = flow(
    withMockNode({ items: ['data-a', 'data-b'] }),
    withDesign({
      Title: replaceWith(ListContextPrinter),
    }),
  )(List);

  const TestListWithOneElement = flow(
    withMockNode({ items: ['data-a'] }),
    withDesign({
      Title: replaceWith(ListContextPrinter),
    }),
  )(List);

  describe('Prepend/append items', () => {
    it('adds the specified static items', () => {
      const wrapper = render(<TestList prependItems={['prepend']} appendItems={['append']} />);
      expect(wrapper.find('ul>li:first-child>span').attr('data-item')).toBe('prepend');
      expect(wrapper.find('ul>li:first-child>span').attr('data-node-path')).toBe('prepend');
      expect(wrapper.find('ul>li:last-child>span').attr('data-item')).toBe('append');
      expect(wrapper.find('ul>li:last-child>span').attr('data-node-path')).toBe('append');
      expect(wrapper.find('ul>li:first-child>span').attr('data-items')).toBe('prepend,data-a,data-b,append');
    });

    it('Does not provide data handlers for the static items (except last prepend)', () => {
      const wrapper = render(<TestList prependItems={['prepend', 'prepend-2']} appendItems={['append']} />);
      expect(wrapper.find('span[data-item="prepend"] button')).toHaveLength(0);
      expect(wrapper.find('span[data-item="prepend-2"] button[data-add-item="true"]')).toHaveLength(1);
      expect(wrapper.find('span[data-item="prepend-2"] button[data-delete-item="true"]')).toHaveLength(0);
      expect(wrapper.find('span[data-item="data-a"] button')).toHaveLength(2);
      expect(wrapper.find('span[data-item="append"] button')).toHaveLength(0);
    });

    it('Allows deleting last item when there are prepended items', () => {
      const wrapper = render(<TestListWithOneElement prependItems={['prepend']} />);
      expect(wrapper.find('span[data-item="data-a"] button[data-delete-item="true"]')).toHaveLength(1);
    });

    it('Allows deleting last item when there are appended items', () => {
      const wrapper = render(<TestListWithOneElement appendItems={['append']} />);
      expect(wrapper.find('span[data-item="data-a"] button[data-delete-item="true"]')).toHaveLength(1);
    });

    it('Invokes unwrap handler when deleting item even with prepend', () => {
      const unwrap = jest.fn();
      const wrapper = mount(<TestListWithOneElement unwrap={unwrap} prependItems={['prepend']} />);
      const deleteButton = wrapper.find('span[data-item="data-a"] button[data-delete-item=true]');
      expect(deleteButton.length).toBe(1);
      deleteButton.simulate('click');
      const newItems = TestListWithOneElement.node.setData.mock.calls[0][0].items;
      expect(newItems).toEqual([]);
      expect(unwrap).toBeCalled();
    });
  });

  describe('List context', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('Passes the correct item ids', () => {
      const wrapper = render(<div><TestList /></div>);
      expect(wrapper.find('ul>li:first-child>span').attr('data-item')).toBe('data-a');
      expect(wrapper.find('ul>li:first-child>span').attr('data-node-path')).toBe('data-a');
      expect(wrapper.find('ul>li:first-child>span').attr('data-items')).toBe('data-a,data-b');
      expect(wrapper.find('ul>li:last-child>span').attr('data-item')).toBe('data-b');
      expect(wrapper.find('ul>li:last-child>span').attr('data-node-path')).toBe('data-b');
      expect(wrapper.find('ul>li:last-child>span').attr('data-items')).toBe('data-a,data-b');
    });

    it('Passes add handlers correctly', () => {
      const wrapper = mount(<TestList />);
      const addButton = wrapper.find('span[data-item="data-a"] button[data-add-item=true]');
      expect(addButton.length).toBe(1);
      addButton.simulate('click');
      const newItems = TestList.node.setData.mock.calls[0][0].items;
      expect(newItems).toHaveLength(3);
      expect(newItems[0]).toBe('data-a');
      expect(newItems[2]).toBe('data-b');
      const addButton2 = wrapper.find('span[data-item="data-b"] button[data-add-item=true]');
      expect(addButton2.length).toBe(1);
      addButton2.simulate('click');
      const newItems2 = TestList.node.setData.mock.calls[1][0].items;
      expect(newItems2).toHaveLength(3);
      expect(newItems2[0]).toBe('data-a');
      expect(newItems2[1]).toBe('data-b');
    });

    it('Passes delete handlers correctly', () => {
      const wrapper = mount(<TestList />);
      let deleteButton = wrapper.find('span[data-item="data-a"] button[data-delete-item=true]');
      expect(deleteButton.length).toBe(1);
      deleteButton.simulate('click');
      let newItems = TestList.node.setData.mock.calls[0][0].items;
      expect(newItems).toEqual(['data-b']);
      deleteButton = wrapper.find('span[data-item="data-b"] button[data-delete-item=true]');
      expect(deleteButton.length).toBe(1);
      deleteButton.simulate('click');
      newItems = TestList.node.setData.mock.calls[1][0].items;
      expect(newItems).toEqual(['data-a']);
    });

    it('Does not pass delete handler when list would be empty', () => {
      const wrapper = mount(<TestListWithOneElement />);
      const deleteButton = wrapper.find('span[data-item="data-a"] button[data-delete-item=true]');
      expect(deleteButton).toHaveLength(0);
    });

    it('Correctly invokes an unwrap handler', () => {
      const unwrap = jest.fn();
      const wrapper = mount(<TestListWithOneElement unwrap={unwrap} />);
      const deleteButton = wrapper.find('span[data-item="data-a"] button[data-delete-item=true]');
      expect(deleteButton.length).toBe(1);
      deleteButton.simulate('click');
      const newItems = TestListWithOneElement.node.setData.mock.calls[0][0].items;
      expect(newItems).toEqual([]);
      expect(unwrap).toBeCalled();
    });
  });
});
