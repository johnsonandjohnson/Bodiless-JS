# Responsiveness

BodilessJS in itself is not very opinionated about the responsiveness but there
are some components and features that do provide specific responsive behaviors.

BodilessJS primarily uses [TailwindCSS](https://tailwindcss.com) to give the
site its reponsiveness. While not a requirement to use, it's included within the
Example
[Test Site](https://github.com/johnsonandjohnson/Bodiless-JS/tree/master/examples/test-site)
and
[Starter Site](https://github.com/johnsonandjohnson/Bodiless-JS/tree/master/examples/starter).

### Site Editing

The BodilessJS site editing interface was designed for desktop
scenario based on the assumption that site editors were working on desktop size
screen for productivity.

!> **Important** The BodilessJS editor and its forms are designed to work
on a screensize of a minimum of 1024px. This is not to say it can't be used on a
smaller device, but some editor forms may appear off the device screen causing
extra scrolling.

## Breakpoints
By default, the breakpoints are set by Tailwind and are defined by TailwindCSS
default's:

| Small     | Medium    | Large      | Extra Large | 
| --------- | --------- | ---------- | ----------- |
| <= 640px  | 641-768px | 769-1024px | 1280px      |

A site builder can change the breakpoints by modifying the site's
`tailwind.config.js` by following the directions specified in
[Tailwind Breakpoints](https://tailwindcss.com/docs/breakpoints/).

?> **Tip** If a site developer does modify and/or add extra breakpoints, please
review the next section to determine if there needs to be update to any
component's behavior.

## Components with Custom Responsive Behavior

At times, you may need to define a specific responsive behavior that can't be
defined by tailwind classes by itself and should be included within the
component. BodilessJS provides a mechanism to allow the site to handle the
custom responsive behaviors.

Within the Starter site, the
[`src/components/Page/index.tsx`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/master/examples/starter/src/components/Page/index.tsx)
will read in the Tailwind breakpoints via
[resolveConfig()](https://tailwindcss.com/docs/configuration/#referencing-in-javascript)
set in the Tailwind.config.js (see previous section). These breakpoints are
exported as `breakpoints` object that contains the site's configuration.

BodilessJS provides the following tools to work with these breakpoints:
* [`withPageDimensionsContext`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/packages/bodiless-components/src/PageDimensionsProvider.tsx)
  that accepts the site's breakpoints from resolveConfig() and will listen on
  the window's resize event.
* `ifViewportIs` & `ifViewportIsNot`functions from
  [src code](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/packages/bodiless-components/src/withResponsiveToggle.tsx)
  can be called to define a different behavior for a screen size.

The following example is from
[menu](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/starter/src/components/Menu/index.tsx):

```
const ResponsiveMenu = flow(
  ifViewportIs(['lg', 'xl', 'xxl'])(withMenu(() => MainMenu)),
  ifViewportIsNot(['lg', 'xl', 'xxl'])(withMenu(() => BurgerMenu)),
  withPageDimensionsContext({ breakpoints }),
)(ResponsiveMenuClean);
```

This example shows that given the site's breakpoint via
`withPageDimensionsContext()`, if the viewport is 'lg', 'xl' or 'xxl', it will
show the MainMenu and if it not those viewports, it will show the BurgerMenu.

Some of the components that have specific responsive behavior:
* [FilterByGroup](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/packages/bodiless-organisms/src/components/FilterByGroup/Filter.tsx)
  the filter will render uncollapsed lists on larger devices and smaller devices
  will collapse into accordions.
* [Menu](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/starter/src/components/Menu/index.tsx)
  will show a traditional horizontal menu on larger devices and mobile burger
  menu on smaller devices.
