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

| Token                      | Description                                                  |
| -------------------------- | ------------------------------------------------------------ |
| `Base`                     | A token with GatsbyImage which creates the Vital base Image. |
| `Plain`                    | A token which recomposes the base image as a Plain Image.    |
| `Default`                  | A token which recomposes the base image as a BlurUp Image.   |
| `WithEditorPlain`          | A token which applies a Plain image.                         |
| `WithEditorBlurUp`         | A token which applies the BlurUp Effect.                     |
| `WithEditorTraced`         | A token which applies the Traced Effect.                     |
| `WithEditorNoEffect`       | A token which applies NoEffect.                              |
| `EditableTraced`           | A token which recomposes the base image as a Traced Image.   |
| `EditableNoEffect`         | A token which recomposes the base image as a NoEffect Image. |
| `WithLandscapePlaceholder` | A token which applies a Landscape Placeholder.               |
| `WithLink`                 | A token which wraps the image in a link.                     |
| `WithFullWidthImage`       | A token which makes the image full-width.                    |

### Hero Image

The `vitalImage` token collection includes a `Hero` token, which renders a full-width Bodiless Image
with a BlurUp. Its functionality is essentially the same as combining the `Default` and
`WithLandscapePlaceholder` tokens. Example usage:

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

### Usage

_To be documented._
