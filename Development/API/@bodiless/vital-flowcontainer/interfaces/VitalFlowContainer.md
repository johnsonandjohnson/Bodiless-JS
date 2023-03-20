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

[vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts:251](https://github.com/johnsonandjohnson/Bodiless-JS/blob/77c02dc26/packages/vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts#L251)

___

### Base

• **Base**: `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Token which creates the VitalDS Default Base for a Flow Container.
This only applies the mandatory categories to category and is using in
composing new tokens and not a functional FlowContainer.

#### Defined in

[vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts:175](https://github.com/johnsonandjohnson/Bodiless-JS/blob/77c02dc26/packages/vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts#L175)

___

### ContentRegion

• **ContentRegion**: `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Defines a flow container which is to be used as a content region (that is,
nested within another flow container). This contains all components
defined in the `Default` flow container with the exception of
the Content Region itself (i.e. you can't have double nesting).

**`example`** change the components which are available in a content region via shadowing
```js
const ContentRegion = asFluidToken({
   ...vitalContentRegionBase.ContentRegion,
   Components: {
     ...vitalContentRegionBase.ContentRegion.Components,
     SomethingNew: on(MyComponentClean)(myComponent.Default),
  },
});
```

#### Defined in

[vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts:247](https://github.com/johnsonandjohnson/Bodiless-JS/blob/77c02dc26/packages/vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts#L247)

___

### Default

• **Default**: `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Defines the default flow container for the Vital DS.
- Core domain defines constraints on categories.
- Spacing domain defines gutters
- Components domain adds the following basic Vital components:
  - Images, Editors, Lists, Content Region (nested flow container).

#### Customizing:

**`example`** Add a custom component to Vital's Default Flow Container via shadowing
```js
import { vitalFlowContainerBase } from '@bodiless/vital-flowcontainer';

const Default = asFluidToken(vitalFlowContainerBase.Default, {
  Components: {
    MyComponent: on(MyComponentClean)(myComponent.Default),
  }
});
```

**`example`** Modifying the Vital's Default Flow Container component spacing via shadowing
```js
import { vitalFlowContainerBase } from '@bodiless/vital-flowcontainer';

const Default = asFluidToken(vitalFlowContainerBase.Default, {
  Spacing: {
    ComponentWrapper: 'my-8',
  },
});
```

**`example`** Add a Content Library to Vital's Default Flow Container via shadowing
```js
import { asFluidToken } from '@bodiless/vital-elements';
import { vitalFlowContainerBase } from '@bodiless/vital-flowcontainer';
import { addProps } from '@bodiless/fclasses';

const Default = asFluidToken(
  vitalFlowContainerBase.Default,
  vitalFlowContainerBase.WithContentLibrary,
);

export default {
  ...vitalFlowContainerBase,
  Default,
};
```

#### Defined in

[vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts:224](https://github.com/johnsonandjohnson/Bodiless-JS/blob/77c02dc26/packages/vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts#L224)

___

### Hero

• **Hero**: `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

**`deprecated`**
Flow container which can be used in the Hero slot.

#### Defined in

[vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts:229](https://github.com/johnsonandjohnson/Bodiless-JS/blob/77c02dc26/packages/vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts#L229)

___

### WithContentLibrary

• **WithContentLibrary**: `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which adds content library functionality.

#### Defined in

[vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts:267](https://github.com/johnsonandjohnson/Bodiless-JS/blob/77c02dc26/packages/vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts#L267)

___

### WithFullWidthConstraint

• **WithFullWidthConstraint**: `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which constrains all items to full width.

#### Defined in

[vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts:255](https://github.com/johnsonandjohnson/Bodiless-JS/blob/77c02dc26/packages/vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts#L255)

___

### WithSingleConstraint

• **WithSingleConstraint**: `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Allows only a single item in the flow container.

#### Defined in

[vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts:263](https://github.com/johnsonandjohnson/Bodiless-JS/blob/77c02dc26/packages/vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts#L263)

___

### WithTabletOneThirdConstraint

• **WithTabletOneThirdConstraint**: `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which constrains all items to 1/3 width on tablet.

#### Defined in

[vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts:259](https://github.com/johnsonandjohnson/Bodiless-JS/blob/77c02dc26/packages/vital-flowcontainer/src/components/FlowContainer/tokens/vitalFlowContainer.ts#L259)
