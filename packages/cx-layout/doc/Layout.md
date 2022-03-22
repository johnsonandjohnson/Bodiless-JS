# CanvasX Layout Component

The Layout Component creates the basic structure that provides an `OuterContainer` wrapper around
the following elements:

- `SkipToMainContent`: Skip to main content accessibility link
- `Helmet`: Document head component contains meta components like SEO, GTM, Social Share, etc.
- `SiteHeader`
- `Container`
  - `PageTopper`
  - `{children}`: The actual page content
  - `PageCloser`
- `SiteFooter`

## CanvasX Design System at Layout Level

The CanvasX Design System does the following:

- The site global elements (header/footer) are full-width and expand to meet the viewport width.
- The container width isn't controlled in layout and delegated to Templates to define the page
  layout.
  - This allows slots within a template to be full-width of viewport, or contained/centered within
  the percent margin.
- The site at XL breakpoint is contained with a [container](https://tailwindcss.com/docs/container),
  and Tailwind will set the max-width to the min-width breakpoint, thus constraining the site to
  never grow larger than XL breakpoint.

## Content Editor Details

There is no interaction by the Content Editor with the actual Layout Component.

## Site Builder Details

At the site or global regional/brand library level, you can use the Layout Component as is, or
extend/shadow the existing component.

?> **Tip:** While building out Layout, it's recommended to leave the existing CanvasX component —
or, if new, stub out the component and render a text placeholder — you can return to the particular
component later in the site build. In the beginning of your site build, focus on the general
structure of header, footer, etc. here, and leave the details for a later step in the process.

### Skip To Main Content

The _Skip To Main Content_ is an accessibility feature defined in the Behavior domain that provides
a hidden link at the top of the page that links to an anchor that is placed on the container. It
becomes visible when the user visits the site and starts interacting with their keyboard's Tab key.

### Customizing Via Shadowing (*Preferred Method)

Provide the Shadowing function as defined in [Shadow](../CX_Elements/CX_Shadow).

File to shadow:
[`cxLayout.ts`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/cx-layout/src/components/Layout/tokens/cxLayout.ts)

### Skip To Main Content Customization

- If you wish to override the language of the link, set the children text via `addProps()`.
- If you wish to change where the Skip to Main Content link is, set a new anchor on the appropriate
  slot, and change the href via `addProps()`.

## Architectural Details

CX Layout provides a Layout structure around the core components of the page. To see how these
elements are structured within the wrapper, please see:
[`LayoutClean.tsx`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/cx-layout/src/components/Layout/LayoutClean.tsx).
