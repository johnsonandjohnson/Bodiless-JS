# Vital Flow Container Tokens

The Vital Flow Container is built on top of the [Bodiless Flow
Container](/Components/FlowContainer/). It provides a basic set of components to
choose from, along with some useful tokens that can be used for quick
constraints on Flow Container. It also provides a token that provides the
ability to do a `ContentRegion`, aka a nested Flow Container.

## Content Editor Details

The Content Editor's interaction with the Vital Flow Container is the same as
with the Bodiless Flow Container, so refer to [Bodiless Flow Container : Content
Editor Details](/Components/FlowContainer/#content-editor-details).

## Site Builder Details

?> **API Documentation**: visit
[Vital FlowContainer Token Collection](../../../Development/API/@bodiless/vital-flowcontainer/interfaces/VitalFlowContainer)

### Usage

```js
const Default = asFluidToken(
  {
    ...Base,
    Spacing: {
      Wrapper: vitalSpacing.GutterOffset,
      ComponentWrapper: vitalSpacing.Gutter,
    },
  },
  WithContentRegionVariations,
);

```

### Overriding FlowContainer

#### Via Shadowing (*Preferred Method)

Define a Shadowing token collection as defined in [Shadow](../VitalElements/Shadow).

File to shadow: `packages/{my-package}/src/shadow/@bodiless/vital-flowcontainer/FlowContainer.ts`

?> **API Documentation**: Visit the
[Vital FlowContainer Token Collection](../../../Development/API/@bodiless/vital-flowcontainer/interfaces/VitalFlowContainer)
for examples of shadowing.

## Architectural Details

There are no architecture details necessary for this component.
