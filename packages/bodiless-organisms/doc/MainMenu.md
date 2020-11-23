# Main Menu 

### Table of Contents

1. [Simple Menu](#simple-menu)
   1. [Exported Simple Menu HOCs](#exported-simple-menu-hocs)
   2. [Simple Menu Structure](#simple-menu-structure)
   3. [Styling Simple Menu](#styling-simple-menu)
2. [Mega Menu](#mega-menu)
   1. [Exported Mega Menu HOCs](#exported-mega-menu-hocs)
   2. [Mega Menu Structure](#mega-menu-structure)
   3. [Styling Mega Menu](#styling-mega-menu)

## Simple Menu

### Exported Simple Menu HOCs
There are several HOCs provided by `@bodiless/organisms` that can be used to build a Simple Menu.

 - `asSimpleMenuBase` - A Bodiless HOC generator that creates a basic structure of the Simple Menu. It may serve as a base for various views on the Menu data, including a site's main menu, a burger menu, and breadcrumbs.
 - `withSimpleMenuDesign` - Applies the specified design to the main menu and all submenus.
 - `asSimpleMenuTopNav` - Applies base Simple Top Menu styles responsible for the menu layout and behavior.
 - `asMenuLink` - A helper HOC to create an editable `MenuLink` which supports an Active Page via Design API.

### Simple Menu Structure

Simple Menu is based on the List API. Let's take a look at the basic Simple Menu structure:
```js
import { flow } from 'lodash';
import { asEditable } from '@bodiless/components';
import { asMenuLink, asSimpleMenuBase, withSimpleMenuDesign } from '@bodiless/organisms';

// Create an Editor for the Menu Title
const withTitleEditor = asEditable('menu-item', 'Menu Item');

export const SimpleMenu = flow(
  asSimpleMenuBase(), // Define the list structure
  withSimpleMenuDesign({
    Title: asMenuLink(withTitleEditor), // Apply editor to all List and Sublist titles
  }),
)('ul'); // Use Unsorted List as the base component
```
The code above will produce the unstyled version of Simple Menu.
```html
<ul>
  <li>
    <Title /> <!-- The Editor applied to Title above will be rendered here -->
  </li>
  ...
</ul>
```

### Styling Simple Menu
Bodiless FClasses Design API may be used to style every piece of Simple menu. Basic Top Menu layout and SubMenu behavior classes are also provided by `asSimpleMenuTopNav` for convenience.
```js
import { flow } from 'lodash';
import { asEditable } from '@bodiless/components';
import { asMenuLink, asSimpleMenuBase, withSimpleMenuDesign } from '@bodiless/organisms';

import withSimpleMenuStyles from './SimpleMenu.token';

const withTitleEditor = asEditable('menu-item', 'Menu Item');

export const SimpleMenu = flow(
  asSimpleMenuBase(),
  withSimpleMenuDesign({
    Title: asMenuLink(withTitleEditor),
  }),
  withSimpleMenuStyles, // Apply custom menu styles
  asSimpleMenuTopNav, // Apply Basic Top Menu layout and SubMenu behavior.
)('ul');
```

On high-level the Menu is a list composed of a three components:
- `Wrapper` - the container for the menu.
- `Item` - the container for the menu item.
- `Title` - the content of the menu item, usually a link or a text.

The submenu design structure is almost identical to the Menu structure except for the `Wrapper` component:
- `Wrapper`
  - `List` - the container for the sub-menu.
  - `WrapperItem` - the container for the **top-menu** item. Usefull for nested sublists.
- `Item` - the container for the sub-menu item.
- `Title` - the content of the sub-menu item, usually a link or a text.

Let's take a closer look at `SimpleMenu.token.tsx` file with custom styles for the Simple Menu. 
```js
import { flow } from 'lodash';
import { withDesign, addClasses } from '@bodiless/fclasses';

// Define Top Menu Styles
const withDemoMenuStyles = withDesign({
  Wrapper: addClasses('menu_wrapper'),
  Title: addClasses('menu_title'),
  Item: addClasses('menu_item_wrapper'),
});

// Define Sub Menu Styles
const asDemoSubMenu = withDesign({
  Wrapper: withDesign({
    WrapperItem: addClasses('parent_menu_item'),
    List: addClasses('sub_menu_wrapper'),
  }),
  Title: addClasses('sub_menu_title'),
  Item: addClasses('sub_menu_item_wrapper'),
});

const withSimpleMenuStyles = flow(
  withDesign({
    Item: withDesign({ // Each menu item may have a sub-menu.
      SubMenu: asDemoSubMenu, // Styles for the sub-menu.
    }),
  }),
  withDemoMenuStyles, // Styles for the top menu.
);

export default withSimpleMenuStyles;
```

There is an `withSimpleMenuDesign` HOC provided by the `@bodiless/organisms` to simplify the submenu styling. Let's see how using `withSimpleMenuDesign` changes the code:

```js
import { flow } from 'lodash';
import { withDesign, addClasses } from '@bodiless/fclasses';
import { withSimpleMenuDesign } from '@bodiless/organisms';

// Define Top Menu Styles
const withDemoMenuStyles = withDesign({
  Wrapper: addClasses('menu_wrapper'),
  Title: addClasses('menu_title'),
  Item: addClasses('menu_item_wrapper'),
});

// Define Sub Menu Styles
const asDemoSubMenu = withDesign({
  Wrapper: withDesign({
    WrapperItem: addClasses('parent_menu_item'),
    List: addClasses('sub_menu_wrapper'),
  }),
  Title: addClasses('sub_menu_title'),
  Item: addClasses('sub_menu_item_wrapper'),
});

const withSimpleMenuStyles = flow(
  withSimpleMenuDesign(asDemoSubMenu), // Styles for the sub-menu.
  withDemoMenuStyles, // Styles for the top menu.
);

export default withSimpleMenuStyles;
```

Here is the HTML produced for the styled `SimpleMenu` component:
```html
<ul class="menu_wrapper"> <!-- Menu Wrapper -->
  <li class="menu_item_wrapper parent_menu_item"> <!-- Menu Item and SubMenu WrapperItem -->
    <Title class="menu_title" /> <!-- Menu Title -->
    <ul class="sub_menu_wrapper"> <!-- SubMenu List -->
    <li class="sub_menu_item_wrapper"> <!-- SubMenu Item -->
      <Title class="sub_menu_title" /> <!-- SubMenu Title -->
    </li>
    </ul>
  </li>
  ...
</ul>
```

## Mega Menu

### Exported Mega Menu HOCs
There are several HOCs provided by `@bodiless/organisms` that can be used to build a Mega Menu.

 - `asMegaMenuBase` - A Bodiless HOC generator that creates a basic structure of the Mega Menu. It may serve as a base for various views on the Menu data, including a site's main menu, a burger menu, and breadcrumbs.
 - `withMegaMenuDesign` - Applies the specified design to the main menu and all submenus.
 - `asMegaMenuTopNav` - Applies base Top Mega Menu styles responsible for the menu layout and behavior.
 - `asMenuLink` - A helper HOC to create an editable `MenuLink` which supports an Active Page via Design API.
 - `asMenuTout` - A helper HOC to convert a menu item into a Tout.

### Mega Menu Structure
Mega Menu is also based on the List API as Simple Menu, but it has move submenu variations. When creating a submenu, you will be presented with three options to choose from:

 - **List Submenu** - creates a simple list submenu.
 - **Touts Submenu** - creates a list where each list item is a Tout.
 - **Columns Submenu** - creates a list where each list item is a Column with the title and simple list.

Here is the example of the basic Mega Menu structure:
```js
import { flow } from 'lodash';
import { withDesign } from '@bodiless/fclasses';
import { asEditable } from '@bodiless/components';
import { asMenuLink, asMenuTout, asMegaMenuBase, withMegaMenuDesign } from '@bodiless/organisms';
import { withToutEditors } from '../Tout';

// Create an Editor for the Menu Title
const withTitleEditor = asEditable('menu-item', 'Menu Item');

// Create a Tout Editor for the Tout Submenu Title
const withToutEditors = flow(
  withToutEditors,
  withDesign({
    Title: asEditable('menu-item', 'Title'), // Set nodeKey to match the one in asMenuLink.
  }),
);

// Define Structure for the Touts submenu
const withToutsSubmenu = withDesign({
  Item: withDesign({ // Menu Item
    Touts: withDesign({ // Touts SubMenu Item
      Title: asMenuTout(withToutEditors), // Touts SubMenu Title
    }),
  }),
});

export const MegaMenu = flow(
  asMegaMenuBase(), // Define List structure
  withMegaMenuDesign({
    Title: asMenuLink(withTitleEditor), // Apply Editor to all List and Sublist titles
  }),
  withToutsSubmenu, // Apply Tout Submenu structure
)('ul'); // Use Unsorted List as the base component
```

The code above will create an unstyled version of Mega Menu with the same structure as Simple Menu. The difference between Simple Menu and Mega Menu, in this case, is that the latter allows you to create multiple types of the submenus.

### Styling Mega Menu
Bodiless FClasses Design API may be used to style every piece of Mega Menu. Basic Mega Menu layout and SubMenu behavior classes are also provided by `asMegaMenuTopNav` for convenience.

```js
import { flow } from 'lodash';
import { asEditable } from '@bodiless/components';
import {
  asMenuLink, asMenuTout, asMegaMenuBase, withMegaMenuDesign, asMegaMenuTopNav,
} from '@bodiless/organisms';

import withMegaMenuStyles from './MegaMenu.token';

export const MegaMenu = flow(
  asMegaMenuBase(),
  withMegaMenuDesign({
    Title: asMenuLink(withTitleEditor),
  }),
  withToutsSubmenu,
  withMegaMenuStyles, // Apply custom Mega Menu styles
  asMegaMenuTopNav, // Apply Basic Top Mega Menu layout and SubMenu behavior
)('ul');
```
The styling principle for the Mega Menu is similar to the way you would style a Simple menu. Let's take a closer look at `MegaMenu.token.tsx` file with the Mega Menu custom styles.
```js
import { flow } from 'lodash';
import { withDesign, addClasses } from '@bodiless/fclasses';

/**
 * Top Menu Styles
 * Same structure as the Simple Menu
 * ===========================================
 */
const withTopMenuStyles = withDesign({
  Wrapper: addClasses('menu_wrapper'),
  Title: addClasses('menu_title'),
  Item: addClasses('menu_item_wrapper'),
});

/**
 * List Sub Menu Styles
 * Same structure as the Simple SubMenu
 * ===========================================
 */
const asBasicSubMenu = withDesign({
  Wrapper: withDesign({
  WrapperItem: addClasses('parent_menu_item'),
    List: addClasses('sub_menu_wrapper'),
  }),
  Title: addClasses('sub_menu_title'),
  Item: addClasses('sub_menu_item_wrapper'),
});

/**
 * Touts Sub Menu Styles
 * We can reuse 'asBasicSubMenu' here as Touts sublist structure is the same.
 * ===========================================
 */
const asToutsSubMenu = flow(
  asBasicSubMenu, // Same structure as 'asBasicSubMenu'
);

/**
 * Column Sub Menu Styles
 * In column submenu each submenu item (column) is a List itself
 * and has the same structure as 'asBasicSubMenu'.
 * ===========================================
 */
const asColumnSubMenu = flow(
  withDesign({
    /**
   * Each Item in Column sublist is a list itself so the same
   * styles may be applied to it. Think of it as a nested sublists
   * with the same structure.
   */
    Item: asBasicSubMenu,
  }),
  asBasicSubMenu, // Same structure as 'asBasicSubMenu'
);

/**
 * Styles for all SubMenu options
 * ===========================================
 */
const asMegaMenuSubListStyles = withDesign({
  List: asBasicSubMenu,
  Touts: asToutsSubMenu,
  Columns: asColumnSubMenu,
});

const withMegaMenuStyles = flow(
  withDesign({
    Item: asMegaMenuSubListStyles, // Each menu item may have one of 3 SubMenus. 
  }),
  withTopMenuStyles, // Top Menu Styles
);

export default withMegaMenuStyles;
```

There is an `withMegaMenuDesign` HOC provided by the `@bodiless/organisms` to simplify the submenu styling. Let's see how using `withMegaMenuDesign` simplifies the code:

```js
import { flow } from 'lodash';
import { withDesign, addClasses } from '@bodiless/fclasses';
import { withMegaMenuDesign } from '@bodiless/organisms';

/**
 * Top Menu Styles
 * Same structure as the Simple Menu
 * ===========================================
 */
const withTopMenuStyles = withDesign({
  Wrapper: addClasses('menu_wrapper'),
  Title: addClasses('menu_title'),
  Item: addClasses('menu_item_wrapper'),
});

/**
 * Sub Menu Styles
 * ===========================================
 */
const asBasicSubMenu = withDesign({
  Wrapper: withDesign({
  WrapperItem: addClasses('parent_menu_item'),
    List: addClasses('sub_menu_wrapper'),
  }),
  Title: addClasses('sub_menu_title'),
  Item: addClasses('sub_menu_item_wrapper'),
});

const withMegaMenuStyles = flow(
  withMegaMenuDesign(asBasicSubMenu), // General Styles for all submenus.
  withTopMenuStyles, // Top Menu Styles
);

export default withMegaMenuStyles;
```

Note that `withMegaMenuDesign` applies design to all submenu variations. If you want to apply styles only to `Columns` submenus then you would do something like this:

```js
import { flow } from 'lodash';
import { withDesign, addClasses } from '@bodiless/fclasses';
import { withMegaMenuDesign } from '@bodiless/organisms';

/**
 * Top Menu Styles
 * Same structure as the Simple Menu
 * ===========================================
 */
const withTopMenuStyles = withDesign({
  Wrapper: addClasses('menu_wrapper'),
  Title: addClasses('menu_title'),
  Item: addClasses('menu_item_wrapper'),
});

/**
 * Sub Menu Styles
 * ===========================================
 */
const asBasicSubMenu = withDesign({
  Wrapper: withDesign({
  WrapperItem: addClasses('parent_menu_item'),
    List: addClasses('sub_menu_wrapper'),
  }),
  Title: addClasses('sub_menu_title'),
  Item: addClasses('sub_menu_item_wrapper'),
});

/**
 * Columns Sub Menu Styles
 * ===========================================
 */
const asColumnPaddingLeft = withDesign({
  Item: withDesign({
    Title: addClasses('pl-5'),
  }),
});

/**
 * Mega Menu Sub Menu Styles
 * ===========================================
 */
const withMegaMenuSubMenuStyles = withDesign({
  Item: withDesign({
    Columns: asColumnPaddingLeft,
  }),
});

const withMegaMenuStyles = flow(
  withMegaMenuSubMenuStyles, // Add Column Submenu styles
  withMegaMenuDesign(asBasicSubMenu), // General Styles for all submenus.
  withTopMenuStyles, // Top Menu Styles
);

export default withMegaMenuStyles;
```