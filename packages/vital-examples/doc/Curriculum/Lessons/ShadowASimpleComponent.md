# Shadowing a Simple component: Button

In this lesson we will learn how to shadow simple components, these are the base elements for customizing a website, in it we will define colors, fonts, typography and the like.

## Overview

In this lesson we will learn how to shadow a button component to apply custom styles and modifications to it.
In our case, we will override the `vitalButtonsBase.Primary` to add a hover transition, and we will crate a new variation, a larger button, which can be combined with all other existings variations.
To accomplish this, we will use the best practices for shadowing components.


## Assignment

### Creating our tokens

Let's start by creating a new `exampleButtons.ts` file, which will contain all of our tokens, both the one we're going to overwrite and our new variation. The file should be under the follow structure.

```bash
├── src
│   ├── components
│   │   ├── Buttons
│   │   |   ├─ tokens
│   │   |      └─ exampleButtons.ts
```

Since we are shadowing vital elements, we should import the base version of the component.

```ts
...
import { vitalButtonsBase } from '@bodiless/vital-buttons/src/base';
...
```
And once we have the base all the base variations from the vital package, we can spread `vitalButtonsBase.Primary` to preserve the domains that we don't want to change.
As we're going to add a transition to our button, we're going to use the Theme domain once again, spreading this domain from `vitalButtonsBase.Primary` to preserve the button's settings and prevent unintentional modifications.

```ts
...
const WithPrimary = asButtonToken({
  ...vitalButtonsBase.Primary,
  Theme: {
    /**
     * Spreading Theme here prevents unwanted changes, keeping all tokens other than the wrappers.
     */
    ...vitalButtonsBase.Primary.Theme,
    Wrapper: as(
      vitalColor.BgPrimaryBrand,
      vitalColor.TextWhite,
      vitalTextDecoration.Bold,
      vitalTextDecoration.Uppercase,
      vitalFontSize.Base,
      'rounded hover:bg-vital-primary-interactive transition-colors duration-400',
    ),
  },
});
...
```
Here we rely on the `asButtonToken` function to help us with the tokens convention. This function extends from [asVitalTokenSpec](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-elements/src/util/tokenSpec.ts#L48) to create the token definition utility for te [ButtonClean](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-buttons/src/components/Buttons/ButtonClean.tsx) component.

**PS:** As you can notice, we use a mix of `vital-elements` tokens and tailwind classes to compose our token.

Now, let's create a new button variation, a bigger button, with extra padding, for this, we should follow the naming convetion, variations tokens should be prefixed by `With`, so our new variation will look like this.

```ts
/**
 * Here we follow the same logic, but this time, we'll create a new variation of button, a big
 * button with extra padding.
 */
const WithBigButton = asButtonToken({
  ...vitalButtonsBase.Default,
  Spacing: {
    ...vitalButtonsBase.Default.Spacing,
    Wrapper: 'px-12 py-6',
  },
});
```
After we're done with the tokens, we should export these tokens alongside the ones from vital buttons.

```ts
// Exporting the vitalButtonsBase with our custom Primary with hover, and our new big variation.
export default {
  ...vitalButtonsBase,
  WithPrimary,
  WithBigButton,
};
```


### Shadowing

And now, to shadow the our tokens, create a `Buttons.ts` file with the same path of the package, in our case, since we are shadowing the `@bodiles/vital-buttons` package, we'll have this structure.

```bash
├── shadow
│   ├── @bodiless
│   │   ├── vital-buttons
│   │   |   └─ Buttons.ts
```

<!-- Waiting for the actual function to be available; -->
Each file must only export the tokens from the components folder with the our helper `shadow` function. You can see more about this function [here](TBD).

Our whole file will only have 3 lines.

```ts
import { shadow } from '@bodiless/vital-elements';
import { exampleButtons } from '../../../components/Buttons';

export default shadow(exampleButtons, 'Example:Buttons');
```

That's all, with this done, ou primary button will have a nice looking transition, and we will also have a new variation, a bigger button with extra padding, which can go with all other existing tokens.

## Practice

Now you can try to create you own shadow files, try to customize some vital text decorations tokens, or even create a new typography token.
