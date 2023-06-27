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
 * @hidden
 */
export const $TokenSpec = Symbol('TokenSpec');

/**
 * Metadata which can be attached to a token.
 *
 * When the token is applied, these metadata will also be attached to the
 * target component.  If multiple tokens are applied, their metadata will
 * be merged onto the component.
 *
 * @category Token API
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
 *
 * @category HOC Utility
 */
export type ComponentWithMeta<P = any> = ComponentType<P> & TokenMeta;

/**
 * Type of a component with meta or a JSX element.
 *
 * @category HOC Utility
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
 *
 * @category HOC Utility
 */
export type Tag<T = HTMLElement> = ComponentOrTag<HTMLProps<T>>;

/**
 * @category HOC Utility
 */
export type PP<P, A, R> = Omit<P & A, keyof R> & Partial<R>;

/**
 * Type of a higher-order component.
 *
 * This is a generic type which allows you to specify how the props of the target
 * component will be treated. It accepts 3 type parameters:
 *
 * @param B
 * Base Props: The expected props of the target component. Omit or specify as `{}`
 * to infer these.  If specified, this HOC can only be applied to a component whose
 * props are of this type.
 *
 * @param A
 * Added Props: The type of any props which will be *added* to the base component
 * by this HOC.  The type of the resulting component's props will be the union of the base
 * component's props type and this type.
 *
 * @param R
 * Removed Props: The type of any props which will *removed* from the base component.
 * The type of the resulting component's props will be the the base components props with
 * these removed.
 *
 * @category HOC Utility
 */
export type HOC<B = {}, A = {}, R = {}> =
  <P extends B>(C: ComponentOrTag<P>) => ComponentWithMeta<PP<P, A, R>>;

/**
 * Properties of tokens.
 *
 * @category Token API
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
 * Type of a "Token", which is a HOC with optional metadata and filtering.
 *
 * Tokens may be composed of other tokens using the `flowHoc` utility.
 *
 * @category HOC Utility
 */
export type HOCWithMeta<B = {}, A = {}, R = {}> = HOC<B, A, R> & TokenProps;

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
 *
 * @category HOC Utility
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
 *
 * @category HOC Utility
 */
export type Injector<R, B = {}> = HOC<B & Partial<R>, {}, R>;

/**
 * Type of the filter function which should be passed to `withTokenFilter`.
 *
 * @see withTokenFilter
 * @hidden
 */
export type TokenFilterTest = (token: HOCWithMeta) => boolean;

/**
 * Type of the parameters to `flowHoc`. Overloaded to accept metadata
 * objects (or undefined) in addition to HOCs.
 *
 * @category HOC Utility
 */
export type HOCDef<B = {}, A = {}, R = {}> = HOC<B, A, R> | TokenMeta | undefined;

/**
 * Type of a token composition function.
 *
 * Ensures that the type of the resulting token is properly inferred from the
 * types of the tokens which are being composed.  Also ensures that the
 * resulting token will only apply to components which match the constraints
 * of the first composed token
 *
 * > Type inference will only be correct for up to 10 composed tokens.
 *
 * @category HOC Utility
 */
export type FlowHoc<A = {}> =
  <B1, A1, R1, A2, R2, A3, R3, A4, R4, A5, R5, A6, R6, A7, R7, A8, R8, A9, R9>(
    t1?: HOCDef<B1, A1, R1>,
    // @todo Ensure that the output of each token matches the constraint of the next, eg
    // t2?: HOCDef<PP<B1, A1, R1>, A2, R2>
    // t3?: HOCDef<PP<B1, A1&A2, R1&R2>, A3, R3>
    // etc.
    t2?: HOCDef<{}, A2, R2>,
    t3?: HOCDef<{}, A3, R3>,
    t4?: HOCDef<{}, A4, R4>,
    t5?: HOCDef<{}, A5, R5>,
    t6?: HOCDef<{}, A6, R6>,
    t7?: HOCDef<{}, A7, R7>,
    t8?: HOCDef<{}, A8, R8>,
    t9?: HOCDef<{}, A9, R9>,
    ...t: HOCDef<any, any, any>[]
    // eslint-disable-next-line max-len
  ) => HOCWithMeta<B1, A & A1 & A2 & A3 & A4 & A5 & A6 & A7 & A8 & A9, R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9>;

/**
 * This is the type to use for the components prop of a component with a fluid design.
 * It is also the base for the `...Components` interface of any designable component.
 *
 * @category Design API
 */
export type DesignableComponents = {
  [key: string]: ComponentOrTag<any>,
};

/**
 * This is the type of a design which can be applied to a component which accepts
 * a components prop of type "C".
 *
 * @hidden
 */
export type HocDesign<C extends DesignableComponents = DesignableComponents> = {
  [Key in keyof C]?: HOC
} & { _final?: HocDesign<Omit<C, '_final'>> };

/**
 * This is the type of the props for a designable component.
 *
 * @param C
 * The components or "slots" accepted by this designable component.
 *
 * @category Design API
 */
export type DesignableProps<C extends DesignableComponents = DesignableComponents> = {
  design?: Design<C>;
};

/**
 * Type of the props of a base component which can be made designable.
 *
 * @param C
 * The components or "slots" accepted by this designable component.
 *
 *
 * @example
 * ```
 * const Foo: FC<DesignableComponentsProps> = props => {
 *   const { components: C, ...rest } = props;
 *   return (
 *     <C.Wrapper>
 *       <C.Content />
 *     ...
 * ```
 *
 * @category Design API
 */
export type DesignableComponentsProps<C extends DesignableComponents = DesignableComponents> = {
  components: C,
};

/**
 * This is the type of a higher-order design which can be applied to a component which accepts
 * a components prop of type "C".
 *
 * @category Design API
 */
export type HOD<
  C extends DesignableComponents,
  D extends object = any
> = (design?:Design<C, D>) => Design<C, D>;

/**
 * This is a HOD that accepts any `DesignableComponents`.
 *
 * @category Design API
 */
export type FluidHOD = HOD<DesignableComponents>;

/**
 * [[Design]] that accepts any `DesignableComponents`.
 *
 * @category Design API
 */
export type FluidDesign = Design<DesignableComponents>;

/**
 * Type of the [[designable]] HOC.
 *
 * @param C
 * The components or "slots" accepted by this design.
 *
 * @category Design API
 */
export type Designable<C extends DesignableComponents = DesignableComponents>
  = HOC<{}, DesignableProps<C>, DesignableComponentsProps<C>>;

/**
 * Domains used in a [[TokenSpec]] which have special meanings.
 * Do not use these domain names in a custom domain set.
 *
 * @category Token API
 */
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
 * - A token specified in token object notation;
 * - A token specified as a HOC;
 * - A token specified as a string of classes.
 *
 * @category Token API
 */
export type Token = TokenSpec<any, {}> | HOC | string | undefined;

/**
 * Type of a token which is composed into another [[TokenSpec]].
 *
 * @category Token API
 */
export type ComposedToken<
  C extends DesignableComponents,
  D extends object,
> = TokenSpec<C, D> | HOC | string | undefined;

/**
   * Type of a collection of tokens which apply to a specific designable component.
   *
   * @param C
   * The designable components which are exposed by the component to which these
   * tokens apply.
   *
   * @category Token API
   */
export type TokenCollection<
  C extends DesignableComponents,
  D extends object = object,
  K extends object = any,
> = Record<keyof K, TokenSpec<C, D>>;

/**
 * Like a [[Design]], but without the `_final` property.
 *
 * @category Design API
 */
export type FinalDesign<
  C extends DesignableComponents = DesignableComponents,
  D extends object = any,
> = {
  [k in keyof Partial<C & { _?: Token }>]: Token
};

/**
   * A Design is a keyed set of tokens which can apply to a designable
   * component. The keys correspond to the design elements.
   * - Includes a special key which contains tokens to be applied to the
   *   component as a whole.
   * - Allows each value to be specified as a VitalDS extended token definition.
   *
   * @param C
   * The components accepted by this design.
   *
   * @param D
   * The allowed [[Domain]]s for any [[TokenSpec]] applied to a
   * design key.
   *
   * @category Design API
   */
export type Design<
  C extends DesignableComponents = DesignableComponents,
  D extends object = any,
> = FinalDesign<C, D> & {
  _final?: FinalDesign<C, D>
};

/**
 * Type of a custom condition hook suitable for use with
 * [[flowIf]], [[addPropsIf]] and  [[addClassesIf]].
 *
 * The condition hook will receive the props of the component as an argument.
 *
 * @param P
 * The type of the props of the component.
 *
 * @category HOC Utility
 */
export type Condition<P = any> = (props: P) => boolean;

/**
 * Type of a set of domains uses in a [[TokenSpec]].
 *
 * @category Token API
 */
export type Domains<
  C extends DesignableComponents,
  D extends object
> = {
  [k in keyof D]?: FinalDesign<C>
};

/**
 * Type of the complete set of domains (including [[ReservedDomains]] used
 * in a [[TokenSpec]].
 *
 * @category Token API
 */
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
   * The type of the design elements for the target component.
   *
   * @param D
   * An object type describing the domain keys available in this token.
   *
   * @category Token API
   */
export type TokenSpec<
  C extends DesignableComponents,
  D extends object,
> = Required<FinalDomains<C, D>> & {
  [$TokenSpec]: true,
};

/**
 * Type of a function which accepts a list of partial token specifications
 * and returns a single, complete token specification.
 *
 * @param specs
 * A list of partial token specifications.  These may be objects, in which case
 * their keys should be a subset of the allowed domains.  They may also be strings
 * or HOCs, which will be converted to partial token specifications, applying
 * the classes or HOC to the `_` key of the `Core` domain.
 *
 * @category Token API
 */
export type AsTokenSpec<C extends DesignableComponents, D extends object> = (
  ...specs: (FinalDomains<C, D>|string|HOC)[]
) => TokenSpec<C, D>;
