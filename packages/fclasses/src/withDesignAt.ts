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

import type {
  HOC, TokenMeta, Design, DesignableComponents
} from './types';
import { withDesign, as, asTokenSpec } from './tokenSpec';

type DesignPath = string[];

const withDesignAtSingle = <C extends DesignableComponents = DesignableComponents>(
  path: DesignPath,
  designOrToken: Design<C>|HOC,
): HOC => {
  const token: HOC = typeof designOrToken === 'function'
    ? designOrToken : withDesign(designOrToken as Design);
  const [next, ...rest] = path;
  if (rest.length > 0) {
    return withDesign({
      [next]: withDesignAtSingle(rest, designOrToken),
    });
  }
  if (next) {
    return withDesign({
      [next]: token,
    });
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
 * flowHoc(
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
 *   flowHoc(withDesign(myDesign), myTokenMeta)
 * )
 * ```
 * Here, `myDesign` is a design object, not a function, eg:
 * ```js
 * const myDesign = {
 *   Foo: addClasses('foo'),
 *   Bar: addClasses('bar'),
 * }
 * ```
 *
 * @category Design API
 */
export const withDesignAt = <C extends DesignableComponents = DesignableComponents>(
  ...paths: DesignPath[]
) => (
    designOrToken: Design<C>|HOC,
    ...meta: TokenMeta[]
  ) => as(
    undefined, // necessary bc of typescript bug, see https://github.com/microsoft/TypeScript/issues/28010
    ...meta.map(m => asTokenSpec()({ Meta: m })),
    ...(paths || [[]]).map(p => withDesignAtSingle(p, designOrToken)),
  );
