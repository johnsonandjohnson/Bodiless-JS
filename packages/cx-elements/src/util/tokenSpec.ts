import type {
  DesignableComponents,
  TokenSpec as TokenSpecBase,
  TokenMeta,
  Design,
  TokenCollection,
  Token,
} from '@bodiless/fclasses';
import {
  extendMeta,
  asTokenSpec,
} from '@bodiless/fclasses';

type CxTokenSpec<C extends DesignableComponents> = TokenSpecBase<C, DefaultDomains>;

const defaultDomains = {
  Core: {},
  Components: {},
  A11y: {},
  Analytics: {},
  SEO: {},
  Layout: {},
  Spacing: {},
  Theme: {},
  Editors: {},
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
const asCxTokenSpec = <
  C extends DesignableComponents
>() => asTokenSpec<C, DefaultDomains>(defaultDomains);

/**
 * Creates an element level token (one in which only the _ design key is allowed);
 */
const asElementToken = asCxTokenSpec<{}>();

/**
 * Creates a token for a component with a fluid design (one in which any
 * design key is allowed).
 */
const asFluidToken = asCxTokenSpec<any>();

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

const asTokenCollection = (
  d: Design
): TokenCollection<{}, DefaultDomains> => Object.entries(d).reduce(
  (tokens, [name, value]) => ({
    ...tokens,
    [name]: asElementToken({
      Core: {
        _: value as Token<{}, DefaultDomains>,
      }
    }),
  }),
  {},
);

export {
  asCxTokenSpec, asMetaToken, asElementToken, asFluidToken,
  asTokenCollection,
};

export type { CxTokenSpec };
