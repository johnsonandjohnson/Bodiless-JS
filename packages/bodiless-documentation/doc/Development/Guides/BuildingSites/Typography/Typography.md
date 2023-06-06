# Typography

The typography starts with defining the font, font size, and line-heights within your
package/site's `tailwind.config.js`.

## Getting Started with Vital Elements: Prebuilt Typography

The `vital-elements` package provides opinionated typography that can be used as is, or, if needed,
parts can be overridden by your site.

For more information on specific details of typography, it is best to review
[`vital-elements`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-elements).

If you plan on leveraging other Vital components, we recommend leveraging all or parts of
`vital-elements`.

For more details on usage and getting started using this package, please follow the [Vital Design
System Typography Guide](/VitalDesignSystem/Guides/SiteTypography).

## Developing Your Typography without Leveraging Vital Elements

The following section defines a high-level overview of defining your typography. For best practices,
we recommend following patterns seen in the `vital-elements` package.

?> **Tip:** If you foresee your package being shadowed in the future, we recommend following the
[template format](/VitalDesignSystem/Guides/ComponentTemplate) to allow shadowing.

### Font Sizes & Line Heights

If your site is defining custom font sizes and line-heights, these are set within your
[package/site's `tailwind.config.js`](../../../../VitalDesignSystem/Guides/TailwindGuide#tailwind-configuration-file). We do recommend
making a token collection of the font sizes as well, and using the token versus the Tailwind class.
This allows for quicker changes if it's modified in the future, allows for it to be shadowed, and
provides better consistency.

?> **Tip:** Tailwind provides the ability to specify font sizes with default line-height, and this
simplifies the process: [Providing a default
line-height](https://tailwindcss.com/docs/font-size#providing-a-default-line-height).  
Or, if your design calls for letter-spacing as well, all three can be defined together as one:
[Providing a default
letter-spacing](https://tailwindcss.com/docs/font-size#providing-a-default-letter-spacing).

### Colors

If your site is [defining custom
colors](https://tailwindcss.com/docs/customizing-colors#adding-additional-colors ':target=_blank'),
these are set within your [package/site's
`tailwind.config.js`](../../../../VitalDesignSystem/Guides/TailwindGuide#tailwind-configuration-file). We do recommend making a token
collection of the font sizes as well, and using the token versus the Tailwind class. This allows for
quicker changes if it's modified in the future, allows for it be shadowed, and provides better
consistency.

### Element Tokens for Headers, Links, Body, and Other Tokens

You can define a custom collection of tokens to use within your site.

?> **Tip:** While you have the choice of using the Tailwind class or a token, we recommend that if
you are reusing a class repeatedly, then make a token for it. In the future, it's quicker to change
one occurrence than to search through files and replace the specific class. It also enables
shadowing potential in the future.

01. We recommend starting with an Elements folder in your package, and start defining tokens during
    creation. Keeping files small and specific to function/definition will be easier to maintain,
    and easier for others to understand.

01. Tokens can be defined individually, or within a group if they share
    [metadata](/Development/Architecture/FClasses?id=metadata-and-filters).

    ```js
    // Individual Element Token
    const H1 = asElementToken('text-xxl, font-bold, text-mycolor1, mb-5 lg:mb-6');

    // Shared Element Token
    const ColorMeta = {
      categories: {
        Type: ['Element'],
        Group: ['Color'],
      },
    };
    export default asTokenGroup(ColorMeta)({
      BGMyColor1: 'bg-mycolor1',
      TextMyColor1: 'text-mycolor1',
      BGMyColor2: 'bg-mycolor2',
      TextMyColor2: 'text-mycolor2',
    });
    ```

### Applying Classes to Your Entire Site

If you want to apply the classes to your entire site, we recommend the following practice:

01. Within `asHelmetToken()`, and in the _Theme_ Domain, provide the site's font class.
    - For more information, see: [Vital Helmet
      Component](/VitalDesignSystem/Components/VitalLayout/Helmet).

01. In `/vital-layout/src/components/Helmet/Helmet.token.ts`, within `asHelmetToken()`, and in the
    _Theme_ Domain, provide the site's font class.

    ```js
    const Default = asHelmetToken({
      Theme: {
        HTMLHelmet: 'font-DMSans font-base text-TestMyColor1',
      }
    });

    export const vitalHelmet = { Default };
    ```

01. Ensure this Helmet token is applied within your Layout tokens.

    ```js
    const Base = asLayoutToken({
      Components: {
        Helmet: as(vitalHelmet.Default),
      },
    });
    ```
