[@bodiless/vital-layout](../README.md) / VitalHelmet

# Interface: VitalHelmet

Tokens for the vital helmet

**`see`** [HelmetClean](../README.md#helmetclean)

## Table of contents

### Properties

- [Default](VitalHelmet.md#default)
- [WithDesktopStaticBody](VitalHelmet.md#withdesktopstaticbody)
- [WithFixedBody](VitalHelmet.md#withfixedbody)

## Properties

### Default

• **Default**: `TokenSpec`<[`HelmetComponents`](HelmetComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Defines the default vital helmet with SEO, Share & Meta tokens.

**`example`** Sets the html `lang` and changes the html font & color for entire page
```js
import { vitalHelmetBase, asHelmetToken } from '@bodiless/vital-layout';
import { withLangDirProps } from '@bodiless/i18n';
import { as, addProps } from '@bodiless/fclasses';

const Default = asHelmetToken(vitalHelmetBase.Default, {
  Core: {
    LanguageHelmet: withLangDirProps,
  },
  Theme: {
    HTMLHelmet: 'font-Inter text-gray-600',
  },
});

export default {
  ...vitalHelmetBase,
  Default,
};
```

#### Defined in

[vital-layout/src/components/Helmet/tokens/vitalHelmet.ts:81](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8f5687376/packages/vital-layout/src/components/Helmet/tokens/vitalHelmet.ts#L81)

___

### WithDesktopStaticBody

• **WithDesktopStaticBody**: `TokenSpec`<[`HelmetComponents`](HelmetComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

WithDesktopStaticBody token applies static position on body.

#### Defined in

[vital-layout/src/components/Helmet/tokens/vitalHelmet.ts:85](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8f5687376/packages/vital-layout/src/components/Helmet/tokens/vitalHelmet.ts#L85)

___

### WithFixedBody

• **WithFixedBody**: `TokenSpec`<[`HelmetComponents`](HelmetComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

WithFixedBody token applies fixed position on body to prevent scrolling.

#### Defined in

[vital-layout/src/components/Helmet/tokens/vitalHelmet.ts:89](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8f5687376/packages/vital-layout/src/components/Helmet/tokens/vitalHelmet.ts#L89)
