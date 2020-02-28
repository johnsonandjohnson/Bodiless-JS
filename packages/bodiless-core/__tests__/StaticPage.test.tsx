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
import { useEditContext } from '../src/hooks';
import StaticPage from '../src/components/StaticPage';

// We pass down this prop to force re-rendering.
type FP = {
  force: string;
};

// Component which prints values of the current context.
const ContextLogger: FC<FP> = () => {
  const value = useEditContext();
  const getMenuOptions = value.getMenuOptions || (() => []);
  return (
    <>
      <span id="isEdit">{value.isEdit.toString()}</span>
      <span id="isActive">{value.isActive.toString()}</span>
      <span id="isInnermost">{value.isInnermost.toString()}</span>
      <span id="contextMenuOptions">{value.contextMenuOptions.length}</span>
      <span id="getMenuOptions">{getMenuOptions().length}</span>
    </>
  );
};

// Component which tries to activate a context.
const Activator: FC<FP> = ({ force }) => {
  const context = useEditContext();
  const onClick = () => {
    context.activate();
  };
  return (
    <div id="activator" role="presentation" onClick={onClick}>
      <ContextLogger force={force} />
    </div>
  );
};

// Event mock.
const event = {
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
};

describe('StaticPage', () => {
  it('Passes appropriate context values', () => {
    // Must use mount bc shallow doesn't handle context properly.
    const wrapper = mount(
      <StaticPage>
        <ContextLogger force="foo" />
      </StaticPage>,
    );
    expect(wrapper.find('#isEdit').text()).toBe('false');
    expect(wrapper.find('#isActive').text()).toBe('false');
    expect(wrapper.find('#isInnermost').text()).toBe('false');
    expect(wrapper.find('#contextMenuOptions').text()).toBe('0');
    expect(wrapper.find('#getMenuOptions').text()).toBe('0');
  });

  it('Prevents activation of a child context', () => {
    const Baseline: FC<FP> = ({ force }) => {
      const getMenuOptions = () => [
        {
          name: 'name',
          icon: 'icon',
          handler: () => undefined,
          isActive: () => true,
        },
      ];
      return (
        <PageContextProvider getMenuOptions={getMenuOptions} name="provider">
          <Activator force={force} />
        </PageContextProvider>
      );
    };
    let wrapper = mount(<Baseline force="foo" />);
    expect(wrapper.find('#isActive').text()).toBe('false');
    expect(wrapper.find('#isInnermost').text()).toBe('false');
    expect(wrapper.find('#contextMenuOptions').text()).toBe('0');
    expect(wrapper.find('#getMenuOptions').text()).toBe('1');
    wrapper.find('#activator').simulate('click', event);
    // The following forces the component to re-render. It's not clear why this is necessary...
    wrapper.setProps({ force: 'bar' });
    expect(wrapper.find('#isActive').text()).toBe('true');
    expect(wrapper.find('#isInnermost').text()).toBe('true');
    expect(wrapper.find('#contextMenuOptions').text()).toBe('1');
    expect(wrapper.find('#getMenuOptions').text()).toBe('1');

    const Test: FC<FP> = ({ force }) => (
      <StaticPage>
        <Baseline force={force} />
      </StaticPage>
    );
    wrapper = mount(<Test force="foo" />);
    expect(wrapper.find('#isActive').text()).toBe('false');
    expect(wrapper.find('#isInnermost').text()).toBe('false');
    expect(wrapper.find('#contextMenuOptions').text()).toBe('0');
    expect(wrapper.find('#getMenuOptions').text()).toBe('0');
    wrapper.find('#activator').simulate('click', event);
    // The following forces the component to re-render. It's not clear why this is necessary...
    wrapper.setProps({ force: 'bar' });
    expect(wrapper.find('#isActive').text()).toBe('false');
    expect(wrapper.find('#isInnermost').text()).toBe('false');
    expect(wrapper.find('#contextMenuOptions').text()).toBe('0');
    expect(wrapper.find('#getMenuOptions').text()).toBe('0');
  });

  it('Prevents toggling edit mode', () => {
    const Baseline: FC<FP> = ({ force }) => {
      const context = useEditContext();
      const onClick = () => context.toggleEdit();
      return (
        <div id="toggle" role="presentation" onClick={onClick}>
          <ContextLogger force={force} />
        </div>
      );
    };
    let wrapper = mount(<Baseline force="foo" />);
    expect(wrapper.find('#isEdit').text()).toBe('false');
    wrapper.find('#toggle').simulate('click', event);
    wrapper.setProps({ force: 'bar' });
    expect(wrapper.find('#isEdit').text()).toBe('true');

    const Test: FC<FP> = ({ force }) => (
      <StaticPage>
        <Baseline force={force} />
      </StaticPage>
    );
    wrapper = mount(<Test force="foo" />);
    expect(wrapper.find('#isEdit').text()).toBe('false');
    wrapper.find('#toggle').simulate('click', event);
    wrapper.setProps({ force: 'bar' });
    expect(wrapper.find('#isEdit').text()).toBe('false');
  });
});
