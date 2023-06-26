# Anatomy of a Token

Before we go further, it will help to understand how tokens are constructed and applied.

For reference, let's look at the `Welcome` token we created in our upstream library. You will recall
this combines the `Default` token with some additional styling and content. It is equivalent to the
following:

```ts
const Welcome = asDialogToken({
  Theme: {
    TitleWrapper: 'Dialog-title',
    MessageWrapper: 'Dialog-message',
    Border: addProps({ color: FancyBorderColor.Blue }),
  },
  Content: {
    Title: addProps({ children: 'Welcome!' }),
    Message: addProps({ children: 'Thank you for visiting our spacecraft!' }),
  },
});
```

?> **Note:** So far, we are still using the semantic CSS class names from the original React
example. In a true Vital token, we would actually use _functional_ classes from Tailwind CSS. We'll
get to that in the next section.

As we mentioned before, a token is a structured set of higher-order components which can be applied
to a component. These are structured as a two-layer nested object.

The outer keys of the object (`Theme`, `Content` in the example above) are called "domains" and are
used to divide the token into functional sections which can be extended or overridden independently.
You can read more about the specific domains defined in the VitalDS and their usage
[here](../../Guides/Tokens/TokenDomains). The inner keys of this object (`TitleWrapper`,
`MessageWrapper`, `Border`, etc.) correspond to the "slots" exposed by the clean component. They are
sometimes referred to as "design keys." Note, that in addition to the internal design keys exposed
by the component, you can also define the special `_` key here to specify a token which should be
applied to the component as a whole, as we did in the original `Dialog` tokens from [Composing From
Outside](./ComposingFromOutside):

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
```

The _values_ of the inner keys represent higher-order components that should be applied to the
specified slot. Each can be expressed as:

- A function, which will be interpreted as a higher-order component;
- A string, which will be interpreted as a list of classes to be added via the
  [`addClasses`](/Development/API/@bodiless/fclasses/README?id=addclasses) utility;
- Another token, which will be converted to a HOC.

To apply a token to a component, you use the `as` utility, which converts the token to a
higher-order component. For example:

```ts
const WelcomeDialog = as(Welcome)(Dialog);
```

`as` accepts a list of tokens, strings, or functions and interprets them exactly as described above,
creating a single HOC that applies the tokens — in order — to the component.

Note also the use of `asDialogToken` in the example above. We exported this utility from our
`DialogClean` component:

```ts
const asDialogToken = asVitalTokenSpec<DialogComponents>();
```

Every token you create must be similarly wrapped. This:

- Provides type safety for the domains and design keys;
- Ensures that the domains are in the correct order;
- Allows you to merge multiple tokens.

So whenever you create a new clean component, be sure to export an `as..Token` utility to help your
downstream consumers create new tokens.

## Some Things to Remember

### Tokens are JavaScript Objects

Even though they compose higher-order components, tokens are really just plain old JavaScript
objects, and can be composed using normal spread syntax:

```ts
const Welcome = asDialogToken({
  ...Default,
  Theme: {
    ...Default.Theme,
    Border: addProps({ color: FancyBorderColor.Blue }),
  },
  //...
});
```

### Order is Important

The order in which tokens are applied can make a difference. Consider the following:

```ts
const withA: (a: boolean): HOC => C => props => <C {...props} a={a} />
const WithATrue = asDialogToken({
  Core: {
    _: withA(true),
  }
})
const WithAFalse = asDialogToken({
  Core: {
    _: withA(false),
  }
});

as(withATrue, WithAFalse)(C); // -> <C a={false} />
as(withAFalse, WithATrue)(C); // -> <C a={true} />
```

It's important to remember that this is also true for the domains of a single token. These are
applied in a fixed order (see [Token Domains](../../Guides/Tokens/TokenDomains)), and those applied
later will take precedence.

## Further Reading

- [Extending and Composing Tokens](../../Guides/ExtendingAndComposingTokens)
- [Tokens](../../Guides/Tokens/)
- [Token Domains](../../Guides/Tokens/TokenDomains)
