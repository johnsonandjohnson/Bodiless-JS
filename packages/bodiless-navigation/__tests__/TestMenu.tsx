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
import { flow } from 'lodash';
import { withDefaultContent } from '@bodiless/core';
import { withDesign, addProps } from '@bodiless/fclasses';
import { asBodilessMenu } from '../src';

const withMainMenuItems = (...items: string[]) => {
  const menuItems = items.map((item, i) => ({ title: item, nodeKey: i === 0 ? 'default' : item.replace(' ', '_').toLowerCase() }));
  const mappedItems = menuItems.reduce((acc, item) => ({
    ...acc,
    [`testMenu$${item.nodeKey}$title$text`]: { text: item.title },
  }), {
    testMenu: { items: [...menuItems.map(item => item.nodeKey)] },
  });

  return withDefaultContent(mappedItems);
};

const withSubmenuItems = (submenuType: string = 'List') => (...items: string[]) => {
  const menuItems = items.map((item, i) => ({ title: item, nodeKey: i === 0 ? 'default' : item.replace(' ', '_').toLowerCase() }));
  const mappedItems = menuItems.reduce((acc, item) => ({
    ...acc,
    [`testMenu$default$sublist$${item.nodeKey}$title$text`]: { text: item.title },
  }), {});

  const sublistStructure = {
    'testMenu$default$cham-sublist': { component: submenuType },
    'testMenu$default$sublist': { items: [...menuItems.map(item => item.nodeKey)] },
  };

  return withDefaultContent({ ...sublistStructure, ...mappedItems });
};

const withColumnsSubmenuItems = (...items: string[]) => {
  const menuItems = items.map((item, i) => ({ title: item, nodeKey: i === 0 ? 'default' : item.replace(/ /g, '_').toLowerCase() }));
  const mappedItems = menuItems.reduce((acc, item) => ({
    ...acc,
    [`testMenu$default$sublist$default$sublist$${item.nodeKey}$title$text`]: { text: item.title },
  }), {});

  const sublistStructure = {
    'testMenu$default$cham-sublist': { component: 'Columns' },
    'testMenu$default$sublist$default$cham-sublist': { component: 'SubList' },
    'testMenu$default$sublist$default$sublist': { items: [...menuItems.map(item => item.nodeKey)] },
    'testMenu$default$sublist$default$title$text': { text: 'Column 1' },
  };

  return withDefaultContent({ ...sublistStructure, ...mappedItems });
};

/**
 * Menu Example structure
 *
 * <ul data-test="menu-wrapper">
 *  <li data-test="menu-item" data-bl-activator="true">
 *     <div href="#" data-test="menu-title"><span>Item 1</span></div>
 *     <ul>
 *       <li>
 *         <div href="#"><span>List 1</span></div>
 *       </li>
 *       <li>
 *         <div href="#"><span>List 2</span></div>
 *       </li>
 *     </ul>
 *   </li>
 *   <li data-test="menu-item" data-bl-activator="true">
 *     <div href="#" data-test="menu-title"><span>Item 2</span></div>
 *     <ul>
 *       <li data-bl-activator="true">
 *         <div href="#"><span>Col 1</span></div>
 *         <ul>
 *           <li>
 *             <div href="#"><span>Sub-Col 1</span></div>
 *           </li>
 *           <li>
 *             <div href="#"><span>Sub-Col 2</span></div>
 *           </li>
 *         </ul>
 *       </li>
 *       <li data-bl-activator="true">
 *         <div href="#"><span>Col 2</span></div>
 *       </li>
 *     </ul>
 *   </li>
 *   <li data-test="menu-item" data-bl-activator="true">
 *     <div href="#" data-test="menu-title"><span>Item 3</span></div>
 *     <ul>
 *       <li>
 *         <div href="#"><span>Card 1</span></div>
 *       </li>
 *       <li>
 *         <div href="#"><span>Card 2</span></div>
 *       </li>
 *     </ul>
 *   </li>
 * </ul>
 */
const withCompleteDataStructure = withDefaultContent({
  'testMenu$default$title$text': {
    'text': 'Item 1',
  },
  'testMenu': {
    'items': ['default', '5f1e1a15-a484-4ad3-93ff-235b48ff1cd2', '27f231b7-354a-462d-b05a-70d075d60e8e'],
  },
  'testMenu$5f1e1a15-a484-4ad3-93ff-235b48ff1cd2$title$text': {
    'text': 'Item 2',
  },
  'testMenu$27f231b7-354a-462d-b05a-70d075d60e8e$title$text': {
    'text': 'Item 3',
  },
  'testMenu$default$cham-sublist': {
    'component': 'List',
  },
  'testMenu$default$sublist$default$title$text': {
    'text': 'List 1',
  },
  'testMenu$default$sublist': {
    'items': ['default', '9990343a-53bd-47f2-b1ee-ea7f2b38220b'],
  },
  'testMenu$default$sublist$9990343a-53bd-47f2-b1ee-ea7f2b38220b$title$text': {
    'text': 'List 2',
  },
  'testMenu$5f1e1a15-a484-4ad3-93ff-235b48ff1cd2$cham-sublist': {
    'component': 'Columns',
  },
  'testMenu$5f1e1a15-a484-4ad3-93ff-235b48ff1cd2$sublist$default$title$text': {
    'text': 'Col 1',
  },
  'testMenu$5f1e1a15-a484-4ad3-93ff-235b48ff1cd2$sublist': {
    'items': ['default', '3f8601bd-b1cf-46dc-affc-4e863c766a47'],
  },
  'testMenu$5f1e1a15-a484-4ad3-93ff-235b48ff1cd2$sublist$3f8601bd-b1cf-46dc-affc-4e863c766a47$title$text': {
    'text': 'Col 2',
  },
  'testMenu$5f1e1a15-a484-4ad3-93ff-235b48ff1cd2$sublist$default$cham-sublist': {
    'component': 'SubList',
  },
  'testMenu$5f1e1a15-a484-4ad3-93ff-235b48ff1cd2$sublist$default$sublist$default$title$text': {
    'text': 'Sub-Col 1',
  },
  'testMenu$5f1e1a15-a484-4ad3-93ff-235b48ff1cd2$sublist$default$sublist': {
    'items': ['default', '29f1cc25-db35-4edc-ac5d-a244e8928993'],
  },
  'testMenu$5f1e1a15-a484-4ad3-93ff-235b48ff1cd2$sublist$default$sublist$29f1cc25-db35-4edc-ac5d-a244e8928993$title$text': {
    'text': 'Sub-Col 2',
  },
  'testMenu$27f231b7-354a-462d-b05a-70d075d60e8e$cham-sublist': {
    'component': 'Cards',
  },
  'testMenu$27f231b7-354a-462d-b05a-70d075d60e8e$sublist$default$title$text': {
    'text': 'Card 1',
  },
  'testMenu$27f231b7-354a-462d-b05a-70d075d60e8e$sublist': {
    'items': ['default', '9e1b1d19-e2bb-4fef-9b04-bb878757a5f7'],
  },
  'testMenu$27f231b7-354a-462d-b05a-70d075d60e8e$sublist$9e1b1d19-e2bb-4fef-9b04-bb878757a5f7$title$text': {
    'text': 'Card 2',
  },
});

const withTopMenuDesign = withDesign({
  Wrapper: addProps({ 'data-test': 'menu-wrapper' }),
  Item: addProps({ 'data-test': 'menu-item' }),
  Title: addProps({ 'data-test': 'menu-title' }),
});

const MenuBase = flow(
  asBodilessMenu('testMenu'),
  withTopMenuDesign,
)('ul');

const withListSubmenuItems = withSubmenuItems('List');

const withCardsSubmenuItems = withSubmenuItems('Cards');

export default MenuBase;
export {
  withMainMenuItems,
  withListSubmenuItems,
  withColumnsSubmenuItems,
  withCardsSubmenuItems,
  withCompleteDataStructure,
};
