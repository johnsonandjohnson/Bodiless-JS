# Learn how to Customize Design Tokens

In this lesson we will learn how to shadow the design elements, these are the base elements for customizing a website, in it we will define colors, fonts, typography and the like.

## Overview

In this lesson we will:

- Shadow the vital colors with [this palette](https://coolors.co/ccfbfe-cdd6dd-cdcacc-cdaca1-cd8987).
- Shadow vital text decoration to customize the font weight
- Shadow H1 and H2 element tokens to use our custom font and it's properties.


## Assignment

First, we'll need to edit the `tailwind.config.js` file to add the custom variable, colors, font and sizes for examples. You can follow [the naming convention from tailwind](https://tailwindcss.com/docs/customizing-colors#naming-your-colors).
Note that we use the `vital-` prefix to define our colors, our tailwind file will look like this

#### `tailwind.config.js`
```js
module.exports = {
  theme: {
    colors: {
        'vital-primary': {
            brand: '<COLOR>',
            // ...
        },
        // ...
    }
  }
}
```
**PS:** With this, the colors should be already overrided.
You can find all vital colors [in here](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-elements/src/components/Color/tokens/vitalColor.ts).

Then under the `src/component` folder, we'll create the files with the Components names, in our case, we'll override the `Typography` and `TextDecoration`, so we create theses files.

### Components

For the sake of this example, we will two components, which extends the vital components, `TextDecoration` and `Typography` and define our custom tokens, and to shadow them, we'll just export them.

#### TextDecoration

The `TextDecoration` class is easier to do, since we just export some tokens with only a class for each tokens, our file will look like this.

##### `src/component/TextDecoration/tokens/exampleTextDecoration.ts`
```ts
import { asTokenGroup, TextDecorationMeta } from '@bodiless/vital-elements';
import { vitalTextDecorationBase } from '@bodiless/vital-elements/src/base';

export default asTokenGroup(TextDecorationMeta)({
  ...vitalTextDecorationBase,
  Bold: 'font-black',
});

```

**PS:** the `asTokenGroup` function creates a group of element tokens that share the same metadata, you can find more information about the Meta domain [here](../../Guides/Tokens/TokenDomains#special-domains).

In this example we overwrite the the `Bold` token to set a bolder font.

#### Typography

For the typography, we will have to do some more work, each typography element should be a instance of `asElementToken`, so we can rely on Domains to help us to define our tokens. Our typography file will be something like this.

##### `src/component/TextDecoration/tokens/exampleTypography.ts`
```ts
import { asElementToken, vitalColor, vitalFontSize, vitalTextDecoration } from '@bodiless/vital-elements';
import { vitalTypographyBase } from '@bodiless/vital-elements/src/base';

const H2 = asElementToken({
  ...vitalTypographyBase.H2,
  Core: {
    _: as(vitalTextDecoration.ExtraBold, vitalFontSize.XXL)
  }
});
```

In this example, we created a custom H1 and H2 Tokens and exporting them with the vital typography base. So our package have all the vital tokens.

### Shadowing

And now, to shadow the our tokens, create a file with the same path of the package, in out case, since we area shadowing the `@bodiles/vital-elements` package, we'll have this structure.

```bash
├── shadow
│   ├── @bodiless
│   │   ├── vital-elements
│   │   |   ├─ Typography.ts
│   │   |   └─ TextDecoration.ts
```

Where each file export the tokens from the components folder.

## Practice

Now you can try to create you own shadow files, try to customize some vital text decorations tokens, or even create a new typography token.
