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

* [Creating a Site](/About/GettingStarted)
* [Site Build Basics](/Development/Guides/SiteBuildBasics)
* [Design Element Basics](/Development/Guides/DesignElementBasics)
* [Design System Architecture](/Design/DesignSystem)
* [Tailwind Utlity Framework](https://tailwindcss.com/)

## 1. Create a new site with the Bodiless Starter

Follow the directions to create a new site using the
   [starter site instructions](/About/GettingStarted?id=creating-a-new-site).

## 2. Setting up Design System

This is where you will begin setting up your typography requirements of your site.

Bodiless use Design Tokens to start developing the simple/atomic design elements
used for a site. These are the foundation elements/tokens that you can build
upon to extend and build a design system for your site. The starter kit provides
a beginning set of tokens to start utilizing and they can be found in
`src/components/Elements.token.ts`. These can be customized to meet your
requirements and additional ones can be added.

### Setup Tokens

#### Elements.token & Tailwind Interaction

Within `Elements.token.ts` you will find Element tokens that utilize
addClasses() to add class names, usually these are utility-first Tailwind
classes but regular css classes can be added as well. The starter kit offers
default Tailwind classes but you may have to provide addition definitions, such
as custom colors. For more information on doing this, read
[Tailwind with Bodiless](/Development/Guides/BuildingSites/TailwindGuide.md)

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

As you create more element tokens & complex design tokens, a site builder has
the choice to either add them to `Elements.token.ts`, an additional global
tokens file, or a component folder. A suggested practice is the following:

* Very small, atom-like, that are reused across site go into `Elements.token.ts`
* Specific tokens (atom-size or small molecules) that are reused throughout site
  but not large enough to be in their own folder. We recommend creating files
  with a descriptive title that describes the type of tokens it contains. A
  example is create page.token.ts where you could store an components that help
  layout pages (sections, indents, etc).
* Token styling of components should be stored with the individual components.

### Fonts

Websites often use custom fonts and Bodiless is very flexible in how these can
be added.  For more details please read using [Fonts](/Development/Guides/BuildingSites/Fonts).

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
* Rich Text Editors: `src/components/Editors/*` that are defined by default
  * Simple : Superscript Only
  * Basic : Superscript, Bold, Italic, Underline, Link, Align Text
  * Full Featured : adds in more functionality to Basic such as Strikethru, headers, quotes.
  * These can be easily customized or extended to support editor requirements for your site.
* Touts: `src/components/Touts`
  * Touts are blocks of content that can include Image, Title, Body, Call to Action Link.
* Images: `src/components/Images`
* Menu & Mobile Burger menu: `src/components/Menus`

For a more in-depth guide about these see
[Explanation of Components that come in the Starter Kit](/Development/Guides/BuildingSites/ComponentsStarterKit).

### Identify Components used in a site and their variations

Since the building of the site is composing of many types of different
components. The first step is determining what components your site will need.
The above components provided by the starter kit are fundamental components your
site will most likely use. If you do not need that component, feel free to
remove it.

As you look through the site build assets provided for a new site or existing
site, you will want to identify types of components required.

This requires more in-depth walk thru so read more in-depth on
[how to identify components & variations](/Development/Guides/BuildingSites/IdentifyingComponentsGuide).

Once done, you will have generated a list of components your new site will use,
as well as, possible variations of any of those components. This will help
determine:

* what components you can use from Bodiless packages as is.
* what components can be extended/varied with tokens to meet the site requirements.
* what variations of the components will need to be built.

and with this knowledge can help scope, estimate & plan the site build.

### Building Out Components

You can start building out components that have been identified as reusable or
wait until template/page is built that needs that component.

We recommend reading some of the following guides:

* [Refining the editor components](/Components/RichText?id=richtext-component) to meet your site's requirements.
* [Building Site Components Guide](/TBD)
* [FlowContainer Guide](/Components/FlowContainer.md)

In general, we recommend as best practice to create components in their own
folders unless they are super small. The recommendation is a folder name as the
name of the component. Within the folder component, a suggested pattern is that
it will have at least an index.tsx that defines the HOC and a token.ts file that
contains the design styling of the component but depending on complexity it
could have more.

## 4. Templates or One-off Custom Pages

### Identifying Templates

Bodiless uses templates to help make your site build faster by reusing patterns.
The next step in the process is to analyze the site build (assets provided for a
new site or an existing site) looking for commonality in the page layouts. Often
you might find the following:

* Article Pages (Could be one article layout style or several article styles)
* Product Listing Page
* Product Detail Page
* Utility Pages (Such as Privacy, Cookie, etc)

If you see a pattern that site uses same layout more than once, which you would
expect this to happen, this is beneficial to group these pages and create a
template for each group.  

Please read using [templates](./Templates/Templates.md) for deeper dive.

### Identifying One-off Custom Pages

A site may have a custom unique layout for a single page. For example, a
homepage often has unique layout or complex layout that is not reused. This page
can be created as page directly within `src/pages/` in the correct path for
display. An example of this is the
[homepage of test site](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/data/pages/index.tsx).

If in the future, if similar pages are added this one-off custom page could be
refactored into a template.

### Building out Page/Template with its components

This step is a repeatable step for every template or one-off page + components
identified in the previous 2 steps.

#### Building One-off Pages

1. Create & develop the page in `/src/data/pages/PATH`
1. Develop Or extend components needed for the page. (`/src/components`) or
   locally in the page.
    * Suggested pattern if its reusable component define in
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

1. Create & develop the template in `/src/templates`
1. Develop Or extend components needed for the template. (`/src/components`)
    * Suggested pattern if its reusable define in `/src/components`.
    * If its really custom component (or variation) only meant for this page,
      you can define locally within the template.
1. Define Element tokens that may be needed to support the page/components
   utilized. (`src/components/Elements.tokens.ts` or a new
   `src/components/NAME.tokens.ts` )
1. Create a page in `src/data/pages` to use the template by creating
   `index.json` with defining what templates to use. 
   - The `#template` this page
   will use the the specified template. 
   - The `#subpage_template` (which is optional) will define that any children
     pages of this page will use the specified template.
   - e.g.
     ```
     {
       "#template": "product_listing",
       "#subpage_template": "product_detail"
     }
    ```

1. Once templates are defined within site, in the Bodiless Edit interface, you
   can add new pages that use the templates.
