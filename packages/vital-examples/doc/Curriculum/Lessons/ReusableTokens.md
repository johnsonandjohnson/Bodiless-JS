# Reusable Tokens

## Overview

In this lesson, we will be creating two reusable styling tokens and applying them to elements of our
`Default` and `Hero` Vital card variants.

One will apply a simple bottom-right border radius, and the other will apply a more complex set of
custom CSS rules to be applied to the `Image` slot of the `Hero` card.

The purpose of this lesson is to better understand the preferred method of creating reusable tokens,
and the reasons why this pattern is encouraged when repeating styling choices across multiple
components in a site.

<!-- Inlining HTML to add multi-line info block with unordered list and codeblock. -->
<div class="warn">
  <strong>Note:</strong> For the code files used in this lesson, please see the following (either
  locally or on GitHub):

  - `packages/vital-examples/src/reusable-tokens`
    ([GitHub](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-examples/src/reusable-tokens
    ':target=_blank'))
  - `packages/vital-examples/src/styleguide/Page/StyleGuideTemplate/Card.tsx`
    ([GitHub](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-examples/src/styleguide/Page/StyleGuideTemplate/Card.tsx
    ':target=_blank'))
    - This is the
      [template](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/sites/vital-examples/src/data/pages/reusable-tokens/template.json
      ':target=_blank') code for the page referenced below.

  To see the "Example Cards" page in action, build and run the Vital Examples site—

  ```shell
  cd sites/vital-examples
  npm run build
  npm run dev
  ```

  —and go to <http://localhost:8000/reusable-tokens/>.

</div>

## Assignment

### Creating a Simple 'Radius' Token

To begin, we will create both a `Card` and `Radius` component folder inside of our example package,
`reusable-tokens`.

The `Card` component folder will contain the `Default` and `Hero` card tokens in an `exampleCard.ts`
token collection file, and the `Radius` component folder will contain the corner radius styling
tokens in an `exampleRadius.ts` token collection file.

Please reference the [Vital Component Template documentation](../../Guides/ComponentTemplate) to
ensure that you are following the proper naming conventions and file structure when creating a new
component folder. You should have some familiarity with the naming conventions and file structure
after completing the previous lesson: [Develop a New Component](./DevelopA_NewComponent).

In our `exampleRadius.ts` token collection file, we will create two tokens that will be used to
apply two different types of `border-radius` styles to our card components. First, let's create our
`Simple` token:

[exampleRadius.ts](https://raw.githubusercontent.com/johnsonandjohnson/Bodiless-JS/main/packages/vital-examples/src/reusable-tokens/components/Radius/tokens/exampleRadius.ts
':include :type=code :fragment=simple-token')

Although we are applying these tokens to card elements in this lesson, they've been written in a way
that will allow us to apply them to essentially any component/slot that we want.

As we will be shadowing both the `Default` and `Hero` Vital card variants, we'll create two separate
card tokens inside of our `exampleCard.ts` token collection file. First, let's create our `Default`
card token, applying our `Simple` radius token to it:

```ts
const Default = asCardToken(vitalCardBase.Default, {
  Theme: {
    ContentWrapper: exampleRadius.Simple,
  },
});
```

### Creating a Fancy 'Radius' Token

Here, we'll use the `addComponents` function provided by Tailwind to first create a collection of
CSS rules containing the corner radius styling to be applied to the `Hero` card.

?> **Note:** In most cases, the default utility classes provided by Tailwind will be enough to meet
your styling needs, but in cases such as this, where we are attempting to apply a more complex set
of styling rules to a component, we can construct those CSS rules directly in our Tailwind
configuration file (`tailwind.config.js`) as shown below:

```js
const twConfig = {
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.card-corner': {
          width: 'calc(100% - 60px)',
          height: '18rem',
          float: 'right',
          'border-radius': '0 0 0 150px',
          'object-fit': 'cover',
          'object-position': 'center',
        },
        '.card-corner-md': {
          // width: '50%',
          height: '31rem',
          'border-radius': '0 0 0 150px',
          'object-position': '72%',
        },
        '.card-corner-lg': {
          width: '100%',
          height: '38rem',
          float: 'none',
          'border-radius': '0 0 0 400px',
        },
        // ...
      });
    }),
  ],
};
```

Returning to our `exampleRadius.ts` token collection file, let's create a `Fancy` token, which will
be used to apply a different `border-radius` style to our card components:

[exampleRadius.ts](https://raw.githubusercontent.com/johnsonandjohnson/Bodiless-JS/main/packages/vital-examples/src/reusable-tokens/components/Radius/tokens/exampleRadius.ts
':include :type=code :fragment=fancy-token')

Now, in our `exampleCard.ts` token collection file, let's create our `Hero` card token and apply our
`Fancy` radius token to it:

[exampleCard.ts](https://raw.githubusercontent.com/johnsonandjohnson/Bodiless-JS/main/packages/vital-examples/src/reusable-tokens/components/Card/tokens/exampleCard.ts
':include :type=code :fragment=hero-card-token')

### The Benefits of Tokens

Let's take a look at the `Default` token we made earlier:

```ts
const Default = asCardToken(vitalCardBase.Default, {
  Theme: {
    ContentWrapper: exampleRadius.Simple,
  },
});
```

It would also be entirely acceptable to apply the `'rounded-br-[40px]'` class from our `Simple`
element token directly to the `Theme` domain of our `Default` card token as follows:

```ts
const Default = asCardToken(vitalCardBase.Default, {
  Theme: {
    ContentWrapper: 'rounded-br-[40px]',
  },
});
```

But what happens if the brand requires that this bit of styling be applied to a number of other
elements across the site? In this case, let's also apply this same utility class to the `Hero`
card's `ContentWrapper` slot.

In order to achieve this, we can apply that class directly to the `Hero` token as follows:

```ts
const Hero = asCardToken({
  ...vitalCardBase.Hero,
  Spacing: {
    ContentWrapper: 'rounded-br-[40px]',
  },
  Theme: {
    ...vitalCardBase.Hero.Theme,
    Image: as(vitalCardBase.Hero.Theme.Image, exampleRadius.Fancy),
  },
});
```

Though this will achieve the desired result, consider a future scenario where the brand guidelines
have changed, and this `border-radius` value is decreased to `20px`.

Because we've duplicated this code in two places, we'll now need to change the value of both
instances of this utility class from `40px` to `20px`.

Now imagine that we've applied this `border-radius` to a number of components on our site. You can
probably begin to see how tedious it might be to track down all instances and make this change.

By, instead, encapsulating this styling in its own `Simple` element token, as we've done at the
beginning of this section, and placing _that_ token on the various components in which we'd like to
use it (or even the `Base` card token from which all other `Card` components are built, if it's
decided that all card elements should have this styling), we ensure that if brand guidelines ever
shift to alter the value of that `border-radius`, we only need to make a change in one place.

## Resources

- [Adding components | Tailwind CSS](https://tailwindcss.com/docs/plugins#adding-components
  ':target=_blank')
- [Vital Component Template](../../Guides/ComponentTemplate)
