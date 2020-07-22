# Fonts

Custom fonts can be used on a Bodiless site and here are some suggested ways to
add and use them:

## Adding Fonts to a Bodiless Site

* [gatsby-plugin-google-fonts](https://github.com/didierfranc/gatsby-plugin-google-fonts)
  * Tip: make sure GOOGLE_FONTS_ENABLED is not disabled in .env.site file.
* Using [Open Source Typefaces npm packages](https://github.com/KyleAMathews/typefaces) built by others
  * Follow directions for the package to install and use.
* Load them directly with self hosting via this [tutorial](https://dev.to/iangloude/4-steps-to-self-hosted-fonts-in-gatsby-aj2).

## Using Fonts with Tailwind

Once the fonts are available via one of the methods above, they can be applied in one of two ways:

* Site wide:
  * This can be done by adding the definition to apply the font in
    `src/css/style.css`.
  
       ```
       @tailwind base;

       body {
         @apply font-custom_font;
       }

       @tailwind components;

       @tailwind utilities;
       ```

  * For more information recommend reading Tailwind's
    [Base Style Documentation](https://tailwindcss.com/docs/adding-base-styles/)

* The fonts can be added at elemental level by adding classes to the specific
  elements within `src/components/Elements.token.ts`

        ```
        const asHeader1 = addClasses('text-3xl font-custom_font')
        ```
