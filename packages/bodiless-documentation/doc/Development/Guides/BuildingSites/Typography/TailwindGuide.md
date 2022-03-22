# Using Tailwind System with Bodiless

As discussed in other sections, BodilessJS is pre-configured to use
[TailwindCSS](https://tailwindcss.com), which is utility-first CSS framework. While this is not
strictly required, we highly recommend it to get the most out of the Bodiless Design System. If you
are unfamiliar with Tailwind, you can learn more from:

- [Tailwind on GitHub](https://github.com/tailwindcss/tailwindcss)
- [Utility-First Fundamentals | Tailwind Docs](https://tailwindcss.com/docs/utility-first)

Most of your site's styling can be defined with Tailwind, and, for the most part, BodilessJS will
defer to Tailwind documentation. The following documentation is either specific to Bodiless
applications of Tailwind, or important enough to call out to help direct to the specific Tailwind
documentation or suggested best practices.

## Tailwind Configuration File

For configuration, Tailwind uses a `tailwind.config.js` file, but, in Bodiless, we use a
`site.tailwind.config.js` file at the package and site level.

Your site's Tailwind configuration file, `site.tailwind.config.js`, can be found in the root
directory of the site or within a package.

Adding custom styling can be done by editing `site.tailwind.config.js`, following [Tailwind's
documentation](https://tailwindcss.com/docs/configuration).

If your site doesn't have a Tailwind configuration file in its root directory, then your site will
use all of Tailwind's default settings as well as packages that include Tailwind.

Bodiless sites have a mechanism to discover all packages' and sites' Tailwind config files
(`site.tailwind.config.js`), and combine them into a single Tailwind file during the build process.
To utilize this, you must follow the naming convention described in the [next
section](#tailwind-configuration-for-a-package).

Tailwind provides a feature that purges CSS classes that are not found in the code base, thus
reducing the final CSS bundle size.

!> **IMPORTANT:** If class names are duplicated in the site and the package, **the site's CSS will
always have precedence**.

### Tailwind Configuration for a Package

01. Add a `site.tailwind.config.js` file to the root of the package.
    ```js
    const plugin = require('tailwindcss/plugin');

    module.exports = {
      purge: [
        './lib/**/!(*.d).{ts,js,jsx,tsx}',
      ],
      theme: {},
      plugins: [],
    };
    ```
01. Within `files` of the `package.json`, add `/site.tailwind.config.js` to make sure it's exported
    with the package.

## Determine Whether to Use Extend vs Replace

Tailwind allows replacing or extending the settings; for the majority of cases, you want to
[extend](https://tailwindcss.com/docs/theme/#extending-the-default-theme). In cases like adding a
new margin or padding custom definition, you want to add this definition to an existing set, and
extend will do this. If there are cases where you would want to restrict and totally redefine the
settings, you would not use extend. The one suggested case would be colors to restrict the color
set, so generic Tailwind colors are not available and accidentally used.

```js
theme: {
  colors: {
    brand_blue: '#004c97',
    brand_lightblue: '#017eb3',
    brand_mediumblue: '#009cde',
  },
  extend: {
    padding: {
      'custom_xs': '.75rem',
    }
  }
}
```

## Spacing

Use the [Space Between](https://tailwindcss.com/docs/space) Tailwind feature — rather than
independent 'padding' and 'margin' — when defining spacing options, so that you have consistent
units and measures. This is a great feature of Tailwind for layout, and allows you to add consistent
[spacing](https://tailwindcss.com/docs/customizing-spacing) between all children of an element,
rather than setting padding or margin on each child.

Third-party resource: [TailwindCSS, Give Me Some
Space](https://devdojo.com/tnylea/tailwindcss-space-classes) | Tony Lea, DevDojo

## Pseudo-Elements

Pseudo-elements are somewhat of a challenge within Tailwind and Bodiless, so please read
[Pseudo-Elements](./Pseudo-Elements) for some recommended patterns for creating pseudo-elements.

## Using Tailwind Classes vs Custom Defined Classes

We highly encourage using default Tailwind classes rather than defining custom classes; this way, a
developer who knows Tailwind won't have to guess what your class means.

If you do need to add custom classes:

- Use extend so that the default classes are preserved.
- Give them unambiguous names.

## Use REM

We highly recommend using REM units, and setting a base font size on the `html` tag, so that it's
easy to translate `rem` to `px`.

## Making Changes with Tailwind

Each time a site builder makes a change in `tailwind.config.js`, they will need to rerun the build
process. This can be done with either `npm run start` or `npm run build`, and it will generate CSS
that is automatically included for the site and its packages.

!> **IMPORTANT:** For Tailwind config changes to be visible, you must restart or rebuild to see the
changes.

## Responsiveness with Tailwind

Tailwind classes control most of the responsive behavior of your site, and classes can be prefixed
with responsive size.

### Breakpoints

For more information, see [responsive
breakpoints](/CX_DesignSystem/Components/CX_Layout/Responsiveness#Breakpoints).

### Using Responsive Classes

Every utility class in Tailwind can be applied conditionally at different breakpoints. For more
information, read about [Tailwind's mobile first responsive
design](https://tailwindcss.com/docs/responsive-design#mobile-first), which contains excellent
documentation about responsive classes and how to use them.

## Using Custom CSS

There are cases that TailwindCSS doesn't support, or it may be easier to not rely on Tailwind. This
can be achieved by including the CSS file and referencing those classes instead of the Tailwind
classes.

The custom CSS files can be imported either in the `gatsby-ssr.js` file, within the pages, or within
the component that is using them.

?> **Recommendation:** Keep the CSS file as close as possible to the component or page it is needed
for.

For example:

- CSS used exclusively for the homepage should be placed in `/src/pages` and included in
  `index.tsx`.
- CSS used for a component should be placed in the `components` folder and included with the
  component.

By doing the above, this custom CSS will only be loaded for pages that use the component and help
with performance.

?> **Tip:** As a site developer, it is always good practice to remove CSS that isn't being used if
updates/changes are being made.

Common cases for using custom CSS:

- Complex CSS that generates a specific styling
- Classes that are not available in Tailwind.
