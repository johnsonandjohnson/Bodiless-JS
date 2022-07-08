# Shadowing Lesson with the Vital Design System

The preferred approach to extending or overriding the Vital Design System is by
using Bodiless Shadowing. It is based on
[Gatsby Component Shadowing](https://www.gatsbyjs.com/blog/2019-04-29-component-shadowing/)
but more restrictive. A simplistic definition of shadowing is a token is
provided that replaces the existing design token. Whether you extend or override
the token by shadowing is a choice made by site builder. For more detailed information,
feel free to read  
[Shadowing](../../../../VitalDesignSystem/Components/VitalElements/Shadow). Every
Vital DS component has also its own API documentation about shadowing its token.

?> **Note:** The ability to shadow a design requires the design package to be
structured in specific way to allow it be shadowed. The site must use the
[tokenShadowPlugin](../../../../VitalDesignSystem/Components/VitalElements/Shadow?id=shadowing-a-token-collection).
A site[created with new-vds](../SiteCreation) meets these requirements.

## 1. Adding Custom Colors to Tailwind

Modify `packages/{my-package}/tailwind.config.js`, adding the `theme` key to the
`twConfig` definition. We also suggest to extend the colors. If you were to
leave off `extend`, you would overwrite colors and not get default tailwind
colors. If default tailwind colors are not used in the site they will be purged
and not bloat the css/package.

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

For more details about Tailwind please visit [Tailwind Guide](./TailwindGuide).

## 2. Change the Footer Background Color by Shadowing

Within your `packages/{my-package}/src` you will already find a
`shadow/@bodiless` folders created of some initial components that are being
shadowed and defining some defaults. This is where we will add additional
shadowing. During shadowing, the naming of the folders/files are critical as
this informs the Shadowing Plugin what is being replaced.

To shadow a package and tokens, first create a folder with the **name of the
package** you are choosing to shadow, which is `vital-elements` in this case.

Then create a ts file within the folder that will shadow the token collection
with the **name of collection**, which is `Color.ts`. So you should now have new
file at `packages/{my-package}/src/shadow/@bodiless/vital-elements/Color.ts`.

The Token Shadow Plugin will find this collection and replace the original
with this new version.

```jsx

// Always use the *Base token
import { asTokenGroup, vitalColorBase, ColorMeta} from '@bodiless/vital-elements';

const OverrideColors = asTokenGroup(ColorMeta)({
  // This will add/spread the existing vitalColorBase collection.
  ...vitalColorBase,
  // This will override the one token.
  BgSecondaryFooter: 'bg-mysite-footer',
});

export default OverrideColors;
```

Lets review the code we added:

1. When we shadow we ALWAYS utilize the Collection's *Base token, i.e.
   `vitalColorBase`, which is the unshadowed token. If you were to forget and
   use vitalColor, which is what is being shadow, it won't work as it becomes a
   recursive shadowing and will fail with error of "Cannot read properties of
   undefined (reading 'Default')".
1. We will want to use rest of vitalColors that we aren't overriding, so spread
   them within the token with `...vitalColorBase`.
1. Lastly, override the specific token with your custom color.

?> **REMINDER:** Rebuild Package with `npm run build -- --scope=<mysite>` and
restart the site.

> **Important:** Please read the following on limitations:
> 1. When you **add a new file to be shadowed**, you must stop the site in
edit mode and restart it via npm run start. The plugin will then pick up the new
file to be shadowed.
> 1. When you make a **change to tailwind config**, you
must stop the site in edit mode and restart it via npm run start. This will
allow tailwind config to be rebuilt.
> 1. So you don't need to constantly rebuild the package after each run
`npm run build:watch` and this will rebuild the package on each change.

## 2. Shadow the Footer Component

The VitalDS layout uses a Footer token that adds the Rewards component/column, let's
shadow the Vital Layout and switch it to using a more basic/default footer.

The `vital-layout` package has already been shadowed in Vital DS template so add
'Layout.ts' to the folder so you now have
`/packages/{my-package}/src/shadow/@bodiless/vital-layout/Layout.ts`.

and add the following code:

```jsx
// Always use the *Base token for shadowing
import {
  vitalLayoutBase, asLayoutToken, vitalFooter, vitalHeader
} from '@bodiless/vital-layout';

// Recompose the Default token by using the Base component
const Default = asLayoutToken(vitalLayoutBase.Base, {
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

In reviewing the code, you can see we are recomposing or overriding the Default
token. We start with the `vitalLayoutBase.Base` and then assign the default
tokens of the header/footer components and lastly exported it.

?> **REMINDER:** Rebuild Package with `npm run build -- --scope=<mysite>` and
restart the site.

All Vital DS tokens can be shadowed in similar fashion. Refer to the component's
documentation and specific shadowing instructing. Within bodiless, there is a
[vital-test](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-test/src/shadow/%40bodiless)
package that shadows all components and gives examples and is a good resource.
