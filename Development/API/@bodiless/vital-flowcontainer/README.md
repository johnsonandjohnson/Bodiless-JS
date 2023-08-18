@bodiless/vital-flowcontainer

# @bodiless/vital-flowcontainer

## Table of contents

### Component Interfaces

- [FlowContainerComponents](interfaces/FlowContainerComponents.md)

### Token Collection Interfaces

- [VitalFlowContainer](interfaces/VitalFlowContainer.md)

### Component Variables

- [FlowContainerStatic](README.md#flowcontainerstatic)

### Token Collection Variables

- [vitalFlowContainer](README.md#vitalflowcontainer)
- [vitalFlowContainerStatic](README.md#vitalflowcontainerstatic)

### Component Functions

- [FlowContainerClean](README.md#flowcontainerclean)

## Component Variables

### FlowContainerStatic

• `Const` **FlowContainerStatic**: `ComponentWithMeta`<`PP`<`Omit`<`FlowContainerProps`, ``"ui"``\>, {}, {}\>\>

Use this version of the flow container when all components are static.

#### Defined in

[packages/vital-flowcontainer/src/components/FlowContainer/FlowContainerClean.tsx:54](https://github.com/johnsonandjohnson/Bodiless-JS/blob/e22f7895e/packages/vital-flowcontainer/src/components/FlowContainer/FlowContainerClean.tsx#L54)

___

## Token Collection Variables

### vitalFlowContainer

• `Const` **vitalFlowContainer**: [`VitalFlowContainer`](interfaces/VitalFlowContainer.md)

Tokens for flow containers.

**`See`**

 - [[VitalFlowContainer]]
 - [[FlowContainerClean]]

#### Defined in

[packages/vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts:244](https://github.com/johnsonandjohnson/Bodiless-JS/blob/e22f7895e/packages/vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts#L244)

___

### vitalFlowContainerStatic

• `Const` **vitalFlowContainerStatic**: [`VitalFlowContainer`](interfaces/VitalFlowContainer.md) = `vitalFlowContainer`

Use these flow container tokens only with `FlowContainerStatic`

#### Defined in

[packages/vital-flowcontainer/src/components/FlowContainer/index.bl-edit.ts:22](https://github.com/johnsonandjohnson/Bodiless-JS/blob/e22f7895e/packages/vital-flowcontainer/src/components/FlowContainer/index.bl-edit.ts#L22)

## Component Functions

### FlowContainerClean

▸ **FlowContainerClean**(`props`, `context?`): ``null`` \| `ReactElement`<`any`, `any`\>

This is the base component for flow containers.

**`Example`**

**Create a default flow container:**
```
const DefaultFlowContainer = on(FlowContainerClean)(vitalFlowContainer.Default)
```

**`Example`**

**Create a custom flow container using a token defined in your package**
```
const CustomFlowContainer = on(FlowContainerClean)(myBrandFlowContainer.Custom)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Omit`<`FlowContainerProps`, ``"ui"``\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`<`any`, `any`\>

#### Defined in

node_modules/@types/react/ts5.0/index.d.ts:521
