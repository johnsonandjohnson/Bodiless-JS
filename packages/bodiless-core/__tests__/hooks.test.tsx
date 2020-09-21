/* eslint-disable class-methods-use-this */
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

import React from 'react';
import { mount } from 'enzyme';
import { useContextActivator, useExtendHandler } from '../src/hooks';
import PageEditContext from '../src/PageEditContext';

const TestComponent = ({
  element: Element, event, handler, children, id,
}: any) => (
  <Element
    id={id || 'test'}
    {...useContextActivator(event, handler)}
  >
    {children || 'Foo!'}
  </Element>
);

describe('useExtendHandler', () => {
  let mockIsEdit: any;
  const outerHandler = jest.fn();
  const innerHandler = jest.fn();

  const Test = (props: any) => (
    <div {...useExtendHandler('onClick', innerHandler, props)} />
  );

  beforeAll(() => {
    mockIsEdit = jest.spyOn(PageEditContext.prototype, 'isEdit', 'get').mockReturnValue(true);
  });

  beforeEach(() => {
    outerHandler.mockClear();
    innerHandler.mockClear();
  });

  afterAll(() => {
    mockIsEdit.mockRestore();
  });

  it('adds a handler and invokes it with the event', () => {
    const wrapper = mount(<Test />);
    wrapper.simulate('click');
    expect(innerHandler).toBeCalledTimes(1);
    expect(innerHandler.mock.calls[0][0].type).toBe('click');
  });

  it('extends a handler and invokes it with the event', () => {
    const wrapper = mount(<Test onClick={outerHandler} />);
    wrapper.simulate('click');
    expect(innerHandler).toBeCalledTimes(1);
    expect(outerHandler).toBeCalledTimes(1);
    expect(innerHandler.mock.calls[0][0].type).toBe('click');
    expect(outerHandler.mock.calls[0][0].type).toBe('click');
  });

  it('does not alter a handler when not in edit mode', () => {
    mockIsEdit.mockClear();
    mockIsEdit = jest.spyOn(PageEditContext.prototype, 'isEdit', 'get').mockReturnValue(false);
    const wrapper = mount(<Test onClick={outerHandler} />);
    wrapper.simulate('click');
    expect(outerHandler).toBeCalledTimes(1);
    expect(outerHandler.mock.calls[0][0].type).toBe('click');
    expect(innerHandler).toBeCalledTimes(0);
  });
});

describe('useContextActivator', () => {
  let mockActivate: any;
  let mockIsInnermost: any;
  let mockIsEdit: any;

  beforeAll(() => {
    mockActivate = jest.spyOn(PageEditContext.prototype, 'activate');
    mockIsInnermost = jest.spyOn(PageEditContext.prototype, 'isInnermost', 'get').mockReturnValue(false);
    mockIsEdit = jest.spyOn(PageEditContext.prototype, 'isEdit', 'get').mockReturnValue(true);
  });

  afterEach(() => {
    mockActivate.mockClear();
  });

  afterAll(() => {
    mockActivate.mockRestore();
    mockIsInnermost.mockRestore();
    mockIsEdit.mockRestore();
  });

  it('creates an activator for a mouseover event', () => {
    const conditions = {
      event: 'onMouseOver',
      trigger: 'mouseover',
      element: 'span',
    };
    const wrapper = mount(<TestComponent {...conditions} />);
    wrapper.simulate(conditions.trigger);
    expect(PageEditContext.prototype.activate).toHaveBeenCalledTimes(1);
  });

  it('invokes a passed handler', () => {
    const handler = jest.fn();
    const wrapper = mount(
      <TestComponent handler={handler} event="onClick" element="div" />,
    );
    wrapper.simulate('click');
    expect(handler).toHaveBeenCalledTimes(1);
    expect(PageEditContext.prototype.activate).toHaveBeenCalledTimes(1);
  });

  it('does not stop propagation of the event', () => {
    const outer = jest.fn();
    const Test = () => (
      <button type="button" onClick={outer}>
        <TestComponent event="onClick" element="div" />
      </button>
    );
    const wrapper = mount(<Test />);
    wrapper.find('#test').simulate('click');
    expect(outer).toHaveBeenCalledTimes(1);
    expect(outer.mock.calls[0][0].type).toBe('click');
  });

  it('does not activate a context that is already innermost', () => {
    mockIsInnermost.mockRestore();
    mockIsInnermost = jest.spyOn(PageEditContext.prototype, 'isInnermost', 'get').mockReturnValue(true);
    const wrapper = mount(
      <TestComponent event="onClick" element="div" />,
    );
    wrapper.find('#test').simulate('click');
    expect(mockActivate).not.toBeCalled();
  });

  it('does not activate an outer context', () => {
    mockActivate.mockRestore();
    mockIsInnermost.mockRestore();
    mockIsInnermost = jest.spyOn(PageEditContext.prototype, 'isInnermost', 'get').mockReturnValue(false);
    class MockContext extends PageEditContext {
      activate = jest.fn();
    }
    const outer = new MockContext({ id: 'outer' });
    const inner = new MockContext({ id: 'inner' }, outer);

    const wrapper = mount(
      <PageEditContext.Provider value={outer}>
        <TestComponent event="onClick" element="div" id="outer">
          <PageEditContext.Provider value={inner}>
            <TestComponent event="onClick" element="div" id="inner" />
          </PageEditContext.Provider>
        </TestComponent>
      </PageEditContext.Provider>,
    );
    wrapper.find('div#inner').simulate('click');
    expect(mockActivate).not.toBeCalled();
    expect(inner.activate).toBeCalledTimes(1);
    expect(outer.activate).not.toBeCalled();
  });
});
