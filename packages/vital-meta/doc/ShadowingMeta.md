# Shadowing Meta

Define a Shadowing token collection as defined in [Shadowing Tokens](../../Guides/ShadowingTokens).

File to shadow: `/packages/{my-package}/src/shadow/@bodiless/vital-meta/MetaHelmet.js`

The method for shadowing the SEO or Share component is dependent on if you want to add fields to the
beginning or end of the form (prepend/append), or if you want to control the order of the fields
(e.g., you want an additional field in the middle of the form).

## Define New Meta Data Fields

`asSimpleToken` is a token that you can use to compose a new field using `withMeta`:

```js
const WithMetaKeywords = asSimpleToken(withMeta({
  // Meta Data name that will render (i.e., <meta name="keywords" ... >).
  name: 'keywords',
  // Label on Form.
  label: 'Keywords'
  // Placeholder value on form to give best practices to Content Editor.
  placeholder: 'No more than 10 keyword phrases',
})('page-keywords')); // page-keywords is the node key that will be used.

const WithTwitterDescription = asSimpleToken(withMeta({
  // Meta Data name that will render (i.e., <meta name="twitter:description" ... >).
  name: 'twitter:description',
  // Label on Form.
  label: 'Twitter Description',
})('twitter-description')); // twitter-description is the node key that will be used.
```

## Shadowing Method to Prepend/Append a New Field to the Form

Use this method for shadowing if you want to add fields to the beginning or end of the form.

- If you place the new field _after_ `vitalMetaHelmetBase.SEO.Compose`, it will place the new field
  at the _beginning_ of the form.
- If you place the new field _before_ `vitalMetaHelmetBase.SEO.Compose`, it will place the new field
  at the _end_ of the form.

```js
const SEO = asElementToken({
  ...vitalMetaHelmetBase.SEO,
  Compose: {
    WithMetaKeywords,
    ...vitalMetaHelmetBase.SEO.Compose,
  },
});

export default {
  ...vitalMetaHelmetBase,
  SEO,
};
```

## Shadowing Method to Control the Order of the Fields

All field tokens are exposed to the Site Builder if you wish to recompose the form and customize
what fields your site will use for sharing.

?> **Tip:** As you compose the token, you will to do it in reverse order of the order of the fields
as they appear on the form.

```js
const Share = asElementToken({
  ...vitalMetaHelmetBase.Share,
  Compose: {
    WithUTMCampaign,
    WithSiteName,
    WithTwitterCard,
    WithShareType,
    WithTwitterDescription, // Added in the middle of the form.
    WithTwitterTitle,
    WithUTMContent,
    WithShareDescription,
    WithShareUrl,
    WithShareImage,
    WithShareTitle,
  },
});
```
