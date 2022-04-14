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

import { ComponentType, HTMLProps } from 'react';

/**
 * Symbol used to identify a tokenspec object.
 */
export const $TokenSpec = Symbol('TokenSpec');

/**
 * Metadata which can be attached to a token.
 *
 * When the token is applied, these metadata will also be attached to the
 * target component.  If multiple tokens are applied, their metadata will
 * be merged onto the component.
 */
export type TokenMeta = {
  title?: string;
  displayName?: string;
  description?: string;
  categories?: {
    [cat: string]: string[];
  };
};
/**
 * Type of component with metadata supplied by one or more tokens.
 */
export type ComponentWithMeta<P = any> = ComponentType<P> & TokenMeta;

/**
 * Type of a component with meta or a JSX element.
 */
export type ComponentOrTag<P> = ComponentWithMeta<P> | keyof JSX.IntrinsicElements;

/**
 * Shorthand for an HTMLElement with specific props.
 * Useful as a cast when applying tokens directly to strings.
 *
 * @example
 * ```
 * const Foo = asFoo('div' as Tag<HTMLDivElement>)
 * ```
 * without the cast, it would be impossible to infer the prop signature of Foo.
 */
export type Tag<T = HTMLElement> = ComponentOrTag<HTMLProps<T>>;

type PP<P, A, R> = Omit<P & A, keyof R> & Partial<R>;
/* *
 * Type of a higher order component.
 *
 * This is a generic type which allows you to specify how the props of the target
 * component will be treated. It accepts 3 type parameters:
 *
 * - B: (Base Props) The expected props of the target component. Omit or specify as `{}`
 *   to infer these.  If specified, this HOC can only be applied to a component whose
 *   props are of this type.
 * - A: (Added Props) The type of any props which will be *added* to the base component
 *   by this HOC.  The type of the resulting component's props will be the union of the base
 *   component's props type and this type.
 * - R: (Removed Props) The type of any props which will *removed* from the base component.
 *   The type of the resulting component's props will be the the base components props with
 *   these removed.
 */
export type HOCBase<B = {}, A = {}, R = {}> =
  <P extends B>(C: ComponentOrTag<P>) => ComponentWithMeta<PP<P, A, R>>;

/**
 * Properties of tokens.
 */
export type TokenProps = {
  /**
   * The filter (if any) which should be applied when this token is composed.
   */
  filter?: TokenFilterTest;
  /**
   * The tokens and/or filters which compose this token.
   */
  members?: HOC[];
  /**
   * The metadata attached to this token. This metadata will be merged recursively with
   * any metadata provided by any other tokens which this token composes, and attached to any
   * component to which this token is applied.
   */
  meta?: TokenMeta;
};

/**
 * Type of a "Token", which is an HOC with optional metadata and filtering.
 *
 * Tokens may be composed of other tokens using the `flowHoc` utility.
 */
export type HOC<B = {}, A = {}, R = {}> = HOCBase<B, A, R> & TokenProps;

/**
 * An "Enhancer" is a token which produces a component which accepts additional props.
 * The new props are added to the signature of the enhanced component.
 *
 * @param A
 * The new props to be added.
 *
 * @param B
 * Optional constraint to put on the props signature of the base component. If specified,
 * the token will only apply to a base component which has this signature.
*/
export type Enhancer<A, B = {}> = HOC<B, A>;

/**
 * In "Injector" is a token which provides values for the existing props of a component.
 * Any required props of the base component become optional in the enhance component.
 *
 * @param R
 * The props whose values are being injected. These props will become optional
 * in the enhance component.
 *
 * @param B
 * Optional constraint to put on the props signature of the base component. If specified,
 * the token will only apply to a base component which has this signature.
 */
export type Injector<R, B = {}> = HOC<B & Partial<R>, {}, R>;

/**
 * Type of the filter function which should be passed to `withTokenFilter`
 *
 * @see withTokenFilter
 */
export type TokenFilterTest = (token: HOC) => boolean;

/**
 * Type of the parameters to flowHoc  Overloaded to accept metadata
 * objects (or undefined) in addition to tokens.
 */
export type TokenDef<B = {}, A = {}, R = {}> = HOC<B, A, R> | TokenMeta | undefined;

/**
 * Type of a token composition function.
 *
 * Ensures that the type of the resulting token is properly inferred from the
 * types of the tokens which are being composed.  Also ensures that the
 * resulting token will only apply to components which match the constraints
 * of the first composed token
 *
 * > Type inference will only be correct for up to 10 composed tokens.
 */
export type FlowHoc<A = {}> =
  <B1, A1, R1, A2, R2, A3, R3, A4, R4, A5, R5, A6, R6, A7, R7, A8, R8, A9, R9>(
    t1?: TokenDef<B1, A1, R1>,
    // @todo Ensure that the output of each token matches the constraint of the next, eg
    // t2?: TokenDef<PP<B1, A1, R1>, A2, R2>
    // t3?: TokenDef<PP<B1, A1&A2, R1&R2>, A3, R3>
    // etc.
    t2?: TokenDef<{}, A2, R2>,
    t3?: TokenDef<{}, A3, R3>,
    t4?: TokenDef<{}, A4, R4>,
    t5?: TokenDef<{}, A5, R5>,
    t6?: TokenDef<{}, A6, R6>,
    t7?: TokenDef<{}, A7, R7>,
    t8?: TokenDef<{}, A8, R8>,
    t9?: TokenDef<{}, A9, R9>,
    ...t: TokenDef<any, any, any>[]
    // eslint-disable-next-line max-len
  ) => HOC<B1, A & A1 & A2 & A3 & A4 & A5 & A6 & A7 & A8 & A9, R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9>;

/**
 * This is the type to use for the components prop of a component with a fluid design.
 */
export type DesignableComponents = {
  [key: string]: ComponentOrTag<any>,
};

/**
 * This is the type of a design which can be applied to a component which accepts
 * a components prop of type "C".
 */
export type HocDesign<C extends DesignableComponents = DesignableComponents> = {
  [Key in keyof C]?: HOC
} & { _final?: HocDesign<Omit<C, '_final'>> };

/**
 * This is the type of the props for a designable whose underlying component
 * accepts a components prop of type "C".
 */
export type DesignableProps<C extends DesignableComponents = DesignableComponents> = {
  design?: Design<C>;
};

export type DesignableComponentsProps<C extends DesignableComponents = DesignableComponents> = {
  components: C,
};

/**
 * This is the type of a  Higher order design which can be applied to a component which accepts
 * a components prop of type "C".
 */
export type HOD<
  C extends DesignableComponents,
  D extends object = any
> = (design?:Design<C, D>) => Design<C, D>;

/**
 * This is a GOD that accepts any DesignableComponents
 */
export type FluidHOD = HOD<DesignableComponents>;
export type FluidDesign = Design<DesignableComponents>;

export type Designable<C extends DesignableComponents = DesignableComponents>
  = HOCBase<{}, DesignableProps<C>, DesignableComponentsProps<C>>;

export type ReservedDomains<
  C extends DesignableComponents,
  D extends object,
> = {
  /**
     * A list of other tokens which should be applied.
     */
  Compose?: {
    [key: string]: ComposedToken<C, D>,
  },
  /**
     * If specified, the entire token will be wrapped in a flow toggle using
     * this condition hook. Note, the condition is applied to the whole token,
     * so it will not have access to any contexts or content nodes provided by
     * the token itself.
     */
  Flow?: FlowHoc | undefined,
  /**
     * Metadata which should be attached to this token (and to any components
     * to which the token is applied).
     */
  Meta?: TokenMeta,
};

/**
 * Type of an argument to `as` and/or the value of a key in an Extended Design.
 * May be:
 * - A token specified in token object notation
 * - A token specified as an HOC
 * - A token specified as a string of classes.
 */
export type Token = TokenSpec<any, {}> | HOCBase | string | undefined;

export type ComposedToken<
  C extends DesignableComponents,
  D extends object,
> = TokenSpec<C, D> | HOCBase | string | undefined;

/**
   * Type of a collection of tokens which apply to a specific designable component.
   *
   * @param C
   * The designable components which are exposed by the component to which these
   * tokens apply.
   */
export type TokenCollection<
  C extends DesignableComponents,
  D extends object = object,
> = {
  [name: string]: TokenSpec<C, D>,
};

export type FinalDesign<
  C extends DesignableComponents = DesignableComponents,
  D extends object = any,
> = {
  [k in keyof Partial<C & { _?: Token }>]: Token
};

/**
   * A Design is a keyed set of tokens which can apply to a designable
   * component. The keys correspond to the design elements
   * - includes a special key which contains tokens to be applied to the
   *   component as a whole.
   * - Allows each value to be specified as a VitalDS extended token definition.
   */
export type Design<
  C extends DesignableComponents = DesignableComponents,
  D extends object = any,
> = FinalDesign<C, D> & {
  _final?: FinalDesign<C, D>
};

/**
 * Type of a condition suitable for use with `flowIf`, `addPropsIf`, `addClassesIf`
 */
export type Condition<P = any> = (props: P) => boolean;

type Domains<
  C extends DesignableComponents,
  D extends object
> = {
  [k in keyof D]?: FinalDesign<C>
};

export type FinalDomains<
  C extends DesignableComponents,
  D extends object
> = Domains<C, D> & ReservedDomains<C, D>;

/**
   * Type of a token specification, a token expressed in the
   * HOC Object Notation.
   *
   * This is a nested object with two levels of keys:
   * - The inner keys are to the design keys of the target component, and their
   *   values extended VitalDS token definitions which should be applied to
   *   each key. In addition to the design keys of the component, the special `_`
   *   key is supported to denote a token which should be applied to the component
   *   as a whole.
   * - The top-level keys are "domains" -- areas of styling or behavior which can
   *   be individually reused, extended or overridden by downstream consumers.
   *
   * @param C
   * The type of the design elements for the target componetn.
   *
   * @param D
   * An object type describing the domain keys available in this token.
   */
export type TokenSpec<
  C extends DesignableComponents,
  D extends object,
> = Required<FinalDomains<C, D>> & {
  [$TokenSpec]: true,
};

export type AsTokenSpec<C extends DesignableComponents, D extends object> = (
  ...specs: FinalDomains<C, D>[]
) => TokenSpec<C, D>;
