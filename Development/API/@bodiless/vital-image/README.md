@bodiless/vital-image

# @bodiless/vital-image

## Table of contents

### Component Interfaces

- [BodilessImageComponents](interfaces/BodilessImageComponents.md)

### Token Collection Interfaces

- [VitalImage](interfaces/VitalImage.md)
- [VitalImageFlowContainer](interfaces/VitalImageFlowContainer.md)

### Token Collection Variables

- [vitalImage](README.md#vitalimage)
- [vitalImageFlowContainer](README.md#vitalimageflowcontainer)

### Token Collection Functions

- [asImageToken](README.md#asimagetoken)

## Token Collection Variables

### vitalImage

• `Const` **vitalImage**: [`VitalImage`](interfaces/VitalImage.md)

Tokens for Vital Image

**`See`**

[[VitalImage]]

#### Defined in

[vital-image/src/components/Image/tokens/vitalImage.ts:326](https://github.com/johnsonandjohnson/Bodiless-JS/blob/0f671adef/packages/vital-image/src/components/Image/tokens/vitalImage.ts#L326)

___

### vitalImageFlowContainer

• `Const` **vitalImageFlowContainer**: [`VitalImageFlowContainer`](interfaces/VitalImageFlowContainer.md)

#### Defined in

[vital-image/src/components/FlowContainer/tokens/vitalImageFlowContainer.ts:87](https://github.com/johnsonandjohnson/Bodiless-JS/blob/0f671adef/packages/vital-image/src/components/FlowContainer/tokens/vitalImageFlowContainer.ts#L87)

## Token Collection Functions

### asImageToken

▸ **asImageToken**(`...specs`): `TokenSpec`<[`BodilessImageComponents`](interfaces/BodilessImageComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

A token modifier that respects the Image Components.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<[`BodilessImageComponents`](interfaces/BodilessImageComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] |

#### Returns

`TokenSpec`<[`BodilessImageComponents`](interfaces/BodilessImageComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

fclasses/lib/types.d.ts:400
