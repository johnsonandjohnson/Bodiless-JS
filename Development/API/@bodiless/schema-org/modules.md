[@bodiless/schema-org](README.md) / Exports

# @bodiless/schema-org

## Table of contents

### Type aliases

- [FunctionSetter](modules.md#functionsetter)
- [SDProvider](modules.md#sdprovider)
- [SchemaData](modules.md#schemadata)
- [SchemaMap](modules.md#schemamap)
- [SchemaSetter](modules.md#schemasetter)

### Variables

- [FAQSchemaPropsList](modules.md#faqschemapropslist)
- [ProductSchemaPropsList](modules.md#productschemapropslist)
- [StructuredDataProvider](modules.md#structureddataprovider)
- [webSchemaPropList](modules.md#webschemaproplist)

### Functions

- [WithOrganizationSchema](modules.md#withorganizationschema)
- [WithProductSchema](modules.md#withproductschema)
- [WithStructuredDataProvider](modules.md#withstructureddataprovider)
- [WithVideoSchema](modules.md#withvideoschema)
- [WithWebSchema](modules.md#withwebschema)
- [asSchemaSource](modules.md#asschemasource)
- [getSchemaSourceData](modules.md#getschemasourcedata)
- [useIsHomePage](modules.md#useishomepage)
- [useStructuredData](modules.md#usestructureddata)
- [withFAQPageSchema](modules.md#withfaqpageschema)
- [withFAQSchema](modules.md#withfaqschema)
- [withOrganizationSchema](modules.md#withorganizationschema-1)
- [withProductSchema](modules.md#withproductschema-1)
- [withWebSchema](modules.md#withwebschema-1)

## Type aliases

### FunctionSetter

Ƭ **FunctionSetter**: (`schema`: [`SchemaData`](modules.md#schemadata)) => [`SchemaData`](modules.md#schemadata)

#### Type declaration

▸ (`schema`): [`SchemaData`](modules.md#schemadata)

##### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | [`SchemaData`](modules.md#schemadata) |

##### Returns

[`SchemaData`](modules.md#schemadata)

#### Defined in

[StructureDataProvider.tsx:23](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8f5687376/packages/bodiless-schema-org/src/StructureDataProvider.tsx#L23)

___

### SDProvider

Ƭ **SDProvider**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `setStructuredData` | [`SchemaSetter`](modules.md#schemasetter) |

#### Defined in

[StructureDataProvider.tsx:25](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8f5687376/packages/bodiless-schema-org/src/StructureDataProvider.tsx#L25)

___

### SchemaData

Ƭ **SchemaData**: `Record`<`string`, `any`\>

#### Defined in

[StructureDataProvider.tsx:21](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8f5687376/packages/bodiless-schema-org/src/StructureDataProvider.tsx#L21)

___

### SchemaMap

Ƭ **SchemaMap**: `Record`<`string`, [`SchemaData`](modules.md#schemadata)\>

#### Defined in

[StructureDataProvider.tsx:22](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8f5687376/packages/bodiless-schema-org/src/StructureDataProvider.tsx#L22)

___

### SchemaSetter

Ƭ **SchemaSetter**: (`schemaType`: `string`, `data`: [`SchemaData`](modules.md#schemadata) \| [`FunctionSetter`](modules.md#functionsetter)) => `void`

#### Type declaration

▸ (`schemaType`, `data`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `schemaType` | `string` |
| `data` | [`SchemaData`](modules.md#schemadata) \| [`FunctionSetter`](modules.md#functionsetter) |

##### Returns

`void`

#### Defined in

[StructureDataProvider.tsx:24](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8f5687376/packages/bodiless-schema-org/src/StructureDataProvider.tsx#L24)

## Variables

### FAQSchemaPropsList

• `Const` **FAQSchemaPropsList**: `DataStructureSchemaProps`[]

#### Defined in

[schemas/FAQ/index.tsx:58](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8f5687376/packages/bodiless-schema-org/src/schemas/FAQ/index.tsx#L58)

___

### ProductSchemaPropsList

• `Const` **ProductSchemaPropsList**: `DataStructureSchemaProps`[]

#### Defined in

[schemas/Product/index.tsx:23](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8f5687376/packages/bodiless-schema-org/src/schemas/Product/index.tsx#L23)

___

### StructuredDataProvider

• `Const` **StructuredDataProvider**: `FC`

#### Defined in

[StructureDataProvider.tsx:35](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8f5687376/packages/bodiless-schema-org/src/StructureDataProvider.tsx#L35)

___

### webSchemaPropList

• `Const` **webSchemaPropList**: `DataStructureSchemaProps`[]

#### Defined in

[schemas/Web/index.tsx:24](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8f5687376/packages/bodiless-schema-org/src/schemas/Web/index.tsx#L24)

## Functions

### WithOrganizationSchema

▸ **WithOrganizationSchema**<`P`\>(`C`): `ComponentWithMeta`<`PP`<`P`, {}, {}\>\>

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

[schemas/Organization/index.tsx:131](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8f5687376/packages/bodiless-schema-org/src/schemas/Organization/index.tsx#L131)

___

### WithProductSchema

▸ **WithProductSchema**<`P`\>(`C`): `ComponentWithMeta`<`PP`<`P`, {}, {}\>\>

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

[schemas/Product/index.tsx:140](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8f5687376/packages/bodiless-schema-org/src/schemas/Product/index.tsx#L140)

___

### WithStructuredDataProvider

▸ **WithStructuredDataProvider**<`P`\>(`C`): `ComponentWithMeta`<`PP`<`P`, {}, {}\>\>

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

[StructureDataProvider.tsx:76](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8f5687376/packages/bodiless-schema-org/src/StructureDataProvider.tsx#L76)

___

### WithVideoSchema

▸ **WithVideoSchema**<`P`\>(`C`): `ComponentWithMeta`<`PP`<`P`, {}, {}\>\>

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

[schemas/Video/index.tsx:44](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8f5687376/packages/bodiless-schema-org/src/schemas/Video/index.tsx#L44)

___

### WithWebSchema

▸ **WithWebSchema**<`P`\>(`C`): `ComponentWithMeta`<`PP`<`P`, {}, {}\>\>

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

[schemas/Web/index.tsx:70](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8f5687376/packages/bodiless-schema-org/src/schemas/Web/index.tsx#L70)

___

### asSchemaSource

▸ **asSchemaSource**(`name`): `Injector`<{ `data-schema-source`: `String` = name }, `object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `String` |

#### Returns

`Injector`<{ `data-schema-source`: `String` = name }, `object`\>

#### Defined in

[util.ts:19](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8f5687376/packages/bodiless-schema-org/src/util.ts#L19)

___

### getSchemaSourceData

▸ **getSchemaSourceData**(`source`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `Object`[] |

#### Returns

`Object`

#### Defined in

[util.ts:23](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8f5687376/packages/bodiless-schema-org/src/util.ts#L23)

___

### useIsHomePage

▸ **useIsHomePage**(): `boolean`

isHomePage verify if the page is a home page.

#### Returns

`boolean`

true or false if the page to be a home page.

#### Defined in

[util.ts:61](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8f5687376/packages/bodiless-schema-org/src/util.ts#L61)

___

### useStructuredData

▸ **useStructuredData**(): [`SDProvider`](modules.md#sdprovider)

#### Returns

[`SDProvider`](modules.md#sdprovider)

#### Defined in

[StructureDataProvider.tsx:33](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8f5687376/packages/bodiless-schema-org/src/StructureDataProvider.tsx#L33)

___

### withFAQPageSchema

▸ **withFAQPageSchema**(`schemaSourceKeys`): (`Component`: `ComponentType`<{}\>) => (`props`: `object`) => `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `schemaSourceKeys` | `DataStructureSchemaProps`[] |

#### Returns

`fn`

▸ (`Component`): (`props`: `object`) => `Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `Component` | `ComponentType`<{}\> |

##### Returns

`fn`

▸ (`props`): `Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `object` |

##### Returns

`Element`

#### Defined in

[schemas/FAQ/index.tsx:63](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8f5687376/packages/bodiless-schema-org/src/schemas/FAQ/index.tsx#L63)

___

### withFAQSchema

▸ **withFAQSchema**<`P`\>(`C`): `ComponentWithMeta`<`PP`<`P`, {}, {}\>\>

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

[schemas/FAQ/index.tsx:114](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8f5687376/packages/bodiless-schema-org/src/schemas/FAQ/index.tsx#L114)

___

### withOrganizationSchema

▸ **withOrganizationSchema**(): (`Component`: `ComponentType`<{}\>) => (`props`: `object`) => `Element`

#### Returns

`fn`

▸ (`Component`): (`props`: `object`) => `Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `Component` | `ComponentType`<{}\> |

##### Returns

`fn`

▸ (`props`): `Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `object` |

##### Returns

`Element`

#### Defined in

[schemas/Organization/index.tsx:24](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8f5687376/packages/bodiless-schema-org/src/schemas/Organization/index.tsx#L24)

___

### withProductSchema

▸ **withProductSchema**(`schemaSourceKeys`): (`Component`: `ComponentType`<{}\>) => (`props`: `object`) => `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `schemaSourceKeys` | `DataStructureSchemaProps`[] |

#### Returns

`fn`

▸ (`Component`): (`props`: `object`) => `Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `Component` | `ComponentType`<{}\> |

##### Returns

`fn`

▸ (`props`): `Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `object` |

##### Returns

`Element`

#### Defined in

[schemas/Product/index.tsx:43](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8f5687376/packages/bodiless-schema-org/src/schemas/Product/index.tsx#L43)

___

### withWebSchema

▸ **withWebSchema**(): (`Component`: `ComponentType`<{}\>) => (`props`: `object`) => `Element`

#### Returns

`fn`

▸ (`Component`): (`props`: `object`) => `Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `Component` | `ComponentType`<{}\> |

##### Returns

`fn`

▸ (`props`): `Element`

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `object` |

##### Returns

`Element`

#### Defined in

[schemas/Web/index.tsx:31](https://github.com/johnsonandjohnson/Bodiless-JS/blob/8f5687376/packages/bodiless-schema-org/src/schemas/Web/index.tsx#L31)
