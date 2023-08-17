# Static Replacement and Selective Hydration

VitalDS supports a performance optimization which helps remove unused code from your production
bundle through static replacement and selective hydration. This is a two-stage process:

- Mark components as not to be hydrated in the browser (selective hydration — see [the React
  docs](https://react.dev/reference/react-dom/client/hydrateRoot ':target=_blank') for more
  information about hydration).
- Instruct webpack to exclude code for those components from the production bundle (static
  replacement).

Two use cases are supported:

- Components which _never_ need to be hydrated (those that do not contain any interactivity, and
  require React only for editing and/or rendering).
  - Examples are _text fields_ (with plain or rich text editors) and _images_.
- Components which _sometimes_ need to be hydrated (those whose children may
  require React for interactivity in the browser).
  - Examples are _links_, _cards_, etc.

Note that this technique does not apply to components which _always_ need to be hydrated (e.g.,
_search_, _product filters_, etc.).

?> Both supported use-cases are implemented for you when you create a new Vital site via the
`@bodiless/cli new` command, or scaffold a component in that site using the `@bodiless/scaffold`
command. See [ComponentTemplate](./ComponentTemplate.md) for more information.  Read on if you are
interested in understanding how to implement the technique manually.

To implement static replacement manually, follow these steps:

01. Add the Bodiless static replacement plugin to your webpack configuration using the
    `addStaticReplacementPlugin` function from `@bodiless/webpack`:

    ```js
    const newConfig = addStaticReplacementPlugin(existingConfig);
    ```

    This should be added only when building production bundles, and _must not_ be added for
    server-side rendering.

01. Create an `index.bl-edit.ts` and matching `index.static.ts` at the top level of each component,
    and configure your `index.ts` to `export * from './index.bl-edit'`.

01. Export code which should only be executed when rendering on the server from `index.bl-edit`, and
    code which should replace it when components are hydrated in the browser in `index.static`.

01. **Important:** Wrap any component which you intend not to be hydrated in `withoutHydration` or
    `withoutHydrationInline` from `@bodiless/hydration`.  If you omit this step, the code will be
    excluded from the bundle but the component will be hydrated anyway, resulting in unpredictable
    results. Note: You must wrap both the static `.static.ts` and edit `.edit.ts` versions of the
    component in order to avoid issues in DOM reconciliation.

## When to Use Static Replacement

In general, you should enable static replacement for your component or tokens if:

- They (or, more likely, their dependencies) add significant weight to the production JS bundle; and
- They do not require React to function in the browser, but only for rendering.

If you know that your component's children will never require hydration, then you need only export a
single static version. If its children _may_ require hydration, then you should export a separate
static version, and let the Site Builder determine which is appropriate for their needs.

## The Bodiless Edit Environment

Static replacement and selective hydration apply only to the production build of your site. Neither
will be active in the Bodiless Edit Environment or when running the development server. This means
that you can also use this technique to exclude code which is only needed to make your components
editable.

## React Server Components

This optimization technique is similar in some ways to the new [React Server
Components](https://nextjs.org/docs/getting-started/react-essentials ':target=_blank') introduced in
React 18 and NextJS 13. Both allow you to define React code which is only intended to be used when
rendering your components at build time, and exclude that code from the production bundle.

A key difference is that, with Server Components, you mark the point at which hydration should begin
(e.g., via the `use client` directive on NextJS), while with Selective Hydration you mark the point
at which hydration should _stop_ (via the `withoutHydration` HOC). Once you have marked a component
as not-to-be-hydrated, none of its children will be hydrated. With RSC, on the other hand, you can
weave client and server code together. This makes RSC a more flexible approach, and, as it matures,
it will likely replace selective hydration as the preferred method for optimizing bundle size in
Vital/Bodiless applications.
