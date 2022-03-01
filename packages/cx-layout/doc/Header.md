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

From a Site Builder perspective, CX Header (`cxHeader`) is a token collection — not a component. You
can use the default CX Header token (`cxHeader.Default`) as is, or you can recompose it to meet your
site's requirements.

## Architectural Details

CX Header provides a `<header>` element wrapper around its internal elements. To see how these
elements are structured within the wrapper, please see:
[`HeaderClean.tsx`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/cx-layout/src/components/Header/HeaderClean.tsx)
