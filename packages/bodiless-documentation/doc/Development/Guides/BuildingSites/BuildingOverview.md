# Building a Site using Bodiless

This guide is a suggested process for building sites using Bodiless.

There are two use cases for building sites.
* A brand new site build with new assets (typography, design & copy deck).
* Rebuild of an existing site on the Bodiless platform

In either case, the process is generally the same. In the rebuild of an existing
site, assets can often be reused and design/requirements/copy can be derived
from the existing site.

## Table of Contents

* [Prerequisites](#Prerequisites)
* [1. Creating a New Site](#_1-create-a-new-site-with-the-bodiless-starter)
* [2. Setting up Design System](#_2-setting-up-design-system)
* [3. Components](#_3-components-&-component-tokens)
* [4. Templates or One-off Custom Pages](#_4-templates-or-one-off-custom-pages)

## Prerequisites

As a precursor, we highly recommend reading the following basics & guides as
this guide builds upon that knowledge.

* [Creating a Site](../../../About/GettingStarted)
* [Site Build Basics](../../Guides/SiteBuildBasics)
* [Design Element Basics](../../Guides/DesignElementBasics)
* [Design System Architecture](../../../Design/DesignSystem)
* [Tailwind Utlity Framework](https://tailwindcss.com/)

## 1. Create a new site with the Bodiless Starter

Follow the directions to create a new site using the
   [starter site instructions](../../../About/GettingStarted?id=creating-a-new-site).

## 2. Setting up Design System

This is where site builder will begin setting up the typography and site level
design requirements of the site.

The basic units of design in Bodiless are
[Tokens](../../../Design/DesignSystem?id=element-tokens). Tokens are the
foundation that the site builder can build upon or extend to build a design
system for the site. The starter kit provides a beginning set of tokens to start
utilizing. This set can be found in `src/components/Elements.token.ts`. These
tokens can be customized to meet the site's requirements and additional tokens
can be added. This becomes the foundation that the site builder can build upon
or extend to build a design system for the site. The starter kit provides
a beginning set of tokens to start utilizing and they can be found in
`src/components/Elements.token.ts`. These can be customized to meet the site's
requirements and additional ones can be added.

The default tailwind configurations also set global configuration elements to
set items such as site width and breakpoints.

### Setup Tokens

#### Tailwind Configuration

Within `Elements.token.ts` the site builder will find Element tokens that
utilize `addClasses()` to add class names, usually these are utility-first
Tailwind classes but regular css classes can be added as well. The starter kit
offers default Tailwind classes but site builder may have to provide additional
definitions, such as custom colors. For more information on doing this, read
[Tailwind with Bodiless](./TailwindGuide.md)

##### Element Tokens

The following is set of example element tokens we provide in the starter site.
These correspond to single atoms that will be used in the more complex
components. In Bodiless, tokens are generally expressed as React Higher Order
components.

Here is a sampling of tokens that could be used. For full set of tokens, after
site builder generates a new site from the starter site, reference the site's
`src/components/Elements.token.ts` file for full set or
[see it on GitHub](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/starter/src/components/Elements.token.ts).

The following are examples of some tokens:

```
const asMargin = addClasses('m-2');
const asXMargin = addClasses('mx-2');
const asNegXMargin = addClasses('-mx-2');
const asXPadding = addClasses('px-2');

/* Primary coloring */
const asPrimaryColorBackground = addClasses('bg-gray-200');

// Typography
const asBold = addClasses('font-bold');
const asLink = addClasses('text-brand_lightblue underline');
const asHeader1 = flow(addClasses('text-3xl'), asTextColorPrimary, asBold);
const asHeader2 = flow(addClasses('text-2xl', asBold));
```

Take special note that `asHeader1` starts combining the previously defined
tokens and additional classes to generate a black bold header.

The `Elements.token.ts` consists of atoms or building blocks that will be shared
among all the components/pages/templates. Often this file contains simple tokens
where it defined by one class. These HOA can grow into more complex HOC's, being
it takes more code to define the design. If site builder continues adding more
only in this file, it could be become a catchall. Thus, we recommend putting
thought into how to organize the tokens for future maintenance.

#### Organizing Tokens

As site builder creates more element tokens & complex design tokens, they have
the choice to either add them to `Elements.token.ts`, an additional global
tokens file, or a component folder. A suggested practice is the following:

* Very small, atom-like, that are reused across site go into `Elements.token.ts`
* Specific tokens (atom-size or small molecules) that are:
  * reused throughout site
  *  more complex than previous atom-like tokens
  * not large enough to be in their own folder
   We recommend creating files with a descriptive title that describes the type
    of tokens it contains.
  For example a site builder could create `page.token.ts` where they could store 
    components that help layout pages (sections, indents, etc).
* Token styling of components should be stored with the individual components.

### Fonts

Websites often use custom fonts and Bodiless is very flexible in how these can
be added.  For more details please read using [Fonts](./Fonts).

## 3. Components & Component Tokens

A Bodiless site is built out of many components. The starter kit comes with some
ready-made and re-usable components and can be found in `/src/components`

### Components that come in the Starter Kit

The following components are part of the Starter Kit and site builder can start
modifying to meet the site's requirements. The starter kit has elements that
every site will probably use in some form.

* [Header](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/starter/src/components/Layout/header.tsx):
  The reusable header section for all pages, usually containing the site logo,
  title, main nav, etc.
* [Footer](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/starter/src/components/Layout/footer.tsx):
  The reusable footer section for all pages, usually containing copyright,
  footer menus, etc.
* [Layout](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/starter/src/components/Layout/index.tsx):
  The main page that combines header, content, & footer of the page. This may
  also contain meta data inserted into head of pages.
* [Logo](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/starter/src/components/Layout/logo.tsx):
  Logo used with the desktop header and mobile burger menu.
* [Rich Text Editors](https://github.com/johnsonandjohnson/Bodiless-JS/tree/master/examples/starter/src/components/Editors):
  * Simple : Superscript Only
  * Basic : Superscript, Bold, Italic, Underline, Link, Align Text
  * Full Featured : adds in more functionality to Basic such as Strikethru, headers, quotes.
  * These can be easily customized or extended to support editor requirements for the site.
* [Cards](https://github.com/johnsonandjohnson/Bodiless-JS/tree/master/examples/starter/src/components/Card):
  Cards are blocks of content that can include Image, Title, Body, Call to
  Action Link.
* [Images](https://github.com/johnsonandjohnson/Bodiless-JS/tree/master/examples/starter/src/components/Image):
  Reusable Landscape and Square Images. 
* [Menu & Mobile Burger menu](https://github.com/johnsonandjohnson/Bodiless-JS/tree/master/examples/starter/src/components/Menu):
  Global Menu system.

For a more in-depth guide about these see
[Explanation of Components that come in the Starter Kit](./ComponentsStarterKit).

### Identify & Define Tokens used in a site and their variations

If you are building a new site from scratch, hopefully your creative agency will
have provided a design system which clearly defines a site's tokens and the
components to which they apply. As mentioned before, the starter kit comes with
some predefined token implementations that can be modified or extended to match
this design. In the case where the site is being rebuilt from an existing site
or the original assets are not available, or if the agency does not work
with design systems, the tokens will have to be determined by inspecting and
reverse engineering the existing site.

### Identify Components used in a site and their variations

Since the building of the site is composing of many types of different
components. The first step is determining what components the site will need.
The above components provided by the starter kit are fundamental components the
site will most likely use. If site doesn't need that component, feel free to
remove it. In the case where the site is being rebuilt from existing site and
the original site assets are not available, the list components will have to be
determined by inspecting and reverse engineering the existing site.

As a site builder looks through the site build assets provided for a new site or
existing site, they will want to identify types of components required.

This requires more in-depth walk thru so read more in-depth on
[how to identify components & variations](./IdentifyingComponentsGuide).

Once done, the site builder will have generated a list of components the new
site will use, as well as, possible variations of any of those components. This
will help determine:

* what components site builder can use from Bodiless packages as is and styled
  to meet site requirements if needed.
* what components can be extended/varied with tokens to meet the site requirements.
* what variations of the components will need to be built.

and with this knowledge can help scope, estimate & plan the site build.

### Building Out Components

A site builder can start building out components that have been identified as
reusable or wait until template/page is built that needs that component.

We recommend reading some of the following guides:

* [Refining the editor components](../../../Components/RichText?id=richtext-component) to meet the site's requirements.
* [Building Site Components Guide](/TBD)
* [FlowContainer Guide](../../../Components/FlowContainer.md)

In general, we recommend as best practice to create components in their own
folders unless they are super small. The recommendation is a folder name as the
name of the component. Within the folder component, a suggested pattern is that
it will have at least an index.tsx that defines the HOC and a token.ts file that
contains the design styling of the component but depending on complexity it
could have more.

## 4. Templates or One-off Custom Pages

### Identifying Templates

Bodiless uses templates to help make the site build faster by reusing patterns.
The next step in the process is to analyze the site build (assets provided for a
new site or an existing site) looking for commonality in the page layouts. Often
site builder might find the following:

* Article Pages (Could be one article layout style or several article styles)
* Product Listing Page
* Product Detail Page
* Utility Pages (Such as Privacy, Cookie, etc)

If site builder sees a pattern that a site uses same layout more than once,
which is expected, this is beneficial to group these pages and create a template
for each group.  

A template will often consist of flexible area (use
[FlowContainer](../../../Components/FlowContainer.md)) and defined
components/behavior.

Please read using [templates](./Templates/README.md) for deeper dive.

### Identifying One-off Custom Pages

A site may have a custom unique layout for a single page. For example, a
homepage often has unique layout or complex layout that is not reused. This page
can be created as page directly within `src/pages/` in the correct path for
display. An example of this is the
[homepage of test site](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/data/pages/index.tsx).

If similar pages are added in the future, this one-off, custom page could be
refactored into a template.

### Building out Page/Template with its components

This step is a repeatable step for every template or one-off page + components
identified in the previous 2 steps.

#### Building One-off Pages

1. Create & develop the page in `/src/data/pages/PATH`
1. Develop or extend components needed for the page. (`/src/components`) or
   locally in the page.
    * Suggested pattern for reusable component is to define in
      `/src/components`.
    * If it really is a custom component (or variation) only meant for this page,
      site builder can define locally within the page, or as another file in the
      page folder. If in future, site builder decides to reuse the component on
      another page, it is suggested to move to `/src/components` and not try to share
      with other pages.
1. Define Element tokens that may be needed to support the page/components
   utilized. (`src/components/Elements.tokens.ts` or a new
   `src/components/NAME.tokens.ts` )

#### Building Templates

1. Create & develop the template in `/src/templates`
1. Develop Or extend components needed for the template. (`/src/components`)
    * Suggested pattern if its reusable define in `/src/components`.
    * If its really custom component (or variation) only meant for this page,
      site builder can define locally within the template.
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

1. Once templates are defined within site, in the Bodiless Edit interface, site
   editor can add new pages that use the templates.
