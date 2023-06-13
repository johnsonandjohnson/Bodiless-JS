# Background Images

Before engaging in this lesson, it would be beneficial to be familiar with knowing how to [Shadow a
Simple Component](./ShadowA_SimpleComponent) and [Using Tailwind for Background
Images](../../Guides/TailwindGuide#using-tailwind-for-background-images).

## Overview

In this task we'll be customizing the default Vital footer to include a new brand-specific SVG logo,
as well as an SVG wave image on both desktop and mobile.

?> **Note:** For the code files used in this lesson, please see the
`packages/vital-examples/src/background-images` directory in your local repository or on
[GitHub](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-examples/src/background-images
':target=_blank').

## Assignment

To begin, we will create a React component from our SVG to be used to replace the brand logo on the
default Vital footer. Using your SVG-to-React conversion app of choice (e.g., [SVGR
Playground](https://react-svgr.com/playground/ ':target=_blank')), include your SVG in the body of a
functional component as illustrated below:

```tsx
import { stylable } from '@bodiless/fclasses';
import * as React from 'react';

const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  // Insert your SVG element here
);

const LogoIcon = stylable(Logo);

export default LogoIcon;
```

For an example of the above, see:
[`logo.tsx`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-examples/src/background-images/assets/images/logo.tsx
':target=_blank').

Next, you'll need to create the folder that will house your new footer component, `ExampleFooter`,
that will be used to override the default Vital footer.

You can structure this component's folder in a similar fashion to that of the Vital component found
[here](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-layout/src/components/Footer
':target=_blank'), or make use of the [component
scaffolder](../../Guides/ComponentTemplate#component-scaffolding) to create this component structure
automatically.

<!-- Inlining HTML to add multi-line info block with unordered list. -->
<div class="warn">
  <strong>Note:</strong> For more information on this component file structure, please see:

  - [Component Template : File Structure](../../Guides/ComponentTemplate#file-structure)
  - [Shadowing Tokens](../../Guides/ShadowingTokens)

</div>

### Adding Our Custom Brand Logo

In our 'Footer' token collection — named `exampleFooter.ts` — you'll replace the `Rewards` slot of
the footer component with your new custom brand logo, using the `startWith` HOC.

?> **Note:** You may have noticed that a similar HOC, `replaceWith`, can be used to achieve the same
result, but `startWith` is the preferred method in this instance, as it replaces a component while
still retaining any tokens previously applied to it. `replaceWith` is most often used to remove a
component or slot in its entirety (`replaceWith(() => null)`).

### Creating a New CSS Rule in Tailwind for Our Wave SVG Image Mask

Using the `addComponents` function provided by Tailwind, we can create a new class containing our
image mask path, size, and position, and apply it to our new footer in the next section.

?> **Note:** In most instances, the utility classes provided out-of-the-box by Tailwind will be
enough to satisfy all of your styling needs. However, in cases such as this one, where our footer
wave must be implemented through the use of an image mask (a CSS property for which no default
Tailwind utility class exists), we can construct a CSS rule directly in our Tailwind configuration
file.

```js
const twConfig = {
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.footer-wave': {
          maskImage: "url('@bodiless/vital-examples/src/background-images/assets/images/desktopwave.svg')",
          maskPosition: 'bottom center',
          maskSize: '100%',
        },
        // ...
      });
    }),
  ],
};
```

### Adding Our 'wave' SVG Asset and Mobile Wave to the Footer Wrapper

01. Get your SVG asset set up via [Using Tailwind for Background
    Images](../../Guides/TailwindGuide#using-tailwind-for-background-images).
01. In our `exampleFooter.ts` file, we will construct a `WithTopWave` token, in which we will apply
    to the [appropriate domains](../../Guides/Tokens/TokenDomains) the Tailwind classes needed to
    render an SVG wave to the top of the footer.
01. On the `Wrapper` slot, we will apply our `.footer-wave` CSS rule, and, on the `Column2Wrapper`
    slot, we will apply the Tailwind classes necessary to render a similar SVG wave to the top of
    the footer on mobile and tablet devices.
01. We will then construct a `Default` token for our custom footer and apply our newly-created
    `WithTopWave` token to this token's `Compose` domain.

**`exampleFooter.ts`:**

[exampleFooter.ts](https://raw.githubusercontent.com/johnsonandjohnson/Bodiless-JS/main/packages/vital-examples/src/background-images/components/Footer/tokens/exampleFooter.ts
':include :type=code')

?> **Note:** Our `WithTopWave` token could easily be woven into the body of our `Default` footer
token, but imagine a future scenario where our design changes, and we no longer want that top wave
to be present. By encapsulating this styling in its own token, and applying it via the `Compose`
domain, we can easily add (and just as easily remove) a bit of styling or functionality to an
existing token, without embedding it so deeply within that making changes to it later becomes
unnecessarily cumbersome.  

<!-- @TODO: Complete thought:
And in the event that this token has more widespread applications (e.g., a token that adds a border
radius to an element), we can
-->

## Practice

:construction: _In progress..._

<!-- @TODO:
    Come up with a new task for the reader to perform that is similar in nature to the lesson they
    just completed, allowing them to practice what they've learned.
-->

## Resources

- [Adding components | Tailwind CSS](https://tailwindcss.com/docs/plugins#adding-components
  ':target=_blank')
- [SVGR Playground](https://react-svgr.com/playground/ ':target=_blank') - For converting SVGs to
  React components.
- [Using Tailwind for Background Images](../../Guides/TailwindGuide#using-tailwind-for-background-images)

<!-- @TODO:
## FAQ

    If you remember any of the questions you had when completing this task — or can think of any
    questions a new developer may have — document the Questions and Answers here.

### [ QUESTION 1 ]

     Answer to QUESTION 1

### [ QUESTION 2 ]

     Answer to QUESTION 2
-->
