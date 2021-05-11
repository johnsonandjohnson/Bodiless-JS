# `@bodiless/navigation`

The BodilessJS Navigation section includes information on navigational components such as Menu Component, Burger Menu Component, and Breadcrumb Component.

# Bodiless Navigation Upgrade Guide 

## Updating Menu
There is no need to separate between a `SimpleMenu` and a `MegaMenu`. We can import `asBodilessMenu()` from `@bodiless/navigation`. It may be extended with any type of submenus and comes with no submenus configured by default.

Here is an **old** example of the menu:
```js
const MegaMenuBase = flow(
  withoutProps(['design']),
  // `asSimpleMenuBase` and `asMegaMenuBase` have been depricated.
  // Use `asBodilessMenu()` instead.
  asMegaMenuBase(),
  // `withSimpleMenuDesign` and `withMegaMenuDesign` have been depricated.
  // Use `withMenuDesign()` instead.
  withMegaMenuDesign({
    Title: asMenuTitle,
  }),
)('ul') as ComponentType<any>;
```

When using a **new** Menu API the code above would look like this:
```js
// First we define a menu schema:
const $asMenuBase = asToken(
  asBodilessMenu(), // Replacement for `asSimpleMenuBase` and `asMegaMenuBase`
  withListSubMenu(), // Adds a List submenu
  withColumnSubMenu(), // Adds a Columns submenu
  withCardsSubMenu(), // Adds a Cards submenu
);

// Then we provide menu Title Editors and menu styles:
const $withTitleEditors = withMenuTitleEditors(); // Use default Title editors from `@bodiless/navigation`

const $withMenuStyles = asToken(
  // Replacement for `asSimpleMenuTopNav` and `asMegaMenuTopNav`
  asTopNav('Main', 'List', 'Columns', 'Cards'),
  // Replacement for `withMegaMenuDesign` and `withSimpleMenuDesign`
  withMenuDesign(['Main', 'List', 'Cards', 'Columns'])($withTitleEditors),
);

// Lastly we compose two pieces together:
const Menu = asToken(
  $asMenuBase,
  $withMenuStyles,
)('ul') as ComponentType<any>;
```

#### Menu Styling Changes:
The top menu design keys remaines unchanged, but the structure of the Design Keys for the **SubMenu** has slightly changed. Let's take a look on how the old SubMenu styling changes in the new API.

Here is an example of **old SubMenu** styling:
```js
const $withOldSubMenuStyles = asToken(
  withDesigh({
    Wrapper: withDesigh({
      List: addClasses(...), // Submenu <ul> element.
      WrapperItem: addClasses(...), // Top menu Item (<li>) for the particular submenu. 
    }),
    Item: addClasses(...), // Submenu <li> element.
    Title: addClasses(...), // Submenu title, usually <a> element.
  }),
);
```

Which looks like this with the **new menu API**:
```js
const $withNewSubMenuStyles = asToken(
  addClasses(...), // Top menu Item (<li>) for the particular submenu.
  withDesigh({
    OuterWrapper: addClasses(...), // Top menu Item (<li>) for the particular submenu. Same as addClasses() above. 
    Wrapper: addClasses(...), // Submenu <ul> element.
    Item: addClasses(...), // Submenu <li> element.
    Title: addClasses(...), // Submenu title, usually <a> element.
  }),
);
```

## Updating Burger Menu
There is also no need to separate between the `SimpleBurgerMenu` and the `MegaBurgerMenu`. We can reuse `$asMenuBase` schema from the example above to create our burger menu. 

Here is an **old** example of the Burger menu:
```js
const MegaBurgerMenuBody = flow(
  // `asMegaMenuBreadcrumbSource` is deprecated in the new API. 
  // All menu items are registered as BreadcrumbSource by default.
  asMegaMenuBreadcrumbSource,
  // `asMegaBurgerMenu` is deprecated and replaced with `asBurgerMenu`
  asMegaBurgerMenu,
  withMegaBurgerMenuStyles,
  asStatic,
)(MegaMenuBase);

const MegaBurgerMenu = flow(
  // `Body` design key has been replaced with the `Menu` design key.
  // While you can still use withDesign to provide `Menu` body, it is better
  // to use `withBurgerMenuWrapper` HOC that is exported by `@bodiless/navigation` package.
  withDesign({
    Body: replaceWith(MegaBurgerMenuBody),
  }),
  withBurgerMenuLogo,
  withBurgerMenuStyles,
)(BurgerMenuClean);
```

We can refactor our burger menu with the **new API**:
```js
const BurgerMenu = flow(
  // Menu schema. Usually the same as top menu schema.
  // Same as `$asMenuBase` in the Menu example above.
  $asMenuBase,
  // Wrap top-menu schema in the burger menu chrome.
  withBurgerMenuWrapper,
  $withBurgerMenuStyles,
  asStatic,
)('ul') as ComponentType<any>;
```

#### Burger Menu Context:
The new Burger menu API does not rely on 3rd party library to toggle burger menu visibility. Instead there is a `BurgerMenuContext` that handles toggle. It is **important to note** that for the burger menu to behave correct it has to be inside a `BurgerMenuContext`. There is a `withBurgerMenuProvider` HOC exported from the `@bodiless/navigation` package that can be use to wrap element in `BurgerMenuContext`. Usually it is applied to the top-level container ( `layout` ).

Here is an example:
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

#### Burger Menu Toggler
The button that toggles burger menu visibility is now a standalone element and can be placed anywhere on the page within the `BurgerMenuContext`. There is a `BurgerMenuDefaultToggler` component exported by the `@bodiless/navigation`. It is a stylable component that toggles the burger menu visibility and its icon from `menu` when the burger menu is hidden to `close` when burger menu is visible.
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

#### Overview Link Changes:
There is a `withOverviewLink` helper exported from `@bodiless/navigation` that makes it easier to work with overview links. 

Let's take a look at the **old overview link** example:
```js
const OverviewLinkBase = ({ href, ...rest }) => (<A href={href} {...rest}>Overview</A>);
const OverviewLink = flow(
  addClasses('pl-3'),
)(OverviewLinkBase);

const $withOverviewLink = withDesign({
  Item: addProps({ OverviewLink }),
});

const withSimpleBurgerMenuStyles = flow(
  withSimpleMenuDesign($withOverviewLink),
);
```

In the **new API** it would look like this:
```js
// Create a Token with custom overview link text that can be used by withMenuDesign
const $withOverviewLink = withOverviewLink('Demo Overview Link');

// Create a Token that adds a custom overview link to all submenus.
const $withBurgerMenuStyles = asToken(
  asBurgerMenu('List', 'Columns', 'Cards'),
  withMenuDesign(['List', 'Columns', 'Cards'])($withOverviewLink),
);
```
