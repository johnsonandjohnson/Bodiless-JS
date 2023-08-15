# WebSite Schema

JSON-LD following the WebSite schema is automatically generated for the homepage of your site.

An example of the returned JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@name": "WebSite",
  "url": "https://example.com"
}
```

For more information regarding the definition of the WebSite data type, see the
[WebSite](https://schema.org/WebSite) page on Schema.org.

## Site Builder Details

### VitalDS

01. Return data:

    ```tsx
    import { WithWebSchema } from '@bodiless/schema-org';

    SEO: {
      SiteHeader: WithWebSchema,
    },
    ```

01. Set provider:

    ```tsx
    import { withStructuredDataProvider } from '@bodiless/schema-org';

    SEO: {
      _: withStructuredDataProvider as Token,
    },
    ```

### Site Level

01. The schema is automatically generated for the homepage of your site.

