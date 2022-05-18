# Bodiless Schema.org

Provides a Schema component to support adding SEO schema information to content, as well as
helper functions to get and return page/content data.

The base package currently supports the following schemas:

- BreadcrumbList
- FAQ
- [Product](#product-schema)
- [Video](#video-schema)

?> **Note:** Information regarding schemas for structured data can be found at
[Schema.org](https://schema.org/).

## Usage

As a Site Builder, you will want to set the schema source for every schema field you wish to render,
using `asSchemaSource`. For instance, in the [Product Schema](#product-schema) section, you will see
the following example:

```tsx
import { asSchemaSource } from '@bodiless/schema-org';

  SEO: {
    TitleRow: withDesign({
      PageTitle: asSchemaSource('product-name'),
    }),
  },
```

Here, the page title is being used as the product name, but, on your site, the product name may
exist elsewhere, and you will have to source it from there.

As another example, if you wanted to use `meta:description` as the value of your `description`
schema field, you would have to define that as the source.

### Product Schema

JSON-LD following the Product schema is automatically generated for Product Pages.

01. Get data in the component file by setting the schema key desired; for example, to get the
    product name:

    ```tsx
    import { asSchemaSource } from '@bodiless/schema-org';

      SEO: {
        TitleRow: withDesign({
          PageTitle: asSchemaSource('product-name'),
        }),
      },
    ```

    - For schema keys, see [Product Schema Keys](#product-schema-keys).

01. Return data; you should set the schema component in your page:

    ```tsx
    import { WithProductSchema } from '@bodiless/schema-org';

      SEO: {
        PageWrapper: WithProductSchema,
      },
    ```

01. Set provider; you should define the schema provider in your page structure template:

    ```tsx
    import { withStructuredDataProvider } from '@bodiless/schema-org';

      SEO: {
        _: withStructuredDataProvider as Token,
      },
    ```

An example of the returned JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": [
    "Product A"
  ],
  "image": [
    "https://example.com/images/pages/products/product-a/e3f353fe49e7cb8ef65de3b89087ef79/product-pink (1).png"
  ],
  "description": [],
  "sku": [],
  "mpn": [],
  "offers": {
    "@type": "Offer",
    "url": [],
    "priceCurrency": [],
    "price": [
      "0.00"
    ],
    "priceValidUntil": [],
    "itemCondition": [],
    "availability": []
  }
}
```

?> **Note:** The Offer data type is a subset of the Product data type.

For further information regarding the definition of the Product and Offer data types, see:

- **Product:**
  - [Product](https://schema.org/Product) | Schema.org
  - [How To Add Product Structured Data :
    Product](https://developers.google.com/search/docs/advanced/structured-data/product#product) |
    Google Search Central
- **Offer:**
  - [Offer](https://schema.org/Offer) | Schema.org
  - [How To Add Product Structured Data :
    Offer](https://developers.google.com/search/docs/advanced/structured-data/product#offer) |
    Google Search Central

#### Product Schema Keys

- `product-name`: The name of the product.
- `product-image`: The image of the product.
- `product-description`: The description of the product.
- `product-sku`: Merchant-specific identifier for product.
- `product-mpn`: The Manufacturer Part Number (MPN) of the product, or the product to which the
  offer refers.
- `product-brand-name`: The brand of the product.
- `product-review-rating-ratingValue`: A numerical quality rating for the item — either a number,
  fraction, or percentage (e.g., "4", "60%", or "6 / 10").
- `product-review-rating-bestRating`: The highest value allowed in this rating system.
  - If `bestRating` is omitted, 5 is assumed.
- `product-review-author-name`: The author of this content or rating.
- `product-aggregateRating-ratingValue`: A numerical quality rating for the item — either a number,
  fraction, or percentage (e.g., "4", "60%", or "6 / 10").
- `product-aggregateRating-reviewCount`: Specifies the number of people who provided a review, with
  or without an accompanying rating.
  - At least one of `ratingCount` or `reviewCount` is required.
- `product-offer-url`: A URL to the product web page (that includes the Offer).
- `product-offer-priceCurrency`: The currency used to describe the product price, in three-letter
  ISO 4217 format.
- `product-offer-price`: The offer price of a product.
- `product-offer-priceValidUntil`: The date (in ISO 8601 date format) after which the price will no
  longer be available.
  - Your product snippet may not display if the `priceValidUntil` property indicates a past date.
- `product-offer-itemOffered`: The item being sold.
  - Typically, this includes a nested product, but it can also contain other item types or free
    text.
- `product-offer-availability`: The availability of this item (e.g., "In stock", "Out of stock",
  "Pre-order", etc.).

### Video Schema

The Video schema utilizes the YouTube Data API to gather the relevant data.

**See:** [YouTube Data API Reference (v3)](https://developers.google.com/youtube/v3/docs) | Google
Developers

| Schema Field   | YouTube Data API Value                     |
| -------------- | ------------------------------------------ |
| `name`         | `video.snippet.title`                      |
| `description`  | `video.snippet.description`                |
| `thumbnailUrl` | `video.snippet.thumbnails.standard != null` <br/> `? video.snippet.thumbnails.standard.url` <br/> `: video.snippet.thumbnails.default.url` |
| `uploadDate`   | `video.snippet.publishedAt`                |
| `duration`     | `video.contentDetails.duration`            |
| `contentUrl`   | `https://youtube.com/watch/?v=${video.id}` |
| `embedUrl`     | `https://youtube.com/watch/?v=${video.id}` |
| `url`          | `https://youtube.com/watch/?v=${video.id}` |

01. Get data:

    ```tsx
    import { asSchemaSource } from '@bodiless/schema-org';

      SEO: {
        Item: asSchemaSource('youtube-iframe'),
      },
    ```

01. Return data:

    ```tsx
    import { WithVideoSchema } from '@bodiless/schema-org';

      SEO: {
        Wrapper: WithVideoSchema,
      },
    ```

01. Set provider in page component:

    ```tsx
    import { StructuredDataProvider } from '@bodiless/schema-org';

        <StructuredDataProvider>
          <Layout>
            ...
          </Layout>
        </StructuredDataProvider>
    ```

01. Define API key in `.env.site`:

    ```shell
    BODILESS_GOOGLE_YOUTUBE_API_KEY=your-youtube-api-key
    ```

!>  **Important:** The compatible API is **Version 3 (v3)** of the YouTube Data API.  
    **See:** [YouTube Data API Reference (v3)](https://developers.google.com/youtube/v3/docs) |
    Google Developers

For further information regarding the definition of the Video data type, see:

- [VideoObject](https://schema.org/VideoObject) | Schema.org
