[@bodiless/i18n](../README.md) / LanguageContentNode

# Class: LanguageContentNode<D\>

LanguageContentNode class allows to handle content nodes for current language.

## Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends `object` |

## Hierarchy

- `DefaultContentNode`<`D`\>

  ↳ **`LanguageContentNode`**

## Table of contents

### Constructors

- [constructor](LanguageContentNode.md#constructor)

### Properties

- [actions](LanguageContentNode.md#actions)
- [getters](LanguageContentNode.md#getters)
- [langcode](LanguageContentNode.md#langcode)
- [path](LanguageContentNode.md#path)

### Accessors

- [baseResourcePath](LanguageContentNode.md#baseresourcepath)
- [data](LanguageContentNode.md#data)
- [hasError](LanguageContentNode.md#haserror)
- [keys](LanguageContentNode.md#keys)
- [pagePath](LanguageContentNode.md#pagepath)

### Methods

- [child](LanguageContentNode.md#child)
- [delete](LanguageContentNode.md#delete)
- [getActions](LanguageContentNode.md#getactions)
- [getGetters](LanguageContentNode.md#getgetters)
- [peer](LanguageContentNode.md#peer)
- [proxy](LanguageContentNode.md#proxy)
- [setData](LanguageContentNode.md#setdata)
- [setLanguage](LanguageContentNode.md#setlanguage)
- [create](LanguageContentNode.md#create)
- [dummy](LanguageContentNode.md#dummy)

## Constructors

### constructor

• **new LanguageContentNode**<`D`\>(`actions`, `getters`, `path`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `actions` | `Actions` |
| `getters` | `Getters` |
| `path` | `ContentNodePath` |

#### Inherited from

DefaultContentNode<D\>.constructor

#### Defined in

bodiless-data/lib/ContentNode.d.ts:48

## Properties

### actions

• `Protected` **actions**: `Actions`

#### Inherited from

DefaultContentNode.actions

#### Defined in

bodiless-data/lib/ContentNode.d.ts:45

___

### getters

• `Protected` **getters**: `Getters`

#### Inherited from

DefaultContentNode.getters

#### Defined in

bodiless-data/lib/ContentNode.d.ts:46

___

### langcode

• `Private` **langcode**: `string`

#### Defined in

[bodiless-i18n/src/LanguageNode/LanguageContentNode.ts:10](https://github.com/johnsonandjohnson/Bodiless-JS/blob/c7cec792d/packages/bodiless-i18n/src/LanguageNode/LanguageContentNode.ts#L10)

___

### path

• **path**: `string`[]

#### Inherited from

DefaultContentNode.path

#### Defined in

bodiless-data/lib/ContentNode.d.ts:47

## Accessors

### baseResourcePath

• `get` **baseResourcePath**(): `string`

#### Returns

`string`

#### Inherited from

DefaultContentNode.baseResourcePath

#### Defined in

bodiless-data/lib/ContentNode.d.ts:53

___

### data

• `get` **data**(): `any`

#### Returns

`any`

#### Inherited from

DefaultContentNode.data

#### Defined in

bodiless-data/lib/ContentNode.d.ts:51

___

### hasError

• `get` **hasError**(): () => `boolean`

#### Returns

`fn`

▸ (): `boolean`

##### Returns

`boolean`

#### Inherited from

DefaultContentNode.hasError

#### Defined in

bodiless-data/lib/ContentNode.d.ts:57

___

### keys

• `get` **keys**(): `string`[]

#### Returns

`string`[]

#### Inherited from

DefaultContentNode.keys

#### Defined in

bodiless-data/lib/ContentNode.d.ts:56

___

### pagePath

• `get` **pagePath**(): `string`

#### Returns

`string`

#### Inherited from

DefaultContentNode.pagePath

#### Defined in

bodiless-data/lib/ContentNode.d.ts:52

## Methods

### child

▸ **child**<`E`\>(`path`): `DefaultContentNode`<`E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `ContentNodePath` |

#### Returns

`DefaultContentNode`<`E`\>

#### Inherited from

DefaultContentNode.child

#### Defined in

bodiless-data/lib/ContentNode.d.ts:50

___

### delete

▸ **delete**(`path?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path?` | `ContentNodePath` |

#### Returns

`void`

#### Inherited from

DefaultContentNode.delete

#### Defined in

bodiless-data/lib/ContentNode.d.ts:55

___

### getActions

▸ **getActions**(): `Actions`

#### Returns

`Actions`

#### Inherited from

DefaultContentNode.getActions

#### Defined in

bodiless-data/lib/ContentNode.d.ts:60

___

### getGetters

▸ **getGetters**(): `Getters`

#### Returns

`Getters`

#### Inherited from

DefaultContentNode.getGetters

#### Defined in

bodiless-data/lib/ContentNode.d.ts:59

___

### peer

▸ **peer**<`E`\>(`path`): `DefaultContentNode`<`E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `ContentNodePath` |

#### Returns

`DefaultContentNode`<`E`\>

#### Inherited from

DefaultContentNode.peer

#### Defined in

bodiless-data/lib/ContentNode.d.ts:49

___

### proxy

▸ **proxy**(`processors`): `ContentNode`<`D`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `processors` | `Processors`<`D`\> |

#### Returns

`ContentNode`<`D`\>

#### Inherited from

DefaultContentNode.proxy

#### Defined in

bodiless-data/lib/ContentNode.d.ts:58

___

### setData

▸ **setData**(`dataObj`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataObj` | `D` |

#### Returns

`void`

#### Inherited from

DefaultContentNode.setData

#### Defined in

bodiless-data/lib/ContentNode.d.ts:54

___

### setLanguage

▸ **setLanguage**(`langcode`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `langcode` | `string` |

#### Returns

`void`

#### Defined in

[bodiless-i18n/src/LanguageNode/LanguageContentNode.ts:27](https://github.com/johnsonandjohnson/Bodiless-JS/blob/c7cec792d/packages/bodiless-i18n/src/LanguageNode/LanguageContentNode.ts#L27)

___

### create

▸ `Static` **create**(`node`, `langcode`): [`LanguageContentNode`](LanguageContentNode.md)<`object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `DefaultContentNode`<`object`\> |
| `langcode` | `string` |

#### Returns

[`LanguageContentNode`](LanguageContentNode.md)<`object`\>

#### Defined in

[bodiless-i18n/src/LanguageNode/LanguageContentNode.ts:12](https://github.com/johnsonandjohnson/Bodiless-JS/blob/c7cec792d/packages/bodiless-i18n/src/LanguageNode/LanguageContentNode.ts#L12)

___

### dummy

▸ `Static` **dummy**(`path?`, `initialData?`): `DefaultContentNode`<`object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path?` | `string` |
| `initialData?` | `Object` |

#### Returns

`DefaultContentNode`<`object`\>

#### Inherited from

DefaultContentNode.dummy

#### Defined in

bodiless-data/lib/ContentNode.d.ts:61
