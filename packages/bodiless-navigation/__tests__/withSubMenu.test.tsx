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

/* eslint-disable quote-props */
import React from 'react';
import { flow } from 'lodash';
import { withDesign, addProps } from '@bodiless/fclasses';
import { mount } from 'enzyme';

import {
  withListSubMenu, withMenuDesign, withColumnSubMenu, withToutSubMenu,
  withMenuTitleEditors, withDefaultMenuTitleEditors,
} from '../src';
import MenuBase, {
  withListSubmenuItems, withColumnsSubmenuItems, withToutsSubmenuItems, withMainMenuItems,
} from './TestMenu';

const withSubMenuDesign = (submenuType: string = 'List') => withMenuDesign(submenuType)(
  withDesign({
    Wrapper: addProps({ 'data-test-submenu': `${submenuType.toLowerCase()}-submenu` }),
    Title: addProps({ 'data-test-submenu': `${submenuType.toLowerCase()}-submenu-title` }),
    Item: addProps({ 'data-test-submenu': `${submenuType.toLowerCase()}-submenu-item` }),
  }),
);

describe('Bodiless Menu', () => {
  it('Creates a one level menu by default', () => {
    const menuItems = ['Item 1', 'Item 2', 'Item 3'];
    const DefaultMenu = flow(
      withMainMenuItems(...menuItems),
      withMenuDesign('Main')(withMenuTitleEditors()),
    )(MenuBase);

    const wrapper = mount(<DefaultMenu />);
    expect(wrapper.find('li[data-test="menu-item"]').length).toBe(3);

    const menuTitles = wrapper.find('a[data-test="menu-title"]');
    expect(menuTitles.length).toBe(menuItems.length);

    menuTitles.forEach((title, i) => expect(title.text()).toBe(menuItems[i]));
  });

  it('withListSubMenu may be used to add a List submenu', () => {
    const subMenuItems = ['List 1', 'List 2', 'List 3'];
    const MenuWithList = flow(
      withListSubMenu(withDefaultMenuTitleEditors),
      withListSubmenuItems(...subMenuItems),
      withSubMenuDesign('List'),
    )(MenuBase);

    const wrapper = mount(<MenuWithList />);
    expect(wrapper.find('ul[data-test-submenu="list-submenu"]').length).toBe(1);

    const subMenuTitles = wrapper.find('a[data-test-submenu="list-submenu-title"]');
    expect(subMenuTitles.length).toBe(subMenuItems.length);

    subMenuTitles.forEach((title, i) => expect(title.text()).toBe(subMenuItems[i]));
  });

  it('withColumnSubMenu may be used to add a Columns submenu', () => {
    const subMenuItems = ['Column Submenu 1', 'Column Submenu 2', 'Column Submenu 3'];
    const MenuWithColumns = flow(
      withColumnSubMenu(withDefaultMenuTitleEditors),
      withColumnsSubmenuItems(...subMenuItems),
      withSubMenuDesign('Columns'),
      withMenuDesign('Columns', 2)(
        withDesign({
          Wrapper: addProps({ 'data-test-submenu': 'sub-column-submenu' }),
          Title: addProps({ 'data-test-submenu': 'sub-column-submenu-title' }),
          Item: addProps({ 'data-test-submenu': 'sub-column-submenu-item' }),
        }),
      ),
    )(MenuBase);

    const wrapper = mount(<MenuWithColumns />);
    expect(wrapper.find('ul[data-test-submenu="columns-submenu"]').length).toBe(1);
    expect(wrapper.find('ul[data-test-submenu="sub-column-submenu"]').length).toBe(1);

    expect(wrapper.find('a[data-test-submenu="columns-submenu-title"]').length).toBe(1);

    const columnSubMenuTitles = wrapper.find('a[data-test-submenu="sub-column-submenu-title"]');
    expect(columnSubMenuTitles.length).toBe(subMenuItems.length);

    columnSubMenuTitles.forEach((title, i) => expect(title.text()).toBe(subMenuItems[i]));
  });

  it('withToutSubMenu may be used to add a Columns submenu', () => {
    const subMenuItems = ['Tout 1', 'Tout 2', 'Tout 3'];
    const MenuWithTouts = flow(
      withToutSubMenu(withDefaultMenuTitleEditors),
      withToutsSubmenuItems(...subMenuItems),
      withSubMenuDesign('Touts'),
    )(MenuBase);

    const wrapper = mount(<MenuWithTouts />);
    expect(wrapper.find('ul[data-test-submenu="touts-submenu"]').length).toBe(1);

    const subMenuTouts = wrapper.find('div[data-test-submenu="touts-submenu-title"]');
    expect(subMenuTouts.length).toBe(subMenuItems.length);
  });
});
