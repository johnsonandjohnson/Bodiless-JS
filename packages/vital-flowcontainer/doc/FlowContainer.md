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

?> **API Documentation:** Visit [Vital FlowContainer Token
Collection](/Development/API/@bodiless/vital-flowcontainer/interfaces/VitalFlowContainer).

### Overriding FlowContainer

#### Via Shadowing (*Preferred Method)

Define a Shadowing token collection as defined in [Shadowing Tokens](/Development/Guides/Shadowing).

File to shadow: `packages/{my-package}/src/shadow/@bodiless/vital-flowcontainer/FlowContainer.ts`

?> **API Documentation:** Visit the [Vital FlowContainer Token
Collection](/Development/API/@bodiless/vital-flowcontainer/interfaces/VitalFlowContainer) for
examples of shadowing.

### Creating Your Own FlowContainer

The Vital FlowContainer comes with preset components available in Vital Design. There may be use
cases where you would want to create a custom FlowContainer with your own constraints and
components.

In this example, let's say in the product description in the product template we want the following:

- Content Library functionality;
- Constrain the components to be full-width (in other words, non-resizable);
- Only provide the Content Editor the components: image, YouTube and editor variations.

The following example combines all the Vital Tokens into FlowContainer with these requirements:

```js
const ProductDescription = asFluidToken(
  vitalFlowContainer.Base,
  vitalFlowContainer.WithContentLibrary,
  vitalFlowContainer.WithFullWidthConstraint,
  /* Add only images, video & editor */
  vitalImageFlowContainer.WithImageVariations,
  vitalYouTubeFlowContainer.WithYouTubeVariations,
  vitalEditorsFlowContainer.WithEditorVariations,
);
```

This can be shadowed in the PDP template, and then assign the `ProductionDescription` token to the
component slot.

```js
  const Default = asPDPTemplateToken({
    ...vitalPDPTemplateBase.Default,
    Components: {
      ...vitalPDPTemplateBase.Default.Components,
      ProductDescription,
    },
  });

  export default {
    ...vitalPDPTemplateBase,
    Default,
  };
```

?> **Note:** In `asPDPTemplateToken`, `ProductDescription` is short for `ProductDescription:
ProductDescription` when the names are identical.

### FlowContainer that Allows Saving to the Content Library

The Content Library provides the ability to save components that you've created, along with their
embedded content, allowing you to reuse them elsewhere on your site.

If you would like to enable the Content Library, please see the [shadowing example for the
vitalFlowContainer that adds the token
`WithContentLibrary`](/Development/API/@bodiless/vital-flowcontainer/interfaces/VitalFlowContainer#default).

Once it's enabled, you can [save
components](/Components/FlowContainer/#saving-a-component-in-the-content-library) and [unlink
components](/Components/FlowContainer/#unlinking-a-component-from-the-content-library).

?> **Tip:** This can speed up site-building if you save components that are commonly added to
multiple pages.

### Constraining the FlowContainer

There may be use cases where you want limit the number of components added to a FlowContainer or
their width within a FlowContainer.

In the Vital FlowContainer, there are some useful tokens to [constrain
width](/Development/API/@bodiless/vital-flowcontainer/interfaces/VitalFlowContainer?id=withfullwidthconstraint),
and we recommend the following pattern of creating new tokens if you want to limit the number of or
how components are placed. For more information, we suggest referring to [Constraining Component
Widths](/Components/FlowContainer/#constraining-component-widths) or [Limit Number of
Components](/Components/FlowContainer/#limit-number-of-components).

## Architectural Details

There are no architecture details necessary for this component.
