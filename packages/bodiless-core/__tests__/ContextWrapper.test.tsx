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
import ContextWrapper from '../src/components/ContextWrapper';
import PageEditContext from '../src/PageEditContext';
import { useEditContext } from '../src/hooks';

describe('ContextWrapper', () => {
  beforeEach(() => {
    const mockIsEdit = jest.spyOn(PageEditContext.prototype, 'isEdit', 'get');
    mockIsEdit.mockImplementation(() => true);
    // TODO: Rather than spying on the prototype we should mock the class and watch an instance.
    // (but currently it's hard to get hold of the root instance, and we can't inject a new instance
    // since enzyme doesn't support the context api.)
    jest.spyOn(PageEditContext.prototype, 'activate');
  });

  afterEach(() => {
    (PageEditContext.prototype.activate as any).mockClear();
  });

  // it('adds a stylable div with the correct fClass and variants', () => {
  //   const fClass = Math.random().toString();
  //   const wrapper = shallow((
  //     <ContextWrapper fClass={fClass}>
  //       <span>This is the wrapped text.</span>
  //     </ContextWrapper>
  //   ));
  //   expect(wrapper.prop('fClass')).toBe(fClass);
  //   expect(wrapper.prop('fClassOptions')).toHaveProperty('variants.active');
  //   expect(typeof wrapper.prop('fClassOptions').variants.active).toBe('function');
  //   expect(wrapper.prop('fClassOptions').variantProps).toHaveLength(1);
  //   expect(wrapper.prop('fClassOptions').variantProps[0]).toBe('isActive');
  // });

  it('passes additional props to the inner div', () => {
    const className = Math.random().toString();
    const id = Math.random().toString();
    const wrapper = mount(
      <ContextWrapper className={className} id={id}>
        <span>This is the wrapped text.</span>
      </ContextWrapper>,
    );
    expect(wrapper.prop('className')).toBe(className);
    expect(wrapper.prop('id')).toBe(id);
  });

  it('invokes a passed onClick handler when not clickable', () => {
    const onClick = jest.fn();
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };
    const wrapper = mount(
      <ContextWrapper onClick={onClick}>
        <span>This is the wrapped text.</span>
      </ContextWrapper>,
    );
    wrapper.find('div').simulate('click', event);
    expect(onClick).toHaveBeenCalled();
  });

  it('invokes a passed onClick handler when clickable', () => {
    const onClick = jest.fn();
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };
    const wrapper1 = mount(
      <ContextWrapper onClick={onClick} clickable>
        <span>This is the wrapped text.</span>
      </ContextWrapper>,
    );
    wrapper1.find('div').simulate('click', event);
    expect(onClick).toHaveBeenCalled();
  });

  // it('supplies the correct fclass if none is provided', () => {
  //   const wrapper = shallow((
  //     <ContextWrapper>
  //       <span>This is the wrapped text.</span>
  //     </ContextWrapper>
  //   ));
  //   expect(wrapper.prop('fClass')).toBe('context_wrapper');
  // });

  it('activates the current context on click', () => {
    const mockActivate = jest.fn();
    const MockContext: FC = ({ children }) => {
      const context = useEditContext();
      // eslint-disable-next-line react/destructuring-assignment
      const newContext = context.spawn({
        getMenuOptions: () => [],
        name: 'test',
        id: 'test',
      });
      newContext.activate = mockActivate;
      return <PageEditContext.Provider value={newContext}>{children}</PageEditContext.Provider>;
    };
    const wrapper = mount(
      <MockContext>
        <ContextWrapper clickable>
          <span>This is the wrapped text.</span>
        </ContextWrapper>
      </MockContext>,
    );
    // TODO: We should have reusable mocks for events.
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };
    wrapper.find('div').simulate('click', event);
    expect(mockActivate).toHaveBeenCalled();
  });

  it('does not activate the current context if not clickable', () => {
    const wrapper = mount(
      <ContextWrapper>
        <span>This is the wrapped text.</span>
      </ContextWrapper>,
    );
    // TODO: We should have reusable mocks for events.
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };
    wrapper.find('div').simulate('click', event);
    expect(PageEditContext.prototype.activate).not.toHaveBeenCalled();
  });

  // it('correctly specifies the FClass variant', () => {
  //   const mockIsActive = jest.spyOn(PageEditContext.prototype, 'isActive', 'get');
  //   const jsx = (
  //     <ContextWrapper>
  //       <span>This is the wrapped text.</span>
  //     </ContextWrapper>
  //   );

  //   mockIsActive.mockImplementation(() => true);
  //   const props1 = shallow(jsx).props();
  //   expect(props1.isActive).toBeTruthy();
  //   expect(props1.fClassOptions.variants.active(props1)).toBeTruthy();

  //   mockIsActive.mockImplementation(() => false);
  //   const props2 = shallow(jsx).props();
  //   expect(props2.isActive).toBeFalsy();
  //   expect(props2.fClassOptions.variants.active(props2)).toBeFalsy();

  //   mockIsActive.mockRestore();
  // });
});
