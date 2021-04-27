import { ComponentType, HTMLProps } from 'react';
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
 *   by this HOC.  The type of the resulting coponent's props will be the union of the base
 *   component's props type and this type.
 * - R: (Removed Props) The tupe of any props which will *removed* from the base component.
 *   The type of the resulting component's props will be the the base components props with
 *   these removed.
 */
export type HOC<B = {}, A = {}, R = {}> =
  <P extends B, Q extends Omit<P & A, keyof R> = PP<P, A, R>>(
    C: ComponentOrTag<P>
  ) => ComponentWithMeta<Q>;

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
  members?: Token[];
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
 * Tokens may be composed of other tokens using the `asToken` utility.
 */
export type Token<B = {}, A = {}, R = {}> = HOC<B, A, R> & TokenProps;

/**
 * An "Enhancer" is a token which produces a component which accepts additional props.
 * The new props are added to the signature of the enhanced compoennt.
 *
 * @param A
 * The new props to be added.
 *
 * @param B
 * Optional constraint to put on the props signature of the base component. If specified,
 * the token will only apply to a base component which has this signature.
*/
export type Enhancer<A, B = {}> = Token<B, A>;

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
export type Injector<R, B = {}> = Token<B & R, {}, R>;

/**
 * Type of the filter function which should be passed to `withTokenFilter`
 *
 * @see withTokenFilter
 */
export type TokenFilterTest = (token: Token) => boolean;

/**
 * Type of the parameters to asToken.  Overloaded to accept metadata
 * objects (or undefined) in addition to tokens.
 */
export type TokenDef<B = {}, A = {}, R = {}> = Token<B, A, R> | TokenMeta | undefined;

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
export type AsToken<A = {}> =
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
  ) => Token<B1, A & A1 & A2 & A3 & A4 & A5 & A6 & A7 & A8 & A9, R1 & R2 & R3 & R4 & R5 & R6 & R7 & R8 & R9>;
