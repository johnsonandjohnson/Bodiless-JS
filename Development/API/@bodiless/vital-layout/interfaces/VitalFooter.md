[@bodiless/vital-layout](../README.md) / VitalFooter

# Interface: VitalFooter

Tokens for the vital footer

**`see`** [FooterClean](../README.md#footerclean)

## Table of contents

### Properties

- [Default](VitalFooter.md#default)
- [WithRewardsExpanding2XL](VitalFooter.md#withrewardsexpanding2xl)

## Properties

### Default

• **Default**: `TokenSpec`<[`FooterComponents`](FooterComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Inherits from Base

**`example`** Will remove Menu components
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

[vital-layout/src/components/Footer/tokens/vitalFooter.ts:117](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8924e8534/packages/vital-layout/src/components/Footer/tokens/vitalFooter.ts#L117)

___

### WithRewardsExpanding2XL

• **WithRewardsExpanding2XL**: `TokenSpec`<[`FooterComponents`](FooterComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

An extendable token to move rewards above footer on 2xl responsive viewports

#### Defined in

[vital-layout/src/components/Footer/tokens/vitalFooter.ts:121](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8924e8534/packages/vital-layout/src/components/Footer/tokens/vitalFooter.ts#L121)
