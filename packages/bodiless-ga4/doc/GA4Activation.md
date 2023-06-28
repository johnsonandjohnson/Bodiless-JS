# Activation of GA4

!> **IMPORTANT:** Google Tag Manager and GA4 full-activation only runs on the _static_ site. It is
not intended to fully function on the _edit_ site.

By default, GA4 and Google Tag Manager are not enabled on the Minimal or Vital starter kits. The
following instructions should be followed to enable it. This is one method of activating GA4 on a
site; you can activate directly using alternative methods suggested by [Google's
GA4 documentation](https://support.google.com/analytics/answer/9304153 ':target=_blank').

## Step 1: Confirm Google Tag Manager ID and Connect Tag Manager to GA4

Using the following documentation, create a GA4 Configuration tag:
[Google Analytics 4 tags](https://support.google.com/tagmanager/answer/9442095 ':target=_blank').

Once obtained, proceed to Step 2.

## Step 2: Update the Site Store with Site Specific Information

Visit the `/sites/SITENAME/src/data/site` folder and update the following three files:

- `meta$brand.json`: The brand name.
- `meta$country.json`: The two-letter ISO country code.*
- `meta$region.json`: The region; one of four options: `NA`, `APAC`, `EMEA`, or `LATAM`.†

<!-- Inlining HTML to add multi-line info block with unordered list. -->
<div class="warn">
  <strong>Note:</strong> *For information regarding two-letter ISO country codes, see:

  - [ISO Country Codes](https://www.iso.org/obp/ui/#search/code/ ':target=_blank') | ISO Online
    Browsing Platform
  - [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2 ':target=_blank') |
    Wikipedia

</div>

<!-- Inlining HTML to add multi-line info block with unordered list. -->
<div class="warn">
  <strong>Note:</strong> †The <em>region</em> abbreviations listed above represent the following:

  - `NA`: North America
  - `APAC`: Asia-Pacific
  - `EMEA`: Europe, the Middle East, and Africa
  - `LATAM`: Latin America

</div>

## Step 3: Install and Activate

01. Install
    [`gatsby-plugin-google-tagmanager`](https://www.gatsbyjs.com/plugins/gatsby-plugin-google-tagmanager/
    ':target=_blank') at the site level.

01. Activation for the plugin happens in the site's `gatsby-config.js` file, and relies on the
    `gatsby-plugin-google-tagmanager` being available.

    If you wish to use another plugin and/or set custom options, this is the recommended place to
    set it.

    GTM and data layer functionality is enabled by adding the following to the site's
    `gatsby-config.js` file and replacing the `GTM-XXXXXXX` from Step 1:

    ```js
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-XXXXXXX',
        // The data layer — to be set before GTM is loaded — should
        // be an object or a function that is executed in the browser.
        // Defaults to null.
        //defaultDataLayer: { platform: 'gatsby' },
        // Specify optional GTM environment details.
        //gtmAuth: 'YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING',
        //gtmPreview: 'YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME',
        dataLayerName: 'globalDataLayer',
      },
    },
    ```
