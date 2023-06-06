# Token Domains

Vital tokens are expressed in a special format known as the [_Token Object
Notation_](./#token-object-notation). The keys of this object are "domains" — special groupings of
designs or HOCs which can be overridden or extended separately by downstream consumers.

A downside of using Tailwind is that it can result in long lists of classes in your HTML that are
difficult to parse through. Using domains allows you to separate these long lists of classes into
groups of shorter lists. This can be especially helpful if you have a bug in a particular domain
(e.g., `Layout`), as you can focus your debugging attention on that domain and the set of tokens
within it.

## Allowed Domains

The set of allowed domains is defined by Vital as follows. For most domains, the value is an
"extended" design object (details below). Three domains (`Meta`,`Compose`, and `Flow`) are treated
differently as described below.

- `Core`: Essential behavior or styling added by this token which are very unlikely to be
  overridden; e.g., accessibility tokens.
- `Analytics`: Behavior or props related to analytics; e.g., pushing events to a data layer.
- `SEO`: Behavior or props related to search engine optimization, e.g., adding
  [schema.org](https://schema.org/ ':target=_blank') markup.
- `Components`: When the design elements of a complex component are themselves complex components,
  it is generally best practice to define tokens which apply to the sub-components as a whole, and
  apply them in the `Components` domain of the enclosing component.
- `Layout`: Tokens which define the visual structure of a component, and are thus unlikely to be
  overridden; e.g., those which define the orientation of a card.
- `Spacing`: Tokens which sit somewhere between `Theme` and `Layout`; e.g., padding, margin,
  line-spacing, etc.
- `Theme`: Tokens which apply styling which is very likely to be overridden; e.g., colors,
  typography, sizing such as `width` and `height`, etc.
- `Content`: Tokens which provide default content or other fixed props. Any hardcoded, translatable
  strings belong in this domain.
- `Behavior`: Tokens which define or add behaviors to a component; e.g., the expanding and
  contracting of an accordion.
- `Schema`: Tokens which define how a component's data are organized; e.g., node keys.

### Special Domains

The following special domains have values which are not extended domain objects:

- `Compose`: This special domain allows specifying other named tokens which should be composed with
  this one. For example:

  ```ts
  const Sticky = asHeaderToken({
    ...Base,
    Compose: {
      // Apply the WithSticky token to the component as a whole.
      WithSticky,
    },
  });
  ```

  - For more details on the `Compose` domains, see:
    - [Extending and Composing Tokens : The `Compose` Domain](../ExtendingAndComposingTokens#the-compose-domain)
    - [Vital Tokens : Extension and Composition](./#extension-and-composition)

- `Flow`: By default, the tokens' HOCs for each domain are composed using the Bodiless `asToken`
  utility. This behavior can be overridden by specifying a different composer here. This is useful
  for wrapping the components in a condition (using `flowIf`).

  ```ts
  const WithBlueIfActive = asTokenSpec()({
    Core: {
      _: 'text-blue',
    },
    Flow: flowIf(({ isActive }) => Boolean(isActive)),
  });
  ```

- `Meta`: This domain takes a token metadata object which should be attached to the token (and to
  any component to which the token is applied).

  ```ts
  const WithBlueBackground = asTokenSpec()({
    Core: {
      _: 'bg-blue',
    },
    Meta: asToken.meta.term('Color')('Blue'),
  });
  ```

## Order of Domains

HOCs defined for each domain are applied in a fixed order (as listed above). Regardless of the order
in which domains are specified in an individual token, they will always be applied in the canonical
order.

For example, given:

```ts
const Token = asTokenSpec()({
  Theme: {
    _: 'bar',
  },
  Layout: {
    _: 'baz',
  },
  Core: {
    _: 'foo',
  },
});
```

then:

```ts
as(Token);
```

is the same as:

```ts
as(
  pick(Token, 'Core'),
  pick(Token, 'Layout'),
  pick(Token, 'Theme'),
);
```

## Extended Design

With exception of the three special domains (`Compose`, `Meta`, and `Flow`), the value of each
domain is an extended design object. This is similar to a normal Bodiless design object, with the
following differences:

- The value of each key can by any of the following:
  - A normal Bodiless token HOC (as in a normal design object).
  - A token specification object (which will be converted to an HOC by being wrapped in `as`).
  - A string (which will be interpreted as a set of CSS classes to be added to the component via
   `addClasses`).
- There is a special `_` key which defines tokens/HOCs which should be applied to the component as a
  whole.

Example:

```ts
const Example = asLinkToken({
  Core: {
    // Apply HOC to the component as a whole
    _: addProps({
      id: 'special-link-id',
    }),
    // Apply a token to the Body key.
    Body: vitalElements.WithLinkStyles,
    // Add a class to the icon
    ExternalIcon: 'text-xl',
  },
});
```

## How to Determine the Appropriate Domain for a Utility Class

Whenever you use a utility class, you'll need to determine the appropriate domain in which it should
be placed. The Tailwind documentation is a useful aid in this regard. Visit the [Tailwind
Documentation](https://tailwindcss.com/docs/installation ':target=_blank'), and take note of the
table of contents listed in the left sidebar. Using this table of contents, identify the category to
which the utility class you've written belongs. Then, using the table below, find the associated
domain.

| Tailwind Category | Domain   |
| ----------------- | -------- |
| Layout            | Layout   |
| Flexbox & Grid    | Layout   |
| Spacing           | Spacing  |
| Sizing            | Theme    |
| Typography        | Theme    |
| Borders           | Theme    |
| Effects           | Theme    |
| Filter            | Theme    |
| Tables            | Theme    |
| Transitions       | Behavior |
| Transforms        | Behavior |
| Interactivity     | Behavior |
| SVG               | Theme    |
| Accessibility     | Behavior |

## Compose vs Extend vs Override

As mentioned, domains can be _extended_ or _overridden_. An extension or override can be made at the
token, domain, or slot (component) level. _Extending_ is useful when you only need to make a small
number of changes to a token/domain/slot. _Overriding_ allows you to completely overwrite a
token/domain/slot, essentially writing your own version of it from scratch. This is useful when you
need to make many adjustments to a token/domain/slot, and extending it would take more effort than
simply rewriting it.

Similar to extension is _composition_. Where extension takes an existing token and modifies its
effect, composition takes several existing tokens and combines them. Use _composition_ when you are
adding styling or behavior that creates a variation of the original component that downstream
consumers may choose to add, remove, customize, or combine with other variations. Use _extension_
when you are customizing an existing token at the brand or site level, and, especially, when you
want to completely override one or more domains from the original token (as this isn't possible with
composition).

For further details on composing, extending, and overriding, please see:

- [Extending and Composing Tokens](../ExtendingAndComposingTokens)
- [Vital Tokens : Extension and Composition](./#extension-and-composition)

## Additional Considerations and Gotchas

### Access to Component Data

Note the position of the `Schema` domain, which usually provides the data that a component renders.
It's applied "outside" (after) the styling domains (`Theme`, `Layout`, `Spacing`), so that these
domains will have access to the data (to allow conditional styling based on state). However, it's
"inside" (before) the `Compose` and `Condition` domain — so that tokens added to the component via
`Compose` will not have access to the component's data.
