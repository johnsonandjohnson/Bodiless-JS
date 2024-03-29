/**
 * Copyright © 2021 Johnson & Johnson
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
// @ts-nocheck

import React, { ComponentType as CT, PropsWithChildren } from 'react';
import { mount } from 'enzyme';
import {
  designable,
  withDesign,
  Div,
  Span,
  addClasses,
  addProps,
  DesignableComponentsProps,
} from '@bodiless/fclasses';
import flow from 'lodash/flow';
import withChild from '../src/withChild';

type FooComponents = { Wrapper: CT };
const BaseFoo: CT<PropsWithChildren<DesignableComponentsProps<FooComponents>>> = (
  { components, children }
) => {
  const { Wrapper } = components;
  return (<Wrapper>{children}</Wrapper>);
};
const CleanFoo = designable<FooComponents>({
  Wrapper: Div,
})(BaseFoo);

describe('withChild', () => {
  it('adds a component to the given component as a child', () => {
    const Foo = withChild(Span)(CleanFoo);
    const wrapper = mount(<Foo />);
    expect(wrapper.html()).toBe('<div><span></span></div>');
  });
  it('allows to update child component using design api', () => {
    const Foo = flow(
      withChild(Span),
      withDesign({
        Child: addClasses('childClass'),
      }),
    )(CleanFoo);
    const wrapper = mount(<Foo />);
    expect(wrapper.html()).toBe('<div><span class="childClass"></span></div>');
  });
  it('does not impact other parent design elements', () => {
    const Foo = flow(
      withChild(Span),
      withDesign({
        Wrapper: addClasses('parentClass'),
      }),
    )(CleanFoo);
    const wrapper = mount(<Foo />);
    expect(wrapper.html()).toBe('<div class="parentClass"><span></span></div>');
  });
  it('allows to set a custom child design key name', () => {
    const Foo = flow(
      withChild(Span, 'TestChild'),
      withDesign({
        TestChild: addClasses('childClass'),
      }),
    )(CleanFoo);
    const wrapper = mount(<Foo />);
    expect(wrapper.html()).toBe('<div><span class="childClass"></span></div>');
  });
  it('does not allow updating child design on runtime', () => {
    const Foo = flow(
      withChild(Span),
      addProps({
        design: {
          Wrapper: addClasses('parentClass'),
          Child: addClasses('childClass'),
        },
      }),
    )(CleanFoo);
    const wrapper = mount(<Foo />);
    wrapper.setProps({
      design: {
        Wrapper: addClasses('parentClass2'),
        Child: addClasses('childClass2'),
      },
    });
    expect(wrapper.html()).toBe('<div class="parentClass"><span class="childClass"></span></div>');
  });
  it('preserves parent design', () => {
    const Foo = flow(
      withDesign({
        Wrapper: addClasses('parentClass1'),
      }),
      withChild(Span),
      withDesign({
        Wrapper: addClasses('parentClass2'),
      }),
    )(CleanFoo);
    const wrapper = mount(<Foo />);
    expect(wrapper.html()).toBe('<div class="parentClass2 parentClass1"><span></span></div>');
  });
  it('removes child design from parent design', () => {
    type BarComponents = { Wrapper: CT, Child: CT };
    const BaseBar: CT<PropsWithChildren<DesignableComponentsProps<BarComponents>>> = (
      { components, children }
    ) => {
      const { Wrapper, Child } = components;
      return (
        <Wrapper>
          <Child />
          {children}
        </Wrapper>
      );
    };
    const CleanBar = designable<BarComponents>({
      Wrapper: Div,
      Child: Div,
    })(BaseBar);
    const Bar = flow(
      withDesign({
        Child: addClasses('childClass1'),
      }),
      withChild(Span),
      withDesign({
        Child: addClasses('childClass2'),
      }),
    )(CleanBar);
    const wrapper = mount(<Bar />);
    expect(wrapper.html()).toBe('<div><div class="childClass1"></div><span class="childClass2"></span></div>');
  });
});
