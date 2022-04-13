# CX SubMenu Component

The CX SubMenu Component provides a generic submenu that can used appended to menu components. Similar to CX Menu, this component provides a Wrapper, rendered as `<ul>`, and applies CX MenuTitle to the Title inside every Item list (`<li>` element).

## Site Builder Details

From a Site Builder perspective, CX SubMenu is comprised of a token collection (`cxSubMenu`) that can appended directly to menus, without providing submenu clean component. You can use the base CX SubMenu token (`cxSubMenu.Base`) as it is, or you can recompose it to meet your site's requirements.

Some recomposed tokens are already provided for CX, like:

- Footer (cxSubMenu.Footer)
- TopNav (cxSubMenu.TopNav)
- Burger (cxSubMenu.Burger)

### Usage

Using the following code example as a guide, you can apply your token along with `withListSubMenu()` in your Menu token.

```tsx
const Menu = as(
  // You can compose or create a new customized submenu token.
  withListSubMenu(),
  withMenuDesign('List')(as(cxSubMenu.Base)),
)(MenuClean);
```

To see how the SubMenu tokens are designed in details, please see:
[`cxSubMenu.ts`](../src/components/SubMenu/tokens/cxSubMenu.ts)
