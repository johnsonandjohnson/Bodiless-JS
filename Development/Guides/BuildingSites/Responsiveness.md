# Responsiveness

BodilessJS in itself is not very opinionated about the responsiveness, but there are some components
and features that do provide specific responsive behaviors.

BodilessJS primarily uses [TailwindCSS](https://tailwindcss.com ':target=_blank') to give the site
its responsiveness. While not a requirement to use, it's included within the example [Test
Site](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/sites/test-site ':target=_blank')
and [Vital Site](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/sites/__vital__
':target=_blank').

## Site Editing

The BodilessJS site [Edit Interface](/ContentEditorUserGuide/#the-edit-interface) was designed for a
desktop scenario, based on the assumption that Site Editors were working on desktop-size screens for
productivity.

!> **IMPORTANT:** The BodilessJS [Edit Interface](/ContentEditorUserGuide/#the-edit-interface) and
its forms are designed to work on a screen size of a minimum of 1024px. This is not to say it can't
be used on a smaller device, but some editor forms may appear off the device screen, causing extra
scrolling.

## Breakpoints

By default, the breakpoints are set by Tailwind, and are defined by TailwindCSS defaults:

| Small     | Medium    | Large      | Extra Large |
| --------- | --------- | ---------- | ----------- |
| ≤ 640px   | 641–768px | 769–1024px | 1280px      |

A Site Builder can change the breakpoints by modifying the site's `tailwind.config.js` file and
following the directions specified in [Customizing Screens](https://tailwindcss.com/docs/screens
':target=_blank').

?> **Tip:** If a Site Builder _does_ modify and/or add extra breakpoints, please review the next
section to determine if there needs to be an update to any component's behavior.

## Components with Custom Responsive Behavior using Hidden

If a different component is to be displayed on different breakpoints, it is recommended to render
both components and use Tailwind classes to hide them. This is the best performing method in most
cases.

## Components with Custom Responsive Behavior using Responsive Variants

!> **IMPORTANT:** This method was determined to have performance impacts, as well as being fragile
if the breakpoints change from the defaults. Use with caution.

At times, you may need to define a specific responsive behavior that can't be defined by Tailwind
classes by itself and should be included within the component. BodilessJS provides a mechanism to
allow the site to handle the custom responsive behaviors.

Within the Test Site, the
[`src/components/Page/index.tsx`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/sites/test-site/src/components/Page/index.tsx
':target=_blank') file will read in the Tailwind breakpoints via
[`resolveConfig()`](https://tailwindcss.com/docs/configuration#referencing-in-java-script
':target=_blank') set in the `tailwind.config.js` file (see previous section). These breakpoints are
exported as a `breakpoints` object that contains the site's configuration.

BodilessJS provides the following tools to work with these breakpoints:

- [`withPageDimensionsContext`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/bodiless-components/src/PageDimensionsProvider.tsx
  ':target=_blank'): Accepts the site's breakpoints from `resolveConfig()` and will listen on the
  window's resize event.
- [`withResponsiveVariants`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/bodiless-components/src/withResponsiveVariants.tsx
  ':target=_blank'): Generates a HOC which makes the underlying component designable at different
  breakpoints. This allows responsive rendering or swapping a component entirely depending on
  viewport size.

The following example is from
[`Menu`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/sites/test-site/src/components/Menu/index.tsx ':target=_blank'):

```tsx
import Menu from './Menu';
import BurgerMenu, { BurgerMenuToggler } from './BurgerMenu';

const breakpoints = pick(allBreakpoints, 'lg');

const asResponsiveMenu = (DesktopMenu: ComponentType) => flowHoc(
  withResponsiveVariants({ breakpoints }),
  // Note, it's important to apply responsive CSS to the 2 menus in order to
  // avoid flicker on the static site. The menu for the inactive breakpoint
  // is rendered during SSR and unmounted as a side effect after rehydration.
  withDesign({
    _default: withDesign({ Wrapper: asMobileOnly }),
    lg: flowHoc(replaceWith(DesktopMenu), asDesktopOnly),
  }),
);

const ResponsiveMenu = asResponsiveMenu(Menu)(BurgerMenu);
```

Some of the components that have specific responsive behavior:

- [`FilterByGroup`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/bodiless-filtering/src/FilterByGroup/Filter.tsx
  ':target=_blank'): The filter will render un-collapsed lists on larger devices, and smaller
  devices will collapse into accordions.
- [`Menu`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/sites/test-site/src/components/Menu/index.tsx
  ':target=_blank'): Will show a traditional horizontal menu on larger devices, and a mobile burger
  menu on smaller devices.
