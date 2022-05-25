[@bodiless/vital-search](../README.md) / [Exports](../modules.md) / SearchEngineInterface

# Interface: SearchEngineInterface

## Table of contents

### Methods

- [addDocuments](SearchEngineInterface.md#adddocuments)
- [createIndex](SearchEngineInterface.md#createindex)
- [exportIndex](SearchEngineInterface.md#exportindex)
- [getEngineName](SearchEngineInterface.md#getenginename)
- [getIndex](SearchEngineInterface.md#getindex)
- [getIndexConfig](SearchEngineInterface.md#getindexconfig)
- [loadIndex](SearchEngineInterface.md#loadindex)
- [loadPreviews](SearchEngineInterface.md#loadpreviews)
- [search](SearchEngineInterface.md#search)
- [setIndexConfig](SearchEngineInterface.md#setindexconfig)

## Methods

### addDocuments

▸ **addDocuments**(`doc`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `doc` | [`TDocument`](../modules.md#tdocument) \| [`TDocument`](../modules.md#tdocument)[] |

#### Returns

`void`

#### Defined in

bodiless-search/lib/types.d.ts:29

___

### createIndex

▸ **createIndex**(): `Index`

#### Returns

`Index`

#### Defined in

bodiless-search/lib/types.d.ts:27

___

### exportIndex

▸ **exportIndex**(): `string`

#### Returns

`string`

#### Defined in

bodiless-search/lib/types.d.ts:28

___

### getEngineName

▸ **getEngineName**(): `string`

#### Returns

`string`

#### Defined in

bodiless-search/lib/types.d.ts:23

___

### getIndex

▸ **getIndex**(): ``null`` \| `Index`

#### Returns

``null`` \| `Index`

#### Defined in

bodiless-search/lib/types.d.ts:25

___

### getIndexConfig

▸ **getIndexConfig**(): ``null`` \| [`TIndexConfig`](../modules.md#tindexconfig)

#### Returns

``null`` \| [`TIndexConfig`](../modules.md#tindexconfig)

#### Defined in

bodiless-search/lib/types.d.ts:24

___

### loadIndex

▸ **loadIndex**(`index`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `object` |

#### Returns

`void`

#### Defined in

bodiless-search/lib/types.d.ts:30

___

### loadPreviews

▸ **loadPreviews**(`previews`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `previews` | `Object` |

#### Returns

`void`

#### Defined in

bodiless-search/lib/types.d.ts:31

___

### search

▸ **search**(`queryString`): [`TSearchResults`](../modules.md#tsearchresults)

#### Parameters

| Name | Type |
| :------ | :------ |
| `queryString` | `string` |

#### Returns

[`TSearchResults`](../modules.md#tsearchresults)

#### Defined in

bodiless-search/lib/types.d.ts:34

___

### setIndexConfig

▸ **setIndexConfig**(`conf`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `conf` | [`TIndexConfig`](../modules.md#tindexconfig) |

#### Returns

`void`

#### Defined in

bodiless-search/lib/types.d.ts:26
