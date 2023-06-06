# Vital Image Component

The Vital Image Component is based on the [BodilessJS Image Component](/Components/Image/). While
Bodiless Image is a generic image component with tokens that can be combined however you choose,
Vital Image builds upon it, providing a sensible default combination of its generic tokens (i.e.,
features and styles), to help meet typical site-use expectations.

## Content Editor Details

Other than potentially seeing different style variations available, there is no change to the
general Image component experience by the Vital Image package, and, thus, you can refer to the
[Bodiless Image : Content Editor Details](/Components/Image/#content-editor-details).

### Hero Image

The [Vital Generic Page Template](../VitalTemplates/Generic) uses a Hero Card in the _Top_ slot (or
Hero). Using the Edit Interface, you will have the option to swap between a Hero
[Card](../VitalCard/#hero-card), Image, or [Video](../VitalYouTube/#hero-video). Note: Your site may
be configured with additional Hero variants.

01. While in [Edit Mode](/ContenteditorUserGuide/#edit-mode), select the desired Hero Component,
    and, within its context menu, under "Hero," click **Swap**.  
    ![Hero Swap Image](./assets/HeroSwapImage.jpg ':size=292')
01. In the _Choose a component_ form, select "Image."
01. Click the checkmark in the bottom-right of the form to confirm.
01. You can [select and configure](/Components/Image/#select-and-configure-an-image) the Image as
    you would a typical Image component.

## Site Builder Details

The Vital Image Component provides a set of tokens to compose an Image Component:

?> **API Documentation:** Visit [Vital Image Token
Collection](/Development/API/@bodiless/vital-image/interfaces/VitalImage).

?> **Image Guidelines:** Visit [Image Guidelines](./ImageGuidelines) for best practices on
images.

### Default: Gatsby Image Configuration

Vital Design offers the `vitalImage.Default` as a [Gatsby
Image](https://www.gatsbyjs.com/docs/how-to/images-and-media/using-gatsby-plugin-image
':target=_blank') with the preset of fluid image, which offers images in WebP format to improve
performance. With that being considered, the Site Builder can configure the compression and other
options.

Follow the instructions for [configuring the compression of the image
processing](/Components/Image/ImageConfigurations#override-image-processing-arguments).

For specific use cases, please refer to the [Image Configuration
Guide](/Components/Image/ImageConfigurations).

### Overriding Image Tokens

#### Via Shadowing (*Preferred Method)

Define a Shadowing token collection as defined in [Shadow](../VitalElements/Shadow).

File to shadow: `packages/{my-package}/src/shadow/@bodiless/vital-images/Image.ts`

?> **API Documentation:** Visit the [Vital Image Token
Collection](/Development/API/@bodiless/vital-image/interfaces/VitalImage) for examples of shadowing.

### Overriding Image FlowContainer

By default, the VitalDS offers the Default Image (Gatsby Image with WebP) in square and landscape
variations to the Content Editor in the component picker. You can extend this by shadowing the
[`vitalImageFlowContainer`
collection](/Development/API/@bodiless/vital-image/interfaces/VitalImageFlowContainer).

#### Via Shadowing (*Preferred Method)

Define a Shadowing token collection as defined in [Shadowing Vital Tokens](../VitalElements/Shadow).

File to shadow: `packages/{my-package}/src/shadow/@bodiless/vital-images/FlowContainer.ts`

?> **API Documentation:** Visit the [Vital Image FlowContainer Token
Collection](/Development/API/@bodiless/vital-image/interfaces/VitalImageFlowContainer#withimagevariations)
for examples of shadowing, and extending the container to add Plain Square and Landscape image.

### Static Images

To improve performance, Vital Images are static, and, therefore, rendered without unnecessary
JavaScript. The Vital Image tokens (and all dependencies) are excluded from the static bundle.

The `gatsby-plugin-image` code is excluded from the final bundle via the
`BODILESS_GATSBY_PLUGIN_IMAGE_OMIT` environment variable. See [Omit Gatsby Plugin Image for Static
Image](/Design/GatsbyTheme#omit-gatsby-plugin-image-for-static-image) for details.

### Hero Image

The `vitalImage` token collection includes a [`Hero`
token](/Development/API/@bodiless/vital-image/interfaces/VitalImage#hero), which renders a
full-width Bodiless Image with a BlurUp. Its functionality is essentially the same as combining the
`Default` and `WithLandscapePlaceholder` tokens. Example usage:

```js
import { vitalImage } from '@bodiless/vital-image';
import { as, Img } from '@bodiless/fclasses';

const ImageHero = as(vitalImage.Hero)(Img);

const ExamplePage = () => (
  <ExampleWrapper>
    <ImageHero />
    ...
  </ExampleWrapper>
);
```
