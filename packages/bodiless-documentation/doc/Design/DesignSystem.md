# Bodiless Design System

The Bodiless Design System is an opinionated set of tools and patterns for
implementing a reusable and extensible *Design System* in React. Inspired by
principles of Atomic Design, Functional CSS and other functional programming
paradigms, it utilizes React's higher-order components (HOC) to encapsulate
component styling or behavior as reusable *Design Tokens* which can be applied
consistently across a site. All tokens can be independently extended to meet
specific design requirements without changing the overall design system, and
without altering the internal structure of complex components.

## Pre-requisites

To get the most out of this document, you should have a basic familiarity with:

* Atomic Design, Design Systems and Design Tokens
* "Functional" or "Atomic" CSS
* Fundamental principles of functional programming
* React Higher Order Components.

There are many excellent web resources on these topics, and we encourage you to
read a few articles if any of these concepts are foreign to you.

## Design Tokens

The building blocks of a Bodiless Design System are *Design Tokens*. These are
very well defined in the
[Salesforce Lightning Design System](https://www.lightningdesignsystem.com/design-tokens/):

> Design tokens are the visual design atoms of the design system — specifically,
they are named entities that store visual design attributes.

In Bodiless, we construct design tokens in three layers:

### Utility Classes

The lowest level of the system consists of CSS "Utility Classes", usually
produced by a functional CSS library like [Tailwind](https://tailwindcss.com/).
These represent the smallest units of design: things like color palette, border
curvature, typography, etc. They represent the primitive *options* available in your
design system. These classes should be as unambiguous as possible, and should
always have the same effect wherever they are applied.

The Bodiless starter-kit uses the *Tailwind* defaults to generate
this layer. This should be customized for any new site using values from the site's
styleguide. For example, here are the colors defined for the Bodiless admin UI:
```js
      colors: {
        primary: '#0070c8',

        transparent: 'transparent',
        initial: 'initial',
        inherit: 'inherit',

        black: '#22292f',
        white: '#ffffff',

        'gray-100': '#f7fafc',
        'gray-200': '#edf2f7',
        'gray-400': '#cbd5e0',
        gray: '#a0aec0',
        'gray-600': '#718096',
        'gray-800': '#2d3748',
        'gray-900': '#1a202c',

        red: '#e3342f',
        green: '#309795',
      },
```

### Element Tokens

In Bodiless "elements" are single HTML elements, roughly corresponding to
"atoms" in the parlance of Atomic Design. *Element Tokens* are HOC that apply
discrete design attributes to a single element, usually by applying one or more
utility classes.

Element Tokens represent *decisions* about how the options defined by your
utility classes should be applied in particular contexts. (I have borrowed this
distinction between *options* and *decisions* from
[Nathan Curtis' excellent article on Design Tokens](https://medium.com/eightshapes-llc/tokens-in-design-systems-25dd82d58421).
Often, an Element Token will apply a single utiltiy class, eg.
```js
const asErrorText = addClasses('text-red-300');
```
Or, sometimes they will apply more than one class to completely describe an
element's style in a particular context, eg
```js
const asPrimaryHeader = addClasses('font-bold text-3xl');
```

Element tokens can be combined to produce composite tokens for more specific
contexts:
```js
const asErrorPageHeader = flow(asErrorText, asPrimaryHeader);
```

Or they can be extended to implement local variations of a design system:
```js
import { asPrimaryHeader as asPrimaryHeaderBase } from 'some-design-system';
const asPrimaryHeader = flow(
  asPrimaryHeaderBase,
  removeClasses('font-bold'),
  addClasses('font-semibold'),
);
```

### Component Tokens

Bodiless extends the notion of design tokens to components which are larger
than simple elements ("molecules", "organisms", "templates" and even "pages" in
atomic design lingo, though we don't draw much of a distinction among them). A
"Component Token" is usually a colletion of element tokens which should be applied
to the constituent elements of a complex component.  For example, imagine a `Card`
component which has a title, an image, body text and a call-to-action link. We can
then define the following HOC to apply tokens to the title and link:

``` js
const asCardPink = withDesign({
  Title: addClasses('text-base text-pink font-bold'),
  Link: flow(
    addClasses('bg-pink'),
    removeClasses('bg-blue-dark'),
  ),
});
```

In effect, this is creating a sort of macro-token which defines one of the ways
a card can be styled--or, really, one of the axes of variation in card styling.
This can be combined with other tokens to create a specific variant, eg:
```js
const asPinkHorizontalCardNoBody = flow(
  asCardPink,
  asCardHorizontal,
  asCardNoBody,
);
```

Just like element tokens, component tokens can be extended or customized to meet local design
requirements:
```js
import { asCardPink as asCardPinkBase } from 'some-design-system';
const asCardPink = flow(
  asCardPinkBase,
  withDesign({
    Title: flow(
      removeClasses('text-base'),
      addClasses('text-lg'),
    ),
  }),
);
```

### "Behavioral" Tokens

In most design systems, tokens are used to express visual design attributes.
Bodiless extends this idea to include tokens which add units of
*functionality* or *behavior* to a component. This allows behaviors to be
defined uniformly across the site and applied to components of different kinds.
Such "behavioral" tokens can be applied at the Element or Component layer.

One very common application of this pattern is in bestowing "editability" on a
component. In BodilessJS, rich text editors are highly configurable with regards
to both the kinds of formatting allowed and the actual components used to render
that formatting. A typical pattern is to create "behavioral" Element Tokens to
describe the different kinds of editors available on your site. These can then
be leveraged to make behavioral Component Tokens, eg:

```js
import { withEditorSimple, withEditorBasic } from 'my-element-tokens';
const asEditableCard = withDesign({
  Title: withEditorSimple('title', 'Enter title here'),
  Body: withEditorBasic('body', 'Enter body text here'),
});
```

`asEditableCard` can now be composed with other card tokens to make an editable
version of all the different card variants on your site, using standard editors
for each composed text element.

## Applying Tokens to Components

In the Bodiless design system, components should be constructed so as to be
easily shareable and reusable. They should have effectively no styling (this
will be applied through tokens), and only include functionality or behavior
which is intrinsic to the component and not applicable to any other component.
In order to play well with tokens, they should use the
[Design API](../Development/Architecture/FClasses) to allow application of
Component tokens, and their constituent elements should use the
[FClasses API](../Development/Architecture/FClasses) to allow application of
utility-based element tokens.

For example, the basic card from `@bdodiless/card` is very simple:

```js
    <Wrapper {...rest}>
      <ImageWrapper>
        <ImageLink>
          <Image />
        </ImageLink>
      </ImageWrapper>
      <ContentWrapper>
        <Title />
        <Body />
        <Link />
      </ContentWrapper>
    </Wrapper>
```

All the constitutent components default to basic HTML elements stylable
via the FClasses API, and the card itself is designable by the Design API.
That's it: no additional styling or functionality is part of the component.

To make an editable version of the card, we apply a behavioral component token:

``` js  
import { CardClean } from '@bodiless/card';

const asEditableCard = flow(
  withDesign({
    Image: asEditableImage('image'),
    ImageLink: asEditableLink('cta'),
    Title: withEditorSimple('title', 'Card Title Text'),
    Link: flow(
      asEditableLink('cta'),
      withEditorSimple('ctaText', 'Card Button Text'),
    ),
    Body: withEditorBasic('body', 'Card Body Text'),
  }),
);
const Card = asEditableCard(CardClean);

```

Then, to make styled variants of the editable card, we compose various component
tokens.

```js

const CardHorizontal = flow(asCardDefaultStyle, asCardHorizontal, asEditableCard)(Card);
const CardHorizontalNoTitle = flow(asCardDefaultStyle, asCardHorizontal, asCardNoTitle)(Card);
const CardVertical = flow(asCardDefaultStyle, asCardVertical)(Card);
const CardVerticalNoTitle = flow(asCardDefaultStyle, asCardVertical, asCardNoTitle)(Card);
const CardVerticalNoTitleNoBody = flow(
  asCardDefaultStyle,
  asCardVertical,
  asCardNoBodyNoTitle,
)(Card);

```

Generally speaking, these styled card instances should be *local*. It is the
*tokens*, not the *components* which we export and share. If we want to reuse a
particular combination, we can create a composed token:

```js
export const asCardVerticalNoTitleNoBody = flow(
  asCardDefaultStyle,
  asCardVertical,
  asCardNoBodyNoTitle,
);
```

The reason for this is that this token can be applied to *any component which
implements the card's design API*.  For example, let's imagine we needed a
special kind of card with two CTA links.  We could create our clean component
to extend the existing card template by adding this second link:

```js
    <Wrapper {...rest}>
      <ImageWrapper>
        <ImageLink>
          <Image />
        </ImageLink>
      </ImageWrapper>
      <ContentWrapper>
        <Title />
        <Body />
        <Link />
        <SecondLink />
      </ContentWrapper>
    </Wrapper>
```

Now, all the component tokens we defined for the original card will still apply
to our custom card (though of course we will need to extend them to apply
styling or functionality to the second link).

## Conclusion

This has been a very high level overview of the Bodiless Design System. For some
hands on experience, you can proceed to the
[Design System Tutorial](../Development/Guides/DesignElementBasics). Or, you can read the full
documentation for the [Design API](../Development/Architecture/FClasses).

For reference, here is a flow diagram showing how utility classes, element
tokens, component tokens and components are composed to create a basic,
horizontal card:

![](./CardHorizontalDefaultFlow.svg)
