# CX BurgerMenu Component

The CX BurgerMenu Component provides a triggerable navigation menu for Mobile and Tablet devices only, composed by the following elements:

- MenuToggler
- Menu (Main)
- WhereToBuy Button
- UtilityMenu
- LanguageButton
- Overlay

The MenuToggler inside the BurgerMenu component is just an icon link to close the burger menu and it is closed by default. For opening it, another icon link has to be added to another component slot, like in the Header from `bodiless/cx-layout` package. Both links components are transformed into a toggler by reusing `asBurgerMenuToggler` HOC to update the React state through `withBurgerMenuProvider`, which needs to be added around the BurgerMenu component, like in a page layout.

The Main Menu content is the same as the Top Navigation Menu on Desktop. We also apply the same WhereToBuy, UtilityMenu, and LanguageButton, compoments from Desktop Top Nav, but following a different order for the BurgerMenu.

The Overlay is an empty div, defined as a sibling for the BurgerMenu wrapper, and it is necessary to provide a background layer for the BurgerMenu as it is opened. That layer is blur and requires some tailwind customizations with filter backdrop to achieve the desired design. By default, it is not possible to see the Overlay on Mobile since the BurgerMenu is full width, but it is visible on Tablet once it takes place only in part of the screen.

## Content Editor Details

There is no way to edit BurgerMenu components (we are adding `asStatic` to the whole component to make sure it is not editable). The components are editable on Desktop though.

## Site Builder Details

From a Site Builder perspective, CX BurgerMenu is comprised of a token collection (`cxBurgerMenu`) and a BurgerMenu component (`BurgerMenuClean`). You can use the default CX Header token (`cxBurgerMenu.Default`) as is, or you can recompose it to meet your site's requirements.

### Usage

Using the following code example as a guide, you can insert BurgerMenu into a component slot, like a Header, using default tokens. The order inside the component in which the BurgerMenu is inserted does not really matter since its own default token makes it full screen in both x and y axis.

```tsx
const Header = as(
  // You can compose or create a new customized burger menu token.
  cxBurgerMenu.Default,
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

CX BurgerMenu provides a `<div>` element wrapper around its internal elements, except for the Overlay, which is sibling. For almost all internal elements, wrappers are also provided so developers can customize it to meet design's specific requirements:

- MenuTogglerWrapper and MenuWrapper are `<div>` elements by default
- WhereToBuyWrapper and UtilityMenuWrapper are React Fragments that can be replaced by divs if needed
- Other wrappers are also provided, like FooterWrapper which wraps elements at the bottom of screen.

To see how these elements are structured in details, please see:
[`BurgerMenuClean.tsx`](../src/components/BurgerMenu/BurgerMenuClean.tsx)
