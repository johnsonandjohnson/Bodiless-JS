# Vital Sub-Menu Component

![Menu with Sub-Menu](../assets/MenuWithSubMenu.jpg ':size=50%')

The Vital Sub-Menu Component provides a generic submenu that can be appended to menu components.
Similar to [Vital Menu](./Menu), this component provides a Wrapper, rendered as `<ul>`, and applies
Vital `MenuTitle` to the Title inside every Item list (`<li>`) element.

## Content Editor Details

### Add a Sub-Menu

01. While in [Edit Mode](/ContentEditorUserGuide/#edit-mode), select the Menu Item you'd like to add
    a Sub-Menu to, and, within its context menu, under "Main Menu Item," click **Sub**.
01. A Sub-Menu with a Sub-Menu Item will be created, and you can:
    - Add a title to the Sub-Menu Item, in the same way you would [Add a Menu
      Title](./MenuTitle#addedit-menu-title) to a Menu Item;
    - [Add a Menu Link](#add-a-menu-link); and
    - [Add a Sub-Menu Item](#add-a-sub-menu-item).

### Add a Sub-Menu Item

01. While in [Edit Mode](/ContentEditorUserGuide/#edit-mode), select the Sub-Menu Item _above_ where
    you'd like to add a new Sub-Menu Item, and, within its context menu, under "Sub-Menu Item,"
    click **Add**.  
    ![Sub-Menu Item context menu](../assets/SubMenuItemContextMenu.jpg ':size=67%')
01. A new Sub-Menu Item will appear, and you can:
    - Add a title to the Sub-Menu Item, in the same way you would [Add a Menu
      Title](./MenuTitle#addedit-menu-title); and
    - [Add a Menu Link](#add-a-menu-link).

<!-- Inlining HTML to add multi-line info block with ordered list and disclosure widget. -->
<div class="warn">
  <strong>Note:</strong> Because Sub-Menu Items can only be added to a position below an
  existing Sub-Menu Item, and can't be repositioned, you can't <em>simply</em> add a Sub-Menu Item
  to the first (top) position of a Sub-Menu if one is already positioned there.
  <br><br>
  <details>
  <summary>
    Expand for details on adding a Sub-Menu Item to the first (top) position of a Sub-Menu...
  </summary>

  01. Select the existing Sub-Menu Item in the first position, and, within its context menu, under
      "Sub-Menu Item," click **Add**.
  01. Customize the new Sub-Menu Item as desired — this will become the Sub-Menu Item in the first
      position.
  01. Select the newly added Sub-Menu Item, and add another Sub-Menu Item.
  01. Customize this new Sub-Menu Item (currently in the third position) to be a copy of the
      Sub-Menu Item currently in the first position.
      - This includes the (Sub-)Menu Title and the Menu Link.
  01. Select the Sub-Menu Item in the first position, and, within its context menu, under "Sub-Menu
      Item," click **Delete**.

  You should now have the desired Sub-Menu Item in the first (top) position of the Sub-Menu, with a
  copy of the previous first position Sub-Menu Item now in the second position.

  </details>

</div>

### Add a Menu Link

To add a Link to a Sub-Menu Item:

01. While in [Edit Mode](/ContentEditorUserGuide/#edit-mode), select a Sub-Menu Item, and, within
    its context menu, under "Menu Link," click **Edit**.
01. Follow the instructions to [add a Link to a
    component](/Components/Link/#add-a-link-to-a-component).

## Site Builder Details

From a Site Builder perspective, Vital Sub-Menu is comprised of a token collection (`vitalSubMenu`)
that can be appended directly to menus, without providing a Sub-Menu clean component. You can use
the base Vital Sub-Menu token (`vitalSubMenu.Base`) as it is, or you can recompose it to meet your
site's requirements.

Some recomposed tokens are already provided for Vital, such as:

- `Footer` (`vitalSubMenu.Footer`)
- `TopNav` (`vitalSubMenu.TopNav`)
- `Burger` (`vitalSubMenu.Burger`)

### Usage

Using the following code example as a guide, you can apply your token along with `withListSubMenu()`
in your Menu token.

```tsx
const Menu = as(
  // You can compose or create a new customized submenu token.
  withListSubMenu(),
  withMenuDesign('List')(as(vitalSubMenu.Base)),
)(MenuClean);
```

To see how the Sub-Menu tokens are designed in detail, please see:
[`vitalSubMenu.ts`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-navigation/src/components/SubMenu/tokens/vitalSubMenu.ts ':target=_blank').
