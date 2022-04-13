# Vital MenuTitle Component

The Vital MenuTitle Component extends Bodiless MenuTitle to apply Vital Editors and Link.

## Site Builder Details

From a Site Builder perspective, Vital MenuTitle is comprised of a token collection (`vitalMenuTitle`) and a MenuTitle component (`MenuTitleClean`). You can use the default Vital MenuTitle token (`vitalMenuTitle.Default`) as is, or you can recompose it to meet your site's requirements.

### Usage

```tsx
const Menu = as(
  // You can compose or create a new customized menu token.
  on(MenuTitleClean)(vitalMenuTitle.Default)
)(MenuClean);
```

To see how the MenuTitle tokens are designed in details, please see:
[`vitalMenuTitle.ts`](../src/components/MenuTitle/tokens/vitalMenuTitle.ts)
