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

import React, { FC } from 'react';
import { shallow } from 'enzyme';
import StructuredChildren, {
  asElementArray, addMissingGroups,
  buildGroupTree, cloneChildren,
} from '../src/ContextMenu/StructuredChildren';
import type { IContextMenuItemProps } from '../src/Types/ContextMenuTypes';

const Item: FC<IContextMenuItemProps> = ({ children }) => <>{children}</>;
const Group: FC<IContextMenuItemProps> = ({ children }) => <>{children}</>;

describe('asElementArray', () => {
  it('Removes children which are not elements', () => {
    const Test: FC = ({ children }) => {
      const newChildren = asElementArray(children);
      return <div>{newChildren}</div>;
    };
    const wrapper = shallow(
      <Test>
        foo
        <div id="bar">bar</div>
      </Test>,
    );
    expect(wrapper.text()).not.toMatch(/foo/);
    expect(wrapper.text()).toMatch(/bar/);
  });
});

describe('addMissingGroups', () => {
  it('adds a missing referenced group at top level', () => {
    const before = [
      <Item name="foo" group="bar" />,
    ];
    const after = addMissingGroups(Group)(before);
    const group = after.find(el => el.props.name === 'bar');
    expect(group).toBeDefined();
    expect(group!.type).toBe(Group);
    expect(group!.props.group).toBeUndefined();
  });
  it('adds only one group if referenced more than once', () => {
    const before = [
      <Item name="foo" group="bar" />,
      <Item name="baz" group="bar" />,
    ];
    const after = addMissingGroups(Group)(before);
    expect(after.filter(el => el.props.name === 'bar')).toHaveLength(1);
  });
  it('does not add a group if it already exists', () => {
    const before = [
      <Item name="foo" group="bar" />,
      <Group name="bar" />,
    ];
    const after = addMissingGroups(Group)(before);
    expect(after.filter(el => el.props.name === 'bar')).toHaveLength(1);
  });
  it('does not add a default group', () => {
    const elements = [
      <Item name="foo" />,
    ];
    const after = addMissingGroups(Group)(elements);
    expect(after).toEqual(elements);
  });
});

describe('buildGroupTree', () => {
  it('adds elements to a top level group', () => {
    const elements = [
      <Item name="foo" />,
      <Group name="bar" />,
    ];
    const tree = buildGroupTree(elements);
    expect(Object.getOwnPropertyNames(tree)).toHaveLength(2);
    expect(tree.foo.element.type).toBe(Item);
    expect(tree.foo.element.props.name).toBe('foo');
    expect(Object.getOwnPropertyNames(tree.foo.members)).toHaveLength(0);
    expect(tree.bar.element.type).toBe(Group);
    expect(tree.bar.element.props.name).toBe('bar');
    expect(Object.getOwnPropertyNames(tree.bar.members)).toHaveLength(0);
  });
  it('Adds elements to a named group', () => {
    const elements = [
      <Item name="foo" group="bar" />,
      <Group name="bar" />,
    ];
    const tree = buildGroupTree(elements);
    expect(Object.getOwnPropertyNames(tree)).toHaveLength(1);
    expect(tree.bar.element.type).toBe(Group);
    expect(Object.getOwnPropertyNames(tree.bar.members)).toHaveLength(1);
    expect(tree.bar.members.foo.element.type).toBe(Item);
    expect(tree.bar.members.foo.element.props.name).toBe('foo');
  });
  it('Adds elements to a nested group', () => {
    const elements = [
      <Item name="foo" group="bar" />,
      <Group name="bar" group="baz" />,
      <Group name="baz" />,
    ];
    const tree = buildGroupTree(elements);
    expect(Object.getOwnPropertyNames(tree)).toHaveLength(1);
    expect(Object.getOwnPropertyNames(tree.baz.members)).toHaveLength(1);
    expect(Object.getOwnPropertyNames(tree.baz.members.bar.members)).toHaveLength(1);
    expect(Object.getOwnPropertyNames(tree.baz.members.bar.members.foo.members)).toHaveLength(0);
    expect(tree.baz.members.bar.element.type).toBe(Group);
    expect(tree.baz.members.bar.element.props.name).toBe('bar');
    expect(tree.baz.members.bar.members.foo.element.type).toBe(Item);
    expect(tree.baz.members.bar.members.foo.element.props.name).toBe('foo');
  });
});

describe('cloneChildren', () => {
  it('Produces a correct nested tree', () => {
    const tree = {
      foo: {
        element: <div id="foo" />,
        members: {
          bar: {
            element: <div id="bar" />,
            members: {
              baz: {
                element: <div id="baz" />,
                members: {},
              },
            },
          },
        },
      },
    };
    let children = cloneChildren()(tree);
    expect(children).toHaveLength(1);
    expect(children[0].type).toBe('div');
    expect(children[0].props.id).toBe('foo');
    children = children[0].props.children;
    expect(children).toHaveLength(1);
    expect(children[0].type).toBe('div');
    expect(children[0].props.id).toBe('bar');
    children = children[0].props.children;
    expect(children).toHaveLength(1);
    expect(children[0].type).toBe('div');
    expect(children[0].props.id).toBe('baz');
  });
  it('adds supplied props', () => {
    const tree = {
      foo: {
        element: <div id="foo" />,
        members: {},
      },
    };
    const children = cloneChildren({ name: 'bar', className: 'baz' })(tree);
    expect(children[0].props.id).toBe('foo');
    expect(children[0].props.name).toBe('bar');
    expect(children[0].props.className).toBe('baz');
  });
});

describe('StructuredChildren', () => {
  it('Produces a properly nested tree', () => {
    const wrapper = shallow(
      <StructuredChildren className="foo" components={{ Group }}>
        <Item name="item1" group="group1" />
        <Item name="item2" group="group1" />
        <Item name="item3" group="group2" />
        <Item name="Item5" />
        <Group name="group2" group="group1" />
      </StructuredChildren>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
