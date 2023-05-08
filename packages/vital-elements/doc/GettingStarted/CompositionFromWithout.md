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
}

const WelcomeDialog: FC = () => (
  <Dialog
    title="Welcome"
    message="Thank you for visiting our spacecraft!"
  />
);
```

In this example, we take a generic `Dialog` component and create a specific
variation of it by creating a new `WelcomeDialog` component which supplies
props. In a sense you could say we are composing *from within* -- the
composition happens *inside* the new component.

In Vital, you would accomplish the same thing *from without*, by creating a token:

```ts
import { addProps, as } from '@bodiless/fclasses';
import { asElementToken } from '@bodiless/vital-elements';

const Welcome = asElementToken({
  Content: {
    _: addProps({
        title: 'Welcome',
        message: 'Thank you for visiting our spacecraft!',
    }),
  }
});

const WelcomeDialog = as(Welcome)(Dialog);
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
  return (
    <FancyBorder color={props.color}>
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

export const WelcomeDialog: FC = props => (
    <Dialog
      color={FancyBorderColor.Blue},
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
);

```

Now, let's assume these components are provided by an upstream library, and I
want to use them, but on my site a welcome dialog is red, not blue. I have to
create a new component, manually replicating the content and changing the color:

```ts
const MyWelcomeDialog FC = () => (
  <Dialog
    color={FancyBorderColor.Red}
    title="Welcome"
    message="Thank you for visiting our spacecraft!"
  />
);
```

Now, if the upstream library changes the content:

```ts
const WelcomeDialog: FC = () => (
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
export const upstreamDialog = {
  Welcome,
};
```

Don't worry too much about the structure of the token--we'll get into that later. For
now it's enough to know that a token is a structured set of Higher Order Components
which compose styling or behavior onto a component. In this case, the token uses
the `addProps` utility to create those Higher Order Components.

Now I can recompose these attributes independently:

```ts
const Welcome = asElementToken({
  ...upstreamDialog.Welcome,
  Theme: {
    _: addProps({ color: FancyBorderColor.Red })
  }
});
const WelcomeDialog = as(MyWelcome)(Dialog);
```

THis is just plain old Javascript object composition -- we keep all the
top-level keys of the original token, but supply our own `Theme`.

Now if the content changes upstream, we'll receive the enhancement while still
retaining our customization.

Note that the upstream library no longer exports the specialized version
of the component (`WellcomeDialog`).  Instead it exports the specialization
as a token which can be more easily extended or customized downstream.

[Next: Reaching Inside](ReachingInside.md)

