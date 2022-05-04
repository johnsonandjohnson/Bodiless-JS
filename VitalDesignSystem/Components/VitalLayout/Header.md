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

## Site Builder Details

From a Site Builder perspective, Vital Header is comprised of a token collection (`vitalHeader`) and
a Header component (`HeaderClean`). You can use the default Vital Header token
(`vitalHeader.Default`) as is, or you can recompose it to meet your site's requirements.

### Usage

Using the following code example as a guide, you can create a Header using the Vital default tokens,
and applying the correct node keys. Remember to apply the necessary imports to the file.

```tsx
const Header = as(
  // You can compose or create a new header token
  // from scratch, but we'll use the default one here.
  vitalHeader.Default,
  // Apply a node to the header so inner nodes
  // are organized into its namespace.
  withNode,
  withNodeKey({ 'header', nodeCollection: 'site' }),
)(HeaderClean);

const Layout: FC = ({ children }) => (
  <SiteWrapper>
    <Header />
    <ContentWrapper>
      {children}
    </ContentWrapper>
  </SiteWrapper>
);
export default Layout;
```

#### Customizing Via Shadowing (*Preferred Method)

Define a Shadowing token collection as defined in [Shadow](../VitalElements/Shadow).

File to shadow: `./lib/shadow/vital-layout/{MyHeader}.js`

#### Customizing Via Extending

The Site Builder can create a new token that utilizes `asHeaderToken()`, and then can
extend/override the specific domains within that token.

```js
const BrandXHeader = asHeaderToken({
  // Will spread all existing header functionality across all domains.
  ...vitalHeader.Base,
  Components: {
    // Will spread all header components as is.
    ...vitalHeader.Base.Components,
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

This token is then applied to the Header slot within Layout.

## Architectural Details

Vital Header provides a `<header>` element wrapper around its internal elements. To see how these
elements are structured within the wrapper, please see:
[`HeaderClean.tsx`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-layout/src/components/Header/HeaderClean.tsx)
