@bodiless/vital-templates

# @bodiless/vital-templates

## Table of contents

### References

- [vitalHeroBase](README.md#vitalherobase)

### Enumerations

- [TemplateNodeKeys](enums/TemplateNodeKeys.md)

### Type Aliases

- [GenericTemplateComponents](README.md#generictemplatecomponents)
- [PageProps](README.md#pageprops)

### Variables

- [GenericTemplateClean](README.md#generictemplateclean)
- [StyleGuideTemplateClean](README.md#styleguidetemplateclean)
- [knapsackGenericTemplateSpec](README.md#knapsackgenerictemplatespec)
- [vitalGenericTemplate](README.md#vitalgenerictemplate)
- [vitalHero](README.md#vitalhero)
- [vitalPage](README.md#vitalpage)
- [vitalStyleGuideTemplate](README.md#vitalstyleguidetemplate)

### HOC Utility Functions

- [asBodilessPage](README.md#asbodilesspage)

### Token API Functions

- [asGenericTemplateToken](README.md#asgenerictemplatetoken)
- [asStyleGuideTemplateToken](README.md#asstyleguidetemplatetoken)

## References

### vitalHeroBase

Renames and re-exports [vitalHero](README.md#vitalhero)

## Type Aliases

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

[vital-templates/src/components/GenericTemplate/types.ts:17](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8d49bea45/packages/vital-templates/src/components/GenericTemplate/types.ts#L17)

___

### PageProps

Ƭ **PageProps**: `DesignableProps` & `ComponentProps`<typeof `BodilessPage`\>

#### Defined in

[vital-templates/src/components/Page/asBodilessPage.tsx:20](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8d49bea45/packages/vital-templates/src/components/Page/asBodilessPage.tsx#L20)

## Variables

### GenericTemplateClean

• `Const` **GenericTemplateClean**: `ComponentWithMeta`<`PP`<`BaseGenericTemplateProps`, `DesignableProps`<[`GenericTemplateComponents`](README.md#generictemplatecomponents)\>, `DesignableComponentsProps`<[`GenericTemplateComponents`](README.md#generictemplatecomponents)\>\>\>

#### Defined in

[vital-templates/src/components/GenericTemplate/GenericTemplateClean.tsx:65](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8d49bea45/packages/vital-templates/src/components/GenericTemplate/GenericTemplateClean.tsx#L65)

___

### StyleGuideTemplateClean

• `Const` **StyleGuideTemplateClean**: `ComponentWithMeta`<`PP`<`DesignableComponentsProps`<`StyleGuideTemplateComponents`\>, `DesignableProps`<`StyleGuideTemplateComponents`\>, `DesignableComponentsProps`<`StyleGuideTemplateComponents`\>\>\>

#### Defined in

[vital-templates/src/components/StyleGuideTemplate/StyleGuideTemplateClean.tsx:63](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8d49bea45/packages/vital-templates/src/components/StyleGuideTemplate/StyleGuideTemplateClean.tsx#L63)

___

### knapsackGenericTemplateSpec

• `Const` **knapsackGenericTemplateSpec**: `VitalDesignSpec`<[`GenericTemplateComponents`](README.md#generictemplatecomponents)\>

#### Defined in

[vital-templates/src/components/GenericTemplate/GenericTemplate.knapsackSpec.ts:33](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8d49bea45/packages/vital-templates/src/components/GenericTemplate/GenericTemplate.knapsackSpec.ts#L33)

___

### vitalGenericTemplate

• `Const` **vitalGenericTemplate**: `VitalGenericTemplate`

#### Defined in

[vital-templates/src/components/GenericTemplate/tokens/vitalGenericTemplate.ts:95](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8d49bea45/packages/vital-templates/src/components/GenericTemplate/tokens/vitalGenericTemplate.ts#L95)

___

### vitalHero

• **vitalHero**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Default` | `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-templates/src/components/Hero/tokens/vitalHero.ts:27](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8d49bea45/packages/vital-templates/src/components/Hero/tokens/vitalHero.ts#L27)

___

### vitalPage

• **vitalPage**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Default` | `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-templates/src/components/Page/tokens/vitalPage.ts:58](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8d49bea45/packages/vital-templates/src/components/Page/tokens/vitalPage.ts#L58)

___

### vitalStyleGuideTemplate

• **vitalStyleGuideTemplate**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Default` | `TokenSpec`<`StyleGuideTemplateComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `NoLayout` | `TokenSpec`<`StyleGuideTemplateComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-templates/src/components/StyleGuideTemplate/tokens/vitalStyleGuideTemplate.ts:61](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8d49bea45/packages/vital-templates/src/components/StyleGuideTemplate/tokens/vitalStyleGuideTemplate.ts#L61)

## HOC Utility Functions

### asBodilessPage

▸ **asBodilessPage**<`P`\>(`C`): `ComponentWithMeta`<`PP`<`P`, [`PageProps`](README.md#pageprops), {}\>\>

Type of a higher-order component.

This is a generic type which allows you to specify how the props of the target
component will be treated. It accepts 3 type parameters:

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

fclasses/lib/types.d.ts:89

___

## Token API Functions

### asGenericTemplateToken

▸ **asGenericTemplateToken**(`...specs`): `TokenSpec`<[`GenericTemplateComponents`](README.md#generictemplatecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Type of a function which accepts a list of partial token specifications
and returns a single, complete token specification.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...specs` | (`string` \| `FinalDomains`<[`GenericTemplateComponents`](README.md#generictemplatecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> \| `HOC`<{}, {}, {}\>)[] | A list of partial token specifications. These may be objects, in which case their keys should be a subset of the allowed domains. They may also be strings or HOCs, which will be converted to partial token specifications, applying the classes or HOC to the `_` key of the `Core` domain. |

#### Returns

`TokenSpec`<[`GenericTemplateComponents`](README.md#generictemplatecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

fclasses/lib/types.d.ts:400

___

### asStyleGuideTemplateToken

▸ **asStyleGuideTemplateToken**(`...specs`): `TokenSpec`<`StyleGuideTemplateComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Type of a function which accepts a list of partial token specifications
and returns a single, complete token specification.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...specs` | (`string` \| `HOC`<{}, {}, {}\> \| `FinalDomains`<`StyleGuideTemplateComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>)[] | A list of partial token specifications. These may be objects, in which case their keys should be a subset of the allowed domains. They may also be strings or HOCs, which will be converted to partial token specifications, applying the classes or HOC to the `_` key of the `Core` domain. |

#### Returns

`TokenSpec`<`StyleGuideTemplateComponents`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

fclasses/lib/types.d.ts:400
