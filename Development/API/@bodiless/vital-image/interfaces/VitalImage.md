[@bodiless/vital-image](../README.md) / VitalImage

# Interface: VitalImage

Tokens for the vital image

## Table of contents

### Properties

- [Base](VitalImage.md#base)
- [Default](VitalImage.md#default)
- [EditableNoEffect](VitalImage.md#editablenoeffect)
- [EditableTraced](VitalImage.md#editabletraced)
- [Hero](VitalImage.md#hero)
- [Plain](VitalImage.md#plain)
- [WithEager](VitalImage.md#witheager)
- [WithEditorBlurUp](VitalImage.md#witheditorblurup)
- [WithEditorNoEffect](VitalImage.md#witheditornoeffect)
- [WithEditorPlain](VitalImage.md#witheditorplain)
- [WithEditorTraced](VitalImage.md#witheditortraced)
- [WithFullWidthImage](VitalImage.md#withfullwidthimage)
- [WithLandscapePlaceholder](VitalImage.md#withlandscapeplaceholder)
- [WithLink](VitalImage.md#withlink)

## Properties

### Base

• **Base**: `TokenSpec`<{}, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Token which creates the VitalDS Base Image. Defines the Base as:
- Gatsby Image
- With GatsbyImageLogger
- Without Hydration
- Schema has nodekey 'image'
- Meta is Type: Image

#### Defined in

[vital-image/src/components/Image/tokens/vitalImage.ts:202](https://github.com/johnsonandjohnson/Bodiless-JS/blob/e22f7895e/packages/vital-image/src/components/Image/tokens/vitalImage.ts#L202)

___

### Default

• **Default**: `TokenSpec`<{}, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Token which recomposes the Default image as a BlurUp Image.

#### Customizing:

**`Example`**

Override and have all Default Images be non-gatsby plain images via shadowing
```js
import { vitalImageBase } from '@bodiless/vital-image';

const Default = asImageToken(vitalImageBase.Plain);

export default {
  ...vitalImageBase,
  Default,
};
```

#### Defined in

[vital-image/src/components/Image/tokens/vitalImage.ts:279](https://github.com/johnsonandjohnson/Bodiless-JS/blob/e22f7895e/packages/vital-image/src/components/Image/tokens/vitalImage.ts#L279)

___

### EditableNoEffect

• **EditableNoEffect**: `TokenSpec`<{}, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Token which recomposes the base image as NoEffect Image.

#### Defined in

[vital-image/src/components/Image/tokens/vitalImage.ts:287](https://github.com/johnsonandjohnson/Bodiless-JS/blob/e22f7895e/packages/vital-image/src/components/Image/tokens/vitalImage.ts#L287)

___

### EditableTraced

• **EditableTraced**: `TokenSpec`<{}, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Token which recomposes the base image as Traced Image.

#### Defined in

[vital-image/src/components/Image/tokens/vitalImage.ts:283](https://github.com/johnsonandjohnson/Bodiless-JS/blob/e22f7895e/packages/vital-image/src/components/Image/tokens/vitalImage.ts#L283)

___

### Hero

• **Hero**: `TokenSpec`<{}, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composed Token token that defines some defaults for the Hero Image.
- Default (Gatsby Fluid WebP)
- WithEager
- WithLandscapePlaceholder
- withFullWidthImage

#### Customizing:

**`Example`**

Extends the HERO Images to be a link hero image via shadowing.
```js
import { vitalImageBase } from '@bodiless/vital-image';

const Hero = asImageToken(vitalImageBase.Hero, {
  Compose: {
    _: vitalImageBase.WithLink,
  },
});

export default {
  ...vitalImageBase,
  Hero,
};
```

#### Defined in

[vital-image/src/components/Image/tokens/vitalImage.ts:317](https://github.com/johnsonandjohnson/Bodiless-JS/blob/e22f7895e/packages/vital-image/src/components/Image/tokens/vitalImage.ts#L317)

___

### Plain

• **Plain**: `TokenSpec`<{}, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Token which recomposes the Base image as Plain Image.

#### Defined in

[vital-image/src/components/Image/tokens/vitalImage.ts:260](https://github.com/johnsonandjohnson/Bodiless-JS/blob/e22f7895e/packages/vital-image/src/components/Image/tokens/vitalImage.ts#L260)

___

### WithEager

• **WithEager**: `TokenSpec`<{}, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable Token which adds the `loading: eager` property for performance.

#### Defined in

[vital-image/src/components/Image/tokens/vitalImage.ts:291](https://github.com/johnsonandjohnson/Bodiless-JS/blob/e22f7895e/packages/vital-image/src/components/Image/tokens/vitalImage.ts#L291)

___

### WithEditorBlurUp

• **WithEditorBlurUp**: `TokenSpec`<{}, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable Token which apply the following tokens/features to an image:
- Bodiless image.
- withGatsbyImageNode using FluidWithWebp preset.
- sets object to cover for image resizing to fit container
- Meta is Optimization: Optimized & Effect: BlurUp

#### Defined in

[vital-image/src/components/Image/tokens/vitalImage.ts:218](https://github.com/johnsonandjohnson/Bodiless-JS/blob/e22f7895e/packages/vital-image/src/components/Image/tokens/vitalImage.ts#L218)

___

### WithEditorNoEffect

• **WithEditorNoEffect**: `TokenSpec`<{}, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable Token which apply the following tokens/features to an image:
- Bodiless image.
- withGatsbyImageNode using FluidWithWebpNoBase64 preset.
- sets object to contain for image resizing to fit container
- Meta is Optimization: Optimized & Effect: No Effect

#### Defined in

[vital-image/src/components/Image/tokens/vitalImage.ts:234](https://github.com/johnsonandjohnson/Bodiless-JS/blob/e22f7895e/packages/vital-image/src/components/Image/tokens/vitalImage.ts#L234)

___

### WithEditorPlain

• **WithEditorPlain**: `TokenSpec`<{}, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable Token which apply the following tokens/features to an image:
- Bodiless image.
- withNode
- without Gatsby Image props
- Meta is Optimization: Plain

#### Defined in

[vital-image/src/components/Image/tokens/vitalImage.ts:210](https://github.com/johnsonandjohnson/Bodiless-JS/blob/e22f7895e/packages/vital-image/src/components/Image/tokens/vitalImage.ts#L210)

___

### WithEditorTraced

• **WithEditorTraced**: `TokenSpec`<{}, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable Token which apply the following tokens/features to an image:
- Bodiless image.
- withGatsbyImageNode using FluidWithWebpTracedSVG preset.
- sets object to contain for image resizing to fit container
- Meta is Optimization: Optimized & Effect: Traced

#### Defined in

[vital-image/src/components/Image/tokens/vitalImage.ts:226](https://github.com/johnsonandjohnson/Bodiless-JS/blob/e22f7895e/packages/vital-image/src/components/Image/tokens/vitalImage.ts#L226)

___

### WithFullWidthImage

• **WithFullWidthImage**: `TokenSpec`<{}, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable Token which makes the non-GatsbyImage <img> component full-width.

When adding a new image into a page, it is placed as a normal <img> tag instead of a
GatsbyImage component. After refreshing the page, it is rendered as a GatsbyImage,
which is full-width by default. Although not desirable, this behavior is expected.

Applying this token makes this <img> tag full-width, so it renders just like a GatsbyImage.
This is only required if you don't want the image to "change its size" when refreshing the
page after placing it.

#### Defined in

[vital-image/src/components/Image/tokens/vitalImage.ts:256](https://github.com/johnsonandjohnson/Bodiless-JS/blob/e22f7895e/packages/vital-image/src/components/Image/tokens/vitalImage.ts#L256)

___

### WithLandscapePlaceholder

• **WithLandscapePlaceholder**: `TokenSpec`<{}, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable Token which apply the landscape placeholder image.
- Meta is Placeholder : Landscape

#### Defined in

[vital-image/src/components/Image/tokens/vitalImage.ts:239](https://github.com/johnsonandjohnson/Bodiless-JS/blob/e22f7895e/packages/vital-image/src/components/Image/tokens/vitalImage.ts#L239)

___

### WithLink

• **WithLink**: `TokenSpec`<{}, { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable Token which wraps the image in a link
- Meta is Link : With Link

#### Defined in

[vital-image/src/components/Image/tokens/vitalImage.ts:244](https://github.com/johnsonandjohnson/Bodiless-JS/blob/e22f7895e/packages/vital-image/src/components/Image/tokens/vitalImage.ts#L244)
