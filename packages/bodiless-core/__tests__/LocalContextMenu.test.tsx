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

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["isInnermost"] }] */

import React, { FC, useEffect } from 'react';
import { mount, shallow } from 'enzyme';
import { v1 } from 'uuid';
import PageEditContext from '../src/PageEditContext';
import LocalContextMenu from '../src/components/LocalContextMenu';
import ContextMenu from '../src/components/ContextMenu';
import { TMenuOptionGetter } from '../src/PageEditContext/types';
import { useUUID, useEditContext } from '../src/hooks';
import PageEditor from '../src/components/PageEditor';
import { TMenuOption } from '../src/Types/ContextMenuTypes';

const testOptions = () => [
  {
    icon: 'add',
    name: 'add',
    local: true,
  },
];

type Props = {
  getMenuOptions?: TMenuOptionGetter;
  id?: string;
  name?: string;
  active?: boolean;
  tooltipsDisabled?: boolean;
};

const fooText = Math.random().toString();
const Foo: React.FC<any> = props => <span {...props}>{fooText}</span>;

const MockContextProvider: FC<Props> = ({
  active, children, getMenuOptions, id, name, tooltipsDisabled,
}) => {
  class MockPageEditContext extends PageEditContext {
    // Overides PageEditContext.isInnermost to test LocalContextMenu Tooltip behavior.
    get isInnermost() {
      return Boolean(active);
    }

    // eslint-disable-next-line class-methods-use-this
    get areLocalTooltipsDisabled() {
      return Boolean(tooltipsDisabled);
    }
  }

  const newValues = {
    getMenuOptions,
    id: id || useUUID(),
    name: name || 'Unknown',
  };

  const context = useEditContext();
  const mockPageContext = new MockPageEditContext(newValues, context);

  // Activate the context.
  useEffect(() => {
    if (active) mockPageContext.activate();
  });

  return (
    <PageEditContext.context.Provider value={mockPageContext}>
      {children}
    </PageEditContext.context.Provider>
  );
};

describe('LocalContextMenu', () => {
  it('renders Tooltip with overlay of default ContextMenu ui element.', () => {
    const wrapper = mount(
      <PageEditor>
        <MockContextProvider active getMenuOptions={testOptions} id="t1" name="defaultUI">
          <LocalContextMenu><Foo /></LocalContextMenu>
        </MockContextProvider>
      </PageEditor>,
    );
    const content = wrapper.find('div.rc-tooltip-content');
    expect(content.find(ContextMenu)).toHaveLength(1);
  });

  it('renders Tooltip with overlay of customized ui element.', () => {
    const Foo1: React.FC<any> = () => <div>Global</div>;
    const Foo2: React.FC<any> = () => <div>Local</div>;
    const ui = {
      GlobalContextMenu: Foo1,
      LocalContextMenu: Foo2,
    };
    const wrapper = mount(
      <PageEditor ui={ui}>
        <MockContextProvider active getMenuOptions={testOptions} id="t2" name="customUI">
          <LocalContextMenu><Foo /></LocalContextMenu>
        </MockContextProvider>
      </PageEditor>,
    );
    const content = wrapper.find('div.rc-tooltip-content');
    expect(content.find(Foo2)).toHaveLength(1);
    expect(content.find(ContextMenu)).toHaveLength(0);
  });

  it('renders child component correctly.', () => {
    const wrapper = mount(
      <MockContextProvider getMenuOptions={testOptions} id="t3" name="childRendering">
        <LocalContextMenu><Foo /></LocalContextMenu>
      </MockContextProvider>,
    );
    expect(wrapper.find('Foo')).toHaveLength(1);
  });

  it('displays menu options which have "local" flag set.', () => {
    const options1 = () => [
      {
        icon: 'icon1',
        name: 'itemNonLocal',
        local: false,
      },
      {
        icon: 'icon2',
        name: 'itemLocal',
        local: true,
      },
      {
        icon: 'icon3',
        name: 'itemLocalOmit',
      },
    ];
    const wrapper = mount(
      <MockContextProvider active getMenuOptions={options1} id="t5" name="menuOptionLocal">
        <LocalContextMenu><Foo /></LocalContextMenu>
      </MockContextProvider>,
    );

    expect(wrapper.find('Tooltip').get(0).props.visible).toBe(true);

    // Available menu option names from rendered tooltip.
    const optionNames = wrapper.find('ContextMenu').get(0).props.options.map((item: any) => item.name);
    expect(optionNames).toEqual(expect.arrayContaining(['itemLocal']));
    expect(optionNames).not.toEqual(expect.arrayContaining(['itemNonLocal']));
    expect(optionNames).not.toEqual(expect.arrayContaining(['itemLocalOmit']));
  });

  it('renders invisible Tooltip when ContextProvider is not inner most.', () => {
    const wrapper = mount(
      <MockContextProvider active={false} getMenuOptions={testOptions} id="t6" name="contextInActive">
        <LocalContextMenu><Foo /></LocalContextMenu>
      </MockContextProvider>,
    );

    expect(wrapper.find('Tooltip[visible=true]')).toHaveLength(0);
  });

  it('renders visible Tooltip when ContextProvider is inner most.', () => {
    const wrapper = mount(
      <MockContextProvider active getMenuOptions={testOptions} id="t7" name="contextActive">
        <LocalContextMenu><Foo /></LocalContextMenu>
      </MockContextProvider>,
    );

    expect(wrapper.find('Tooltip[visible=true]')).toHaveLength(1);
  });

  it('does not render visible Tooltip when local tooltips are disabled via edit context.', () => {
    const wrapper = mount(
      <MockContextProvider active getMenuOptions={testOptions} id="t8" name="toolbarActive" tooltipsDisabled>
        <LocalContextMenu><Foo /></LocalContextMenu>
      </MockContextProvider>,
    );
    expect(wrapper.find('Tooltip[visible=true]')).toHaveLength(0);
  });
});

describe('Grouped options', () => {
  let mockOptionsGetter:jest.SpyInstance<TMenuOption[], []>;

  const setMockOptions = (ops: TMenuOption[]) => {
    mockOptionsGetter.mockReturnValue(ops);
  };

  beforeEach(() => {
    mockOptionsGetter = jest.spyOn(PageEditContext.prototype, 'contextMenuOptions', 'get');
  });

  afterEach(() => {
    mockOptionsGetter.mockRestore();
  });

  const getRenderedOptions = ():TMenuOption[] => {
    const wrapper = shallow(<LocalContextMenu><Foo /></LocalContextMenu>);
    const overlay = shallow(wrapper.prop('overlay'));
    return overlay.prop('options');
  };

  it('Renders only local options', () => {
    const foo = { name: 'Foo', local: true };
    const bar = { name: 'Bar' };
    const baz = { name: 'Baz', local: false };
    setMockOptions([foo, bar, baz]);
    const options = getRenderedOptions();
    expect(options).toEqual([foo]);
  });

  it('Creates groups based on context', () => {
    const local = true;
    const c1 = new PageEditContext({ name: 'C1', id: v1() });
    const c2 = new PageEditContext({ name: 'C2', id: v1() });

    const c1a = { name: 'c1a', context: c1, local };
    const c1b = { name: 'c1b', context: c1, local };
    const c2a = { name: 'c2a', context: c2, local };

    setMockOptions([c1a, c2a, c1b]);
    const options = getRenderedOptions();
    const groups = options.filter(o => o.Component === 'group');
    expect(groups).toHaveLength(2);
    const g1 = groups.find(g => g.label === 'C1');
    const g2 = groups.find(g => g.label === 'C2');
    expect(g1).toBeDefined();
    expect(g2).toBeDefined();
    expect(options.find(o => o.name === 'c1b')!.group).toBe(g1!.name);
    expect(options.find(o => o.name === 'c2a')!.group).toBe(g2!.name);
  });

  it('Preserves named groups', () => {
    const local = true;
    const context = new PageEditContext({ name: 'C1', id: v1() });
    const a = { name: 'a', context, local };
    const b = { name: 'b', context, local };
    const c = {
      name: 'c', context, group: 'a', local,
    };
    setMockOptions([a, b, c]);
    const options = getRenderedOptions();
    expect(options.find(o => o.name === 'a')!.group).toBeUndefined();
    expect(options.find(o => o.name === 'c')!.group).toBe('a');
    const groupName = options.find(o => o.name === 'b')!.group;
    expect(options.find(o => o.name === groupName)!.label).toBe('C1');
    expect(options.filter(o => o.Component === 'group')).toHaveLength(1);
  });

  it('Orders default groups properly', () => {
    const local = true;
    const outer = new PageEditContext({ name: 'Outer', id: v1() });
    const inner = new PageEditContext({ name: 'Inner', id: v1() });
    const initialOptions: TMenuOption[] = [
      { name: 'outer', context: outer, local },
      { name: 'inner', context: inner, local },
    ];
    setMockOptions(initialOptions);
    const options = getRenderedOptions();
    const groups = options.filter(o => o.Component === 'group');
    expect(groups[0].label).toBe('Inner');
    expect(groups[1].label).toBe('Outer');
  });

  it('Orders custom groups from different contexts correctly', () => {
    const local = true;
    const outer = new PageEditContext({ name: 'Outer', id: v1() });
    const inner = new PageEditContext({ name: 'Inner', id: v1() });
    const initialOptions: TMenuOption[] = [
      {
        name: 'outer', context: outer, local, Component: 'group',
      },
      {
        name: 'o1', context: outer, local, group: 'outer',
      },
      {
        name: 'inner', context: inner, local, Component: 'group',
      },
      {
        name: 'i1', context: inner, local, group: 'inner',
      },
    ];
    setMockOptions(initialOptions);
    const options = getRenderedOptions();
    const groups = options.filter(o => o.Component === 'group');
    expect(groups).toHaveLength(2);
    expect(groups[0].name).toBe('inner');
    expect(groups[1].name).toBe('outer');
  });

  it('Orders custom groups from the same context correctly', () => {
    const local = true;
    const context = new PageEditContext({ name: 'Middle', id: v1() });
    const initialOptions: TMenuOption[] = [
      {
        name: 'first', label: 'First', context, local, Component: 'group',
      },
      { name: 'i1', context, local },
      {
        name: 'last', label: 'Last', context, local, Component: 'group',
      },
      {
        name: 'i2', context, local, group: 'last',
      },
      {
        name: 'i3', context, local, group: 'first',
      },
    ];
    setMockOptions(initialOptions);
    const options = getRenderedOptions();
    const groups = options.filter(o => o.Component === 'group');
    expect(groups).toHaveLength(3);
    expect(groups[0].label).toBe('First');
    expect(groups[1].label).toBe('Middle');
    expect(groups[2].label).toBe('Last');
  });

  it('Merges groups when specified', () => {
    const local = true;
    const outer = new PageEditContext({ name: 'Outer', id: v1() });
    const inner = new PageEditContext({ name: 'Inner', id: v1() }, outer);
    const initialOptions: TMenuOption[] = [
      { name: 'o1', context: outer, local },
      {
        name: 'o2', context: outer, local, group: 'merge',
      },
      { name: 'o3', context: outer, local },
      { name: 'merge', groupMerge: 'merge', local },
      { name: 'i1', context: inner, local },
    ];
    setMockOptions(initialOptions);
    const options = getRenderedOptions();
    expect(options.find(o => o.name === 'o1')!.group).toBe(outer.id);
    expect(options.find(o => o.name === 'o2')!.group).toBe(inner.id);
    expect(options.find(o => o.name === 'o3')!.group).toBe(outer.id);
    expect(options.find(o => o.name === 'merge'))!.toBeUndefined();
    expect(options.find(o => o.name === 'i1')!.group).toBe(inner.id);
    expect(options.find(o => o.name === outer.id))!.toBeDefined();
    expect(options.find(o => o.name === inner.id))!.toBeDefined();
  });

  it('Does not delete a merge group if it is innermost', () => {
    const local = true;
    const outer = new PageEditContext({ name: 'Outer', id: v1() });
    const initialOptions: TMenuOption[] = [
      { name: 'o1', context: outer, local },
      {
        name: 'o2', context: outer, local, group: 'merge',
      },
      { name: 'o3', context: outer, local },
      { name: 'merge', groupMerge: 'merge', local },
    ];
    setMockOptions(initialOptions);
    const options = getRenderedOptions();
    expect(options.find(o => o.name === 'o1')!.group).toBe(outer.id);
    expect(options.find(o => o.name === 'o2')!.group).toBe('merge');
    expect(options.find(o => o.name === 'o3')!.group).toBe(outer.id);
    expect(options.find(o => o.name === 'merge'))!.toBeDefined();
    expect(options.find(o => o.name === outer.id))!.toBeDefined();
  });

  it('Merges up correctly', () => {
    const local = true;
    const outer = new PageEditContext({ name: 'Outer', id: v1() });
    const inner = new PageEditContext({ name: 'Inner', id: v1() }, outer);
    const initialOptions: TMenuOption[] = [
      { name: 'o1', context: outer, local },
      { name: 'o2', context: outer, local },
      {
        name: 'i1', context: inner, local, group: 'merge',
      },
      { name: 'merge', groupMerge: 'merge-up', local },
      { name: 'i2', context: inner, local },
    ];
    setMockOptions(initialOptions);
    const options = getRenderedOptions();
    expect(options.find(o => o.name === 'o1')!.group).toBe(outer.id);
    expect(options.find(o => o.name === 'o2')!.group).toBe(outer.id);
    expect(options.find(o => o.name === 'i1')!.group).toBe(outer.id);
    expect(options.find(o => o.name === 'merge'))!.toBeUndefined();
    expect(options.find(o => o.name === 'i2')!.group).toBe(inner.id);
    expect(options.find(o => o.name === outer.id))!.toBeDefined();
    expect(options.find(o => o.name === inner.id))!.toBeDefined();
  });

  describe('Hiding empty groups', () => {
    const local = true;
    const isHidden = (option?: TMenuOption) => {
      if (!option) return true;
      return typeof option.isHidden === 'function' ? option.isHidden() : Boolean(option.isHidden);
    };
    it('Hides groups with no visible options', () => {
      const initialOptions: TMenuOption[] = [
        { name: 'empty-group', local, Component: 'group' },
        {
          name: 'hidden-option', isHidden: true, local, group: 'empty-group',
        },
        {
          name: 'hidden-option-2', isHidden: () => true, local, group: 'empty-group',
        },

      ];
      setMockOptions(initialOptions);
      const options = getRenderedOptions();
      const group = options.find(o => o.Component === 'group');
      expect(isHidden(group)).toBeTruthy();
    });

    it('Shows groups with at least one visible options', () => {
      const initialOptions: TMenuOption[] = [
        { name: 'empty-group', local, Component: 'group' },
        {
          name: 'hidden-option', isHidden: true, local, group: 'empty-group',
        },
        { name: 'visible-option', local, group: 'empty-group' },
      ];
      setMockOptions(initialOptions);
      const options = getRenderedOptions();
      const group = options.find(o => o.Component === 'group');
      expect(isHidden(group)).toBeFalsy();
    });

    it('Hides explicitly hidden groups even if they have visible options', () => {
      const initialOptions: TMenuOption[] = [
        {
          name: 'group', local, Component: 'group', isHidden: true,
        },
        { name: 'visible-option', local, group: 'group' },
      ];
      setMockOptions(initialOptions);
      const options = getRenderedOptions();
      const group = options.find(o => o.Component === 'group');
      expect(isHidden(group)).toBeTruthy();
    });
  });
});
