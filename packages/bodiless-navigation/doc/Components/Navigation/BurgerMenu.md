
# Bodiless Burger Menu

### Exported HOCs
There are several burger-menu specific HOCs provided by `@bodiless/navigation` that can be composed together to build a Burger Menu.

 - `asBurgerMenu` - Helper, which allows specifying which submenu types are configured by default for the Burger Menu. Transforms selected submenus into accordions.
 - `asBurgerMenuToggler` - HOC that adds an ability to toggle Burger Menu visibility on click. It extends the Component's default onClick handler if it exists. Note that the Component has to be inside a BurgerMenuContext.
 - `withBurgerMenuWrapper` - HOC that wraps the supplied Component in the burger menu chrome.
 - `withBurgerMenuProvider` - An HOC that wraps component with the `BurgerMenuContext` and creates two state variables: `isVisible` and `toggle()`.
 - `useBurgerMenuContext` - Hook, which can be used to access `BurgerMenuContext`.
 - `useIsBurgerMenuVisible` - Hook, which can be used to determine if a submenu is visible.
 - `useIsBurgerMenuHidden` - Hook, which can be used to determine if a submenu is hidden.
 - `useIsBurgerTransitionCompleted` - Hook which returns `true` if burger menu transitions are completed. It is almost identical to `useIsBurgerMenuHidden`, but waits untill the Burger Menu animations are completed before returning `true`. Usefull to avoid playing animations on initial component render.
 - `asSlideLeft` - An HOC that adds styles and transitions needed for a slide-in animation for the Burger menu.

### Burger Menu Structure
The Burger menu, as well as Bodiless Menu, is based on the List API. Burger menu is, in most cases, an extension of the site top menu. `withBurgerMenuWrapper` is used to wrap top-menu schema in the burger menu chrome.
```js
import { asToken } from '@bodiless/fclasses';
import {
  asBodilessMenu, withListSubMenu, withColumnSubMenu, withMenuDesign,
  withCardsSubMenu, withBurgerMenuWrapper, withMenuTitleEditors,
} from '@bodiless/navigation';

// Define menu schema first
// Note that $withMenuSchema is the same for the Top Menu and Burger Menu.
const $withMenuSchema = asToken(
  asBodilessMenu('demo-menu'),
  withListSubMenu(), // Add an ability to create a List submenu
  withColumnSubMenu(), // Add an ability to create a Columns submenu
  withCardsSubMenu(), // Add an ability to create a Cards submenu
);

// Menu doesn't provide any default editors so we need to configure one.
// We can use the `withMenuTitleEditors` helper to add editors.
// It accepts an optional `withTitleEditors` param that defaults to withDefaultMenuTitleEditors.
const $withTitleEditors = withMenuTitleEditors();

// Compose burger menu by wrapping menu schema into burger menu chrome.
const DemoBurgerMenu = asToken(
  $withMenuSchema
  withBurgerMenuWrapper,
  // Configure title editors for all Titles.
  withMenuDesign()($withTitleEditors),
)('ul');
```

The code above would wrap `DemoMenuBase` in the burger menu chrome. The final component would look something like this:
```js
<Wrapper>
  <Header />
  <Nav>
    <Menu {...rest} /> // DemoMenuBase will go here
  </Nav>
</Wrapper>
```

#### Burger Menu Header
You can add a custom burger menu header by targeting the `Header` design key:
```js
import { asToken, replaceWith, withDesign } from '@bodiless/fclasses';
import { withBurgerMenuWrapper } from '@bodiless/navigation';

import { DemoMenuBase } from './Menu';
import Logo from '../Layout/logo';
import { asDefaultLogoStyle } from '../Layout/token';

const withBurgerMenuHeader = withDesign({
  Header: asToken(
    replaceWith(Logo),
    asDefaultLogoStyle,
  ),
});

// Wrap DemoMenuBase in the burger menu chrome and then add custom Header.
const DemoBurgerMenu = asToken(
  withBurgerMenuWrapper,
  withBurgerMenuHeader, // Note that this should go after we wrapped DemoMenuBase with BM chrome.
)(DemoMenuBase);
```

#### Overview Link
Burger Menu transforms submenus into accordions. Any item which has children renders its title with no link. When the title is tapped, the children expand with an "Overview" item that links to the URL that was on the title.

The default "Overview" item is  `<a href="..." ...>Overview</a>`  however you can provide your Overview Link component if needed.
```js
import { asToken, withDesign } from '@bodiless/fclasses';
import { asBurgerMenu, withMenuDesign, withOverviewLink } from '@bodiless/navigation';

import  { DemoMenuBase }  from  './Menu';

// Create a Token with custom overview link text that can be used by withMenuDesign
const $withOverviewLink = withOverviewLink('Demo Overview Link');

// Create a Token that adds a custom overview link to all submenus.
const $withBurgerMenuStyles = asToken(
  asBurgerMenu('List', 'Columns', 'Cards'),
  withMenuDesign(['List', 'Columns', 'Cards'])($withOverviewLink),
);

// We need to apply $withBurgerMenuStyles token to the `Menu` design key.
// So lets create a top-level design token for the BM
const $asDemoBurgerMenu = asToken(
  withDesign({
    Menu: $withBurgerMenuStyles,
  }),
);

// Finally we apply the top-level design token to the demo burger menu
export const DemoBurgerMenu = asToken(
  withBurgerMenuWrapper,
  $asDemoBurgerMenu,
)(DemoMenuBase);
```

#### Burger Menu Context Provider
In most cases, Burger Menu is hidden by default and can be toggled visible by clicking a Burger Menu toggler button. For toggler to work, the burger menu and toggler button have to be inside a `BurgerMenuContext`. There is an `withBurgerMenuProvider` HOC available in `@bodiless/navigation` that wraps a component with the `BurgerMenuContext`. Usually, one of the top-level elements such as `Page` or `Layout` is wrapped with the `BurgerMenuContext`.

```js
import { Fragment } from '@bodiless/fclasses';
import { withBurgerMenuProvider } from '@bodiless/navigation';

const BurgerMenuProvider = withBurgerMenuProvider(Fragment);

const BaseLayout = ({ children, components }) => {
  // ...
  return (
    <BurgerMenuProvider> // Put BM provider at the top level so we have an access to the context from everywhere on the page.
      <SiteHeader />
      <Container>
        {children}
      </Container>
      <SiteFooter />
    </BurgerMenuProvider>
  );
};
```
Here is a closer look at the `BurgerMenuProvider`: 
```ts
type BurgerMenuContextType = {
  isVisible: boolean,
  toggle: React.Dispatch<React.SetStateAction<boolean>>,
};
```
Its `isVisible` prop determines whether the burger menu is visible or not, and `toggle()` function may be used to toggle burger menu visibility. There are also a few helper HOCs available:

 - `useBurgerMenuContext` - may be used to access `isVisible` and `toggle()`.
 - `useIsBurgerMenuVisible` - Hook that returns `true` if BM is visible, `false` otherwise. Usefull when working with conditional `fClasses`.
 - `useIsBurgerMenuHidden` - Hook that returns `true` if BM is hidden, `false` otherwise. Usefull when working with conditional `fClasses`.

#### Burger Menu Toggler
Burger Menu Toggler is a button that toggles burger menu visibility. It usually comes as a separate component and can be placed anywhere on the site within a `BurgerMenuContext`. 

There is a `BurgerMenuDefaultToggler` component exported by the `@bodiless/navigation`. It is a stylable component that toggles the burger menu visibility and its icon from `menu` when the burger menu is hidden to `close` when burger menu is visible.
```js
import { asToken, withDesign, addClasses } from '@bodiless/fclasses';
import { BurgerMenuDefaultToggler } from '@bodiless/navigation';

export const BurgerMenuToggler = asToken(
  withDesign({
    Wrapper: addClasses(...), // `Fragment` by default.
    Button: addClasses(...), // `Button` by default
  }),
)(BurgerMenuDefaultToggler);
```

### Styling Burger Menu
As Bodiless Navigation Menu, Burger menu is also built on top of the list API. In most cases, the Burger menu is constructed by wrapping an unstyled navigation menu in the burger menu chrome. It has the following structure:
```html
<Wrapper>
  <Header />
  <Nav>
    <Menu /> <!-- Usually same navigation menu component -->
  </Nav>
</Wrapper>
```
where `<Menu />` is the actual Menu List component.
```js
export const $asDemoBurgerMenu = withDesign({
  Wrapper: addClasses(...),
  Header: addClasses(...),
  Nav: addClasses(...),
  Menu: $withBurgerMenuStyles, // Menu Token
});
```
See [Styling Bodiless Menu](./Menu.md) for more information on styling Menus. 

#### Using `asBurgerMenu` to transform submenus into accordions:
By default, there are no layout or interaction styles added to the Burger menu, and it is rendered as a plain list. There is a `asBurgerMenu` helper that can be used to transform menu items with submenus into accordions. It accepts a list of submenu keys.

```js
import { withDesign, asToken } from '@bodiless/fclasses';
import { asBurgerMenu } from '@bodiless/navigation';

// Create Menu Token
const $withBurgerMenuStyles = asToken(
  // Transforms List, Columns and Cards submenus into accordions.
  // Columns submenus are also transformed into accordions.
  asBurgerMenu('List', 'Columns', 'Cards'),
);

// Apply Menu Token
export const $asDemoBurgerMenu = withDesign({
  Menu: $withBurgerMenuStyles, // Menu styles
});
```

#### Styling burger menu with `withMenuDesign`:
You can use `withMenuDesign` to style the burger menu list the same way you would [style Bodiless Menu](./Menu.md). It is important to remember that If you transformed burger submenus into accordions with `asBurgerMenu()`, menu `Item`'s will have nested Accordion design keys:

```js
import { withDesign, asToken, addClasses } from '@bodiless/fclasses';
import { asBurgerMenu } from '@bodiless/navigation';

// Lets make accordion Labels bold.
// Note we target OuterWrapper first since this is the parent <li> element
// that is replaced with the Accordion Title that has 'Label' and 'Icon' design components.
const $withBoldAccordionTitle = withDesign({
  OuterWrapper: withDesign({
    Title: withDesign({
      Label: addClasses('bold'),
    }),
  }),
});

// Create Menu token
const $withBurgerMenuStyles = asToken(
  asBurgerMenu('List', 'Columns', 'Cards'),
  // Apply bold accordion title to all submenu types.
  withMenuDesign(['List', 'Columns', 'Cards'])($withBoldAccordionTitle),
);

// Apply Menu token
export const $asDemoBurgerMenu = withDesign({
  Menu: $withBurgerMenuStyles, // Menu styles
});
```

#### Burger Menu Animations
The Burger menu does not have any default animations configured. There is a `asSlideLeft` token exported by the package that adds a slide-in/slide-out transition to the burger menu.
```js
import { withDesign, asToken, addClasses } from '@bodiless/fclasses';
import { asBurgerMenu, withMenuDesign, asSlideLeft } from '@bodiless/navigation';

const $withBoldAccordionTitle = withDesign({
  OuterWrapper: withDesign({
    Title: withDesign({
      Label: addClasses('bold'),
    }),
  }),
});

const $withBurgerMenuStyles = asToken(
  asBurgerMenu('List', 'Columns', 'Cards'),
  withMenuDesign(['List', 'Columns', 'Cards'])($withBoldAccordionTitle),
);

export const $asDemoBurgerMenu = asToken(
  withDesign({
    Menu: $withBurgerMenuStyles,
  }),
  asSlideLeft, // Add slide-in/slide-out animation
);
```


### Burger Menu Example
Here is the complete example of the demo burger menu with custom overview link and bold accordion titles:
```js
import { withDesign, asToken, addClasses } from '@bodiless/fclasses';
import {
  withOverviewLink, asBurgerMenu, withMenuDesign, asSlideLeft,
  withBurgerMenuWrapper, withMenuTitleEditors,
} from '@bodiless/navigation';

import  { DemoMenuBase }  from  './Menu';

// Create a OverviewLink Token that can be used by withMenuDesign
const $withOverviewLink = withOverviewLink('Overview Link Text');

// Create a Token for styling Accordion Labels
const $withBoldAccordionTitle = withDesign({
  OuterWrapper: withDesign({
    Title: withDesign({
      Label: addClasses('bold'),
    }),
  }),
});

// Menu Title Editors
const $withTitleEditors = withMenuTitleEditors();

// Compose Menu Token
const $withBurgerMenuStyles = asToken(
  asBurgerMenu('List', 'Columns', 'Cards'),
  withMenuDesign()($withTitleEditors),
  withMenuDesign(['List', 'Columns', 'Cards'])(
    $withBoldAccordionTitle,
    $withOverviewLink,
  ),
);

// Compose Burger Menu Design Token
const $asDemoBurgerMenu = asToken(
  withDesign({
    Menu: $withBurgerMenuStyles,
  }),
  asSlideLeft, // Add slide-in/slide-out animation
);

// Create Burger Menu Component
export const DemoBurgerMenu = asToken(
  withBurgerMenuWrapper,
  $asDemoBurgerMenu,
)(DemoMenuBase);
```