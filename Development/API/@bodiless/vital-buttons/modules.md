[@bodiless/vital-buttons](README.md) / Exports

# @bodiless/vital-buttons

## Table of contents

### References

- [vitalButtonStatic](modules.md#vitalbuttonstatic)
- [vitalButtonsBase](modules.md#vitalbuttonsbase)

### Type aliases

- [ButtonBaseProps](modules.md#buttonbaseprops)
- [ButtonComponent](modules.md#buttoncomponent)

### Variables

- [ButtonClean](modules.md#buttonclean)
- [vitalButtonFlowContainer](modules.md#vitalbuttonflowcontainer)
- [vitalButtons](modules.md#vitalbuttons)

### Functions

- [asButtonToken](modules.md#asbuttontoken)

## References

### vitalButtonStatic

Renames and re-exports [vitalButtons](modules.md#vitalbuttons)

___

### vitalButtonsBase

Renames and re-exports [vitalButtons](modules.md#vitalbuttons)

## Type aliases

### ButtonBaseProps

Ƭ **ButtonBaseProps**: `DesignableComponentsProps`<[`ButtonComponent`](modules.md#buttoncomponent)\>

#### Defined in

vital-link/lib/components/Link/types.d.ts:21

___

### ButtonComponent

Ƭ **ButtonComponent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Body` | `ComponentOrTag`<`any`\> |
| `ExternalSRText` | `ComponentOrTag`<`any`\> |
| `Icon` | `ComponentOrTag`<`any`\> |
| `Wrapper` | `ComponentOrTag`<`any`\> |

#### Defined in

vital-link/lib/components/Link/types.d.ts:15

## Variables

### ButtonClean

• `Const` **ButtonClean**: `ComponentWithMeta`

#### Defined in

vital-link/lib/components/Link/LinkClean.d.ts:30

___

### vitalButtonFlowContainer

• `Const` **vitalButtonFlowContainer**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `WithButtonVariations` | `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-buttons/src/components/FlowContainer/index.ts:50](https://github.com/johnsonandjohnson/Bodiless-JS/blob/613288855/packages/vital-buttons/src/components/FlowContainer/index.ts#L50)

___

### vitalButtons

• **vitalButtons**: `Object`

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
| `Default` | `TokenSpec`<[`ButtonComponent`](modules.md#buttoncomponent), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `Primary` | `TokenSpec`<[`ButtonComponent`](modules.md#buttoncomponent), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `PrimarySelected` | `TokenSpec`<[`ButtonComponent`](modules.md#buttoncomponent), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `Secondary` | `TokenSpec`<[`ButtonComponent`](modules.md#buttoncomponent), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `SecondarySelected` | `TokenSpec`<[`ButtonComponent`](modules.md#buttoncomponent), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WhereToBuy` | `TokenSpec`<[`ButtonComponent`](modules.md#buttoncomponent), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WhereToBuyWithoutIcon` | `TokenSpec`<[`ButtonComponent`](modules.md#buttoncomponent), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithArrow` | `TokenSpec`<[`ButtonComponent`](modules.md#buttoncomponent), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithDisabled` | `TokenSpec`<[`ButtonComponent`](modules.md#buttoncomponent), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-buttons/src/components/Buttons/tokens/vitalButtons.ts:144](https://github.com/johnsonandjohnson/Bodiless-JS/blob/613288855/packages/vital-buttons/src/components/Buttons/tokens/vitalButtons.ts#L144)

## Functions

### asButtonToken

▸ **asButtonToken**(...`specs`): `TokenSpec`<[`ButtonComponent`](modules.md#buttoncomponent), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `FinalDomains`<[`ButtonComponent`](modules.md#buttoncomponent), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> \| `HOC`<{}, {}, {}\>)[] |

#### Returns

`TokenSpec`<[`ButtonComponent`](modules.md#buttoncomponent), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

[vital-buttons/src/components/Buttons/ButtonClean.tsx:19](https://github.com/johnsonandjohnson/Bodiless-JS/blob/613288855/packages/vital-buttons/src/components/Buttons/ButtonClean.tsx#L19)
