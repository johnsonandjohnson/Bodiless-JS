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

import {
  asTokenSpec,
  DesignableComponents,
  extendMeta,
  TokenMeta,
  Token,
  TokenSpec,
  as,
} from '@bodiless/fclasses';

const defaultDomains = {
  Core: {},
  Components: {},
  A11y: {},
  Analytics: {},
  SEO: {},
  Layout: {},
  Spacing: {},
  Theme: {},
  A11yContent: {},
  Content: {},
  Behavior: {},
  Schema: {},
};

type DefaultDomains = typeof defaultDomains;

/**
 * Creates a token definition utility for a clean component.
 *
 * Use the type of the component's designable components as a type parameter
 * to enable type checking and autocomplete for the domain keys.
 */
const asVitalTokenSpec = <
  C extends DesignableComponents
>() => asTokenSpec<C, DefaultDomains>(defaultDomains);

/**
 * Creates an element level token (one in which only the _ design key is allowed);
 */
const asElementToken = asVitalTokenSpec<{}>();
const elementToken = asElementToken();
type ElementToken = typeof elementToken;

/**
 * Creates a token for a component with a fluid design (one in which any
 * design key is allowed).
 */
const asFluidToken = asVitalTokenSpec<any>();
const fluidToken = asFluidToken();
type FluidToken = typeof fluidToken;

/**
 * Creates a token which applies the given metadata.
 *
 * @param ...m
 * One or more token metadata objects.  These will be merged to produce
 * the value of the resulting token's `Meta` domain.
 *
 * @returns
 * A token spec with a single `Meta` domain which combines all provided
 * token metadata.
 */
const asMetaToken = (...m: TokenMeta[]) => asElementToken({
  Meta: extendMeta(...m),
});

// @todo should these be public types exported from fclasses?
type TC<K extends string> = Record<K, TokenSpec<{}, Pick<DefaultDomains, 'Core'>>>;
type TD<K extends string> = Record<K, Token>;

/**
 * Creates a group of element tokens with shared meta.
 *
 * @param m
 * One or more token metatdata objects to be merged and attached to all tokens in the group.
 *
 * @return
 * A function which takes a design and returns a token collection,
 * whose keys are the
 *
 */
const asTokenGroup = (...m: TokenMeta[]) => <K extends string>(
  d: TD<K>
): TC<K> => Object.entries(d).reduce(
    (tokens, [name, value]) => ({
      ...tokens,
      [name]: asElementToken({
        Meta: extendMeta(...m),
        Core: {
          _: value as Token,
        }
      }),
    }),
    {},
  ) as TC<K>;

const asSimpleToken = (...tokens: Token[]) => asElementToken({
  Core: {
    _: Array.isArray(tokens) ? as(...tokens) : tokens,
  },
});

export {
  asVitalTokenSpec, asMetaToken, asElementToken, asFluidToken,
  asTokenGroup, asSimpleToken
};
export type {
  ElementToken, FluidToken,
};
