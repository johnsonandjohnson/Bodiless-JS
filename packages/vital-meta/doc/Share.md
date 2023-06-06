# Social Share Management

## Default Social Share Meta Tags

Vital Meta provides some default meta tags regarding sharing your site's pages with social networks.
These tags comply with the [Open Graph protocol](https://ogp.me/ ':target=_blank'), enabling your
web pages to be represented as graph objects.

If you desire additional Open Graph meta tags, please follow the instructions to [add metadata
fields to the SEO form](/Components/Meta#add-metadata-fields-to-seo-form) in the editor interface,
and add them to the Share form in the same manner.

For every page, you can set the following meta tags:

- [Title](#title)
- [Image](#image)
- [URL](#url)
- [Description](#description)
- [UTM Content](#utm-content)
- [Twitter Title](#twitter-title)
- [OG Type](#og-type)

![Social Share Management form](/assets/SocialShareManagementForm.jpg ':size=50%')

The values provided in the example above would appear in your page's header (`<head>`) element as
follows:

```html
<head>
  <!-- ...Other metadata -->
  <meta property="og:title" content="Example Page" data-react-helmet="true">
  <meta property="og:image" content="https://via.placeholder.com/256" data-react-helmet="true">
  <meta property="og:url" content="https://example.com" data-react-helmet="true">
  <meta property="og:description" content="Lorem ipsum dolor sit amet." data-react-helmet="true">
  <meta name="twitter:title" content="Example Page" data-react-helmet="true">
  <meta property="og:type" content="website" data-react-helmet="true">
  <meta name="utm_content" content="cta-button" data-react-helmet="true">
</head>
```

In addition to the meta tag descriptions below, please see the following resources for more
information:

- [The Open Graph protocol](https://ogp.me/)
- [UTM parameters | Wikipedia](https://en.wikipedia.org/wiki/UTM_parameters)

### Title

The title of your object.

```html
<meta property="og:title" content="Example Page" data-react-helmet="true">
```

### Image

An the absolute URL to an image you want to represent your object.

```html
<meta property="og:image" content="https://via.placeholder.com/256" data-react-helmet="true">
```

### URL

The canonical URL of your object.

```html
<meta property="og:url" content="https://example.com" data-react-helmet="true">
```

### Description

One or two sentences describing your object.

```html
<meta property="og:description" content="Lorem ipsum dolor sit amet." data-react-helmet="true">
```

### UTM Content

This can be used to identify what a user clicked to get to your site, allowing you to differentiate
between multiple links (e.g., CTAs) pointing to the same URL. This parameter is often used for A/B
testing and content-targeted ads.

```html
<meta name="utm_content" content="cta-button" data-react-helmet="true">
```

### Twitter Title

The title of your object for use with [Twitter
Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards
':target=_blank').

```html
<meta name="twitter:title" content="Example Page" data-react-helmet="true">
```

For additional information, please see:

- [About Twitter Cards | Twitter Developer Platform Docs](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards ':target=_blank')
- [Cards markup | Twitter Developer Platform Docs](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup ':target=_blank')

### OG Type

The [type](https://ogp.me/#types ':target=_blank') of your object.

```html
<meta property="og:type" content="website" data-react-helmet="true">
```

## Content Editor Details

To provide Social Share metadata for your site and its pages, you'll need to fill out the _Social
Share Management_ form.

01. While in [Edit Mode](/ContentEditorUserGuide/#edit-mode), (from the
    [Toolbar](/ContentEditorUserGuide/#toolbar)) click **Page > Share** to open the _Social Share
    Management_ form.
01. Provide values for the meta tag fields in the form, and click the checkmark to confirm.
    - For details about each meta tag, see the [Default Social Share Meta
      Tags](#default-social-share-meta-tags) section above.

## Site Builder Details

### Add Metadata Fields to Editor Interface

As Vital Meta is based on [Bodiless Meta](/Components/Meta), the techniques used for adding more
fields to the Bodiless SEO form can also be applied here.

**See:** [Bodiless Meta Component : Add Metadata Fields to SEO Form](/Components/Meta#add-metadata-fields-to-seo-form)

This customization ought to be performed [via shadowing](#via-shadowing-preferred-method), as
described below.

### Customizing Meta Component

#### Via Shadowing (*Preferred Method)

Define a Shadowing token collection as defined in [Shadowing Tokens](../../Guides/ShadowingTokens).

File to shadow: `packages/{my-package}/src/shadow/@bodiless/vital-meta/MetaHelmet.ts`

For more details, visit [Shadowing Meta](./ShadowingMeta).
