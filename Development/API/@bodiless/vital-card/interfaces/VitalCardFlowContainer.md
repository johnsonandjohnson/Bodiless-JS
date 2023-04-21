[@bodiless/vital-card](../README.md) / VitalCardFlowContainer

# Interface: VitalCardFlowContainer

Tokens for the vital card flow container

## Table of contents

### Properties

- [WithBasicVariations](VitalCardFlowContainer.md#withbasicvariations)
- [WithCardVariations](VitalCardFlowContainer.md#withcardvariations)
- [WithCategoryVariations](VitalCardFlowContainer.md#withcategoryvariations)
- [WithHeroVariations](VitalCardFlowContainer.md#withherovariations)
- [WithProductVariations](VitalCardFlowContainer.md#withproductvariations)
- [WithTopicVariations](VitalCardFlowContainer.md#withtopicvariations)

## Properties

### WithBasicVariations

• **WithBasicVariations**: `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which adds basic card variations.
Defined by Fully clickable card with no visible CTA varied over
 - Orientation Properties
 - Content Varitions

#### Defined in

[vital-card/src/components/FlowContainer/tokens/vitalCardFlowContainer.ts:217](https://github.com/johnsonandjohnson/Bodiless-JS/blob/908947acb/packages/vital-card/src/components/FlowContainer/tokens/vitalCardFlowContainer.ts#L217)

___

### WithCardVariations

• **WithCardVariations**: `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which adds all card variations.

#### Shadowing:

**`example`** Add components via shadowing.
```js
const WithCardVariations = asFluidToken(vitalCardFlowContainerBase, {
  Components: {
    ...vitalCardFlowContainerBase.ProductVariations,
    ...myCustomVariations
  },
});
```

#### Defined in

[vital-card/src/components/FlowContainer/tokens/vitalCardFlowContainer.ts:210](https://github.com/johnsonandjohnson/Bodiless-JS/blob/908947acb/packages/vital-card/src/components/FlowContainer/tokens/vitalCardFlowContainer.ts#L210)

___

### WithCategoryVariations

• **WithCategoryVariations**: `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which adds category card - no variations.

#### Defined in

[vital-card/src/components/FlowContainer/tokens/vitalCardFlowContainer.ts:228](https://github.com/johnsonandjohnson/Bodiless-JS/blob/908947acb/packages/vital-card/src/components/FlowContainer/tokens/vitalCardFlowContainer.ts#L228)

___

### WithHeroVariations

• **WithHeroVariations**: `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which adds hero card variations.
Defined by HeroBase - horizontal only cards with visible CTA varied over
 - Link Styles
 - Horizontal Variations to vary on Left or Right Images & Content Top & Centered.

#### Defined in

[vital-card/src/components/FlowContainer/tokens/vitalCardFlowContainer.ts:224](https://github.com/johnsonandjohnson/Bodiless-JS/blob/908947acb/packages/vital-card/src/components/FlowContainer/tokens/vitalCardFlowContainer.ts#L224)

___

### WithProductVariations

• **WithProductVariations**: `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which adds product card variations.
Defined by vertical only cards and with CTA varied over
- Link Variations
- Content remove of eyebrow

#### Defined in

[vital-card/src/components/FlowContainer/tokens/vitalCardFlowContainer.ts:239](https://github.com/johnsonandjohnson/Bodiless-JS/blob/908947acb/packages/vital-card/src/components/FlowContainer/tokens/vitalCardFlowContainer.ts#L239)

___

### WithTopicVariations

• **WithTopicVariations**: `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which adds topic card variations.

#### Defined in

[vital-card/src/components/FlowContainer/tokens/vitalCardFlowContainer.ts:232](https://github.com/johnsonandjohnson/Bodiless-JS/blob/908947acb/packages/vital-card/src/components/FlowContainer/tokens/vitalCardFlowContainer.ts#L232)
