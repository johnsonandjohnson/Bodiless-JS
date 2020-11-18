# Burger Menu 

- Provides Hamburger Menu for mobile screens.
- The Burger Menu does not provide any edit UI, any updates to the Burger Menu should be done via the Main Menu.
- Transforms submenus into accordions. Any item which has children renders it's title with no link, when the title is tapped the children expand with an "Overview" item that links to the URL that was on the title.

### Exported Simple Menu HOCs
There are several HOCs provided by `@bodiless/organisms` that are designed to transform submenus into accordions.

 - `asSimpleBurgerMenu` - Transforms each Simple Menu submenu into an accordion. If an accordion title is a Link - the link will be disabled and the "Overview" link provided.
 - `asMegaBurgerMenu` - Transforms each Mega Menu submenu into an accordion. If accordion title is a Link - link will be disabled and "Overview" link provided. Each column in `Columns` submenu is also transformed into accordions.


### Burger Menu Structure
There are two main parts of the Burger Menu: `Header`  and `Body`. Without these components, `BurgerMenuBase` is just a full-width overlay with empty `Header` and `Body` slots. Burger Menu `Body` is a variation of the Menu.

```js
import { flow } from 'lodash';
import { asStatic } from '@bodiless/core';
import { withDesign, replaceWith } from '@bodiless/fclasses';
import { BurgerMenuClean, asSimpleBurgerMenu } from '@bodiless/organisms';

import Logo from '../Layout/logo';
import { SimpleMenuBase } from '../Menu/SimpleMenu';

import withBurgerMenuStyles from './BurgerMenu.token';
import withSimpleBurgerMenuStyles from './SimpleBurgerMenu.token';

/**
 * BurgerMenuClean is built on top of the `react-burger-menu` package
 * which does not provide an API for styling and relies on .css to style
 * burger menu icon, close icon and hover effect.
 */
import './burger-menu.css';

// Token to replace Burger Menu Header with the Logo component.
const withBurgerMenuLogo = withDesign({
  Header: replaceWith(Logo),
});

// Create Burger Menu Body from `SimpleMenuBase`
const BurgerMenuBody = flow(
  asSimpleBurgerMenu,         // Transform submenus into accordions
  withSimpleBurgerMenuStyles,     // Apply Styles
  asStatic,             // Make sure it is not editable
)(SimpleMenuBase);

// Compose `SimpleBurgerMenu` by replacing Burger Menu Header and Body.
const SimpleBurgerMenu = flow(
  withDesign({
    Body: replaceWith(BurgerMenuBody),
  }),
  withBurgerMenuLogo,
  withBurgerMenuStyles,
)(BurgerMenuClean);

export default SimpleBurgerMenu;
```

### Overview Link
Burger Menu transforms submenus into accordions. Any item which has children renders its title with no link. When the title is tapped, the children expand with an "Overview" item that links to the URL that was on the title.

The default "Overview" item is `<a href="..." ...>Overview</a>` however you can provide your Overview Link component if needed. Burger Sub Menu `Item` has an optional prop `OverviewLink`:
```ts
type WithOverviewLink = {
  OverviewLink: ComponentType<HTMLProps<HTMLAnchorElement>>
};
```

So you can provide your own version of the `OverviewLink`:

```ts
import React from 'react';
import { flow } from 'lodash';
import { withSimpleMenuDesign } from '@bodiless/organisms';
import { addClasses } from '@bodiless/fclasses';

import { asBold, asDisabled } from '../Elements.token';

/**
 * Create Simple Link
 * 
 * Note that `props` contains `href` which is an`href` of the
 * parent accordion Title.
 */
const OverviewLinkBase = props => (<a {...props}>Bold Overview</a>);
const BoldOverviewLink = flow(
  asBold,
)(OverviewLinkBase);

/**
 * Create Base Burger Sub Menu Styles
 */
const baseBurgerSubMenuStyles = {
  Wrapper: withDesign({
    Title: withDesign({
      Label: flow(
        asBold,
        asDisabled, // Make sure Link clicks are disabled
      ),
    }),
    List: addClasses('flex flex-col'),
  }),
  Item: flow(
    addProps({ OverviewLink: BoldOverviewLink }),
    addClasses('pl-3'),
  ),
};

/**
 * HOC that applies basic Burger Menu and Submenu styles with custom
 * bold Overview link.
 */
const withSimpleBurgerMenuStyles = flow(
  withSimpleMenuDesign(baseBurgerSubMenuStyles),
  withBaseBurgerMenuStyles,
);

export default withSimpleBurgerMenuStyles;
```



### Styling Burger Menu
`BurgerMenuBase` component is built on top of [`react-burger-menu`](https://github.com/negomi/react-burger-menu) and has the following structure:
```html
<Wrapper> <!-- Wrapper around Burger Menu Icon-->
  <Menu> <!-- 'slide' from 'react-burger-menu' -->
    <Header />
    <Body />
  </Menu>
</Wrapper>
```

Most of the times `Body` of the `BurgerMenuBase` will be a version of the `SimpleMenuBase` or `MegaMenuBase` and follows the same styling structure as menus. The only difference is use of `asSimpleBurgerMenu`  token. It converts menu items to the accordions with submenus as an accordion body which gives an access to the Accordion design components.

```js
import { flow } from 'lodash';
import { withSimpleMenuDesign } from '@bodiless/organisms';
import { withDesign, addClasses } from '@bodiless/fclasses';

/**
 * Example Burger Menu Styles
 * ===========================================
 */
const withBaseMenuExampleStyles = withDesign({
  Wrapper: addClasses('BURGER_BODY_WRAPPER'),
  Item: addClasses('BURGER_BODY_ITEM'),
  Title: addClasses('BURGER_BODY_TITLE'),
});

const baseSubMenuExampleStyles = withDesign({
  Wrapper: withDesign({
    List: addClasses('ACCORDION_BODY'),
    Title: withDesign({
      Label: addClasses('ACCORDION_LABEL'),
    }),
    WrapperItem: addClasses('ACCORDION_WRAPPER'),
  }),
  Item: addClasses('BURGER_SUB_ITEM'),
  Title: addClasses('BURGER_SUB_TITLE'),
});

const withBurgerMenuExampleStyles = flow(
  withSimpleMenuDesign(baseSubMenuExampleStyles),
  withBaseMenuExampleStyles,
);

export default withBurgerMenuExampleStyles;
```

### Adding Site Logo
A site logo may be added to the `Header` of the `BurgerMenuClean` component.

```js
import { flow } from 'lodash';
import { withDesign, replaceWith } from '@bodiless/fclasses';
import { BurgerMenuClean } from '@bodiless/organisms';
import Logo from '../Layout/logo';

const withBurgerMenuLogo = withDesign({
  Header: replaceWith(Logo),
});

const SimpleBurgerMenu = flow(
  withBurgerMenuLogo,
)(BurgerMenuClean);

export default SimpleBurgerMenu;
```

