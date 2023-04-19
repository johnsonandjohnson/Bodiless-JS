# Token Domains

Vital tokens are expressed in a special format known as the _Token Object Notation_. The keys of
this object are "domains" — special groupings of designs or HOCs which can be overridden or extended
separately by downstream consumers.

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
- `Editors`: Tokens which define how a component's data are edited.
- `Content`: Tokens which provide default content or other fixed props. Any hardcoded, translatable
  strings belong in this domain.
- `Behavior`: Tokens which define or add behaviors to a component; e.g., the expanding and
  contracting of an accordion.
- `Schema`: Tokens which define how a component's data are organized; e.g., node keys.

### Special Domains

The following special domains have values which are not extended domain objects:

- `Compose`: This special domain allows specifying other named tokens which should be composed with
  this one. See [Extension and Composition](../Tokens/#extension-and-composition) for more
  details. For example:

  ```ts
  const Sticky = asHeaderToken({
    ...Base,
    Compose: {
      // Apply the WithSticky token to the component as a whole.
      WithSticky,
    },
  });
  ```

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

HOCs defined for each domain are applied in a fixed order (as listed above), regardless of the order
in which they are specified in an individual token.

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

## Additional Considerations and Gotchas

### Access to Component Data

Note the position of the `Editors` and `Schema` domains which usually provide the data that a
component renders. They are applied "outside" (after) the styling domains (`Theme`, `Layout`,
`Spacing`), so that these domains will have access to the data (to allow conditional styling based
on state). However, they are "inside" (before) the `Compose` and `Condition` domain — so that tokens
added to the component via `Compose` will not have access to the component's data.
