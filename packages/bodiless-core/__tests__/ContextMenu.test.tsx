import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TMenuOption, ContextMenuUI } from '../src/Types/ContextMenuTypes';
import ContextMenu from '../src/components/ContextMenu';

jest.mock('../src/components/ContextMenuItem', () => {
  const MockContextMenuItem = () => <></>;
  return MockContextMenuItem;
});

describe('ContextMenu', () => {
  const findByName = (wrapper: ShallowWrapper, name: string) => wrapper.findWhere(
    n => n.prop('name') === name,
  );
  it('Renders the correct component for an option', () => {
    const CustomComponent = () => <></>;
    const ContextMenuGroup = () => <></>;
    const ui: ContextMenuUI = { ContextMenuGroup };
    const options: TMenuOption[] = [
      { name: 'custom', Component: CustomComponent },
      { name: 'default' },
      { name: 'group', Component: 'group' },
      { name: 'item', Component: 'item' },
    ];

    const wrapper = shallow(<ContextMenu ui={ui} options={options} />);
    expect(findByName(wrapper, 'item').name()).toBe('MockContextMenuItem');
    expect(findByName(wrapper, 'default').name()).toBe('MockContextMenuItem');
    expect(findByName(wrapper, 'group').name()).toBe('ContextMenuGroup');
    expect(findByName(wrapper, 'custom').name()).toBe('CustomComponent');
  });
});
