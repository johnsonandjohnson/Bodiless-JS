import React, { ComponentType } from 'react';
import {
  isArray, mergeWith, union, flow as flowBase, identity,
} from 'lodash';

/**
 * Metadata which can be attached to a token.
 *
 * When the token is applied, these metadata will also be attached to the
 * target component.  If multiple tokens are applied, their metadata will
 * be merged onto the component.
 */
type TokenMeta = {
  title?: string,
  displayName?: string,
  description?: string,
  categories?: {
    [cat:string]: string[],
  }
};

/**
 * Type of component with metadata supplied by one or more tokens.
 */
type ComponentWithMeta<P = any> = ComponentType<P> & TokenMeta;

/**
 * Type of a component with meta or a JSX element.
 */
type ComponentOrTag<P> = ComponentWithMeta<P>|keyof JSX.IntrinsicElements;

/**
 * Type of a higher order component
 */
type HOC = <P extends object, Q extends object = P>(C:ComponentOrTag<P>) => ComponentWithMeta<Q>;

/**
 * Properties of tokens.
 */
export type TokenProps<P> = {
  /**
   * The filter (if any) which should be applied when this token is composed.
   */
  filter?: TokenFilterTest<P>,
  /**
   * The tokens and/or filters which compose this token.
   */
  members?: Token<P>[],
  /**
   * The metadata attached to this token. This metadata will be merged recursively with
   * any metadata provided by any other tokens which this token composes, and attached to any
   * component to which this token is applied.
   */
  meta?: TokenMeta,
};

/**
 * Type of a "Token", which is an HOC with optional metadata and filtering.
 *
 * Tokens may be composed of other tokens using the `asToken` utility.
 */
type Token<P = any> = HOC & TokenProps<P>;

/**
 * Type of the filter function which should be passed to the Token#filter method.
 */
type TokenFilterTest<P> = (hoc: Token<P>) => boolean;

/**
 * Type of the parameters to asToken.  Overloaded to accept metadata
 * objects in addition to tokens.
 */
type TokenDef<P> = Token<P>|TokenMeta|undefined;

const isToken = (def: TokenDef<any>) => typeof def === 'function';

// Custom merge behavior for token categories.
function mergeMeta(objValue:any, srcValue:any) {
  if (isArray(objValue) && isArray(srcValue)) {
    return union(objValue, srcValue);
  }
  return undefined;
}

/**
 * @private
 * Enhances an HOC so as to reserve metadata attached to the component it wraps.
 */
const preserveMeta = (hoc: HOC): HOC => <P extends object, Q extends object = P>(
  Component: ComponentOrTag<P>,
): ComponentWithMeta<Q> => {
  const NewComponent = hoc(Component) as ComponentWithMeta<Q>;
  const finalMeta = mergeWith({}, Component, NewComponent, mergeMeta);
  return Object.assign(NewComponent, finalMeta);
};

/**
 * @private
 * Attaches metadata to a component.
 *
 * @param meta The metadata to attach.
 */
export const withMeta = (meta: TokenMeta): HOC => Component => {
  const WithMeta = (props: any) => <Component {...props} />;
  return Object.assign(WithMeta, meta);
};

type TokenWithParents<P> = Token<P> & {
  parents?: Token<P>[],
};

/**
 * @private
 *
 * Flattens an array of tokens recursively. Each token in the flattened array has
 * an additional "parents" property listing the tokens to which it belongs.
 * @param tokens The list of tokens to flatten
 * @param parents The current list of parents
 */
const flattenTokens = <P extends object>(
  tokens: Token<P>[] = [], parents: Token<P>[] = [],
): TokenWithParents<P>[] => tokens.reduce(
    (acc, token) => [
      ...acc,
      ...flattenTokens(token.members, [...parents, token]),
      // exclude any token with members, bc we will already be applying the members.
      ...token.members ? [] : [Object.assign(token, { parents })],
    ],
    [] as TokenWithParents<P>[],
  );

/**
 * @private
 *
 * Generates a token fliter which applies to a token and any of its parents.
 * Used to ensure that a token is removed if any of its parents match
 * the filter criteria.
 *
 * @param filter
 * The token filter to apply
 *
 * @return
 * A TokenFilter which which applies the supplied filter to a Token and
 * all its parents.
 */
const createTokenAndParentFilter = <P extends object>(
  filter: TokenFilterTest<P>,
): TokenFilterTest<P> => (token: TokenWithParents<P>): boolean => (token.parents || []).reduce(
    (result, parent) => result && filter(parent),
    filter(token),
  );

/**
 * Recursively filters a list of tokens by applying any filters
 * @param tokens The list of tokens to filter.
 * @return A flat list of filtered tokens
 */
const filterMembers = <P extends object>(tokens: Token<P>[]): Token<P>[] => {
  const filtered: HOC[] = [];
  let rest = flattenTokens(tokens).reverse();
  while (rest.length > 0) {
    const [next, ...nextRest] = rest;
    rest = nextRest;
    if (next.filter) {
      rest = rest.filter(createTokenAndParentFilter(next.filter));
    }
    filtered.push(next);
  }
  return filtered.reverse();
};

/**
 * Composes one or more tokens into a single token.
 *
 * Tokens will be composed left-to-right (in lodash "flow" order).
 *
 * You can also attach metadata to this token by provding plain TokenMeta
 * objects as arguments in addition to tokens.
 *
 * @see TokenProps
 * @see TokenDefinition
 *
 * @param tokens
 * List of tokens and token metadata objects to compose.
 *
 * @return
 * A composed token.
 */
const asToken = <P extends object>(...args: TokenDef<P>[]): Token<P> => {
  // We allow "undefined" in args and simply ignore them.
  const args$ = args.filter(a => a !== undefined);
  const metaBits: TokenMeta[] = args$.filter(a => !isToken(a)) as TokenMeta[];
  const meta = mergeWith({}, ...metaBits, mergeMeta);
  const members: Token<P>[] = [
    ...args$.filter(a => isToken(a)) as Token<P>[],
    withMeta(meta),
  ];
  const hocs = filterMembers(members);
  const hocs$ = hocs.map(t => preserveMeta(t));
  return Object.assign(flowBase(hocs$), { meta, members, hocs });
};

/**
 * Creates a token filter (a special kind of token which, when composed with other tokens,
 * filters out those which match a provided test function.
 *
 * @param filter
 * The test functino which will be used to determine whether tokens
 * should be filtered.
 *
 * @returns
 * A token filter.
 */
const withTokenFilter = <P extends object>(test: TokenFilterTest<P>): Token<P> => (
  Object.assign(identity, { filter: test })
);

/**
 * Utilities for adding metadata to tokens.
 */
asToken.meta = {
  term: (c: string) => (t: string) => ({
    categories: {
      [c]: [t],
    },
  }),
  cat: (c: string) => ({
    categories: {
      [c]: [],
    },
  }),
};

export type {
  HOC, TokenFilterTest, Token, TokenDef,
  TokenMeta, ComponentWithMeta, ComponentOrTag,
};

export { asToken, withTokenFilter };
