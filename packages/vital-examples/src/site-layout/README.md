# Tailwind Responsiveness

In this lesson we will learn how to define our site breakpoints and shadow the vital spacing.

## Overview

This is a very quick lesson. We will first define our breakpoints on the `tailwind.config.js` file, and then shadow vital-spacing to override the tokens we want.
In this case, we will:
1. Define our breakpoint based on the [Bootstrap Breakpoint](https://getbootstrap.com/docs/5.0/layout/breakpoints/)
2. Define responsive container margins
3. Define site max width.

## Assignment

### Define our breakpoints.

Let's start by taking a look at the bootstrap breakpoint values.

|Breakpoint|Class infix|Dimensions|
|----------|-----------|----------|
|X-Small|None|<576px|
|Small|sm|≥576px|
|Medium|md|≥768px|
|Large|lg|≥992px|
|Extra large|xl|≥1200px|
|Extra extra large|xxl|≥1400px|

Bootstrap also implement mobile first concept, so the values are the min-width where that breakpoint should start as well,What will make our work easier, we will only have to define the values in our configuration file, so we will have something like this. You can find the tailwind reference [in here](https://tailwindcss.com/docs/screens).

```js
...
theme: {
  screens: {
    // @media (min-width: 576px) { ... }
    sm: '576px',
    // @media (min-width: 768px) { ... }
    md: '768px',
    // @media (min-width: 992px) { ... }
    lg: '992px',
    // @media (min-width: 1200px) { ... }
    xl: '1200px',
    // @media (min-width: 1400px) { ... }
    xxl: '1400px',
  },
}
...
```

Once that's done, thanks to tailwind, our breakpoints are already set.

### Define our spacing tokens.

Now let's take a look at the vital [Spacing component](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-elements/src/components/Spacing/tokens/vitalSpacing.ts).

```ts
export default asTokenGroup(SpacingMeta)({
  WithSiteMargin: 'mx-site-percent md:mx-md-site-percent 2xl:px-40',
  WithSiteXLConstraint: '2xl:container 2xl:mx-auto',
  Gutter: 'p-1 md:p-2 lg:p-3',
  GutterOffset: '-mx-1 md:-mx-2 lg:-mx-3',
  GutterTop: 'mt-4',
  GutterBottom: 'mb-4',
  GuttonLeft: 'ml-4',
  GuttonRight: 'mr-4',
});

```

Everything we have here is pretty simple. We've just defined a few tokens for easy spacing on our site. Nothing fancy, except for two special tokens that we use to define the general layout of our website: `WithSiteMargin` and `WithSiteXLConstraint`.
#### Special tokens
As we talked about above, let's see a little more about these tokens that need a little attention.
First, the `WithSiteMargin` token, as it rely in two special settings in our `tailwind.config.js` file, which are called `site-percent` and `md-site-percent`, which define the margin in percentage to our website. If we take a look at the tailwind file of the vital-element package you will see this setting under the extend key.

```js
extend: {
  ...
  margin: {
    ...
    'site-percent': '5%',
    'md-site-percent': '8%',
  },
  padding: {
    'site-percent': '5%',
    'md-site-percent': '8%',
  },
},
```

Now, the token `WithSiteXLConstraint`, which is simpler, it serves to guarantee a maximum size for our website, in case we don't have a fluid layout, for example. Setting a maximum size based on the [tailwind container](https://tailwindcss.com/docs/container) and the breakpoints we defined above.
If we look again into the vital [Spacing component](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-elements/src/components/Spacing/tokens/vitalSpacing.ts), we'll see a comment explaining why we should rely on these tokens, rather than leaving our layout entirely in tailwind's hands.

For our example, we'll override these two special tokens to remove the `site-percent` dependency, and we'll set margins on `rem`, for both mobile and desktop.

As we are shadowing `vital-elements`, we must import the base version of the component and spread it when we export to preserve the other already existing elements, placing the tokens that we will override at the end of the object declaration.

```ts
import { vitalSpacingBase } from '@bodiless/vital-elements/src/base';
// Here we use `asTokenGroup` to share the SpacingMeta among all tokens exported.
export default asTokenGroup(SpacingMeta)({
  ...vitalSpacingBase,
  WithSiteMargin: 'mx-2 xl:mx-6 xxl:px-20',
  WithSiteXLConstraint: 'xxl:container xxl:mx-auto',
});
...
```

And that's it, we've already finished defining the tokens, now we just have to implement the shadow part, which is also very simple and straightforward.

### Shadowing

And now, to shadow our tokens, create a `Spacing.ts` file with the same path of the package. In our case, since we are shadowing the `@bodiles/vital-elements` package, we'll have this structure.
```bash
├── shadow
│   ├── @bodiless
│   │   ├── vital-elements
│   │   |   └─ Spacing.ts
```

<!-- Waiting for the actual function to be available; -->
Each file must only export the tokens from the components folder with our helper `shadow` function. You can see more about this function [here](TBD).

Our whole file will only have 3 lines.

```ts
import { shadow } from '@bodiless/vital-elements';
import { exampleSpacing } from '../../..';

export default shadow(exampleSpacing, 'Example:Spacing');
```

And that's it, now that we have everything configured, our site should already have the layout configured and we can start using these tokens to define the layouts of our components.

## Practice

Now you can try shading some tokens and see if they work correctly, try customizing some spacing and see how they behave, or even create new tokens that you think can be useful and used in your site and its components.
