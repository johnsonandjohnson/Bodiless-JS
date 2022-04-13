# Vital SubMenu Component

The Vital SubMenu Component provides a generic submenu that can used appended to menu components. Similar to Vital Menu, this component provides a Wrapper, rendered as `<ul>`, and applies Vital MenuTitle to the Title inside every Item list (`<li>` element).

## Site Builder Details

From a Site Builder perspective, Vital SubMenu is comprised of a token collection (`vitalSubMenu`) that can appended directly to menus, without providing submenu clean component. You can use the base Vital SubMenu token (`vitalSubMenu.Base`) as it is, or you can recompose it to meet your site's requirements.

Some recomposed tokens are already provided for Vital, like:

- Footer (vitalSubMenu.Footer)
- TopNav (vitalSubMenu.TopNav)
- Burger (vitalSubMenu.Burger)

### Usage

Using the following code example as a guide, you can apply your token along with `withListSubMenu()` in your Menu token.

```tsx
const Menu = as(
  // You can compose or create a new customized submenu token.
  withListSubMenu(),
  withMenuDesign('List')(as(vitalSubMenu.Base)),
)(MenuClean);
```

To see how the SubMenu tokens are designed in details, please see:
[`vitalSubMenu.ts`](../src/components/SubMenu/tokens/vitalSubMenu.ts)
