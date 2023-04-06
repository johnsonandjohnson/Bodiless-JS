[@bodiless/vital-layout](../README.md) / VitalHeader

# Interface: VitalHeader

Tokens for the vital header

**`see`** [HeaderClean](../README.md#headerclean)

## Table of contents

### Properties

- [Base](VitalHeader.md#base)
- [Default](VitalHeader.md#default)
- [WithLanguageSelector](VitalHeader.md#withlanguageselector)

## Properties

### Base

• **Base**: `TokenSpec`<[`HeaderComponents`](HeaderComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Base applies the following as defaults:
- Logo
- Togglers: BurgerMenu, Search
- Defines the components: Logo, Menu, BurgerMenu, Search, WhereToBuy

#### Defined in

[vital-layout/src/components/Header/tokens/vitalHeader.ts:107](https://github.com/johnsonandjohnson/Bodiless-JS/blob/38970844d/packages/vital-layout/src/components/Header/tokens/vitalHeader.ts#L107)

___

### Default

• **Default**: `TokenSpec`<[`HeaderComponents`](HeaderComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Inherits Base

**`example`** Will remove Search components & Where to Buy components
```js
import { vitalHeaderBase, asHeaderToken, } from '@bodiless/vital-layout';
import { replaceWith } from '@bodiless/fclasses';

const Default = asHeaderToken({
  ...vitalHeaderBase.Default,
  Components: {
    ...vitalHeaderBase.Default.Components,
    DesktopSearch: replaceWith(() => null),
    MobileSearch: replaceWith(() => null),
    WhereToBuy: replaceWith(() => null),
    SearchToggler: replaceWith(() => null),
  },
}),

export default {
  ...vitalHeaderBase,
  Default,
};
```

#### Defined in

[vital-layout/src/components/Header/tokens/vitalHeader.ts:133](https://github.com/johnsonandjohnson/Bodiless-JS/blob/38970844d/packages/vital-layout/src/components/Header/tokens/vitalHeader.ts#L133)

___

### WithLanguageSelector

• **WithLanguageSelector**: `TokenSpec`<[`HeaderComponents`](HeaderComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Extendable token that adds language selector

#### Defined in

[vital-layout/src/components/Header/tokens/vitalHeader.ts:137](https://github.com/johnsonandjohnson/Bodiless-JS/blob/38970844d/packages/vital-layout/src/components/Header/tokens/vitalHeader.ts#L137)
