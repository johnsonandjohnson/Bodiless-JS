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
    ROBOTSTXT_SITEMAP='https://www.example.com/sitemap.xml'
    ```
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
          siteUrl: 'https://www.example.com',
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
