# CanvasX Helmet Component

The Helmet Component collects all the data that will be rendered in the Head.  We have designated 5 individual slots for different types of data.

  - HreflangHelmet:  [Meta Hreflang Tag](https://moz.com/learn/seo/hreflang-tag)
  - GtmHelmet: Analytics scripts for [Google Tag Manager](https://tagmanager.google.com/)
  - SeoHelmet : For standard meta data such as meta description, robots tag, etc.
  - SocialShareHelmet: Used for [Open Graph](https://ogp.me/) & other social media such as Twitter card
  - LanguageHelmet: Custom 
  - HTMLHelmet: Will apply attributes to the < html > element that wrps the page.  Includes things such as direction, language, classes.
  - BodyHelmet: ?

### Content Editor Details

There is no interaction by the content editor with the actual Helmet Component.

### Site Builder Details

At site or global regional/brand library, you can use the Helmet Component as is or extend the existing the component.  Often times the site builder will want to add site specific element to the header.

#### Customing

A custom token helmet that is applied to all pages can be defined at site/package level and the applied to the Layout's specific helmet slot.

Within your site/level package components, the following components extends cxHelmet with all its default and then adds the additional classes to the HTMLHelmet.

```js
const Default = extend(cxHelmet.Default, asHelmetToken({
  Core: {
    HTMLHelmet: 'text-gray-600', 
  },
}));

export const brandXHelmet = { Default };
```

and applying in your Layout Helmet slot.

```js

const Default = asLayoutToken({
  ...cxLayout.Default,
  Components: {
    ...cxLayout.Default.Components,
    Helmet: brandXHelmet.Default,
  },
)}
```

Alternative you can use custom token helmets within templates and then that data is only applied ot the head of the pages created from that template.

### Architectural Details

CX Helmet is wrapper around group of slots for specific purposes: [Helmet.tsx](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/cx-layout/src/components/Helment/HelmetClean.ts)
