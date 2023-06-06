# Background Images

@TODO Link to shadowing documentation and Bodiless documentation section on using Tailwind for background images.

## Overview

In this task we'll be customizing the default vital footer to include a new brand-specific SVG logo, as well an SVG wave image on both desktop and mobile.

## Assignment

To begin, we will create a react component from our SVG to be used to replace the brand logo on the default vital footer. Using your SVG-to-React conversion app of choice (SVGR Playground), inlcude your SVG in the body of a functional component as illustrated below:

```jsx
import { stylable } from '@bodiless/fclasses';
import * as React from 'react';

const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  // Insert your SVG element here
);

const LogoIcon = stylable(Logo);

export default LogoIcon;

```

Next, you'll need to create the folder that will house your new footer component `ExampleFooter` that will be used to override the default vital footer.

You can structure this component's folder in a similar fashion to that of the vital component found [here](packages/vital-layout/src/components/Footer), or make use of the component scaffolder to create this component structure automatically.

- TODO: Add more details on import chain and/or refer to new shadow documentation to avoid verbosity here?

### Adding our custom brand logo

In our 'Footer' token collection -- named `exampleFooter.ts` -- you'll replace the `Rewards` slot of the footer component with your new custom brand logo, using the `startWith` HOC.

NOTE: You may have noticed that a similar HOC, `replaceWith`, can be used to achieve the same result, but `startWith` is the preferred method in this instance, as it replaces a component while still retaining any tokens previously applied to it. `replaceWith` is most often used to remove a component or slot in its entirety (`replaceWith(() => null)`).

### Creating a new CSS rule in Tailwind for our wave SVG image mask

Using the `addComponents` function provided by Tailwind, we can create a new class containing our image mask path, size, and position, and apply it to our new footer in the next section.

NOTE: In most instances, the utility classes provided out of the box by Tailwind will be enough to satisfy all of your styling needs. However, in cases such as this one where our footer wave must be implemented through the use of an image mask (a CSS property for which no default Tailwind utility class exists), we can construct a CSS rule directly in our Tailwind configuration file.

@TODO for JONES: use the technique you discovered to embed actual code snippets here rather than inlining them

```js
plugin(({ addComponents }) => {
      addComponents({
        '.footer-wave': {
          maskImage: "url('vital-examples/src/background-images/assets/images/desktopwave.svg')",
          maskPosition: 'bottom center',
          maskSize: '100%',
        },
      });
    }),

```

### Adding our 'wave' svg asset and mobile wave to the footer wrapper

@TODO for JONES -- break this into 3steps following the guide from UsingTailwind Background Images

In our `exampleFooter.ts`, we will construct a `WithTopWave` token, in which we will apply to the [appropriate domains](../../Guides/Tokens/TokenDomains) the tailwind classes needed to render an SVG wave to the top of the footer.

On the `Wrapper` slot, we will apply our `.footer-wave` CSS rule, and on the `Column2Wrapper` slot, we will apply the tailwind classes necessary to render a similar SVG wave to the top of the footer on mobile and tablet devices.

 We will then construct a `Default` token for our custom footer and apply our newly-created `WithTopWave` token to this token's `Compose` domain.

 NOTE: Our `WithTopWave` token could easily be woven into the body of our `Default` footer token, but imagine a future scenario where our design changes, and we no longer want that top wave to be present. By encapsulating this styling in its own token, and applying it via the `Compose` domain, we can easily add (and just as easily remove) a bit of styling or functionality to an existing token, without embedding it so deeply within that making changes it later becomes unncessarily cumbersome.

 And in the event that this token has more widespread applications (i.e., a token that adds a border radius to an element), we can

## Practice

@TODO

<!--
    Come up with a new task for the reader to perform that is similar in nature to the lesson they
    just completed, allowing them to practice what they've learned.
-->

## Resources

- [Adding components in Tailwind](https://tailwindcss.com/docs/plugins#adding-components)
- [SVGR - For converting SVGs to React components](https://react-svgr.com/playground/)
- [Using Tailwind for Background Images](https://johnsonandjohnson.github.io/Bodiless-JS/#/VitalDesignSystem/Guides/TailwindGuide?id=using-tailwind-for-background-images)
-

## FAQ

@TODO

<!--
    If you remember any of the questions you had when completing this task — or can think of any
    questions a new developer may have — document the Questions and Answers here.
-->

### [ QUESTION 1 ]

<!-- Answer to QUESTION 1 -->

### [ QUESTION 2 ]

<!-- Answer to QUESTION 2 -->