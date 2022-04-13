# CanvasX Component Template

Every component/package in the CanvasX Design System (or one which extends it) should follow these
conventions.

## File Structure

Packages defining CanvasX components and/or tokens should use the following file structure. Some
files are optional; see below for full details.

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

- [Static Replacement](./StaticReplacement): Removes unnecessary code from the production bundle.
- [Token Shadowing](./Shadow): Allows a downstream package to define an override of any CanvasX
  token collection.

The files and directories are described in more detail below:

### Component Level Files

#### `{Component}Clean.tsx`

Provides the clean component (if any) as a default export. It should also export the type of the
component's design keys ("slots"), and an `as...Token` function used to create token specifications.
For example:

**File `FooClean.tsx`:**

```tsx
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
  </C.Wrapper>
);

const fooComponents: FooComponents = {
  Wrapper: Div,
  Body: Fragment,
};

export default designable(fooComponents, 'Foo')(FooBase);
export const asFooToken = asCxTokenSpec<FooComponents>();
```

?> **Note:** In some cases, there will be no clean component; for example, if a package is merely
providing tokens for a component defined elsewhere.  In such cases, this file may be omitted.

#### `tokens/{brand}{Component}.ts`

Provides the component's token collection as a default export. For example:

**File `cxFoo.ts`:**

```js
const Default = asFooToken({ ... });
const Special = asFooToken({ ... });
// A token which is intended to be composed with other tokens should be prefixed with `With...`.
const WithSomething = asFooToken({ ... });

export default { Default, Special, WithSomething };
```

May extend a token collection from another package, for example:

```js
import { otherFooBase } from 'some-package';
const Default = asFooToken(otherFooBase.Default, { ... })
export default { ...otherFooBase, Default };
```

?> **Note:** Here we extend `otherFooBase` and **not** `otherFoo`. This is to allow shadowing of
`otherFoo` (see below).

#### `tokens/index.ts`

Simply re-exports the token collection defined in `{brandComponent}.ts`:

```js
import tokens from './cxFoo';

export default tokens;
```

#### `index.bl-edit.ts`

This file is used in static token replacement (see below). It holds the version of a static token
and/or clean component which should be rendered in Edit Mode. This will be replaced by empty code in
the static, production bundle.

If your token collection is _always_ static, export it and the associated clean component (if any)
from this file:

```js
export { default as FooClean } from './FooClean';
// Note this export will be shadowable.
export { default as mybrandFoo } from './tokens';
```

If your token collection is _sometimes_ static, export it from this file as an alternate version
with the `Static` suffix:

```js
export { default as FooStatic } from './FooClean';
// Note this export will be shadowable.
export { default as mybrandFooStatic } from './tokens';
```

#### `index.static.ts`

If your token is always static, export empty versions of the token and clean component:

```js
import {
  StaticBlock as FooClean,  // Use `StaticInline` if your component renders inline elements.
  staticTokenCollection as mybrandFoo,
} from '@bodiless/hydration';

export { FooClean, mybrandFoo };
```

If you have both static and dynamic versions of your token collection:

```js
import {
  StaticBlock as FooStatic,  // Use `StaticInline` if your component renders inline elements.
  staticTokenCollection  as mybrandFooStatic,
  } from '@bodiless/hydration';

export { FooStatic, mybrandFooStatic };
```

?> **Note:** If your token does not have a static version, omit both `index.bl-edit.ts` and
`index.static.ts`.

#### `index.ts` (component level)

Re-export everything from `index.bl-edit.ts`, along with any other utilities or types. Also export
the "Base" version of the token collection directly from its location.

```js
export { asFooToken, FooComponents } from './FooClean';
// This export will not be shadowable, because it is exported
// directly from `cxFoo`.
export { default as mybrandFooBase } from './tokens/cxFoo';
// ... any other exports or utilities.

// These exports will be excluded from the static bundle.
export * from './index.bl-edit';
```

If your token collection is not _always_ static, also export the non-static version here:

```js
export { default as cxFooClean } from './FooClean';
export { default as cxFoo } from './tokens';
```

### Top Level Files

#### `package.json`

This should include, at a minimum, the following keys:

- `name`: Should be namespaced to `@bodiless` for CanvasX packages.
- `version`: This field is managed by Lerna. Currently, all Bodiless packages.
- `license`: Set to `Apache 2.0` for all Bodiless packages. maintain a common version line.
- `description`
- `author`
- `repository`
- `files`: Be sure to include all resources exported by the package.
- `sideEffects`: Usually set to `false` unless your package has them.
- `main`: Usually `./lib/index.js`.
- `typings`: Usually `./lib/index.d.ts`.
- `scripts`: Usually the following should suffice:
  ```json
    "build": "run-p build:lib build:api-doc",
    "build:api-doc": "typedoc --out doc/api src",
    "build:lib": "tsc -p ./tsconfig.json",
    "build:watch": "npm run build:lib -- --watch",
    "clean": "rimraf \"lib/*\" && rimraf tsconfig.tsbuildinfo && rimraf \"doc/api\"",
  ```
  Do not include lint or test scripts, as these are generally defined at monorepo root.
- `dependencies`, `peerDependencies`: List only packages which are specifically required.

#### `index.ts` (top level)

Expose exports from all components:

```js
export * from './components/{ComponentA}';
export * from './components/{ComponentB}';
// ... additional utilities or types defined in your package.
// ...
```
