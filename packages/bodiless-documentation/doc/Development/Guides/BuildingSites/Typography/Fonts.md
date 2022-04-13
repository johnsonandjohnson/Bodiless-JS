# Fonts

Custom fonts can be used on a Bodiless site, and here are some suggested ways to add and use them.

?> **Tip:** Performance-wise, the best recommendation is to self-host the fonts.

## Adding Fonts to a Bodiless Site

### Via Google Fonts

We recommend using
[`gatsby-plugin-google-fonts`](https://github.com/didierfranc/gatsby-plugin-google-fonts); it is
part of Bodiless, but isn't enabled by default.

01. To use in production builds, set `GOOGLE_FONTS_ENABLED` to `1` in your `.env.site` file.
01. Within a package's or site's `gatsby-ssr.js` file, include the appropriate googleapis CSS file.
    ```jsx
    export const onRenderBody = (
      { setPostBodyComponents },
    ) => {
      setPostBodyComponents([
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />,
      ]);
    };
    ```

?> **Tip:** We recommend using the display value of 'swap' ([Google
Resource](https://developers.google.com/web/updates/2016/02/font-display#swap)) with Google Fonts
for an added performance boost.  
Add `&display=swap` to the end of the query string of your `href` URL.

### Via Hosted

We recommend loading in the `gatsby-ssr.js` file to skip hydration and add in the post body; this
will help with performance.

01. Within a package's or site's `gatsby-ssr.js` file, include the appropriate vendor's CSS file.
    ```jsx
    export const onRenderBody = (
      { setPostBodyComponents },
    ) => {
      setPostBodyComponents([
        <style
          dangerouslySetInnerHTML={{
            __html: `@import url('https://use.typekit.net/xkg0dss.css');`,
          }}
        />,
      ]);
    };
    ```

?> **Tip:** If the service offers the display option of 'swap', please enable for a performance
boost. This may be within the service and/or an optional parameter, if available.

### Via Typefaces

- Using [Open Source Typefaces npm packages](https://github.com/KyleAMathews/typefaces) built by
  others:
  - Follow the directions for the package to install and use.

### Hosted Directly

This is the recommended way, as font files are usually small and they'll be included in the website
bundle, which is possibly the most performant option.

01. In your brand package (suggested: `BRAND-elements` package), create a folder `assets/font`, and
    place the fonts.
01. In your package's `package.json` file, make sure your `files` section exports the assets so they
    are bundled with the package (e.g., `"files": ["/assets"]`).
01. In your package's `tailwind.config.js` file, add the plugin `font-face` via `addBase` to
    import the fonts.
01. Extend `fontFamily` in the Tailwind `theme` section to include the font.
01. Use the new font by using the prefix and name of the font you defined (e.g., `font-linkicons`).

```js
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './lib/**/!(*.d).{ts,js,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        linkicons: ['linkicons'],
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        '@font-face': {
          fontFamily: 'linkicons',
          fontWeight: 400,
          fontStyle: 'normal',
          src: 'url(\'@bodiless/vital-link/assets/font/linkicons.woff2\')',
        },
      });
    }),
  ],
};
```

?> **Tip:** We suggest to primarily use WOFF2:  
Of the modern fonts, WOFF2 is the newest, has the widest browser support, and offers the best
compression. Because it uses Brotli, WOFF2 compresses 30% better than WOFF.

## Applying a Font

Once the fonts are available via one of the methods above, they can be applied in one of two ways:

### Applying a Font to the Entire Site

View [Typography/Applying Classes to entire site](./Typography.md#applying-classes-to-entire-site)
for instructions.

### Applying a Font to a Specific Token

- Fonts can be added at an element level by adding classes to the specific token.
  ```js
  const asHeader1 = asElementToken('text-3xl font-linkicons');
  ```
