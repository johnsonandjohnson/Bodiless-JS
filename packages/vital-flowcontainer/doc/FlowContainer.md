# Vital Flow Container Tokens

The Vital Flow Container is just a passthrough, and uses the [Bodiless Flow
Container](/Components/FlowContainer/). The Vital Flow Container package does, however, provide some
useful tokens that can be used for quick constraints on Flow Container. It also provides a token
that provides the ability to do a `ContentRegion`, aka a nested Flow Container.

## Content Editor Details

The Content Editor's interaction with the Vital Flow Container is the same as with the Bodiless Flow
Container, so refer to [Bodiless Flow Container : Content Editor
Details](/Components/FlowContainer/#content-editor-details).

## Site Builder Details

### Available Tokens

- `WithFullWidthConstraint`: Components with this Flow Container will always be full-width at any
  viewport.
- `WithTabletOneThirdConstraint`: Components will default to one-third-width upon addition on
  tablet/desktop viewports, but can changed at either viewport if not desired. This token is useful
  to apply if you expect that region to always use one-third-width components, to make content entry
  faster and not resize each new component when added.
- `ContentRegion` & `WithContentRegionVariations`: Provide tokens to nest Flow Containers.
  - `ContentRegion`: A Flow Container designed to be nested inside another Flow Container.
  - `WithContentRegionVariations`: A token to apply to nest the `ContentRegion`.

```js
const Default = asFluidToken(
  {
    ...Base,
    Spacing: {
      Wrapper: cxSpacing.GutterOffset,
      ComponentWrapper: cxSpacing.Gutter,
    },
  },
  WithComponentsVariations, // a token that would define list of components available for this FlowContainer
  WithContentRegionVariations,
);
```

## Architectural Details

There are no architecture details necessary for this component.
