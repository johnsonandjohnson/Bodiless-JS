# `@bodiless/gatsby-theme-bodiless`

> TODO: description

## Usage

```
const gatsbyThemeBodiless = require('@bodiless/gatsby-theme-bodiless');

// TODO: DEMONSTRATE API
```

## Configuration

### Gatsby image

#### Image processing arguments

To override default image processing arguments, use `gatsbyImage.sharpArgs` option. For example, to override default quality

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

See [gatsby-plugin-sharp](https://www.gatsbyjs.com/plugins/gatsby-plugin-sharp/) doc to get a list of options you can override.

#### Configure Gatsby Image for default content

1. Prepare default content data

    Install npm packages containing default content and/or create .json files on site level.

    Example of .json file containing default image data

    ```json
    {
      "src": "./defaultImage.jpg",
      "alt": "My Test Alt",
      "title": "My Test Title",
      "preset": "fluid_withWebp"
    }
    ```

    `src` - contains path to image. The path can be relative or absolute. When relative path is specified, then the image will be resolved relative to the json. When absolute path is specified, then the image will be resolved relative to site's `static` directory.

    `alt`, `title` - image data provided by Bodiless.

    `preset` - image preset for which generate image variations.

1. Configure default content sources

   Option A. (Recommended). Use default content auto-discovery mechanism.
    Add `bodiless.content.json` file on site level. Example of file

    ```json
      [
        "./path/to/default/content/directory1",
        "./path/to/default/content/directory2"
      ]
    ```

    Option B. Use site's gatsby-config.js

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
      }
    }
    ```

1. Add `DefaultContentQuery` to each page that uses default content

    Open your page index file and extend a list of exported queries with `DefaultContentQuery`.

    ```js
      export const query = graphql`
        query($slug: String!) {
          ...YourOtherQuery
          ...DefaultContentQuery
        }
      `;
    ```

1. Use helpers to compose Gatsby Image components

```js
import { useContentFrom } from '@bodiless/core';
import { asBodilessImage } from '@bodiless/components-ui';
import { withDefaultImageContent } from '@bodiless/components';
import {
  GatsbyImagePresets,
  withGatsbyImagePreset,
} from '@bodiless/gatsby-theme-bodiless';

const asEditableImage = withGatsbyImagePreset(GatsbyImagePresets.FluidWithWebp)(asBodilessImage);
const useDefaultImageNode = useContentFrom(['DefaultContent', 'contentful1']);
const Image = withDefaultImageContent(asEditableImage)(useDefaultImageNode)('image')('img');

// jsx
<Image />
```

### Plugins

#### Robots.txt

gatsby-plugin-robots-txt is leveraged to automatically generate robots.txt for a site. The plugin is enabled by default and will generate the following robots.txt file.
```
User-agent: *
Allow: /
```
In order to disable robots.txt plugin, set ROBOTSTXT_ENABLED env variable to '0'
```
ROBOTSTXT_ENABLED='0'
```
In order to add sitemap.xml to the generated robots.txt file, set ROBOTSTXT_SITEMAP env variable to your site sitemap.xml
```
ROBOTSTXT_SITEMAP='https://www.example.com/sitemap.xml'
```
In order to add host to the generated robots.txt file, set ROBOTSTXT_HOST env variable to your site host
```
ROBOTSTXT_HOST='https://www.example.com/'
```
In order to define custom rules in the generated robots.txt, set ROBOTSTXT_POLICY env variable to JSON string containing a list of policies. Format required for policies is described in https://github.com/itgalaxy/generate-robotstxt/tree/65abc04050ee0bb7bc1612163eb5af8c416c6994#usage
```
ROBOTSTXT_POLICY='[{"userAgent":"*","allow":"/","disallow":"/search","crawlDelay":10}]'
```
or in your site gatsby-config.js
```
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

#### CSS compilation

Tailwind CSS compilation is configured and enabled by default. One can disable css compilation by setting BODILESS_TAILWIND_THEME_ENABLED env variable to '0'.

Tailwind CSS compilation is configured using PostCSS approach. gatsby-plugin-postcss is leveraged for this purpose.

#### Exclude imported CSS from static builds

One can exclude css resources from static build by configuring BODILESS_ADMIN_ONLY_CSS_FILES environment variable. By default, all css resources are included to the static build.
