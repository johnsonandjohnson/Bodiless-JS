# Image Configurations

BodilessJS provides integration with [gatsby-image](https://www.gatsbyjs.com/plugins/gatsby-image/) plugin for creating optimized images and leveraging advanced image loading techniques.

## Activation

1. Create a HOF on site level responsible for transforming a plain image based component into gatsby image component.

    ```ts
    import {
    asGatsbyImage as asBaseGatsbyImage,
    withGatsbyImageNode,
    withGatsbyImageLogger,
    } from '@bodiless/gatsby-theme-bodiless';
    import { asBodilessImage } from '@bodiless/components-ui';

    const asGatsbyImg = (preset: string) => flowRight(
    withGatsbyImageNode(preset),
    asBodilessImage(),
    withGatsbyImageLogger(preset),
    asBaseGatsbyImage,
    );
    ```

    > Note: BodilessJS uses `asGatsbyImage`, `withGatsbyImageNode`, `withGatsbyImageLogger` functions provided by `@bodiless/gatsby-theme-bodiless`.
    > * `asGatsbyImage` is a HOC that either replaces the component with `GatsbyImg` in case of data required for `GatsbyImg` is available or it renders the input component otherwise.
    > * `withGatsbyImageNode` is a HOF that adds a gatsby image BodilessJS node, which enriches image node data with image preset provided as an input.
    > * `withGatsbyImageLogger` is a HOF that fails gatsby build and logs errors when there is a mismatch between image preset passed as an argument to gatsby image node and the corresponding image preset stored in the image node json file.

1. Create a HOC for each image preset, for instance:

    ```ts
    import { GatsbyImagePresets } from '@bodiless/gatsby-theme-bodiless';

    const asFluidGatsbyImage = asGatsbyImg(GatsbyImagePresets.Fluid);
    const asFluidWithWebpGatsbyImage = asGatsbyImg(GatsbyImagePresets.FluidWithWebp);
    );
    ```

    > Note: BodilessJS uses default image presets exposed by `@bodiless/gatsby-theme-bodiless`. Visit [default image presets](#default-image-presets) section to get a list of available presets.

1. Use the HOCs to compose gatsby image components

    ```ts
    import { Img } from '@bodiless/fclasses';

    const FluidGatsbyImage = asFluidGatsbyImage(Img);
    const FluidWithWebpGatsbyImage = asFluidWithWebpGatsbyImage(Img);
    ```

1. Render the gatsby image components as any other React component.

    ```tsx
    <FluidGatsbyImage />
    ```

1. Upload images via BodilessJS admin interface.

    > Note: when you activate gatsby image for an existing image, then you need to reupload the image or update the corresponding image json file.

### Change image preset

If you have an image with `GatsbyImagePresets.Fluid` preset and you want to change the preset to `GatsbyImagePresets.FluidNoBase64`.

1. Compose new image component with new preset

    ```ts
    import { GatsbyImagePresets } from '@bodiless/gatsby-theme-bodiless';
    import { Img } from '@bodiless/fclasses';

    const asFluidNoBase64GatsbyImage = asGatsbyImg(GatsbyImagePresets.FluidNoBase64);
    const FluidNoBase64GatsbyImage = asFluidNoBase64GatsbyImage(Img);
    ```

1. Render the new image component instead of existing one.

1. Reupload the image via BodilessJS admin interface or update preset in the corresponding json file manually.

### Override image processing arguments

To override default image processing arguments, use `gatsbyImage.sharpArgs` option of `@bodiless/gatsby-theme-bodiless`. For example, to override default quality

```js
  {
    resolve: '@bodiless/gatsby-theme-bodiless',
    options: {
      gatsbyImage: {
        sharpArgs: {
          quality: 70,
        },
      },
    },
  },
```

See [gatsby-plugin-sharp](https://www.gatsbyjs.com/plugins/gatsby-plugin-sharp/) doc to get a list of options you can override.

### Default image presets

| Preset                 | Description |
|------------------------|-------------|
| Fluid                  | Fluid (stretched to match the container’s width and height) image     |
| FluidNoBase64          | Fluid size image with disabled blur-up effect |
| FluidTracedSVG         | Fluid size image with traced placeholder SVG |
| FluidWithWebp          | Fluid size image with auto-generated WebP version |
| FluidWithWebpNoBase64  | Fluid size image with auto-generated WebP and disabled blur-up effect |
| FluidWithWebpTracedSVG | Fluid size image with auto-generated WebP and traced placeholder SVG  |
| Fixed                  | Fixed size image                                                      |
| FixedNoBase64          | Fixed size image with disabled blur-up effect                         |
| FixedTracedSVG         | Fixed size image with traced placeholder SVG                          |
| FixedWithWebp          | Fixed size image with auto-generated WebP version                     |
| FixedWithWebpNoBase64  | Fixed size image with auto-generated WebP and disabled blur-up effect |
| FixedWithWebpTracedSVG | Fixed size image with auto-generated WebP and traced placeholder SVG  |
