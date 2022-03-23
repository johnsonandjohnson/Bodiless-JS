# CanvasX Component Template

Every component/package in the CanvasX design system (or one which extends it)
should follow these conventions.

## File structure

Packages defining CanvasX components and/or tokens should use the following
file structure.  Some files are optional; see below for full details.
```
package.json
tsconfig.json
bodiless.docs.json
/doc
/src
    index.ts
    /components
        /{Component}
            index.ts
            index.bl-edit.ts
            index.static.ts
            {Component}Clean.tsx
            tokens/
              index.ts
              {brand}{Component}.ts
```
This structure is intended to facilitate two build-time webpack optimizations:
- [Static Token Replacement](#static-token-replacement): Removes unnecessary code
  from the production bundle.
- [Token shadowing](#token-shadowing): Allows a downstream package to define an
  override of any CanvasX token collection.

The files and directories are described in more detail below:

### Component Level files

#### `{Component}Clean.tsx`

Provides the clean component (if any) as a default export. It should also export
the type of the component's design keys ("slots"), and an `as...Token` function
used to create token specifications. For example:

**File `FooClean.tsx`:**

```ts
import React from 'react';
import type { ComponentOrTag, DesignableComponentsProps } from '@bodiless/fclasses';
import { Div, Fragment, designable } from '@bodiless/fclasses';
import type { FC } from 'react';
import { asCxTokenSpec } from '@bodiless/cx-elements';

export type FooComponents = {
  Wrapper: ComponentOrTag<any>,
  Body: ComponentOrTag<any>,
};

const FooBase: FC<DesignableComponentsProps<FooComponents>> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Body />
  <C.Wrapper>
);

const fooComponents: FooComponents = {
  Wrapper: Div,
  Body: Fragment,
};

export default designable(fooComponents, 'Foo')(FooBase);
export const asFooToken = asCxTokenSpec<FooComponents>();
```

> In some cases, there will be no clean component; for example, if a package is
> merely providing tokens for a component defined elsewhere.  In such cases,
> this file may be omitted.

#### `tokens/{brand}{Component}.ts`

Provides the component's token collection as a default export. For example:

**File `cxFoo.ts`**

```js
const Default = asFooToken({ ... });
const Special - asFooToken({ ... });
// A token which is intended to be composed with other tokens should be prefixed with 'With...'
const WithSomething = asFooToken({ ... });

export default { Default, Special, WithSomething };
```

May extend a token collection from another package, for example:

```js
import { otherFooBase } from 'some-package';
const Default = asFooToken(otherFooBase.Default, { ...})
export default { ...otherFooBase, Default };
```

> Note here we extend `otherFooBase` and **not** `otherFoo`.  This is to allow shadowing
> of `otherFoo` (see below).

#### `tokens/index.ts`

Simply re-exports the token collection defined in `{brandComponent}.ts`:

```js
import tokens from './cxFoo';

export default tokens;
```


#### `index.bl-edit.ts`

This file is used in static token replacement (see below). It holds the version
of a static token and/or clean component which should be rendered in edit mode.
This will be replaced by empty code in the static, production bundle.

If your token collection is *always* static, export it and the associated clean
component (if any) from this file.

```js
export { default as FooClean } from './FooClean';
// Note this export will be shadowable.
export { default as mybrandFoo } from './tokens';
```
If your token collection is *sometimes* static, export it from this file as an
alternate version with the `Static` suffix:

```js
export { default as FooStatic } from './FooClean';
// Note this export will be shadowable.
export { default as mybrandFooStatic } from './tokens';
```

#### 'index.static.ts`

If your token is always static, export empty versions of the token and clean component:

```js
import {
  StaticBlock as FooClean,  // use``StaticInline` if your component renders inline elements.
  staticTokenCollection as mybrandFoo,
} from '@bodiless/hydration';

export { FooClean, mybrandFoo };
```

If you have both static and dynamic versions of your token collection:

```js
import {
  StaticBlock as FooStatic,  // use``StaticInline` if your component renders inline elements.
  staticTokenCollection  as mybrandFooStatic,
  } from '@bodiless/hydration';

export { FooStatic, mybrandFooStatic };
```

> If your token does not have a static version, omit both `index.bl-edit.ts` nd
> `index.static.ts`.

#### `index.ts`

Re-export everything from `index.bl-edit.ts`, along with any other utilities or types.
Also export the "Base" version of the token collection directly from its location.

```js
export { asFooToken, FooComponents } from './FooClean';
// This export will not be shadowable because it is exported
// directly from `cxFoo`.
export { default as mybrandFooBase } from './tokens/cxFoo';
// ... any other exports or utilities.

// These exports will be excluded from the static bundle
export * from './index.bl-edit';
```

If your token collection is not *always* static, also export the non-static
version here:

```
export { default as cxFooClean } from './FooClean';
export { default as cxFoo } from './tokens';
```

### Top level

#### `package.json`
This should include, at a minimum, the following keys:
- **name**. Should be namespaced to `@bodiless` for CanvasX packages.
- **version**. This field is managed by lerna.  Currently all bodiless packages
- **license**. Set to `Apache 2.0` for all Bodiless packages.
  maintain a common version line.
- **description**
- **author**
- **repository**.
- **files**. Be sure to include all resources exported by the package.
- **sideEffects**. Usually set to `false` unless your package has them.
- **main**. Usually `./lib/index.js`
- **typings**. Usually `./lib/index.d.ts`
- **scripts**. Usually the following should suffice:
  ```json
    "build": "run-p build:lib build:api-doc",
    "build:api-doc": "typedoc --out doc/api src",
    "build:lib": "tsc -p ./tsconfig.json",
    "build:watch": "npm run build:lib -- --watch",
    "clean": "rimraf \"lib/*\" && rimraf tsconfig.tsbuildinfo && rimraf \"doc/api\"",
  ```
  Do not include lint or test scripts as these are generally defined at monorepo root.
- **dependencies**, **peerDependencies**.  List only packages which are specifically
  required.

### `index.ts` (top level)

Expose exports from all components, 
```ts
export * from './components/{ComponentA}';
export * from './components/{ComponentB}';
// ... additional utilities or types defined in your package.
...
```

## Static Replacements

Bodiless supports a performance optimization which helps remove unused code from
your production bundle through selective hydration. There are two supported
use-cases:
- Components which *never* need to be hydrated (those that do not contain any
  interactivity, and require React only for editing and/or rendering). Examples
  are *text fields* (with plain or rich text editors) and *images*.
- Components which *sometimes* need to be hydrated (those whose children may
  require React for interactivity in the browser). Examples are *links*,
  *cards*, etc.
  
Note that this technique does not apply to components which *always* need to be
hydrated (*search*, *product filters*, etc).

Both supported use-cases are implemented by following the following steps:
- Add the bodiless static file replacement plugin to your webpack configuration
  using the `addStaticReplacementPlugin` function from `@bodiless/webpack`:
  ```
  const newConfig = addStaticReplacementPlugin(existingConfig);
  ```
  This should be added only when building production bundles, and *must not* be
  added for server-side rendering.

  **Note: you can skip this step when using `gatsby-theme-bodiless`***

- Create an `index.bl-edit.ts` and matching `index.static.ts` at the top level
  of each component. different depending on whether the component/tokens may
  *sometimes* require hydration.

### Components which *never* require hydration

For these components, you will need to do the following. *(Note: in the examples
below replace `MyComponent` with the name of your component, and `mybrand` with
the name of your brand or design system.)*
- Ensure the clean version of your component is wrapped in the bodiless
  `withoutHydration` HOC. In your `MyComponentClean.tsx`
  ```
  import { withoutHydration } from '@bodiless/hydration';
  // Define your base clean component as usual.
  const MyComponentClean$ = ...;
  // wrap in withoutHydration
  export const MyComponentClean = withoutHydration(MyComponentClean$);
  ```
- Export normal versions of the component and its token collection in your
  `index.bl-edit.ts`:
  ```
  export { default as MyComponentClean } from './MyComponentClean';
  export { default as mybrandMyComponent } from './tokens';
  // Be sure to include any other exports
  export { asComponentToken, ... } from './ComponentClean';

- Export static versions of the component and its token collection. In your
  `index.static.ts`:
  ```
  export { StaticBlock as MyComponentClean } from '@bodiless/hydration';
  export { staticTokenCollection as mybrandMyComponent } from './tokens';
  // Be sure to include any other exports which should not be removed in static mode.
  export { asComponentToken, ... } from './ComponentClean';
  ```
  > You may want to collect exports (if any) which should not be replaced in
  > static mode into a common file which can be included in both `index.ts` and
  > `index.static.ts`.

- Add an `index.ts` file which just exports everything from `index.bl-edit.ts`:
  ```
  export * from './index.bl-edit';
  ```

Now, when the production bundle is built, your `index.bl-edit.ts` will be
replaced by `index.static.ts`, which will cause all your component and token
code (along with its dependencies) to be excluded from the bundle.

#### When to use static replacement

In general you should enable static replacement for your component or tokens if

- they (or, more likely, their dependencies) add significant weight to the
production JS bundle, and
- they do not require React to function in the browser, but only for rendering.

If you know that your component's children will never require hydration, then you need
only export a single, static version.  If its children *may* require hydration, then
you should export a separate static version, and let the site builder determine
which is appropriate for her needs.

## Token Shadowing

Bodiless provides a mechanism to override the tokens provided by a CanvasX
package, changing their effect wherever they are used in the CanvasX design
system. The method, known as "Token Shadowing" is similar to
[Gatsby Component Shadowing](https://www.gatsbyjs.com/blog/2019-04-29-component-shadowing/),
but more restrictive. In particular, only token collections are shadowable using
this technique, and the package to be shadowed must be structured specifically
to enable this feature.

### Creating a shadowable token collection

In order to be shadowable, a token collection must be the *default export* of
a module which is located at `.../{ComponentName}/tokens`, and this module
must itself be re-exported from the package by an index file which imports
it at the *exact path* `./tokens`.

You should also export a "base" or un-shadowed version of your token collection
to allow downstream consumers to extend it. You may do this by exporting
the tokens from their original location.

Example:

**File `./lib/components/Foo/tokens/cxFoo.ts`**
```js
const Default = asFooToken({ ... });

export default { Default }; // Must be a default export.
```

**File `./lib/components/Foo/tokens/index.ts`**

```js
import tokens from './cxFoo';
export default tokens;
```

**File `./lib/Foo/index.ts`**
```js
// This version will be shadowable bc it is exported from './tokens'.
export { default as cxFoo } from './tokens';
// This version will not be shadowable bc it is exported from a different path.
export { default as cxFooBase } from './tokens/cxFoo';
```

**File './lib/components/index.ts**
```
export * from './components/Foo';
```

### Shadowing a token collection

To export a shadowed version of a token collection:

1. Add a module to your package which defines the shadowed token collection. You
   may import the original base token collection to extend it. For example:

   **File `./lib/shadow/base-package/MyComponent.js`**
   ```js
   // Import the base collection.
   import { cxFooBase} from 'base-package';
   // *** NOT: import { cxFoo } from 'base-package';
  
   // Override one or more of the tokens in the base collection
   const SomeToken = asFooToken(cxFooBase.SomeToken, { ... });
  
   // Default export is the overridden token collection.
   export default {
     ...cxFooBase,
     SomeToken,
   };
   ```

2. place a file at your package root called 'shadow.js'. This should export a
   single function which receives a component name and package name, and returns
   the *resolved* module containing the shadowed version of the specified token
   collection.

   **File `shadow.js`***
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

3. Add the bodiless `tokenShadowPlugin` to the webpack config used to build your site.
   Pass it a list of one or more resolvers which are exported from shadowing packages.
   For example, in the site's `gatsby-node.js`:

   ```js
   const { addTokenShadowPlugin } = require('@bodiless/webpack');
   const shadow = require('shadowing-package/shadow');
   const shadow2 = require('lower-priority-shadowing-package/shadow');

   module.exports.onCreateWebpackConfig = ({ actions }) => {
     actions.setWebpackConfig(
       // The shadowed tokens will be loaded by the first shadow package
       //which returns a match.
       addTokenShadowPlugin({}, { resolvers: [shadow, shadow2] })
     );
   };
   ```

Some important notes:
- Above we show the contents of the compiled js files containing the shadowed
  token collections, but you should write them in typescript and compile them
  to those locations.
- If you are extending a base token collection, be sure to import it using the
  `...Base` version name.
- Ensure that your token shadow resolver (`shadow.js`) uses CJS module syntax.
- Ensure that all resources directly required (including `shadow.js` and your original
  token file) are included in and exported by your package. In your `package.json`
  ```json
  ...
  "files": [
    ...,
    "./shadow.js"
  ],
  ```
  And, if you use the `exports` key:
  ```json
  ...
  "exports": {
    ...,
    "./shadow.js": "./shadow.js"
  }
  ```
- The above pattern for organizing your shadowed token collections is not mandatory.
  You can use whatever logic you like in `shadow.js` to resolve the shadowed token
  collection.
