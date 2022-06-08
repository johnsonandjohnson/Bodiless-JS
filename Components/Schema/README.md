# Schema Component

The Schema.org package provides a Schema component to support adding SEO schema information to
content, as well as helper functions to get and return page/content data.

The base package currently supports the following schemas:

- [FAQ](./FAQ)
- [Organization](./Organization)
- [Product](./Product)
- [Video](./Video)
- [WebSite](./Website)

?> **Note:** Information regarding schemas for structured data can be found at
[Schema.org](https://schema.org/ ':target=_blank').

## Site Builder Details

As a Site Builder, you will want to set the schema source for every schema field you wish to render,
using `asSchemaSource`. For instance, in the [Product Schema](./Product) section, you will see the
following example:

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
