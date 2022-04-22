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

import mergeWith from 'lodash/mergeWith';
import flow from 'lodash/flow';
import { ComponentType } from 'react';
import { startWith } from './replaceable';
import type {
  TokenDef,
  DesignableComponents, HocDesign,
  ReservedDomains, Design, Token, HOCBase, HOD, AsTokenSpec, FinalDesign, TokenSpec, FinalDomains,
} from './types';
import { $TokenSpec } from './types';
import { flowHoc, extendMeta } from './flowHoc';
import { addClasses } from './addClasses';
import { withHocDesign } from './withHocDesign';

/**
 * @private
 * Converts a domain into an HOC which applies the extended design defined
 * by that domain.  Properly handles special domain names ('Flow',
 * 'Compose' and 'Meta').
 *
 * @param domainName
 * @param domain
 */
function getHocForDomain<C extends DesignableComponents, D extends object = any>(
  domainName: string,
  domain?: FinalDesign<C> | ReservedDomains<C, any>['Meta'] | ReservedDomains<C, any>['Flow'] | ReservedDomains<C, any>['Compose']
): TokenDef | undefined {
  if (!domain) return undefined;
  if (domainName === 'Flow') return undefined;
  if (domainName === 'Meta') return Array.isArray(domain) ? extendMeta(...domain) : domain;
  if (domainName === 'Compose') {
    const compose = domain as Required<ReservedDomains<any, any>>['Compose'];
    const toks = Object.values(compose);
    return as(...toks);
  }
  return withDesign(domain as Design<C, D>);
}

/**
 * Converts a list of token into an HOC which can be applied to
 * a component. Tokens to apply may be expressed in token object notation, as HOC's
 * or as className strings.
 *
 * @param specs
 * A list of token to be composed.
 *
 * @returns
 * An HOC which can be applied to a component.
 */
function as(
  ...args$: Token[]

): HOCBase<any, any, any> {
  const args = args$.filter(Boolean);

  // Ensure that all token specs have been passed through `asTokenSpec`
  args.forEach(a => {
    if (typeof a !== 'function' && typeof a !== 'string' && !a![$TokenSpec]) {
      // @todo add some debugging info here - token domains names, token meta if any, etc.
      throw new Error('All token specifications passed to "as" must be created by a version of "asTokenSpec"');
    }
  });

  const tokens: TokenDef[] = args.map(arg => {
    if (typeof arg === 'function' || typeof arg === 'undefined') return arg;
    if (typeof arg === 'string') return addClasses(arg);
    const specTokens: TokenDef[] = [];
    // Use keys of the base token spec to ensure correct order of domains.
    // const keys = [
    //   ...Object.getOwnPropertyNames(omit(arg, 'Meta', 'Compose', 'Flow')),
    //   'Meta',
    //   'Compose',
    //   'Flow',
    // ];
    const keys = Object.getOwnPropertyNames(arg);
    specTokens.push(...keys
      .map(domainName => getHocForDomain(
        domainName,
        arg[domainName as keyof Omit<typeof arg, typeof $TokenSpec>],
      )));

    if (arg.Flow) {
      return arg.Flow(...specTokens);
    }
    return flowHoc(...specTokens);
  });
  return flowHoc(...tokens);
}

/**
 * Applies a design to a component.
 *
 * @param design
 * The design to apply.
 *
 * @returns
 * An hoc which applies the design.
 */
function withDesign<C extends DesignableComponents = any, D extends object = any>(
  design: Design<C, D>
): HOCBase {
  const hocDesign: HocDesign<C> = Object.keys(design)
    .filter(k => k !== '_')
    .reduce(
      (d, k) => ({
        ...d,
        [k]: as(design[k]),
      }),
      {} as HocDesign<any>
    );
  return flowHoc(
    as(design._) as HOCBase,
    withHocDesign(hocDesign)
  );
  // return withHocDesign(hocDesign);
}

/**
 * @private
 * Customizer for merging two token specifications.
 */
const tokenMergeCustomizer = (...args: any) => {
  const stack = args[5];
  const [a, b, key] = args;
  if (stack.size === 0) {
    if (key === 'Meta') return extendMeta(a, b);
    if (key === 'Flow') {
      if (a && b) return flow(a, b);
      if (a) return a;
      if (b) return b;
    }
    return undefined;
  }
  if (!a) return b;
  if (!b) return a;
  return as(a, b);
};

/**
 * Utility to extend a domain value. The final domain will contain the union of
 * keys from all merged designs. In the case where two or more designs have the
 * same key, the value of that key will be composed using `t`.
 *
 * @param d
 * The base design to be extended.
 *
 * @param ...designs
 * Designs to extend the base design.
 */
function extendDesign<C extends DesignableComponents, D extends object = any>(
  ...designs: Design<C, D>[]
): Design<C, D> {
  return mergeWith({}, ...designs, (a: any, b: any) => (a && b ? as(a, b) : undefined));
}

/**
 * Takes a set of designs or HODs and returns a single HOD which extends
 * its argument (a design) with the supplied designs. HODs in the argument
 * list will be converted to designs by invoking them on an empty design.
 *
 * @param dx
 * List of designs or HODs which will be used as extensons
 *
 * @returns
 * An HOD which will extend the base design with the supplied designs.
 */
const extendDesignWith = (
  ...dx: (Design | HOD<any, any>)[]
) => (
  d?: Design
) => extendDesign(d || {}, ...dx.map(
  dx$ => (typeof dx$ === 'function' ? dx$() : dx$)
));

/**
 * Utility to apply tokens to a specified clean component.
 *
 * @param CleanComponent
 * The clean starting component to which tokens should be applied.
 *
 * @returns
 * A function which applies tokens to the clean component.
 *
 * @example
 * ```
 * on(FooClean)(vitalFoo.Default, 'bar');
 * ```
 * is equivalent to
 * ```
 * as(startWith(FooClean), vitalFoo.Default, 'bar');
 * ```
 */
const on = (
  CleanComponent: ComponentType<any>
) => <C extends DesignableComponents, D extends object = any>(
  ...specs: Token[]
) => as(
    startWith(CleanComponent),
    ...specs
  );

/**
 * Helper function to improve type inference in token specifications, and to ensure that
 * the order of domains is consistent for all tokens.
 *
 * @param d
 * If specified, defines a circumscribed set of allowed token domains.
 *
 * @returns
 * Function which recieves an object as a parameter and returns a normalized token
 * specification based on that object.
 *
 * @see https://stackoverflow.com/questions/54598322/how-to-make-typescript-infer-the-keys-of-an-object-but-define-type-of-its-value
 */
const asTokenSpec = <
  C extends DesignableComponents,
  D extends object,
  >(d?: D): AsTokenSpec<C, D> => (...specs) => {
    const spec: FinalDomains<C, D> = Object.keys(d || {}).reduce(
      (acc, next) => ({
        ...acc,
        [next]: {},
      }), {},
    );
    spec.Compose = {};
    spec.Flow = undefined;
    spec.Meta = {};
    mergeWith(spec, ...specs, tokenMergeCustomizer);
    return { ...spec, [$TokenSpec]: true } as TokenSpec<C, D>;
  };

export {
  asTokenSpec,
  as,
  on,
  withDesign,
  extendDesign,
  extendDesignWith,
};

/**
 * Type guard to ensure that a Token is a TokenSpec.
 *
 * @param a
 * The Token to test.
 */
export const isTokenSpec = (a: Token): a is TokenSpec<any, any> => (
  typeof a !== 'function' && typeof a !== 'string'
);
