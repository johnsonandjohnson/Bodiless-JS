# CX MenuTitle Component

The CX MenuTitle Component extends Bodiless MenuTitle to apply CX Editors and Link.

## Site Builder Details

From a Site Builder perspective, CX MenuTitle is comprised of a token collection (`cxMenuTitle`) and a MenuTitle component (`MenuTitleClean`). You can use the default CX MenuTitle token (`cxMenuTitle.Default`) as is, or you can recompose it to meet your site's requirements.

### Usage

```tsx
const Menu = as(
  // You can compose or create a new customized menu token.
  on(MenuTitleClean)(cxMenuTitle.Default)
)(MenuClean);
```

To see how the MenuTitle tokens are designed in details, please see:
[`cxMenuTitle.ts`](../src/components/MenuTitle/tokens/cxMenuTitle.ts)
