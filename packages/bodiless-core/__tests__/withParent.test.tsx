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

import React, { ComponentType } from 'react';
import flow from 'lodash/flow';
import { mount } from 'enzyme';
import {
  designable,
  withDesign,
  Div,
  Span,
  withoutProps,
  addClasses,
  DesignableComponentsProps,
} from '@bodiless/fclasses';
import withParent from '../src/withParent';

describe('withParent', () => {
  it('wraps the given Child component with the provided Parent', () => {
    const Foo = flow(
      withoutProps('design'),
      withParent(Div),
    )(Span);
    const wrapper = mount(<Foo />);
    expect(wrapper.html()).toBe('<div><span></span></div>');
  });

  it('allows to update Parent component using the design api', () => {
    const Foo = flow(
      withoutProps('design'),
      withParent(Div),
      withDesign({
        Parent: addClasses('parentClass'),
      }),
    )(Span);

    const wrapper = mount(<Foo />);
    expect(wrapper.html()).toBe('<div class="parentClass"><span></span></div>');
  });

  it('does not impact other child design elements', () => {
    type FooComponents = { Child: ComponentType };
    type BaseFooProps = DesignableComponentsProps<FooComponents>;
    const BaseFoo = ({ components: C, ...rest }: BaseFooProps) => (<C.Child {...rest} />);
    const CleanFoo = designable<FooComponents>({
      Child: Span,
    })(BaseFoo);

    const Foo = flow(
      withParent(Div),
      withDesign({
        Child: addClasses('childClass'),
        Parent: addClasses('parentClass'),
      }),
    )(CleanFoo);

    const wrapper = mount(<Foo />);
    expect(wrapper.html()).toBe('<div class="parentClass"><span class="childClass"></span></div>');
  });

  it('allows to set a custom child design key name', () => {
    const Foo = flow(
      withoutProps('design'),
      withParent(Div, 'ParentComponent'),
      withDesign({
        ParentComponent: addClasses('parentClass'),
      }),
    )(Span);

    const wrapper = mount(<Foo />);
    expect(wrapper.html()).toBe('<div class="parentClass"><span></span></div>');
  });
});
