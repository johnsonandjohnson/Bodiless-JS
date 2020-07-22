# Responsiveness

Bodiless is in itself is not that opinionated about the responsiveness but there
are some components and features that do provide responsiveness.

Bodiless primarily uses [TailwindCSS](https://tailwindcss.com) to give the site
its reponsiveness. While not a requirement to use, its included within the
Example Test Site and Starter Site.

### Site Editing

The Bodiless site editing interface was designed to be edited in desktop
scenario based on the assumption that site editors were working on desktop size
screen for productivity. The Bodiless editor and it forms are designed to work
on a screensize of minimum of 1024px. This is not to say you can't use it on
smaller device, but some editor forms may appear off the device screen causing
extra scrolling to use.

## Breakpoints
By default, the breakpoints are set by Tailwind and are defined in by Tailwind's default's

| Small     | Medium    | Large      | Extra Large | 
| --------- | --------- | ---------- | ----------- |
| <= 640px  | 641-768px | 769-1024px | 1280px      |

A site builder can changes by making the modifications in the sites
`tailwind.config.js` by following the directions specified in
[Tailwind Breakpoints](https://tailwindcss.com/docs/breakpoints/).

## Components with Custom a Responsive Behavior

At times there is need to make sure that appropriate behavior to be included within the component.
Bodiless provides a mechanism to allow the site to handle the the responsive behaviors.

Within the starter site, the `src/components/Page/index.tsx` will read in the
Tailwind breakpoints set in the Tailwind.config.js (see previous section).  

These breakpoints are exported as `breakpoints` object that contain's the site's configuration.

Bosiless provides the following tools to work with these breakpoints:
* [`withPageDimensionsContext`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/packages/bodiless-components/src/PageDimensionsProvider.tsx)
  that accepts the site's breakpoints.
* `ifViewportIs` & `ifViewportIsNot` from
  [src code](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/packages/bodiless-components/src/withResponsiveToggle.tsx)
  that allow you to define a different behavior for a screen size.

The following examples is from menu:

```
const ResponsiveMenu = flow(
  ifViewportIs(['lg', 'xl', 'xxl'])(withMenu(() => MainMenu)),
  ifViewportIsNot(['lg', 'xl', 'xxl'])(withMenu(() => BurgerMenu)),
  withPageDimensionsContext({ breakpoints }),
)(ResponsiveMenuClean);
```
This example shows that given the site's breakpoint via
`withPageDimensionsContext`, if the viewport is lg, xl or xxl, it will show the
MainMenu and if it not those viewports, it will show the BurgerMenu.

Some of the components that have specific responsive behavior:
* [FilterByGroup]() the filter will render uncollapsed lists on larger devices and smaller devices will collapse into accordions. 
* [Menu]() will show a traditional horizontal menu on larger devices and mobile burger menu on smaller devices.
