/**
 * Copyright © 2022 Johnson & Johnson
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
import {
  HOC, Div, Fragment, replaceWith
} from '@bodiless/fclasses';
import { mount } from 'enzyme';
import { DesignableComponents } from '@bodiless/fclasses/src';
import {
  SelectorComponents, withDirection, useSelectorComponents, SelectorComponentsProps
} from '../../src';

const addTitle = (t: string): HOC => Component => props => <Component {...props} title={t} />;
const addId = (id: string): HOC => Component => props => <Component {...props} id={id} />;

describe('useSelectorComponents', () => {
  it('Does not regenerate comonents across renders', () => {
    let componentsToCheck: DesignableComponents = {};
    const Test = (props: Partial<SelectorComponentsProps>) => {
      componentsToCheck = useSelectorComponents(props).components;
      return null;
    };
    const Foo = () => <>Foo</>;
    const Bar = () => <>Bar</>;
    const design = {
      Foo: replaceWith(Foo),
      Bar: replaceWith(Bar),
    };
    const wrapper = mount(<Test design={design} />);
    expect(componentsToCheck).toEqual({});
    wrapper.setProps({ design, selectedComponents: ['Foo'] });
    const check = { ...componentsToCheck };
    wrapper.setProps({ design, selectedComponents: ['Foo', 'Bar'] });
    expect(componentsToCheck.Foo).toBe(check.Foo);
  });
});

describe('SelectorComponents', () => {
  const design = {
    Foo: addId('foo'),
    Bar: addId('bar'),
    Baz: addId('baz'),
  };

  it('Returns all components as selectable', () => {
    const test = new SelectorComponents({
      design,
      selectedComponents: ['Foo']
    });
    expect(Object.keys(test.selectableComponents)).toEqual(Object.keys(design));
  });

  it('Returns only selected components', () => {
    const test = new SelectorComponents({
      design,
      selectedComponents: ['Foo']
    });
    expect(Object.keys(test.components)).toEqual(['Foo']);
  });

  it('Returns all components when start components is specified', () => {
    const test = new SelectorComponents({
      design,
      startComponents: {
        Bar: Fragment,
        Baz: Fragment,
      },
      selectedComponents: ['Foo'],
    });
    expect(Object.keys(test.components)).toEqual(['Foo']);
  });

  it('Returns all selectableComponents when start components is specified', () => {
    const test = new SelectorComponents({
      design,
      startComponents: {
        Bar: Fragment,
        Baz: Fragment,
      },
      selectedComponents: ['Foo'],
    });
    expect(Object.keys(test.selectableComponents)).toEqual(['Foo', 'Bar', 'Baz']);
  });

  it('Uses the default component when no startComponents are specified', () => {
    const test = new SelectorComponents({
      design,
      selectedComponents: ['Foo'],
      DefaultComponent: addTitle('base')('div'),
    });
    const S = test.selectableComponents;
    let wrapper = mount(
      <>
        <S.Foo />
        <S.Bar />
        <S.Baz />
      </>
    );
    ['foo', 'bar', 'baz'].forEach(
      id => expect(wrapper.find(`div#${id}`).prop('title')).toEqual('base'),
    );
    const C = test.components;
    wrapper = mount(<C.Foo />);
    expect(wrapper.find('div#foo').prop('title')).toEqual('base');
  });

  it('Uses startComponents when specified', () => {
    const test = new SelectorComponents({
      design,
      selectedComponents: ['Foo'],
      DefaultComponent: addTitle('base')('div'),
      startComponents: {
        Foo: addTitle('foo-base')('div'),
        Bar: addTitle('bar-base')('div'),
      },
    });
    const C = test.components;
    let wrapper = mount(<C.Foo />);
    expect(wrapper.find('div#foo').prop('title')).toEqual('foo-base');
    const S = test.selectableComponents;
    wrapper = mount(
      <>
        <S.Foo />
        <S.Bar />
        <S.Baz />
      </>
    );
    expect(wrapper.find('div#foo').prop('title')).toEqual('foo-base');
    expect(wrapper.find('div#bar').prop('title')).toEqual('bar-base');
    expect(wrapper.find('div#baz').prop('title')).toEqual('base');
  });

  it('Does not invoke unnecessary designs until selectableComponents is accessed', () => {
    const mockDesign = {
      Foo: jest.fn((c: any) => c),
      Bar: jest.fn((c: any) => c),
      Baz: jest.fn((c: any) => c),
    };
    const test = new SelectorComponents({
      design: mockDesign,
      selectedComponents: ['Foo'],
    });
    const { components } = test;
    expect(mockDesign.Foo).toHaveBeenCalledTimes(1);
    expect(mockDesign.Bar).not.toHaveBeenCalled();
    expect(mockDesign.Baz).not.toHaveBeenCalled();
    const { selectableComponents } = test;
    expect(mockDesign.Foo).toHaveBeenCalledTimes(2);
    expect(mockDesign.Bar).toHaveBeenCalledTimes(1);
    expect(mockDesign.Baz).toHaveBeenCalledTimes(1);
  });
});
