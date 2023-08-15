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

### Other Variables

- [ProductCardMeta](README.md#productcardmeta)
- [knapsackCardSpec](README.md#knapsackcardspec)

### Token Collection Variables

- [vitalCard](README.md#vitalcard)
- [vitalCardBase](README.md#vitalcardbase)
- [vitalCardFlowContainer](README.md#vitalcardflowcontainer)
- [vitalCardStatic](README.md#vitalcardstatic)

### Token Collection Functions

- [asCardToken](README.md#ascardtoken)

## Component Variables

### CardClean

• `Const` **CardClean**: `ComponentWithMeta`<`PP`<`CardBaseProps`, `any`, `any`\>\>

This is the base component for cards.

**`Example`**

**Create a default card:**
```
const DefaultCard = on(CardClean)(vitalCardStatic.Default)
```

**`Example`**

**Create a custom card using a token defined in your package**
```
const CustomCard = on(CardClean)(myBrandCard.Custom)
```

#### Defined in

[vital-card/src/components/Card/CardClean.tsx:187](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8207f8a8d/packages/vital-card/src/components/Card/CardClean.tsx#L187)

___

### CardStatic

• `Const` **CardStatic**: `ComponentType`<`CardProps`\>

Use this version of the card when all components are static.

#### Defined in

[vital-card/src/components/Card/CardClean.tsx:210](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8207f8a8d/packages/vital-card/src/components/Card/CardClean.tsx#L210)

___

## Other Variables

### ProductCardMeta

• `Const` **ProductCardMeta**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `categories` | { `Group`: `string`[] ; `Type`: `string`[]  } |
| `categories.Group` | `string`[] |
| `categories.Type` | `string`[] |

#### Defined in

[vital-card/src/components/ProductCardTokens/index.ts:4](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8207f8a8d/packages/vital-card/src/components/ProductCardTokens/index.ts#L4)

___

### knapsackCardSpec

• `Const` **knapsackCardSpec**: `VitalDesignSpec`<[`CardComponents`](interfaces/CardComponents.md)\>

#### Defined in

[vital-card/src/components/Card/Card.knapsackSpec.ts:31](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8207f8a8d/packages/vital-card/src/components/Card/Card.knapsackSpec.ts#L31)

___

## Token Collection Variables

### vitalCard

• `Const` **vitalCard**: [`VitalCard`](interfaces/VitalCard.md)

Tokens for cards.

#### Defined in

[vital-card/src/components/Card/tokens/vitalCard.ts:202](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8207f8a8d/packages/vital-card/src/components/Card/tokens/vitalCard.ts#L202)

___

### vitalCardBase

• `Const` **vitalCardBase**: [`VitalCard`](interfaces/VitalCard.md) = `vitalCardBaseOrig`

Use this version of the vital card tokens when extending or shadowing.

**`See`**

[[VitalCard]]

#### Defined in

[vital-card/src/components/Card/index.ts:27](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8207f8a8d/packages/vital-card/src/components/Card/index.ts#L27)

___

### vitalCardFlowContainer

• `Const` **vitalCardFlowContainer**: [`VitalCardFlowContainer`](interfaces/VitalCardFlowContainer.md)

#### Defined in

[vital-card/src/components/FlowContainer/tokens/vitalCardFlowContainer.ts:256](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8207f8a8d/packages/vital-card/src/components/FlowContainer/tokens/vitalCardFlowContainer.ts#L256)

___

### vitalCardStatic

• `Const` **vitalCardStatic**: [`VitalCard`](interfaces/VitalCard.md) = `vitalCard`

Use this version of the token collection when all sub-components are static.
Be sure to use it with `CardStatic` (not `CardClean`).

**`See`**

 - [[CardStatic]]
 - [[vitalCard]]

#### Defined in

[vital-card/src/components/Card/index.bl-edit.ts:27](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8207f8a8d/packages/vital-card/src/components/Card/index.bl-edit.ts#L27)

## Token Collection Functions

### asCardToken

▸ **asCardToken**(`...specs`): `TokenSpec`<[`CardComponents`](interfaces/CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

A token modifier that respects the Card Compoments.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<[`CardComponents`](interfaces/CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] |

#### Returns

`TokenSpec`<[`CardComponents`](interfaces/CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

fclasses/lib/types.d.ts:400
