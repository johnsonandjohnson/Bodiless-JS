@bodiless/vital-card

# @bodiless/vital-card

## Table of contents

### References

- [vitalArticleCardStatic](README.md#vitalarticlecardstatic)
- [vitalCategoryCardStatic](README.md#vitalcategorycardstatic)

### Component Interfaces

- [CardComponents](interfaces/CardComponents.md)

### Token Collection Interfaces

- [VitalCard](interfaces/VitalCard.md)
- [VitalCardFlowContainer](interfaces/VitalCardFlowContainer.md)

### Component Variables

- [CardClean](README.md#cardclean)
- [CardStatic](README.md#cardstatic)

### Other Variables

- [ArticleCardClean](README.md#articlecardclean)
- [CategoryCardClean](README.md#categorycardclean)
- [ProductCardMeta](README.md#productcardmeta)
- [knapsackCardSpec](README.md#knapsackcardspec)

### Token Collection Variables

- [vitalArticleCard](README.md#vitalarticlecard)
- [vitalCard](README.md#vitalcard)
- [vitalCardBase](README.md#vitalcardbase)
- [vitalCardFlowContainer](README.md#vitalcardflowcontainer)
- [vitalCardStatic](README.md#vitalcardstatic)
- [vitalCategoryCard](README.md#vitalcategorycard)

### Token Collection Functions

- [asArticleCardToken](README.md#asarticlecardtoken)
- [asCardToken](README.md#ascardtoken)
- [asCategoryCardToken](README.md#ascategorycardtoken)

## References

### vitalArticleCardStatic

Renames and re-exports [vitalArticleCard](README.md#vitalarticlecard)

___

### vitalCategoryCardStatic

Renames and re-exports [vitalCategoryCard](README.md#vitalcategorycard)

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

[vital-card/src/components/Card/CardClean.tsx:187](https://github.com/johnsonandjohnson/Bodiless-JS/blob/c9773ba44/packages/vital-card/src/components/Card/CardClean.tsx#L187)

___

### CardStatic

• `Const` **CardStatic**: `ComponentType`<`CardProps`\>

Use this version of the card when all components are static.

#### Defined in

[vital-card/src/components/Card/CardClean.tsx:210](https://github.com/johnsonandjohnson/Bodiless-JS/blob/c9773ba44/packages/vital-card/src/components/Card/CardClean.tsx#L210)

___

## Other Variables

### ArticleCardClean

• `Const` **ArticleCardClean**: `ComponentWithMeta`<`PP`<`CardBaseProps`, `any`, `any`\>\>

#### Defined in

[vital-card/src/components/ArticleCard/ArticleCardClean.tsx:29](https://github.com/johnsonandjohnson/Bodiless-JS/blob/c9773ba44/packages/vital-card/src/components/ArticleCard/ArticleCardClean.tsx#L29)

___

### CategoryCardClean

• `Const` **CategoryCardClean**: `ComponentWithMeta`<`PP`<`CardBaseProps`, `any`, `any`\>\>

#### Defined in

[vital-card/src/components/CategoryCard/CategoryCardClean.tsx:30](https://github.com/johnsonandjohnson/Bodiless-JS/blob/c9773ba44/packages/vital-card/src/components/CategoryCard/CategoryCardClean.tsx#L30)

___

### ProductCardMeta

• `Const` **ProductCardMeta**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `categories` | { `Group`: `string`[] ; `Type`: `string`[]  } |
| `categories.Group` | `string`[] |
| `categories.Type` | `string`[] |

#### Defined in

[vital-card/src/components/ProductCardTokens/index.ts:4](https://github.com/johnsonandjohnson/Bodiless-JS/blob/c9773ba44/packages/vital-card/src/components/ProductCardTokens/index.ts#L4)

___

### knapsackCardSpec

• `Const` **knapsackCardSpec**: `VitalDesignSpec`<[`CardComponents`](interfaces/CardComponents.md)\>

#### Defined in

[vital-card/src/components/Card/Card.knapsackSpec.ts:31](https://github.com/johnsonandjohnson/Bodiless-JS/blob/c9773ba44/packages/vital-card/src/components/Card/Card.knapsackSpec.ts#L31)

___

## Token Collection Variables

### vitalArticleCard

• `Const` **vitalArticleCard**: `VitalArticleCard`

Tokens for ArticleCardClean
This token collection extends vitalArticleCard

**`See`**

vitalArticleCard

#### Defined in

[vital-card/src/components/ArticleCard/tokens/vitalArticleCard.ts:176](https://github.com/johnsonandjohnson/Bodiless-JS/blob/c9773ba44/packages/vital-card/src/components/ArticleCard/tokens/vitalArticleCard.ts#L176)

___

### vitalCard

• `Const` **vitalCard**: [`VitalCard`](interfaces/VitalCard.md)

Tokens for cards.

#### Defined in

[vital-card/src/components/Card/tokens/vitalCard.ts:202](https://github.com/johnsonandjohnson/Bodiless-JS/blob/c9773ba44/packages/vital-card/src/components/Card/tokens/vitalCard.ts#L202)

___

### vitalCardBase

• `Const` **vitalCardBase**: [`VitalCard`](interfaces/VitalCard.md) = `vitalCardBaseOrig`

Use this version of the vital card tokens when extending or shadowing.

**`See`**

[[VitalCard]]

#### Defined in

[vital-card/src/components/Card/index.ts:27](https://github.com/johnsonandjohnson/Bodiless-JS/blob/c9773ba44/packages/vital-card/src/components/Card/index.ts#L27)

___

### vitalCardFlowContainer

• `Const` **vitalCardFlowContainer**: [`VitalCardFlowContainer`](interfaces/VitalCardFlowContainer.md)

#### Defined in

[vital-card/src/components/FlowContainer/tokens/vitalCardFlowContainer.ts:256](https://github.com/johnsonandjohnson/Bodiless-JS/blob/c9773ba44/packages/vital-card/src/components/FlowContainer/tokens/vitalCardFlowContainer.ts#L256)

___

### vitalCardStatic

• `Const` **vitalCardStatic**: [`VitalCard`](interfaces/VitalCard.md) = `vitalCard`

Use this version of the token collection when all sub-components are static.
Be sure to use it with `CardStatic` (not `CardClean`).

**`See`**

 - [[CardStatic]]
 - [[vitalCard]]

#### Defined in

[vital-card/src/components/Card/index.bl-edit.ts:27](https://github.com/johnsonandjohnson/Bodiless-JS/blob/c9773ba44/packages/vital-card/src/components/Card/index.bl-edit.ts#L27)

___

### vitalCategoryCard

• `Const` **vitalCategoryCard**: `VitalCategoryCard`

/**
Tokens for CategoryCardClean
This token collection extends vitalCategoryCard

**`See`**

vitalCategoryCard

#### Defined in

[vital-card/src/components/CategoryCard/tokens/vitalCategoryCard.ts:109](https://github.com/johnsonandjohnson/Bodiless-JS/blob/c9773ba44/packages/vital-card/src/components/CategoryCard/tokens/vitalCategoryCard.ts#L109)

## Token Collection Functions

### asArticleCardToken

▸ **asArticleCardToken**(`...specs`): `TokenSpec`<[`CardComponents`](interfaces/CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

A token creator that respects the ArticleCard slots.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<[`CardComponents`](interfaces/CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] |

#### Returns

`TokenSpec`<[`CardComponents`](interfaces/CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

fclasses/lib/types.d.ts:400

___

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

___

### asCategoryCardToken

▸ **asCategoryCardToken**(`...specs`): `TokenSpec`<[`CardComponents`](interfaces/CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

A token creator that respects the CategoryCard slots.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<[`CardComponents`](interfaces/CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] |

#### Returns

`TokenSpec`<[`CardComponents`](interfaces/CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

fclasses/lib/types.d.ts:400
