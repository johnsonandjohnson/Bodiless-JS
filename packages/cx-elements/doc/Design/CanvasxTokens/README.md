# CanvasX Tokens

This package contains core element level tokens for the CanvasX design system,
as well as shared utilities for defining tokens and token browser panels.

In this documentation you will find a guide to patterns and best practices
for using and extending the CanvasX Design System.

### Prerequisites

- Please read and understand the introduction to the
  [Bodiless Design System](https://johnsonandjohnson.github.io/Bodiless-JS/#/Design/DesignSystem)
  along with other prerequisites listed there.
- Work through the
  [Design Element Concepts Guide](https://johnsonandjohnson.github.io/Bodiless-JS/#/Development/Guides/DesignElementConcepts).
- Read through the full documentation for the
  [`@bodiless/fclasses` package](https://johnsonandjohnson.github.io/Bodiless-JS/#/Development/Architecture/FClasses).

The CanvasX design system builds on the core Bodiless-JS token system to facilitate
reuse and recomposition of design tokens. Just as in Bodiless, a CanvasX design
implementation consists of utility classes, components and tokens.

## Utility Classes

We use [Tailwind](https://tailwindcss.com/) to generate a rich set of CSS
utility classes which are composed to produce all styling in a design. The
tailwind configuration for CanvasX defines the base set of styling options (colors,
typography, spacing, etc.) which are available for use in the design
system.  A brand library will have its own tailwind configuration which
extends the CanvasX configuration to introduce brand-specific elements.
Finally, in some cases, an individual site may further extend this to
introduce site-specific variations. Details on how to implement this
extension mechanism in CanvasX can be found [**LINK**]()

> TODO: Link to document on tailwind config extension pattern.

## Components

Base React components in CanvasX are usually bare templates which do little or
nothing in themselves until one or more *tokens* (see below) are applied to them.
To make this clear, exported components are generally suffixed with "...Clean"
(eg
[HeaderClean](https://sourcecode.jnj.com/projects/ASX-NBFP/repos/canvasx/browse/packages/canvasx-layout/src/Header/Header.tsx).

A clean component in CanvasX is always "designable" via the
[Bodiless Design API](../../bodiless/Development/Architecture/FClasses?id=the-design-api).
That is, it exposes an api which allows tokens to be applied to constituent
elements within the component. This is very similar to the basic
[slots pattern](https://daveceddia.com/pluggable-slots-in-react-components/) in
React. The key difference is that, with the Design API, we don't inject the actual
react nodes which should be rendered in a particular slot. Instead we provide a
higher order component (a "token") which will be applied to the component in
that slot. This allows us to *layer* styling or behavior for individual
elements.  More on this below.

### Clean Component Design Elements ("Slots")

The starting/default components for design elements in the design of a clean
component should be
[stylable HTML elements exported from `@bodiless/fclasses`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/packages/fclasses/src/StyledHTML.tsx),
except:
- other clean components may be used where appropriate (eg a CleanLayout might
  have a CleanHeader as the starting component for a Header design key).
- a Fragment should be used for design keys which are intended to be replaced by
  actual components. For example, the Title key in a list is a Fragment because
  we have no opinion about what should go there, while the Item design key is a
  stylable `Li` because it is, semantically, a list item.

> In general, use a `Fragment` if you expect a design element to be
> *replaced* by a downstream token, otherwise use a stylable element
> or another clean component.

### Additional best practices for Clean Components
- A clean component should always have a `Wrapper` slot, and should pass
  any props it receives to its wrapper.  For example:
  ```
  const MyComponentBase = ({ components: C, ...rest }) => (
    <C.Wrapper {...rest}>
      ...
    </C.Wrapper>
  );
  ```
- Slots in a clean component which are intended to receive editors (rich text, plain text or
  flow container) should have wrappers. This facilitates swapping out the editor without
  altering the layout styling.  For example:
  ```
  const MyComponentBase = ({ components: C, ...rest }) => (
    ...
      <C.ContentWrapper>
        <C.Content />
      </C.ContentWrapper>
    ...
  );
  ```

## Tokens

In CanvasX, the design token is the fundamental unit of styling and behavior.
These are assembled into libraries and then extended or recomposed by downstream
libraries or sites. In almost every case, you would not export a styled or
otherwise enhanced component from your package; instead, you would export a
composed token which gives it the look or behavior you want.

Tokens in the CanvasX Design System are divided into two broad groups: *Element*
level tokens and *Component* level tokens.

### Element Level Tokens

These apply to simple html elements, or to components which render single elements.
They correspond roughly to *atoms* in the parlance of atomic design.  They
are usually simple HOC's which add classes or props to the element (though they
may also add behaviors).

While Element level tokens are usually small--sometimes even consisting of only a
single Tailwind class--they serve a different function from the classes they
compose.  As described in the Bodiless documentation, element tokens represent
*decisions* about how the *options* defined by your tailwind configuration
should be applied.

Let's take color as an example. The
[CanvasX Tailwind configuration](https://sourcecode.jnj.com/projects/ASX-NBFP/repos/canvasx/browse/packages/canvasx-elements/tailwind.config.js)
defines a base color pallette (here we show only the blues):
```js
  theme: {
    extend: {
      colors: {
        blue: {
          'cx-light': '#0074D9',
          'cx': '#005EB0',
          'cx-dark': '#004887',
          'cx-darker': '#7697B5',
          ...
```
These represent all allowed shades of blue defined by the design system (here
`cx` stands for brand name - CanvasX; for *Imodium* it would be
`text-blue-imodium` and so on).

At the next level a color *token* defines how and where these colors should be
used, eg:

```ts
export const PrimaryTextInteractiveColor = asSimpleToken('Theme')(
  'text-blue-cx hover:text-blue-cx-light',
);
```

The naming conventions help to make the distinction clear. The tailwind classes
are named unambiguously to describe what the color *is*; the token is named to
describe how/where the color *should be used.*. Note also that the token
composes a pair of colors for different state variants. Again, it represents a
*decision* about the function of these colors in the design. The colors
themselves could be reused in other contexts; the token is *only* for primary,
interactive text.

> Note: In CanvasX, tokens are usually expressed using a special format known as
> the *Token Object Notation*. The `asSimpleToken` utility used above produces
> a token in this format:
> ```ts
> {
>   Theme: {
>     _: 'text-blue-cx hover:text-blue-cx-light',
>   },
> };
> ```
> This extends the normal Bodiless pattern of expressing tokens
> as React higher-order components. The token above can be converted
> to a simple HOC via the CanvasX `as` utility:
> ```ts
> const asPrimaryTextInteractiveColor = as(PrimaryTextInteractiveColor);
> ```
> which is identical to:
> ```ts
> const asPrimaryTextInteractiveColor = addClasses('text-blue-cx hover:text-blue-cx-light');
> ```
> This is described more fully in the context of *component-level tokens* below. 

Element level tokens can be composed out of other element level tokens, for example

```ts
export const TextLink = asSimpleToken('Theme')(
  withPrimaryTextInteractiveColor,
  'underline',
);
```

As the name implies, this token has an even more circumscribed field of play: it
describes the styling only for plain links in text.  Note that it combines a
more generic element level token `withPrimaryTextInteractiveColor` with some
additional Tailwind classes.  Importantly, there is no `withUnderline` token.
This is because underlining, like the raw colors defined above, is simply a
formatting *option*, not a decision about how the option should be used.

In general, we should be cautious about defining new element level tokens.
Before promoting a composition of utility classes to a token be sure:
- It represents a choice about how those classes should be used in specific context.
- it is *reusable* outside of a single component. For example, if you
  have a collection of styles which are *only* used for the title of
  a card, it is unlikely that you need an element level token like
  `WithCardTitleStyles`.  Instead, combine those styles in a component-
  level token.

### Component Level Tokens.

As described in [the Bodiless documentation](), a Component Level token composes
a collection of styles and behaviors onto a *compound component* -- that is, one
which renders more than a single element (these are the molecules, organisms and
templates in the language of Atomic Design). As described above, such components
use the Bodiless Design API to allow their constituent elements to receive
tokens which define their look, feel and behavior in the context of the enclosing
component.

#### Token Object Notation

Like element level tokens, component-level tokens are expressed in BodilessJS as
React higher-order components. In CanvasX, however, in order to facilitate reuse
and customization, we introduce a method of expressing tokens as
JavaScript objects: the *token object notation*. All component level tokens in a
CanvasX design system are exported in this format, which allows them to be more
easily recomposed, altered or extended by downstream consumers (brand libraries,
regional libraries or individual sites).

A token described in this notation is a 2-level nested object. The inner keys
of this object are simply the design keys of the component to which the token
applies, and their values are higher-order components which should be applied
to each element.  The top level keys represent "domains" -- pieces of the token
which might be selectively reused, extended or overridden by a downstream consumer.

As a very simple example, let's look at the basic design of a CanvasX `Link`
component. Note that in CanvasX, a Link is actually a compound component
containing multiple design keys, something like this:

```ts
  <Wrapper>
    <ExternalSRText />
    <Body>
      {children}
    </Body>
    <ExternalIcon />
  </Wrapper>
```

Here is a basic token describing its styling and behavior:

```ts
const Default = {
  Theme: {
    Wrapper: brandElement.TextLink,
  },
  Editors: {
    _: brandElement.EditableLink,
  },
};

export const brandLink = {
  Default,
};
```
Here we define two "domains" - *Theme* and *Editors*, and specify element level
tokens which should be applied to the `Wrapper` key of the designable `Link` component.

Note that we reuse element level tokens (`brandElement.TextLink` and
`brandElement.EditableLink`). These are defined at the element level because
there may be times when you wish to apply that styling or behavior to a
plain `A` tag.

> Note also the use of the special `_` key in the `Editors` domain. This
> indicates that the associated HOC(s) should be applied to the component as a
> whole rather than to an individual design element within the component.

CanvasX provides the `as` utility for creating a token HOC from such a
specification:

```ts
import { as } from '@canvasx/elements';
import { LinkClean, brandLink } from '@canvasx/brand';
const DefaultLink = as(brandLink.Default)(LinkClean);
```

Defining and exporting our token as an object rather than an HOC allows
an individual brand or site to customize part of the token's behavior
while retaining the rest.  For example, let's imagine that our site's
design system calls for links to be purple and not underlined. We could
retain the edit behavior of the brand link and change its styling:

```ts
import { brandLink } from '@canvasx/brand';
const Base = {
  ...brandLink.Base,
  Theme: {
    Wrapper: addClasses('text-purple'),
  },
};
export const siteLink = {
  Base,
}
```

Our site level `Base` token reuses everything from the CanvasX `Base` token, but overrides
the `Theme` domain with site-specific styling.

As another example, imagine we wanted to reuse the styling of the original link,
but in a context where we did not want the link to be editable by a content
editor. We could easily define our non-editable link as:

```ts
import omit from 'lodash/omit';
import { LinkClean } from '@canvasx/link';
import { brandLink } from '@canvasx/brand';

const NonEditableLink = as(omit(brandLink.Base, 'Editors'))(LinkClean);
```

#### Domains

In the above example, we defined two *domains*: "Theme" and "Editors". This
choice was based on an understanding of how the token would likely be
reused or extended by downstream consumers. In this case, we separated
design elements which were very unlikely to be reused (typography and colors),
from a behavior (editability) which was more likely to be reused, but which
might also be extracted.  It's important to think about these use cases
when defining any component level token, and to divide it into domains
accordingly.

CanvasX provides a predefined set of domains and all keys of a token
specification must belong to this set.
[Read more about token domains](./TokenDomains.md);

#### Extension and Composition

The real power of tokens is their ability to be extended or composed to produce
new variants of a component without altering the base component itself. There
are two patterns for doing this -- *Extension* and *Composition* -- and it's
important to understand the difference.

As an example, let's consider the CanvasX `Header` component. This exports a
`Base` token which contains the basic header layout, styling and behavior as
well as a `WithSticky` token which can be composed with the `Base` to produce a
sticky version. Using the *Extension* pattern, you could merge these two tokens
into a single object:

```ts
const Sticky = asHeaderToken({
  ...Base,
  Theme: {
    ...Base.Theme,
    Wrapper: as(Base.Theme.Wrapper, WithSticky.Theme.Wrapper),
  },
  Layout: {
    ...Base.Layout,
    Wrapper: as(Base.Layout.Wrapper, WithSticky.Layout.Wrapper),
  },
});
```

CanvasX provides the `extend` utility to make this a bit less verbose:

```ts
import { extend } from '@canvasx/elements';

const Sticky = extend(Base, WithSticky);
```

This is exactly equivalent to the above, and would merge all design keys in all
domains of both tokens. Note, this is quite different from the following:

```ts
const Sticky = asHeaderToken({
  ...Base,
  Theme: {
    ...Base.Theme,
    Wrapper: WithSticky.Theme.Wrapper,
  },
  Layout: {
    ...Base.Layout,
    Wrapper: WithSticky.Layout.Wrapper,
  },
});
```

In that version, using default javascript object composition, the `Wrapper` key
in both `Theme` and `Layout` domains is *replaced* with the values from
`WithSticky`, with the result that any styles applied to that key by those
domains in the `Base` token will be lost.

Using the above pattern creates a new token which can be used to create a sticky
header, but it has one disadvantage. What if a downstream consumer of the token
wants to reuse that token but omit the sticky part? Here, they could simply use
the `Base` token by itself -- but what if that base token weren't available?
There is no easy way to extract an enhancement which has been deeply merged
into another token.  For this example, it would be better to use the *composition*
pattern.  The simplest way to compose two tokens is to apply them both via `as`:

```ts
const StickyHeader = as(Base, WithSticky)(HeaderClean);
```

This will work, and is fine for one-time composition, but CanvasX also provides
a mechanism for exporting a composed token (rather than a component to which
the tokens are applied):

```ts
const Sticky = asHeaderToken({
  ...Base,
  Compose: {
    WithSticky,
  },
});
```

Now `as(Sticky)` is exactly equivalent to `as(Base, WithSticky)` -- and a downstream
consumer can easily remove (or customize) the sticky part:

```ts
const NotSticky = asHeaderToken({
  ...Sticky,
  Compose: omit(Base.Compose, 'Sticky'),
});
```

or

```ts
const CustomSticky = asHeaderToken({
  ...Sticky,
  Compose: {
    WithSticky: WithCustomSticky,
  },
});
```

The difference between *extension* and *composition* is subtle, and deciding which
to use is not an exact science.  As a rule of thumb:

- Use *composition* when you are adding styling or behavior which creates a
  variation of the original component which downstream consumers may choose to
  add or remove, customize or combine with other variations. In general, export
  the tokens which produce these variations using the `With...` prefix. The
  `WithSticky` token above is a good example of when this pattern should be
  used.
- Use *extension* when you are customizing an existing token at the brand or
  site level, and especially when you want to completely override one or more
  domains from the original token, as this is not possible with composition. In
  general, do not export tokens which are meant to extend other tokens; export
  the fully extended token instead. The `Link` customization described earlier
  in this article is a good example of when this pattern should be used.


#### Nested Components

A CanvasX component will often have other clean components as design elements.
For example, the
[CanvasX Layout Component](https://sourcecode.jnj.com/projects/ASX-NBFP/repos/canvasx/browse/packages/canvasx-layout/src/Layout/Layout.tsx)
includes the `HeaderClean` and `FooterClean` components as design keys:
```ts
  const layoutComponents: LayoutComponents = {
    Header: Header,
    Footer: Footer,
    ...
  };
  ...
  <OuterContainer>
    ...
    <Header />
    ...
    <Footer />
  </OuterContainer>
```

The header in turn, also has a component level design key: the `Logo`. Thus,
it would be possible to create a `Layout` token with nested designs, eg:

```ts
const Default = {
  Spacing: {
    Header: withDesign({
      Logo: withDesign({
        Wrapper: addClasses('p-2'),
      })
    })
  }
}
```

**This should be avoided**. It makes for overly complex tokens which entangle
multiple components.  The two-level structure of the token object notation is
explicitly designed to discourage this ort of nesting.  Instead, you should
create tokens for each of the constituent components, and apply them at the top
level, using a `Components` domain. For example:
```
const Logo.Default = {
  Spacing: {
    Wrapper: addClasses('p-2'),
  },
};

const HeaderDefault = {
  Components: {
    Logo: as(Logo.Default),
  },
  ...,
};

const LayoutDefault = {
  Components: {
    Header: as(Header.Default),
    Footer: ...,
  }
}
```

#### Helpers and Shortcuts

In addition to the `as` utility, CanvasX provides a few helpers and shortcuts
to make defining tokens a bit easier:

- **Strings as classNames**: You can specify the values of the inner (design)
  keys in a token specification as plain strings. These will be interpreted as
  a list of classes to add to the element.  That is:
  ```ts
  {
    Theme: {
      Wrapper: 'px-3',
    }
  }
  ```
  is equivalent to
  ```ts
  {
    Theme: {
      Wrapper: addClasses('px-3'),
    }
  }
  ```

- **`t()`:** This function is a shorthand for the Bodiless `asToken()` utility, but overloaded
  to accept strings as classes. Use it to compose multiple token hoc's into a single
  design key.

- **`asTokenSpec()`:** Use this helper to wrap your token specification objects so
  as to provide better type checking and type inference. You should export a version
  for every clean component you create:
  ```ts
  const asHeaderTokenSpec = asTokenSpec<HeaderComponents>();
  ```
  and then use this to wrap your tokens:
  ```ts
  const Default = asHeaderTokenSpec({
    Theme: {
      ...
    }
  })
  ```
  This will ensure that your inner-keys are constrained to the design keys of the
  `HeaderClean` component, and provide autocomplete of both domains and design
  keys for downstream consumers.
