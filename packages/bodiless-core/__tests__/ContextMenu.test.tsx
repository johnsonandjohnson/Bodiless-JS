/**
 * Copyright © 2021 Johnson & Johnson
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
