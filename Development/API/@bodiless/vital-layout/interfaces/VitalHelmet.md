[@bodiless/vital-layout](../README.md) / VitalHelmet

# Interface: VitalHelmet

Tokens for the vital helmet

**`see`** [HelmetClean](../README.md#helmetclean)

## Table of contents

### Properties

- [Base](VitalHelmet.md#base)
- [Default](VitalHelmet.md#default)
- [WithDesktopStaticBody](VitalHelmet.md#withdesktopstaticbody)
- [WithFixedBody](VitalHelmet.md#withfixedbody)

## Properties

### Base

• **Base**: `TokenSpec`<[`HelmetComponents`](HelmetComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Base applies the SEO, Share, GA4 helmets

#### Defined in

[vital-layout/src/components/Helmet/tokens/vitalHelmet.ts:63](https://github.com/johnsonandjohnson/Bodiless-JS/blob/38970844d/packages/vital-layout/src/components/Helmet/tokens/vitalHelmet.ts#L63)

___

### Default

• **Default**: `TokenSpec`<[`HelmetComponents`](HelmetComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Inherits from Base and adds in vitalds theming

**`example`** Sets the html `lang` and changes the html font & color for entire page
```js
import { vitalHelmetBase, asHelmetToken } from '@bodiless/vital-layout';
import { withLangDirProps } from '@bodiless/i18n';
import { as, addProps } from '@bodiless/fclasses';

const Default = asHelmetToken(vitalHelmetBase.Base, {
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

[vital-layout/src/components/Helmet/tokens/vitalHelmet.ts:88](https://github.com/johnsonandjohnson/Bodiless-JS/blob/38970844d/packages/vital-layout/src/components/Helmet/tokens/vitalHelmet.ts#L88)

___

### WithDesktopStaticBody

• **WithDesktopStaticBody**: `TokenSpec`<[`HelmetComponents`](HelmetComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

WithDesktopStaticBody token applies static position on body.

#### Defined in

[vital-layout/src/components/Helmet/tokens/vitalHelmet.ts:92](https://github.com/johnsonandjohnson/Bodiless-JS/blob/38970844d/packages/vital-layout/src/components/Helmet/tokens/vitalHelmet.ts#L92)

___

### WithFixedBody

• **WithFixedBody**: `TokenSpec`<[`HelmetComponents`](HelmetComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

WithFixedBody token applies fixed position on body to prevent scrolling.

#### Defined in

[vital-layout/src/components/Helmet/tokens/vitalHelmet.ts:96](https://github.com/johnsonandjohnson/Bodiless-JS/blob/38970844d/packages/vital-layout/src/components/Helmet/tokens/vitalHelmet.ts#L96)
