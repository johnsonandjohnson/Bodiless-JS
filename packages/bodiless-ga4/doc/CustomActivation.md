# Custom Activation and/or custom options

Activation for the plugin happens in site's gatsby-config-js and relies on the gatsby-plugin-google-tagmanager being available.

If you wish to use another plugin and/or set custom options, this is recommended place to set it.

GTM & Datalayer functionality is enabled by default using the following snippet in the site's gatsby-config-js:

    ```
    /**
    * Google Tag Manager plugin.
    */
    plugins.push({
    resolve: 'gatsby-plugin-google-tagmanager',
    options: {
        id: process.env.GOOGLE_TAGMANAGER_ID || 'GTM-XXXXXXX',
        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        // Defaults to null
        defaultDataLayer: { platform: 'gatsby' },
        // Specify optional GTM environment details.
        gtmAuth: 'YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING',
        gtmPreview: 'YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME',
        dataLayerName: 'globalDataLayer',
    },
    });
    ```
