# Vital Header Component

The Vital Header Component provides a header with the following elements:

- Logo
- Menu
- Search
- Language Button

For Mobile and Tablet layouts, the Menu and Search elements have "togglers," opening and closing a
larger element in the interest of conserving screen real estate.

## Content Editor Details

There is no interaction by the Content Editor with the Header Component itself, only with components
within it.

By default, the editable components include:

- Logo
- Menu
- Utility Menu

## Site Builder Details

From a Site Builder perspective, Vital Header is comprised of a token collection (`vitalHeader`) and
a Header component (`HeaderClean`). You can use the default Vital Header token
(`vitalHeader.Default`) as is, or you can recompose it to meet your site's requirements.

### Customizing Header

#### Via Shadowing (*Preferred Method)

Define a Shadowing token collection as defined in [Shadow](../VitalElements/Shadow).

File to shadow: `packages/{my-package}/src/shadow/@bodiless/vital-layout/Header.ts`

?> **API Documentation**: Visit the
[Vital Header Token Collection](../../../Development/API/@bodiless/vital-layout/interfaces/VitalHeader)
for examples of shadowing.

#### Via Extending

The Site Builder can create a new token that utilizes `asHeaderToken()`, and then can
extend/override the specific domains within that token.

```js
const BrandXHeader = asHeaderToken({
  // Will spread all existing header functionality across all domains.
  ...vitalHeader.Default,
  Components: {
    // Will spread all header components as is.
    ...vitalHeader.Default.Components,
    // Will replace the DesktopSearch slot with the custom component
    DesktopSearch: brandXSearch.Default,
  },
  Spacing: {
    // Since there is no spread, will override the vitalHeader Spacing domain
    // and use what is defined below.
    Container: 'mx-auto py-2',
  }
});
```

This token is then applied to the Header slot within Layout -- can be achieved
by shadowing Layout, see
[Vital Layout Token Collection](../../../Development/API/@bodiless/vital-layout/interfaces/VitalLayout?id=default)

## Architectural Details

Vital Header provides a `<header>` element wrapper around its internal elements.

?> **View API documentation for details.**:
[Vital Header Components](../../../Development/API/@bodiless/vital-layout/interfaces/HeaderComponents)
