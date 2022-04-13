# CX Menu Component

The CX Menu Component provides a generic menu that can used for navigation elements. It extends bodiless menu by wrapping it inside a `<nav>` element to create a clean component:

```tsx
const MenuClean = flowHoc(
  asBodilessMenu(),
  withParent(Nav, 'Nav', 'Menu'),
)(Ul);

```

In the end, the menu is rendered in the following structure:

```tsx
<Nav>
  <Wrapper>
    <Item>
      <Title />
    </Item>
  </Wrapper>
</Nav>
```

The Wrapper is just an `<ul>` element. By using `asBodilessMenu()`, the default MenuClean provides an editable Item list, rendered as `<li>`. The Title inside is just an editable link in the clean component but the base/default tokens provided will replace it with CX MenuTitle.

## Site Builder Details

From a Site Builder perspective, CX Menu is comprised of a token collection (`cxMenu`) and a Menu component (`MenuClean`). You can use the base CX Menu token (`cxMenu.Base`) to provide a menu structure, or use default CX Menu token (`cxMenu.Default`) to provide a menu with submenus structure, or you can even recompose it to meet your site's requirements.

Some recomposed tokens are already provided for CX, like:

- Utility (cxMenu.Utility)
- Footer (cxMenu.Footer)
- TopNav (cxMenu.TopNav)
- Burger (cxMenu.Burger)

### Usage

Using the following code example as a guide, you can add MenuClean into a component slot and then apply base, default, or recomposed tokens to the element.

```tsx
const Header = as(
  // You can compose or create a new customized menu token.
  cxMenu.TopNav,
)(HeaderClean);

const Header: FC = () => (
  <HeaderWrapper>
    <MenuWrapper>
      <Menu />
    </MenuWrapper>
  </HeaderWrapper>
);

export default Header;
```

## Architectural Details

About the tokens provided by CX Menu, here are some differences:

- Base provides basic menu, with no submenu lists
- Default extends Base menu and provides submenu lists
- Utility extends Base menu, applies its own design and accessibility properties, and saves content in different node key (`utility-menu`)
- Footer extends Default menu, replaces default submenu with cxSubMenu.Footer, and applies its own design and accessibility properties
- TopNav extends Default menu, replaces default submenu with cxSubMenu.TopNav, applies its own design, and saves content in different node key (`main-menu`)
- Burger extends Default menu, replaces default submenu with cxSubMenu.Burger, turns the submenus into accordions, applies its own design, and reuses TopNav schema to retrieve TopNav content in the BurgerMenu navigation

To see how these tokens are designed in details, please see:
[`cxMenu.ts`](../src/components/Menu/tokens/cxMenu.ts)
