[@bodiless/vital-flowcontainer](../README.md) / VitalFlowContainer

# Interface: VitalFlowContainer

Tokens for the vital flow container

**`see`** [FlowContainerClean](../README.md#flowcontainerclean)

## Table of contents

### Properties

- [AsFlowContainerItem](VitalFlowContainer.md#asflowcontaineritem)
- [Base](VitalFlowContainer.md#base)
- [ContentRegion](VitalFlowContainer.md#contentregion)
- [Default](VitalFlowContainer.md#default)
- [Hero](VitalFlowContainer.md#hero)
- [WithContentLibrary](VitalFlowContainer.md#withcontentlibrary)
- [WithFullWidthConstraint](VitalFlowContainer.md#withfullwidthconstraint)
- [WithSingleConstraint](VitalFlowContainer.md#withsingleconstraint)
- [WithTabletOneThirdConstraint](VitalFlowContainer.md#withtabletonethirdconstraint)

## Properties

### AsFlowContainerItem

• **AsFlowContainerItem**: `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which enables a flow container to be nested inside another.

#### Defined in

[vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts:238](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9a22989f2/packages/vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts#L238)

___

### Base

• **Base**: `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

#### Defined in

[vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts:189](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9a22989f2/packages/vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts#L189)

___

### ContentRegion

• **ContentRegion**: `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Defins a flow container which is to be used as a content region (that is,
nested within another flow container). This contains all components
defined in the `Default` flow container with the exception of
the Content Region itself (i.e. you can't have double nesting).

You can shadow this token to change the components which are available
in a content region.  For example:
```ts
const ContentRegion = asFluidToken({
   ...vitalContentRegionBase.ContentRegion,
   Components: {
     ...vitalContentRegionBase.ContentRegion.Components,
     SomethingNew: on(MyComponentClean)(myComponent.Default),
  },
});
```

#### Defined in

[vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts:234](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9a22989f2/packages/vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts#L234)

___

### Default

• **Default**: `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Defines the default flow container for the Vital DS.
- Core domain defines constraints on categories.
- Spacing domain defines gutters
- Components domain adds the following basic Vital components:
  - Images, Editors, Lists, Content Region (nested flow container).

#### Customizing:

**`example`** Add a component
```js
import { vitalFlowContainerBase } from '@bodiless/vital-flowcontainer';

const Default = asFluidToken(vitalFlowContainerBase.Default, {
  Components: {
    MyComponent: on(MyComponentClean)(myComponent.Default),
  }
});
```

#### Defined in

[vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts:210](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9a22989f2/packages/vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts#L210)

___

### Hero

• **Hero**: `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

**`deprecated`**
Flow container which can be used in the Hero slot.

#### Defined in

[vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts:215](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9a22989f2/packages/vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts#L215)

___

### WithContentLibrary

• **WithContentLibrary**: `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which adds content library functionality.

#### Defined in

[vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts:254](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9a22989f2/packages/vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts#L254)

___

### WithFullWidthConstraint

• **WithFullWidthConstraint**: `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which constrains all items to full width.

#### Defined in

[vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts:242](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9a22989f2/packages/vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts#L242)

___

### WithSingleConstraint

• **WithSingleConstraint**: `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Allows only a single item in the flow container.

#### Defined in

[vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts:250](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9a22989f2/packages/vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts#L250)

___

### WithTabletOneThirdConstraint

• **WithTabletOneThirdConstraint**: `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which constrains all items to 1/3 width on tablet.

#### Defined in

[vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts:246](https://github.com/johnsonandjohnson/Bodiless-JS/blob/9a22989f2/packages/vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts#L246)
