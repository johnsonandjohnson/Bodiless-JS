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

/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { ComponentType, FC, HTMLProps } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount, shallow } from 'enzyme';
import { identity, flow, omit } from 'lodash';
import {
  DesignableComponentsProps, Span, designable, Div, addClasses, removeClasses,
  withDesign, HOC, flowHoc, flowIf, withoutProps,
  asTokenSpec, as, extendMeta, $TokenSpec, ComponentOrTag,
} from '../src';

const defaultDomains = {
  Core: {},
  Analytics: {},
  SEO: {},
  Components: {},
  Layout: {},
  Spacing: {},
  Theme: {},
  Content: {},
  Behavior: {},
  Schema: {},
};

type TestComponents = {
  A: ComponentType<any>,
  B: ComponentType<any>,
  ABBA: ComponentType<any>,
};

const TestComponents: TestComponents = {
  A: Span,
  B: Span,
  ABBA: Span,
};

const TestBase: FC<DesignableComponentsProps<TestComponents>> = ({ components: C, ...rest }) => (
  <Div id="test-wrapper" {...rest}>
    <C.A id="test-a" />
    <C.B id="test-b" />
  </Div>
);

const TestClean = designable(TestComponents)(TestBase);

const asTestTokenSpec = asTokenSpec<TestComponents, typeof defaultDomains>(defaultDomains);

describe('extendMeta', () => {
  it('Merges categories properly', () => {
    const foobar = flowHoc.meta.term('Foo')('Bar');
    const foobaz = flowHoc.meta.term('Foo')('Baz');
    const bingbang = flowHoc.meta.term('Bing')('Bang');
    const test = extendMeta(foobar, foobaz, bingbang);
    expect(test).toEqual({
      categories: {
        Foo: ['Bar', 'Baz'],
        Bing: ['Bang'],
      },
    });
  });
  // eslint-disable-next-line jest/expect-expect
  it('Does not allow non-token meta arguments', () => {
    // @ts-expect-error
    extendMeta({ Foo: 'Bar'});
    // @ts-expect-error
    extendMeta({ Categories: { Foo: 'Bar' }});
  });
  it('Overrides non-category keys', () => {
    const test = extendMeta({ title: 'Foo' }, { title: 'Bar' });
    expect(test).toEqual({ title: 'Bar' });
  });
});

describe('asTokenSpec', () => {
  it('Supplies core domain by default', () => {
    const test = asTokenSpec()({
      Meta: {
        title: 'Test',
      },
    });
    expect(test.Core).toBeDefined();
    // Check that core domain and default domains are allowed
    const test1 = asTokenSpec()({
      Core: {
        _: 'test',
      },
      Flow: flowHoc,
      Compose: {},
    });
    // Check that other domains are disalloed.
    const test2 = asTokenSpec()({
      // @ts-expect-error
      Theme: {
        _: 'test',
      },
    });
  });

  it('Assigns HOCs to core domain', () => {
    const hoc: HOC<any> = C => props => <C {...props} foo="bar" />;
    const H = asTestTokenSpec(hoc);
    const hoc$ = H.Core._ as HOC<any>;
    const Div: ComponentOrTag<HTMLProps<HTMLDivElement>> = 'div';
    const D1 = hoc(Div);
    const D2 = hoc$(Div);
    const w1 = mount(<D1 id="d1" />);
    expect(w1.find('div#d1').prop('foo')).toBe('bar');
    const w2 = mount(<D2 id="d2" />);
    expect(w2.find('div#d2').prop('foo')).toBe('bar');
  });

  it('Assigns strings to core domain', () => {
    const H = asTestTokenSpec('foo');
    expect(H.Core._).toBe('foo');
  });

  it('Does not alter tokens when extending them', () => {
    const Inner1 = asTestTokenSpec({
      Core: {
        _: 'foo'
      },
    });
    const Inner1Snap = JSON.stringify(Inner1);
    const Inner2 = asTestTokenSpec({
      Core: {
        _: 'foo'
      },
    });
    const Inner2Snap = JSON.stringify(Inner2);
    const Outer1 = asTestTokenSpec({
      Core: {
        _: Inner1,
      }
    });
    const Outer1Snap = JSON.stringify(Outer1);
    const Outer2 = asTestTokenSpec({
      Core: {
        _: Inner2,
      }
    });
    const Outer2Snap = JSON.stringify(Outer2);
    const final = asTestTokenSpec(Outer1, Outer2);
    console.log(Outer1, Outer2, final);
    expect(JSON.stringify(Outer1)).toEqual(Outer1Snap);
    expect(JSON.stringify(Outer2)).toEqual(Outer2Snap);
    expect(JSON.stringify(Inner1)).toEqual(Inner1Snap);
    expect(JSON.stringify(Inner2)).toEqual(Inner2Snap);
  });
  it('Provides missing domains', () => {
    const test = asTestTokenSpec({
      Behavior: {
        A: 'foo',
      }
    });
    expect(Object.keys(test)).toEqual([
      ...Object.keys(defaultDomains),
      'Compose', 'Flow', 'Meta',
    ]);
    Object.keys(omit(test, 'Flow', 'Behavior')).forEach(
      k => expect(test[k as keyof typeof test]).toEqual({})
    );
    expect(test.Flow).toBeUndefined();
    expect(test.Behavior).toEqual({ A: 'foo' });
  });

  it('Properly merges nested tokens', () => {
    const nested = asTestTokenSpec({
      Layout: {
        _: 'bar',
      },
    });
    const a = {
      Core: {
        A: 'foo',
      },
    };
    const b = {
      Layout: {
        A: nested,
        B: nested,
      },
    };
    const token = asTestTokenSpec(a, b);
    const Test = as(token)(TestClean);
    const wrapper = mount(<Test />);
    expect(wrapper.find('span#test-a').prop('className')).toBe('bar foo');
    expect(wrapper.find('span#test-b').prop('className')).toBe('bar');
  });

  it('Adds the $TokenSpec property', () => {
    const t = asTestTokenSpec({ Core: { _: 'foo' } });
    expect(t[$TokenSpec]).toBeTruthy();
  });

  // eslint-disable-next-line jest/expect-expect
  it('Type checks reserved domains', () => {
    asTestTokenSpec({
      Meta: { title: 'Foo '}
    });
    asTestTokenSpec({
      // @ts-expect-error
      Meta: { foo: 'Bar' }
    });
    asTokenSpec()({
      Meta: { title: 'Foo '}
    });
    asTokenSpec()({
      // @ts-expect-error
      Meta: { foo: 'Bar' }
    });
  });

  // eslint-disable-next-line jest/expect-expect
  it('Does not allow invalid domains', () => {
    asTestTokenSpec({
      // @ts-expect-error
      Foo: 'bar',
    });
  });
  // eslint-disable-next-line jest/expect-expect
  it('does not accept a design in the Meta key', () => {
    asTestTokenSpec({
      Meta: {
        // @ts-expect-error
        A: 'foo',
      },
    });
  });
  // eslint-disable-next-line jest/expect-expect
  it('does not accept invalid design keys', () => {
    asTestTokenSpec({
      Core: {
        _: 'foo',
        A: 'bar',
        B: 'baz',
        // @ts-expect-error
        C: 'bing',
      },
    });
  });
});

describe('extend', () => {
  const Left = asTestTokenSpec({
    Layout: {
      B: 'b',
    },
    Theme: {
      B: 'b2',
    },
  });
  const Right = asTestTokenSpec({
    Layout: {
      B: 'b1',
      A: 'a',
    },
    Spacing: {
      A: 'a2',
    },
  });
  const Test = asTestTokenSpec(Left, Right);
  const Expected = asTestTokenSpec({
    Layout: {
      B: as('b', 'b1'),
      A: 'a',
    },
    Theme: {
      B: 'b2',
    },
    Spacing: {
      A: 'a2',
    },
  });
  // Testing returned type.
  Test.Layout;
  Test.Theme;
  Test.Spacing;
  // @ts-expect-error
  Test.Bing;
  Test?.Layout?.A;
  Test?.Layout?.B;
  // @ts-expect-error
  Test.Layout.Blip;
  it('propagates outer keys in expected order', () => {
    expect(Object.keys(Test)).toEqual(Object.keys(Expected));
  });
  it('Combines non intersecteing keys in the correct order', () => {
    expect(Object.keys(Test.Layout||{})).toEqual(Object.keys(Expected.Layout||{}));
    expect(Test.Layout!.A).toEqual(Expected.Layout!.A);
    expect(Test.Spacing).toEqual(Expected.Spacing);
    expect(Test.Theme).toEqual(Expected.Theme);
  });
  it('Combines matching keys into a single token', () => {
    const SpanExpected = as(Expected.Layout!.B)(Span);
    const SpanTest = as(Test?.Layout?.B)(Span);
    const expected = shallow(<SpanExpected />);
    const test = shallow(<SpanTest />);
    expect(test.html()).toEqual(expected.html());
  });
  it('Combines conditions properly', () => {
    const Foo = asTestTokenSpec({
      Core: {
        _: withoutProps('foo'),
      },
      Flow: flowIf(({ foo }: any) => Boolean(foo)),
      Compose: {
        Foo: asTestTokenSpec({ Core: { A: 'foo' } }),
      },
    });
    const T1 = as(Foo)(TestClean);
    const w1 = mount(<T1 foo />);
    expect(w1.find('span#test-a').prop('className')).toEqual('foo');

    const Bar = asTestTokenSpec({
      Flow: flowIf(({ bar }: any) => Boolean(bar)),
    });
    const FooBar = asTestTokenSpec(Foo, Bar);
    const T = as(FooBar)(TestClean);

    const wrapper = mount(<T foo />);
    expect(wrapper.find('span#test-a').prop('className')).toBeUndefined();
  });

  it('Combines metadata properly', () => {
    const A = asTestTokenSpec({ Meta: flowHoc.meta.term('Foo')('Bar') });
    const B = asTestTokenSpec({ Meta: flowHoc.meta.term('Foo')('Baz') });
    const C = asTestTokenSpec({ Meta: { title: 'Title' }});
    const Test = asTestTokenSpec(A, B, C);
    expect(Test).toEqual(asTestTokenSpec({
      Meta: {
        title: 'Title',
        categories: {
          Foo: ['Bar', 'Baz'],
        },
      },
    }));
  });
});

describe('as', () => {
  it('Requires a true token spec object', () => {
    const invalidTs = { Core: { _: 'bing' } };
    // @ts-expect-error
    expect(() => as(invalidTs)).toThrow();
    const validTs = asTestTokenSpec(invalidTs);
    as(validTs);
  });

  it('Applies a condition properly', () => {
    const Test = asTestTokenSpec({
      Flow: flowIf(({ doIt }: any) => Boolean(doIt)),
      Core: {
        _: withoutProps('doIt'),
      },
      Theme: {
        _: 'foo',
      },
    });
    const TestC = as(Test)(TestClean);
    const test = mount(<TestC doIt />);
    expect(test.find('div#test-wrapper').prop('className')).toBe('foo');
    const test1 = mount(<TestC />);
    expect(test1.find('div#test-wrapper').prop('className')).toBeUndefined();
  });

  it('Removes classes applied by an external design', () => {
    const withClass = withDesign({
      A: addClasses('bar'),
    }) as HOC;
    const spec = asTestTokenSpec({
      Core: {
        _: withClass,
      },
      Theme: {
        A: as(removeClasses('bar'), addClasses('baz')),
      },
    });
    const Test = as(spec)(TestClean);
    const wrapper = mount(<Test />);
    expect(wrapper.find('span#test-a').prop('className')).toBe('baz');
  });

  it('Aggregates clases from multiple domains in the correct order', () => {
    const spec = asTestTokenSpec({
      Theme: {
        _: 'foo',
        A: 'bar',
      },
      Layout: {
        _: 'foo2',
        A: 'bar2',
      },
    });
    const Test = as(spec)(TestClean);
    const wrapper = mount(<Test />);
    expect(wrapper.find('div#test-wrapper').prop('className')).toBe('foo foo2');
    expect(wrapper.find('span#test-a').prop('className')).toBe('bar bar2');
  });

  it('Applies classes to the whole component and to individual elements', () => {
    const spec = asTestTokenSpec({
      Core: {
        _: 'foo',
        A: 'bar',
      },
    });
    const Test = as(spec)(TestClean);
    const wrapper = mount(<Test />);
    expect(wrapper.find('div#test-wrapper').prop('className')).toBe('foo');
    expect(wrapper.find('span#test-a').prop('className')).toBe('bar');
    expect(wrapper.find('span#test-b').prop('className')).toBeUndefined();
  });
});
