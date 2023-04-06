[@bodiless/vital-layout](../README.md) / VitalLogo

# Interface: VitalLogo

Tokens for the vital logo

**`see`** [HeaderClean](../README.md#headerclean)

## Table of contents

### Properties

- [Base](VitalLogo.md#base)
- [Default](VitalLogo.md#default)

## Properties

### Base

• **Base**: `TokenSpec`<[`LogoComponents`](LogoComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Base makes a clickable image:

#### Defined in

[vital-layout/src/components/Logo/tokens/vitalLogo.ts:65](https://github.com/johnsonandjohnson/Bodiless-JS/blob/ad864af6f/packages/vital-layout/src/components/Logo/tokens/vitalLogo.ts#L65)

___

### Default

• **Default**: `TokenSpec`<[`LogoComponents`](LogoComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Default adds vital specific design reqirements.

**`example`** Will override the layout domain of logo and apply diffent styling.
```js
import { vitalLogoBase, asLogoToken } from '@bodiless/vital-layout';

const Default = asLogoToken({
  ...vitalLogoBase.Default,
  Layout: {
     Image: 'h-16 max-w-15',
  },
}),

export default {
  ...vitalLogoBase,
  Default,
};
```

#### Defined in

[vital-layout/src/components/Logo/tokens/vitalLogo.ts:86](https://github.com/johnsonandjohnson/Bodiless-JS/blob/ad864af6f/packages/vital-layout/src/components/Logo/tokens/vitalLogo.ts#L86)
