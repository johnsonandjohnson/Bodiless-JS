# Composing from Outside

<!-- Inlining HTML to add multi-line info block with disclosure widget and unordered list. -->
<div class="warn">
  <strong>Note:</strong> Files containing code exampled on this page can be found under the <a
  target="_blank" rel="noopener noreferrer" href="https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-examples/src/intro/composing-from-outside">
  <code>intro/composing-from-outside</code> directory</a> in the <code>vital-examples</code>
  package.
  <br><br>
  <details>
  <summary>
    Expand for a list of the most relevant files...
  </summary>

  - [`./components/Dialog/types.ts`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-examples/src/intro/composing-from-outside/components/Dialog/types.ts)
  - [`./components/Dialog/Dialog.tsx`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-examples/src/intro/composing-from-outside/components/Dialog/Dialog.tsx)
  - [`./components/Dialog/tokens/exampleDialog.ts`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-examples/src/intro/composing-from-outside/components/Dialog/tokens/exampleDialog.ts)
  - [`./components/CustomDialog/tokens/customDialog.ts`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-examples/src/intro/composing-from-outside/components/CustomDialog/tokens/customDialog.ts)

  </details>
</div>

If you're a seasoned React developer, you are familiar with the concept of composition and the
[standard patterns for using it](https://legacy.reactjs.org/docs/composition-vs-inheritance.html
':target=_blank'). You are probably used to composing by creating a new _component_ that assembles
and encapsulates the functionality you want to compose. VitalDS approaches this slightly
differently. To understand this better, let's look at the [Specialization
Pattern](https://legacy.reactjs.org/docs/composition-vs-inheritance.html#specialization
':target=_blank') from the React docs. Here is the original code rewritten in TypeScript:

```ts
import React from 'react';
import type { FC } from 'react';

// FancyBorder........
enum FancyBorderColor {
  Red = 'red',
  Blue = 'blue',
};

export type FancyBorderProps = {
  color: FancyBorderColor,
};

const FancyBorder: FC<PropsWithChildren<FancyBorderProps>> = props => (
  <div className={`FancyBorder FancyBorder-${props.color}`}>
    {props.children}
  </div>
);

// Dialog...........
export type DialogProps = {
  title: string,
  message: string,
};

const Dialog: FC<DialogProps> = props => {
  return (
    <FancyBorder color={FancyBorderColor.Blue}>
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
};

const WelcomeDialog: FC = () => (
  <Dialog
    title="Welcome"
    message="Thank you for visiting our spacecraft!"
  />
);
```

In this example, we take a generic `Dialog` component and create a specific variation of it by
creating a new `WelcomeDialog` component that supplies props. In a sense, you could say we are
composing _from within_ — the composition happens _inside_ the new component.

In Vital, you would accomplish the same thing _from without_, by creating a token:

```ts
import { addProps, as } from '@bodiless/fclasses';
import { asElementToken } from '@bodiless/vital-elements';

const Welcome = asElementToken({
  Content: {
    _: addProps({
      title: 'Welcome',
      message: 'Thank you for visiting our spacecraft!',
    }),
  },
});

const WelcomeDialog = as(Welcome)(Dialog);
```

This may take a bit of getting used to, but it opens up a powerful pattern for extension and
recomposition through _layering_.

Let's imagine that in addition to allowing you to modify the content, the `Dialog` component also
allowed you to modify the color:

```ts

type DialogProps = {
  title: string,
  message: string,
} & FancyBorderProps;

export const Dialog: FC<DialogProps> = ({ color, title, message })=> (
  <FancyBorder color={color}>
    <h1 className="Dialog-title">
      {title}
    </h1>
    <p className="Dialog-message">
      {message}
    </p>
  </FancyBorder>
);

export const WelcomeDialog: FC = props => (
  <Dialog
    color={FancyBorderColor.Blue},
    title="Welcome"
    message="Thank you for visiting our spacecraft!"
  />
);
```

Now, let's assume these components are provided by an upstream library, and you want to use them,
but on your site, a welcome dialog is red, not blue. You have to create a new component, manually
replicating the content and changing the color:

```ts
const MyWelcomeDialog FC = () => (
  <Dialog
    color={FancyBorderColor.Red}
    title="Welcome"
    message="Thank you for visiting our spacecraft!"
  />
);
```

Now, if the upstream library changes the content—

```ts
const WelcomeDialog: FC = () => (
  <Dialog
    color={FancyBorderColor.Blue}
    title="Wilkommen! Bienvenu! Welcome!"
    message="Thank you for visiting our international spacecraft!"
  />
);
```

—you won't receive it. Essentially, you have "forked" the upstream component, and are cut off from
any future enhancements.

Using tokens, on the other hand, the upstream library can export these specializations
independently:

```ts
const Welcome = asElementToken({
  Theme: {
    _: addProps({ color: FancyBorderColor.Blue }),
  },
  Content: {
    _: addProps({
      title: 'Welcome',
      message: 'Thank you for visiting our spacecraft!',
    }),
  },
});

// Tokens are usually exported in a keyed dictionary called a "collection".
export const exampleDialog = {
  Welcome,
};
```

Don't worry too much about the structure of the token — we'll get into that later. For now, it's
enough to know that a token is a structured set of higher-order components that compose styling or
behavior onto a component. In this case, the token uses the `addProps` utility to create those
higher-order components.

Now you can recompose these attributes independently:

```ts
const Welcome = asElementToken({
  ...exampleDialog.Welcome,
  Theme: {
    _: addProps({ color: FancyBorderColor.Red }),
  },
});

const customDialog = {
  Welcome
};

const WelcomeDialog = as(customDialog.Welcome)(Dialog);
```

This is just plain old JavaScript object composition — you keep all the top-level keys of the
original token, but supply your own `Theme`.

Now if the content changes upstream, you'll receive the enhancement while still retaining your
customization.

Note that the upstream library no longer exports the specialized version of the component
(`WelcomeDialog`). Instead, it exports the specialization as a token which can be more easily
extended or customized downstream.
