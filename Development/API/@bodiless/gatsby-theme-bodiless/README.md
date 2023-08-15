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

### Type Aliases

- [PageProps](README.md#pageprops)

### Variables

- [GatsbyLink](README.md#gatsbylink)

### HOC Utility Functions

- [asTestableGatsbyLink](README.md#astestablegatsbylink)

### Other Functions

- [Page](README.md#page)
- [asGatsbyImage](README.md#asgatsbyimage)
- [asGatsbyLink](README.md#asgatsbylink)
- [getImageContentFrom](README.md#getimagecontentfrom)
- [isGatsbyImage](README.md#isgatsbyimage)
- [withGatsbyImageLibrary](README.md#withgatsbyimagelibrary)
- [withGatsbyImageLogger](README.md#withgatsbyimagelogger)
- [withGatsbyImageNode](README.md#withgatsbyimagenode)
- [withGatsbyImagePreset](README.md#withgatsbyimagepreset)
- [withoutGatsbyImageProps](README.md#withoutgatsbyimageprops)

## Type Aliases

### PageProps

Ƭ **PageProps**: { `ui?`: `UI`  } & `React.ComponentProps`<typeof [`GatsbyNodeProvider`](classes/GatsbyNodeProvider.md)\> & `PageProviderProps`

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/types.ts:34](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8207f8a8d/packages/gatsby-theme-bodiless/src/dist/types.ts#L34)

## Variables

### GatsbyLink

• `Const` **GatsbyLink**: `ComponentWithMeta`<`PP`<`PP`<`HTMLProps`<`HTMLAnchorElement`\>, `StylableProps`, {}\>, `object` & `DesignableProps`<`Components`\>, {}\>\>

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/GatsbyLink/asGatsbyLink.tsx:81](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8207f8a8d/packages/gatsby-theme-bodiless/src/dist/GatsbyLink/asGatsbyLink.tsx#L81)

## HOC Utility Functions

### asTestableGatsbyLink

▸ **asTestableGatsbyLink**<`P`\>(`C`): `ComponentWithMeta`<`PP`<`P`, {}, {}\>\>

Type of a higher-order component.

This is a generic type which allows you to specify how the props of the target
component will be treated. It accepts 3 type parameters:

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

packages/fclasses/lib/types.d.ts:89

___

## Other Functions

### Page

▸ **Page**(`props`, `context?`): ``null`` \| `ReactElement`<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `PropsWithChildren`<[`PageProps`](README.md#pageprops)\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`<`any`, `any`\>

#### Defined in

node_modules/@types/react/ts5.0/index.d.ts:521

___

### asGatsbyImage

▸ **asGatsbyImage**<`P`\>(`C`): `ComponentWithMeta`<`PP`<`P`, {}, {}\>\>

`asGatsbyImage` is a HOC that either replaces the component with GatsbyImg, if the data required
for GatsbyImg is available, or it renders the input component, otherwise.

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

packages/fclasses/lib/types.d.ts:89

___

### asGatsbyLink

▸ **asGatsbyLink**<`P`\>(`C`): `ComponentWithMeta`<`PP`<`P`, `object` & `DesignableProps`<`Components`\>, {}\>\>

**`Deprecated`**

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `C` | `ComponentOrTag`<`P`\> |

#### Returns

`ComponentWithMeta`<`PP`<`P`, `object` & `DesignableProps`<`Components`\>, {}\>\>

#### Defined in

packages/fclasses/lib/types.d.ts:89

___

### getImageContentFrom

▸ **getImageContentFrom**(`path`): `GetImageContentFrom`

helper to provide image data from a different content node
when node data is empty in store, then it returns default data
when node data is not empty in store, then it merges default content data with node store data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `ContentNodePath` | path to node read content from |

#### Returns

`GetImageContentFrom`

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/GatsbyImage/getImageContentFrom.ts:28](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8207f8a8d/packages/gatsby-theme-bodiless/src/dist/GatsbyImage/getImageContentFrom.ts#L28)

___

### isGatsbyImage

▸ **isGatsbyImage**(`«destructured»`): `boolean`

`isGatsbyImage` determines if the image is utlizing gatsby images.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `GatsbyImageProps` |

#### Returns

`boolean`

Boolean

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/GatsbyImage/asGatsbyImage.tsx:273](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8207f8a8d/packages/gatsby-theme-bodiless/src/dist/GatsbyImage/asGatsbyImage.tsx#L273)

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

[packages/gatsby-theme-bodiless/src/dist/GatsbyImage/withGatsbyImageLibrary.ts:22](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8207f8a8d/packages/gatsby-theme-bodiless/src/dist/GatsbyImage/withGatsbyImageLibrary.ts#L22)

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

[packages/gatsby-theme-bodiless/src/dist/GatsbyImage/withGatsbyImageLogger.tsx:30](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8207f8a8d/packages/gatsby-theme-bodiless/src/dist/GatsbyImage/withGatsbyImageLogger.tsx#L30)

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

[packages/gatsby-theme-bodiless/src/dist/GatsbyImage/withGatsbyImageNode.tsx:28](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8207f8a8d/packages/gatsby-theme-bodiless/src/dist/GatsbyImage/withGatsbyImageNode.tsx#L28)

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

[packages/gatsby-theme-bodiless/src/dist/GatsbyImage/withGatsbyImagePreset.ts:24](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8207f8a8d/packages/gatsby-theme-bodiless/src/dist/GatsbyImage/withGatsbyImagePreset.ts#L24)

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

packages/fclasses/lib/types.d.ts:89
