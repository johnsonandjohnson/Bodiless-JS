@bodiless/vital-image

# @bodiless/vital-image

## Table of contents

### Component Interfaces

- [BodilessImageComponents](interfaces/BodilessImageComponents.md)

### Token Collection Interfaces

- [VitalImage](interfaces/VitalImage.md)
- [VitalImageFlowContainer](interfaces/VitalImageFlowContainer.md)

### Other Variables

- [vitalImage](README.md#vitalimage)

### Token Collection Variables

- [vitalImageBase](README.md#vitalimagebase)
- [vitalImageFlowContainer](README.md#vitalimageflowcontainer)
- [vitalImageFlowContainerBase](README.md#vitalimageflowcontainerbase)

### Token Collection Functions

- [asImageToken](README.md#asimagetoken)

## Other Variables

### vitalImage

• `Const` **vitalImage**: [`VitalImage`](interfaces/VitalImage.md)

Copyright © 2022 Johnson & Johnson

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

#### Defined in

[vital-image/src/components/Image/tokens/vitalImage.ts:329](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-image/src/components/Image/tokens/vitalImage.ts#L329)

___

## Token Collection Variables

### vitalImageBase

• `Const` **vitalImageBase**: [`VitalImage`](interfaces/VitalImage.md) = `vitalImageBaseOrig`

Use this version of the vital image tokens when extending or shadowing.

**`see`** [VitalImage](interfaces/VitalImage.md)

#### Defined in

[vital-image/src/components/Image/index.ts:32](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-image/src/components/Image/index.ts#L32)

___

### vitalImageFlowContainer

• `Const` **vitalImageFlowContainer**: [`VitalImageFlowContainer`](interfaces/VitalImageFlowContainer.md)

#### Defined in

[vital-image/src/components/FlowContainer/tokens/vitalImageFlowContainer.ts:87](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-image/src/components/FlowContainer/tokens/vitalImageFlowContainer.ts#L87)

___

### vitalImageFlowContainerBase

• `Const` **vitalImageFlowContainerBase**: [`VitalImageFlowContainer`](interfaces/VitalImageFlowContainer.md) = `vitalImageFlowContainerBaseOrig`

Use this version of the vital card tokens when extending or shadowing.

**`see`** [VitalImageFlowContainer](interfaces/VitalImageFlowContainer.md)

#### Defined in

[vital-image/src/components/FlowContainer/index.ts:25](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-image/src/components/FlowContainer/index.ts#L25)

## Token Collection Functions

### asImageToken

▸ **asImageToken**(...`specs`): `TokenSpec`<[`BodilessImageComponents`](interfaces/BodilessImageComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

A token modifier that respects the Image Components.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<[`BodilessImageComponents`](interfaces/BodilessImageComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] |

#### Returns

`TokenSpec`<[`BodilessImageComponents`](interfaces/BodilessImageComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

[vital-image/src/components/Image/index.ts:25](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9dbde5975/packages/vital-image/src/components/Image/index.ts#L25)
