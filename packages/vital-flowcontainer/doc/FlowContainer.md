# Vital Flow Container Tokens

The Vital Flow Container is built on top of the [Bodiless Flow
Container](/Components/FlowContainer/). It provides a basic set of components to choose from, along
with some useful tokens that can be used for quick constraints on Flow Container. It also provides a
token that provides the ability to do a `ContentRegion`, aka a nested Flow Container.

## Content Editor Details

The Content Editor's interaction with the Vital Flow Container is the same as with the Bodiless Flow
Container, so refer to [Bodiless Flow Container : Content Editor
Details](/Components/FlowContainer/#content-editor-details).

## Site Builder Details

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

## Architectural Details

There are no architecture details necessary for this component.
