@bodiless/vital-link

# @bodiless/vital-link

## Table of contents

### References

- [vitalLinkStatic](README.md#vitallinkstatic)

### Component Interfaces

- [LinkComponents](interfaces/LinkComponents.md)

### Type Aliases

- [LinkBaseProps](README.md#linkbaseprops)

### Other Variables

- [LinkClean](README.md#linkclean)
- [LinkStatic](README.md#linkstatic)
- [linkComponents](README.md#linkcomponents)

### Token Collection Variables

- [vitalLink](README.md#vitallink)

### Other Functions

- [anchorTo](README.md#anchorto)
- [asEditableLink](README.md#aseditablelink)
- [useExternalLinkToggle](README.md#useexternallinktoggle)
- [useIsDownloadLink](README.md#useisdownloadlink)

### Token API Functions

- [asLinkToken](README.md#aslinktoken)

## References

### vitalLinkStatic

Renames and re-exports [vitalLink](README.md#vitallink)

## Type Aliases

### LinkBaseProps

Ƭ **LinkBaseProps**: `DesignableComponentsProps`<[`LinkComponents`](interfaces/LinkComponents.md)\>

#### Defined in

[vital-link/src/components/Link/types.ts:41](https://github.com/johnsonandjohnson/Bodiless-JS/blob/16f777aa8/packages/vital-link/src/components/Link/types.ts#L41)

## Other Variables

### LinkClean

• `Const` **LinkClean**: `ComponentWithMeta`<`PP`<`PropsWithChildren`<[`LinkBaseProps`](README.md#linkbaseprops)\>, `DesignableProps`<[`LinkComponents`](interfaces/LinkComponents.md)\>, `DesignableComponentsProps`<[`LinkComponents`](interfaces/LinkComponents.md)\>\>\>

#### Defined in

[vital-link/src/components/Link/LinkClean.tsx:45](https://github.com/johnsonandjohnson/Bodiless-JS/blob/16f777aa8/packages/vital-link/src/components/Link/LinkClean.tsx#L45)

___

### LinkStatic

• `Const` **LinkStatic**: `ComponentWithMeta`<`PP`<`PP`<`PropsWithChildren`<[`LinkBaseProps`](README.md#linkbaseprops)\>, `DesignableProps`<[`LinkComponents`](interfaces/LinkComponents.md)\>, `DesignableComponentsProps`<[`LinkComponents`](interfaces/LinkComponents.md)\>\>, {}, {}\>\>

#### Defined in

[vital-link/src/components/Link/LinkClean.tsx:46](https://github.com/johnsonandjohnson/Bodiless-JS/blob/16f777aa8/packages/vital-link/src/components/Link/LinkClean.tsx#L46)

___

### linkComponents

• `Const` **linkComponents**: [`LinkComponents`](interfaces/LinkComponents.md)

#### Defined in

[vital-link/src/components/Link/LinkClean.tsx:23](https://github.com/johnsonandjohnson/Bodiless-JS/blob/16f777aa8/packages/vital-link/src/components/Link/LinkClean.tsx#L23)

___

## Token Collection Variables

### vitalLink

• `Const` **vitalLink**: `VitalLink`

Tokens for Vital Image

**`See`**

[[VitalLink]]

#### Defined in

[vital-link/src/components/Link/tokens/vitalLink.ts:170](https://github.com/johnsonandjohnson/Bodiless-JS/blob/16f777aa8/packages/vital-link/src/components/Link/tokens/vitalLink.ts#L170)

## Other Functions

### anchorTo

▸ **anchorTo**(`elementId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `elementId` | `string` |

#### Returns

`void`

#### Defined in

[vital-link/src/components/Link/util.ts:47](https://github.com/johnsonandjohnson/Bodiless-JS/blob/16f777aa8/packages/vital-link/src/components/Link/util.ts#L47)

___

### asEditableLink

▸ **asEditableLink**(`nodeKeys?`, `defaultData?`, `useOverrides?`): `HOCWithMeta`<{}, `Partial`<`WithNodeProps`\>, {}\>

Produces a HOC which creates an editable link.

**`See`**

asBodilessLink.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeKeys?` | `WithNodeKeyProps` |
| `defaultData?` | `LinkData` |
| `useOverrides?` | `UseBodilessOverrides`<`Props`, `LinkData`, `ExtraLinkOptions` & `FileUploadOptions`\> |

#### Returns

`HOCWithMeta`<{}, `Partial`<`WithNodeProps`\>, {}\>

#### Defined in

bodiless-core/lib/Types/AsBodilessTypes.d.ts:36

___

### useExternalLinkToggle

▸ **useExternalLinkToggle**(`props`): `any`

hook that determines if the link is an external link
the hook validates the data in the current node

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `any` |

#### Returns

`any`

true when link href starts with http:// | https:// | //

#### Defined in

[vital-link/src/components/Link/util.ts:31](https://github.com/johnsonandjohnson/Bodiless-JS/blob/16f777aa8/packages/vital-link/src/components/Link/util.ts#L31)

___

### useIsDownloadLink

▸ **useIsDownloadLink**(`...types`): (`__namedParameters`: `any`) => `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...types` | `string`[] |

#### Returns

`fn`

▸ (`«destructured»`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `any` |

##### Returns

`boolean`

#### Defined in

[vital-link/src/components/Link/util.ts:41](https://github.com/johnsonandjohnson/Bodiless-JS/blob/16f777aa8/packages/vital-link/src/components/Link/util.ts#L41)

___

## Token API Functions

### asLinkToken

▸ **asLinkToken**(`...specs`): `TokenSpec`<[`LinkComponents`](interfaces/LinkComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Type of a function which accepts a list of partial token specifications
and returns a single, complete token specification.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...specs` | (`string` \| `FinalDomains`<[`LinkComponents`](interfaces/LinkComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> \| `HOC`<{}, {}, {}\>)[] | A list of partial token specifications. These may be objects, in which case their keys should be a subset of the allowed domains. They may also be strings or HOCs, which will be converted to partial token specifications, applying the classes or HOC to the `_` key of the `Core` domain. |

#### Returns

`TokenSpec`<[`LinkComponents`](interfaces/LinkComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

fclasses/lib/types.d.ts:400
