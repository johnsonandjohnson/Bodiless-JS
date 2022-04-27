# Activation of GA4

?> **IMPORTANT** Google tag manager & GA4 full activation is only running on static site.   It is not intended to fully function on the edit site.

By default GA4 & Google Tag manager are not enabled on the Minimal or Vital starter kit.  The following instructions should be followed to enable it.
This is one method of activating GA4 on the site, you can activate directly using alternative methods suggested by [Google GA4](https://support.google.com/analytics/answer/9304153)
### Step 1: Confirm Google Tag Manager ID and connect to Tag manager to GA4

The following method activates [Google GA4 via Google Tag Manager](https://support.google.com/tagmanager/answer/9442095)
Once obtained 
### Step 2: Update the Site Store with Site Specific Information

* Visit the /sites/SITENAME/src/data/site folder and update the following three files:
  * meta$brand.json : enter the brand name
  * meta$country.json : 2 digit ISO country code
  * meta$region.json : one of 4 options NA, APAC, EMEA, LATAM

### Step 3: Install and activate

1. Install [gatsby-plugin-google-tagmanager](https://www.gatsbyjs.com/plugins/gatsby-plugin-google-tagmanager/) at site level

2. Activation for the plugin happens in site's gatsby-config-js and relies on the gatsby-plugin-google-tagmanager being available.

If you wish to use another plugin and/or set custom options, this is recommended place to set it.

GTM & Datalayer functionality is enabled by adding the following to the site's gatsby-config.js file & replacing the GTM-XXXXXXX from Step 1:

    ```
    {
    resolve: 'gatsby-plugin-google-tagmanager',
    options: {
        id: process.env.GOOGLE_TAGMANAGER_ID || 'GTM-XXXXXXX',
        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        // Defaults to null
        // defaultDataLayer: { platform: 'gatsby' },
        // Specify optional GTM environment details.
        // gtmAuth: 'YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING',
        //gtmPreview: 'YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME',
        dataLayerName: 'globalDataLayer',
      },
    },
    ```
