[@bodiless/vital-layout](../README.md) / VitalLayout

# Interface: VitalLayout

Tokens for the vital layout

**`See`**

[[LayoutClean]]

## Table of contents

### Properties

- [Default](VitalLayout.md#default)
- [StyleGuide](VitalLayout.md#styleguide)

## Properties

### Default

• **Default**: `TokenSpec`<[`LayoutComponents`](LayoutComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Inherits from Base & assigns the components vitalHeader.Default & vitalFooter.FootWithRewards

**`Example`**

Override default to use custom Footer.
```js
import { asLayoutToken, vitalHeader, vitalLayoutBase } from '@bodiless/vital-layout';
import asMyFooter from '../../../components/Footer';

const Default = asLayoutToken(vitalLayoutBase.Default, {
  Components: {
    Header: vitalHeader.Default,
    Footer: asMyFooter,
  },
});

export default {
  ...vitalLayoutBase,
  Default,
};
```

**`Example`**

override the Skip To Main content with language specific
```js
import { vitalLayoutBase, asLayoutToken } from '@bodiless/vital-layout';
import { addProps, as } from '@bodiless/fclasses';

const Default = asLayoutToken(vitalLayoutBase.Default, {
  Behavior: {
    SkipToMainContent: as(
      addProps({
        children: 'Passer au contenu principal',
      }),
    ),
  },
});

export default {
  ...vitalLayoutBase,
  Default,
};
```

#### Defined in

[vital-layout/src/components/Layout/tokens/vitalLayout.ts:126](https://github.com/johnsonandjohnson/Bodiless-JS/blob/e22f7895e/packages/vital-layout/src/components/Layout/tokens/vitalLayout.ts#L126)

___

### StyleGuide

• **StyleGuide**: `TokenSpec`<[`LayoutComponents`](LayoutComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Special layout to demonstrate components.  Only used for testing purposing.

#### Defined in

[vital-layout/src/components/Layout/tokens/vitalLayout.ts:130](https://github.com/johnsonandjohnson/Bodiless-JS/blob/e22f7895e/packages/vital-layout/src/components/Layout/tokens/vitalLayout.ts#L130)
