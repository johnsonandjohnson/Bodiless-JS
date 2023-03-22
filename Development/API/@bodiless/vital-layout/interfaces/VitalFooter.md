[@bodiless/vital-layout](../README.md) / VitalFooter

# Interface: VitalFooter

Tokens for the vital footer

**`see`** [FooterClean](../README.md#footerclean)

## Table of contents

### Properties

- [Base](VitalFooter.md#base)
- [Default](VitalFooter.md#default)
- [FooterWithRewards](VitalFooter.md#footerwithrewards)
- [WithRewardsExpanding2XL](VitalFooter.md#withrewardsexpanding2xl)

## Properties

### Base

• **Base**: `TokenSpec`<[`FooterComponents`](FooterComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Base applies the following:
- Footer Menu
- Copyright row (with copyright editor & social links)

#### Defined in

[vital-layout/src/components/Footer/tokens/vitalFooter.ts:106](https://github.com/johnsonandjohnson/Bodiless-JS/blob/77abc63fa/packages/vital-layout/src/components/Footer/tokens/vitalFooter.ts#L106)

___

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

[vital-layout/src/components/Footer/tokens/vitalFooter.ts:131](https://github.com/johnsonandjohnson/Bodiless-JS/blob/77abc63fa/packages/vital-layout/src/components/Footer/tokens/vitalFooter.ts#L131)

___

### FooterWithRewards

• **FooterWithRewards**: `TokenSpec`<[`FooterComponents`](FooterComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Token that extends base with to move rewards above footer on 2xl responsive viewports

#### Defined in

[vital-layout/src/components/Footer/tokens/vitalFooter.ts:135](https://github.com/johnsonandjohnson/Bodiless-JS/blob/77abc63fa/packages/vital-layout/src/components/Footer/tokens/vitalFooter.ts#L135)

___

### WithRewardsExpanding2XL

• **WithRewardsExpanding2XL**: `TokenSpec`<[`FooterComponents`](FooterComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

An extendable token to move rewards above footer on 2xl responsive viewports

#### Defined in

[vital-layout/src/components/Footer/tokens/vitalFooter.ts:139](https://github.com/johnsonandjohnson/Bodiless-JS/blob/77abc63fa/packages/vital-layout/src/components/Footer/tokens/vitalFooter.ts#L139)
