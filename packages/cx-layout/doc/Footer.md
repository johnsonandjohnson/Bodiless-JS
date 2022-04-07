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

### Usage

Using the following code example as a guide, you can create a Footer using the Vital default tokens,
and applying the correct node keys. Remember to apply the necessary imports to the file.

```tsx
const Footer = as(
  // You can compose or create a new Footer token
  // from scratch, but we'll use the default one here.
  vitalFooter.Default,
  // Apply a node to the footer so inner nodes
  // are organized into its namespace.
  withNode,
  withNodeKey({ 'footer', nodeCollection: 'site' }),
)(FooterClean);

const Layout: FC = ({ children }) => (
  <SiteWrapper>
    <ContentWrapper>
      {children}
    </ContentWrapper>
    <Footer />
  </SiteWrapper>
);
export default Layout;
```

#### Customizing Via Shadowing (*Preferred Method)

Provide the Shadowing function as defined in [Shadow](../CX_Elements/Shadow).

File to shadow: `./lib/shadow/cx-layout/{MyFooter}.js`

#### Customizing Via Extending

The Site Builder can create a new token that utilizes `asFooterToken()`, and then can
extend/override the specific domains within that token.

```js
const BrandXFooter = asFooterToken({
  // Will spread all existing footer functionality across all domains.
  ...vitalFooter.Base,
  Components: {
    // Will spread all footer components as is.
    ...vitalFooter.Base.Components,
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

This token is then applied to the Footer slot within Layout.

## Architectural Details

Vital Footer provides a `<footer>` element wrapper around its internal elements. To see how these
elements are structured within the wrapper, please see:
[`FooterClean.tsx`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/cx-layout/src/components/Footer/FooterClean.tsx ':target=_blank')
