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

/* eslint-disable jest/expect-expect */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  $TokenSpec,
  as,
  ComponentOrTag, DesignableComponents, flowHoc,
  asTokenSpec,
} from '../src';

// This version procies autocomplete, but does not
// tupe check properties on creted token
// const factory$$ = <
//   C extends DesignableComponents,
//   D extends Domains<C>,
// >() => (
//     s: Partial<D & ReservedDomains<C, D>>,
//   ): typeof s & { [$TokenSpec]: true } => s as any;

// This version provides autocomplete, but allows invalid
// domains when a valid domain is present.
// const factory$$$ = <
//   C extends DesignableComponents,
//   D extends Domains<C>,
// >() => <S extends Partial<D & ReservedDomains<C, D>>>(
//     // s: Pick<FinalDomains<C, D>, K>
//     // s: { [k in K]: Design<C> }
//     s: S,
//   ): S & { [$TokenSpec]: true } => s as any;

// This version allows invalid domains when a valid domain
// is also present (incorrect);
// const factory$ = <
//   C extends DesignableComponents,
//   D extends object,
// >() => <K extends keyof D>(
//     // s: { [k in K]: Design<C> }
//     s: Partial<{ [k in K]: FinalDesign<C> }> & ReservedDomains<C, D>
//     // s: Partial<Record<K, Design<C>> & ReservedDomains<C, D>>
//   ): typeof s & { [$TokenSpec]: true } => s as any;
// const asTokenSpec = <
//   C extends DesignableComponents,
//   D extends object,
// >(domains?: D): AsTokenSpec<C, D> => (...args) => args[0] as any;

// ***********************************************************************
// *************** TESTS

type TestD = {
  Theme?: any,
  Layout?: any,
};

const testDomains: TestD = {
  Theme: {},
  Layout: {},
};

/**
 * This is how a specific design system would override asTokenSpec
 * to use its predefined set of domains.
 */
const asTestTokenSpec = <
  C extends DesignableComponents
>() => asTokenSpec<C, TestD>(testDomains);

describe('Fixed type tokens', () => {
  type TestC = {
    Wrapper: ComponentOrTag<any>,
    Text: ComponentOrTag<any>,
  };
  const asTestToken = asTestTokenSpec<TestC>();
  const t = asTestToken({
    Theme: {},
    Meta: {},
  });

  // Creates a token which can be passed to as
  as(t);

  // Creates a token with known properties
  t.Meta;
  t.Theme;
  t.Layout;
  // @ts-expect-error Globally undefined domain
  t.Foo;

  // Allows all valid domains
  asTestToken({
    Theme: {},
    Layout: {},
    Meta: {},
    Compose: {},
    Flow: flowHoc,
  });

  // Allows a subset of valid domains
  asTestToken({
    Theme: {},
  });

  // Does not allow invalid domains
  asTestToken({
  // @ts-expect-error
    Foo: {},
  });

  // Does not allow invalid design keys
  asTestToken({
    Layout: {
    // @ts-expect-error
      Foo: 'foo',
    },
  });

  // Allows all meta properties
  asTestToken({
    Meta: { title: 'foo', categories: { bar: ['baz'] }, description: 'd' },
  });

  // Does not allow invalid meta
  asTestToken({
  // @ts-expect-error
    Meta: { foo: 'bar' }
  });

  // Does not allow invalid Flow
  asTestToken({
  // @ts-expect-error
    Flow: 'foo',
  });

  // Enforces that token specs in compose must have $TokenSpec identifier.
  asTestToken({
    Compose: {
    // @ts-expect-error
      Composed: {
        Theme: {
          _: 'foo',
        },
      }
    },
  });

  // Enforces that tokens in Compose must have correct design keys.
  asTestToken({
    Compose: {
      Composed: {
        [$TokenSpec]: true,
        Theme: {
          _: 'wrapper',
          // @ts-expect-error
          Foo: 'foo',
        },
      },
    },
  });

  // Enforces that tokens in Compose must have correct domains.
  asTestToken({
    Compose: {
      Composed: {
        [$TokenSpec]: true,
        // @ts-expect-error Invalid domain
        Foo: {
          _: 'foo',
        },
      },
    },
  });

  // Enforces that compose is an object
  asTestToken({
  // @ts-expect-error
    Compose: 'foo',
  });

  // Accepts a string token in compos4
  asTestToken({
    Compose: {
      Composed: 'foo',
    },
  });

  // Does not allow invalid domains even when one valid domain present
  asTestToken({
    Layout: {},
    // @ts-expect-error
    Foo: {},
  });

  // Does not allow invalid design keys even when one valid key is present
  asTestToken({
    Layout: {
      _: 'foo',
      // @ts-expect-error
      Foo: 'foo',
    },
  });

  const Base = asTestToken({
    Theme: {
      _: 'Foo',
    },
    Layout: {
      _: 'foo',
      Wrapper: 'foo',
      Text: 'bar',
    },
  });

  // Allows extension of a domain
  const Extended = asTestToken({
    ...Base,
    Layout: {
      ...Base.Layout,
      Wrapper: 'baz',
    },
  });
});

describe('fluid tokens', () => {
  const asTestToken = asTestTokenSpec<any>();
  const t = asTestToken({
    Theme: {},
    Meta: {},
  });

  // Creates a token which can be passed to as
  it('creates a token which can be passed to as', () => {
    as(t);
  });

  // Creates a token with known properties
  t.Meta;
  t.Theme;
  t.Layout;
  // @ts-expect-error Globally undefined domain
  t.Foo;

  // Allows all valid domains
  asTestToken({
    Theme: {},
    Layout: {},
    Meta: {},
    Compose: {},
    Flow: flowHoc,
  });

  // Allows a subset of valid domains
  asTestToken({
    Theme: {},
  });

  // Does not allow invalid domains
  asTestToken({
  // @ts-expect-error
    Foo: {},
  });

  // ALlows any design keys.
  asTestToken({
    Layout: {
      Foo: 'foo',
      Bar: 'bar',
    },
  });

  // Allows all meta properties
  asTestToken({
    Meta: { title: 'foo', categories: { bar: ['baz'] }, description: 'd' },
  });

  // Does not allow invalid meta
  asTestToken({
  // @ts-expect-error
    Meta: { foo: 'bar' }
  });

  // Does not allow invalid Flow
  asTestToken({
  // @ts-expect-error
    Flow: 'foo',
  });

  // Enforces that token specs in compose must have $TokenSpec identifier.
  asTestToken({
    Compose: {
    // @ts-expect-error
      Composed: {
        Theme: {
          _: 'foo',
        },
      }
    },
  });

  // Does not allow partial domains in compose
  asTestToken({
    Compose: {
      // @ts-expect-error
      Composed: {
        [$TokenSpec]: true,
        Theme: {
          _: 'wrapper',
          Foo: 'foo',
          Bar: 'Bar',
        },
      },
    },
  });

  // Enforces that tokens in Compose must have correct domains.
  asTestToken({
    Compose: {
      Composed: {
        [$TokenSpec]: true,
        // @ts-expect-error Invalid domain
        Foo: {
          _: 'foo',
        },
      },
    },
  });

  // Enforces that compose is an object
  asTestToken({
  // @ts-expect-error
    Compose: 'foo',
  });

  // Accepts a string token in compos4
  asTestToken({
    Compose: {
      Composed: 'foo',
    },
  });

  // Does not allow invalid domains even when one valid domain present
  asTestToken({
    Layout: {},
    // @ts-expect-error
    Foo: {},
  });

  // Allows any design keys even when _ is present.
  asTestToken({
    Layout: {
      _: 'foo',
      Foo: 'foo',
      Bar: 'bar',
    },
  });

  const Base = asTestToken({
    Layout: {
      Foo: 'foo',
      Bar: 'bar',
    },
  });

  // Allows extension of a domain
  const Extended = asTestToken({
    Layout: {
      ...Base.Layout,
      Baz: 'foo1',
    },
  });
});
