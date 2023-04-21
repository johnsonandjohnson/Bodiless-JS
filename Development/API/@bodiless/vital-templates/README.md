@bodiless/vital-templates

# @bodiless/vital-templates

## Table of contents

### References

- [vitalGenericTemplate](README.md#vitalgenerictemplate)
- [vitalPDPTemplate](README.md#vitalpdptemplate)
- [vitalPageBase](README.md#vitalpagebase)

### Enumerations

- [TemplateNodeKeys](enums/TemplateNodeKeys.md)

### Type aliases

- [GenericTemplateComponents](README.md#generictemplatecomponents)
- [PDPTemplateComponents](README.md#pdptemplatecomponents)
- [PageProps](README.md#pageprops)

### Variables

- [GenericTemplateClean](README.md#generictemplateclean)
- [PDPTemplateClean](README.md#pdptemplateclean)
- [StyleGuideTemplateClean](README.md#styleguidetemplateclean)
- [vitalGenericTemplateBase](README.md#vitalgenerictemplatebase)
- [vitalPDPTemplateBase](README.md#vitalpdptemplatebase)
- [vitalPage](README.md#vitalpage)
- [vitalStyleGuideTemplate](README.md#vitalstyleguidetemplate)

### Functions

- [asBodilessPage](README.md#asbodilesspage)
- [asGenericTemplateToken](README.md#asgenerictemplatetoken)
- [asPDPTemplateToken](README.md#aspdptemplatetoken)
- [asStyleGuideTemplateToken](README.md#asstyleguidetemplatetoken)

## References

### vitalGenericTemplate

Renames and re-exports [vitalGenericTemplateBase](README.md#vitalgenerictemplatebase)

___

### vitalPDPTemplate

Renames and re-exports [vitalPDPTemplateBase](README.md#vitalpdptemplatebase)

___

### vitalPageBase

Renames and re-exports [vitalPage](README.md#vitalpage)

## Type aliases

### GenericTemplateComponents

Ƭ **GenericTemplateComponents**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `BottomContent` | `ComponentOrTag`<`any`\> |
| `BottomWrapper` | `ComponentOrTag`<`any`\> |
| `Breadcrumb` | `ComponentOrTag`<`any`\> |
| `BreadcrumbWrapper` | `ComponentOrTag`<`any`\> |
| `Content` | `ComponentOrTag`<`any`\> |
| `ContentWrapper` | `ComponentOrTag`<`any`\> |
| `PageWrapper` | `ComponentOrTag`<`any`\> |
| `TemplateWrapper` | `ComponentOrTag`<`any`\> |
| `TopContent` | `ComponentOrTag`<`any`\> |
| `TopWrapper` | `ComponentOrTag`<`any`\> |

#### Defined in

[vital-templates/src/components/GenericTemplate/types.ts:17](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8924e8534/packages/vital-templates/src/components/GenericTemplate/types.ts#L17)

___

### PDPTemplateComponents

Ƭ **PDPTemplateComponents**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `BottomContent` | `ComponentOrTag`<`any`\> |
| `BottomWrapper` | `ComponentOrTag`<`any`\> |
| `Breadcrumb` | `ComponentOrTag`<`any`\> |
| `BreadcrumbWrapper` | `ComponentOrTag`<`any`\> |
| `ContentWrapper` | `ComponentOrTag`<`any`\> |
| `GA4Helmet` | `ComponentOrTag`<`any`\> |
| `PageWrapper` | `ComponentOrTag`<`any`\> |
| `ProductDescription` | `ComponentOrTag`<`any`\> |
| `ProductDescriptionWrapper` | `ComponentOrTag`<`any`\> |
| `ProductDetailWrapper` | `ComponentOrTag`<`any`\> |
| `ProductEyebrow` | `ComponentOrTag`<`any`\> |
| `ProductEyebrowWrapper` | `ComponentOrTag`<`any`\> |
| `ProductImage` | `ComponentOrTag`<`any`\> |
| `ProductImageWrapper` | `ComponentOrTag`<`any`\> |
| `ProductMoreInfo` | `ComponentOrTag`<`any`\> |
| `ProductTitle` | `ComponentOrTag`<`any`\> |
| `ProductTitleWrapper` | `ComponentOrTag`<`any`\> |
| `TopContent` | `ComponentOrTag`<`any`\> |
| `TopWrapper` | `ComponentOrTag`<`any`\> |

#### Defined in

[vital-templates/src/components/PDPTemplate/types.ts:17](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8924e8534/packages/vital-templates/src/components/PDPTemplate/types.ts#L17)

___

### PageProps

Ƭ **PageProps**: `DesignableProps` & `ComponentProps`<typeof `BodilessPage`\>

#### Defined in

[vital-templates/src/components/Page/asBodilessPage.tsx:20](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8924e8534/packages/vital-templates/src/components/Page/asBodilessPage.tsx#L20)

## Variables

### GenericTemplateClean

• `Const` **GenericTemplateClean**: `ComponentWithMeta`<`PP`<`BaseGenericTemplateProps`, `DesignableProps`<[`GenericTemplateComponents`](README.md#generictemplatecomponents)\>, `DesignableComponentsProps`<[`GenericTemplateComponents`](README.md#generictemplatecomponents)\>\>\>

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

[vital-templates/src/components/GenericTemplate/GenericTemplateClean.tsx:65](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8924e8534/packages/vital-templates/src/components/GenericTemplate/GenericTemplateClean.tsx#L65)

___

### PDPTemplateClean

• `Const` **PDPTemplateClean**: `ComponentWithMeta`<`PP`<`BasePDPTemplateProps`, `DesignableProps`<[`PDPTemplateComponents`](README.md#pdptemplatecomponents)\>, `DesignableComponentsProps`<[`PDPTemplateComponents`](README.md#pdptemplatecomponents)\>\>\>

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

[vital-templates/src/components/PDPTemplate/PDPTemplateClean.tsx:85](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8924e8534/packages/vital-templates/src/components/PDPTemplate/PDPTemplateClean.tsx#L85)

___

### StyleGuideTemplateClean

• `Const` **StyleGuideTemplateClean**: `ComponentWithMeta`<`PP`<`DesignableComponentsProps`<`StyleGuideTemplateComponents`\>, `DesignableProps`<`StyleGuideTemplateComponents`\>, `DesignableComponentsProps`<`StyleGuideTemplateComponents`\>\>\>

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

[vital-templates/src/components/StyleGuideTemplate/StyleGuideTemplateClean.tsx:63](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8924e8534/packages/vital-templates/src/components/StyleGuideTemplate/StyleGuideTemplateClean.tsx#L63)

___

### vitalGenericTemplateBase

• **vitalGenericTemplateBase**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ContentListing` | `TokenSpec`<[`GenericTemplateComponents`](README.md#generictemplatecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `Default` | `TokenSpec`<[`GenericTemplateComponents`](README.md#generictemplatecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `Generic` | `TokenSpec`<[`GenericTemplateComponents`](README.md#generictemplatecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithNoBreadcrumbsOnHomePage` | `TokenSpec`<[`GenericTemplateComponents`](README.md#generictemplatecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-templates/src/components/GenericTemplate/tokens/vitalGenericTemplate.ts:129](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8924e8534/packages/vital-templates/src/components/GenericTemplate/tokens/vitalGenericTemplate.ts#L129)

___

### vitalPDPTemplateBase

• **vitalPDPTemplateBase**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Default` | `TokenSpec`<[`PDPTemplateComponents`](README.md#pdptemplatecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-templates/src/components/PDPTemplate/tokens/vitalPDPTemplate.ts:73](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8924e8534/packages/vital-templates/src/components/PDPTemplate/tokens/vitalPDPTemplate.ts#L73)

___

### vitalPage

• **vitalPage**: `Object`

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
| `Default` | `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-templates/src/components/Page/tokens/vitalPage.ts:58](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8924e8534/packages/vital-templates/src/components/Page/tokens/vitalPage.ts#L58)

___

### vitalStyleGuideTemplate

• **vitalStyleGuideTemplate**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Default` | `TokenSpec`<`StyleGuideTemplateComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `NoLayout` | `TokenSpec`<`StyleGuideTemplateComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-templates/src/components/StyleGuideTemplate/tokens/vitalStyleGuideTemplate.ts:63](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8924e8534/packages/vital-templates/src/components/StyleGuideTemplate/tokens/vitalStyleGuideTemplate.ts#L63)

## Functions

### asBodilessPage

▸ **asBodilessPage**<`P`\>(`C`): `ComponentWithMeta`<`PP`<`P`, [`PageProps`](README.md#pageprops), {}\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `DesignableProps`<`any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `C` | `ComponentOrTag`<`P`\> |

#### Returns

`ComponentWithMeta`<`PP`<`P`, [`PageProps`](README.md#pageprops), {}\>\>

#### Defined in

[vital-templates/src/components/Page/asBodilessPage.tsx:22](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8924e8534/packages/vital-templates/src/components/Page/asBodilessPage.tsx#L22)

___

### asGenericTemplateToken

▸ **asGenericTemplateToken**(...`specs`): `TokenSpec`<[`GenericTemplateComponents`](README.md#generictemplatecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<[`GenericTemplateComponents`](README.md#generictemplatecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] |

#### Returns

`TokenSpec`<[`GenericTemplateComponents`](README.md#generictemplatecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

[vital-templates/src/components/GenericTemplate/GenericTemplateClean.tsx:67](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8924e8534/packages/vital-templates/src/components/GenericTemplate/GenericTemplateClean.tsx#L67)

___

### asPDPTemplateToken

▸ **asPDPTemplateToken**(...`specs`): `TokenSpec`<[`PDPTemplateComponents`](README.md#pdptemplatecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<[`PDPTemplateComponents`](README.md#pdptemplatecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] |

#### Returns

`TokenSpec`<[`PDPTemplateComponents`](README.md#pdptemplatecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

[vital-templates/src/components/PDPTemplate/PDPTemplateClean.tsx:87](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8924e8534/packages/vital-templates/src/components/PDPTemplate/PDPTemplateClean.tsx#L87)

___

### asStyleGuideTemplateToken

▸ **asStyleGuideTemplateToken**(...`specs`): `TokenSpec`<`StyleGuideTemplateComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<`StyleGuideTemplateComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] |

#### Returns

`TokenSpec`<`StyleGuideTemplateComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

[vital-templates/src/components/StyleGuideTemplate/StyleGuideTemplateClean.tsx:64](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8924e8534/packages/vital-templates/src/components/StyleGuideTemplate/StyleGuideTemplateClean.tsx#L64)
