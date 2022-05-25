[@bodiless/vital-card](README.md) / Exports

# @bodiless/vital-card

## Table of contents

### Variables

- [CardClean](modules.md#cardclean)
- [vitalCard](modules.md#vitalcard)
- [vitalCardFlowContainer](modules.md#vitalcardflowcontainer)

### Functions

- [asCardToken](modules.md#ascardtoken)

## Variables

### CardClean

• `Const` **CardClean**: `ComponentType`<`CardProps`\>

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

[vital-card/src/components/Card/CardClean.tsx:128](https://github.com/johnsonandjohnson/Bodiless-JS/blob/7ce3fb8e/packages/vital-card/src/components/Card/CardClean.tsx#L128)

___

### vitalCard

• **vitalCard**: `Object`

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

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Base` | `TokenSpec`<`CardComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `Default` | `TokenSpec`<`CardComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `Hero` | `TokenSpec`<`CardComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithHorizontalOrientation` | `TokenSpec`<`CardComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithNoDescription` | `TokenSpec`<`CardComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithNoTitle` | `TokenSpec`<`CardComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithVerticalOrientation` | `TokenSpec`<`CardComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-card/src/components/Card/tokens/vitalCard.ts:187](https://github.com/johnsonandjohnson/Bodiless-JS/blob/7ce3fb8e/packages/vital-card/src/components/Card/tokens/vitalCard.ts#L187)

___

### vitalCardFlowContainer

• `Const` **vitalCardFlowContainer**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `WithCardVariations` | `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-card/src/components/FlowContainer/index.ts:50](https://github.com/johnsonandjohnson/Bodiless-JS/blob/7ce3fb8e/packages/vital-card/src/components/FlowContainer/index.ts#L50)

## Functions

### asCardToken

▸ **asCardToken**(...`specs`): `TokenSpec`<`CardComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | `FinalDomains`<`CardComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>[] |

#### Returns

`TokenSpec`<`CardComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

[vital-card/src/components/Card/CardClean.tsx:125](https://github.com/johnsonandjohnson/Bodiless-JS/blob/7ce3fb8e/packages/vital-card/src/components/Card/CardClean.tsx#L125)
