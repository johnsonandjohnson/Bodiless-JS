# Using Tailwind system with Bodiless

As discussed in other sections, BodilessJS is preconfigured to use
[TailwindCSS](https://tailwindcss.com) which is utility-first CSS framework.
While this is not strictly required, we highly recommend it to get the most out
of the Bodiless Design System. If you are unfamiliar with Tailwind, you can
learn more from:

- [Tailwind on Github](https://github.com/tailwindcss/tailwindcss)
- [Tailwind Docs](https://tailwindcss.com/docs/what-is-tailwind)

Most of the site's styling can be defined with Tailwind and for the most part,
BodilessJS will defer to Tailwind documentation. The following documentation
is either specific to Bodiless applications of Tailwind or important enough to
call out to help direct to the specific Tailwind documentation.

## Tailwind Configuration File
The sites tailwind configuration file, `tailwind.config.js`, can be found in
root directory of the site.

Adding custom styling can be done by editing `tailwind.config.js` following
[Tailwind documentation](https://tailwindcss.com/docs/configuration).

The starter kit has a empty Tailwind configuration which means that site will
use all Tailwind's default settings and place into a generated index.css file.

## Extend vs Replace
Tailwind allows replacing or extending the settings. If site builder is using
Bodiless components, which may be using default tailwind classes, we suggest to
[extend](https://tailwindcss.com/docs/theme/#extending-the-default-theme)
instead of replace.

```
    extend: {
      colors: {
        brand_blue: '#004c97',
        brand_lightblue: '#017eb3',
        brand_mediumblue: '#009cde',
      },
    },  
```

This will add additional brand colors to all the default tailwind colors. 

When the static site builds it utilizes
[tailwind purge css feature](https://tailwindcss.com/docs/controlling-file-size#removing-unused-css)
to remove unused css classes and this will keep the css file small for best
performance.

## Building with Tailwind

Each time site builder makes a change in tailwind.config.js, she will need to
rerun the build process. This is done in either `npm run start` or
`npm run build` and will generate css that is automatically included for the
site.

!> **Important** for tailwind config changes to be updated, you must restart or
build to see the changes.

## Responsiveness with Tailwind

Tailwind classes control most of the responsiveness behavior of the site and
classes can be prefixed with responsive size.

### Breakpoints

For more information, see [responsive
breakpoints](./Responsiveness#Breakpoints).

## Setting maximum container width of a site

If a site has a maximum container width, they can be set with
[max-width
breakpoints](https://tailwindcss.com/docs/breakpoints/#max-width-breakpoints)
and limit the size of the containers at different breakpoints. This is done via
the same method as [responsive breakpoints](./Responsiveness#Breakpoints).

### Using Responsive Classes

Every utility class in Tailwind can be applied conditionally at different
breakpoints. For more information, read about
[Tailwind Mobile first](https://tailwindcss.com/docs/responsive-design#mobile-first)
which contains excellent documentation about responsive classes and how to use
them.

## Using Custom CSS

There are cases that TailwindCSS doesn't support or it may be easier to not
rely on Tailwind. This can be achieved by including the css file and referencing
those classes instead of the tailwind classes.  

The custom css files can be included imported either in gatsby-browser.js file,
within the pages, or within the component that is using them.

?> **Recommendation** is to keep the css file as close to possible to the
component or page it is needed for.

For example:
* css used exclusively for the homepage should be placed in `/src/pages` and
  included it in the `index.tsx`.
* css used for a component should be placed in components folder and included
  with the component.

By doing the above, this custom css will only be loaded for pages that
use the component and help with performance. While BodilessJS runs with
[tailwind purge css feature](https://tailwindcss.com/docs/controlling-file-size#removing-unused-css)
tool this is only processing on tailwind css and not on any custom css included.

?> **Tip** As a site developer it is always good practice to remove css that isn't
being used if updates/changes are being made.

Common usages for using custom css:
* Setting background images 
* Defining ::before and ::after pseudo-elements  
  * or alternative use https://github.com/yutahaga/tailwindcss-pseudo-elements to
    extend tailwind.
* Gradients
  * or alternative use https://github.com/benface/tailwindcss-gradients to extend
    tailwind.

## Tailwind configuration for a package

1. Create tailwind configuration file.

    ```sh
    npx tailwindcss init
    ```

1. Configure [CSS Purging](#configure-css-puring).

    Set purging paths to the compiled templates containing tailwind classes. Assuming your package compilation output directory is `lib`, your purge configuration will be

    ```js
    purge: [
      './lib/**/!(*.d).{ts,js,jsx,tsx}',
    ],
    ```

1. Export a function to merge your package tailwind configs with site configs.

    * for @bodiless packages

       Whitelist the bodiless package in `packages/gatsby-theme-bodiless/src/dist/tailwindcss/getBodilessConfigs.ts`

    * for non-@bodiless packages

      Export a function that merges your package tailwind configuration with site configuration. You may leverage `mergeConfigs` and `getTailwindConfigs` from `@bodiless/gatsby-theme-bodiless`.

      ```js
      import {
        mergeConfigs,
        getTailwindConfigs,
      } from '@bodiless/gatsby-theme-bodiless/dist/tailwindcss';

      const packageMergeConfigs = siteConfig => mergeConfigs(siteConfig, getTailwindConfigs(['yourpackagename']));

      export default packageMergeConfigs;
      ```

## Configure CSS Purging

1. Provide an array of paths to all of your template files using the purge option of `tailwind.config.js`:

    ```js
    purge: [
      './src/**/!(*.d).{ts,js,jsx,tsx}',
    ],
    ```
> :warning: **If you are configuring purgin for a package**: Paths should point to the compiled templates.
