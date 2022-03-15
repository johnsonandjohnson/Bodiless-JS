## CanvasX Layout Component

The Layout Component creates the basic structure that provides a ```Outercontainer``` wrapper around the following elements:

- ```SkipToMainContent```: Skip to main content accessibility link
- ```Helmet```: Document head component contains meta components like SEO, GTM, Social Share etc.
- ```SiteHeader```
- ```Container``` wrapper
  * ```PageTopper```
  * The actual page content -- {children}
  * ```PageCloser```
- ```SiteFooter```

### CanvasX Design System at Layout Level

The CanvasX Design System does the following:

* The site global elements (header/footer) are full width and expand to meet the viewport width.

* The container width isn't controlled in layout and delegated to Templates to define the page layout. This allows slots within a template to be full width of viewport or contained/centered within the percent margin.

* The site at Xl breakpoint is contained with a [container](https://tailwindcss.com/docs/container) and tailwind will set the max-width to the min-width breakpoint, thus constraining the site to never grow larger than XL breakpoint.

### Content Editor Details

There is no interaction by the content editor with the actual Layout Component.

### Site Builder Details

At site or global regional/brand library, you can use the Layout Component as is or extend/shadow the existing the component.

?> **Tip:** While building out Layout, it's recommended to leave the existing CanvasX component —
or, if new, stub out the component and render a text placeholder — you can return to particular
component later in the site build. In the beginning of site build, focus on the general structure of header, footer, etc. here, and leave the details for a later step in the process.

#### Skip To Main Content
The Skip To Main Content is an accessibility feature defined in the Behavior domain and provides a hidden link at top of page that links to anchor that is placed on the container.  It is becomes visible when the user visits sites and starts interacting with the keyboard tab key.

#### Customing Via Shadowing (*Preferred Method)

Provide the Shadowing function as defined in [Shadow](../CX_Elements/CX_Shadow).

File to shadow:
[`cxLayout.ts`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/cx-layout/src/components/Layout/tokens/cxLayout.ts)

#### Skip To Main Content Customization

* If you wish to override the langugage of the link, set the children text to via `AppProps()`

* If you wish to change where the skip to main content, set a new anchor on the appropriate slot and chnage the href via `AppProps()`

### Architectural Details

CX Layout provides a Layout structure around the core components of page. To see how these elements are structured within the wrapper, please see: [LayoutClean.tsx](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/cx-layout/src/components/Layout/LayoutClean.ts)
