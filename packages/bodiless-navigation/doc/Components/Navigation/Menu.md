

# Bodiless Navigation Menu

### Exported HOCs
There are several menu-specific HOCs provided by `@bodiless/navigation` that can be composed together to build a Menu.

 - `asBodilessMenu` - Bodiless HOC generator which creates the basic structure of the Bodiless Menu. This serves as a base for various views on the Menu data, including a site's main menu, a burger menu, and breadcrumbs.
 - `withListSubMenu` - Helper, which can be used to add a List submenu option to the menu.
 - `withCardsSubMenu` - Helper, which can be used to add a Cards submenu option to the menu.
 - `withColumnSubMenu` - Helper, which can be used to add a Columns submenu option to the menu.
 - `asTopNav` - Helper, which allows specifying which submenu types should have default navigation styling added.
 - `withMenuDesign` - Helper, which makes it easier to target a particular type of submenu. The first parameter is a list of the submenu key(s), and the second param is the design keys depth to which the tokens provided as a second argument should be applied. It also accepts the special key 'Main' to apply the design to the top-level menu.
 - `withMenuTitleEditors` - A helper to apply provided `withTitleEditors` Token to the Title menu key. Applies `withDefaultMenuTitleEditors` token by default.
 - `useIsActiveTrail` - Hook, which can be used to determine if a menu item is part of the current active breadcrumb trail.
 - `useIsMenuOpen` - Hook, which can be used to determine if any submenus are open and have its context activated.

### Bodiless Menu Structure
Bodiless Menu is based on the List API. At its simplest, the menu structure can be defined as follows:
```js
import { asBodilessMenu, withMenuTitleEditors, withMenuDesign } from '@bodiless/navigation';

// Menu doesn't provide any default editors so we need to configure one.
// We can use the `withMenuTitleEditors` helper to add editors.
// It accepts an optional `withTitleEditors` param that defaults to withDefaultMenuTitleEditors.
const $withTitleEditors = withMenuTitleEditors();

// Creates a basic one level unstyled menu with Editable titles.
export const DemoMenu = flow(
  asBodilessMenu('simple-menu-demo'),
  // Add Title editors to the main menu items.
  withMenuDesign('Main')($withTitleEditors),
)('ul');
```

#### Menu Sublists
The `DemoMenu` above will create a simple one-level **unstyled** list with Editable menu titles by default. This menu may be extended with different types of submenus:
```js
import { asToken } from '@bodiless/fclasses';
import {
  asBodilessMenu, withListSubMenu, withColumnSubMenu, withCardsSubMenu,
} from '@bodiless/navigation';

export const DemoMenu = asToken(
  asBodilessMenu('menu-demo'),
  withListSubMenu(), // Add an ability to create a List submenu
  withColumnSubMenu(), // Add an ability to create a Columns submenu
  withCardsSubMenu(), // Add an ability to create a Cards submenu
)('ul');
```

Adding `with...SubMenu` HOCs provides each top menu item with the `Sub`, which offers you a choice of three types of submenu:
 - `List` - Plain list submenu. It functions exactly like a simple menu.
 - `Cards` - Each submenu item is a card. You can edit card components as with any other card.
 - `Columns` - Each submenu item is a column that itself has an optional third level of submenu.

Once you have added a submenu, the `Sub` button allows you to swap it out for a different type. The data model for each kind of submenu is the same so that when you swap it, the title and link are preserved (for Cards, the title becomes the card title, and the link becomes the CTA link).

Each of the `with...SubMenu` HOCs takes an optional token which will be applied to the sublist title. For example:
```js
withListSubMenu($asEditableMenuTitle);
```
is equivalent to
```js
asToken(
  withListSubMenu(),
  withDesign({
    Item: withDesign({
      List: withDesign({
        Title: $asEditableMenuTitle,
      }),
    }),
  }),
);
```

### Styling Bodiless Menu

On the high-level the Menu is a list composed of three components:
- `Wrapper` - The container for the menu, usually `<ul>`.
- `Item` - The menu item, usually `<li>`
- `Title` - The content of the menu item, usually a link or a text.

Here is an example of the site-level styling token for the **top-level menu**:
```js
const $withSiteTopMenuStyles = asToken(
  withDesigh({
    Wrapper: addClasses(...), // Menu <ul> element
    Item: addClasses(...), // Menu <li> element
    Title: addClasses(...), // Menu title, usually <a> element.
  }),
);
```

The same applies for the **submenus** with one additional Design key:
```js
const $withListSubMenuStyles = asToken(
  addClasses(...), // Top menu Item (<li>) for the particular submenu.
  withDesigh({
    OuterWrapper: addClasses(...), // Top menu Item (<li>) for the particular submenu. Same as addClasses() above. 
    Wrapper: addClasses(...), // Submenu <ul> element.
    Item: addClasses(...), // Submenu <li> element.
    Title: addClasses(...), // Submenu title, usually <a> element.
  }),
);
```

Note the usage of this new `OuterWrapper` Design key. It targets the **outer menu Item** (`<li>`) to which this submenu is added. 

#### Using `asTopNav` to add default menu styles:
There is a `asTopNav` helper exported by the `@bodiless/navigation` that may be used to add default menu styles. It is responsible for menu/submenu position and interaction styles such as displaying on hover, keeping it open when editing a submenu title, etc.

It accepts an optional list of submenu keys to which default styling has to be applied to:
```js
const $asSiteNavStyles = asToken(
  // Add default position and interaction styles for List, Columns and Cards submenus.
  asTopNav('Main', 'List', 'Columns', 'Cards'),
);
```

#### Styling menu with `withMenuDesign`:
To make it easier to work on menu styling, there is a `withMenuDesign` helper exported from the `@bodiless/navigation` package. It is a helper, which makes it easier to target a particular type of submenu.

There are two arguments that `withMenuDesign(keys, depths)(...tokenDefs)` accepts. The first parameter is a **list of the submenu key(s)** and the second param is the **design keys depth** to which the tokens provided as a second argument should be applied. It also accepts the special key `Main` to apply the design to the top-level menu. All arguments are optional. If you do not specify `keys` or `depths` -- it will apply token to all submenus as well as the top menu.

For example, if you had a common menu styles to apply to the top menu and all submenus, you could write:
```js
withMenuDesign(['Main', 'List', 'Cards', 'Columns'])($withCommonMenuStyles);
// or
withMenuDesign()($withCommonMenuStyles);
```

The `depths` param is the depths of the sublist to which tokens should be applied to. Currently, `maxDepths` is `2` for the column sublists.

Here are some more examples of `withMenuDesign` usage:
```js
withMenuDesign() // Applies tokens to the Top menu and all submenus.

withMenuDesign('Main') // Applies tokens to the Top menu.
withMenuDesign('Cards') // Applies tokens to Cards submenu.
withMenuDesign('List') // Applies tokens to List submenu.
withMenuDesign('Columns') // Applies tokens to all levels of columns submenu.

withMenuDesign('Columns', 1) // Applies tokens to only the first level of Columns submenu.
withMenuDesign('Columns', 2) // Applies tokens to only the second level of Columns submenu.

withMenuDesign(undefined, 0) // Applies tokens to the Top menu.
withMenuDesign(undefined, 1) // Applies tokens to all submenus of level 1.
withMenuDesign(undefined, 2) // Applies tokens to all submenus of level 2.
withMenuDesign(undefined, [0, 1]) // Applies tokens to top menu and all submenus of level 1.
```

#### Adding active menu styles:
There might be a case where you would want to add some additional styles to the menu Item or Title based on whether it is a part of the current active breadcrumb trail ( Active page ). There is a `useIsActiveTrail` hook that can be used to accomplish that:
```js
import { ifToggledOn } from '@bodiless/core';
import { useIsActiveTrail } from '@bodiless/navigation';
import { withActiveMenuBackground, asBold, asUnderline } from './DemoMenu.token';

const withActiveTitleStyles = ifToggledOn(useIsActiveTrail)(
  withActiveMenuBackground, asBold, asUnderline,
);
```

### Bodiless Menu Example
Here is the complete example of the demo bodiless menu:
```js
import { asToken } from '@bodiless/fclasses';
import {
  asTopNav, withMenuDesign, asBodilessMenu, withColumnSubMenu, withCardsSubMenu,
  withMenuTitleEditors,
} from '@bodiless/navigation';
import {
  $withTitleStyles,
  $withBaseMenuStyles,
  $withBaseSubMenuStyles,
  $withColumnsSublistStyles,
} from './DemoMenu.token';

const $withMenuSchema = asToken(
  asBodilessMenu('demo-menu'),
  withListSubMenu(),
  withColumnSubMenu(),
  withCardsSubMenu(),
);

const $withTitleEditors = withMenuTitleEditors();

const $withMenuDesign = asToken(
  asTopNav('Main', 'List', 'Columns', 'Cards'),
  withMenuDesign()($withTitleStyles),
  withMenuDesign(['Main', 'List', 'Columns'])($withTitleEditors),
  withMenuDesign('Main')($withBaseMenuStyles),
  withMenuDesign(['List', 'Columns', 'Cards'])($withBaseSubMenuStyles),
  withMenuDesign('Columns', 2)($withColumnsSublistStyles),
);

export const SiteDemoMenu = asToken(
  $withMenuSchema,
  $withMenuDesign,
)('ul');
```
