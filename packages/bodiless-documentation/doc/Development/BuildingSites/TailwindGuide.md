# Using Tailwind system with Bodiless

Adding additional styling can be done by editing `tailwind.config.js` following [Tailwind documentation](https://tailwindcss.com/docs/configuration).  The starter kit has a empty Tailwind configuration which means that site will get all Tailwind's default settings in a generated index.css.  Tailwind allows you to replace or extend the settings. If you are using Bodiless components which may be using default tailwind classes, we suggest you [extend](https://tailwindcss.com/docs/theme/#extending-the-default-theme) instead of replace using theme.extend.

```
    extend: {
      colors: {
        brand_blue: '#004c97',
        brand_lightblue: '#017eb3',
        brand_mediumblue: '#009cde',
      },
    },  
```
This will add additional brand colors to the all the default tailwind colors.  While this may produce a large css file, when the static site builds it utilizes [purge css features](https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css) to remove unused css and keep this css file small for best performance.

Each time you make a change in tailwind.config.js you need to make sure your run `npm run build:css` to regenerate a new `src/components/index.css` that is automatically included for the site.  The css build will happen automatically whenever you do command `npm run start` and start your site but if you are in local develop and site is running, you can run this as separate command and site will hotload the index.css file.
