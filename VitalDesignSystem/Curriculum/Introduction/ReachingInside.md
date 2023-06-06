# Reaching Inside

<!-- Inlining HTML to add multi-line info block with disclosure widget and unordered list. -->
<div class="warn">
  <strong>Note:</strong> Files containing code exampled on this page can be found under the <a
  target="_blank" rel="noopener noreferrer" href="https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-examples/src/intro/reaching-inside">
  <code>intro/reaching-inside</code> directory</a> in the <code>vital-examples</code> package.
  <br><br>
  <details>
  <summary>
    Expand for a list of the most relevant files...
  </summary>

  - [`./components/Dialog/types.ts`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-examples/src/intro/reaching-inside/components/Dialog/types.ts)
  - [`./components/Dialog/Dialog.tsx`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-examples/src/intro/reaching-inside/components/Dialog/Dialog.tsx)
  - [`./components/tokens/exampleDialog.ts`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-examples/src/intro/reaching-inside/components/tokens/exampleDialog.ts)
  - [`./components/CustomDialog/tokens/customDialog.ts`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-examples/src/intro/reaching-inside/components/CustomDialog/tokens/customDialog.ts)

  </details>
</div>

The [previous example](./ComposingFromOutside) allowed us to reuse functionality from an upstream
component library (or, really, _token_ library) while selectively extending it, but it has one
significant limitation: The various configuration options exposed by the `Dialog` component must be
defined by the upstream library.

By definition, this `Dialog` component can have a color (only red or blue), a title (plain text),
and a message (also plain text). If I want to add a new variation (e.g., change the element used to
render the title, add some analytics attributes, change a class on the description, etc.), I need to
go back to the team maintaining the component and ask them to add new props (e.g., `titleElement`,
`dataLayerIds`, `messageClass`, etc.).

In this section we will refactor according to Vital principles so that a downstream consumer can
implement any of these variations themselves.

We begin by turning the `Dialog` component itself into a "clean" component. The first step is to
define the sub-components, or slots, which the clean `Dialog` will expose. These can be modified by
applying Vital tokens to this component.

```ts
import type { ComponentOrTag } from '@bodiless/fclasses';
import { H1, P, Fragment } from '@bodiless/fclasses';
export type DialogComponents = {
  Border: ComponentOrTag<any>,
  TitleWrapper: ComponentOrTag<any>,
  Title: ComponentOrTag<any>,
  MessageWrapper: ComponentOrTag<any>,
  Message: ComponentOrTag<any>,
};

const dialogComponents: DialogComponents = {
  Border: FancyBorder,
  TitleWrapper: H1,
  MessageWrapper: P,
  Title: Fragment,
  Message: Fragment,
};
```

Note that, in most cases, these are simple HTML elements (we import the `stylable` versions from
`@bodiless/fclasses` so that they can have classes applied by Vital tokens).

Now we can create the clean `Dialog` component itself.

```tsx
import { designable } from '@bodiless/fclasses';

const DialogCleanBase: FC<DialogBaseProps> = ({ components: C, ...rest }) => (
  <C.Border {...rest}>
    <C.TitleWrapper>
      <C.Title />
    </C.TitleWrapper>
    <C.MessageWrapper>
      <C.Message />
    </C.MessageWrapper>
  </C.Border>
);

const DialogClean = designable(dialogComponents, 'Dialog')(DialogCleanBase);
```

As you can see, this component has zero functionality or styling built in. Instead, we use the
`designable` utility to allow these to be provided by tokens. The resulting component will receive a
`design` prop. This is an object with the same keys as the `components` prop received by the base
component. Each value is a higher-order component (HOC) composing all the Vital tokens which have
been applied to that slot. `designable` will apply the HOCs to the starting component in each slot,
and pass the resulting sub-component through to the `DialogCleanBase` in the `components` prop.

?> **Note:** The second parameter passed to `designable` is a string which will be used to identify
slots in the rendered markup. This makes it easier to understand which slot to target in order to
modify a particular DOM element.

A few things to note about the structure of our clean component:

- We split most slots in two, providing both a content slot (e.g., `Title`) and a wrapper slot
  (e.g., `TitleWrapper`). This allows us to swap out content without disturbing layout or other
  styling applied to the wrapper.
- The content slots (`Title` and `Message`) are each defined as a `Fragment`. This is because we
  want to be agnostic about what kind of content will be injected — it could be text, an image, a
  video, or even something more complex.
- We pass all props received by the `Dialog` to whatever occupies its outermost wrapper (the
  `Border` slot). This is common practice, but in some special use cases, you may want to pass some
  props to one of the other elements. For example, if your component accepts a `children` prop, you
  may want to pass this to the innermost element, as is done in [the core Vital `Link`
  component](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-link/src/components/Link/LinkClean.tsx).

Now we're ready to start applying styling and behavior to our `Dialog` by creating Vital tokens.

First, we create a utility that can be used to create tokens that apply to the `DialogClean`
component. This ensures type safety, as well as ensuring that all token domains will be applied in
the canonical order.

```ts
const asDialogToken = asVitalTokenSpec<DialogComponents>();
```

Next, we create a `Default` token. This simply applies classes which define basic styling of all
`Dialog` components.

```ts
const Default = asDialogToken({
  Theme: {
    TitleWrapper: 'Dialog-title',
    MessageWrapper: 'Dialog-message',
  },
});
```

?> **Note:** Here, we're still using the semantic class names from the original React example. In
the next section, we'll convert these to the "functional" TailwindCSS classes which are used in
Vital.

Finally, we'll create a specialized variation of the `Dialog` by composing some additional styling
and content onto our `Default` token:

```ts
const Welcome = asDialogToken({
  ...Default,
  Theme: {
    ...Default.Theme,
    Border: addProps({ color: FancyBorderColor.Blue }),
  },
  Content: {
    Title: addProps({ children: 'Welcome!' }),
    Message: addProps({ children: 'Thank you for visiting our spacecraft!' }),
  },
});
```

Now I can still customize my `Dialog` exactly as before—

```ts
const Welcome = asDialogToken({
  ...exampleDialog.Welcome,
  Theme: {
    ...exampleDialog.Welcome.Theme,
    Border: addProps({ color: FancyBorderColor.Red }),
  },
});
```

—but I can also compose other variations:

```ts
// Change the element used to render the title
const WelcomeH2 = asDialogToken({
  ...Welcome,
  Components: {
    ...exampleDialog.Welcome.Components,
    Title: startWith(H2),
  },
});

// Add some microdata
const WithQuestionSchema = asDialogToken({
  SEO: {
    Border: addProps({ itemscope: true, itemtype: 'https://schema.org/Question' }),
    TitleWrapper: addProps({ itemprop: 'name' }),
    MessageWrapper: addProps({ itemprop: 'acceptedAnswer' }),
  },
});

// Add a class to the message
const WelcomeWithRedMessage = asDialogToken({
  ...Welcome,
  Theme: extendDomain(Welcome.Theme, {
    MessageWrapper: 'Dialog-message--red',
  }),
});
```

Note again that all the tokens above are just objects and can be combined and modified using
standard JavaScript object manipulation.

In the last example, rather than replacing the `Theme` domain, we extend it using the Vital
`extendDomain` utility. This is just a deep merge utility which preserves all the values from the
base token and adds new ones rather than replacing them.

Note also, that the third example, `WithQuestionSchema`, is different from the others — it does not
include the `Welcome` `Dialog`. This is an example of a token that is not intended to be used by
itself, but rather combined with, or layered onto, another token.

```ts
const QuestionDialog = as(customDialog.Welcome, customDialog.WithQuestionSchema)(DialogClean);
```

This means that you don't have to create fully-composed tokens for every possible combination of
behavior and style; you can export these as independent bits and allow your consumers to combine
them to produce the variations they want.

The possibilities are endless!

?> **Note:** By convention, tokens which are not intended to be used alone, but rather combined with
other tokens, are named beginning with `With...`.
