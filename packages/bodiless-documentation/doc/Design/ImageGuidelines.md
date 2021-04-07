# Imagery Guidelines

Whether its people, places or products, imagery should be a clean and modern
extension of your brand.  Our image guidelines will help you identify things to
consider when gathering or creating site imagery.

## Image Asset Delivery:

- All the images should be already sliced and prepared for web
- Images should be archived into .zip archive
- Inside archive images should be placed into folders, structured by pages
- Images should have names corresponding to their location on page
  - Name the image according to the page in which the image should be placed,
    for example, add the page title or number to the image file name.
  - Provide all images to be used.
- Use appropriate proportions and sizes according to image type, as shown in the
  table below.
- Provide alt tags for images (excluding decorative images) in the site
  language.

## General Image Properties:

### Dimensions

- Always maintain an image’s dimension ratio when scaling to fit a content area.
- Make use of cropping to avoid distortion when scaling.
- Don’t upscale an image to fill a content area as this will cause distracting
  pixelation.

### Text

- Avoid if possible displaying any text in an image, as this creates problems
  with legibility, translation and SEO results.

### File Types

BodilessJS supports several image formats. See below for the full list.

- For best front end performance, use the appropriate file format when
  compressing and saving images for site building. Compress images as much as
  possible without losing desired quality.

  - **JPG**: For images that are photographic in nature and don’t require
    transparency. We recommend compressing them at 75% from full resolution.
  - **PNG**: Use png format for lossless compression of graphic images with line
    drawings, text, transparency, and graphics such as icons and logos.
  - **SVG**: Use for any vector graphic for maximum size savings.
  - **APNG**: Preferred format for animated images.
  - **GIF**: Supported, but not recommended. Use PNG (or APNG for animated) unless
    using a legacy graphic.
  - **WebP**: Not supported for user upload. Will be utilized by the server
    automatically if applicable.


### Callout Imagery

- Since cards/callouts vary in size, layout and placement, there are no hard
  limits on the imagery that can be used with them.
- We recommend that each image be selected and fit to the card/callout created.

### Recommended Image Sizes

The following information provides recommended standards for imagery on sites built 
with BodilessJS. Below each image type you will find a table listing the recommended 
file types, width, and file size for that particular image. 

#### Background Image

Background images refer to images displayed in carousels and/or hero images on article 
pages or custom landing pages. It is recommended to use landscape orientation. 

|   Extension |   Recommended width (px) | Maximum width (px)   |   Recommended size (KB) | Maximum size (KB)   |
|--|--|--|--|--|
| .jpg .png | 1280 px |	Double the width of the content under the header. |	100 KB OR LESS |	200 KB |

---

#### Product Image

Product images are images displayed on product content. Recommended size ratio: 1:1; 
or  2:3 for vertical orientation. Landscape orientation is NOT recommended.

|   Extension |   Recommended width (px) | Maximum width (px)   |   Recommended size (KB) | Maximum size (KB)   |
|--|--|--|--|--|
|.jpg .png |	980 px |	980px |	50-80 KB OR LESS |	150 KB |

---

#### Images within Article Content

Images to be displayed in the body of article pages. No recommended image orientation 
or size ratio. 

|   Extension |   Recommended width (px) | Maximum width (px)   |   Recommended size (KB) | Maximum size (KB)   |
|--|--|--|--|--|
| .jpg .png |	For 100% wide image: 980 px For 50% wide image: 615 px	| 1280 px | 30-60 KB OR LESS |	150 KB |

---

#### Card 50% (1 column, 2 columns)

Images for cards where the image takes 50% of the page width. This is applicable to 
cards that go in 1 columns (1 card to the full page width, image on the left) and 
2 columns (1 card on the left, 1 card on the right). There is no recommended size ratio. 
You can use portrait or landscape orientation.

|   Extension |   Recommended width (px) | Maximum width (px)   |   Recommended size (KB) | Maximum size (KB)   |
|--|--|--|--|--|
|.jpg .png | 980 px | 980 px | 50-80 KB OR LESS | 100 KB |

---

#### Card 33% and 25% (3 columns, 4 columns)

Images for cards where the image takes 33% or 25% of the page width. This is applicable 
to cards that go in 3 columns (3 cards in a row) and 4 columns (4 cards in a row). There 
is no recommended size ratio. Both portrait or landscape orientation is acceptable. 

|   Extension |   Recommended width (px) | Maximum width (px)   |   Recommended size (KB) | Maximum size (KB)   |
|--|--|--|--|--|
|.jpg .png|	615 px | 615 px | 30-50 KB OR LESS | 80 KB |

---

#### Site Logo

A logo or image - usually used sitewide in the site's header. Recommended to use an 
image with a transparent background. 

|   Extension |   Recommended width (px) | Maximum width (px)   |   Recommended size (KB) | Maximum size (KB)   |
|--|--|--|--|--|
| .png | 450 px (Minimum: 205px) | 500 px |	15 KB OR LESS |	30 KB |

---

#### Site Background

Site backgrounds are generally discouraged. Recommendation below only for cases when 
background is present.

|   Extension |   Recommended width (px) | Maximum width (px)   |   Recommended size (KB) | Maximum size (KB)   |
|--|--|--|--|--|
|.jpg .png | N/A |	N/A |	10-40 KB OR LESS |	200 KB |

---

#### Social Media Icons

Social media icons are icons or logos used for social media links 
(e.g. Instagram, Facebook, Twitter, etc). Usually 1:1 size ratio.

|   Extension |   Recommended width (px) | Maximum width (px)   |   Recommended size (KB) | Maximum size (KB)   |
|--|--|--|--|--|
|.png |	48 px |	N/A |	5 KB OR LESS |	15 KB |

---

#### Other Icons (Except Social Media and Favicon)

Other icons include search icons (magnifying glass), bullet icons, and generic email 
icons (envelope), etc. These icons typically use 1:1 size ratio. No recommended image orientation.

|   Extension |   Recommended width (px) | Maximum width (px)   |   Recommended size (KB) | Maximum size (KB)   |
|--|--|--|--|--|
|.svg |	16-32 px |	N/A |	1-5 KB OR LESS |	5 KB |

---

#### Favicon

[Favicon](../../../Development/Guides/BuildingSites/ComponentsStarterKit?id=favicon) is an icon that is used in browser tabs, bookmarks, and on mobile devices as an app icon when the user saves the site to the homescreen.

|   Extension |   Recommended width (px) | Maximum width (px)   |   Recommended size (KB) | Maximum size (KB)   |
|--|--|--|--|--|
|.jpg .png .webp <br> .tiff .gif .svg |	512 px* <br>_see note below_ | 512 px	|50 KB |	50 KB |

?> Note: BodilessJS offers ability to upload one large favicon and generate all favicons sizes. 
BodilessJS will take the largest size (512px) and auto generate the smaller size (32px).
