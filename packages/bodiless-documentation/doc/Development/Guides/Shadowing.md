# Shadowing Tokens

The [Vital Design System](/VitalDesignSystem/) provides a mechanism to extend or override the tokens
provided by a package, changing their effect wherever they are used on your site, allowing you to
easily customize components and elements to meet your design requirements. We call this mechanism
_token shadowing_. A simplistic definition of shadowing is: providing a token collection that
replaces an existing token collection. This replacement can either be completely replacing the
original token collection or just extending it. This method is similar to [Gatsby Component
Shadowing](https://www.gatsbyjs.com/blog/2019-04-29-component-shadowing/ ':target=_blank'), but more
restrictive. In particular, only token collections are shadowable using this technique, and the
package to be shadowed must be structured specifically to enable this feature.

When discussing shadowing, we may speak in terms of shadowing components or elements; know that what
we're technically talking about is shadowing the token collections which apply to those components
or elements.

## What Are the Benefits of Shadowing?

As previously described, shadowing is a way to extend or override tokens, allowing you to easily
customize components and elements.

Let's say you shadow an H3 element token, making changes to the typography. For our example, we'll
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

<!-- TODO: Add two code snippets, showcasing the scenario above — chain of imports vs shadowing. -->

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

All the token collections provided by the [Vital Design System](/VitalDesignSystem/) are shadowable,
each of which has its own API documentation about how to shadow it. Also, within the Bodiless
repository, there is a
[`vital-demo`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-demo/src/shadow/%40bodiless)
package that shadows all the available Vital components and provides examples. To continue using
`vital-editors` as our example, if you look in
[`/packages/vital-demo/src/shadow/@bodiless/vital-editors`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-demo/src/shadow/%40bodiless/vital-editors),
you can see how to go about shadowing the `EditorPlain` and `RichText` components.

The [API documentation](/Development/API/) is a good resource to use to see what token collections
are shadowable.

To get into the finer details of the structure required to make a component shadowable, please see
the [Creating a Shadowable Token Collection](#creating-a-shadowable-token-collection) section below,
where we walk you through the process of structuring your own components to be shadowable.

?> **Note:** The Vital site template
([`/sites/__vital__`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/sites/__vital__))
comes packaged with the [Vital Design System](/VitalDesignSystem/), as well as the necessary
`tokenShadowPlugin` (see [Shadowing a Token Collection](#shadowing-a-token-collection) below),
providing a set of shadowable components out of the box. You can create a site using this template
via the [`new-vds` command](./BuildingSites/SiteCreation).

## Creating a Shadowable Token Collection

In order to be _shadowable_, a token collection must be the _default export_ of a module which is
located within a package at `./src/components/{ComponentName}/tokens`, and this module must itself
be re-exported from the package by an index file which imports it at the _exact path_ `./tokens`.

!> **IMPORTANT: The `./src/components/{ComponentName}/tokens/index.ts` file should _only_ export a
token collection.** As shadowing replaces the entire file, any additional exports will be lost if
not redefined and re-exported from the shadow file. Exporting anything but the shadowable token will
likely lead to a runtime error.

You should also export a "base" or un-shadowed version of your token collection to allow downstream
consumers to extend it. The "base" version must be exported from a file which is never re-exported
by the package entry point or any other file, in order to prevent a circular dependency. As a
convention, Bodiless exports the base tokens as a named export from a file named `base.ts`.

Example:

**File `./src/components/Foo/tokens/yourFoo.ts`:**

```ts
import { asFooToken } from '../FooClean';
//...

const Default = asFooToken({
  Components: { /*...*/ },
  Layout: { /*...*/ },
  Spacing: { /*...*/ },
  //...
});

const Variant1 = asFooToken({ /*...*/ });

const Variant2 = asFooToken({ /*...*/ });

//...

export default { // Must be a default export.
  Default,
  Variant1,
  Variant2,
  //...
};
```

<!-- Inlining HTML to add multi-line info block with unordered list. -->
<div class="warn">
  <details>
  <summary>
    Expand for <strong>notes</strong> regarding <code>yourFoo.ts</code>:
  </summary>

  - You can define tokens in other files and import them — as long as you re-export them as part of
    the default export of this `yourFoo.ts` file.
  - At the top of the example, you can see that we're importing `asFooToken` (a token definition
    utility) from `FooClean` (a clean component); for information on these items, and how to define
    them, please see:
    - [Vital Component Template : Component-Level Files](/VitalDesignSystem/Components/VitalElements/ComponentTemplate#component-level-files)
    - [Vital Elements : Helper Utilities](/VitalDesignSystem/Components/VitalElements/#helper-utilities)

</div>

**File `./src/components/Foo/tokens/index.ts`:**

```ts
import tokens from './yourFoo';
export default tokens;
```

**File `./src/components/Foo/index.ts`:**

```ts
// This version will be shadowable,
// because it is exported from './tokens'.
export { default as yourFoo } from './tokens';
```

**File `./src/base.ts`:**

```ts
/**
 * Use this version of the {your foo} tokens when extending or shadowing.
 * Import the token directly from @bodiless/{your-package}/lib/base.
 * @category Token Collection
 * @see [[yourFoo]]
 */
export { default as yourFooBase } from './components/Foo/tokens/yourFoo';

// As your package may have multiple shadowable components,
// make sure to export all your "base" versions in this file.
export { default as yourBarBase } from './components/Bar/tokens/yourBar';
export { default as yourBazBase } from './components/Baz/tokens/yourBaz';
//...
```

**File `./src/index.ts`:**

```ts
export * from './components/Foo';
```

?> **Note:** The above TypeScript examples would be compiled to JavaScript from their respective
`src` directory into the associated `lib` directory.  
For example:  
`/packages/some-package/src/components/Foo/tokens/index.ts` →  
`/packages/some-package/lib/components/Foo/tokens/index.js`

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

  **File [`/packages/vital-layout/src/components/Footer/tokens/vitalFooter.ts`][]:**

  ```ts
  import { asFooterToken, FooterToken } from '../FooterClean';

  const Default = asFooterToken({ /*...*/ });

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

  **File [`/packages/vital-layout/src/components/Footer/tokens/index.ts`][]:**

  ```ts
  import tokens from './vitalFooter';
  export default tokens;
  ```

  **File [`/packages/vital-layout/src/components/Footer/index.ts`][]:**

  ```ts
  import type { VitalFooter } from './tokens/vitalFooter';

  export { default as FooterClean, asFooterToken } from './FooterClean';
  export { default as vitalFooter } from './tokens';
  export type { VitalFooter };
  ```

  **File [`/packages/vital-layout/src/base.ts`][]:**

  ```ts
  /**
   * Use this version of the Vital Footer tokens when extending or shadowing.
   * Import the  token directly from @bodiless/vital-layout/lib/base.
   * @category Token Collection
   * @see [[vitalFooter]]
   */
  export {
    default as vitalFooterBase
  } from './components/Footer/tokens/vitalFooter';
  ```

  **File [`/packages/vital-layout/src/index.ts`][]:**

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

    **File `./src/shadow/base-package/Foo.ts`:**

    ```ts
    import { asFooToken } from 'base-package';
    // Import the base collection.
    import { yourFooBase } from 'base-package/lib/base';
    // *** NOT: import { yourFoo } from 'base-package';

    // Override one or more of the tokens in the base collection.
    const SomeToken = asFooToken(yourFooBase.SomeToken, { ... });

    // Default export is the overridden token collection.
    export default {
      ...yourFooBase,
      SomeToken,
    };
    ```

    !> **IMPORTANT:** In the file path, `./src/shadow/base-package/Foo.ts`, `base-package` needs to
    **match the name of the package from which you are importing the base collection.** For example,
    if you look in the
    [`vital-demo`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-demo)
    package, you'll see that each of the modules defining shadowed token collections are under
    `shadow/@bodiless/vital-xxx/`; this is because each of the names of the packages from which it's
    importing the base collections are of the form `@bodiless/vital-xxx` (e.g.,
    `@bodiless/vital-card`), as described in their respective `package.json` files.

    ?> **Note:** When defining your shadowed token collection, use the base token collection (from
    `base-package/lib/base`), which is the _unshadowed_ token collection. We recommend using the
    naming convention `yourFooBase` to designate this collection specifically as the special import
    for shadowing. If you were to import from the entry point of the package — which is what is
    being _shadowed_ (e.g., `yourFoo`) — it becomes a recursive shadowing, and will fail with the
    error: "Cannot read properties of undefined (reading 'Default')."

    **You may be all set:** The next steps discuss setting up a `shadow.js` file to act as a
    resolver, and adding the `tokenShadowPlugin` to your webpack config; however, if your site is
    using the Vital site template
    ([`/sites/__vital__`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/sites/__vital__))
    or a scaffolding script, then these steps have already been completed for you.

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
    [`vital-demo`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-demo/shadow.js)),
    you can see that there's nothing unique about them. You can copy any one of these `shadow.js`
    files into your package root, and it will work.  
    It's also worth noting that these pre-existing `shadow.js` files support the standard pattern
    used by most Vital packages; you can do whatever fulfills the requirements of your project, as
    long as the `shadow.js` file returns the actual module that contains the shadowed token
    collection as a default export.

01. Add the Bodiless `tokenShadowPlugin` to the webpack config used to build your site. Pass it a
    list of one or more resolvers which are exported from shadowing packages.
    - If your site is using **Gatsby**, your `gatsby-node.js` file should contain code similar to
      the following:

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

    - If your site is using **Next.js**, your `next.config.js` file should contain code similar to
      the following:

      ```js
      const NextWebpackConfig = require('@bodiless/next/lib/cjs/Webpack/Config').default;
      const bodilessNextConfig = require('@bodiless/next/lib/cjs/NextConfig/nextConfig');
      const { addTokenShadowPlugin } = require('@bodiless/webpack');
      const shadow = require('shadowing-package/shadow');
      const shadow2 = require('lower-priority-shadowing-package/shadow');

      module.exports = {
        ...bodilessNextConfig,
        webpack: (config, options) => {
          let nextConfig = NextWebpackConfig(config, {
            nextWebpack: options
          });
          // The shadowed tokens will be loaded by the first shadow package
          // which returns a match.
          nextConfig = addTokenShadowPlugin(nextConfig, { resolvers: [shadow, shadow2] });

          return nextConfig;
        },
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
    - For examples of files adding the token shadow plugin to the webpack config, see:
      - `gatsby-node.js` in the Vital site template:
        [`/sites/__vital__/gatsby-node.js`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/sites/__vital__/gatsby-node.js).
      - `next.config.js` in the Vital Next site template:
        [`/sites/__vital_next__/next.config.js`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/sites/__vital_next__/next.config.js).

## Testing Shadowed Tokens

Before you begin setting up your theme (or whatever else you may be working on), it is a good idea
to first make sure that your tokens are actually being shadowed.

Once again, the
[`vital-demo`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-demo)
package lends itself as a valuable resource; here, you'll find a useful pattern for testing your
shadowed tokens.

For example, take a look at the shadowed Vital Button component within the `vital-demo` package:

[`/packages/vital-demo/src/shadow/@bodiless/vital-buttons/Buttons.ts`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-demo/src/shadow/%40bodiless/vital-buttons/Buttons.ts):

```ts
import { asButtonToken } from '@bodiless/vital-buttons';
import { vitalButtonsBase } from '@bodiless/vital-buttons/lib/base';
import { addProps } from '@bodiless/fclasses';

const Default = asButtonToken(vitalButtonsBase.Default, {
  Behavior: {
    Wrapper: addProps({ 'data-shadowed-by': 'vital-demo:DefaultButtons' }),
  },
});

const Primary = asButtonToken(vitalButtonsBase.Primary, {
  Behavior: {
    Wrapper: addProps({ 'data-shadowed-by': 'vital-demo:PrimaryButtons' }),
  },
});

const Secondary = asButtonToken(vitalButtonsBase.Secondary, {
  Behavior: {
    Wrapper: addProps({ 'data-shadowed-by': 'vital-demo:SecondaryButtons' }),
  },
});
```

For each shadowed token that we're defining (`Default`, `Primary`, `Secondary`, etc.), we add a
prop, `data-shadowed-by`, to the outer token/wrapper — usually, `Wrapper` — of the `Behavior`
domain. For simplicity's sake, we've set each `data-shadowed-by` prop as the name of the package and
the token we're shadowing (e.g., `vital-demo:PrimaryButtons`), but you can set them to be whatever
makes the most sense to you.

Now, when viewing your site, if you don't see this identifier on your shadowed component, then you
know that something hasn't been configured correctly, and you're not shadowing.

## Important Notes

- Many of the code examples above show snippets of TypeScript files under a package's `src`
  directory; note that we recommend writing your own versions of these files in TypeScript under the
  `src` directory, as well. They will then compile to JavaScript under the associated `lib`
  directory.  
  For example:  
  `/packages/some-package/src/components/Foo/tokens/index.ts` →  
  `/packages/some-package/lib/components/Foo/tokens/index.js`
  - For extensive details regarding the conventions and file structure of components and tokens
    within a package, please see: [Vital Component
    Template](/VitalDesignSystem/Components/VitalElements/ComponentTemplate).
- As mentioned, shadowed token collections can be extended or overridden, depending on your
  requirements. An extension or override can be made at the token, domain, or slot (component)
  level.
  - For more information on extending and overriding, see:
    - [Extending and Composing Tokens](/VitalDesignSystem/Components/VitalElements/ExtendingAndComposingTokens)
    - [Vital Tokens : Extension and Composition](/VitalDesignSystem/Components/VitalElements/Tokens/#extension-and-composition)
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
- The documented pattern for organizing your shadowed token collections is not mandatory. You can
  use whatever logic you like in `shadow.js` to resolve the shadowed token collections.

### Gotchas

- If your shadowed tokens aren't working, double-check your spelling — filenames must match exactly.  
  - Singular versus plural (e.g., `Accordion` vs. `Accordions`) can be an especially difficult typo
    to find.
  - This is a good "first thing" to check, as it is a common source of trouble and an easy fix.
- Your module that defines your shadowed token collection must be in your package under
  `./lib/shadow/base-package`, where `base-package` is identical to the _name_ of the package from
  which you are importing the base collection.
  - E.g., if you are shadowing from the `vital-card` package, its `name`, as defined in its
    `package.json` file, is `@bodiless/vital-card`; therefore, your module needs to be placed under
    `./lib/shadow/@bodiless/vital-card` within the package you're working in.
- Remember, if a slot in the [clean
  component](/VitalDesignSystem/Components/VitalElements/Tokens/#components) is defined as a
  Fragment, you will have to add an element or component to that slot in order to have something to
  apply your token. This is typically done with the `startWith`, `replaceWith`, or `on` utilities.
  - Let's say the `Wrapper` of the original element is set to a Fragment; to get shadowing to work,
    you need to replace that `Wrapper` with a `div` — `Wrapper = replaceWith(Div)` — and then add
    your layout/theme/behavior.
- If you have multiple packages shadowing a token collection, the first one will take priority and
  the rest will be skipped.
- Ensure that you are shadowing the correct token(s). Some components use specific tokens — not just
  the `Default`.
  - For example, Vital Menu exports a number of tokens:
    [`/packages/vital-navigation/src/components/Menu/tokens/vitalMenu.ts`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-navigation/src/components/Menu/tokens/vitalMenu.ts).
    - And, in the `vital-demo` package, you can see how to shadow the `TopNav`, `Footer`, and
      `Utility` tokens from `vitalMenuBase`:
      [`/packages/vital-demo/src/shadow/@bodiless/vital-navigation/Menu.ts`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-demo/src/shadow/%40bodiless/vital-navigation/Menu.ts).
- If, in a Vital token, we have `TokenX = asFooToken(Default, {})`, and your site shadows `Default`
  and uses `TokenX`, you won't get the shadowing token — you have to shadow both `Default` and
  `TokenX`.
  - This occurs because when that pattern is used in a Vital token and you try to shadow `Default`,
    you're actually shadowing the whole token collection.
  - To put it more generally: If you shadow any token (e.g., _Token A_) in a collection, and that
    token is used by another token in the same collection (e.g., _Token B_), then the shadowed
    version won't automatically be applied in _Token B_; you have to recompose _Token B_ to use the
    new version of _Token A_. For example:  
    **Original:**
    ```js
    const A = asFooToken({ /**/ });
    const B = asFooToken({
      //...
      Compose: {
        A,
      },
    });
    ```
    **Shadow:**
    ```js
    const A = asFooTooken({ vitalFooBase.A, /* extend A */ });
    export default {
      ...vitalFooBase,
      A,
    };
    ```
    Then the shadowed version of `vitalFoo.B` will _not_ apply the shadowed `vitalFoo.A`; instead,
    you have to do the following:
    ```js
    const A = asFooToken({ vitalFooBase.A, /* extend A */ });
    const B = asFooToken({
      ...vitalFooBase.B,
      Compose: {
        ...vitalFooBase.B.Compose,
        // Apply our shadowed version of A to override the default.
        A,
      },
    });
    export default {
      ...vitalFooBase,
      A,
      B,
    };
    ```

### Tips

- When you add a new shadow file, you need to:
  01. Rebuild your package with `npm run build -- --scope=<your-site>`;
  01. Restart your site in Dev mode via `npm run start`;
  01. The token shadow plugin will then pick up the new file to be shadowed.
- So that you don't need to constantly rebuild the package after each change, run `npm run
  build:watch`; this will rebuild the package on each change.
- Review [`/packages/vital-demo/src/shadow/@bodiless/`][] for examples and patterns of shadowing.
- As stated in the _gotchas_ above, misspellings/misnamings are a common cause of shadowing issues.
  A good way to verify that you named your shadow file properly is: when you build or run dev,
  within the console output, find the shadow replacement for the file you're expecting to be
  shadowed.
  - If you've created a shadow, you should see something similar to the following (in the console
    output), after you build or run dev:
    ```text
    [Shadow replacement] Replacing import in /home/adalovelace/Projects/ada-proto/no
    @sites/--ada--:dev: de_modules/@bodiless/vital-elements/lib/components/Typography/index.js
     ↳ ./tokens → /home/adalovelace/Projects/ada-proto/packages/__ada__/lib/shadow/@
    @sites/--ada--:dev: bodiless/vital-elements/Typography.js
    ```
    - The first file is the file that is being replaced, or shadowed.
    - The second file is the file that is replacing the first file, or the file that is shadowing.
  - If you don't see your file in the output, you've likely either:
    - Named/spelled your shadow file incorrectly; or
    - Forgot to create your `shadow.js` file.
  - You won't see an error, because, at build time, we don't know what is being shadowed; you just
    won't see it in the list of shadow replacements.
- A good way to confirm that your shadowed component is working is to shadow a behavior and add a
  prop to the DOM.  
  See [Testing Shadowed Tokens](#testing-shadowed-tokens) for details.

## Additional Documentation on Shadowing

The Bodiless and [Vital Design System](/VitalDesignSystem/) documentation have some step-by-step
shadowing examples:

- [Shadowing Typography](./BuildingSites/Typography/ShadowGuide)
- [Shadowing the Rich Text Editor](/VitalDesignSystem/Components/VitalEditors/RichTextCustomizing)
- [Shadowing the Plain Editor](/VitalDesignSystem/Components/VitalEditors/PlainEditor#via-shadowing)

All Vital DS tokens can be shadowed. Refer to the component's documentation and specific shadowing
instructions.

Within the Bodiless repository, there is a
[`vital-demo`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-demo/src/shadow/%40bodiless)
package that shadows all components and provides examples — it is a good resource for reference and
learning.

In addition, to determine what is possible to shadow, we recommend visiting the [API
documentation](/Development/API/).

<!-- Link Labels -->

[`/packages/vital-demo/src/shadow/@bodiless/`]: https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-demo/src/shadow/%40bodiless
[`/packages/vital-layout/src/components/Footer/tokens/vitalFooter.ts`]: https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-layout/src/components/Footer/tokens/vitalFooter.ts
[`/packages/vital-layout/src/components/Footer/tokens/index.ts`]: https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-layout/src/components/Footer/tokens/index.ts
[`/packages/vital-layout/src/components/Footer/index.ts`]: https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-layout/src/components/Footer/index.ts
[`/packages/vital-layout/src/base.ts`]: https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-layout/src/base.ts
[`/packages/vital-layout/src/index.ts`]: https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-layout/src/index.ts
