# Static Replacement

Bodiless supports a performance optimization which helps remove unused code from your production
bundle through selective hydration. There are two supported use-cases:

- Components which _never_ need to be hydrated (those that do not contain any interactivity, and
  require React only for editing and/or rendering).
  - Examples are _text fields_ (with plain or rich text editors) and _images_.
- Components which _sometimes_ need to be hydrated (those whose children may
  require React for interactivity in the browser).
  - Examples are _links_, _cards_, etc.

Note that this technique does not apply to components which _always_ need to be hydrated (e.g.,
_search_, _product filters_, etc.).

Both supported use-cases are implemented by performing the following steps:

01. Add the Bodiless static file replacement plugin to your webpack configuration using the
    `addStaticReplacementPlugin` function from `@bodiless/webpack`:

    ```js
    const newConfig = addStaticReplacementPlugin(existingConfig);
    ```

    This should be added only when building production bundles, and _must not_ be added for
    server-side rendering.

    ?> **Note:** You can skip this step when using `gatsby-theme-bodiless`.

01. Create an `index.bl-edit.ts` and matching `index.static.ts` at the top level of each component.
    These files will differ depending on whether the component/tokens may _sometimes_ require
    hydration.

## Components Which _Never_ Require Hydration

For these components, you will need to do the following:  
_(Note: In the examples below, replace `MyComponent` with the name of your component, and `mybrand`
with the name of your brand or design system.)_

- Ensure the clean version of your component is wrapped in the Bodiless `withoutHydration` HOC.  
  In your `MyComponentClean.tsx`:

  ```js
  import { withoutHydration } from '@bodiless/hydration';
  // Define your base clean component as usual.
  const MyComponentClean$ = ...;
  // Wrap in `withoutHydration`.
  export const MyComponentClean = withoutHydration(MyComponentClean$);
  ```

- Export normal versions of the component and its token collection in your `index.bl-edit.ts`:

  ```js
  export { default as MyComponentClean } from './MyComponentClean';
  export { default as mybrandMyComponent } from './tokens';
  // Be sure to include any other exports.
  export { asComponentToken, ... } from './ComponentClean';
  ```

- Export static versions of the component and its token collection.  
  In your `index.static.ts`:

  ```js
  export { StaticBlock as MyComponentClean } from '@bodiless/hydration';
  export { staticTokenCollection as mybrandMyComponent } from './tokens';
  // Be sure to include any other exports which should not be removed in static mode.
  export { asComponentToken, ... } from './ComponentClean';
  ```

  ?> **Note:** You may want to collect exports (if any) which should not be replaced in static mode
  into a common file which can be included in both `index.ts` and `index.static.ts`.

- Add an `index.ts` file which just exports everything from `index.bl-edit.ts`:

  ```js
  export * from './index.bl-edit';
  ```

Now, when the production bundle is built, your `index.bl-edit.ts` will be replaced by
`index.static.ts`, which will cause all your component and token code (along with its dependencies)
to be excluded from the bundle.

### When to Use Static Replacement

In general, you should enable static replacement for your component or tokens if:

- They (or, more likely, their dependencies) add significant weight to the production JS bundle; and
- They do not require React to function in the browser, but only for rendering.

If you know that your component's children will never require hydration, then you need only export a
single static version. If its children _may_ require hydration, then you should export a separate
static version, and let the Site Builder determine which is appropriate for their needs.
