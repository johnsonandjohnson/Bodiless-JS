# Organization Schema

JSON-LD following the Organization schema is automatically generated for the homepage of your site.

An example of the returned JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Example Brand",
  "url": "https://example.com",
  "logo": "https://example.com/images/site/749c628275699ca55e2ed239899a8ef2/logo.png",
  "ContactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "+1-888-555-5555",
    "contactOption": "TollFree",
    "areaServed": "Worldwide"
  }
}
```

?>  **Note:** The ContactPoint data type is a subset of the Organization data type.

For more information regarding the definition of the Organization and ContactPoint data types, see:

- [Organization](https://schema.org/Organization) | Schema.org
- [ContactPoint](https://schema.org/ContactPoint) | Schema.org

## Content Editor Details

Organization metadata can be entered using the Editor Interface on your site's homepage.

01. While in [Edit Mode](/bodiless/ContentEditorUserGuide/#edit-mode) on your site's homepage, (from
    the [Toolbar](/bodiless/ContentEditorUserGuide/#toolbar)) click **Page > SEO** to open the _SEO
    Data Management_ form.
    - Here, you should see a number of "Organization" fields; if you do not, you need to ensure that
      you are on the homepage and that the _Page Type_ field has "home" as the provided value.
01. Provide values for the Organization fields in the form, and click the checkmark to confirm.
    - _Organization Telephone:_ A telephone number to use as a point of contact for your
      organization.
    - _Organization Contact Type:_ The type of contact of the provided telephone number (e.g.,
      "Customer Service").
    - _Organization Contact Option:_ An option available for the provided telephone number (e.g., a
      toll-free number ("TollFree") or support for hearing-impaired callers
      ("HearingImpairedSupported")).
    - _Organization Area Served:_ The geographic area for which the provided telephone number offers
      service (e.g., "Worldwide", "US", etc.).

?>  **Note:** The value for `name` in the Organization schema is sourced from the _Title_ of your
    homepage.

![SEO Data Management form on the Homepage](./assets/SeoDataManagementHomepage.jpg ':size=50%')

## Site Builder Details

### VitalDS

01. Get data:

    ```tsx
    import { asSchemaSource } from '@bodiless/schema-org';

    SEO: {
      Image: asSchemaSource('organization-logo'),
    },
    ```

01. Return data:

    ```tsx
    import { WithOrganizationSchema } from '@bodiless/schema-org';

    SEO: {
      SiteHeader: WithOrganizationSchema,
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

01. Get data image logo (the other fields are automatically added or provided):

    ```tsx
    import { asSchemaSource } from '@bodiless/schema-org';

    const asLogoSchema = asImageToken({
      SEO: {
        _: asSchemaSource('organization-logo'),
      },
    });
    ```

