# Image Configurations

BodilessJS provides integration with [`gatsby-image`](https://www.gatsbyjs.com/plugins/gatsby-image/
':target=_blank') plugin for creating optimized images and leveraging advanced image loading
techniques.

## Gatsby Image Usage

01. Create a HOC, at site level, responsible for transforming a plain image-based component into a
    Gatsby Image component.

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

    <!-- Inlining HTML to add multi-line info block with unordered list. -->
    <div class="warn">
      <strong>Note:</strong> BodilessJS uses <code>asGatsbyImage</code>,
      <code>withGatsbyImageNode</code>, and <code>withGatsbyImageLogger</code> functions provided by
      <code>@bodiless/gatsby-theme-bodiless</code>.

      - `asGatsbyImage` is a HOC that either replaces the component with `GatsbyImg`, if the data
        required for `GatsbyImg` is available, or it renders the input component, otherwise.
      - `withGatsbyImageNode` is a HOF that adds a Gatsby Image BodilessJS node, which enriches
        image node data with image preset provided as an input.
      - `withGatsbyImageLogger` is a HOF that fails Gatsby build and logs errors when there is a
        mismatch between the image preset passed as an argument to the Gatsby Image node and the
        corresponding image preset stored in the image node JSON file.

    </div>

01. Create a HOC for each image preset, for instance:

    ```ts
    import { GatsbyImagePresets } from '@bodiless/gatsby-theme-bodiless';

    const asFluidGatsbyImage = asGatsbyImg(GatsbyImagePresets.Fluid);
    const asFluidWithWebpGatsbyImage = asGatsbyImg(GatsbyImagePresets.FluidWithWebp);
    ```

    ?> **Note:** BodilessJS uses default image presets exposed by `@bodiless/gatsby-theme-bodiless`.
    See the [Default Image Presets](#default-image-presets) section to get a list of available
    presets.

01. Use the HOCs to compose Gatsby Image components.

    ```ts
    import { Img } from '@bodiless/fclasses';

    const FluidGatsbyImage = asFluidGatsbyImage(Img);
    const FluidWithWebpGatsbyImage = asFluidWithWebpGatsbyImage(Img);
    ```

01. Render the Gatsby Image components as any other React component.

    ```tsx
    <FluidGatsbyImage />
    ```

01. Upload images via the BodilessJS admin interface.

    ?> **Note:** When you activate Gatsby Image for an existing image, then you need to re-upload
    the image or update the corresponding image JSON file.

## Default Image Presets

Please refer to the [`GatsbyImagePresets` API
documentation](/Development/API/@bodiless/gatsby-theme-bodiless/enums/GatsbyImagePresets).

## Change Image Preset

If you have an image with `GatsbyImagePresets.Fluid` preset, and you want to change the preset to
`GatsbyImagePresets.FluidNoBase64`:

01. Compose a new image component with new preset:

    ```ts
    import { GatsbyImagePresets } from '@bodiless/gatsby-theme-bodiless';
    import { Img } from '@bodiless/fclasses';

    const asFluidNoBase64GatsbyImage = asGatsbyImg(GatsbyImagePresets.FluidNoBase64);
    const FluidNoBase64GatsbyImage = asFluidNoBase64GatsbyImage(Img);
    ```

01. Render the new image component instead of the existing one.

01. Re-upload the image via the BodilessJS admin interface, or update the preset in the
    corresponding JSON file manually.

## Override Image Processing Arguments

To override the default image processing arguments, use the `gatsbyImage.sharpArgs` options for the
plugin `@bodiless/gatsby-theme-bodiless`. For example, to override the default quality in your
site's `gatsby-config.js` file use the following code:

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

See the [`gatsby-plugin-sharp`](https://www.gatsbyjs.com/plugins/gatsby-plugin-sharp/
':target=_blank') documentation to get a list of options you can override.

## Gatsby `imgStyle` Property

Gatsby images do require the classes to be added directly to the Gatsby Image `imgStyle`. You can do
this by adding `imgStyle` as a prop.

```js
const ObjectFitCover = {
  imgStyle: { objectFit: 'cover' },
};
const WithObjectFitCover = asImageToken({
  Theme: {
    _: addProps(ObjectFitCover),
  },
});
```

The following example will apply rounded corners to both the Gatsby Image and the _regular_ Image:

```js
const withGatsbyImageRoundedCorners = withDesign({
  GatsbyImage: addProps({
    imgStyle: {
      borderRadius: '1rem',
    },
  }),
  Image: addClasses('rounded-2xl');
});
```

?> **Tip:** Ideally, it's best to have the image inside a Wrapper `Div`/`Span`, and apply styling
(such as absolute or rounded corners) to the container rather than the image within.

## Configure Gatsby Image for Default Content

01. Prepare default content data.
    - Install npm packages containing default content, and/or create `.json` files at site level.
    - Example of `.json` file containing default image data:

      ```json
      {
        "src": "./defaultImage.jpg",
        "alt": "My Test Alt",
        "title": "My Test Title",
        "preset": "fluid_withWebp"
      }
      ```

      - `src`: Contains path to image.
        - The path can be relative or absolute.
          - When a relative path is specified, then the image will be resolved relative to the JSON.
          - When an absolute path is specified, then the image will be resolved relative to site's
            `static` directory.
      - `alt`, `title`: Image data provided by Bodiless.
      - `preset`: Image preset for which to generate image variations.

01. Configure default content sources.
    - **Option A:** _(Recommended)_ Use default content auto-discovery mechanism.
      - Add `bodiless.content.json` file at site level. Example of file:

        ```json
        [
          "./path/to/default/content/directory1",
          "./path/to/default/content/directory2"
        ]
        ```

    - **Option B:** Use site's `gatsby-config.js`:

      ```js
      // site gatsby-config.js

      const {
        createDefaultContentPlugins,
      } = require('@bodiless/gatsby-theme-bodiless/dist/DefaultContent');

      module.exports = {
        plugins: {
          // your other plugins
          ...createDefaultContentPlugins(
            './path/to/default/content/directory1',
            './path/to/default/content/directory2'
          ),
        },
      };
      ```

01. Add `DefaultContentQuery` to each page that uses default content.
    - Open your page index file and extend a list of exported queries with `DefaultContentQuery`.

      ```js
      export const query = graphql`
        query($slug: String!) {
          ...YourOtherQuery
          ...DefaultContentQuery
        }
      `;
      ```

01. Use helpers to compose Gatsby Image components.

    ```jsx
    import { useContentFrom } from '@bodiless/core';
    import { asBodilessImage } from '@bodiless/components-ui';
    import { withDefaultImageContent } from '@bodiless/components';
    import {
      GatsbyImagePresets,
      withGatsbyImagePreset,
    } from '@bodiless/gatsby-theme-bodiless';

    const asEditableImage = withGatsbyImagePreset(GatsbyImagePresets.FluidWithWebp)(asBodilessImage);
    const useDefaultImageNode = useContentFrom(['DefaultContent', 'contentful1']);
    const Image = withDefaultImageContent(asEditableImage)(useDefaultImageNode)('image')('img');

    <Image />
    ```
