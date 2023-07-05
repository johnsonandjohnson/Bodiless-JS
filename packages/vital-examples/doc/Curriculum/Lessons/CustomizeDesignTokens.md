# Customize Design Tokens

In this lesson we will learn how to shadow design elements, base elements for customizing a website;
in it, we will define colors, fonts, typography, and the like.

## Overview

In this lesson we will:

- Shadow the Vital colors with [this palette](https://coolors.co/ccfbfe-cdd6dd-cdcacc-cdaca1-cd8987
  ':target=_blank');
- Shadow Vital text decoration to customize the font weight;
- Shadow `H1` and `H2` element tokens to use our custom font and its properties.

<!-- Inlining HTML to add multi-line info block with unordered list and codeblock. -->
<div class="warn">
  <strong>Note:</strong> For the code files used in this lesson, please see the following (either
  locally or on GitHub):

  - `packages/vital-examples/src/customizing-design-tokens`
    ([GitHub](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-examples/src/customizing-design-tokens
    ':target=_blank'))
  - `packages/vital-examples/src/styleguide/Page/StyleGuideTemplate/` `Typography.tsx`
    ([GitHub](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-examples/src/styleguide/Page/StyleGuideTemplate/Typography.tsx
    ':target=_blank'))
    - This is the
      [template](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/sites/vital-examples/src/data/pages/customizing-design-tokens/template.json
      ':target=_blank') code for the page referenced below.

  To see the "Typography" page in action, build and run the Vital Examples site—

  ```shell
  cd sites/vital-examples
  npm run build
  npm run start
  ```

  —and go to <http://localhost:8000/customizing-design-tokens/>.

</div>

## Assignment

First, we'll need to edit the `tailwind.config.js` file to add the custom variable, colors, font,
and sizes for our examples. You can follow [the naming convention from
Tailwind](https://tailwindcss.com/docs/customizing-colors#naming-your-colors ':target=_blank'). Note
that we use the `vital-` prefix to define our colors. Our Tailwind file will look like this:

**`tailwind.config.js`:**

```js
module.exports = {
  theme: {
    colors: {
      'vital-primary': {
        brand: '<COLOR>',
        // ...
      },
      // ...
    },
  },
};
```

?> **Note:** With this, the colors should be already overridden.  
You can find all Vital colors
[here](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-elements/src/components/Color/tokens/vitalColor.ts
':target=_blank').

Then, under the `src/component` folder, we'll create the files with the components names. In our
case, we'll override the `Typography` and `TextDecoration`, so we create these files.

### Components

For the sake of this example, we'll create two components, which extend the Vital components
(`TextDecoration` and `Typography`) and define our custom tokens. To shadow them, we'll just export
them.

#### `TextDecoration`

The `TextDecoration` class is easier to do, since we just export some tokens with only a class for
each token. Our file will look like this:

**`src/component/TextDecoration/tokens/exampleTextDecoration.ts`:**

[exampleTextDecoration.ts](https://raw.githubusercontent.com/johnsonandjohnson/Bodiless-JS/main/packages/vital-examples/src/customizing-design-tokens/components/TextDecoration/tokens/exampleTextDecoration.ts
':include :type=code')

?> **Note:** The `asTokenGroup` function creates a group of element tokens that share the same
metadata. You can find more information about the `Meta` domain
[here](../../Guides/Tokens/TokenDomains#special-domains).

In this example we overwrite the `Bold` token to set a bolder font.

#### `Typography`

For the typography, we will have to do some more work. Each typography element should be an instance
of `asElementToken`, so we can rely on domains to help us to define our tokens. Our typography file
will be something like this:

**`src/component/TextDecoration/tokens/exampleTypography.ts`:**

[exampleTypography.ts](https://raw.githubusercontent.com/johnsonandjohnson/Bodiless-JS/main/packages/vital-examples/src/customizing-design-tokens/components/Typography/tokens/exampleTypography.ts
':include :type=code')

In this example, we created custom `H1` and `H2` tokens, and exported them with the Vital typography
base, so that our package has all the Vital tokens.

### Shadowing

And now, to shadow our tokens, create a file with the same path as the package. In our case, since
we area shadowing the `@bodiless/vital-elements` package, we'll have this structure—

```text
├── shadow
│   ├── @bodiless
│   │   ├── vital-elements
│   │   │   ├─ Typography.ts
│   │   │   └─ TextDecoration.ts
```

—Where each file exports the tokens from the `components` folder.

## Practice

Now you can try to create you own shadow files. Try to customize some Vital text decorations tokens,
or even create a new typography token.
