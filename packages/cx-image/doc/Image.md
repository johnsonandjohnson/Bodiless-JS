# CanvasX Image Component

CanvasX Image is based on [BodilessJS image](../../bodiless/Components/Image) component. It adds features and styles specific to CanvasX sites.

Provides a set of token tokens to compose image component: 
 - A base token with Site Library and GatsbyImage.
 - Image types tokens
   - Plain Image
   - Performance Image
   - Performance Image with SVG
   - Performance Image with No Base 64

  - Image Orientation tokens
    - Square
    - Landscape
  - Linkable Token

Additionally it provides helper functions that return token which add Default content and Library to the Image.
## Usage

```js
import {
  cxImage,
  asImageToken,
  WithDefaultContentImage,
  withImageLibrary
} from "@canvasx/image";
import { Img } from '@bodiless/fclasses';
import Contentful1 from '../Contentful/Image/contentful1.png';

export const WithCareClubContent = {
  Content: {
    _: WithDefaultContentImage(['DefaultContent', 'careclub']),
  },
  Meta: {
    _: asToken.meta.term('Type')('Contentful'),
  },
};

// Create an Image Token with full width and rounded corners, using BlurUp Effect.
export const asRoundedFullWidthImage = asImageToken({
  ...cxImage.EditableImage,
  Style: {
    _: t(
      'rounded-lg',
      'w-full',
    ),
  },
});

export const RoundedFullWidthImage = as(asRoundedFullWidthImage)(Img);


// Create an Image Token with Default Content.
export const asEditableImageWithlibrary = asImageToken({
  ...cxImage.EditableImage,
  Content: {
    ...WithCareClubContent.Content,
  },
  Meta: {
    _: t(
      cxImage.EditableImage._,
      WithCareClubContent.Meta._,
    ),
  },
});

export const EditableImageWithlibrary = as(asEditableImageWithlibrary)(Img);

```
