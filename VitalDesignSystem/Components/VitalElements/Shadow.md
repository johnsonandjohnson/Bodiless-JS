# Shadowing Vital Tokens

Bodiless provides a mechanism to override the tokens provided by a Vital package, changing their
effect wherever they are used in the Vital Design System. The method, known as "Token Shadowing," is
similar to [Gatsby Component
Shadowing](https://www.gatsbyjs.com/blog/2019-04-29-component-shadowing/ ':target=_blank'), but more
restrictive. In particular, only token collections are shadowable using this technique, and the
package to be shadowed must be structured specifically to enable this feature.

## Creating a Shadowable Token Collection

In order to be _shadowable_, a token collection must be the _default export_ of a module which is
located at `.../{ComponentName}/tokens`, and this module must itself be re-exported from the package
by an index file which imports it at the _exact path_ `./tokens`.

You should also export a "base" or un-shadowed version of your token collection to allow downstream
consumers to extend it. You may do this by exporting the tokens from their original location.
The "base" version must be exported from a file which is never reexported by the package main or any
other file, in order to prevent cycle dependency.
As convention, Bodiless exports the base tokens as a named export from a file named base.ts

Example:

**File `./lib/components/Foo/tokens/vitalFoo.ts`:**

```js
const Default = asFooToken({ ... });

export default { Default }; // Must be a default export.
```

**File `./lib/components/Foo/tokens/index.ts`:**

```js
import tokens from './vitalFoo';
export default tokens;
```

**File `./lib/Foo/index.ts`:**

```js
// This version will be shadowable, b/c it is exported from './tokens'.
export { default as vitalFoo } from './tokens';
```

**File `./lib/base.ts`:**

```js
/**
 * Use this version of the vital foo tokens when extending or shadowing.
 * Import the  token directly from base-package/lib/base.
 * @category Token Collection
 * @see [[vitalFoo]]
 */
export { default as vitalFooBase } from './components/Foo/tokens/vitalFoo';
```

**File `./lib/components/index.ts`:**

```js
export * from './components/Foo';
```

## Shadowing a Token Collection

To export a shadowed version of a token collection:

01. Add a module to your package which defines the shadowed token collection. You may import the
    original base token collection to extend it.  
    For example:

    **File `./lib/shadow/base-package/MyComponent.js`:**

    ```js
    // Import the base collection.
    import { vitalFooBase} from 'base-package/lib/base';
    // *** NOT: import { vitalFoo } from 'base-package';

    // Override one or more of the tokens in the base collection.
    const SomeToken = asFooToken(vitalFooBase.SomeToken, { ... });

    // Default export is the overridden token collection.
    export default {
      ...vitalFooBase,
      SomeToken,
    };
    ```

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

01. Add the Bodiless `tokenShadowPlugin` to the webpack config used to build your site. Pass it a
    list of one or more resolvers which are exported from shadowing packages. For example, in the
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

Some important notes:

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

## Additional Documentation on Shadowing

The Bodiless and VitalDS documentation has some step-by-step shadowing examples:

- [Shadowing Typography](../../../Development/Guides/BuildingSites/Typography/ShadowGuide)
- [Shadowing the Rich Text Editor](../VitalEditors/RichTextCustomizing)
- [Shadowing the Plain Editor](../VitalEditors/PlainEditor#via-shadowing)

All Vital DS tokens can be shadowed. Refer to the component's documentation and specific shadowing
instructions.

Within the Bodiless repository, there is a
[`vital-test`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-test/src/shadow/%40bodiless)
package that shadows all components and provides examples — it is a good resource.

In addition, to determine what is possible to shadow, we recommend visiting the [API
documentation](../../../Development/API/).
