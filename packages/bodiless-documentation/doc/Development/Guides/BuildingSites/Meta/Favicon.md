# Favicon

Favicon recommendations:

* **Size:** At least as big as the largest icon being generated (512x512px by default);
* **Shape:** Square (if it’s not, transparent bars will automatically be added to make it square);
* **Format:** Of one of the following formats: JPEG, PNG, WebP, TIFF, GIF or SVG.

The favicon path and image are currently defined in the Starter Kit to use `src/images/favicon.png`,
and it uses [`gatsby-plugin-manifest`](https://www.gatsbyjs.org/packages/gatsby-plugin-manifest/) to
generate a set of favicons for your site to use.  
For more information on options, please read the documentation for
[`gatsby-plugin-manifest`](https://www.gatsbyjs.org/packages/gatsby-plugin-manifest/).

If desired, you can override this by specifying custom options within your site's `gatsby-config.js`
file.

For example:

```js
const plugins = [
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      icon: 'src/images/favicon.png',
      legacy: false,
    },
  },
];
```
