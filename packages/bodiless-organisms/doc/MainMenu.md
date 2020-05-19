# Main Menu 

## Exported HOC's 

- `withSubmenu`, adds the local context menu to the given component
- `asEditableMenu`, HOC, produces *editable* menu 
- `asEditableSubMenu`, HOC, produces *editable* submenu
- `asHorizontalMenu`, sets the Submenu in a horizontal menu and setups the offset of submenu,
to zero, so it will be rendered render right after the submenu `<Item />`
- `asHorizontalSubMenu`, sets the menu to horizontal mode
- `asMainMenu`, that incorporate the given component (usually based on `<List />` component)
- `asMainSubMenu`, that incorporate the given component (usually based on `<List />` component)

## Example 

Lets create a styled editable horizontal menu with vertical submenus.

### Step 1: The Structure

First, lest create an unstyled version of the menu. For that purpose we should use next HOC's: `asEditableMenu`, `asEditableSubMenu`, `asHorizontalSubMenu`, `asHorizontalMenu`, `withSubmenu`. 

```
const MenuSubList = flow(
  asEditableMainSubMenu(asEditable),
  asHorizontalSubMenu,
)(List);

const MenuList = flow(
  asEditableMainMenu(asEditable),
  asHorizontalMenu,
)(List);

export default withSubmenu(MenuSubList)(MenuList);
```

### Step 2: Styling  

For that purpose we will use [fclasses](/Core/FClasses) functions like: `addClasses`, `removeClasses`, `withDesign`,`addProps` and theme using [Tailwind CSS](https://tailwindcss.com/)

Lets setup styles: 

- for menu links: white colored and without underline on hover
- for menu items: set the minimum with to 100 pixels
- for submenus: align to left with top-level menu items   
- for overall: set teal background
- for a case when menu items do not fit to size of the menu, we want to display style "..." button

On high-level the menu is a list composed of a three components: 

- `Wrapper` - the container for the menu
- `Item` - the container for the menu item 
- `Title` - the content of the menu item, usually a link or a text    

```
// styling HOC's
const asWhiteColoredLink = flow(
  removeClasses('bl-text-primary hover:bl-underline'),
  addClasses('text-white'),
);
const withActivePageStyles = addClasses('bg-teal-500');
const withLinkStyles = withDesign({
  ActiveLink: asWhiteColoredLink,
  Link: asWhiteColoredLink,
});
const withMenuStyles = addClasses('hover:bg-teal-500 text-white text-left min-w-100 leading-loose text-sm px-2');
const withTealBackground = addClasses('bg-teal-600');
const withLimitedHeightStyles = addClasses('overflow-y-hidden max-h-menu-row')
const withSubmenuStyles = addClasses('-ml-2');
const MenuSubList = flow(
  asEditableMainSubMenu(asEditable),
  asHorizontalSubMenu,  
  withDesign({
    Title: withLinkStyles,
    Wrapper: flow(
      withTealBackground,
      withMenuStyles,
    ),
    Item: flow(
      withMenuStyles,
      withTealBackground,
      withSubmenuStyles,
    ),
  }),
)(List);

const MenuList = flow(
  asEditableMainMenu(asEditable),
  asHorizontalMenu,
  withDesign({
    Title: withLinkStyles,
    Wrapper: flow(
      withTealBackground,
      addProps({ overflowedIndicator: <span className="text-white">...</span> }),
      withLimitedHeightStyles,
    ),
    Item: flow(
      withMenuStyles,
    ),
  }),
)(List);

export default withSubmenu(MenuSubList)(MenuList);
```

### Step 3: Active Page Support

Lets highlight the active page in the menu. To achieve that we'll leverage the design component `<ActiveLink/>` exposed by the menu `<Title/`> component:

```
const withLinkStyles = withDesign({
  ActiveLink: flow(asWhiteColoredLink, withActivePageStyles),
  Link: asWhiteColoredLink,
});
```    

### The Result Code 

```
/**
 * Copyright Â© 2019 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import { flow } from 'lodash';
import {
  addClasses,
  addProps,
  removeClasses,
  withDesign,
} from '@bodiless/fclasses';
import {
  List,
} from '@bodiless/components';
import {
  asHorizontalMenu,
  asHorizontalSubMenu,
  asEditableMainMenu,
  asEditableMainSubMenu,
  withSubmenu,
} from '@bodiless/organisms';

const asWhiteColoredLink = flow(
  removeClasses('bl-text-primary hover:bl-underline'),
  addClasses('text-white'),
);
const withActivePageStyles = addClasses('bg-teal-500');
const withLinkStyles = withDesign({
  ActiveLink: flow(asWhiteColoredLink, withActivePageStyles),
  Link: asWhiteColoredLink,
});
const withMenuStyles = addClasses('hover:bg-teal-500 text-white text-left min-w-100 leading-loose text-sm px-2');
const withTealBackground = addClasses('bg-teal-600');
const withLimitedHeightStyles = addClasses('overflow-y-hidden max-h-menu-row')
const withSubmenuStyles = addClasses('-ml-2');
const MenuSubList = flow(
  asEditableMainSubMenu(asEditable),
  asHorizontalSubMenu,
  withDesign({
    Title: withLinkStyles,
    Wrapper: flow(
      withTealBackground,
      withMenuStyles,
    ),
    Item: flow(
      withMenuStyles,
      withTealBackground,
      withSubmenuStyles,
    ),
  }),
)(List);

const MenuList = flow(
  asEditableMainMenu(asEditable),
  asHorizontalMenu,
  withDesign({
    Title: withLinkStyles,
    Wrapper: flow(
      withTealBackground,
      addProps({ overflowedIndicator: <span className="text-white">...</span> }),
      withLimitedHeightStyles,
    ),
    Item: flow(
      withTealBackground,
      withMenuStyles,
    ),
  }),
)(List);

export default withSubmenu(MenuSubList)(MenuList);



<MainMenu nodeKey="main-menu" />
```

Check [examples/test-site/src/components/Menus/MainMenu.tsx](../../examples/test-site/src/components/MainMenu.tsx)
