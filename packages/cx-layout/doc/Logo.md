# CanvasX Logo Component

The Logo is a simple component with a wrapper around a linked image with the following features:

* The Logo is a Gatsby Image.
* The image loads with 'eager' to force it to load immediately.
* Its link is saved as a sidecar link.
* Default data is saved within the `site` node collection, so it's reused on every page.

## Content Editor Details

The Content Editor can change the image or link of the Logo via the usual process for [editing
images](/Components/Image/#select-and-configure-an-image).

?> **Note:** Changing the Logo on one page, changes the Logo on all pages.

## Site Builder Details

At the site or global regional/brand library level, you can use the Logo Component as is, or
extend/shadow the existing component.

### Customizing Via Shadowing (*Preferred Method)

Provide the Shadowing function as defined in [Shadow](../CX_Elements/CX_Shadow).

File to shadow:
[`cxLogo.ts`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/cx-layout/src/components/Logo/tokens/cxLogo.ts)

## Architectural Details

To see how these elements are structured within the wrapper, please see:
[`LogoClean.tsx`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/cx-layout/src/components/Logo/LogoClean.tsx).
