# Building a Site using Bodiless

This guide is a suggested process for building sites using Bodiless.

## Table of Contents

* [Prerequisites](#Prerequisites)
* [1. Creating a New Site](#_1-create-a-new-site-with-the-bodiless-starter)
* [2. Setting up Design System](#_2-setting-up-design-system)
* [3. Components](#_3-components)
* [4. Templates or One-off Custom Pages](#_4-templates-or-one-off-custom-pages)

## Prerequisites

As a precursor, we highly recommend reading the following basics & guides as
this guide builds upon that knowledge.

* [Creating a Site](About/GettingStarted)
* [Site Build Basics](About/SiteBuildBasics)
* [Design System](Design/DesignSystem)
* [Design System Architecture](Development/Architecture/FClasses)
* [Tailwind Utlity Framework](https://tailwindcss.com/)

## 1. Create a new site with the Bodiless Starter

1. Follow the directions to create a new site using the
   [starter site](About/GettingStarted).

## 2. Setting up Design System

This is where you will begin setting up your typography requirements of a site.

Bodiless use Design Tokens to start developing the simple/atomic design elements
used for a site. These are the foundation elements/tokens that you can build
upon to extend and build a design system for your site. These Element Tokens can
be found in `src/components/Elements.token.ts` and the starter kit provides a
beginning set of tokens to start utilizing. These can be customized to meet your
requirements and additional ones can be added.

### Setup Tokens

#### Elements.token & Tailwind

`Elements.token.ts` utilizes addClasses() to add utility-first classes, usually
these are Tailwind classes but regular classes can be added as well, and you may
find you need to add additional colors and other styling than the default
Tailwind configuration provides. For more information on using
[Tailwind with Bodiless](Development/BuildingSites/TailwindGuide.md)

##### Tokens in Elements.token.ts

The following is set of example tokens we provide in the starter site. These are
single "atoms" of design that will be used in the more complex components.

```
// Page Structure
const asBlockItem = addClasses('w-full');
const asPageContainer = addClasses('container mx-auto p-0 md:p-3');
const asSectionContainer = addClasses('container mx-auto my-6');

const asMargin = addClasses('m-2');
const asXMargin = addClasses('mx-2');
const asYMargin = addClasses('my-2');
const asNegXMargin = addClasses('-mx-2');
const asNegYMargin = addClasses('-my-2');
const asPadding = addClasses('p-4');
const asXPadding = addClasses('px-2');
const asYPadding = addClasses('py-2');
```

The above section are tokens that are reused to layout blocks on a page as well
as standard margin/padding that site will use.

```
/* Primary coloring */
const asPrimaryColorBackground = addClasses('bg-gray-200');
const asTextColorPrimary = addClasses('text-black');
```

This section defines the coloring to be used.

```
// Typography
const asBold = addClasses('font-bold');
const asLink = addClasses('text-brand_lightblue underline');
const asSuperScript = addClasses('');
const asHeader1 = flow(addClasses('text-3xl'), asTextColorPrimary, asBold);
const asHeader2 = flow(addClasses('text-2xl', asBold));
```

This section starts defining the typography for the site.

Take special note that `asHeader1` starts combining the previously defined
tokens and additional classes to generate a black bold header.

The `Elements.token.ts` consists of your atoms or building blocks that will be
shared among all your components/pages/templates.

As you create more elements & components, a site builder has the choice to
either add them to `Elements.token.ts`, a new additional `NAME.token.ts` file,
or a component folder. A suggested practice is the following:

* Very small, atom-like, that are reused across site go into `Elements.token.ts`
* Specific tokens (still very atom or small molecules) that are reused
  throughtout but not large enough to be their own folder with a descriptive
  title. A example of page.token.ts where you store an editable h1 title & h2
  title components.

### Fonts

Websites often use custom fonts and Bodiless is very flexible in how these can
be added.  For more details please read using [Fonts](Development/BuildingSites/Fonts).

## 3. Components

A Bodiless site is built out of many components. The starter kit comes with some
ready-made and re-usable components and can be found in `/src/components`

### Components that come in the Starter Kit

The following components are part of the Starter Kit and you can start modifying
to meet your requirements. The starter kit has elements that every site will
probably use in some form.

* Header: `src/components/Layout/header.tsx`
* Footer: `src/components/Layout/footer.tsx`
* Layout: `src/components/Layout/index.jsx`
* Rich Text Editors: `src/components/Editors/*` that define by default
  * Simple : Superscript Only
    * Basic : Superscript, Bold, Italic, Underline, Link, Align Text
    * Full Featured : adds in more functionality to Basic such as Strikethru, headers, quotes.
* Touts: `src/components/Touts`
* Images: `src/components/Images`
* Menu & Mobile Burger menu: `src/components/Menus`

For a more in-depth guide about these see
[Explanation of Components that come in the Starter Kit](Development/BuildingSites/ComponentsStarterKit).

### Identify Components used in a site and their variations

Since the whole building of the site is composing of components. The first step
is determining what components your site will need. The above components
provided by the starter kit are fundamental components your site will most
likely use. If you do not need that component, feel free to remove it.

As you look through the site build (Assets provided for a new site or existing
site), you will want to identify types of components required.

This requires more in-depth walk thru so read more in-depth on
[how to identify components & variations](Development/BuildingSites/IdentifyingComponentsGuide).

Once done, you have list of components your new site will use
as well as possible variations of any of those components. This will help
determine:

* what components you can use from Bodiless packages as is.
* what components can be extended/varied with tokens to meet the site requirements.
* what variations of the components will need to built.

and with this knowledge can help scope, estimate & plan the site build.

### Building out Components

You can start building out components that have been identified as reusable or
wait until template/page is built that needs that component.

We recommend reading some of the following guides:

* As described in Components section, the Rich Text Editor comes with a few
  editors. We suggest
  [refining the editor components](Components/RichText.md)
  to meet your site's requirements.
* [Building Components Guide](Development/BuildingSites/BuildingComponents.md)
* [FlowContainer Guide](Components/FlowContainer.md)

In general we recommend as best practice to create components in their own
folders if they are larger/more complex/multiple versions and/or have complex
styling. The recommendation is a folder name as name of component. Within the
folder component, a suggested pattern is it will have at least an index.tsx that
defines the HOC and a token.ts file that contains the design styling of the
component.

## 4. Templates or One-off Custom Pages

### Identifying Templates

Bodiless uses templates to help make your site build faster by reusing patterns.
The next step in the process is to analyze the site build (assets provided for a
new site or existing site) looking for commonality in the page layouts. Often
you might find the following:

* Article Pages (Could be one article layout style or several article styles)
* Product Listing Page
* Product Detail Page
* Utility Pages (Such as Privacy, Cookie, etc)

If you see a pattern that site uses same layout more than once, which you would
expect this to happen, this is beneficial to group these pages and create a
template for this group.  

Using templates provides other benefits:

* It also allows control or governance over what the site editor can
  add, edit and remove from the page.
* It allows site builder to make future changes to all pages built off these
  templates, without editing each individual page.

Let's take a look at the Bodiless templates in the Test Site and review each of
these. In the Bodiless Test Site Homepage there are currently three types of
[templates](https://github.com/johnsonandjohnson/Bodiless-JS/tree/master/examples/test-site/src/templates)
in use.

* [_default](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/templates/_default.jsx)
  * This provides a simple page with header/footer and a flowContainer area in
    the page to add any component the flowContainer supports.
  * The site editor has control to add/remove components anywhere between the
    header/footer. The flowContainer area also poses no limitation (by default)
    to what can be added here so any components that flowContainer supports can
    be added.
  * Very flexible, free-form page allowing site editor complete control over
    contents of the page.
  * This is part of the starter kit.

* [product_listing](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/templates/product_listing.jsx)
  * This is a template that contains a editable title, editable image and
    special flowContainer area that can only add variation of touts that have
    special product features.
  * This page is very restrictive template that site editor can only edit the
    title, change the image, and place specific product touts.
    * This is not part of the starter kit and the template must be added to the
      site if you would like this template.

* [product_detail](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/templates/product_detail.jsx)
  * This is a template page that creates a product detail pages with editable
    images, accordions, flowContainer area for touts, & reviews if site uses
    this feature.
  * This page is also very restrictive page that force the site editor to only
    modify Image, Title, Product Details in their accordions and placing of a
    specific product tout.
  * This restrictiveness enforces conformity that all product detail pages are
    similar. It also allows in future, a new component to be added easily to
    template, and apply to all products.
    * If a single product detail page had to deviate from the template, it could
      be copied to the page and modified and it breaks away from templating as
      one-off customized product detail page, requiring in future, any new
      components to be done on this page.
  * This is not part of the starter kit and the template must be added to the
    site if you would like this template.

So as a site builder creating templates, it is suggested to create templates
with defining what you see is general uniformity and applying flowContainer
areas within an area to add components as needed. For example, in article you
create two columns (2/3 & 1/3) where left side is a flowContainer area that can
take any component and the right 1/3 sidebar maybe only takes tout components or
Rich Text Editor component. This allows all articles to have column layouts and
enforce uniformity, but what is placed into those areas is more flexible and
controlled by editor.

### Identifying One-off Custom Pages

A site may have just a custom layout for a single page. For example, a homepage
often has unique layout or complex layout that is not reused. This page can be
created as page directly within `src/pages/` in the correct path for display. An
example of this is the
[homepage of test site](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/data/pages/index.tsx).

If in the future, if similar pages are added they could be refactored into a
template.

### Building out Page/Template with its components required to build out the page

This step is a repeatable step for every template or one-off page + components
identified in the previous 2 steps.

#### Building One-off Pages

1. Create & Develop the page in `/src/data/pages/PATH`
1. Develop Or Extend Components needed for the page. (`/src/components`) or
   locally in the page.
    * Suggested pattern if its reusable component/token define in
      `/src/components`.
    * If its really custom component (or variation) only meant for this page,
      you can define locally within the page, or as another file in the page
      folder. If in future, you determine to reuse the component on another
      page, its suggested to move to `/src/components` and not try share with
      other pages.
1. Define Element tokens that may be needed to support the page/components
   utilized. (`src/components/Elements.tokens.ts` or a new
   `src/components/NAME.tokens.ts` )

#### Building Templates

1. Create & Develop the template in `/src/templates`
1. Develop Or Extend Components needed for the template. (`/src/components`)
    * Suggested pattern if its reusable define in `/src/components`.
    * If its really custom component (or variation) only meant for this page,
      you can define locally within the template.
1. Define Element tokens that may be needed to support the page/components
   utilized. (`src/components/Elements.tokens.ts` or a new
   `src/components/NAME.tokens.ts` )
1. Create a page in `src/data/pages` to use the template by creating
   `index.json` with defining what templates to use. The `#template` this page
   will use the the specified template. `#subpage_template` (Optional) any
   children pages of this page will use the the specified template.

     ```
     {
       "#template": "product_listing",
       "#subpage_template": "product_detail"
     }
    ```

1. Create pages that use the templates.
