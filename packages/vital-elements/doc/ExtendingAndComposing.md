# Extending and Composing Tokens

Vital tokens are designed to be customized. They provide a starting point for the style and behavior
of a component, but, in almost every case, you will extend or compose them to meet the specific
requirements of your site, reusing what fits your use case, and overriding or extending what does
not.

There are several strategies for implementing these customizations; these are described in detail in
this article.

In the examples below, we'll use [the simple `Dialog` component from the "Introducing VitalDS"
guide](../Curriculum/Introduction/) as our base component.

```ts
const Default = asDialogToken({
  Theme: {
    Border: 'p-2 border-2 rounded-lg',
    TitleWrapper: 'text-2xl bold',
    MessageWrapper: 'italic',
  },
  Spacing: {
    Border: 'p-2',
  },
  Components:
    Title: on(EditorPlainClean)(vitalEditorPlain.Default),
    Message: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Schema: {
    Title: withChildNode('title').
    Message: withChildNode('message'),
  },
});
```

## Extending

Vital tokens are structured collections of React _higher-order components_ (HOCs). They are
JavaScript objects with predefined keys, and the most straightforward way to customize them is to
use basic JavaScript object manipulation:

```ts
const Custom = asDialogToken({
  // Reuse everything from the default token...
  ...Default,
  // ...Except the `Theme` domain which we override.
  Theme: {
    // Reuse everything from the `Theme` domain...
    ...Default.Theme,
    // ...except the `TitleWrapper` styling which we override.
    TitleWrapper: 'text-3xl',
  },
});
```

This will result in an object which is exactly the same as the original `Default` token except for
the value at `Custom.Theme.TitleWrapper`, which will have changed from `text-2xl bold` to
`text-3xl`. There's no magic here, it is just plain JavaScript.

You can also use this strategy to _extend_ part of a token rather than overriding:

```ts
const Custom = asDialogToken({
  // Reuse everything from the default token...
  ...Default,
  // ...Except the `Theme` domain which we override.
  Theme: {
    // Reuse everything from the `Theme` domain...
    ...Default.Theme,
    // ...but extend the `TitleWrapper` to add underlining.
    TitleWrapper: as(Default.Theme.TitleWrapper, 'underline'),
  },
});
```

Or to remove a portion of the token entirely:

```ts
const Custom = asDialogToken({
  // Reuse everything from the default token...
  ...Default,
  // ...Except the `Theme` domain which we override.
  Theme: {
    // Reuse everything from the `Theme` domain...
    ...Default.Theme,
    // ...but remove any styling applied to the `TitleWrapper`.
    TitleWrapper: undefined,
  },
});
```

Or using the `omit` utility from [Lodash](https://lodash.com/docs/#omit ':target=_blank'):

```ts
const Custom = asDialogToken({
  // Reuse everything from the default token...
  ...Default,
  // ...Except the `Theme` domain which we override, reusing everything
  // but omitting the `TitleWrapper` styling.
  Theme: omit(Default.Theme, 'TitleWrapper'),
});
```

You could use the same technique to exclude an entire domain:

```ts
const Custom = asDialogToken(
  // Remove all styling applied in the default `Theme` domain.
  omit(Default, 'Theme'),
);
```

Or, without `omit`:

```ts
const Custom = asDialogToken({
  ...Default,
  // Remove all styling applied in the default `Theme` domain.
  Theme: undefined,
});
```

## Merging Tokens

The above examples demonstrate the simplest and most straightforward method of extending a token
using vanilla JavaScript object manipulation. They have the virtue of being explicit: you can tell
at a glance exactly what is being added or removed. However, they are also a bit verbose — you must
remember to spread the default values within each domain, and use `as` in any slot you want to
extend, e.g.:

```ts
TitleWrapper: as(Default.Theme.TitleWrapper, 'underline')
```

Vital provides some token merge helpers to keep your code leaner and more readable.

### `as...TokenSpec`

You will recall that when you create a clean component, you also define an `as...TokenSpec` utility
which is used to create tokens which apply to that component. This utility helps ensure type safety
and also that the domains are applied in the correct order. It can also be used to extend a base
token, by providing multiple arguments. Consider our extension example above:

```ts
const Custom = asDialogToken({
  ...Default,
  Theme: {
    ...Default.Theme,
    TitleWrapper: as(Default.Theme.TitleWrapper, 'underline'),
  },
});
```

This could be written more simply using the `asDialogToken` helper, which will _merge_ all of its
arguments into a single token:

```ts
const Custom = asDialogToken(Default, {
  Theme: {
    TitleWrapper: 'underline',
  },
});
```

The two forms are identical, and which you use is a matter of personal preference, but remember:

- If you use the explicit method, you must spread any domain from the original token or it will be
  excluded, and when extending a specific slot, you must use `as`.
- If you use the shorthand method, you cannot remove styling from a domain or slot. In our example
  above, the `Custom` token includes everything from the `Theme` domain of the original token,
  whereas if we had written—
  ```ts
  const Custom = asDialogToken({
    ...Default,
    Theme: {
      TitleWrapper: 'underline',
    },
  });
  ```
  —everything from the `Theme` domain would be _excluded_.

### `extendDomain`

Sometimes you want to combine the explicit method with the shorthand.

> @TODO Example

## Composition

Where extension takes an existing token and modifies its effect, _composition_ takes several
existing tokens and _combines_ them. The most basic form of composition is performed using the `as`
utility:

```ts
const WithGreenBorder = asDialogToken({
  Theme: {
    Border: 'border-green-500',
  },
});

const GreenDialog = as(Default, WithGreenBorder)(DialogClean);
```

`as` takes one or more tokens and combines them into a HOC that applies the tokens one after the
other in the order specified. In addition to full token objects, `as` can also take strings (which
will be interpreted as lists of classes to apply to the component as a whole) and functions (which
will be interpreted as HOCs to apply to the component as a whole). Since the `DialogClean` component
passes all props to the `Border`, the above could also have been written:

```ts
const GreenDialog = as(Default, 'border-green-500')(DialogClean);
```

<!-- Inlining HTML to add multi-line info block with code blocks. -->
<div class="warn">
  <strong>Note:</strong> The order in which tokens are composed can be important, as—

  ```ts
  as(addProps({ foo: 'bar' }), removeProps('foo'))
  ```

  —will result in the prop `foo` being present, while—

  ```ts
  as(removeProps('foo'), addProps({ foo: 'bar' }));
  ```

  —will not. This is clearer if you understand that—

  ```ts
  as(a, b)(Component)
  ```

  —is actually equivalent to:

  ```ts
  b(a(Component))
  ```

  That is: The first token listed is applied to the component first, then the second, and so on. In
  a sense, the first token is "inside" the second. So, in our first example—

  ```ts
  as(addProps({ foo: 'bar' }), removeProps('foo'))
  ```

  —the `addProps` is applied inside the `removeProps`, so the prop is not yet present when
  `removeProps` is executed.

</div>

## When to Use Composition

You are probably asking yourself what's the difference between composing in this manner as opposed
to extending as we did earlier:

```ts
const GreenDialog = asDialogToken(Default, {
  Theme: {
    Border: 'border-green-500',
  },
});
```

Indeed, both will have the same effect when applied to a `DialogClean`:

```html
<div data-layer-region="Dialog:Border" className="p-2 border-2 rounded-lg border-green-500">
    ...
```

The difference lies in the way downstream consumers can use the `WithGreenBorder` token. In the
extension example, the color is bundled into the complete variation; it's wrapped up in the `Theme`
domain along with the border width and border radius. You can't easily change the border color of
`GreenDialog` without reconstructing it.

This is not that big a deal when, as here, we just want to add a single class. But there are several
use cases in which this makes a big difference.

### Layering

Imagine that, in addition to varying the border color, we also wanted to be able to vary other
aspects of the default `Dialog`:

```ts
const WithDashedBorder = asDialogToken({
  Theme: {
    Border: 'border-dashed',
  },
});
const WithRedTitle = asDialogToken({
  Components: {
    TitleWrapper: 'text-red-500',
  },
});
```

Now, we've introduced eight different combinations. We could use extension to create each
combination and add them all to our token collection, e.g.:

```ts
const GreenDialogWithRedTitleAndDashedBorder = asDialogToken(Default, {
  Theme: {
    Border: 'border-green-500 border-dashed',
    TitleWrapper: 'text-red-500',
  },
});

const GreenDialogWithRedTitleAndSolidBorder = asDialogToken(Default, {
  Theme: {
    Border: 'border-green-500',
    TitleWrapper: 'text-red-500',
  },
});
```

...And so on.

However, if we export our `With...` tokens instead, then a downstream consumer can compose them to
produce the desired variation:

```ts
const GreenDialogWithRedTitleAndSolidBorder = as(Default, WithGreenBorder, WithRedTitle);
```

This pattern is useful when your component has many dimensions of variation. You can see it in full
force with
[`vitalCard`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-card/src/components/Card/tokens/vitalCard.ts ':target=_blank').
Let's call this kind of token, one intended to be composed with another token to produce a
variation, a "Variator."

### Complex Variators

Of course, nothing stops a downstream consumer from constructing these variations themselves through
extension — but providing pre-defined, composable "Variators" can be a good way of encouraging
consistency. It's also very useful when the Variator includes modifications to multiple slots and/or
domains, as is often the case with layout-related tokens.

```ts
const WithHorizontalOrientation = asDialogToken({
  Layout: {
    Border: 'flex flex-col lg:flex-row',
    TitleWrapper: 'w-full lg:w-1/4',
    ContentWrapper: 'w-full lg:w-3/4',
  },
  Spacing: {
    TitleWrapper: 'lg:pr-2',
  },
});
```

### The `Compose` Domain

Sometimes, you want to provide a fully composed token with several Variators which can be used as
is, while allowing one or more of the Variators to be easily removed. For this purpose, Vital
provides the special `Compose` domain. Unlike those in other domains, the keys inside the `Compose`
domain do not refer to slots; rather they refer to named Variators.

Let's imagine we want our default `Dialog` to be horizontal with a green border:

```ts
const Default = asDialogToken({
  ...Plain, // The old `Default` token defined above.
  Compose: {
    WithGreenBorder,
    WithHorizontalOrientation,
  },
  //...
});
```

Then `as(Default)` is identical in effect to `as(Plain, WithGreenBorder,
WithHorizontalOrientation)`, but a downstream consumer can easily remove or replace the Variators:

```ts
const Custom = asDialogToken({
  ...Default,
  Compose: omit(Default.Compose, 'WithGreenBorder'),
});
```

### Avoid Extending with a Variator

You may be tempted to use a Variator to extend a base token, e.g.:

```ts
const Green = asDialogToken(Default, WithGreenBorder);
```

This should generally be avoided. Remember that Variators are intended to encapsulate some bit of
styling or functionality that can be applied (or removed) as a unit. When you extend with a
Variator, you are spreading its effects across the domains and slots of the token you are extending,
which makes it harder to extricate.

Also, while in many cases (including this example), extending will have the same effect as
composing, this is not always true. The reason, again, is that the order in which HOCs are applied
can make a difference.

> @TODO Example

### Removing with Composition

The composition pattern is great when you want to add some styling or functionality to an existing
token, but it's not so effective when you want to _remove_ something. Variators are usually applied
"outside" the tokens they extend, so they 

> @TODO Examples of `removeClasses` and `replaceWith`

## Extension is Really Recomposition

In fact, you can think of a normal token as a composition in itself of its constituent domains. That
is—

```ts
as(Default)
```

—is equivalent to:

```ts
as(
  asDialogToken(pick(Default, 'Components')),
  asDialogToken(pick(Default, 'Spacing')),
  asDialogToken(pick(Default, 'Theme')),
  asDialogToken(pick(Default, 'Schema')),
);
```

Or, even more granularly:

```ts
as(
  Default.Components._,
  withDesign(pick(Default.Components, 'Border')),
  withDesign(pick(Default.Components, 'TitleWrapper')),
  //...
);
```

Token objects are just a way of expressing these compositions in a structured way, and _extending_ a
token is really just recomposing it.

?> **Note:** The order in which domains are composed is fixed (you can see the full list of domains,
in order, in [Token Domains](./Tokens/TokenDomains)). It doesn't matter which order you specify them
in when defining your token; they will always be applied in the canonical order.

## Special Cases

### Removing Components from Fluid Tokens

For some container-like components ([RTE](../Components/VitalEditors/RTE_Editor),
[chameleons](/Components/Chameleon), [Flow Containers](../Components/VitalFlowContainer), etc.), the
selection of components is _fluid_ and determined by the tokens — unlike clean components, which
define a _fixed_ set of components — so removing these components from the token will effectively
remove them from the container. Note that you must remove them from _all_ domains. The presence of a
slot in any domain of any token which applies to such component will cause a component of that name
to be available in the container.

The components can be removed from the token using [Lodash's `omit`
function](https://lodash.com/docs/#omit ':target=_blank'):

```ts
const Custom = asFooToken({
  ...Foo,
  Layout: {
    ...omit(Foo.Layout, 'Bar'),
  },
  Schema: {
    ...omit(Foo.Schema, 'Bar'),
  },
  Theme: {
    ...omit(Foo.Theme, 'Bar'),
  },
});
```

In the example above, we're extending the `Foo` token, which utilizes the `Bar` component, and, for
whatever reason, we've decided we don't want to utilize the `Bar` component in our `Custom` version
of `Foo`, so, using `omit`, we've removed `Bar` from each domain where it is used.

Looking here—

```ts
  Layout: {
    ...omit(Foo.Layout, 'Bar'),
  },
```

—we're spreading the `Layout` components — except `Bar` — across the `Layout` domain. We use this
pattern for the `Schema` and `Theme` domains as well, where `Bar` has also been set.

?> **Note:** For a real-world use case of using `omit` to remove components, see [Removing
Components from Vital Rich Text Editor by
Shadowing](../Components/VitalEditors/RichTextCustomizing#removing-components-from-vital-rich-text-editor-by-shadowing).
