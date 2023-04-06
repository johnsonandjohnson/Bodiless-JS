[@bodiless/gatsby-theme-bodiless](../README.md) / GatsbyMobxStore

# Class: GatsbyMobxStore

## Hierarchy

- `BodilessMobxStore`<`GatsbyData`\>

  ↳ **`GatsbyMobxStore`**

## Table of contents

### Constructors

- [constructor](GatsbyMobxStore.md#constructor)

### Properties

- [client](GatsbyMobxStore.md#client)
- [data](GatsbyMobxStore.md#data)
- [deleteItem](GatsbyMobxStore.md#deleteitem)
- [deleteNode](GatsbyMobxStore.md#deletenode)
- [getChildrenNodes](GatsbyMobxStore.md#getchildrennodes)
- [getKeys](GatsbyMobxStore.md#getkeys)
- [getNode](GatsbyMobxStore.md#getnode)
- [hasError](GatsbyMobxStore.md#haserror)
- [setItem](GatsbyMobxStore.md#setitem)
- [setNode](GatsbyMobxStore.md#setnode)
- [slug](GatsbyMobxStore.md#slug)
- [store](GatsbyMobxStore.md#store)
- [nodeChildDelimiter](GatsbyMobxStore.md#nodechilddelimiter)

### Methods

- [getPendingItems](GatsbyMobxStore.md#getpendingitems)
- [parseData](GatsbyMobxStore.md#parsedata)
- [updateData](GatsbyMobxStore.md#updatedata)

## Constructors

### constructor

• **new GatsbyMobxStore**(`config?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | `BodilessStoreConfig` |

#### Inherited from

BodilessMobxStore<GatsbyData\>.constructor

#### Defined in

packages/bodiless-core/lib/Store/BodilessMobxStore.d.ts:37

## Properties

### client

• **client**: `undefined` \| `BodilessStoreBackend`

#### Inherited from

BodilessMobxStore.client

#### Defined in

packages/bodiless-core/lib/Store/BodilessMobxStore.d.ts:34

___

### data

• **data**: `any`

#### Inherited from

BodilessMobxStore.data

#### Defined in

packages/bodiless-core/lib/Store/BodilessMobxStore.d.ts:36

___

### deleteItem

• **deleteItem**: (`key`: `string`, `soft?`: `boolean`) => `boolean` \| `void`

#### Type declaration

▸ (`key`, `soft?`): `boolean` \| `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `soft?` | `boolean` |

##### Returns

`boolean` \| `void`

#### Inherited from

BodilessMobxStore.deleteItem

#### Defined in

packages/bodiless-core/lib/Store/BodilessMobxStore.d.ts:65

___

### deleteNode

• **deleteNode**: (`keyPath`: `string`[]) => `void`

#### Type declaration

▸ (`keyPath`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `keyPath` | `string`[] |

##### Returns

`void`

#### Inherited from

BodilessMobxStore.deleteNode

#### Defined in

packages/bodiless-core/lib/Store/BodilessMobxStore.d.ts:71

___

### getChildrenNodes

• **getChildrenNodes**: (`keyPath`: `string`[]) => [`string`, `StoreItem`][]

#### Type declaration

▸ (`keyPath`): [`string`, `StoreItem`][]

##### Parameters

| Name | Type |
| :------ | :------ |
| `keyPath` | `string`[] |

##### Returns

[`string`, `StoreItem`][]

#### Inherited from

BodilessMobxStore.getChildrenNodes

#### Defined in

packages/bodiless-core/lib/Store/BodilessMobxStore.d.ts:70

___

### getKeys

• **getKeys**: () => `string`[]

#### Type declaration

▸ (): `string`[]

##### Returns

`string`[]

#### Inherited from

BodilessMobxStore.getKeys

#### Defined in

packages/bodiless-core/lib/Store/BodilessMobxStore.d.ts:62

___

### getNode

• **getNode**: (`keyPath`: `string`[]) => `any`

#### Type declaration

▸ (`keyPath`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `keyPath` | `string`[] |

##### Returns

`any`

#### Inherited from

BodilessMobxStore.getNode

#### Defined in

packages/bodiless-core/lib/Store/BodilessMobxStore.d.ts:63

___

### hasError

• **hasError**: () => `boolean`

#### Type declaration

▸ (): `boolean`

##### Returns

`boolean`

#### Inherited from

BodilessMobxStore.hasError

#### Defined in

packages/bodiless-core/lib/Store/BodilessMobxStore.d.ts:72

___

### setItem

• **setItem**: (`key`: `string`, `item`: `StoreItem`) => `void`

#### Type declaration

▸ (`key`, `item`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `item` | `StoreItem` |

##### Returns

`void`

#### Inherited from

BodilessMobxStore.setItem

#### Defined in

packages/bodiless-core/lib/Store/BodilessMobxStore.d.ts:64

___

### setNode

• **setNode**: (`keyPath`: `string`[], `value?`: {}, `event?`: `ItemStateEvent`) => `void`

#### Type declaration

▸ (`keyPath`, `value?`, `event?`): `void`

Mobx action saves or updates items.

##### Parameters

| Name | Type |
| :------ | :------ |
| `keyPath` | `string`[] |
| `value?` | `Object` |
| `event?` | `ItemStateEvent` |

##### Returns

`void`

#### Inherited from

BodilessMobxStore.setNode

#### Defined in

packages/bodiless-core/lib/Store/BodilessMobxStore.d.ts:69

___

### slug

• **slug**: `undefined` \| `string`

#### Inherited from

BodilessMobxStore.slug

#### Defined in

packages/bodiless-core/lib/Store/BodilessMobxStore.d.ts:35

___

### store

• **store**: `Map`<`string`, `StoreItem`\>

#### Inherited from

BodilessMobxStore.store

#### Defined in

packages/bodiless-core/lib/Store/BodilessMobxStore.d.ts:33

___

### nodeChildDelimiter

▪ `Static` **nodeChildDelimiter**: `string`

#### Inherited from

BodilessMobxStore.nodeChildDelimiter

#### Defined in

packages/bodiless-core/lib/Store/BodilessMobxStore.d.ts:32

## Methods

### getPendingItems

▸ **getPendingItems**(): `StoreItem`[]

Returns a list of items which have not yet been seriaized.

#### Returns

`StoreItem`[]

#### Inherited from

BodilessMobxStore.getPendingItems

#### Defined in

packages/bodiless-core/lib/Store/BodilessMobxStore.d.ts:51

___

### parseData

▸ `Protected` **parseData**(`gatsbyData`): `Map`<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `gatsbyData` | `GatsbyData` |

#### Returns

`Map`<`any`, `any`\>

#### Overrides

BodilessMobxStore.parseData

#### Defined in

[packages/gatsby-theme-bodiless/src/dist/GatsbyMobxStore.ts:32](https://github.com/johnsonandjohnson/Bodiless-JS/blob/38970844d/packages/gatsby-theme-bodiless/src/dist/GatsbyMobxStore.ts#L32)

___

### updateData

▸ **updateData**(`rawData`): `void`

Called at initial page render to initialize our data.
Note - we just copy the results to our unobserved data structure unless modifications
have been made, in which case we update the observable store.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rawData` | `GatsbyData` | The data with which to update the store. Should inclue both page level and site level data necessary to render a page. |

#### Returns

`void`

#### Inherited from

BodilessMobxStore.updateData

#### Defined in

packages/bodiless-core/lib/Store/BodilessMobxStore.d.ts:61
