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
import { shallow, mount } from 'enzyme';
import PageContextProvider, { withMenuOptions } from '../src/PageContextProvider';
import { useEditContext } from '../src/hooks';
import { PageEditContextInterface } from '../src/PageEditContext/types';

describe('withMenuOptions', () => {
  type Props = {
    foo: string;
  };

  // A menu option getter creator which uses values from
  // both props and context to define menu options.
  const useGetMenuOptions = (
    { foo }: Props,
    { id }: PageEditContextInterface,
  ) => () => [
    {
      name: foo,
      icon: id,
      isActive: () => true,
      handler: () => undefined,
    },
  ];

  const WrappedComponent = ({ foo }: Props) => <span>{foo}</span>;

  const Test = withMenuOptions({ useGetMenuOptions })(WrappedComponent);

  it('passes props and context correctly to the getMenuOptions creator', () => {
    const ShowContextId = () => <span>{useEditContext().id}</span>;
    const originalId = shallow(<ShowContextId />).prop('children');
    const foo = Math.random().toString();
    const wrapper = shallow(<Test foo={foo} />);
    const options = wrapper.prop('getMenuOptions')();
    expect(options.length).toBe(1);
    expect(options[0].name).toBe(foo);
    expect(options[0].icon).toBe(originalId);
  });

  it('passes props correctly to the wrapped component', () => {
    const foo = Math.random().toString();
    const wrapper = shallow(<Test foo={foo} />);
    const wrapped = wrapper.find(WrappedComponent);
    expect(wrapped.prop('foo')).toBe(foo);
  });
});

describe('ContextProvider', () => {
  it('adds correct value prop and children to the context provider', () => {
    const option = {
      name: Math.random().toString(),
      icon: 'icon',
    };
    const getMenuOptions = () => [option];
    const name = Math.random().toString();
    const id = Math.random().toString();
    const children = Math.random().toString();
    const wrapper = shallow(
      <PageContextProvider getMenuOptions={getMenuOptions} name={name} id={id}>
        {children}
      </PageContextProvider>,
    );
    const value = wrapper.prop('value');
    expect(value.getMenuOptions().length).toBe(1);
    expect(value.getMenuOptions()[0].name).toBe(option.name);
    expect(value.name).toBe(name);
    expect(value.id).toBe(id);
    expect(wrapper.html()).toBe(children);
  });

  it('adds a new id if one is not provided', () => {
    const getMenuOptions = () => [];
    const ShowContextId = () => <span>{useEditContext().id}</span>;
    const originalId = shallow(<ShowContextId />).prop('children');
    const wrapper = shallow(
      <PageContextProvider getMenuOptions={getMenuOptions}>
        foo
      </PageContextProvider>,
    );
    const newId = wrapper.prop('value').id;
    expect(newId).not.toBe(originalId);
  });

  it('creates an id that persists across re-renders', () => {
    const ShowContextId = () => <span>{useEditContext().id}</span>;
    // Need to use mount in order for persistence hooks to function correctly
    // See https://github.com/airbnb/enzyme/issues/1938
    const wrapper = mount(
      <PageContextProvider getMenuOptions={() => []}>
        <ShowContextId />
      </PageContextProvider>,
    );
    const firstId = wrapper.find('span').text();
    wrapper.setProps({ name: 'foo' });
    const secondId = wrapper.find('span').text();
    expect(firstId).toBe(secondId);
  });
});
