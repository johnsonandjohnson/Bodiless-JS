# CanvasX Component Template

Every component/package in the CanvasX design system (or one which extends it)
should follow these conventions.

## File structure

Packages defining CanvasX components and/or tokens should use the following
file structure.
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
            /tokens
              index.ts
              {brand}{Component}.ts
                 
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

## Token Shadowing

Bodiless provides a mechanism to override the tokens provided by a CanvasX
package, changing their effect wherever they are used in the CanvasX design
system. The method, known as "Token Shadowing" is similar to
[Gatsby Component Shadowing](https://www.gatsbyjs.com/blog/2019-04-29-component-shadowing/),
but more restrictive. In particular, only token collections are shadowable using
this technique, and the package to be shadowed must be structured specifically
to enable this feature.

### Creating a shadowable token collection


## Notes on files/directories

### `package.json`
This should include, at a minimum, the following keys:
- **name**. Should be namespaced to `@bodiless` for CanvasX packages.
- **version**. This field is managed by lerna.  Currently all bodiless packages
- **license**. Set to `Apache 2.0` for all Bodiless packages.
  maintain a common version line.
- **description**
- **author**
- **repository**.
- **files**. Be sure to include all resources required by the package.
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
...
```
in addition to any special exports from your package.

### `index.static.ts` (top level)

Expose static exports from all components:
```
export * from './components/{ComponentA}/index.static';
export * from './components/{ComponentB}/index.static';
...
```

### `index.ts` (component level)
```
export { default as brandComponent } from './tokens';
export { default as brandComponentStatic } from './tokens';
