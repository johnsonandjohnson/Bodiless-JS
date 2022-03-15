## CanvasX Logo Component

The Logo Component is simple component with wrapper around linked image component with the following features:
* Image is a gatby image.
* Image is loading with eager to force this image is load immediately.
* Link is saved as sidecar link.
* Default data saving with site's node collection so its reused on every page.

### Content Editor Details

The content editor can change the image or link of the Logo via usual (editing of images](TBD @Jones link).

?> **TIP** Changing on one page, changes logo on all pages.

### Site Builder Details

At site or global regional/brand library, you can use the Logo Component as is or extend/shadow the existing the component.

#### Customing Via Shadowing (*Preferred Method)

Provide the Shadowing function as defined in [Shadow](../CX_Elements/CX_Shadow).

File to shadow:
[`cxLogo.ts`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/cx-layout/src/components/Logo/tokens/cxLogo.ts)

### Architectural Details

To see how these elements are structured within the wrapper, please see: [LogoClean.tsx](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/cx-layout/src/components/Logo/LogoClean.ts)
