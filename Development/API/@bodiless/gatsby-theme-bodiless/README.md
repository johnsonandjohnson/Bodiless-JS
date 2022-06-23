@bodiless/gatsby-theme-bodiless

# @bodiless/gatsby-theme-bodiless

## Table of contents

### Enumerations

- [GatsbyImagePresets](enums/GatsbyImagePresets.md)

### Classes

- [GatsbyMobxStore](classes/GatsbyMobxStore.md)
- [GatsbyNodeProvider](classes/GatsbyNodeProvider.md)

### Type aliases

- [BodilessImageComponents](README.md#bodilessimagecomponents)
- [PageProps](README.md#pageprops)

### Variables

- [GatsbyLink](README.md#gatsbylink)
- [Page](README.md#page)
- [asGatsbyImage](README.md#asgatsbyimage)
- [asGatsbyLink](README.md#asgatsbylink)

### Functions

- [asTestableGatsbyLink](README.md#astestablegatsbylink)
- [getImageContentFrom](README.md#getimagecontentfrom)
- [isGatsbyImage](README.md#isgatsbyimage)
- [withGatsbyImageLibrary](README.md#withgatsbyimagelibrary)
- [withGatsbyImageLogger](README.md#withgatsbyimagelogger)
- [withGatsbyImageNode](README.md#withgatsbyimagenode)
- [withGatsbyImagePreset](README.md#withgatsbyimagepreset)
- [withoutGatsbyImageProps](README.md#withoutgatsbyimageprops)

## Type aliases

### BodilessImageComponents

Ƭ **BodilessImageComponents**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `GatsbyImage` | `CT`<`GatsbyPluginImageProps`\> |
| `Image` | `CT`<`any`\> |

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/GatsbyImage/asGatsbyImage.tsx:45](https://github.com/johnsonandjohnson/Bodiless-JS/blob/0752eccc/packages/gatsby-theme-bodiless/src/dist/GatsbyImage/asGatsbyImage.tsx#L45)

___

### PageProps

Ƭ **PageProps**: { `ui?`: `UI`  } & `React.ComponentProps`<typeof [`GatsbyNodeProvider`](classes/GatsbyNodeProvider.md)\> & `PageProviderProps`

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/types.ts:34](https://github.com/johnsonandjohnson/Bodiless-JS/blob/0752eccc/packages/gatsby-theme-bodiless/src/dist/types.ts#L34)

## Variables

### GatsbyLink

• `Const` **GatsbyLink**: `ComponentWithMeta`<`PP`<`PP`<`HTMLProps`<`HTMLAnchorElement`\>, `StylableProps`, {}\>, `object` & `DesignableProps`<`Components`\>, {}\>\>

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/GatsbyLink/asGatsbyLink.tsx:78](https://github.com/johnsonandjohnson/Bodiless-JS/blob/0752eccc/packages/gatsby-theme-bodiless/src/dist/GatsbyLink/asGatsbyLink.tsx#L78)

___

### Page

• `Const` **Page**: `FC`<[`PageProps`](README.md#pageprops)\>

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/Page.bl-edit.tsx:63](https://github.com/johnsonandjohnson/Bodiless-JS/blob/0752eccc/packages/gatsby-theme-bodiless/src/dist/Page.bl-edit.tsx#L63)

___

### asGatsbyImage

• `Const` **asGatsbyImage**: `HOCWithMeta`<{}, {}, {}\>

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/GatsbyImage/asGatsbyImage.tsx:240](https://github.com/johnsonandjohnson/Bodiless-JS/blob/0752eccc/packages/gatsby-theme-bodiless/src/dist/GatsbyImage/asGatsbyImage.tsx#L240)

___

### asGatsbyLink

• `Const` **asGatsbyLink**: `HOCWithMeta`<`unknown`, `object` & `DesignableProps`<`Components`\>, {}\>

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/GatsbyLink/asGatsbyLink.tsx:64](https://github.com/johnsonandjohnson/Bodiless-JS/blob/0752eccc/packages/gatsby-theme-bodiless/src/dist/GatsbyLink/asGatsbyLink.tsx#L64)

## Functions

### asTestableGatsbyLink

▸ **asTestableGatsbyLink**<`P`\>(`C`): `ComponentWithMeta`<`PP`<`P`, {}, {}\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `C` | `ComponentOrTag`<`P`\> |

#### Returns

`ComponentWithMeta`<`PP`<`P`, {}, {}\>\>

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/GatsbyLink/asGatsbyLink.tsx:73](https://github.com/johnsonandjohnson/Bodiless-JS/blob/0752eccc/packages/gatsby-theme-bodiless/src/dist/GatsbyLink/asGatsbyLink.tsx#L73)

___

### getImageContentFrom

▸ **getImageContentFrom**(`path`): `GetImageContentFrom`

helper to provide image data from a different content node
when node data is empty in store, then it returns default data
when node data is not empty in store, then it merges default content data with node store data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `Path` | path to node read content from |

#### Returns

`GetImageContentFrom`

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/GatsbyImage/getImageContentFrom.ts:28](https://github.com/johnsonandjohnson/Bodiless-JS/blob/0752eccc/packages/gatsby-theme-bodiless/src/dist/GatsbyImage/getImageContentFrom.ts#L28)

___

### isGatsbyImage

▸ **isGatsbyImage**(`__namedParameters`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `GatsbyImageProps` |

#### Returns

`boolean`

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/GatsbyImage/asGatsbyImage.tsx:253](https://github.com/johnsonandjohnson/Bodiless-JS/blob/0752eccc/packages/gatsby-theme-bodiless/src/dist/GatsbyImage/asGatsbyImage.tsx#L253)

___

### withGatsbyImageLibrary

▸ **withGatsbyImageLibrary**(`preset`): (`asEditableImage`: `AsBodilessImage`) => (`libraryNodeKey`: `string`) => `AsBodilessImage`

#### Parameters

| Name | Type |
| :------ | :------ |
| `preset` | [`GatsbyImagePresets`](enums/GatsbyImagePresets.md) |

#### Returns

`fn`

▸ (`asEditableImage`): (`libraryNodeKey`: `string`) => `AsBodilessImage`

##### Parameters

| Name | Type |
| :------ | :------ |
| `asEditableImage` | `AsBodilessImage` |

##### Returns

`fn`

▸ (`libraryNodeKey`): `AsBodilessImage`

##### Parameters

| Name | Type |
| :------ | :------ |
| `libraryNodeKey` | `string` |

##### Returns

`AsBodilessImage`

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/GatsbyImage/withGatsbyImageLibrary.ts:22](https://github.com/johnsonandjohnson/Bodiless-JS/blob/0752eccc/packages/gatsby-theme-bodiless/src/dist/GatsbyImage/withGatsbyImageLibrary.ts#L22)

___

### withGatsbyImageLogger

▸ **withGatsbyImageLogger**(`preset?`): `HOC`<{}, {}, {}\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `preset?` | [`GatsbyImagePresets`](enums/GatsbyImagePresets.md) |

#### Returns

`HOC`<{}, {}, {}\>

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/GatsbyImage/withGatsbyImageLogger.tsx:25](https://github.com/johnsonandjohnson/Bodiless-JS/blob/0752eccc/packages/gatsby-theme-bodiless/src/dist/GatsbyImage/withGatsbyImageLogger.tsx#L25)

___

### withGatsbyImageNode

▸ **withGatsbyImageNode**(`preset`): `HOC`<{}, {}, {}\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `preset` | [`GatsbyImagePresets`](enums/GatsbyImagePresets.md) |

#### Returns

`HOC`<{}, {}, {}\>

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/GatsbyImage/withGatsbyImageNode.tsx:24](https://github.com/johnsonandjohnson/Bodiless-JS/blob/0752eccc/packages/gatsby-theme-bodiless/src/dist/GatsbyImage/withGatsbyImageNode.tsx#L24)

___

### withGatsbyImagePreset

▸ **withGatsbyImagePreset**(`preset`): (`asEditableImage`: `AsBodilessImage` & { `meta?`: `TokenMeta`  }) => `AsBodilessImage`

#### Parameters

| Name | Type |
| :------ | :------ |
| `preset` | [`GatsbyImagePresets`](enums/GatsbyImagePresets.md) |

#### Returns

`fn`

▸ (`asEditableImage`): `AsBodilessImage`

##### Parameters

| Name | Type |
| :------ | :------ |
| `asEditableImage` | `AsBodilessImage` & { `meta?`: `TokenMeta`  } |

##### Returns

`AsBodilessImage`

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/GatsbyImage/withGatsbyImagePreset.ts:24](https://github.com/johnsonandjohnson/Bodiless-JS/blob/0752eccc/packages/gatsby-theme-bodiless/src/dist/GatsbyImage/withGatsbyImagePreset.ts#L24)

___

### withoutGatsbyImageProps

▸ **withoutGatsbyImageProps**<`P`\>(`C`): `ComponentWithMeta`<`PP`<`P`, `Partial`<`Object`\>, {}\>\>

hoc to remove props configured for GatsbyImage in image data
and to remove props added during image gatsby nodes creation

it can be useful for cases when an image is processed by gatsby
but Gatsby Image is not enabled for the image

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `C` | `ComponentOrTag`<`P`\> |

#### Returns

`ComponentWithMeta`<`PP`<`P`, `Partial`<`Object`\>, {}\>\>

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/GatsbyImage/asGatsbyImage.tsx:262](https://github.com/johnsonandjohnson/Bodiless-JS/blob/0752eccc/packages/gatsby-theme-bodiless/src/dist/GatsbyImage/asGatsbyImage.tsx#L262)
