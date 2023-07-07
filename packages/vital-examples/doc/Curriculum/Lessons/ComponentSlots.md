# No Slot Available In White Label Component

## Overview

In this lesson, we will be exploring the concept of _slots_, and the best practices and preferred
patterns when using them to build components.

At its core, a component crafted in Bodiless is essentially a React component split into 'slots'
that represent the various container and child elements of said component.

Take for example the `Card` component below:

```tsx
export const cardComponentStart: CardComponents = {
  /* Each 'slot' in this component is instantiated as either a specific HTML
   * element, a completely different component entirely, or -- in some cases
   * -- a 'Fragment,' which essentially adds this slot to the structure of the
   * component, but leaves it disabled by default.
   *
   * The use of Fragments is helpful in cases where a component may have
   * variants that don't use every element of the base component. For example,
   * if in building out our collection of card components, we anticipate that
   * we'll want to create variants with and without a ratings slot (think
   * Article Card vs Product Card), it might be helpful to reserve space in
   * our base card component to accommodate a ratings section, but only
   * activate it in the variants that would make use of it.
   */
  Wrapper: A,
  ImageWrapper: Div,
  Image: Img,
  EyebrowWrapper: Div,
  Eyebrow: Fragment,
  ContentWrapper: Div,
  TitleWrapper: H3,
  Title: Fragment,
  DescriptionWrapper: Fragment,
  Description: Div,
  Rating: Fragment,
  RatingWrapper: Fragment,
  CTAText: Fragment,
  CTALink: LinkClean,
  CTAWrapper: Div,
};

const CardBase: FC<CardBaseProps> = ({ components: C, ...rest }) => {
  // Each of the JSX elements below is essentially a 'slot' within this
  // component, and represents the various containers and wrappers that create
  // the structure of this card component.
  return (
    <C.Wrapper {...rest}>
      <C.ImageWrapper>
        <C.Image />
      </C.ImageWrapper>
      <C.ContentWrapper>
        <C.EyebrowWrapper>
          <C.Eyebrow />
        </C.EyebrowWrapper>
        <C.TitleWrapper>
          <C.Title />
        </C.TitleWrapper>
        <C.DescriptionWrapper>
          <C.Description />
        </C.DescriptionWrapper>
        <C.RatingWrapper>
          <C.Rating />
        </C.RatingWrapper>
        <C.CTAWrapper>
          <C.CTALink>
            <C.CTAText />
          </C.CTALink>
        </C.CTAWrapper>
      </C.ContentWrapper>
    </C.Wrapper>
  );
};
```

The purpose of this lesson is to gain a better understanding of what slots are, and how and when to
manipulate them.

Because the _white label_ components are meant to provide only the slots specified by the Vital
Design System (on which all brand sites are built), there is currently no way to fundamentally alter
those components without disrupting their appearance across all sites.

For example, if you wanted to add a second `CTA` button to your card component, and attempted to add
that new slot to the base Vital Card, every single card component that is built off of the base
Vital Card would then have a new `CTA` button added to it, whether you wanted it or not.

One could potentially hide that button, or instantiate it as a `Fragment` in your token, but now
you're introducing extra lines of code that weren't needed before, and, in this case, you're only
doing so in order to _remove_ something that should not have been there in the first place.

This is obviously neither ideal nor particularly scalable. If the solution was simply to continue
adding slots whenever the need for them arose, you'd eventually be left with a massive, Frankenstein
component with a bevy of slots that the majority of sites may never need, but exists simply because
one brand at some point in the past did.

In instances where a slot simply _must_ be added, if it appears that said slot could actually be
used across multiple sites, then the option exists to add this slot to the base Vital component. A
decision like this would be made on a case-by-case basis.

In lieu of adding a new slot to the Vital component, there are two other options at your disposal:

01. Creating a new clean component and adding a new brand-specific slot;
01. Creating a new slot in the body of a token using `withAppendChild`.

## Assignment

### Option 1: Creating a New Clean Component and Adding a New Brand-Specific Slot

In this example, we're going to add a button to the Header, just to the right of the `WhereToBuy`
button.

In order to do so, we will essentially replicate the entirety of the clean Vital Header component,
and add our new slot under the `WhereToBuy` button:

```ts
const headerComponents: HeaderComponents = {
  Wrapper: Header,
  Container: Div,
  MenuContainer: Div,
  MenuTogglerWrapper: Div,
  MenuToggler: A,
  MenuWrapper: Fragment,
  Menu: MenuClean,
  BurgerMenuWrapper: Fragment,
  BurgerMenu: BurgerMenuClean,
  Logo: LogoClean,
  ActionMenuContainer: Div,
  OuterUtilityMenuWrapper: Fragment,
  OuterUtilityMenu: Fragment,
  UtilityMenuWrapper: Fragment,
  UtilityMenu: MenuClean,
  DesktopSearch: Fragment,
  MobileSearch: Fragment,
  SearchToggler: Fragment,
  LanguageSelectorWrapper: Fragment,
  LanguageSelector: Fragment,
  WhereToBuyWrapper: Fragment,
  WhereToBuy: ButtonClean,
  // NEW BUTTON
  NewButton: Fragment,
};
```

We will then import this new clean component into the `Layout` token collection, replace our
Layout's `Header` slot with it, and apply our `exampleHeader.ts` token to it, effectively replacing
the Vital Header in our site with a new custom Header of our creation and styling the `NewButton`
slot to our liking.

?> **Note:** As you may have guessed, this custom `Header` component will only exist in this
codebase, and any updates to the slots in the base Vital `Header` component will never be recognized
on your site unless you specifically choose to import it.

Of course, if that Vital `Header` does not have your new `NewButton` slot, you'll lose it.

So, while it may be a viable option in instances where a new slot is needed, and is so specific to
your brand/site that it would never be added to Vital, bear in mind that you'll be essentially
disconnecting that component's structure from Vital forever.

Now, let's take a look at another way:

### Option 2: Creating a New Slot in the Body of a Token Using `withAppendChild`

Let's say that you'd like to avoid duplicating the Vital component, keeping your codebase a little
cleaner and ensuring that any updates to said component will always be pulled into your site, but
would still like to add a `NewButton` element to your Header in the same place.

Bodiless provides a pair of HOCs called `withAppendChild` and `withPrependChild`. With the former,
you can apply — as the next child of the parent container — any component or `stylable` HTML element
that Bodiless provides. Conversely, `withPrependChild` will apply that component or HTML element as
the _first_ child of the parent container.

In our case, we'd like to add this `NewButton` _below_ the Copyright in our Footer, and thus will be
using `withAppendChild`.

In our `exampleCopyrightRow.ts` token collection file, we will spread the `vitalCopyrightRow`'s
default styling, and append our `NewButton` element to the `CopyrightWrapper` (the parent element of
the Copyright element):

```ts
const Default = asCopyrightRowToken({
  ...vitalCopyrightRowBase.Default,
  Components: {
    ...vitalCopyrightRowBase.Default.Components,
    CopyrightWrapper: withAppendChild(
      as(
        'w-[100px] px-20 py-10 border-2',
        vitalColor.BgPrimaryBrand,
      )(Div), 'New Button'
    ),
  },
});
```

This option is perfectly acceptable as well, and, compared to [Option
#1](#option-1-creating-a-new-clean-component-and-adding-a-new-brand-specific-slot), actually adds
considerably less code to the codebase, but it's not without its caveats.

We've appended this button to the `CopyrightWrapper` slot of our `Footer` component, which means
that it will only be visible as long as the `CopyrightWrapper` element is. While it stands to reason
that this section of the `Footer` will likely always remain, it should be noted that if the base
Vital `CopyrightRow` component is ever altered (instantiated as a `Fragment`, moved elsewhere in the
component, or otherwise changed), there's a good chance that more work will need to be done to
ensure that our `NewButton` appears as intended, because we don't really have any idea how that
parent component might change in the future.

Creating a completely new component to add a slot gives you full control over the structure, but
essentially silos that component within your codebase, placing it out-of-step with any future
structural updates that may come from VitalDS.

And adding that slot within the body of a token — while retaining the connection to Vital — places
you at the mercy of those same VitalDS updates, should they alter the component in a way that causes
your new slot/element to display in ways other than those intended.

## Practice

As a test, attempt to replace the `SocialLink` component in the `Footer` with a component of your
own that adds both a Twitter and a Pinterest link.
