# Janrain/Akamai Authentication for Gatsby Sites

## Introduction

This package provide an authentication middleware for gatsby development environment.
The middleware uses Janrain/Akamai to authenticate users and uses session-file-store to manage sessions.

## Installation

1.  ** Configure appropriate environment variables.**

    The following Environment variables must be configured:

    1. Janrain_CLIENT_SECRET. The values should be retrieved from Janrain/AKAMI dashboard.
    2. File Store Session options environment variables: 
        1. SESSION_STORAGE_PATH [defaults to './janrain_sessions'], 
        2. SESSION_STORAGE_TTL [defaults to '3600' seconds]
        3. SESSION_SECRET Defaults to a random string "SUPERSECRETSTRING". It is **strongly encouraged** to use a **secure** 
           SESSION_SECRET and the application will log an error if the default value is used.
        You may also define the options as plugin configuration in your site gatsby-config.js such as:
        ```
        {
          resolve: `@bodiless/gatsby-plugin-akamai-auth`,
          options: {
            ....
            FileStoreSessionOptions: {
              path: process.env.SESSION_STORAGE_PATH || './janrain_sessions',
              ttl: process.env.SESSION_STORAGE_TTL || '3600',
              secret: process.env.SESSION_SECRET || 'SUPERSECRETSTRING',
              ....
            },
          }
        }
        ```
        For more information and other options please refer to [session-file-store documentaion](https://github.com/valery-barysok/session-file-store#options)
    4. Ensure the environment variables are loaded in gatsby as [described here](https://www.gatsbyjs.org/docs/environment-variables/):

       ```js
       require('dotenv').config({
         path: `.env.${process.env.NODE_ENV}`,
       });
       ```

    ```shell
      TODO

    ```
2. ** Configure Janrain/Akamai App settings in the plugin options in gatsby-config.js**

      1. The settings are retrieved from Akamai/Janrain account. See the following links:
        - https://learn.akamai.com/en-us/webhelp/identity-cloud/technical-library/GUID-09C8F1EC-B9EC-4293-A773-8EA6C4584753.html
        - https://identitydocs.akamai.com/home/registration-javascript-apis-settings
        - https://identitydocs.akamai.com/home/the-reference-implementation  
      2. Add the settings to your site gatsby-config.js as plugin options.
      
            For example:
    ``` 
          {
          resolve: `@bodiless/gatsby-plugin-akamai-auth`,
          options: {
            JanrainAppSettings: {
              settings: {
                packages: ["login", "capture"],
                tokenUrl: "[https://your-company.janraincapture.com]",
                tokenAction: "event",
                showAttribution: false,
                language: "en-US",
                borderColor: "#ffffff",
                fontFamily: "Helvetica, Lucida Grande, Verdana, sans-serif",
                width: 300,
                actionText: " ",
                capture: {
                  appId: "[APP ID RETRIEVED FROM JANRAIN]",
                  appDomain: "[your-company.dev]",
                  captureServer: "[https://app.domain.janraincapture.com]",
                  appUrl: "https://domain.rpxnow.com",
                  clientId: "[CLIENT ID RETRIEVED FROM JANRAIN]",
                  flowName: "flow_name",
                  flowVersion: "HEAD",
                  registerFlow: "socialRegistration",
                  setProfileCookie: true,
                  keepProfileCookieAfterLogout: false,
                  modalCloseHtml: "X",
                  noModalBorderInlineCss: true,
                  responseType: "code",
                  returnExperienceUserData: ["displayName"],
                  stylesheets: ["janrain/styles/janrain.css" , "other/style/sheet.css"],
                  mobileStylesheets: ["janrain/styles/janrain-mobile.css", "other/style/sheet.css" ],
                },
              },
              httpLoadUrl: "http://widget-cdn.rpxnow.com/load/login.your-company.com",
              httpsLoadUrl: "https://rpxnow.com/load/login.your-company.com",
            },
          },
        },
    ```


3.  **Enable Authentication.**

    1. Set the `AUTHENTICATION_ENABLED` environment variable to '1' to enable or '0' to disable. By default
       Authentication is enabled.

## 🧐 What's inside?

Here are the top-level files and directories you'll see in a site created using the blog theme starter:

```
gatsby-plugin-akamai-auth
├── src
│ └── config
│ ├── Janrain
│ │ └── scripts
│ │   └── Janrain-init.js
│ │   └── Janrain-util.js
│ │ └── styles
│ │   └── Janrain-styles.css
│ │   └── Janrain-mobile.css
│ │ └── index.html
│ └── auth.tsx
│ └── index.tsx
├── .gitignore
├── .prettierrc
├── gatsby-config.js
├── LICENSE
├── package-lock.json
├── package.json
└── README.md
```

1.  **`/src`**: contain Janrain scripts and authentication code.
2.  **`/src/auth.tsx`**: contain the middleware authentication logic.
3.  **`/src/janrain`**: Contain Janrain static widget and scripts.

4.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

5.  **`.prettierrc`**: This file tells [Prettier](https://prettier.io/) which configuration it should use to lint files.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby middleware. This is where we define the authentication middleware.
7.  **`LICENSE`**: Gatsby is licensed under the MIT license.

8.  **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

9.  **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

10. **`README.md`**: A text file containing useful reference information about your project.

## Roadmap & Todos:
1. Allow users to configure path to janrain/akamai files such as janrain-init.js and janrain.css.
2.  **`/src/auth.tsx`**: contain the middleware authentication logic.
3.  **`/src/janrain`**: Contain Janrain static widget and scripts.
