@bodiless/vital-card

# @bodiless/vital-card

## Table of contents

### Component Interfaces

- [CardComponents](interfaces/CardComponents.md)

### Token Collection Interfaces

- [VitalCard](interfaces/VitalCard.md)
- [VitalCardFlowContainer](interfaces/VitalCardFlowContainer.md)

### Component Variables

- [CardClean](README.md#cardclean)
- [CardStatic](README.md#cardstatic)

### Token Collection Variables

- [vitalCard](README.md#vitalcard)
- [vitalCardBase](README.md#vitalcardbase)
- [vitalCardFlowContainer](README.md#vitalcardflowcontainer)
- [vitalCardFlowContainerBase](README.md#vitalcardflowcontainerbase)
- [vitalCardStatic](README.md#vitalcardstatic)

### Token Collection Functions

- [asCardToken](README.md#ascardtoken)

## Component Variables

### CardClean

• `Const` **CardClean**: `ComponentWithMeta`<`PP`<`CardBaseProps`, `any`, `any`\>\>

This is the base component for cards.

**`example`**
**Create a default card:**
```
const DefaultCard = on(CardClean)(vitalCardStatic.Default)
```

**`example`**
**Create a custom card using a token defined in your package**
```
const CustomCard = on(CardClean)(myBrandCard.Custom)
```

#### Defined in

[vital-card/src/components/Card/CardClean.tsx:187](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-card/src/components/Card/CardClean.tsx#L187)

___

### CardStatic

• `Const` **CardStatic**: `ComponentType`<`CardProps`\>

Use this version of the card when all components are static.

#### Defined in

[vital-card/src/components/Card/CardClean.tsx:210](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-card/src/components/Card/CardClean.tsx#L210)

___

## Token Collection Variables

### vitalCard

• `Const` **vitalCard**: [`VitalCard`](interfaces/VitalCard.md)

Tokens for cards.

#### Defined in

[vital-card/src/components/Card/tokens/vitalCard.ts:196](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-card/src/components/Card/tokens/vitalCard.ts#L196)

___

### vitalCardBase

• `Const` **vitalCardBase**: [`VitalCard`](interfaces/VitalCard.md) = `vitalCardBaseOrig`

Use this version of the vital card tokens when extending or shadowing.

**`see`** [VitalCard](interfaces/VitalCard.md)

#### Defined in

[vital-card/src/components/Card/index.ts:27](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-card/src/components/Card/index.ts#L27)

___

### vitalCardFlowContainer

• `Const` **vitalCardFlowContainer**: [`VitalCardFlowContainer`](interfaces/VitalCardFlowContainer.md)

#### Defined in

[vital-card/src/components/FlowContainer/tokens/vitalCardFlowContainer.ts:245](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-card/src/components/FlowContainer/tokens/vitalCardFlowContainer.ts#L245)

___

### vitalCardFlowContainerBase

• `Const` **vitalCardFlowContainerBase**: [`VitalCardFlowContainer`](interfaces/VitalCardFlowContainer.md) = `vitalCardFlowContainerBaseOrig`

Use this version of the vital card tokens when extending or shadowing.

**`see`** [VitalCardFlowContainer](interfaces/VitalCardFlowContainer.md)

#### Defined in

[vital-card/src/components/FlowContainer/index.ts:25](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-card/src/components/FlowContainer/index.ts#L25)

___

### vitalCardStatic

• `Const` **vitalCardStatic**: [`VitalCard`](interfaces/VitalCard.md) = `vitalCard`

Use this version of the token collection when all sub-components are static.
Be sure to use it with `CardStatic` (not `CardClean`).

**`see`** [CardStatic](README.md#cardstatic)

**`see`** [vitalCard](README.md#vitalcard)

#### Defined in

[vital-card/src/components/Card/index.bl-edit.ts:27](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-card/src/components/Card/index.bl-edit.ts#L27)

## Token Collection Functions

### asCardToken

▸ **asCardToken**(...`specs`): `TokenSpec`<[`CardComponents`](interfaces/CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

A token modifier that respects the Card Compoments.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<[`CardComponents`](interfaces/CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] |

#### Returns

`TokenSpec`<[`CardComponents`](interfaces/CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

[vital-card/src/components/Card/CardClean.tsx:197](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-card/src/components/Card/CardClean.tsx#L197)
