# Vital Helmet Component

The Helmet Component collects all the data that will be rendered in the Head. We have designated
five individual slots for different types of data.

- `HreflangHelmet`: [Meta Hreflang Tag](https://moz.com/learn/seo/hreflang-tag ':target=_blank').
- `GA4Helmet`: Analytics Data Layer scripts for [GA4](https://developers.google.com/analytics/
  ':target=_blank').
- `SeoHelmet`: For standard metadata such as meta description, robots tag, etc.
- `SocialShareHelmet`: Used for [Open Graph](https://ogp.me/ ':target=_blank') and other social
  media, such as Twitter card.
- `LanguageHelmet`: Custom.
- `HTMLHelmet`: Will apply attributes to the `<html>` element that wraps the page. Includes things
  such as direction, language, classes, etc.
- `BodyHelmet`: Will apply attributes to the `<body>` element that wraps the content.

## Content Editor Details

There is no interaction by the Content Editor with the actual Helmet Component.

## Site Builder Details

At the site or global regional/brand library level, you can use the Helmet Component as is, or
extend the existing component. Often times the Site Builder will want to add a site-specific element
to the header.

### Customizing Via Shadowing (*Preferred Method)

Define a Shadowing token collection as defined in [Shadowing Tokens](../../Guides/ShadowingTokens).

File to shadow: `packages/{my-package}/src/shadow/@bodiless/vital-layout/Helmet.ts`

?> **API Documentation**: Visit the
[Vital Layout Token Collection](../../../Development/API/@bodiless/vital-layout/interfaces/VitalHelmet)
for examples of shadowing.

## Architectural Details

Vital Helmet is a wrapper around a group of slots for specific purposes.

?> **View API documentation for details.**:
[Vital Helmet Components](../../../Development/API/@bodiless/vital-layout/interfaces/HelmetComponents)
