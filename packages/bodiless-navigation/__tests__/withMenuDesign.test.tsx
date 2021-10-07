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

import React from 'react';
import { flow } from 'lodash';
import { mount } from 'enzyme';
import {
  withDesign, addProps, asToken,
} from '@bodiless/fclasses';
import {
  withListSubMenu, withMenuDesign, withColumnSubMenu, withCardsSubMenu,
  withMenuTitleEditors,
} from '../src';
import MenuBase, { withCompleteDataStructure } from './TestMenu';

/**
  * @example
  * ```js
  * withMenuDesign('Columns') -- Applies tokens to all levels of columns submenu.
  * withMenuDesign('Columns', 1) -- Applies tokens to only the first level of Columns submenu.
  * withMenuDesign('Columns', 2) -- Applies tokens to only the second level of Columns submenu.
  *
  * withMenuDesign('Main') -- Applies tokens to the Top menu.
  * withMenuDesign('Cards') -- Applies tokens to Cards submenu.
  * withMenuDesign('List') -- Applies tokens to List submenu.
  *
  * withMenuDesign() -- Applies tokens to the Top menu and all submenus.
  * withMenuDesign(undefined, 0) -- Applies tokens to the Top menu.
  * withMenuDesign(undefined, 1) -- Applies tokens to all submenus of level 1.
  * withMenuDesign(undefined, 2) -- Applies tokens to all submenus of level 2.
  * ```
*/
const TestMenu = flow(
  withListSubMenu(),
  withColumnSubMenu(),
  withCardsSubMenu(),
  withMenuDesign()(withMenuTitleEditors()),
  withCompleteDataStructure,
  // Just some IDs to find element
  withDesign({
    Wrapper: addProps({ id: 'main-wrapper' }),
    Item: withDesign({
      List: withDesign({
        Wrapper: addProps({ id: 'list-wrapper' }),
        Item: addProps({ id: 'list-item' }),
        Title: addProps({ id: 'list-title' }),
      }),
      Cards: withDesign({
        Wrapper: addProps({ id: 'cards-wrapper' }),
        Item: addProps({ id: 'cards-item' }),
        Title: addProps({ id: 'cards-title' }),
      }),
      Columns: withDesign({
        Wrapper: addProps({ id: 'columns-wrapper' }),
        Item: asToken(
          addProps({ id: 'columns-item' }),
          withDesign({
            SubList: withDesign({
              Wrapper: addProps({ id: 'sub-columns-wrapper' }),
              Item: addProps({ id: 'sub-columns-item' }),
              Title: addProps({ id: 'sub-columns-title' }),
            }),
          }),
        ),
        Title: addProps({ id: 'columns-title' }),
      }),
    }),
    Title: addProps({ id: 'main-title' }),
  }),
)(MenuBase);

const withDataAttr = (type: string) => withDesign({
  Wrapper: addProps({ 'data-test-submenu': type.toLowerCase() }),
  Title: addProps({ 'data-test-submenu': `${type.toLowerCase()}-title` }),
  Item: addProps({ 'data-test-submenu': `${type.toLowerCase()}-item` }),
});

const withPropsA = withDesign({
  Wrapper: addProps({ 'data-test-a': 'wrapper' }),
});

const withPropsB = withDesign({
  Wrapper: addProps({ 'data-test-b': 'wrapper' }),
});

const withPropsC = withDesign({
  Wrapper: addProps({ 'data-test-c': 'wrapper' }),
});

describe('withMenuDesign', () => {
  it('Applies token to all menu items at all depths if no params provided', () => {
    const Wrapper = flow(
      withMenuDesign()(withDataAttr('menu')),
    )(TestMenu);

    const wrapper = mount(<Wrapper />);

    expect(wrapper.find('ul[data-test-submenu="menu"]').length).toBe(5); // Menu, List, Cards, Columns(x2)
    expect(wrapper.find('a[data-test-submenu="menu-title"]').length).toBe(9); // 3 Top, 2 List, 2 Columns, 2 Sub Columns
    expect(wrapper.find('div[data-test-submenu="menu-title"]').length).toBe(2); // 2 cards
    expect(wrapper.find('li[data-test-submenu="menu-item"]').length).toBe(11); // 3 Top, 2 List, 2 cards, 2 Columns, 2 Sub Columns
  });

  it('Applies token to the top level menu', () => {
    const withMainKeyDesign = withDesign({
      Wrapper: addProps({ 'data-test-main': 'wrapper' }),
    });

    const withDepthKeyDesign = withDesign({
      Wrapper: addProps({ 'data-test-depth': 'wrapper' }),
    });

    const withWrongKeyDesign = withDesign({
      Wrapper: addProps({ 'data-test-wrong-key': 'wrapper' }),
    });

    const Wrapper = flow(
      withMenuDesign('Main')(withMainKeyDesign),
      withMenuDesign(undefined, 0)(withDepthKeyDesign),
      withMenuDesign('Main', 1)(withWrongKeyDesign),
    )(TestMenu);

    const wrapper = mount(<Wrapper />);

    expect(wrapper.find('ul#main-wrapper').prop('data-test-main')).toBe('wrapper');
    expect(wrapper.find('ul#list-wrapper').prop('data-test-main')).toBeUndefined();
    expect(wrapper.find('ul#cards-wrapper').prop('data-test-main')).toBeUndefined();
    expect(wrapper.find('ul#columns-wrapper').prop('data-test-main')).toBeUndefined();
    expect(wrapper.find('ul#main-wrapper').prop('data-test-depth')).toBe('wrapper');
    expect(wrapper.find('ul#main-wrapper').prop('data-test-wrong-key')).toBeUndefined();
  });

  it('Applies token to the list of submenu type', () => {
    const Wrapper = flow(
      withMenuDesign(['Main', 'List'])(withPropsA),
      withMenuDesign(['Main', 'Cards'])(withPropsB),
      withMenuDesign(['Cards', 'Columns'])(withPropsC),
    )(TestMenu);

    const wrapper = mount(<Wrapper />);

    expect(wrapper.find('ul#main-wrapper').prop('data-test-a')).toBe('wrapper');
    expect(wrapper.find('ul#main-wrapper').prop('data-test-b')).toBe('wrapper');
    expect(wrapper.find('ul#main-wrapper').prop('data-test-c')).toBeUndefined();

    expect(wrapper.find('ul#list-wrapper').prop('data-test-a')).toBe('wrapper');
    expect(wrapper.find('ul#list-wrapper').prop('data-test-b')).toBeUndefined();
    expect(wrapper.find('ul#list-wrapper').prop('data-test-c')).toBeUndefined();

    expect(wrapper.find('ul#cards-wrapper').prop('data-test-a')).toBeUndefined();
    expect(wrapper.find('ul#cards-wrapper').prop('data-test-b')).toBe('wrapper');
    expect(wrapper.find('ul#cards-wrapper').prop('data-test-c')).toBe('wrapper');

    expect(wrapper.find('ul#columns-wrapper').prop('data-test-a')).toBeUndefined();
    expect(wrapper.find('ul#columns-wrapper').prop('data-test-b')).toBeUndefined();
    expect(wrapper.find('ul#columns-wrapper').prop('data-test-c')).toBe('wrapper');

    expect(wrapper.find('ul#sub-columns-wrapper').prop('data-test-a')).toBeUndefined();
    expect(wrapper.find('ul#sub-columns-wrapper').prop('data-test-b')).toBeUndefined();
    expect(wrapper.find('ul#sub-columns-wrapper').prop('data-test-c')).toBe('wrapper');
  });

  it('Applies token to the submenus by submenu type', () => {
    const Wrapper = flow(
      withMenuDesign('List')(withDataAttr('List')),
      withMenuDesign('Cards')(withDataAttr('Cards')),
      withMenuDesign('Columns')(withDataAttr('Columns')),
    )(TestMenu);

    const wrapper = mount(<Wrapper />);

    expect(wrapper.find('ul[data-test-submenu="list"]').length).toBe(1);
    expect(wrapper.find('a[data-test-submenu="list-title"]').length).toBe(2);
    expect(wrapper.find('li[data-test-submenu="list-item"]').length).toBe(2);

    expect(wrapper.find('ul[data-test-submenu="cards"]').length).toBe(1);
    expect(wrapper.find('div[data-test-submenu="cards-title"]').length).toBe(2);
    expect(wrapper.find('li[data-test-submenu="cards-item"]').length).toBe(2);

    expect(wrapper.find('ul[data-test-submenu="columns"]').length).toBe(2); // with sub-column
    expect(wrapper.find('a[data-test-submenu="columns-title"]').length).toBe(4);
    expect(wrapper.find('li[data-test-submenu="columns-item"]').length).toBe(4);
  });

  it('Applies token to the specified depth only', () => {
    const Wrapper = flow(
      withMenuDesign(undefined, 0)(withPropsA),
      withMenuDesign(undefined, 1)(withPropsB),
      withMenuDesign(undefined, 2)(withPropsC),
    )(TestMenu);

    const wrapper = mount(<Wrapper />);

    expect(wrapper.find('ul#main-wrapper').prop('data-test-a')).toBe('wrapper');
    expect(wrapper.find('ul#main-wrapper').prop('data-test-b')).toBeUndefined();
    expect(wrapper.find('ul#main-wrapper').prop('data-test-c')).toBeUndefined();

    expect(wrapper.find('ul#list-wrapper').prop('data-test-a')).toBeUndefined();
    expect(wrapper.find('ul#list-wrapper').prop('data-test-b')).toBe('wrapper');
    expect(wrapper.find('ul#list-wrapper').prop('data-test-c')).toBeUndefined();

    expect(wrapper.find('ul#cards-wrapper').prop('data-test-a')).toBeUndefined();
    expect(wrapper.find('ul#cards-wrapper').prop('data-test-b')).toBe('wrapper');
    expect(wrapper.find('ul#cards-wrapper').prop('data-test-c')).toBeUndefined();

    expect(wrapper.find('ul#columns-wrapper').prop('data-test-a')).toBeUndefined();
    expect(wrapper.find('ul#columns-wrapper').prop('data-test-b')).toBe('wrapper');
    expect(wrapper.find('ul#columns-wrapper').prop('data-test-c')).toBeUndefined();

    expect(wrapper.find('ul#sub-columns-wrapper').prop('data-test-a')).toBeUndefined();
    expect(wrapper.find('ul#sub-columns-wrapper').prop('data-test-b')).toBeUndefined();
    expect(wrapper.find('ul#sub-columns-wrapper').prop('data-test-c')).toBe('wrapper');
  });

  it('Applies token to the specified depth and submenu type only', () => {
    const Wrapper = flow(
      withMenuDesign('List', 0)(withPropsA),
      withMenuDesign('List', 1)(withPropsB),
      withMenuDesign('List', 2)(withPropsC),
      withMenuDesign('Columns', [1, 2])(withPropsC),
    )(TestMenu);

    const wrapper = mount(<Wrapper />);

    expect(wrapper.find('ul#main-wrapper').prop('data-test-a')).toBeUndefined();
    expect(wrapper.find('ul#main-wrapper').prop('data-test-b')).toBeUndefined();
    expect(wrapper.find('ul#main-wrapper').prop('data-test-c')).toBeUndefined();

    expect(wrapper.find('ul#list-wrapper').prop('data-test-a')).toBeUndefined();
    expect(wrapper.find('ul#list-wrapper').prop('data-test-b')).toBe('wrapper');
    expect(wrapper.find('ul#list-wrapper').prop('data-test-c')).toBeUndefined();

    expect(wrapper.find('ul#cards-wrapper').prop('data-test-a')).toBeUndefined();
    expect(wrapper.find('ul#cards-wrapper').prop('data-test-b')).toBeUndefined();
    expect(wrapper.find('ul#cards-wrapper').prop('data-test-c')).toBeUndefined();

    expect(wrapper.find('ul#columns-wrapper').prop('data-test-a')).toBeUndefined();
    expect(wrapper.find('ul#columns-wrapper').prop('data-test-b')).toBeUndefined();
    expect(wrapper.find('ul#columns-wrapper').prop('data-test-c')).toBe('wrapper');

    expect(wrapper.find('ul#sub-columns-wrapper').prop('data-test-a')).toBeUndefined();
    expect(wrapper.find('ul#sub-columns-wrapper').prop('data-test-b')).toBeUndefined();
    expect(wrapper.find('ul#sub-columns-wrapper').prop('data-test-c')).toBe('wrapper');
  });

  it('Applies multiple token to the specified depth and submenu type', () => {
    const Wrapper = flow(
      withMenuDesign(['List', 'Cards'])(withPropsA, withPropsB, withPropsC),
    )(TestMenu);

    const wrapper = mount(<Wrapper />);

    expect(wrapper.find('ul#list-wrapper').prop('data-test-a')).toBe('wrapper');
    expect(wrapper.find('ul#list-wrapper').prop('data-test-b')).toBe('wrapper');
    expect(wrapper.find('ul#list-wrapper').prop('data-test-c')).toBe('wrapper');

    expect(wrapper.find('ul#cards-wrapper').prop('data-test-a')).toBe('wrapper');
    expect(wrapper.find('ul#cards-wrapper').prop('data-test-b')).toBe('wrapper');
    expect(wrapper.find('ul#cards-wrapper').prop('data-test-c')).toBe('wrapper');
  });
});
