[@bodiless/vital-image](../README.md) / VitalImageFlowContainer

# Interface: VitalImageFlowContainer

Tokens for the vital card flow container

## Table of contents

### Properties

- [WithImageVariations](VitalImageFlowContainer.md#withimagevariations)

## Properties

### WithImageVariations

• **WithImageVariations**: `TokenSpec`<`any`, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which adds all Image variations. By default
- ImageSquare : Default (Gatsby Image with Webp) with square placeholder.
- ImageLandscape : Default (Gatsby Image with Webp) with landscape placeholder.

#### Shadowing:

**`example`** will add a plain non-gatsby images for the content editor to use via shadowing
```js
import { as, flowHoc, Img, on } from '@bodiless/fclasses';
import { asFluidToken, asMetaToken } from '@bodiless/vital-elements';
import { vitalImageFlowContainerBase, vitalImage } from '@bodiless/vital-image';

const imagePlainVariations = {
  ImagePlainSquare: on(Img)(as(
    vitalImage.Plain,
    asMetaToken(flowHoc.meta.term('Placeholder')('Square')),
  )),
  ImagePlainLandscape: on(Img)(as(
    vitalImage.Plain,
    vitalImage.WithLandscapePlaceholder,
  )),

};

const WithImageVariations = asFluidToken(vitalImageFlowContainerBase.WithImageVariations, {
  Components: imagePlainVariations,
});

export default {
  ...vitalImageFlowContainerBase,
WithImageVariations,
};
```

#### Defined in

[vital-image/src/components/FlowContainer/tokens/vitalImageFlowContainer.ts:81](https://github.com/johnsonandjohnson/Bodiless-JS/blob/70131d630/packages/vital-image/src/components/FlowContainer/tokens/vitalImageFlowContainer.ts#L81)
