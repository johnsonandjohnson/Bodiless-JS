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

// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';
import React, { ComponentType, FC } from 'react';

import { omit, flow } from 'lodash';
import {
  withDesign,
  DesignableProps,
  Design,
  extendDesignable,
  DesignableComponentsProps,
  designable,
  withFinalDesign,
} from '../src/Design';
import { withShowDesignKeys } from '../src';

type SpanType = ComponentType<any>;
type MyDesignableComponents = {
  foo: SpanType,
  bar: SpanType,
  baz: SpanType,
};
type MyDesign = Design<MyDesignableComponents>;

const Span: SpanType = props => <span {...props} />;
const hoc = (newClassName: string) => (C: SpanType):SpanType => props => {
  const { className = '', ...rest } = props;
  const combinedClassName = `${className} ${newClassName}`.trim();
  return <C className={combinedClassName} {...rest} />;
};
const myStartComponents = {
  foo: Span as SpanType,
  bar: Span as SpanType,
  baz: Span as SpanType,
};

const DesignPrinter: FC<DesignableProps<MyDesignableComponents>> = ({ design }) => {
  const components = { ...myStartComponents };
  if (design) {
    if (design.foo) {
      components.foo = design.foo(components.foo);
    }
    if (design.bar) {
      components.bar = design.bar(components.bar);
    }
    if (design.baz) {
      components.baz = design.baz(components.baz);
    }
  }
  const Foo = components.foo;
  const Bar = components.bar;
  const Baz = components.baz;
  return (
    <div>
      <Foo id="foo" />
      <Bar id="bar" />
      <Baz id="baz" />
    </div>
  );
};

describe('extendDesignable', () => {
  const Test$: FC<any> = ({ design }: { design: { [key: string]: () => Function } }) => (
    <span id="test">
      {design ? Object.values(design).map(h => h()()) : 'no design'}
    </span>
  );
  const design = {
    foo: () => () => <span key="foo">foo</span>,
    bar: () => () => <span key="bar">bar</span>,
  };

  it('Passes a design through to an underlying component', () => {
    const Test = extendDesignable()({})(Test$);
    const wrapper = mount(<Test design={design} />);
    expect(wrapper.text()).toBe('foobar');
  });

  it('Strips the design when a transformer returns undefind', () => {
    const Test = extendDesignable(() => undefined)({})(Test$);
    const wrapper = mount(<Test design={design} />);
    expect(wrapper.text()).toBe('no design');
  });
  it('Removes keys from the design correctly', () => {
    const Test = extendDesignable((d: any) => omit(d, 'foo'))({})(Test$);
    const wrapper = mount(<Test design={design} />);
    expect(wrapper.text()).toBe('bar');
  });
});

describe('withDesign', () => {
  it('applies a design correctly', () => {
    const inner: MyDesign = {
      foo: hoc('innerA'),
      bar: hoc('innerB'),
    };
    const outer: MyDesign = {
      foo: hoc('outerC'),
      bar: hoc('outerD'),
      baz: hoc('outerE'),
    };
    const Test = withDesign(inner)(DesignPrinter);
    const wrapper = mount(<Test />);
    expect(wrapper.find('#foo').last().props().className).toBe('innerA');
    expect(wrapper.find('#bar').last().props().className).toBe('innerB');
    const Test1 = withDesign(outer)(Test);
    const wrapper1 = mount(<Test1 />);
    // have to use last() because each hoc adds a component that is found
    expect(wrapper1.find('#foo').last().props().className).toBe('outerC innerA');
    expect(wrapper1.find('#bar').last().props().className).toBe('outerD innerB');
    expect(wrapper1.find('#baz').last().props().className).toBe('outerE');
  });
});

describe('withFinalDesign', () => {
  it('Applies a final design finally', () => {
    type Components = {
      Foo: ComponentType<any>,
    };
    const startComponents: Components = {
      Foo: (props: any) => <span id="foo" {...props} />,
    };
    const Test$: FC<DesignableComponentsProps<Components>> = (
      { components, ...rest },
    ) => {
      const { Foo } = components;
      return <Foo {...rest} />;
    };
    const baseDesign = { Foo: hoc('base') };
    const nextDesign = { Foo: hoc('next') };
    const innerFinal = { Foo: hoc('inner-final') };
    const outerFinal = { Foo: hoc('outer-final') };
    const Test = flow(
      designable(startComponents),
      withFinalDesign(innerFinal),
      withDesign(baseDesign),
      withFinalDesign(outerFinal),
      withDesign(nextDesign),
    )(Test$);
    const wrapper = mount(<Test />);
    expect(wrapper.find('span#foo').prop('className'))
      .toBe('outer-final inner-final next base');
  });
});

describe('withShowDesignKeys', () => {
  const Base = ({ components }: any) => {
    const { Foo, Bar } = components;
    return <Foo><Bar /></Foo>;
  };
  const startComponents = {
    Foo: (props: any) => <span id="foo" {...props} />,
    Bar: (props: any) => <span id="bar" {...props} />,
  };
  it('Adds design keys when enabled', () => {
    const Test: ComponentType<any> = flow(
      designable(startComponents, 'Base'),
      withShowDesignKeys(),
    )(Base);
    const wrapper = mount(<Test />);
    expect(wrapper.find('span#foo').prop('data-bl-design-key')).toBe('Base:Foo');
    expect(wrapper.find('span#bar').prop('data-bl-design-key')).toBe('Base:Bar');
  });
  it('Does not add a design keys when disabled', () => {
    const Test: ComponentType<any> = flow(
      designable(startComponents, 'Base'),
      withShowDesignKeys(false),
    )(Base);
    const wrapper = mount(<Test />);
    expect(wrapper.find('span#foo').prop('data-bl-design-key')).toBeUndefined();
    expect(wrapper.find('span#bar').prop('data-bl-design-key')).toBeUndefined();
  });
});
