# Metadata

For additional metadata information, please see: [Meta Component](/Components/Meta).

## Set Metadata for a Page

In your site's `.env.site` file, configure the following:

01. Your site's absolute production URL, for use in generating the canonical URL and `sitemap.xml`:

    ```shell
    SITE_URL='https://www.example.com/'
    ```

01. To add `sitemap.xml` to your `robots.txt` file, set the `ROBOTSTXT_SITEMAP` env variable to your
    site's `sitemap.xml`:

    ```shell
    ROBOTSTXT_SITEMAP='https://www.example.com/sitemap/sitemap-index.xml'
    ```

    **Note:** As per the [How to
    Use](https://www.gatsbyjs.com/plugins/gatsby-plugin-sitemap/#how-to-use ':target=_blank')
    section of the `gatsby-plugin-sitemap` documentation, the path listed above is where the
    generated sitemap will be located.
    - While a _sitemap_ file lists URLs of _pages_, a _sitemap index_ file lists URLs of _sitemaps_,
      allowing you to manage multiple sitemap files.

01. Anything you want to exclude from your sitemap can be configured in your site's
    `gatsby-config.js` file:

    ```js
    plugins: [
      {
        resolve: 'gatsby-plugin-sitemap',
        options: {   },
      },
    ]
    ```

    For additional information, see: [`gatsby-plugin-sitemap` |
    Gatsby](https://www.gatsbyjs.com/plugins/gatsby-plugin-sitemap/ ':target=_blank').

01. Anything you want to customize for canonical URLs can be configured in your site's
    `gatsby-config.js` file:

    ```js
    plugins: [
      {
        resolve: 'gatsby-plugin-canonical-urls',
        options: {
          siteUrl: SITEURL,
        },
      },
    ]
    ```

    For additional information, see: [`gatsby-plugin-canonical-urls` |
    Gatsby](https://www.gatsbyjs.com/plugins/gatsby-plugin-canonical-urls/ ':target=_blank').

01. Anything you want to adjust for your `robots.txt` file can be customized in your site's
    `gatsby-config.js` file by updating the `robots.txt` policy:

    ```js
    const robotsTxtPolicy = [
      { userAgent: '*', allow: '/', },
    ];
    process.env.ROBOTSTXT_POLICY = JSON.stringify(robotsTxtPolicy);
    ```

    For additional information, see: [`gatsby-plugin-robots-txt` |
    Gatsby](https://www.gatsbyjs.com/plugins/gatsby-plugin-robots-txt/ ':target=_blank').
