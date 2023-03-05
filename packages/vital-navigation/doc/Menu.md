# Vital Menu Component

![Menu with Sub-Menu](../assets/MenuWithSubMenu.jpg ':size=50%')

The Vital Menu Component provides a generic menu that can used for navigation elements. It extends
[Bodiless Menu](/Components/Navigation/Menu) by wrapping it inside a `<nav>` element to create a
clean component:

```tsx
const MenuClean = flowHoc(
  asBodilessMenu(),
  withParent(Nav, 'Nav', 'Menu'),
)(Ul);
```

In the end, the menu is rendered with the following structure:

```tsx
<Nav>
  <Wrapper>
    <Item>
      <Title />
    </Item>
  </Wrapper>
</Nav>
```

The Wrapper is an `<ul>` element. By using `asBodilessMenu()`, the default `MenuClean` provides an
editable Item list, rendered as `<li>`. The Title inside is just an editable link in the clean
component, but the base/default tokens provided will replace it with Vital MenuTitle.

## Content Editor Details

Where made available by a Site Builder, you can add Menu Items to the Menu. Once added, you can:

- [Add a Menu Title](./MenuTitle#addedit-menu-title);
- [Add a Menu Link](#add-a-menu-link); and
- [Add a Sub-Menu](./Sub-Menu#add-a-sub-menu).

![Main Menu Item context menu](../assets/MainMenuItemContextMenu.jpg ':size=50%')

### Add a Main Menu Item

01. While in [Edit Mode](/ContentEditorUserGuide/#edit-mode), select the Menu Item _preceding_ where
    you'd like to add a new Menu Item, and, within its context menu, under "Main Menu Item," click
    **Add**.
01. A new Menu Item will appear, and you can:
    - [Add a Menu Title](./MenuTitle#addedit-menu-title);
    - [Add a Menu Link](#add-a-menu-link); and
    - [Add a Sub-Menu](./Sub-Menu#add-a-sub-menu).

<!-- Inlining HTML to add multi-line info block with ordered list and disclosure widget. -->
<div class="warn">
  <strong>Note:</strong> Because Menu Items can only be added to a position following an existing
  Menu Item, and can't be repositioned, you can't <em>simply</em> add a Menu Item to the first
  position of a Menu if one is already positioned there.
  <br><br>
  <details>
  <summary>
    Expand for details on adding a Menu Item to the first position of a Menu...
  </summary>

  01. Select the existing Menu Item in the first position, and, within its context menu, under "Main
      Menu Item," click **Add**.
  01. Customize the new Menu Item as desired — this will become the Menu Item in the first position.
  01. Select the newly added Menu Item, and add another Menu Item.
  01. Customize this new Menu Item (currently in the third position) to be a copy of the Menu Item
      currently in the first position.
      - This includes the Menu Title, the Menu Link (if applicable), and Sub-Menu Items (if
        applicable).
  01. Select the Menu Item in the first position, and, within its context menu, under "Main Menu
      Item," click **Delete**.

  You should now have the desired Menu Item in the first position of the Menu, with a copy of the
  previous first position Menu Item now in the second position.

  </details>

</div>

### Add a Menu Link

To add a Link to a Menu Item:

01. While in [Edit Mode](/ContentEditorUserGuide/#edit-mode), select a Menu Item, and, within its
    context menu, under "Menu Link," click **Edit**.
01. Follow the instructions to [add a Link to a
    component](/Components/Link/#add-a-link-to-a-component).

?> **Note:** By default, no (parent) Vital Menu Item with children can be a Link; i.e., if you add a
Sub-Menu to a Menu Item, the Menu Item cannot then be a Link. If you add a Sub-Menu to a Menu Item
after having already added a Menu Link, the Menu Link will become disabled; it will re-enable if you
delete all the Sub-Menu Items.
<br><br>
If you need this behavior changed, contact a Site Builder about [allowing parent Menu Item
Links](./Sub-Menu#allow-parent-menu-item-links).

## Site Builder Details

From a Site Builder perspective, Vital Menu is comprised of a token collection (`vitalMenu`) and a
Menu component (`MenuClean`). You can use the default Vital Menu token (`vitalMenu.Default`) to provide a
menu structure, or use the default Vital Menu token (`vitalMenu.Default`) to provide a menu with a
submenus structure, or you can even recompose it to meet your site's requirements.

Some recomposed tokens are already provided for Vital, such as:

- `Utility` (`vitalMenu.Utility`)
- `Footer` (`vitalMenu.Footer`)
- `TopNav` (`vitalMenu.TopNav`)
- `Burger` (`vitalMenu.Burger`)

### Usage

Using the following code example as a guide, you can add `MenuClean` into a component slot and then
apply base, default, or recomposed tokens to the element.

```tsx
const Header = as(
  // You can compose or create a new customized menu token.
  vitalMenu.TopNav,
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

Regarding the tokens provided by Vital Menu, here are some differences:

- `Base` provides a basic menu, with no submenu lists.
- `Default` extends Base menu and provides submenu lists.
- `Utility` extends Base menu, applies its own design and accessibility properties, and saves
  content in a different node key (`utility-menu`).
- `Footer` extends Default menu, replaces the default submenu with `vitalSubMenu.Footer`, and
  applies its own design and accessibility properties.
- `TopNav` extends Default menu, replaces default submenu with `vitalSubMenu.TopNav`, applies its
  own design, and saves content in a different node key (`main-menu`).
- `Burger` extends Default menu, replaces default submenu with `vitalSubMenu.Burger`, turns the
  submenus into accordions, applies its own design, and reuses `TopNav` schema to retrieve `TopNav`
  content in the `BurgerMenu` navigation.

To see how these tokens are designed in detail, please see:
[`vitalMenu.ts`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-navigation/src/components/Menu/tokens/vitalMenu.ts ':target=_blank').
