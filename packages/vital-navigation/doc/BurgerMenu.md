# Vital Burger Menu Component

The Vital Burger Menu (`BurgerMenu`) Component provides a triggerable navigation menu for Mobile and
Tablet devices only, composed of the following elements:

- MenuToggler
- Menu (Main)
- WhereToBuy Button
- UtilityMenu
- LanguageButton
- Overlay

The `MenuToggler` inside the `BurgerMenu` component is an icon link to close the Burger Menu (which
is closed by default). For opening it, another icon link has to be added to another component slot,
like in the Header from the `bodiless/vital-layout` package. Both links components are transformed
into a toggler by reusing `asBurgerMenuToggler` HOC to update the React state through
`withBurgerMenuProvider`, which needs to be added around the `BurgerMenu` component, like in a page
layout.

The Main Menu content is the same as the Top Navigation Menu on Desktop. We also apply the same
`WhereToBuy`, `UtilityMenu`, and `LanguageButton` components from Desktop Top Nav, but following a
different order for the Burger Menu.

The Overlay is an empty `<div>`, defined as a sibling for the `BurgerMenu` wrapper, and it is
necessary to provide a background layer for the `BurgerMenu` as it is opened. On Tablet, the Burger
Menu only covers a partial portion of the site, and the site itself is blurred to prevent user
interaction with it. The blur effect is done using [Backdrop
Blur](https://tailwindcss.com/docs/backdrop-blur ':target=_blank'), and is customized to your design
requirements. On Mobile, the Burger Menu uses the full width of the viewport.

## Content Editor Details

There is no way to edit `BurgerMenu` components (we are adding `asStatic` to the whole component to
make sure it is not editable). The components are editable on the Desktop menu, however.

## Site Builder Details

From a Site Builder perspective, Vital Burger Menu is comprised of a token collection
(`vitalBurgerMenu`) and a Burger Menu component (`BurgerMenuClean`). You can use the default Vital
Header token (`vitalBurgerMenu.Default`) as is, or you can recompose it to meet your site's
requirements.

### Usage

Using the following code example as a guide, you can insert `BurgerMenu` into a component slot, like
a Header, using default tokens. The order inside the component in which the `BurgerMenu` is inserted
does not really matter since its own default token makes it full-screen in both _x_ and _y_ axes.

```tsx
const Header = as(
  // You can compose or create a new customized burger menu token.
  vitalBurgerMenu.Default,
)(HeaderClean);

const Header: FC = () => (
  <HeaderWrapper>
    <Header />
    <BurgerMenuWrapper>
      <BurgerMenu />
    </BurgerMenuWrapper>
  </HeaderWrapper>
);

export default Header;
```

## Architectural Details

Vital Burger Menu provides a `<div>` element wrapper around its internal elements — except for the
Overlay, which is a sibling. For almost all internal elements, wrappers are also provided, so
developers can customize it to meet their site-design's specific requirements:

- `MenuTogglerWrapper` and `MenuWrapper` are `<div>` elements by default.
- `WhereToBuyWrapper` and `UtilityMenuWrapper` are React Fragments that can be replaced by `<div>`s,
  if needed.
- Other wrappers are also provided, like `FooterWrapper`, which wraps elements at the bottom of the
  screen.

To see how these elements are structured in detail, please see:
[`BurgerMenuClean.tsx`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-navigation/src/components/BurgerMenu/BurgerMenuClean.tsx ':target=_blank').
