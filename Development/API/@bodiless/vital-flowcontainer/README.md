@bodiless/vital-flowcontainer

# @bodiless/vital-flowcontainer

## Table of contents

### Component Interfaces

- [FlowContainerComponents](interfaces/FlowContainerComponents.md)

### Token Collection Interfaces

- [VitalFlowContainer](interfaces/VitalFlowContainer.md)

### Component Variables

- [FlowContainerClean](README.md#flowcontainerclean)
- [FlowContainerStatic](README.md#flowcontainerstatic)

### Token Collection Variables

- [vitalFlowContainer](README.md#vitalflowcontainer)
- [vitalFlowContainerBase](README.md#vitalflowcontainerbase)
- [vitalFlowContainerStatic](README.md#vitalflowcontainerstatic)

## Component Variables

### FlowContainerClean

• `Const` **FlowContainerClean**: `FC`<`Omit`<`FlowContainerProps`, ``"ui"``\>\> = `FlowContainer`

This is the base component for flow containers.

**`example`**
**Create a default flow container:**
```
const DefaultFlowContainer = on(FlowContainerClean)(vitalFlowContainer.Default)
```

**`example`**
**Create a custom flow container using a token defined in your package**
```
const CustomFlowContainer = on(FlowContainerClean)(myBrandFlowContainer.Custom)
```

#### Defined in

[vital-flowcontainer/src/components/FlowContainer/FlowContainerClean.tsx:39](https://github.com/johnsonandjohnson/Bodiless-JS/blob/035171bdd/packages/vital-flowcontainer/src/components/FlowContainer/FlowContainerClean.tsx#L39)

___

### FlowContainerStatic

• `Const` **FlowContainerStatic**: `ComponentWithMeta`<`PP`<`Omit`<`FlowContainerProps`, ``"ui"``\>, {}, {}\>\>

Use this version of the flow container when all components are static.

#### Defined in

[vital-flowcontainer/src/components/FlowContainer/FlowContainerClean.tsx:54](https://github.com/johnsonandjohnson/Bodiless-JS/blob/035171bdd/packages/vital-flowcontainer/src/components/FlowContainer/FlowContainerClean.tsx#L54)

___

## Token Collection Variables

### vitalFlowContainer

• `Const` **vitalFlowContainer**: [`VitalFlowContainer`](interfaces/VitalFlowContainer.md)

Tokens for flow containers.

**`see`** [VitalFlowContainer](interfaces/VitalFlowContainer.md)

**`see`** [FlowContainerClean](README.md#flowcontainerclean)

#### Defined in

[vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts:244](https://github.com/johnsonandjohnson/Bodiless-JS/blob/035171bdd/packages/vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts#L244)

___

### vitalFlowContainerBase

• `Const` **vitalFlowContainerBase**: [`VitalFlowContainer`](interfaces/VitalFlowContainer.md) = `vitalFlowContainerOrig`

Use this version of the vital flow container tokens when extending or shadowing.

**`see`** vitalFlowContainer

#### Defined in

[vital-flowcontainer/src/components/FlowContainer/index.ts:25](https://github.com/johnsonandjohnson/Bodiless-JS/blob/035171bdd/packages/vital-flowcontainer/src/components/FlowContainer/index.ts#L25)

___

### vitalFlowContainerStatic

• `Const` **vitalFlowContainerStatic**: [`VitalFlowContainer`](interfaces/VitalFlowContainer.md) = `vitalFlowContainer`

Use these flow container tokens only with `FlowContainerStatic`

#### Defined in

[vital-flowcontainer/src/components/FlowContainer/index.bl-edit.ts:22](https://github.com/johnsonandjohnson/Bodiless-JS/blob/035171bdd/packages/vital-flowcontainer/src/components/FlowContainer/index.bl-edit.ts#L22)
