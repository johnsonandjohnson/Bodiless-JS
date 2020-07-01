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

import React, { FC } from 'react';
import { mount } from 'enzyme';
import PageEditContext from '../src/PageEditContext';
import LocalContextMenu from '../src/components/LocalContextMenu';
import ContextMenu from '../src/components/ContextMenu';
import { TMenuOptionGetter } from '../src/PageEditContext/types';
import { useUUID } from '../src/hooks';
import PageEditor from '../src/components/PageEditor';

const options = () => [
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

  const mockPageContext = new MockPageEditContext(newValues);

  // Activate the context.
  if (active) {
    mockPageContext.activate();
  }

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
        <MockContextProvider active getMenuOptions={options} id="t1" name="defaultUI">
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
        <MockContextProvider active getMenuOptions={options} id="t2" name="customUI">
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
      <MockContextProvider getMenuOptions={options} id="t3" name="childRendering">
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
      <MockContextProvider active={false} getMenuOptions={options} id="t6" name="contextInActive">
        <LocalContextMenu><Foo /></LocalContextMenu>
      </MockContextProvider>,
    );

    expect(wrapper.find('Tooltip[visible=true]')).toHaveLength(0);
  });

  it('renders visible Tooltip when ContextProvider is inner most.', () => {
    const wrapper = mount(
      <MockContextProvider active getMenuOptions={options} id="t7" name="contextActive">
        <LocalContextMenu><Foo /></LocalContextMenu>
      </MockContextProvider>,
    );

    expect(wrapper.find('Tooltip[visible=true]')).toHaveLength(1);
  });

  it('does not render visible Tooltip when local tooltips are disabled via edit context.', () => {
    const wrapper = mount(
      <MockContextProvider active getMenuOptions={options} id="t8" name="toolbarActive" tooltipsDisabled>
        <LocalContextMenu><Foo /></LocalContextMenu>
      </MockContextProvider>,
    );
    expect(wrapper.find('Tooltip[visible=true]')).toHaveLength(0);
  });
});
