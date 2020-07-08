# Using Tailwind system with Bodiless
(TO DO:  Starting point and will be enhanced in future tickets.)

As discussed in other sections, Bodiless depends on Tailwind which is
utility-first CSS framework. If you are unfamiliar, we highly suggest reading
these guides:

- [Tailwind on Github](https://github.com/tailwindcss/tailwindcss)
- [Tailwind Docs](https://tailwindcss.com/docs/what-is-tailwind)

## Tailwind Configuration File
The sites tailwind configuration file, `tailwind.config.js`, can be found in
root directory of the site.

Adding custom styling can be done by editing `tailwind.config.js` following
[Tailwind documentation](https://tailwindcss.com/docs/configuration). 

The starter kit has a empty Tailwind configuration which means that site will
use all Tailwind's default settings and place into a generated index.css file.

## Extend vs Replace
Tailwind allows you to replace or extend the settings. If you are using Bodiless
components, which may be using default tailwind classes, we suggest you
[extend](https://tailwindcss.com/docs/theme/#extending-the-default-theme)
instead of replace using theme.extend.

```
    extend: {
      colors: {
        brand_blue: '#004c97',
        brand_lightblue: '#017eb3',
        brand_mediumblue: '#009cde',
      },
    },  
```

This will add additional brand colors to all the default tailwind colors. When
the static site builds it utilizes
[purge css features](https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css)
to remove unused css classes and this will keep the css file small for best
performance.

## Building with Tailwind

Each time you make a change in tailwind.config.js you need to make sure your run
`npm run build:css` to regenerate a new `src/components/index.css` that is
automatically included for the site. The css build will happen automatically
whenever you do command `npm run start` and start your site but if you are in
local develop and site is running, you can run this as separate command and site
will hotload the index.css file.
