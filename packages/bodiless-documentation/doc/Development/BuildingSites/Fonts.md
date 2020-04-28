# Fonts

Custom Fonts can be used on Bodiless and are some suggested ways to do add and use Fonts with Tailwind:

## Adding Fonts to a Bodiless Site

* [gatsby-plugin-google-fonts](https://github.com/didierfranc/gatsby-plugin-google-fonts)
  is part of BodilessJS and can be used. Tip: make sure GOOGLE_FONTS_ENABLED is
  not disabled in .env.site file.
* Using [Open Source Typefaces npm packages](https://github.com/KyleAMathews/typefaces) built by others
* Or load them directly via this [tutorial](https://dev.to/iangloude/4-steps-to-self-hosted-fonts-in-gatsby-aj2)

## Using Fonts with Tailwind

The fonts can be applied in one of two ways:

* Site wide:
  * This can be done by adding the definition to apply the font in
    `src/components/index.tailwind.css`.
  
       ```
       body {
         @apply font-custom_font;
       }
       ```

  * For more information recommend reading Tailwind's
    [Base Style Documentation](https://tailwindcss.com/docs/adding-base-styles/)

* The fonts can be added at elemental level by adding classes to the specific
  elements within `src/components/Elements.token.ts`

        ```
        const asHeader1 = addClasses('text-3xl font-custom_font')
        ```
