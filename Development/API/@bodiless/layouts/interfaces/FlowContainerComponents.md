[@bodiless/layouts](../README.md) / FlowContainerComponents

# Interface: FlowContainerComponents

Design keys available for the flow container.

## Hierarchy

- `DesignableComponents`

  ↳ **`FlowContainerComponents`**

## Table of contents

### Properties

- [ComponentWrapper](FlowContainerComponents.md#componentwrapper)
- [Wrapper](FlowContainerComponents.md#wrapper)

## Properties

### ComponentWrapper

• **ComponentWrapper**: `ComponentOrTag`<`any`\>

The wrapper for each component placed in the flow container.  Usually a `Div`.
Width classes are applied to this wrapper dynamically to control layout.

#### Defined in

[packages/bodiless-layouts/src/FlowContainer/types.ts:107](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/FlowContainer/types.ts#L107)

___

### Wrapper

• **Wrapper**: `ComponentOrTag`<`any`\>

The outer wrapper of the flow container.  Usually a `Div`.
This will have `flex` and `flex-row` classes by default to manage
the layout of its children.

#### Defined in

[packages/bodiless-layouts/src/FlowContainer/types.ts:102](https://github.com/johnsonandjohnson/Bodiless-JS/blob/5e5762af0/packages/bodiless-layouts/src/FlowContainer/types.ts#L102)
