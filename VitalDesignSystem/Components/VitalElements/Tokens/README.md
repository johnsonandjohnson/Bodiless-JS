# Vital Tokens

This package contains core element-level tokens for the Vital Design System, as well as shared
utilities for defining tokens and token browser panels.

In this documentation, you will find a guide to patterns and best practices for using and extending
the Vital Design System.

## Prerequisites

- Please read and understand the introduction to the [Bodiless Design System](/Design/DesignSystem),
  along with other prerequisites listed there.
- Work through the [Design Element Concepts Guide](/Development/Guides/DesignElementConcepts).
- Read through the full documentation for the [`@bodiless/fclasses`
  package](/Development/Architecture/FClasses).

The Vital Design System builds on the core BodilessJS token system to facilitate reuse and
recomposition of design tokens. Just as in Bodiless, a Vital design implementation consists of
utility classes, components, and tokens.

## Utility Classes

We use [Tailwind](https://tailwindcss.com/ ':target=_blank') to generate a rich set of CSS utility
classes which are composed to produce all styling in a design. The Tailwind configuration for Vital
defines the default set of styling options (colors, typography, spacing, etc.) available for use in the
design system. A brand library will have its own Tailwind configuration, which extends the Vital
configuration to introduce brand-specific elements. Finally, in some cases, an individual site may
further extend this to introduce site-specific variations. Details on how to implement this
extension mechanism in Vital can be found [_TBD_]().
<!-- TODO: Link to document on Tailwind config extension pattern. -->

## Components

Default React components in Vital are usually bare templates which do little or nothing in themselves
until one or more _tokens_ (see below) are applied to them. To make this clear, exported components
are generally suffixed with "...Clean" (e.g.,
[`HeaderClean`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-layout/src/components/Header/HeaderClean.tsx
':target=_blank')).

A clean component in Vital is always "designable" via the [Bodiless Design
API](../../bodiless/Development/Architecture/FClasses?id=the-design-api). That is, it exposes an API
which allows tokens to be applied to constituent elements within the component. This is very similar
to the basic [slots pattern](https://daveceddia.com/pluggable-slots-in-react-components/
':target=\_blank') in React. The key difference is that, with the Design API, we don't inject the
actual React nodes which should be rendered in a particular slot; instead, we provide a higher-order
component (a _token_) which will be applied to the component in that slot. This allows us to _layer_
styling or behavior for individual elements. More on this below.

### Clean Component Design Elements ("Slots")

The starting/default components for design elements in the design of a clean component should be
[stylable HTML elements exported from
`@bodiless/fclasses`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/fclasses/src/StyledHTML.tsx
':target=_blank'), except:

- Other clean components may be used where appropriate (e.g., a `CleanLayout` might have a
  `CleanHeader` as the starting component for a `Header` design key).
- A Fragment should be used for design keys which are intended to be replaced by
  actual components.
  - For example, the `Title` key in a list is a Fragment, because we have no opinion about what
    should go there, while the `Item` design key is a stylable `Li` because it is, semantically, a
    list item.

?> In general, use a `Fragment` if you expect a design element to be _replaced_ by a downstream
token; otherwise, use a stylable element or another clean component.

### Additional Best Practices for Clean Components

- A clean component should always have a `Wrapper` slot, and should pass any props it receives to
  its wrapper.  
  For example:

  ```tsx
  const MyComponentBase = ({ components: C, ...rest }) => (
    <C.Wrapper {...rest}>
      // ...
    </C.Wrapper>
  );
  ```

- Slots in a clean component which are intended to receive editors (rich text, plain text, or Flow
  Container) should have wrappers. This facilitates swapping out the editor without altering the
  layout styling.  
  For example:

  ```tsx
  const MyComponentBase = ({ components: C, ...rest }) => (
    // ...
    <C.ContentWrapper>
      <C.Content />
    </C.ContentWrapper>
    // ...
  );
  ```

## Tokens

In Vital, the design token is the fundamental unit of styling and behavior. These are assembled into
libraries, and then extended, or recomposed, by downstream libraries or sites. In almost every case,
you would not export a styled or otherwise enhanced component from your package; instead, you would
export a composed token which gives it the look or behavior you want.

Tokens in the Vital Design System are divided into two broad groups: [_Element_-level
tokens](#element-level-tokens) and [_Component_-level tokens](#component-level-tokens).

### Element-Level Tokens

These apply to simple HTML elements, or to components which render single elements. They correspond
roughly to _atoms_ in the parlance of [Atomic
Design](https://bradfrost.com/blog/post/atomic-web-design/ ':target=_blank'). They are usually
simple HOCs which add classes or props to the element (though they may also add behaviors).

While _Element-level tokens_ are usually small — sometimes even consisting of only a single Tailwind
class — they serve a different function from the classes they compose. As described in the Bodiless
documentation, element tokens represent _decisions_ about how the _options_ defined by your Tailwind
configuration should be applied.

Let's take color as an example. The [Vital Tailwind
configuration](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-elements/tailwind.config.js
':target=_blank') defines a base color palette:

```js
module.exports = {
  // ...
  theme: {
    colors: {
      'vital-primary': {
        brand: '#CA081B',
        'card-bg': '#ffffff',
        'page-bg': '#F4F4F4',
        interactive: '#000099',
        'interactive-active': '#000341',
        divider: '#D8D8D8',
        'body-copy': '#63666A',
        'header-copy': '#212121',
        'footer-copy': '#FFFFFF',
      },
      'vital-secondary': {
        eyebrow: '#CC0099',
        'footer-bg': '#2B2B33',
      },
    },
    // ...
  },
  // ...
};
```

At the next level, a color _token_ defines how and where these colors should be used. Color tokens
can be defined in a color group, such as:

```js
export default asTokenGroup(meta)({
  BgPrimaryBrand: 'bg-vital-primary-brand',
  TextPrimaryBrand: 'text-vital-primary-brand',
  BgPrimaryCard: 'bg-vital-primary-card-bg',
  // ...
});
```

`asTokenGroup()` takes a group of `asElementToken()` assignments, and assigns them all the same
data.

`asElementToken()` can be used to define a single token. For example:

```ts
export const PrimaryTextInteractiveColor = asElementToken('Theme')(
  'text-blue-vital hover:text-blue-vital-light',
);
```

The naming conventions help to make the distinction clear. The Tailwind classes are named
unambiguously to describe what the color _is_; the token is named to describe how/where the color
_should be used_. Note, also, that the token composes a pair of colors for different state variants.
Again, it represents a _decision_ about the function of these colors in the design. The colors
themselves could be reused in other contexts; the token is _only_ for primary, interactive text.

<!-- Inlining HTML to add multi-line info block with code block. -->
<div class="warn">
  <strong>Note:</strong> In Vital, tokens are usually expressed using a special format known as
  the <em>Token Object Notation</em>. The <code>asElementToken</code> utility used above produces
  a token in this format:

  ```ts
  {
    Theme: {
      _: 'text-blue-vital hover:text-blue-vital-light',
    },
  };
  ```

  This extends the normal Bodiless pattern of expressing tokens as React higher-order components.
  The token above can be converted to a simple HOC via the Vital `as` utility:

  ```ts
  const asPrimaryTextInteractiveColor = as(PrimaryTextInteractiveColor);
  ```

  which is identical to:

  ```ts
  const asPrimaryTextInteractiveColor = addClasses(
    'text-blue-vital hover:text-blue-vital-light'
  );
  ```

  This is described more fully in the context of [Component-Level Tokens](#component-level-tokens)
  below.

</div>

Element-level tokens can be composed out of other element-level tokens, for example:

```ts
export const TextLink = asElementToken('Theme')(
  withPrimaryTextInteractiveColor,
  'underline',
);
```

As the name implies, this token has an even more circumscribed field of play: it describes the
styling only for plain links in text. Note that it combines a more generic element-level token
`withPrimaryTextInteractiveColor` with some additional Tailwind classes. Importantly, there is no
`withUnderline` token. This is because underlining, like the raw colors defined above, is simply a
formatting _option_ — not a decision about how the option should be used.

In general, we should be cautious about defining new element-level tokens. Before promoting a
composition of utility classes to a token, be sure:

- It represents a choice about how those classes should be used in a specific context.
- It is _reusable_ outside of a single component.
  - For example, if you have a collection of styles which are _only_ used for the title of a card,
    it is unlikely that you need an element-level token like `WithCardTitleStyles`. Instead, combine
    those styles in a component-level token.

### Component-Level Tokens

As described in [the Bodiless documentation](), a _component-level token_ composes a collection of
styles and behaviors onto a _compound component_ — that is, one which renders more than a single
element (these are the molecules, organisms, and templates in the language of [Atomic
Design](https://bradfrost.com/blog/post/atomic-web-design/ ':target=_blank')). As described above,
such components use the Bodiless Design API to allow their constituent elements to receive tokens
which define their look, feel, and behavior in the context of the enclosing component.

<div class="warn">
  <strong>In this section:</strong>

  - [Token Object Notation](#token-object-notation)
  - [Domains](#domains)
  - [Extension and Composition](#extension-and-composition)
  - [Nested Components](#nested-components)
  - [Helpers and Shortcuts](#helpers-and-shortcuts)

</div>

#### Token Object Notation

Like [element-level tokens](#element-level-tokens), component-level tokens are expressed in
BodilessJS as React higher-order components. In Vital, however, in order to facilitate reuse and
customization, we introduce a method of expressing tokens as JavaScript objects: the _token object
notation_. All component-level tokens in a Vital Design System are exported in this format, which
allows them to be more easily recomposed, altered, or extended by downstream consumers (brand
libraries, regional libraries, or individual sites).

A token described in this notation is a two-level nested object. The inner keys of this object are
simply the design keys of the component to which the token applies, and their values are
higher-order components which should be applied to each element. The top-level keys represent
"domains" — pieces of the token which might be selectively reused, extended, or overridden by a
downstream consumer.

As a very simple example, let's look at the basic design of a Vital `Link` component. Note that in
Vital, a Link is actually a compound component containing multiple design keys; something like this:

```tsx
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
  Schema: {
    _: brandElement.EditableLink,
  },
};

export const brandLink = {
  Default,
};
```

Here we define two "domains" — `Theme` and `Editors` — and specify element-level tokens which should
be applied to the `Wrapper` key of the designable `Link` component.

Note that we reuse element-level tokens (`brandElement.TextLink` and `brandElement.EditableLink`).
These are defined at the element level because there may be times when you wish to apply that
styling or behavior to a plain `A` tag.

?> **Note:** Note also the use of the special `_` key in the `Editors` domain. This indicates that
the associated HOC(s) should be applied to the component as a whole rather than to an individual
design element within the component.

Vital provides the `as` utility for creating a token HOC from such a specification:

```ts
import { as } from '@bodiless/vital-elements';
import { LinkClean, brandLink } from '@bodiless/brand';
const DefaultLink = as(brandLink.Default)(LinkClean);
```

Defining and exporting our token as an object rather than an HOC allows an individual brand or site
to customize part of the token's behavior while retaining the rest. For example, let's imagine that
our site's design system calls for links to be purple and not underlined. We could retain the edit
behavior of the brand link and change its styling:

```ts
import { brandLink } from '@bodiless/brand';
const Default = {
  ...brandLink.Deafult,
  Theme: {
    Wrapper: addClasses('text-violet'),
  },
};
export const siteLink = {
  Default,
};
```

Our site-level `Default` token reuses everything from the Vital `Default` token, but overrides the `Theme`
domain with site-specific styling.

As another example, imagine we wanted to reuse the styling of the original link, but in a context
where we did not want the link to be editable by a Content Editor. We could easily define our
non-editable link as:

```ts
import omit from 'lodash/omit';
import { LinkClean } from '@bodiless/vital-link';
import { brandLink } from '@bodiless/brand';

const NonEditableLink = as(omit(brandLink.Default, 'Editors'))(LinkClean);
```

#### Domains

In the above example, we defined two _domains_: `Theme` and `Editors`. This choice was based on an
understanding of how the token would likely be reused or extended by downstream consumers. In this
case, we separated design elements which were very unlikely to be reused (typography and colors),
from a behavior (editability) which was more likely to be reused, but which might also be extracted.
It's important to think about these use cases when defining any component-level token, and to divide
it into domains accordingly.

Vital provides a predefined set of domains and all keys of a token specification must belong to this
set.  
[Read more about token domains](./TokenDomains).

#### Extension and Composition

The real power of tokens is their ability to be extended or composed to produce new variants of a
component without altering the base component itself. There are two patterns for doing this —
_Extension_ and _Composition_ — and it's important to understand the difference.

As an example, let's consider the Vital `Header` component. This exports a `Default` token which
contains the basic header layout, styling, and behavior; as well as a `WithSticky` token which can
be composed with the `Default` to produce a sticky version. Using the _Extension_ pattern, you could
merge these two tokens into a single object:

```ts
const Sticky = asHeaderToken({
  ...Default,
  Theme: {
    ...Default.Theme,
    Wrapper: as(Default.Theme.Wrapper, WithSticky.Theme.Wrapper),
  },
  Layout: {
    ...Default.Layout,
    Wrapper: as(Default.Layout.Wrapper, WithSticky.Layout.Wrapper),
  },
});
```

Vital provides the `extend` utility to make this a bit less verbose:

```ts
import { extend } from '@bodiless/vital-elements';

const Sticky = extend(Default, WithSticky);
```

This is exactly equivalent to the above, and would merge all design keys in all domains of both
tokens. Note, this is quite different from the following:

```ts
const Sticky = asHeaderToken({
  ...Default,
  Theme: {
    ...Default.Theme,
    Wrapper: WithSticky.Theme.Wrapper,
  },
  Layout: {
    ...Default.Layout,
    Wrapper: WithSticky.Layout.Wrapper,
  },
});
```

In that version, using default JavaScript object composition, the `Wrapper` key in both `Theme` and
`Layout` domains is _replaced_ with the values from `WithSticky`, with the result that any styles
applied to that key by those domains in the `Default` token will be lost.

Using the above pattern creates a new token which can be used to create a sticky header, but it has
one disadvantage. What if a downstream consumer of the token wants to reuse that token but omit the
sticky part? Here, they could simply use the `Default` token by itself — but what if that base token
weren't available? There is no easy way to extract an enhancement which has been deeply merged into
another token. For this example, it would be better to use the _composition_ pattern. The simplest
way to compose two tokens is to apply them both via `as`:

```ts
const StickyHeader = as(Default, WithSticky)(HeaderClean);
```

This will work, and is fine for one-time composition, but Vital also provides a mechanism for
exporting a composed token (rather than a component to which the tokens are applied):

```ts
const Sticky = asHeaderToken({
  ...Default,
  Compose: {
    WithSticky,
  },
});
```

Now `as(Sticky)` is exactly equivalent to `as(Default, WithSticky)` — and a downstream consumer can
easily remove (or customize) the sticky part:

```ts
const NotSticky = asHeaderToken({
  ...Sticky,
  Compose: omit(Default.Compose, 'Sticky'),
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

The difference between _extension_ and _composition_ is subtle, and deciding which to use is not an
exact science. As a rule of thumb:

- Use _composition_ when you are adding styling or behavior which creates a variation of the
  original component which downstream consumers may choose to add, remove, customize, or combine
  with other variations. In general, export the tokens which produce these variations using the
  `With...` prefix. The `WithSticky` token above is a good example of when this pattern should be
  used.
- Use _extension_ when you are customizing an existing token at the brand or site level, and
  especially when you want to completely override one or more domains from the original token, as
  this is not possible with composition. In general, do not export tokens which are meant to extend
  other tokens; export the fully extended token instead. The `Link` customization described earlier
  in this article is a good example of when this pattern should be used.

#### Nested Components

A Vital component will often have other clean components as design elements. For example, the [Vital
Layout
Component](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-layout/src/components/Layout/LayoutClean.tsx)
includes the `HeaderClean` and `FooterClean` components as design keys:

```tsx
  const layoutComponents: LayoutComponents = {
    Header: Header,
    Footer: Footer,
    // ...
  };
  ...
  <OuterContainer>
    ...
    <Header />
    ...
    <Footer />
  </OuterContainer>
```

The header, in turn, also has a component-level design key: the `Logo`. Thus, it would be possible
to create a `Layout` token with nested designs, e.g.:

```ts
const Default = {
  Spacing: {
    Header: withDesign({
      Logo: withDesign({
        Wrapper: addClasses('p-2'),
      }),
    }),
  },
};
```

**This should be avoided.** It makes for overly complex tokens which entangle multiple components.
The two-level structure of the token object notation is explicitly designed to discourage this sort
of nesting. Instead, you should create tokens for each of the constituent components, and apply them
at the top level, using a `Components` domain. For example:

```ts
const Logo.Default = {
  Spacing: {
    Wrapper: addClasses('p-2'),
  },
};

const HeaderDefault = {
  Components: {
    Logo: as(Logo.Default),
  },
  // ...,
};

const LayoutDefault = {
  Components: {
    Header: as(Header.Default),
    Footer: ...,
  },
};
```

#### Helpers and Shortcuts

In addition to the `as` utility, Vital provides a few helpers and shortcuts to make defining tokens
a bit easier:

- **Strings as classNames:** You can specify the values of the inner (design) keys in a token
  specification as plain strings. These will be interpreted as a list of classes to add to the
  element. That is:

  ```ts
  {
    Theme: {
      Wrapper: 'px-3',
    }
  }
  ```

  is equivalent to:

  ```ts
  {
    Theme: {
      Wrapper: addClasses('px-3'),
    }
  }
  ```

- **`t()`:** This function is a shorthand for the Bodiless `asToken()` utility, but overloaded to
  accept strings as classes. Use it to compose multiple token HOCs into a single design key.

- **`asTokenSpec()`:** Use this helper to wrap your token specification objects so as to provide
  better type checking and type inference. You should export a version for every clean component you
  create:

  ```ts
  const asHeaderTokenSpec = asTokenSpec<HeaderComponents>();
  ```

  and then use this to wrap your tokens:

  ```ts
  const Default = asHeaderTokenSpec({
    Theme: {
      // ...
    }
  });
  ```

  This will ensure that your inner-keys are constrained to the design keys of the `HeaderClean`
  component, and provide autocomplete of both domains and design keys for downstream consumers.
