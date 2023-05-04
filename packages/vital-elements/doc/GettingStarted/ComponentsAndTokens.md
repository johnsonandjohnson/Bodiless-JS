# Components and Tokens

The basic building blocks of VitalDS are *Components* and *Tokens*.

## Components

Unlike many UI libraries, Vital-DS provides components which are almost always bare
templates.  They do little or nothing in themselves until one or more _tokens_
(see below) are applied to them. Compound components expose an API which allows
tokens to be applied to their constituent elements, or "slots".

Technically, Vital-DS components are plain React functional components wrapped in
the FClasses `designable` and `stylable` API's which allow them to be acted on
by tokens.

## Tokens

Vital *tokens* are the meat of VitalDS, where all styling and behavior are
encapsulated and distributed. They are assembled into libraries, and then
extended or recomposed by downstream libraries or sites. In almost every case,
you would not export a styled or otherwise enhanced component from your package;
instead, you would export a composed token which gives it the look or behavior
you want.

Technically, Vital tokens are expressed as React Higher Order Components (HOCs), or as
objects which compose several HOCs into a structure which can be more easily
recomposed or extended.

> Vital Tokens are an extension of the traditional notion of *Design Tokens*, which
> usually represent low-level bits of styling like colors, fonts or spacings which
> can be applied across multiple components.  Like traditional design tokens, vital
> tokens can be applied across multiple components, but they can represent bits
> of styling at any level.  A layout, a color scheme or a data binding can all be
> represented as Vital Tokens.

Okay, enough talk.  Let's dive into some code to see how these blocks fit together.

[Next: Composition from Without](./CompositionFromWithout.md)
