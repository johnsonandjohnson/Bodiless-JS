@bodiless/vital-table

# @bodiless/vital-table

## Table of contents

### References

- [vitalTable](README.md#vitaltable)
- [vitalTableStatic](README.md#vitaltablestatic)

### Type aliases

- [TableComponents](README.md#tablecomponents)

### Variables

- [TableClean](README.md#tableclean)
- [TableStatic](README.md#tablestatic)
- [vitalTableBase](README.md#vitaltablebase)
- [vitalTableFlowContainer](README.md#vitaltableflowcontainer)

### Functions

- [asTableToken](README.md#astabletoken)

## References

### vitalTable

Renames and re-exports [vitalTableBase](README.md#vitaltablebase)

___

### vitalTableStatic

Renames and re-exports [vitalTableBase](README.md#vitaltablebase)

## Type aliases

### TableComponents

Ƭ **TableComponents**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Cell` | `ComponentType`<`StylableProps`\> |
| `CellContent` | `ComponentType`<`StylableProps`\> |
| `Row` | `ComponentType`<`StylableProps`\> |
| `TBody` | `ComponentType`<`StylableProps`\> |
| `TFoot` | `ComponentType`<`StylableProps`\> |
| `THead` | `ComponentType`<`StylableProps`\> |
| `Table` | `ComponentType`<`StylableProps`\> |
| `Wrapper` | `ComponentType`<`StylableProps`\> |

#### Defined in

bodiless-table/lib/types.d.ts:21

## Variables

### TableClean

• `Const` **TableClean**: `ComponentWithMeta`<`PP`<`TableProps`, `DesignableProps`<[`TableComponents`](README.md#tablecomponents)\>, `DesignableComponentsProps`<[`TableComponents`](README.md#tablecomponents)\>\>\> = `CleanTable`

#### Defined in

[vital-table/src/components/Table/TableClean.tsx:23](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-table/src/components/Table/TableClean.tsx#L23)

___

### TableStatic

• `Const` **TableStatic**: `ComponentWithMeta`<`PP`<`PP`<`TableProps`, `DesignableProps`<[`TableComponents`](README.md#tablecomponents)\>, `DesignableComponentsProps`<[`TableComponents`](README.md#tablecomponents)\>\>, {}, {}\>\>

#### Defined in

[vital-table/src/components/Table/TableClean.tsx:25](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-table/src/components/Table/TableClean.tsx#L25)

___

### vitalTableBase

• **vitalTableBase**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Default` | `TokenSpec`<[`TableComponents`](README.md#tablecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithBorders` | `TokenSpec`<[`TableComponents`](README.md#tablecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithBottomBorders` | `TokenSpec`<[`TableComponents`](README.md#tablecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithFirstColumnHeader` | `TokenSpec`<[`TableComponents`](README.md#tablecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithFlowContainerPreview` | `TokenSpec`<[`TableComponents`](README.md#tablecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithHoverable` | `TokenSpec`<[`TableComponents`](README.md#tablecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithLightHeaderFooter` | `TokenSpec`<[`TableComponents`](README.md#tablecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithPrimaryHeaderFooter` | `TokenSpec`<[`TableComponents`](README.md#tablecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithRowStripes` | `TokenSpec`<[`TableComponents`](README.md#tablecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithScrolling` | `TokenSpec`<[`TableComponents`](README.md#tablecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithSecondColumnHighlighted` | `TokenSpec`<[`TableComponents`](README.md#tablecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |
| `WithThirdColumnHighlighted` | `TokenSpec`<[`TableComponents`](README.md#tablecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-table/src/components/Table/tokens/vitalTable.ts:171](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-table/src/components/Table/tokens/vitalTable.ts#L171)

___

### vitalTableFlowContainer

• `Const` **vitalTableFlowContainer**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `WithTableVariations` | `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> |

#### Defined in

[vital-table/src/components/FlowContainer/index.ts:62](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-table/src/components/FlowContainer/index.ts#L62)

## Functions

### asTableToken

▸ **asTableToken**(...`specs`): `TokenSpec`<[`TableComponents`](README.md#tablecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...specs` | (`string` \| `FinalDomains`<[`TableComponents`](README.md#tablecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\> \| `HOC`<{}, {}, {}\>)[] |

#### Returns

`TokenSpec`<[`TableComponents`](README.md#tablecomponents), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

[vital-table/src/components/Table/TableClean.tsx:26](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-table/src/components/Table/TableClean.tsx#L26)
