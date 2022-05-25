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
  <!-- TODO: Add description -->
- `BodyHelmet`: ?

## Content Editor Details

There is no interaction by the Content Editor with the actual Helmet Component.

## Site Builder Details

At the site or global regional/brand library level, you can use the Helmet Component as is, or
extend the existing component. Often times the Site Builder will want to add a site-specific element
to the header.

### Customizing

A custom Helmet token that is applied to all pages can be defined at the site/package level, and
then applied to the Layout's specific helmet slot.

Within your site/package level components, the following component extends `vitalHelmet` with all
its defaults, and then adds the additional classes to the `HTMLHelmet`:

```js
const Default = extend(vitalHelmet.Default, asHelmetToken({
  Core: {
    HTMLHelmet: 'text-gray-600',
  },
}));

export const brandXHelmet = { Default };
```

—And applying in your Layout Helmet slot:

```js
const Default = asLayoutToken({
  ...vitalLayout.Default,
  Components: {
    ...vitalLayout.Default.Components,
    Helmet: brandXHelmet.Default,
  },
});
```

Alternatively, you can use custom Helmet tokens within templates, and then that data is only applied
to the head of the pages created from that template.

## Architectural Details

Vital Helmet is a wrapper around a group of slots for specific purposes:
[`HelmetClean.tsx`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-layout/src/components/Helmet/HelmetClean.tsx).
