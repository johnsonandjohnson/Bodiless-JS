# CX Image Component

The CX Image Component is based on the [BodilessJS Image Component](../../Components/Image/). While
Bodiless Image is a generic image component with tokens that can be combined however you choose, CX
Image builds upon it, providing a sensible default combination of its generic tokens (i.e., features
and styles), to help meet typical site-use expectations.

## Site Builder Details

The CX Image Component provides a set of tokens to compose an Image Component:

| Token                      | Description                                                  |
| -------------------------- | ------------------------------------------------------------ |
| `Base`                     | A token with GatsbyImage which creates the CX base Image.    |
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

### Usage

_To be documented._
