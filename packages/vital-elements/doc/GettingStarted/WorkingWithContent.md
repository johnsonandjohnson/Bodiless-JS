# Working with Content

Our `Dialog` component now looks a lot like any other Vital component:
- It has a "clean" component with very little functionality in itself, but able
  to have these added through Vital tokens.
- It has a `Default` token which creates a generic dialog, as well as a few
  variations.
- It uses Tailwind classes for styling
- It can be extened or customized in myriad ways by downstream consumers.

But there is still one area where it is incomplete: its content (the title
and message) are baked into the tokens and can't be edited.

