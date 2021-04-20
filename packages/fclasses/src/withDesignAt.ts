import { Token, TokenMeta, asToken } from './Tokens';
import { Design, withDesign, DesignableComponents } from './Design';

type DesignPath = string[];

const withDesignAtSingle = <C extends DesignableComponents = DesignableComponents>(
  path: DesignPath,
  designOrToken: Design<C>|Token,
): Token => {
  const token: Token = typeof designOrToken === 'function'
    ? designOrToken : withDesign(designOrToken as Design<C>) as Token;
  const [next, ...rest] = path;
  if (rest.length > 0) {
    return withDesign({
      [next]: withDesignAtSingle(rest, designOrToken),
    }) as Token;
  }
  if (next) {
    return withDesign({
      [next]: token,
    }) as Token;
  }
  return token;
};

/**
 * Applies a token or design at a particular path in a component with nested
 * designable elements.
 *
 * @param paths
 * An array of paths, each of which is itself an array of strings representing
 * a set of nested design keys.
 *
 * @return
 * A function which accepts a design or a token, and returns a token which will
 * apply that design or token to all matching paths.
 *
 * @example
 * ```js
 * withDesignAt(['A'], ['A', 'B'])(myToken)
 * ```
 * is the same as:
 * ```js
 * asToken(
 *   withDesign({
 *     A: myToken,
 *   }),
 *   withDesign({
 *     A: withDesign({
 *       B: myToken,
 *     }),
 *   }),
 * );
 * ```
 * Or, you can use a shorthand overload to specify a design to be applied
 * rather than a token.
 * ```js
 * withDesignAt(['A'])(myDesign, myTokenMeta)
 * ```
 * is the same as
 * ```
 * withDesignAt(['A'])(
 *   asToken(withDesign(myDesign), myTokenMeta)
 * )
 * ```
 * Here, `myDesign` is a design object, not a function, eg:
 * ```js
 * const myDesign = {
 *   Foo: addClasses('foo'),
 *   Bar: addClasses('bar'),
 * }
 * ```
 */
const withDesignAt = <C extends DesignableComponents = DesignableComponents>(
  ...paths: DesignPath[]
) => (
    designOrToken: Design<C>|Token,
    ...meta: TokenMeta[]
  ): Token => asToken(
    ...meta,
    ...(paths || [[]]).map(p => withDesignAtSingle(p, designOrToken)),
  );

export default withDesignAt;
