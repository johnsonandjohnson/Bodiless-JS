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

import React, { HTMLProps } from 'react';
import { shallow } from 'enzyme';
import withEditButton from '../src/withEditButton';

type Props = HTMLProps<HTMLDivElement>;
type Data = {
  foo?: string;
};

describe('withEditButton', () => {
  it('passes props correctly to the wrapped component', () => {
    const options = {
      icon: 'Icon',
      name: 'Name',
      renderForm: () => <></>,
    };
    const consumedProps = {
      setComponentData: jest.fn(),
      unwrap: jest.fn(),
      isActive: jest.fn(),
    };
    const passedProps = {
      className: Math.random().toString(),
      id: Math.random().toString(),
      componentData: {
        foo: Math.random().toString(),
      },
    };
    const Foo = withEditButton<Props, Data>(options)('div');
    const wrapper = shallow(<Foo {...consumedProps} {...passedProps} />);
    const div = wrapper
      .dive()
      .childAt(0)
      .dive();
    Object.keys(passedProps).forEach(key => {
      // @ts-ignore passedProps[key] has implicit type any.
      expect(div.prop(key)).toBe(passedProps[key]);
    });
    Object.keys(consumedProps).forEach(key => {
      expect(div.prop(key)).toBeUndefined();
    });
  });

  it('renders the edit form component properly', () => {
    const id = Math.random().toString();
    const options = {
      icon: 'Icon',
      name: 'Name',
      renderForm: () => <div>{id}</div>,
    };
    const props = {
      setComponentData: jest.fn(),
      componentData: {
        foo: Math.random.toString(),
      },
      unwrap: jest.fn(),
      isActive: jest.fn(),
    };
    const Foo = withEditButton<Props, Data>(options)('div');
    const wrapper = shallow(<Foo {...props} />);
    const menuOptions = wrapper.prop('getMenuOptions')();
    const Form = menuOptions[0].handler();
    const closeForm = jest.fn();
    const formWrapper$ = shallow(<Form closeForm={closeForm} />);
    const formWrapper = formWrapper$.dive();
    // @ts-ignore The result of dive is somehow not recognized as always being a component.
    formWrapper.prop('onSubmit')();
    expect(props.setComponentData.mock.calls.length).toBe(1);
    expect(closeForm.mock.calls.length).toBe(1);
    expect(formWrapper.prop('initialValues')).toEqual(props.componentData);
    expect(
      formWrapper
        .dive()
        .find('div')
        .first()
        .text(),
    ).toBe(id);
  });

  it('creates the correct context menu option', () => {
    const options = {
      icon: Math.random().toString(),
      name: Math.random().toString(),
      renderForm: () => <></>,
      global: false,
    };
    const Foo = withEditButton<Props, Data>(options)('div');
    const wrapper = shallow(
      <Foo setComponentData={() => undefined} componentData={{}} />,
    );
    expect(wrapper.prop('name')).toBe(options.name);
    const menuOptions = wrapper.prop('getMenuOptions')();
    expect(menuOptions.length).toBe(1);
    expect(menuOptions[0].icon).toBe(options.icon);
    expect(menuOptions[0].name).toBe(options.name);
    expect(menuOptions[0].global).toBe(false);
    expect(menuOptions[0].local).toBeUndefined();
  });
});
