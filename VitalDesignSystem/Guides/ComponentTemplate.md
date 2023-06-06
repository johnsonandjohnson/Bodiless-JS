# Vital Component Template

Every component/package in the Vital Design System (or one which extends it) should follow the
directory structure and conventions described below. This ensures consistency, enables
[Token Shadowing](/Development/Guides/Shadowing) and [Static Replacement](./StaticReplacement).

## Component Scaffolding

Vital provides a tool for scaffolding new components which makes it easier to ensure the standards
are met. You should use it anytime you are creating a new component or extending an existing token
collection.

To use it, run the following command from a local directory:

  ```bash
  npx @bodiless/vital-scaffold@next
  ```

Follow the prompts to create the new component. The tool will generate the file structure based on
the answers provided and populate it with the necessary files.

Below is a list of prompts and their descriptions, please note that some prompts are conditional on
previous answers.
- `Path to "src" directory where component should be created [Required]`

  Relative or absolute path to the `src` directory of the package in which the new component should
  be created. If the directory does not exist, it will show warning message. For example, if current
  working directory is project root, provide a relative path for new component: `./packages/{package
  name}/src/`, and code will be generated inside `src`.

- `Component name [Required]`

  Name of the component to create, with underscore or alphanumeric and case insensitive characters,
  e.g., `card`.  If you are extending an existing token collection, this should be the name of the
  upstream component to which that applies.

- `Library name [Required]`

  The library name to which new component will belong, with underscore or alphanumeric and case
  insensitive characters e.g., `myBrand`.

- `Upstream package to extend`

  If you plan to extend a token collection from an existing package, e.g., `@bodiless/vital-card`,
  specify the source package name here. In this case, only a token collection will be provisioned,
  and it will apply to the upstream clean component. If you are creating a new component rather than
  extending, leave it blank, and a clean component will be generated.

- `Upstream library name`

  The name of the library to which the upstream component you're extending belongs. Defaults to
  `vital`.

- `Shadow the upstream token collection (Y/n)`

  If you want to shadow the upstream token collection, type `Y` or `y` to generate shadow file
  templates. In most cases you should answer 'yes'.

- `Is the component is always static and never hydrated?`

  If you want to create a component that never hydrates, type `Y` or `y` to generate static version
  only. Otherwise, both static and dynamic versions will be created. In general, you should only
  answer 'yes' if you know that your component will never contain interactive functionality. For
  more information, see [Static Replacement](./StaticReplacement).

## File Structure

Using the scaffolding tool will produce the following file structure. Some files are optional; see
below for full details.

```
package.json
tsconfig.json
bodiless.docs.json
/doc
/src
    base.ts
    index.ts
    /components
        /{Component}
            index.ts
            index.bl-edit.ts
            index.static.ts
            {Component}Clean.tsx
            types.ts
            __tests__/
                {Component}.test.tsx
            tokens/
                index.ts
                {brand}{Component}.ts
    /shadow
        {sourcePackage}/
            {Component}.ts
```

This structure is intended to facilitate two build-time webpack optimizations:

- [Static Replacement](./StaticReplacement): Removes unnecessary code from the production bundle.
- [Token Shadowing](/Development/Guides/Shadowing): Allows a downstream package to define an
  override of any Vital token collection.

The files and directories are described in more detail below:

### Component-Level Files

#### `{Component}Clean.tsx`

Provides the clean component (if any) as a default export. It should also export the type of the
component's design keys ("slots"), and an `as...Token` function used to create token specifications.
For example:

**File `FooClean.tsx`:**

```tsx
import React, { FC, Fragment } from 'react';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { designable, Div } from '@bodiless/fclasses';
import type { DesignableComponentsProps } from '@bodiless/fclasses';
import type { FooComponents } from './types';

type FooBaseProps = DesignableComponentsProps<FooComponents>;

/**
 * The starting components for each slot.
 */
const fooComponents: FooComponents = {
  Wrapper: Div,
  Slot1Wrapper: Div,
  Slot1: Fragment,
  Slot2Wrapper: Div,
  Slot2: Fragment,
};

const FooBase: FC<FooBaseProps> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Slot1Wrapper>
      <C.Slot1 />
    </C.Slot1Wrapper>
    <C.Slot2Wrapper>
      <C.Slot2 />
    </C.Slot2Wrapper>
  </C.Wrapper>
);

const FooClean = designable(fooComponents, 'Foo')(FooBase);

/**
 * A token creator that respects the Foo slots.
 *
 * @category Token Collection
 */
export const asFooToken = asVitalTokenSpec<FooComponents>();

export default FooClean;

```

If your component is _always_ static, wrap it in `withoutHydration()` (or `withoutHydrationInline()`
for components which produce inline elements):

```js
export default withoutHydration()(FooClean);
```

If your component is _sometimes_ static, export a similarly wrapped static version:

```js
export const FooStatic = withoutHydration()(FooClean);
```

?> **Note:** In some cases, there will be no clean component; for example, if a package is merely
providing tokens for a component defined elsewhere.  In such cases, this file may be omitted.

#### `types.ts`

Exports the type of the clean component's design keys and props accepted, plus type of token spec
which applies to the clean component.

**File `types.ts`:**

```js
import type { ComponentOrTag, DesignableProps, TokenSpec } from '@bodiless/fclasses';
import type { DefaultDomains } from '@bodiless/vital-elements';

/**
 * Type representing the "slots" exposed by the FooClean component.
 */
export type FooComponents = {
  Wrapper: ComponentOrTag<any>,
  Slot1Wrapper: ComponentOrTag<any>,
  Slot1: ComponentOrTag<any>,
  Slot2Wrapper: ComponentOrTag<any>,
  Slot2: ComponentOrTag<any>,
};

/**
 * The props accepted by the FooClean component
 */
export type FooProps = DesignableProps<FooComponents>;

/**
 * The type of a token spec which applies to the FooClean component.
 */
export type FooToken = TokenSpec<FooComponents, DefaultDomains>;

/**
 * Tokens for the FooClean component.
 *
 * @category Token Collection
 * @see [[FooClean]]
 */
export interface MybrandFoo {
  /**
   * Default styling and behavior.
   */
  Default: FooToken;

  // Document other tokens here.
};
```

#### `tokens/{brand}{Component}.ts`

Provides the component's token collection as a default export. For example:

**File `mybrandFoo.ts`:**

```js
import { asFooToken } from '../FooClean';
import type { MybrandFoo } from '../types';

const Default = asFooToken({
  Core: {
    // ...
  },
  // ... other domains
});

// Add additional variant tokens or variators here.
// ...

/**
 * Tokens for FooClean
 *
 * @category Token Collection
 * @see [[MybrandFoo]]
 * @see [[FooClean]]
 */
const mybrandFoo: MybrandFoo = {
  Default,
  // ...
};

export default mybrandFoo;
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
import tokens from './mybrandFoo';

export default tokens;
```

#### `index.bl-edit.ts`

This file is used in static token replacement (see below). It holds the version of a static token
and/or clean component which should be rendered in Edit Mode. This will be replaced by empty code in
the static, production bundle.

If your token collection is _always_ static, export it and the associated clean component (if any)
from this file:

```js
import type { ComponentType } from 'react';
import { withoutHydration, /* withoutHydrationInline */ } from '@bodiless/hydration';
import type { FooProps } from './types';
import Foo from './FooClean';

/**
 * This clean component is always static.  That means it is never hydrated
 * in the browser, and must not contain any client-side interactivity.
 */
const FooClean: ComponentType<FooProps> = withoutHydration()(
  Foo
);

export {
  FooClean,
};
export { default as mybrandFoo } from './tokens';

```

If your token collection is _sometimes_ static, export the static version:

```js
import type { ComponentType } from 'react';
import { withoutHydration, /* withoutHydrationInline */ } from '@bodiless/hydration';
import type { FooProps } from './types';
import FooClean from './FooClean';

const FooStatic: ComponentType<FooProps> = withoutHydration()(
  FooClean
);

export {
  FooClean,
  FooStatic,
};
export { default as mybrandFoo } from './tokens';
export { default as mybrandFooStatic } from './tokens';
```

#### `index.static.ts`

If your token is always static, export empty versions of the token and clean component:

```js
import {
  staticTokenCollection,
  StaticBlock as StaticComponent,
  // Use `StaticInline` if your component renders inline elements.
  // StaticInline as StaticComponent,
} from '@bodiless/hydration';

export const mybrandFoo = staticTokenCollection;
export const FooClean = StaticComponent;
```

If you have both static and dynamic versions of your token collection:

```js
import {
  staticTokenCollection,
  StaticBlock as StaticComponent,
  // Use `StaticInline` if your component renders inline elements.
  // StaticInline as StaticComponent,
} from '@bodiless/hydration';

export { default as mybrandFoo } from './tokens';
export const mybrandFooStatic = staticTokenCollection;
export { default as FooClean } from './FooClean';
export const FooStatic = StaticComponent;
```

?> **Note:** If your token does not have a static version, omit both `index.bl-edit.ts` and
`index.static.ts`.

#### `index.ts` (component-level)

Re-export everything from `index.bl-edit.ts`, along with any other utilities or types. Also export
the "Base" version of the token collection directly from its location.

```js
export { asFooToken, FooComponents } from './FooClean';
export * from './types';

// This export will not be shadowable, because it is exported
// directly from `vitalFoo`.
export { default as mybrandFooBase } from './tokens/vitalFoo';
// ... any other exports or utilities.

// These exports will be excluded from the static bundle.
export * from './index.bl-edit';
```

If your token collection is not _always_ static, also export the non-static version here:

```js
export * from './index.bl-edit';
export * from './types';
export { asFooToken } from './FooClean';
```

#### `__tests__/{Component}.test.tsx` (component-level)

Unittest template for component and token with snapshot testing.

#### `shadow/{sourcePackage}/{Component}.ts` (component-level)

Token collection shadowing template. This file is used to shadow a token collection from upstream
package token collection.

### Top-Level Files

#### `package.json`

This should include, at a minimum, the following keys:

- `name`: Should be namespaced to `@bodiless` for Vital packages.
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

#### `index.ts` (top-level)

Expose exports from all components:

```js
export * from './components/Foo';
// ... additional utilities or types defined in your package.
// export * from './components/Bar';
// ...
```

#### `base.ts` (top-level)

Exports "base" or un-shadowed version of token collections to allow downstream consumers to extend
them. This file could exist already with other component token exports. If so, scaffold will just
append new token exports to the file.

```js
export { default as mybrandFooBase } from './components/Foo/tokens/mybrandFoo';
// export { default as mybrandBarBase } from './components/Bar/tokens/mybrandBar';
```
