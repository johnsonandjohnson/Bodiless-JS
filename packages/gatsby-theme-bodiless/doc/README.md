# Bodiless Gatsby Theme

The
[`@bodiless/gatsby-theme-bodiless`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/gatsby-theme-bodiless
':target=_blank') package provides a Gatsby theme for BodilessJS.

> TODO: Fill out description/overview.

## Usage

```js
const gatsbyThemeBodiless = require('@bodiless/gatsby-theme-bodiless');

// TODO: DEMONSTRATE API
```

## Configuration

### Gatsby Image

#### Image Processing Arguments

To override default image processing arguments, use the `gatsbyImage.sharpArgs` option. For example,
to override default quality:

```js
{
  resolve: '@bodiless/gatsby-theme-bodiless',
  options: {
    gatsbyImage: {
      sharpArgs: {
        quality: 70,
      },
    },
  },
},
```

See [`gatsby-plugin-sharp`](https://www.gatsbyjs.com/plugins/gatsby-plugin-sharp/ ':target=_blank')
documentation to get a list of options you can override.

#### Configure Gatsby Image for Default Content

01. Prepare default content data.

    Install npm packages containing default content and/or create `.json` files at site level.

    Example of `.json` file containing default image data:

    ```json
    {
      "src": "./defaultImage.jpg",
      "alt": "My Test Alt",
      "title": "My Test Title",
      "preset": "fluid_withWebp"
    }
    ```

    - `src` - Contains path to image.
      - The path can be relative or absolute.
        - When a _relative_ path is specified, then the image will be resolved relative to the
          JSON file.
        - When an _absolute_ path is specified, then the image will be resolved relative to the
          site's `static` directory.
    - `alt`, `title` - Image data provided by BodilessJS.
    - `preset` - Image preset from which to generate image variations.

01. Configure default content sources.

    **Option A.** _(Recommended)_ Use the default content auto-discovery mechanism.
    - Add `bodiless.content.json` file on site level.  
      Example of file:

      ```json
        [
          "./path/to/default/content/directory1",
          "./path/to/default/content/directory2"
        ]
      ```

    **Option B.** Use your site's `gatsby-config.js` file.

    ```js
    // site gatsby-config.js

    const {
      createDefaultContentPlugins,
    } = require('@bodiless/gatsby-theme-bodiless/dist/DefaultContent');

    module.exports = {
      plugins: {
        // your other plugins
        ...createDefaultContentPlugins(
          './path/to/default/content/directory1',
          './path/to/default/content/directory2'
        )
      },
    };
    ```

01. Add `DefaultContentQuery` to each page that uses default content.

    Open your page index file and extend a list of exported queries with `DefaultContentQuery`.

    ```js
    export const query = graphql`
      query($slug: String!) {
        ...YourOtherQuery
        ...DefaultContentQuery
      }
    `;
    ```

01. Use helpers to compose Gatsby Image components.

    ```jsx
    import { useContentFrom } from '@bodiless/core';
    import { asBodilessImage } from '@bodiless/components-ui';
    import { withDefaultImageContent } from '@bodiless/components';
    import {
      GatsbyImagePresets,
      withGatsbyImagePreset,
    } from '@bodiless/gatsby-theme-bodiless';

    const asEditableImage = (
      withGatsbyImagePreset(GatsbyImagePresets.FluidWithWebp)(asBodilessImage)
    );
    const useDefaultImageNode = useContentFrom(['DefaultContent', 'contentful1']);
    const Image = (
      withDefaultImageContent(asEditableImage)(useDefaultImageNode)('image')('img')
    );

    // JSX
    <Image />
    ```

#### Omit Gatsby Plugin Image for Static Image

When using Gatsby Image with `withoutHydration` from `@bodiless/hydration`, and providing a static
version, `gatsby-plugin-image` is no longer required on the front-end. The code can be removed from
the final bundle by setting the environment variable `BODILESS_GATSBY_PLUGIN_IMAGE_OMIT` to `1`.

### Plugins

#### Robots.txt

`gatsby-plugin-robots-txt` is leveraged to automatically generate a `robots.txt` for a site. The
plugin is enabled by default and will generate the following `robots.txt` file:

```
User-agent: *
Allow: /
```

In order to disable the `robots.txt` plugin, set the `ROBOTSTXT_ENABLED` environment variable to
`'0'`:

```
ROBOTSTXT_ENABLED='0'
```

In order to add your `sitemap.xml` file to the generated `robots.txt` file, set the
`ROBOTSTXT_SITEMAP` environment variable to your site `sitemap.xml`:

```
ROBOTSTXT_SITEMAP='https://www.example.com/sitemap.xml'
```

In order to add your host to the generated `robots.txt` file, set the `ROBOTSTXT_HOST` environment
variable to your site host:

```
ROBOTSTXT_HOST='https://www.example.com/'
```

In order to define custom rules in the generated `robots.txt` file, set the `ROBOTSTXT_POLICY`
environment variable to a JSON string containing a list of policies. The format required for
policies is described under "Usage"
[here](https://github.com/itgalaxy/generate-robotstxt/tree/65abc04050ee0bb7bc1612163eb5af8c416c6994#usage
':target=_blank').

```
ROBOTSTXT_POLICY='[{"userAgent":"*","allow":"/","disallow":"/search","crawlDelay":10}]'
```

Or, in your site's `gatsby-config.js` file:

```js
const policies = [
  {
    userAgent: '*',
    allow: '/',
    disallow: '/search',
    crawlDelay: 10,
  },
];
process.env.ROBOTSTXT_POLICY = JSON.stringify(policies);
```

#### CSS Compilation

Tailwind CSS compilation is configured and enabled by default. One can disable CSS compilation by
setting the `BODILESS_TAILWIND_THEME_ENABLED` environment variable to `'0'`.

Tailwind CSS compilation is configured using the PostCSS approach; `gatsby-plugin-postcss` is
leveraged for this purpose.

#### Exclude Imported CSS from Static Builds

You can exclude CSS resources from your static build by configuring the
`BODILESS_ADMIN_ONLY_CSS_FILES` environment variable. By default, all CSS resources are included in
the static build.
