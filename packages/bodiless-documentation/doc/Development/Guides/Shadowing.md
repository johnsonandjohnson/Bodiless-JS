# Shadowing Tokens

Bodiless provides a mechanism to extend or override the tokens provided by a package, changing their
effect wherever they are used on your site, allowing you to easily customize components and elements
to meet your design requirements. We call this mechanism _token shadowing_. A simplistic definition
of shadowing is: providing a token that replaces the existing design token. Whether you extend or
override the token by shadowing is a choice made by the Site Builder. This method is similar to
[Gatsby Component Shadowing](https://www.gatsbyjs.com/blog/2019-04-29-component-shadowing/
':target=_blank'), but more restrictive. In particular, only token collections are shadowable using
this technique, and the package to be shadowed must be structured specifically to enable this
feature.

When discussing shadowing, we may speak in terms of shadowing components or elements; know that what
we're technically talking about is shadowing the token collections _of_ those components or
elements.

Some additional notes about shadowing:

- TODO: Add any supplementary details here.

## What Are the Benefits of Shadowing?

As previously described, shadowing is a way to extend or override tokens, allowing you to easily
customize components and elements.

Let's say you make changes to an H3 element token, shadowing the typography. For our example, we'll
say that you're shadowing the `H3` token in
[`vitalTypography`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-elements/src/components/Typography/tokens/vitalTypography.ts).
That `H3` token is used by [Vital
Card](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-card/src/components/Card/tokens/Base.ts)
and [Vital Rich
Text](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-editors/src/components/RichText/tokens/vitalRichText.ts),
and it will be replaced automatically within those components — and _anywhere_ else it is used —
with your shadow token.

To achieve similar results _without_ shadowing, you would have to redefine the component tokens. For
example, looking at the
[`vitalRichText`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-editors/src/components/RichText/tokens/vitalRichText.ts)
tokens, the typography is defined in the `Theme` domain:

```ts
const Default = asVitalTokenSpec()({
  Core: { /**/ },
  Content: { /**/ },
  Theme: {
    paragraph: vitalTypography.Body,
    Bold: vitalTextDecoration.Bold,
    SuperScript: vitalTextDecoration.Superscript,
    H1: vitalTypography.H1,
    H2: vitalTypography.H2,
    H3: vitalTypography.H3,
    H4: vitalTypography.H4,
    H5: vitalTypography.H5,
    Link: vitalLink.Default,
  },
  Behavior: { /**/ },
  Compose: { /**/ },
})
```

Without shadowing, to modify the `H3` token, you would have to redefine the entire `Theme` object
and recompose the component token, duplicating a lot of code. As you can imagine, this method would
also require additional maintenance effort.

Shadowing is also especially helpful in nested components. Let's say you have a menu, and the menu
has a link, and the link has an H1 element in it — if you were to redefine that H1 element without
shadowing, you would have to first redefine the link, and then use that new link component in the
menu, and so on. It becomes a chain of updated imports, whereas, with shadowing, you just update the
typography in one place and it gets automatically applied to everything.

## What Can Be Shadowed?

Having gone over what shadowing is, you may be wondering which token collections can be shadowed. As
mentioned in the overview, a package must be specifically structured to make its tokens available
for shadowing. Basically, for it to be shadowable, a token collection must be located within the
`src/components/{ComponentName}/tokens` directory of a package — you cannot shadow anything that is
outside of a `{package-name}/src/components/{ComponentName}/tokens` directory.

For example, in the `vital-editors` package, if you look within its
[`src/components`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-editors/src/components)
directory, you will see directories for the `EditorPlain`, `FlowContainer`, and `RichText`
components; `EditorPlain` and `RichText` contain `tokens` directories and are shadowable.

The [Vital Design System](/VitalDesignSystem/) provides many shadowable components, each of which
has its own API documentation about shadowing its token collection. Also, within the Bodiless
repository, there is a
[`vital-test`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-test/src/shadow/%40bodiless)
package that shadows all the available Vital components and provides examples. To continue using
`vital-editors` as our example, if you look in
[`vital-test/src/shadow/@bodiless/vital-editors`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-test/src/shadow/%40bodiless/vital-editors),
you can see how to go about shadowing the `EditorPlain` and `RichText` components.

To get into the finer details of the structure required to make a component shadowable, please see
the [Creating a Shadowable Token Collection](#creating-a-shadowable-token-collection) section below,
where we walk you through the process of structuring your own components to be shadowable.

TODO: Rewrite and relocate this Note block:

?> **Note:** The ability to shadow a design requires the design package to be structured in a
specific way to allow it be shadowed. The site must use the
[`tokenShadowPlugin`](../../../../VitalDesignSystem/Components/VitalElements/Shadow#shadowing-a-token-collection).
A site [created with `new-vds`](../SiteCreation) meets these requirements.

## Creating a Shadowable Token Collection

In order to be _shadowable_, a token collection must be the _default export_ of a module which is
located within a package at `./lib/components/{ComponentName}/tokens`, and this module must itself
be re-exported from the package by an index file which imports it at the _exact path_ `./tokens`.

You should also export a "base" or un-shadowed version of your token collection to allow downstream
consumers to extend it. You may do this by exporting the tokens from their original location,
avoiding conflicts.

?> **Note:** This _double export_ (e.g., `yourFoo` and `yourFooBase`) is required to avoid
conflicts. We are exporting `yourFoo`, but, in order to extend it, we need to import the original
object. So, to avoid conflicts, we import the original object from the original file, and re-export
it as `yourFooBase` — which is what we extend. This is necessary to prevent compilation errors, as
we could introduce a loop by importing the same object that we are exporting.

Example:

**File `./lib/components/Foo/tokens/yourFoo.js`:**

```js
const Default = asFooToken({ ... });

export default { Default }; // Must be a default export.
```

**File `./lib/components/Foo/tokens/index.js`:**

```js
import tokens from './yourFoo';
export default tokens;
```

**File `./lib/components/Foo/index.js`:**

```js
// This version will be shadowable,
// because it is exported from './tokens'.
export { default as yourFoo } from './tokens';
// This version will not be shadowable,
// because it is exported from a different path.
export { default as yourFooBase } from './tokens/yourFoo';
```

**File `./lib/index.js`:**

```js
export * from './components/Foo';
```

<!-- Inlining HTML to add multi-line info block with ordered list. -->
<div class="warn">
  <strong>Note:</strong> To see a working example of this structure within the Bodiless project,
  review the <a target="_blank" rel="noopener noreferrer" href="https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-layout/src/components/Footer">Footer</a>
  component in the <code>@bodiless/vital-layout</code> package.
  <br><br>
  <details>
  <summary>
    Expand for code snippets from the Vital Footer component...
  </summary>

  **Note:** The snippets below show code from the comparable TypeScript (i.e., uncompiled) versions
  of the example JavaScript snippets above, hence the different paths.

  **File [`vital-layout/src/components/Footer/tokens/vitalFooter.ts`][]:**

  ```ts
  const Default = asFooterToken({ ... });

  export interface VitalFooter {
    Default: FooterToken,
    //...
  }

  const vitalFooter: VitalFooter = {
    Default,
    //...
  };

  export default vitalFooter; // Must be a default export.
  ```

  **File [`vital-layout/src/components/Footer/tokens/index.ts`][]:**

  ```ts
  import tokens from './vitalFooter';
  export default tokens;
  ```

  **File [`vital-layout/src/components/Footer/index.ts`][]:**

  ```ts
  import vitalFooterBaseOrig, { VitalFooter } from './tokens/vitalFooter';

  // Use this version of the Vital Footer tokens when extending or shadowing.
  const vitalFooterBase = vitalFooterBaseOrig;

  export { default as vitalFooter } from './tokens';
  export { vitalFooterBase, VitalFooter };
  ```

  **File [`vital-layout/src/index.ts`][]:**

  ```ts
  export * from './components/Footer';
  ```

  </details>

</div>

## Shadowing a Token Collection

To export a shadowed version of a token collection:

01. Add a module to your package which defines the shadowed token collection. You may import the
    original base token collection to extend it.  
    For example:

    **File `./lib/shadow/base-package/Foo.js`:**

    ```js
    // Import the base collection.
    import { yourFooBase } from 'base-package';
    // *** NOT: import { yourFoo } from 'base-package';

    // Override one or more of the tokens in the base collection.
    const SomeToken = asFooToken(yourFooBase.SomeToken, { ... });

    // Default export is the overridden token collection.
    export default {
      ...yourFooBase,
      SomeToken,
    };
    ```

    !> **IMPORTANT:** In the file path, `./lib/shadow/base-package/Foo.js`, `base-package` needs to
    **match the name of the package from which you are importing the base collection.** For example,
    if you look in the
    [`vital-test`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-test)
    package, you'll see that each of the modules defining shadowed token collections are under
    `shadow/@bodiless/vital-xxx/`; this is because each of the names of the packages from which it's
    importing the base collections are of the form `@bodiless/vital-xxx` (e.g.,
    `@bodiless/vital-card`), as described in their respective `package.json` files.

    !> **IMPORTANT:** When defining your shadowed token collection, **always use the base token
    collection** (e.g., `yourFooBase`), which is the _unshadowed_ token collection. If you were to
    use `yourFoo`, for example — which is what is being _shadowed_ — it becomes a recursive
    shadowing, and will fail with the error: "Cannot read properties of undefined (reading
    'Default')."

01. Place a file at your package root called `shadow.js`. This should export a single function which
    receives a component name and package name, and returns the _resolved_ module containing the
    shadowed version of the specified token collection.

    **File `shadow.js`:**

    ```js
    module.exports = ({ componentName, packageName = 'unknown' }) => {
      const requirePath = `./lib/shadow/${packageName}/${componentName}`;
      try {
        return require.resolve(requirePath);
      } catch (e) {
        return false;
      }
    };
    ```

    ?> **Note:** If you look at the `shadow.js` files within the Bodiless packages that have them
    (e.g.,
    [`__vital__`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/__vital__/shadow.js)
    and
    [`vital-test`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-test/shadow.js)),
    you can see that there's nothing unique about them. You can copy any one of these `shadow.js`
    files into your package root, and it will work.

01. Add the Bodiless `tokenShadowPlugin` to the webpack config used to build your site. Pass it a
    list of one or more resolvers which are exported from shadowing packages. For example, in your
    site's `gatsby-node.js`:

    ```js
    const { addTokenShadowPlugin } = require('@bodiless/webpack');
    const shadow = require('shadowing-package/shadow');
    const shadow2 = require('lower-priority-shadowing-package/shadow');

    module.exports.onCreateWebpackConfig = ({ actions }) => {
      actions.setWebpackConfig(
        // The shadowed tokens will be loaded by the first shadow package
        // which returns a match.
        addTokenShadowPlugin({}, { resolvers: [shadow, shadow2] })
      );
    };
    ```

    - You can provide more than one resolver because you can have multiple packages doing shadowing.
    - When listing your resolvers, note that the resolution order is "first come, first served"
      (FCFS); i.e., the first resolver to successfully return will be used, and any remaining
      resolvers listed won't even be evaluated.
      - So, if you have the same component being shadowed by multiple packages, it will only be
        resolved by the first one listed (and successfully returned).
    - From the code example above, you can see that the token shadow plugin
      ([`addTokenShadowPlugin`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/bodiless-webpack/src/tokenShadowPlugin.ts))
      comes from the `@bodiless/webpack` package.
    - An example `gatsby-node.js` file using the token shadow plugin can be found in the Vital site
      template:
      [`/sites/__vital__/gatsby-node.js`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/sites/__vital__/gatsby-node.js).

## Extending and Overriding Token Collections via Shadowing

As mentioned, shadowed token collections can be _extended_ or _overridden_, depending on your
requirements. _Extending_ a token collection is useful when you only need to make a small number of
changes to it. When extending a token collection, you can even `omit` specific domains from it, if
you wish to remove or rewrite them. _Overriding_ a token collection allows you to completely
overwrite it, essentially writing your own version of the token collection from scratch. This is
useful when you need to make many adjustments to a token collection, and extending it would take
more effort than simply rewriting it.

TODO: Document patterns for extending and overriding

### Using `omit` to Remove Domains

TODO: Fill out section

### Using `omit` to Remove Components

There may be instances where there are components within a token collection that you don't wish to
utilize. Via shadowing, you can use the `omit` function to remove components from a token
collection. To put it another way, by shadowing a component, you're able to remove sub-components
from it using the `omit` function.

```js
import omit from 'lodash/omit';
import { fooBase, asFooToken } from 'base-package';

const SomeToken = asFooToken({
  ...fooBase.SomeToken,
  Layout: {
    ...omit(fooBase.SomeToken.Layout, 'Bar'),
  },
  Schema: {
    ...omit(fooBase.SomeToken.Schema, 'Bar'),
  },
  Theme: {
    ...omit(fooBase.SomeToken.Theme, 'Bar'),
  },
});

export default {
  ...fooBase,
  SomeToken,
};
```

In the example above, we've created a file — say,
`packages/our-package/src/shadow/base-package/Foo.ts` — and we're shadowing `Foo`, which utilizes
the `Bar` component. For whatever reason, we've decided we don't want to utilize the `Bar` component
in our version of `Foo`, so, using `omit`, we've removed `Bar` from each domain where it is used.

Looking here—

```js
  Layout: {
    ...omit(fooBase.SomeToken.Layout, 'Bar'),
  },
```

—we're spreading the `Layout` components — except `Bar` — across the `Layout` domain, for some token
(literally `SomeToken` in this case) that we're defining for our shadowed version of `Foo`. We use
this pattern for the `Schema` and `Theme` domains as well, where `Bar` has also been set.

?> **Note:** For a real-world use case of using `omit` to remove components, see [Removing
Components from Vital Rich Text Editor by
Shadowing](/VitalDesignSystem/Components/VitalEditors/RichTextCustomizing#removing-components-from-vital-rich-text-editor-by-shadowing).

## Testing Shadowed Tokens

Before you begin setting up your theme (or whatever else you may be working on), it is a good idea
to first make sure that your tokens are actually being shadowed.

Once again, the
[`vital-test`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-test)
package lends itself as a valuable resource; here, you'll find a useful pattern for testing your
shadowed tokens.

For example, take a look at the shadowed Vital Button component within the `vital-test` package:

[`vital-test/src/shadow/@bodiless/vital-buttons/Buttons.ts`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-test/src/shadow/%40bodiless/vital-buttons/Buttons.ts):

```ts
import { vitalButtonsBase, asButtonToken } from '@bodiless/vital-buttons';
import { addProps } from '@bodiless/fclasses';

const Default = asButtonToken(vitalButtonsBase.Default, {
  Behavior: {
    Wrapper: addProps({ 'data-shadowed-by': '__vital__:DefaultButtons' }),
  },
});

const Primary = asButtonToken(vitalButtonsBase.Primary, {
  Behavior: {
    Wrapper: addProps({ 'data-shadowed-by': '__vital__:PrimaryButtons' }),
  },
});

const Secondary = asButtonToken(vitalButtonsBase.Secondary, {
  Behavior: {
    Wrapper: addProps({ 'data-shadowed-by': '__vital__:SecondaryButtons' }),
  },
});
```

For each shadowed token that we're defining (`Default`, `Primary`, `Secondary`, etc.), we add a
prop, `data-shadowed-by`, to the outer token/wrapper — usually, `Wrapper` — of the `Behavior`
domain. For simplicity's sake, we've set each `data-shadowed-by` prop as the name of the package and
the token we're shadowing (e.g., `__vital__:PrimaryButtons`), but you can set them to be whatever
makes the most sense to you.

Now, when viewing your site, if you don't see this identifier on your shadowed component, then you
know that something hasn't been configured correctly, and you're not shadowing.

## Important Notes

TODO: Add and Refine

- Above, we show the contents of the compiled JavaScript files containing the shadowed token
  collections, but you should write them in TypeScript and compile them to those locations.
- If you are extending a base token collection, be sure to import it using the `tokenCollectionBase`
  version name.
- Ensure that your token shadow resolver (`shadow.js`) uses [CJS module
  syntax](https://www.typescriptlang.org/docs/handbook/2/modules.html#commonjs-syntax
  ':target=_blank').
- Ensure that all resources directly required (including `shadow.js` and your original token file)
  are included in and exported by your package.  
  In your `package.json`:

  ```json
  //...,
  "files": [
    //...,
    "./shadow.js"
  ],
  ```

  And, if you use the `exports` key:

  ```json
  //...,
  "exports": {
    //...,
    "./shadow.js": "./shadow.js"
  }
  ```

- The above pattern for organizing your shadowed token collections is not mandatory. You can use
  whatever logic you like in `shadow.js` to resolve the shadowed token collection.

### Gotchas

TODO: Add and Refine

There are some gotchas on shadowing we are trying to fix in Vital packages.

- If in a Vital token we have `TokenX = asFooterToken(Default, {})`. If your site shadow's `Default`
  and uses `TokenX` — it won't get shadowing token. You would have to shadow both `Default` and
  `TokenX`. We are trying to get rid of these in Vital.

### Tips

TODO: Add and Refine

- When you add a new shadow file, you need to:
  01. Rebuild your package with `npm run build -- --scope=<your-site>`;
  01. Restart Gatsby Dev via `npm run start`;
  01. The token shadow plugin will then pick up the new file to be shadowed.
- So that you don't need to constantly rebuild the package after each change, run `npm run
  build:watch`; this will rebuild the package on each change.
- Make sure you spell filenames correctly — they must match exactly.  
- Review [`packages/vital-test/src/shadow/@bodiless/`][] for examples and patterns of shadowing.
- If you shadow an element that is a fragment by default, it will never appear — you must add it!
  - `Wrapper = replaceWith(Div)`, and then add layout/theme/behavior.
- If you have multiple packages shadow, the first one takes priority and second one is skipped!
- A good tip for shadowing to confirm it's working is shadow a behavior and addProp to DOM.  
  E.g.:
  ```js
    Behavior: {
      Wrapper: addProps({ 'data-shadowed-by': 'mypackage:mycomponent' }),
    },
  ```

### Dos and Don'ts

TODO: Add items

## Additional Documentation on Shadowing

TODO: Rewrite section

The Bodiless and VitalDS documentation has some step-by-step shadowing examples:

- [Shadowing Typography](../../../Development/Guides/BuildingSites/Typography/ShadowGuide)
- [Shadowing the Rich Text Editor](../VitalEditors/RichTextCustomizing)
- [Shadowing the Plain Editor](../VitalEditors/PlainEditor#via-shadowing)

All Vital DS tokens can be shadowed. Refer to the component's documentation and specific shadowing
instructions.

Within the Bodiless repository, there is a
[`vital-test`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-test/src/shadow/%40bodiless)
package that shadows all components and provides examples — it is a good resource for reference and
learning.

In addition, to determine what is possible to shadow, we recommend visiting the [API
documentation](../../../Development/API/).

<!-- Link Labels -->

[`packages/vital-test/src/shadow/@bodiless/`]: https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-test/src/shadow/%40bodiless
[`vital-layout/src/components/Footer/tokens/vitalFooter.ts`]: https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-layout/src/components/Footer/tokens/vitalFooter.ts
[`vital-layout/src/components/Footer/tokens/index.ts`]: https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-layout/src/components/Footer/tokens/index.ts
[`vital-layout/src/components/Footer/index.ts`]: https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-layout/src/components/Footer/index.ts
[`vital-layout/src/index.ts`]: https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-layout/src/index.ts
