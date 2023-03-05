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
the default Vital Sub-Menu token (`vitalSubMenu.Default`) as it is, or you can recompose it to meet your
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
  withMenuDesign('List')(as(vitalSubMenu.Default)),
)(MenuClean);
```

To see how the Sub-Menu tokens are designed in detail, please see:
[`vitalSubMenu.ts`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-navigation/src/components/SubMenu/tokens/vitalSubMenu.ts ':target=_blank').

### Add Sub-Menu Indicators

To improve the accessibility of your menu, you may want to activate Sub-Menu Indicators.

Out of the box, Vital Menu Items with Sub-Menus will appear the same as those without. If activated,
Sub-Menu Indicators will provide your users with a visual indicator — which can be styled — marking
Menu Items that contain a Sub-Menu. Additionally, Sub-Menu Indicators help accessibility by having
interactivity with screen readers: they can be clicked on to open the Sub-Menu, as opposed to
opening the Sub-Menu via hovering. This also means that users can _tab_ through the Menu, and open
and close Sub-Menus, with their keyboard.

To activate Sub-Menu Indicators:

01. Open
    [`vital-navigation/src/components/SubMenu/tokens/vitalSubMenu.ts`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-navigation/src/components/SubMenu/tokens/vitalSubMenu.ts
    ':target=_blank'), and comment out (or remove) the following line:
    ```ts
    SubmenuIndicator: replaceWith(() => null),
    ```
01. Create style tokens as needed by your site's design requirements.
    - The Sub-Menu indicator is added via `asListSubMenu` by `asAccessibleSubMenu`.
      - See:
        [`bodiless-navigation/src/Menu/Menu.token.tsx`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/bodiless-navigation/src/Menu/Menu.token.tsx
        ':target=blank')

?> **Note:** These Sub-Menu Indicators, when activated as described, are only for the top navigation
menu; they will not be present in other menus.

### Allow Parent Menu Item Links

By default, no (parent) Vital Menu Item with children can be a Link; i.e., if you add a Sub-Menu to
a Menu Item, the Menu Item cannot then be a Link. If you add a Sub-Menu to a Menu Item after having
already added a Menu Link, the Menu Link will become disabled; it will re-enable if you delete all
the Sub-Menu Items.

To change this behavior, and permit Content Editors to add Menu Links to Menu Items with Sub-Menus,
open
[`vital-navigation/src/components/Menu/tokens/vitalMenu.ts`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-navigation/src/components/Menu/tokens/vitalMenu.ts
':target=blank'), and find the following line:

```ts
Title: flowIf(useHasSubMenu)(as(vitalMenuTitle.WithLinkDisabled)),
```

You should find this line in the `TopNav` and `Burger` tokens, under their `Behavior` property —
comment out (or remove) the line from both tokens.
