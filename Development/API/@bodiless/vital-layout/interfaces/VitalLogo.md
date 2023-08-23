[@bodiless/vital-layout](../README.md) / VitalLogo

# Interface: VitalLogo

Tokens for the vital logo

**`See`**

[[HeaderClean]]

## Table of contents

### Properties

- [Default](VitalLogo.md#default)

## Properties

### Default

• **Default**: `TokenSpec`<[`LogoComponents`](LogoComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Default adds vital specific design reqirements.

**`Example`**

Will override the layout domain of logo and apply diffent styling.
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

[vital-layout/src/components/Logo/tokens/vitalLogo.ts:82](https://github.com/johnsonandjohnson/Bodiless-JS/blob/c5fa43c72/packages/vital-layout/src/components/Logo/tokens/vitalLogo.ts#L82)
