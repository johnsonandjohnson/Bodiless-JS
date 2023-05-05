# Shadowing Lesson with the Vital Design System

The preferred approach to extending or overriding the Vital Design System is by using Bodiless
Shadowing. It is based on [Gatsby Component
Shadowing](https://www.gatsbyjs.com/blog/2019-04-29-component-shadowing/ ':target=_blank'), but is
more restrictive. A simplistic definition of shadowing is a provided token that replaces the
existing design token. Whether you extend or override the token by shadowing is a choice made by the
Site Builder. For more detailed information, feel free to read
[Shadowing](../../../../VitalDesignSystem/Components/VitalElements/Shadow). Every Vital DS component
also has its own API documentation about shadowing its token.

?> **Note:** The ability to shadow a design requires the design package to be structured in a
specific way to allow it be shadowed. The site must use the
[`tokenShadowPlugin`](../../../../VitalDesignSystem/Components/VitalElements/Shadow#shadowing-a-token-collection).
A site [created with `new-vds`](../SiteCreation) meets these requirements.

## 1. Add Custom Colors to Tailwind

Modify `packages/{my-package}/tailwind.config.js`, adding the `theme` key to the `twConfig`
definition. We also suggest to extend the colors. If you were to leave off `extend`, you would
overwrite colors and not get default Tailwind colors. If default Tailwind colors are not used in the
site, they will be purged and not bloat the css/package.

```js
import { getPackageTailwindConfig } from '@bodiless/fclasses';

const resolver = (pkgName) => require.resolve(pkgName);

const twConfig = {
  content: [
    './lib/**/!(*.d).{ts,js,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'mysite-footer': '#45818e',
      },
    },
  },
};
```

For more details about Tailwind, please see our [Tailwind Guide](../../../../VitalDesignSystem/GuidesTailwindGuide).

## 2. Change the Footer Background Color by Shadowing

Within your `packages/{my-package}/src`, you will find a `shadow/@bodiless` folder, containing some
initial components that are being shadowed and defining some defaults. This is where we will add
additional shadowing. During shadowing, the naming of the folders/files are critical, as this
informs the Shadowing Plugin what is being replaced.

To shadow a package and tokens, first create a folder with the **name of the package** you are
choosing to shadow, which is `vital-elements` in this case.

Then create a `.ts` file within the folder that will shadow the token collection with the **name of
the collection**, which is `Color.ts`. So you should now have a new file at
`packages/{my-package}/src/shadow/@bodiless/vital-elements/Color.ts`.

The Token Shadow Plugin will find this collection and replace the original with this new version.

```jsx
// Always use the *Base token.
import { vitalColorBase } from '@bodiless/vital-elements/lib/base';
import { asTokenGroup, ColorMeta } from '@bodiless/vital-elements';

const OverrideColors = asTokenGroup(ColorMeta)({
  // This will add/spread the existing vitalColorBase collection.
  ...vitalColorBase,
  // This will override the one token.
  BgSecondaryFooter: 'bg-mysite-footer',
});

export default OverrideColors;
```

Let's review the code we added:

01. When we shadow, we ALWAYS utilize the Collection's \*Base token (e.g., `vitalColorBase`), which
    is the unshadowed token. If you were to forget and use `vitalColor` — which is what is being
    shadowed — it won't work, as it becomes a recursive shadowing and will fail with the error of
    "Cannot read properties of undefined (reading 'Default')."
01. We will want to use the rest of `vitalColors` that we aren't overriding, so spread them within
    the token with `...vitalColorBase`.
01. Lastly, override the specific token with your custom color.

?> **REMINDER:** Rebuild the Package with `npm run build -- --scope=<mysite>` and restart your site.

<!-- Inlining HTML to add multi-line warning block with unordered list. -->
<div class="tip">
  <strong>IMPORTANT:</strong> Please read the following on limitations:

  01. When you **add a new file to be shadowed**, you must stop the site in edit mode and restart it
      via `npm run start`. The plugin will then pick up the new file to be shadowed.
  01. When you make a **change to the Tailwind config**, you must stop the site in edit mode and
      restart it via `npm run start`. This will allow the Tailwind config to be rebuilt.
  01. So that you don't need to constantly rebuild the package after each change, run `npm run
      build:watch`; this will rebuild the package on each change.

</div>

## 3. Shadow the Footer Component

The VitalDS layout uses a Footer token that adds the Rewards component/column; let's shadow the
Vital Layout and switch it to use a more basic/default footer.

The `vital-layout` package has already been shadowed in the Vital DS template, so add `Layout.ts` to
the folder, and you now have `/packages/{my-package}/src/shadow/@bodiless/vital-layout/Layout.ts`.

Now add the following code:

```jsx
// Always use the *Base token for shadowing.
import { vitalLayoutBase } from '@bodiless/vital-layout/lib/base';
import {
  asLayoutToken, vitalFooter, vitalHeader
} from '@bodiless/vital-layout';

// Recompose the Default token by using the Base component.
const Default = asLayoutToken(vitalLayoutBase.Default, {
  // Then assign the tokens that will give us default style/behaviors
  // of the header/footer components.
  Components: {
    Header: vitalHeader.Default,
    Footer: vitalFooter.Default,
  },
});

export default {
  ...vitalLayoutBase,
  Default,
};
```

In reviewing the code, you can see we are recomposing or overriding the Default token. We start with
the `vitalLayoutBase.Default`, then assign the default tokens of the header/footer components, and,
lastly, export it.

?> **REMINDER:** Rebuild the Package with `npm run build -- --scope=<mysite>` and restart your site.

All Vital DS tokens can be shadowed in a similar fashion. Refer to the component's documentation and
specific shadowing instructions. Within BodilessJS, there is a
[`vital-test`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-test/src/shadow/%40bodiless
':target=_blank') package that shadows all components and provides examples; it is a good resource.
