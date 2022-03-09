@jones if anything was linking we should direct the old page "ComponentStarterKit" we should relink them to cx-packages.

### Favicon

* Favion size recommendation is:
  * at least as big as the largest icon being generated (512x512 by default).
  * square (if it’s not, transparent bars will automatically be added to make it square)
  * of one of the following formats: JPEG, PNG, WebP, TIFF, GIF or SVG.

The favicon path & image is currently defined in the starter kit to use `src/images/favicon.png`
and it uses
[gatsby-plugin-manifest](https://www.gatsbyjs.org/packages/gatsby-plugin-manifest/)
to generate a set of favicons for your site to use. For more information on
options, please read the documentation for
[gatsby-plugin-manifest](https://www.gatsbyjs.org/packages/gatsby-plugin-manifest/).

If desired, this can be overrode by specifying custom options within the site's
`gatsby-config.js`.

e.g.
```
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
