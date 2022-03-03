# CX Header Component

The CX Header Component provides a header with the following elements:

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

From a Site Builder perspective, CX Header is comprised of a token collection (`cxHeader`) and a
Header component (`HeaderClean`). You can use the default CX Header token (`cxHeader.Default`) as
is, or you can recompose it to meet your site's requirements.

### Usage

```tsx
import React, { FC } from 'react';
import { cxHeader, HeaderClean } from '@bodiless/cx-layout';
import { as } from '@bodiless/fclasses';
import { withNode, withNodeKey } from '@bodiless/core';
import { SiteWrapper, ContentWrapper } from './wrapperComponents';
const Header = as(
  // You can compose or create a new header token
  // from scratch, but we'll use the default one here.
  cxHeader.Default,
  // Apply a node to the header so inner nodes
  // are organized into its namespace.
  withNode,
  withNodeKey('header'),
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

## Architectural Details

CX Header provides a `<header>` element wrapper around its internal elements. To see how these
elements are structured within the wrapper, please see:
[`HeaderClean.tsx`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/cx-layout/src/components/Header/HeaderClean.tsx)
