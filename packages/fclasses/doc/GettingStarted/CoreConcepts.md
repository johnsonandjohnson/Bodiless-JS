# Core Concepts and Pre-requisites

The FClasses Design API builds on several key patterns and paradigms from the modern front-end
ecosystem.  A good understanding of these is essential before proceeding.

## Design Tokens and Atomic Design

These core paradigms from  modern design system thinking define the architecture of the
FClassers APIs.  In particular, FClasses builds on and extends the notion
of design tokens to provide reusable and composable bits of styling and
functionality which can be applied at all levels of the design system, from atoms
all the way up to pages.

## Utility First CSS

Also known as "Atomic" or "Functional" CSS, this is an approach to styling which favors
composition of small, unambiguous and immutable classes over complex and cascading styles.
You should have a good understanding of the hows and whys of this approach, and the
TailwindCSS utility library which adopts it.

## Functional React

FClasses is built on React, and makes extensive use of a pattern
known as *functional composition* using *higher order components*.  You should have a good
understanding of the basic principles of functional programming and how they apply in Javascript
and React.

> Note that the modern React world seems to be moving away from higher order components
> in favor of [hooks](https://legacy.reactjs.org/docs/hooks-intro.html).  We believe
> this represents an unfortunate shift away from core principles of functional programming
> ([this article explains why](https://www.robinwieruch.de/react-higher-order-components/)).
> Libraries like [ad-hok](https://github.com/helixbass/ad-hok) have arisen to try to
> address this issue, and future versions of FClasses may adopt a similar paradigm.

## Typescript

FClasses is written in Typescript and provides robust typings to help you
build and use your components and tokens.  While you can use FClasses in plain Javascript
the implementation will be much more difficult and error-prone.

## Slots

The FClasses Design API is really just a twist on this classic pattern in React and
many other frontend frameworks. Slots allow you to inject sub-components into a complex
component.  The Design API allows you to *modify* the sub-components of a complex
component by applying tokens.

## Shadowing

FClasses and the Vital Design System make use of a technique known as file shadowing
to simplify the process of overriding or extending core styling or behavior. Although
the details are different, this is theoretically similar to (and inspired by)
[Gatsby Component Shadowing](https://www.gatsbyjs.com/blog/2019-04-29-component-shadowing/),
so an understanding of the principle will help when you come to implementing it
in Vital.






