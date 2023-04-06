@bodiless/gatsby-theme-bodiless

# @bodiless/gatsby-theme-bodiless

## Table of contents

### Enumerations

- [GatsbyImagePresets](enums/GatsbyImagePresets.md)

### Classes

- [GatsbyMobxStore](classes/GatsbyMobxStore.md)
- [GatsbyNodeProvider](classes/GatsbyNodeProvider.md)

### Component Interfaces

- [BodilessImageComponents](interfaces/BodilessImageComponents.md)

### Type aliases

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

### PageProps

Ƭ **PageProps**: { `ui?`: `UI`  } & `React.ComponentProps`<typeof [`GatsbyNodeProvider`](classes/GatsbyNodeProvider.md)\> & `PageProviderProps`

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/types.ts:34](https://github.com/johnsonandjohnson/Bodiless-JS/blob/bb211c74a/packages/gatsby-theme-bodiless/src/dist/types.ts#L34)

## Variables

### GatsbyLink

• `Const` **GatsbyLink**: `ComponentWithMeta`<`PP`<`PP`<`HTMLProps`<`HTMLAnchorElement`\>, `StylableProps`, {}\>, `object` & `DesignableProps`<`Components`\>, {}\>\>

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/GatsbyLink/asGatsbyLink.tsx:81](https://github.com/johnsonandjohnson/Bodiless-JS/blob/bb211c74a/packages/gatsby-theme-bodiless/src/dist/GatsbyLink/asGatsbyLink.tsx#L81)

___

### Page

• `Const` **Page**: `FC`<[`PageProps`](README.md#pageprops)\>

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/Page.bl-edit.tsx:107](https://github.com/johnsonandjohnson/Bodiless-JS/blob/bb211c74a/packages/gatsby-theme-bodiless/src/dist/Page.bl-edit.tsx#L107)

___

### asGatsbyImage

• `Const` **asGatsbyImage**: `HOCWithMeta`<{}, {}, {}\>

`asGatsbyImage` is a HOC that either replaces the component with GatsbyImg, if the data required
for GatsbyImg is available, or it renders the input component, otherwise.

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/GatsbyImage/asGatsbyImage.tsx:256](https://github.com/johnsonandjohnson/Bodiless-JS/blob/bb211c74a/packages/gatsby-theme-bodiless/src/dist/GatsbyImage/asGatsbyImage.tsx#L256)

___

### asGatsbyLink

• `Const` **asGatsbyLink**: `HOCWithMeta`<`unknown`, `object` & `DesignableProps`<`Components`\>, {}\>

**`deprecated`**

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/GatsbyLink/asGatsbyLink.tsx:67](https://github.com/johnsonandjohnson/Bodiless-JS/blob/bb211c74a/packages/gatsby-theme-bodiless/src/dist/GatsbyLink/asGatsbyLink.tsx#L67)

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

[packages/gatsby-theme-bodiless/src/dist/GatsbyLink/asGatsbyLink.tsx:76](https://github.com/johnsonandjohnson/Bodiless-JS/blob/bb211c74a/packages/gatsby-theme-bodiless/src/dist/GatsbyLink/asGatsbyLink.tsx#L76)

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

[packages/gatsby-theme-bodiless/src/dist/GatsbyImage/getImageContentFrom.ts:28](https://github.com/johnsonandjohnson/Bodiless-JS/blob/bb211c74a/packages/gatsby-theme-bodiless/src/dist/GatsbyImage/getImageContentFrom.ts#L28)

___

### isGatsbyImage

▸ **isGatsbyImage**(`__namedParameters`): `boolean`

`isGatsbyImage` determines if the image is utlizing gatsby images.

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `GatsbyImageProps` |

#### Returns

`boolean`

Boolean

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/GatsbyImage/asGatsbyImage.tsx:273](https://github.com/johnsonandjohnson/Bodiless-JS/blob/bb211c74a/packages/gatsby-theme-bodiless/src/dist/GatsbyImage/asGatsbyImage.tsx#L273)

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

[packages/gatsby-theme-bodiless/src/dist/GatsbyImage/withGatsbyImageLibrary.ts:22](https://github.com/johnsonandjohnson/Bodiless-JS/blob/bb211c74a/packages/gatsby-theme-bodiless/src/dist/GatsbyImage/withGatsbyImageLibrary.ts#L22)

___

### withGatsbyImageLogger

▸ **withGatsbyImageLogger**(`preset?`): `HOC`<{}, {}, {}\>

`withGatsbyImageLogger` is a HOF that fails Gatsby build and logs errors when there
is a mismatch between the image preset passed as an argument to the Gatsby Image node
and the corresponding image preset stored in the image node JSON file.

#### Parameters

| Name | Type |
| :------ | :------ |
| `preset?` | [`GatsbyImagePresets`](enums/GatsbyImagePresets.md) |

#### Returns

`HOC`<{}, {}, {}\>

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/GatsbyImage/withGatsbyImageLogger.tsx:30](https://github.com/johnsonandjohnson/Bodiless-JS/blob/bb211c74a/packages/gatsby-theme-bodiless/src/dist/GatsbyImage/withGatsbyImageLogger.tsx#L30)

___

### withGatsbyImageNode

▸ **withGatsbyImageNode**(`preset`): `HOC`<{}, {}, {}\>

`withGatsbyImageNode` is a HOF that adds a Gatsby Image BodilessJS node,
which enriches image node data with image preset provided as an input.

#### Parameters

| Name | Type |
| :------ | :------ |
| `preset` | [`GatsbyImagePresets`](enums/GatsbyImagePresets.md) |

#### Returns

`HOC`<{}, {}, {}\>

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/GatsbyImage/withGatsbyImageNode.tsx:28](https://github.com/johnsonandjohnson/Bodiless-JS/blob/bb211c74a/packages/gatsby-theme-bodiless/src/dist/GatsbyImage/withGatsbyImageNode.tsx#L28)

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

[packages/gatsby-theme-bodiless/src/dist/GatsbyImage/withGatsbyImagePreset.ts:24](https://github.com/johnsonandjohnson/Bodiless-JS/blob/bb211c74a/packages/gatsby-theme-bodiless/src/dist/GatsbyImage/withGatsbyImagePreset.ts#L24)

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

[packages/gatsby-theme-bodiless/src/dist/GatsbyImage/asGatsbyImage.tsx:282](https://github.com/johnsonandjohnson/Bodiless-JS/blob/bb211c74a/packages/gatsby-theme-bodiless/src/dist/GatsbyImage/asGatsbyImage.tsx#L282)
