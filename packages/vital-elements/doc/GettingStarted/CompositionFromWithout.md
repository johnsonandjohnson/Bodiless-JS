# Composition from Without

If you're a seasoned React developer, you are familiar with the concept of
composition and the
[standard patterns for using it](https://legacy.reactjs.org/docs/composition-vs-inheritance.html).
You are probably used to composing by creating a new *component* which assembles
and encapsulates the functionality you want to compose. Vital-DS approaches this
slightly differently. To understand this better, let's look at the
[Specialization Pattern](https://legacy.reactjs.org/docs/composition-vs-inheritance.html#specialization)
from the React docs.  Here is the original code rewritten in Typescript.

```ts
import React from 'react';
import type { FC } from 'react';

/// FancyBorder........
enum FancyBorderColor {
  Red = 'red',
  Blue = 'blue',
};

export type FancyBorderProps = {
  color: FancyBorderColor,
};

const FancyBorder: FC<PropsWithChildren<FancyBorderProps>> = props => (
  <div className={'FancyBorder FancyBorder-' + props.color}>
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
}

const WelcomeDialog: FC = () => (
  <Dialog
    title="Welcome"
    message="Thank you for visiting our spacecraft!"
  />
);
```

In this example, we take a generic "Dialog" component and create a specific variation of
it by creating a new component which supplies props.  In a sense you could say we are
composing *from within* -- the composition happens *inside* the new component.

In Vital, you would accomplish the same thing *from without*, by creating a token:

```ts
import { addProps, as } from '@bodiless/fclasses';
import { asElementToken } from '@bodiless/vital-elements';

const WithWelcomeText = asElementToken({
  Content: {
    _: addProps({
        title: 'Welcome',
        message: 'Thank you for visiting our spacecraft!',
    }),
  }
});

const WelcomeDialog = as(WithWelcomeText)(Dialog);
```

This may take a bit of getting used to, but it opens up a powerful pattern for extension
and recomposition through *layering*.

Let's imagine that in addition to allowing you to modify the content, the `Dialog`
component also allowed you to modify the color:

```ts

type DialogProps = {
  title: string,
  message: string,
} & FancyBorderProps;

const Dialog: FC<DialogProps> = props => {
  const className = props.color === FancyBorderColor.Blue ? 'FancyBorder-blue' : 'FancyBorder-red';
  return (
    <FancyBorder className={className}>
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}
```

If you wanted to provide different specialized variations, you'd have to export different
components, for example:
```js
export const WelcomeDialog: FC = props => (
    <Dialog
      color={FancyBorderColor.Blue},
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
);

export const FarewellDialog: FC = props => (
    <Dialog
      color={FancyBorderColor.Red}
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
);
```

But what if these components are provided by an upstream library, and I want to
use them, but on my site a farewell dialog is blue and a welcome dialog is red?
I have to create new components, manually replicating the content and changing
the color:

```ts
import { Dialog } from 'upstream-library';

const MyWelcomeDialog FC = () => (
  <Dialog
    color={FancyBorderColor.Red}
    title="Welcome"
    message="Thank you for visiting our spacecraft!"
  />
);

const MyFareWellDialog: FC = () => (
  <Dialog
    color={FancyBorderColor.Blue}
    title="Farewell"
    message="Don't forget your spacesuit!"
  />
);
```

Now, if the upstream library changes the content:

```ts
const WelcomeDialog: FC = props => (
  <Dialog
    color={FancyBorderColor.Blue}
    title="Wilkommen! Bienvenu! Welcome!"
    message="Thank you for visiting our international spacecraft!"
  />
);
```

I won't receive it. Essentially, I have "forked" the upstream component, and am
cut off from any future enhancements.

Using tokens, on the other hand, the upstream library can export these specializations
independently:

```ts
const WithBlueTheme = asElementToken({
  Theme: {
    _: addProps({ color: FancyBorderColor.Blue }),
  },
});

const WithRedTheme = asElementToken({
  Theme: {
    _: addProps({ color: FancyBorderColor.Red }),
  },
});

export const upstreamDialog = {
  WithWelcomeText,
  WithFarewellText,
  WithRedTheme,
  WithBlueTheme,
};
```

And I can recompose them independently:

```ts
import { Dialog, upstreamDialog } from 'upstream-library';

const MyWelcomeDialog = as(
  upstreamDialog.WithWelcomeText,
  upstreamDialog.WithRedBorder
)(Dialog);

const MyFarewellDialog - as(
  upstreamDialog.WIthFarewellText,
  upstreamDialog.WithBlueBorder)(Dialog
);
```

Now if the text changes upstream, I'll receive the enhancement while still
retaining my customization.

[Next: Reaching Inside](ReachingInside.md)

