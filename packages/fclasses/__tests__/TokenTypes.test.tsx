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

/* eslint-disable jest/expect-expect */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */

// NOTE: This file contains no functional tests, It is intended to test typescript
// inference and constraints only.

import React, { FC } from 'react';
import {
  Token, ComponentOrTag, asToken, Enhancer, Injector, flowIf,
} from '../src';
import { FormBodyProps } from '../../bodiless-tokens/node_modules/@bodiless/core/lib';

type BaseProps = {
  foo: string,
  bar: string,
};
const Base: FC<BaseProps> = () => null;

type Base2Props = {
  baz: string,
};
const Base2: FC<Base2Props> = () => null;

const Base3: FC<BaseProps & Base2Props> = () => null;

describe('Token', () => {
  const withChild = (Child: ComponentOrTag<any>): Token => C => {
    // Always define the enhanced component explicitly and give it a name
    // Webpack will ensure that
    const WithChild: FC<any> = props => <C {...props}><Child /></C>;
    return WithChild;
  };

  // A basic token with no type parameters will produce an enhanced component
  // whose props are the same as the base component:
  test('A generic token preserves the props signature of the base component', () => {
    const A1 = withChild('span')(Base); // ComponentWithMeta<Pick<BaseProps, "foo" | "bar">>
    const A1T1 = <A1 foo="foo" bar="bar" />;
    // @ts-expect-error missing prop bar
    const A1T2 = <A1 foo="foo" />;
    // @ts-expect-error prob baz is undefined
    const A1T3 = <A1 foo="foo" bar="bar" baz="baz" />;
  });

  test('Constraining the signature of the component to which a token can be applied', () => {
    const withLowercaseFoo: Token<BaseProps> = C => {
      const WithLowercaseFoo: FC<any> = (props: BaseProps) => {
        const { foo } = props;
        return <C {...props as any} foo={foo.toLowerCase()} />;
      };
      return WithLowercaseFoo;
    };
    // Constrained token applies properly a component which meets the constraint.
    const B1 = withLowercaseFoo(Base);
    const B1T1 = <B1 foo="foo" bar="bar" />;
    // @ts-expect-error property bar is missing
    const B1T2 = <B1 foo="foo" />;
    // @ts-expect-error Base2 not assignable to Base1
    const B2 = withLowercaseFoo(Base2);
    const B3 = withLowercaseFoo(Base3);
    // @ts-expect-error property baz is missing.
    const B3T1 = <B3 foo="foo" bar="bar" />;
    const B3T2 = <B3 foo="foo" bar="bar" baz="baz" />;
  });
});

describe('Enhancers', () => {
  type ToggleProps = { toggle: boolean };
  const withToggle: Enhancer<ToggleProps> = C => {
    const WithToggle: FC<any> = (props: ToggleProps) => {
      const { toggle } = props;
      return toggle ? <C {...props as any} /> : <></>;
    };
    return WithToggle;
  };

  test('An enhancer produces a component with an extended prop signature', () => {
    const C1 = withToggle(Base); // ComponentWithMeta<Pick<BaseProps, "foo" | "bar"> & ToggleProps>
    const C1T1 = <C1 toggle foo="foo" bar="bar" />;
    // @ts-expect-error prop baz does not exist
    const C1T2 = <C1 toggle foo="foo" bar="bar" baz="baz" />;
    // @ts-expect-error Missing props bar, toggle
    const C1T3 = <C1 foo="foo" bar="bar" />;
  });

  test('asToken propagates the type of an enhancer', () => {
    const C4 = asToken(withToggle)(Base);
    const C4T1 = <C4 toggle foo="foo" bar="bar" />;
    // @ts-expect-error prop baz does not exist
    const C4T2 = <C4 toggle foo="foo" bar="bar" baz="baz" />;
    // @ts-expect-error Missing props bar, toggle
    const C4T3 = <C4 foo="foo" />;
  });

  test('An enhncer can constrain types of the base', () => {
    const withToggledFoo: Enhancer<ToggleProps, BaseProps> = C => {
      const WithToggledFoo: FC<any> = props => {
        const { toggle, foo } = props as ToggleProps & BaseProps;
        return <C {...props} foo={toggle ? foo : ''} />;
      };
      return WithToggledFoo;
    };
    const C1 = withToggledFoo(Base); // ComponentWithMeta<Pick<BaseProps, "foo" | "bar"> & ToggleProps>
    const C1T1 = <C1 toggle foo="foo" bar="bar" />;
    // @ts-expect-error prop baz does not exist
    const C1T2 = <C1 toggle foo="foo" bar="bar" baz="baz" />;
    // @ts-expect-error Missing props bar, toggle
    const C1T3 = <C1 foo="foo" bar="bar" />;
    // @ts-expect-error Base2 is not assignable to Base
    const C2 = withToggledFoo(Base2);
  });
});

describe('Injectors', () => {
  type FooProps = Pick<BaseProps, 'foo'>;
  const withFoo = (value: string): Injector<FooProps> => C => {
    const WithFoo: FC<any> = props => <C {...props} foo={value} />;
    return WithFoo;
  };

  test('An injector makes injected props optional', () => {
    const D1 = withFoo('hello')(Base);
    // The original props can both still be supplied.
    const D1T1 = <D1 foo="foo" bar="bar" />;
    // But the injected prop is optional.
    const D1T2 = <D1 bar="bar" />;
    // @ts-expect-error the non-injected prop is still required.
    const D1T3 = <D1 foo="foo" />;
    // @ts-expect-error An undefined prop can't be supplied
    const D1T4 = <D1 baz="baz" />;
    // @ts-expect-error The token is constrained to a component which accepts injected props
    const D2 = withFoo('hello')(Base2);
    const D3 = withFoo('hello')(Base3);
    const Base4: FC<FooProps> = () => null;
    const D4 = withFoo('hello')(Base4);
  });

  test('An injector accepts additional prop constraints', () => {
    const injector:Injector<FooProps, Base2Props> = () => () => null;
    const R1 = injector(Base3);
    // Token applies to Base2 even though Base2 doesn't have "foo".  Why?
    const R2 = injector(Base2);
    // @ts-expect-error Does not apply to component which does not accept Base2Props
    const R3 = injector(Base);
  });
});

describe('Composed token type inference', () => {
  const generic: Token = () => () => null;
  const enhancer: Enhancer<Base2Props> = () => () => null;
  const injector: Injector<Pick<BaseProps, 'foo'>> = () => () => null;
  const constrainer: Token<BaseProps> = () => () => null;

  test('asToken correctly infers types when composing all token types', () => {
    const composed = asToken(
      constrainer,
      enhancer,
      injector,
      generic,
    );
    const R = composed(Base);
    // props of the base component and enhanced component are all accepted.
    const T1 = <R foo="foo" bar="bar" baz="baz" />;
    // Injected prop is not required.
    const T2 = <R bar="bar" baz="baz" />;
    // @ts-expect-error Enhanced prop is required
    const T3 = <R foo="foo" bar="bar" />;
    // @ts-expect-error Non-injected base prop is still required
    const T4 = <R foo="foo" baz="bar" />;
    // @ts-expect-error Token is constrained by constraint of first token
    const R2 = composed(Base2);
  });

  test('flowIf correctly infers type based on the condition hook', () => {
    type ConditionProps = {
      test: boolean,
    };
    const useCondition = (props: ConditionProps) => props.test;
    const composed = flowIf(useCondition)(
      generic,
    );
    const R = composed(Base);
    // @ts-expect-error property "test" is missing
    const T1 = <R foo="foo" bar="bar" />;

    // Condition props can be explicitly typed.
    const flowIfTest = flowIf<ConditionProps>(({ test }) => test);
    const R1 = flowIfTest(generic)(Base2);
    // @ts-expect-error property "test" is missing
    const T2 = <R foo="foo" bar="bar" />;
  });
});
