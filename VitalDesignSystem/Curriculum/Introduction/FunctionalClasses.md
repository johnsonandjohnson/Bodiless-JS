# Functional Classes

?> Note this section is still under development.

<!-- Inlining HTML to add multi-line info block with disclosure widget and unordered list. -->
<div class="warn">
  <strong>Note:</strong> Files containing code exampled on this page can be found under the <a
  target="_blank" rel="noopener noreferrer" href="https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-examples/src/intro/functional-classes">
  <code>intro/functional-classes</code> directory</a> in the <code>vital-examples</code> package.
  <br><br>
  <details>
  <summary>
    Expand for a list of the most relevant files...
  </summary>

  - [`./components/Dialog/Dialog.tsx`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-examples/src/intro/functional-classes/components/Dialog/Dialog.tsx)
  - [`./components/Dialog/tokens/exampleDialog.ts`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-examples/src/intro/functional-classes/components/Dialog/tokens/exampleDialog.ts)
  - [`./components/CustomDialog/tokens/customDialog.ts`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-examples/src/intro/functional-classes/components/CustomDialog/tokens/customDialog.ts)
  - [`./components/Border/tokens/exampleBorder.ts`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-examples/src/intro/functional-classes/components/Border/tokens/exampleBorder.ts)

  </details>
</div>

Up until now, our ability to control the styling of our `Dialog` through tokens has been limited.
The component takes a traditional approach to styling, applying semantic classes like
`Dialog--title` or `Dialog--message` to the elements. To modify the styling we need to write our own
CSS, overriding that provided by the component. This can rapidly become complicated in a large
project, where small CSS changes can have unforeseen consequences. Paradigms like [CSS
Modules](':target=_blank') have arisen to mitigate these risks, but they have their own problems
when it comes to downstream customization, as [this article](':target=_blank') points out.

Let's see how Vital approaches these issues using the paradigm of "Functional" or "Utility-First"
CSS as embodied in the popular [Tailwind CSS library](https://tailwindcss.com/ ':target=_blank').

?> **Note:** In this example, we use default Tailwind color classes. In most cases, you will create
custom color classes to match your site's design.

## Converting the Styles

Functional CSS (sometimes called Atomic or Utility-First) applies a core concept from functional
programming to CSS classes: Every class will have a consistent, predetermined effect wherever you
apply it. The effect is usually small and self-evident (`'text-red-600'`, `'pl-2'`, etc.). CSS is
generated from a configuration file and rarely (if ever) modified. To apply styling, you attach
multiple functional classes to the HTML element you want to style.

Let's rewrite our default `Dialog` tokens using Tailwind classes instead of the semantic classes
from the original example:

```ts
const Default = asDialogToken({
  Theme: {
    TitleWrapper: 'text-lg font-bold',
    MessageWrapper: 'italic',
  },
});
```

We get rid of the `dialog-title` and `dialog-message` classes (and the CSS that goes with them), and
replace them with functional classes which apply the same styling.

A full explanation of the whys and wherefores of this approach is out-of-scope of this article. For
our purposes, this pattern makes extension with slight modifications in style very easy. For
example, our `customDialog.Welcome` could surgically override the styling of the title without
writing any new CSS:

```ts
const Welcome = asDialogToken({
  ...exampleDialog.Welcome,
  Theme: {
    ...exampleDialog.Welcome.Theme,
    TitleWrapper: 'text-xl font-bold',
  },
});
```

This eliminates the need to resort to CSS tricks to override the original CSS rules, which can be
especially painful if they are scoped (e.g., via CSS Modules).

## Element Tokens

So far, we have left the original React example's `FancyBorder` component more-or-less intact. The
purpose of this component is to encapsulate decisions about border styling so they can be reused
across multiple parent components. In Vital, this would typically be done with a collection of
element tokens.

Element tokens represent design tokens in their most common sense — elemental bits of styling
(colors, spacing, etc.) which are reused throughout a design system. In other styling paradigms,
they are often represented by some sort of CSS variable. In Vital, they are represented like any
other token: as higher-order components (HOCs) which add functional classes.

?> **Note:** In Vital, we recognize two levels of design tokens: _palette_ tokens, which embody the
range of values available for a particular attribute; and _theme_ or _semantic_ tokens, which
represent _choices_ about how those values should be used in a particular context. Palette tokens
are generally used to define a site's Tailwind configuration, which, in turn, generates the
available functional classes. Semantic tokens are generally defined in standard Vital token
collections. In this example, we use the default Tailwind palette tokens, and compose them to match
our design needs. In real life, you would likely implement your own palette tokens to match the
specific designs of your site.

Let's replace the `FancyBorder` component with an `exampleBorder` token collection:

```ts
import { asElementToken } from '@bodiless/vital-elements';

const Fancy = asElementToken({
  Core: {
    _: 'border-2 rounded-lg',
  },
  Spacing: {
    _: 'p-2',
  },
});

const Blue = asElementToken({
  Theme: {
    _: 'border-blue-600',
  },
});

const Red = asElementToken({
  Theme: {
    _: 'border-red-600',
  },
});

export default {
  Fancy, Red, Blue,
};
```

Now we can update the `DialogClean` to use a plain `Div` for the border:

```ts
const dialogComponents: DialogComponents = {
  Border: Div,
  ...
```

And apply the appropriate `Border` tokens in our `exampleDialog` token collection
instead of passing props:

```ts
const Default = asDialogToken({
  Components: {
    Border: exampleBorder.Fancy,
  },
  ...,

const Welcome = asDialogToken({
  ...Default,
  Theme: {
    ...Default.Theme,
    Border: exampleBorder.Blue,
    ...
```

## Further Reading

- [Tailwind Guide](../../Guides/TailwindGuide)
