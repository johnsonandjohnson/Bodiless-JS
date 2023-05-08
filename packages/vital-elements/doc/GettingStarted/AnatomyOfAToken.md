# Anatomy of a Token

Before we go further, it will help to understand how tokens are constructed
and applied.

For reference, let's look at the `Welcome` token we created in our
upstream library. You will recall this combines the `Default` token with some
additional styling and content.  It is equivalent to the following:

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

As we mentioned before, a token is a structured set of higher order components
which can be applied to a component.  These are structured as a two-layer
nested object.

The inner keys of this object (`TitleWrapper`, `MessageWrapper`, `Border`, etc)
correspond to the "slots" exposed by the clean component.  They are sometimes
referred to as "Design Keys".  The outer keys of the object (`Theme`, `Content`)
are called "Domains" and are used to divide the token into functional sections
which can be extended or overridden independently.  You can read more about the
specific domains defined in the VitalDS and their usage [here]().

The *values* of hte inner keys represent higher order components which should
be applied to the specified slot. These can be expressed:
- Dir
- A functionAny function provided as a value will
be treated as a HOC.  You can also specify a plain string, which will be
interpreted as a list of classes which will added to the component in
that slot.  Or you can specify another token object, which will be applied
as described below.

To apply a token to a component, you use the `as` utility, which converts the token
to a higher order component.  For example:

```ts
const WelcomeDialog = as(Welcome)(Dialog);
```

