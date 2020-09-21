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

- Since touts/callouts vary in size, layout and placement, there are no hard
  limits on the imagery that can be used with them.
- We recommend that each image be selected and fit to the tout/callout created.

### Recommended Image Sizes

| **Image Type**                                                                   | **Description**                                                                                                                                                                                                                                                                                                                            | **Extension** | **Recommended width (px)**                                     | **Maximum width (px)**                           | **Recommended size (kB)** | **Maximum Size (kB)**            |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- | -------------------------------------------------------------- | ------------------------------------------------ | ------------------------- | -------------------------------- |
| **Carousel Slide Background, Page Header Background, Article Header Background** | Images displayed in Carousels, and in headers (hero image) of Articles Pages or custom landing pages.  Landscape Orientation.  No recommended size ratio.                                                                                                                                                                                 | .jpg .png     | **1280 px**                                                    | Double the width of the content under the header. | **100 kB OR LESS**        | 200 kB                           |
| **Product Image**                                                                | Product images to be displayed on the Product Detail Pages. Recommended size ratio: 1:1 or vertical orientation at 2:3. Horizontal orientation is NOT recommended.                                                                                                                                                                         | .jpg .png     | **980 px**                                                     | 980px                                            | **50-80 kB** **OR LESS**  | 150 kB                           |
| **Images within article content**                                                    | Landscape orientation. Images to be displayed in the bodies of article pages. Usually landscape orientation. No recommended size ratio.                                                                                                                                         | .jpg .png     | For 100% wide image: **980 px** For 50% wide image: **615 px** | 1280 px                                          | **30-60 kB** **OR LESS**  | 150 kB                           |
| **Tout 50%** (1 column, 2 columns)                                               | No recommended size ratio. Images for tout where image takes 50% of the page width. This is applicable to touts that go in 1 columns (1 tout to the full page width, image on the left) and 2 columns (1 tout on the left, 1 tout on the right). Portrait or landscape orientation.                             | .jpg .png     | **980 px**                                                     | 980 px                                           | **50-80 kB**  **OR LESS** | 100 kB                           |
| **Tout 30% and 25%**  (3 columns, 4 columns)                                     | Images for touts where image takes 33% or 25% of the page width. This is applicable to touts that go in 3 columns (3 touts in a row) and 4 columns (4 touts in a row). Portrait or landscape orientation. No recommended size ratio.                                                                                                       | .jpg .png     | **615 px**                                                     | 615 px                                           | **30-50 kB** **OR LESS**  | 80 kB                            |
| **Site Logo**                                                                    | Transparent background. The same proportions for all retailers. Width of 410 to 480 px (no less than 205 px).                                                                                                                                                                                                                                  | .png          | **450 px** (Minimum: 205px)                                    | 500 px                                           | **15 kB** **OR LESS**     | 30 kB                            |
| **Site Background**                                                              | Site backgrounds are generally discouraged. Recommendation below only for cases when background is present.                                                                                                                                                                                                                               | .jpg .png     | N/A                                                            | N/A                                              | **10-40 kB**  **OR LESS** | 200 kB                           |
| **Social Media Icons** | Icons for Social Media links. Usually 1:1 size ratio. | .png          | **48 px** | N/A | **5 kB**  **OR LESS** | 15 kB                            |
| **Other Icons** (Except Social Media and Favicon) | Other icons: search field icon (zooming glass), bullet icons, etc. Usually 1:1 size ratio. Use .svg instead of raster files where possible. | .svg | **16-32 px**| N/A | **1-5 kB** **OR LESS**   | 5 kB unless critical design need |
| **Favicon**  | [Favicon](../../../Development/Guides/BuildingSites/ComponentsStarterKit?id=favicon) is an icon that is used in browser tabs, bookmarks, and on mobile devices as an app icon when the user saves the site to the homescreen.                                                                                                                                                                 | .ico          | **512**                                                      | 512 px _Note:_ BodilessJS offers ability to upload one large favicon and generate all favicons sizes. BodilessJS will take the largest size (512px) and auto generate the smaller size (32px).                                          | **1 kB** **OR LESS**      | 5 kB                             |
