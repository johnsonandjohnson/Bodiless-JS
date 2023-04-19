# Vital Footer Component

The Vital Footer Component provides a footer with the following elements:

- Rewards
- Menu
- Copyright
- Social Links

## Content Editor Details

There is no interaction by the Content Editor with the Footer Component itself, only with components
within it.

By default, the editable components include:

- Menu
- Copyright
- Social Links (coming)

## Site Builder Details

From a Site Builder perspective, Vital Footer is comprised of a token collection (`vitalFooter`) and
a Footer component (`FooterClean`). You can use the default Vital Footer token
(`vitalFooter.Default`) as is, or you can recompose it to meet your site's requirements.

### Customizing Footer

#### Via Shadowing (*Preferred Method)

Define a Shadowing token collection as defined in [Shadow](../VitalElements/Shadow).

File to shadow: `packages/{my-package}/src/shadow/@bodiless/vital-layout/Footer.ts`

?> **API Documentation**: Visit the
[Vital Footer Token Collection](../../../Development/API/@bodiless/vital-layout/interfaces/VitalFooter)
for examples of shadowing.

#### Via Extending

The Site Builder can create a new token that utilizes `asFooterToken()`, and then can
extend/override the specific domains within that token.

```js
const BrandXFooter = asFooterToken({
  // Will spread all existing footer functionality across all domains.
  ...vitalFooter.Default,
  Components: {
    // Will spread all footer components as is.
    ...vitalFooter.Default.Components,
    // Will replace the Rewards slot with the custom component
    Rewards: brandXRewards.Default,
  },
  Spacing: {
    // Since there is no spread, will override the vitalFooter Spacing domain
    // and use what is defined below.
    Container: 'mx-auto py-2',
  }
});
```

This token is then applied to the Footer slot within Layout -- can be achieved
by shadowing Layout, see
[Vital Layout Token Collection](../../../Development/API/@bodiless/vital-layout/interfaces/VitalLayout?id=default)

## Architectural Details

Vital Footer provides a `<footer>` element wrapper around its internal elements.

?> **View API documentation for details.**:
[Vital Footer Components](../../../Development/API/@bodiless/vital-layout/interfaces/FooterComponents)
