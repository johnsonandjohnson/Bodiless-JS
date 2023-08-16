[@bodiless/vital-layout](../README.md) / VitalFooter

# Interface: VitalFooter

Tokens for the vital footer

**`See`**

[[FooterClean]]

## Table of contents

### Properties

- [Default](VitalFooter.md#default)
- [WithRewardsExpanding2XL](VitalFooter.md#withrewardsexpanding2xl)

## Properties

### Default

• **Default**: `TokenSpec`<[`FooterComponents`](FooterComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Inherits from Base

**`Example`**

Will remove Menu components
```js
import { vitalFooterBase, asFooterToken, } from '@bodiless/vital-layout';
import { replaceWith } from '@bodiless/fclasses';

const Default = asFooterToken({
  ...vitalFooterBase.Default,
  Components: {
    ...vitalFooterBase.Default.Components,
    FooterMenuWrapper: replaceWith(() => null),
    FooterMenu: replaceWith(() => null),
    MenuRow: replaceWith(() => null),
  },
}),

export default {
  ...vitalFooterBase,
  Default,
};
```

#### Defined in

[vital-layout/src/components/Footer/tokens/vitalFooter.ts:120](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8d49bea45/packages/vital-layout/src/components/Footer/tokens/vitalFooter.ts#L120)

___

### WithRewardsExpanding2XL

• **WithRewardsExpanding2XL**: `TokenSpec`<[`FooterComponents`](FooterComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

An extendable token to move rewards above footer on 2xl responsive viewports

#### Defined in

[vital-layout/src/components/Footer/tokens/vitalFooter.ts:124](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8d49bea45/packages/vital-layout/src/components/Footer/tokens/vitalFooter.ts#L124)
