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

import React, { FC } from 'react';
import { mount } from 'enzyme';
import PageContextProvider from '../src/PageContextProvider';

const Foo: React.FC<any> = props => <span {...props}>Foo Content</span>;

describe('ContextMenuOptions', () => {
  it('handles "isActive" menu item option correctly.', () => {
    const getMenuOptions = () => [
      {
        name: 'itemActive',
        icon: 'icon',
        handler: () => undefined,
        isActive: () => true,
      },
    ];

    const wrapper = mount(
      <PageContextProvider getMenuOptions={getMenuOptions} name="provider">
        <Foo />
      </PageContextProvider>,
    );

    const menuOptions = wrapper.prop('getMenuOptions')();

    expect(menuOptions.length).toBe(1);
    expect(menuOptions[0].name).toBe('itemActive');
    expect(menuOptions[0].isActive()).toBe(true);
  });

  it('handles "isDisabled" menu item option correctly.', () => {
    const getMenuOptions = () => [
      {
        name: 'itemDisabled',
        icon: 'icon',
        handler: () => undefined,
        isDisabled: () => true,
      },
    ];

    const wrapper = mount(
      <PageContextProvider getMenuOptions={getMenuOptions} name="provider">
        <Foo />
      </PageContextProvider>,
    );

    const menuOptions = wrapper.prop('getMenuOptions')();

    expect(menuOptions.length).toBe(1);
    expect(menuOptions[0].name).toBe('itemDisabled');
    expect(menuOptions[0].isDisabled()).toBe(true);
  });

  it('has "isDisabled" and "isActive" disabled by default.', () => {
    const getMenuOptions = () => [
      {
        name: 'itemDefault',
        icon: 'icon',
        handler: () => undefined,
      },
    ];

    const wrapper = mount(
      <PageContextProvider getMenuOptions={getMenuOptions} name="provider">
        <Foo />
      </PageContextProvider>,
    );

    const menuOptions = wrapper.prop('getMenuOptions')();

    expect(menuOptions.length).toBe(1);
    expect(menuOptions[0].name).toBe('itemDefault');
    expect(menuOptions[0].isActive).toBeFalsy();
    expect(menuOptions[0].isDisabled).toBeFalsy();
  });
});
