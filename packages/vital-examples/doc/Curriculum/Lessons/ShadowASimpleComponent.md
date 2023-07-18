# Shadow a Simple Component: Button

In this lesson we will learn how to shadow simple components, base elements for customizing a
website; in it, we will define colors, fonts, typography, and the like.

## Overview

Specifically, we will learn how to shadow a button component to apply custom styles and
modifications to it. In our case, we will override `vitalButtonBase.Primary` to add a hover
transition, and we will create a new variation: a larger button, which can be combined with all
other existing variations. To accomplish this, we will use the best practices for shadowing
components.

<!-- Inlining HTML to add multi-line info block with unordered list and codeblock. -->
<div class="warn">
  <strong>Note:</strong> For the code files used in this lesson, please see the following (either
  locally or on GitHub):

  - `packages/vital-examples/src/shadowing-simple-component`
    ([GitHub](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-examples/src/shadowing-simple-component
    ':target=_blank'))
  - `packages/vital-examples/src/styleguide/Page/StyleGuideTemplate/Button.tsx`
    ([GitHub](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-examples/src/styleguide/Page/StyleGuideTemplate/Button.tsx
    ':target=_blank'))
    - This is the
      [template](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/sites/vital-examples/src/data/pages/shadow-simple-component/template.json
      ':target=_blank') code for the page referenced below.

  To see the "Buttons" page in action, build and run the Vital Examples site—

  ```shell
  cd sites/vital-examples
  npm run build
  npm run dev
  ```

  —and go to <http://localhost:8000/shadow-simple-component/>.

</div>

## Assignment

### Creating Our Tokens

Let's start by creating a new `exampleButtons.ts` file, which will contain all of our tokens, both
the one we're going to overwrite and our new variation. The file should be under the following
structure:

```text
├── src
│   ├── components
│   │   ├── Buttons
│   │   │   ├─ tokens
│   │   │   │  └─ exampleButtons.ts
```

Since we are shadowing Vital elements, we should import the base version of the component:

```ts
import { vitalButtonBase } from '@bodiless/vital-button/src/base';
```

And once we have all the base variations from the Vital package, we can spread
`vitalButtonsBase.Primary` to preserve the domains that we don't want to change. As we're going to
add a transition to our button, we're going to use the `Theme` domain, and, once again, spread this
domain from `vitalButtonsBase.Primary` to preserve the button's settings and prevent unintentional
modifications.

[exampleButtons.ts](https://raw.githubusercontent.com/johnsonandjohnson/Bodiless-JS/main/packages/vital-examples/src/shadowing-simple-component/components/Buttons/tokens/exampleButtons.ts
':include :type=code :fragment=WithPrimary')

Here we rely on the `asButtonToken` function to help us with the tokens convention. This function
extends from
[`asVitalTokenSpec`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-elements/src/util/tokenSpec.ts#L48
':target=_blank') to create the token definition utility for the
[`ButtonClean`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-button/src/components/Button/ButtonClean.tsx
':target=_blank') component.

?> **Note:** As you may have noticed, we use a mix of `vital-elements` tokens and Tailwind classes
to compose our token.

Now let's create a new button variation: a bigger button with extra padding. For this, we should
follow the naming convention of variation tokens being prefixed by `With`; so, our new variation
will look like this:

[exampleButtons.ts](https://raw.githubusercontent.com/johnsonandjohnson/Bodiless-JS/main/packages/vital-examples/src/shadowing-simple-component/components/Buttons/tokens/exampleButtons.ts
':include :type=code :fragment=WithBigButton')

After we're done with the tokens, we should export these tokens alongside the ones from Vital
buttons:

[exampleButtons.ts](https://raw.githubusercontent.com/johnsonandjohnson/Bodiless-JS/main/packages/vital-examples/src/shadowing-simple-component/components/Buttons/tokens/exampleButtons.ts
':include :type=code :fragment=export-default')

### Shadowing

And now, to shadow our tokens, create a `Button.ts` file with the same path of the package. In our
case, since we are shadowing the `@bodiles/vital-button` package, we'll have this structure:

```text
├── shadow
│   ├── @bodiless
│   │   ├── vital-button
│   │   │   └─ Button.ts
```

Each file must only export the tokens from the components folder with our helper `shadow` function.

<!-- @TODO: Waiting for the actual function and docs to be available.
You can see more about this function [here](TBD). -->

Our whole file will only have 3 lines.

[Button.ts](https://raw.githubusercontent.com/johnsonandjohnson/Bodiless-JS/main/packages/vital-examples/src/shadowing-simple-component/shadow/%40bodiless/vital-button/Button.ts
':include :type=code')

That's all. With this done, our primary button will have a nice looking transition; we will also
have a new variation — a bigger button with extra padding — which can go with all other existing
tokens.

## Practice

Now you can try to create you own shadow files. Try to customize some Vital text decorations tokens,
or even create a new typography token.
