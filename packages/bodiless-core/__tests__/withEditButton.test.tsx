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

import React, {
  HTMLProps, useEffect,
} from 'react';
import { shallow, mount } from 'enzyme';
import { Text } from 'informed';
import { observer } from 'mobx-react-lite';
import { omit } from 'lodash';
import withEditButton from '../src/withEditButton';
import { useEditContext } from '../src/hooks';
import ContextMenuItem from '../src/components/ContextMenuItem';
import { TMenuOption, EditButtonOptions } from '../src';

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

  it('does not re-render a menu option when data changes', () => {
    const MockMenu = observer(() => {
      const { contextMenuOptions } = useEditContext();
      const op = contextMenuOptions[0] || false;
      if (op) return <ContextMenuItem option={op} index={0} name={op.name} />;
      return null;
    });

    const itemRendered = jest.fn();
    itemRendered.mockReturnValue('Foo');
    const def = {
      name: 'Foo',
      icon: 'test',
      // This is a bit of a hack to count the renders of the context menu item.
      label: itemRendered,
      activateContext: false,
      renderForm: () => (
        <Text field="foo" />
      ),
    };

    const Provider = withEditButton(def)(() => {
      const context = useEditContext();
      useEffect(() => {
        context.activate();
      }, []);
      return <>Provider</>;
    });

    const Test = ({ componentData }: any) => (
      <>
        <MockMenu />
        <Provider componentData={componentData} />
      </>
    );

    const wrapper = mount(<Test componentData={{ foo: 'foo' }} />);
    expect(itemRendered).toBeCalledTimes(1);
    wrapper.find('div[aria-label="Foo"]').simulate('click');
    expect(wrapper.find('input[name="foo"]').prop('value')).toEqual('foo');
    expect(itemRendered).toBeCalledTimes(2);
    wrapper.find('button[aria-label="Cancel"]').simulate('click');
    expect(itemRendered).toBeCalledTimes(3);
    expect(wrapper.find('input[name="foo"]')).toHaveLength(0);
    wrapper.setProps({ componentData: { foo: 'bar' } });
    expect(itemRendered).toBeCalledTimes(3);
    wrapper.find('div[aria-label="Foo"]').simulate('click');
    expect(wrapper.find('input[name="foo"]').prop('value')).toEqual('bar');
    expect(itemRendered).toBeCalledTimes(4);
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

  it('Uses custom data handlers correctly', () => {
    const options = {
      icon: 'Icon',
      name: 'Name',
      renderForm: () => <></>,
      submitValueHandler: jest.fn((data: any) => omit(data, 'bar')),
      initialValueHandler: jest.fn((data: any) => ({ ...data, bar: 'Bar' })),
    };
    const props = {
      setComponentData: jest.fn(),
      componentData: {
        foo: 'Foo',
      },
    };
    const Foo = withEditButton<Props, Data>(options)('div');
    const wrapper = shallow(<Foo {...props} />);
    const menuOptions = wrapper.prop('getMenuOptions')();
    const Form = menuOptions[0].handler();
    const formWrapper$ = shallow(<Form closeForm={() => undefined} />);
    const formWrapper = formWrapper$.dive();
    expect(formWrapper.prop('initialValues')).toEqual({
      foo: 'Foo',
      bar: 'Bar',
    });
    expect(options.initialValueHandler.mock.calls[0][0]).toEqual({
      foo: 'Foo',
    });
    // @ts-ignore The result of dive is somehow not recognized as always being a component.
    formWrapper.prop('onSubmit')({ foo: 'Baz', bar: 'Bang' });
    expect(props.setComponentData.mock.calls[0][0]).toEqual({
      foo: 'Baz',
    });
    expect(options.submitValueHandler.mock.calls[0][0]).toEqual({
      foo: 'Baz',
      bar: 'Bang',
    });
  });

  it('creates the correct context menu option', () => {
    const options: EditButtonOptions<any, any> = {
      icon: Math.random().toString(),
      name: Math.random().toString(),
      renderForm: () => <></>,
      groupLabel: Math.random().toString(),
      groupMerge: 'merge',
      global: false,
    };
    const Foo = withEditButton<Props, Data>(options)('div');
    const wrapper = shallow(
      <Foo setComponentData={() => undefined} componentData={{}} />,
    );

    // @TODO Need to be able to pass context definition overrides.
    // expect(wrapper.prop('name')).toBe(options.name);
    const menuOptions: TMenuOption[] = wrapper.prop('getMenuOptions')();
    expect(menuOptions.length).toBe(2);
    const option = menuOptions.find(o => o.name === options.name);
    expect(option!.icon).toBe(options.icon);
    expect(option!.global).toBe(false);
    expect(option!.local).toBeUndefined();
    const group = menuOptions.find(o => o.name === `${options.name}-group`);
    expect(group!.label).toBe(options.groupLabel);
    expect(group!.groupMerge).toBe(options.groupMerge);
    expect(group!.global).toBe(false);
    expect(group!.local).toBeUndefined();
    expect(group!.Component).toBe('group');
  });
});
