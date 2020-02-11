# Building a Site using BodilessJS

This guide is a suggested process for building sites using BodilessJS.  The use case maybe a site build is a brand new site build with new assets (Typography, Design & Copy Deck) or we could be rebuilding an existing site on this platform.  We will point out where differences in the new site build versus replicating existing site may be in this process, but essentially the methodology used is similar for either type of build.

## Table of Contents
* [Prerequisites](#Prerequisites)
* [1. Creating a New Site](#1-Create-a-new-site-with-the-Bodiless-Starter)
* [2. Setting up design style of your site using Element tokens](#2-Setting-up-design-style-of-your-site-using-Element-tokens)
* [3. Identifying Components](#3-Identifying-Components)
* [4. Identifying Templates or One-off Custom Pages](#4-Identifying-Templates-or-One-off-custom-pages)
* [5. Build a Page/Template with its components required to build out the page](#5-Build-a-PageTemplate-with-its-components-required-to-build-out-the-page)

## Prerequisites:

As a precursor we highly recommend reading the following basics & guides as this guide builds upon that knowledge.

* [Creating a Site](https://johnsonandjohnson.github.io/Bodiless-JS/#/About/GettingStarted)
* [Site Build Basics](https://johnsonandjohnson.github.io/Bodiless-JS/#/About/SiteBuildBasics)
* [Design System Architecture](https://johnsonandjohnson.github.io/Bodiless-JS/#/Development/Architecture/FClasses)
* [Tailwind](https://tailwindcss.com/)


If a New Site Build
* Assets for site could include Typography, Design Mockups, Copy Deck, Sitemap, Wireframes, and Image/Font/Video and other assets.

If Rebuilding an Existing Site
* The assets can be obtained from the existing site.   Because BodilessJS has a [migration tool](https://johnsonandjohnson.github.io/Bodiless-JS/#/Tools/Migration?id=flattened-amp-build-filesassets), this tool could be run and copy over the /static file it generates as a shortcut to gather all assets.

## 1. Create a new site with the Bodiless Starter
1. Following the directions to create a new site using the [starter site](https://johnsonandjohnson.github.io/Bodiless-JS/#/About/GettingStarted).

## 2. Setting up design style of your site using Element tokens

This is where you will begin setting up your typography requirements of a site.

#### New Site Build
* This information should be found in the Typography assets and/or Design mockups.

#### Existing Site
* This information would be found by inspecting the site with tools like Chrome Developer Tool.
* Inspect the site to find the typography of the H1, H2, H3, colors of specific elements, background colors, margins, etc. 

Bodiless use Design Tokens to start developing the simple/atomic design elements used for a site. These are the foundation elements/tokens that you can build upon to extend and build a design system for your site. These Element Tokens can be found in `src/components/Elements.token.ts` and the starter kit provides a beginning set of tokens to start utilizing. These can be customized to meet your requirements and additional ones can be added.

### Setup Basic Typography

#### Elements.token & Tailwind
`Elements.token.ts` utilize addClasses() to add utility-first classes, specifically Tailwind, and you may find you need to add additional colors and other styling than the default Tailwind configuration provides.  This can be done by editing `tailwind.config.js` following [Tailwind documentation](https://tailwindcss.com/docs/configuration).  The starter kit has a empty Tailwind configuration which means that site will get all Tailwind's default settings in a generated index.css. 

Each time you make a change in tailwind.config.js you need to make sure your run 'npm run build:css' to regenerate a new `src/components/index.css` that is automatically included and the site uses.

The following is set of example tokens are for a site with blue & white branding with some default spacing.

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

This section are tokens that are reused to layout blocks on a page as well as standard margin/padding to be used.

```
// Primary coloring
const asPrimaryColorBackground = addClasses('bg-white');
const asTextColorPrimary = addClasses('text-black');
```

This section defines the coloring to be used.

```
// Typography
const asBold = addClasses('font-bold');
const asLink = addClasses('text-pen_lightblue underline');
const asSuperScript = addClasses('');
const asHeader1 = flow(addClasses('text-3xl'), asTextColorPrimary, asBold);
const asHeader2 = flow(addClasses('text-2xl', asBold));
```

This section starts defining the typography for the site.

Take special note that `asHeader1` starts combining the tailwind classes with previous defined elements to generate a black bold header.

### Fonts
Websites often use custom fonts and BodilessJS is very flexible in how these can be added. 
Here are some suggested ways to do this:
* [gatsby-plugin-google-fonts](https://github.com/didierfranc/gatsby-plugin-google-fonts) is part of BodilessJS and can be used.  Tip:  make sure GOOGLE_FONTS_ENABLED is not disabled in .env.site file.
* Using [Open Source Typefaces npm packages](https://github.com/KyleAMathews/typefaces) built by others 
* Or load them directly via [tutorial](https://dev.to/iangloude/4-steps-to-self-hosted-fonts-in-gatsby-aj2)

The fonts can be applied either:
* site wide by adding to `src/components/index.tailwind.css` and applying the font
   ```
   body {
     @apply font-custom_font;
   }
   ```
* or to specific headers/elements within each element in `src/components/Elements.token.ts`

## 3. Identifying Components
A BodilessJS site is built out of many components.  The starter kit comes with some ready-made and re-usable components and can be found in `/src/components`

### Components that come in the Starter Kit
The following components are part of the Starter Kit and you can start modifying to meet your requirements.
* Header `src/components/Layout/header.tsx`
* Footer `src/components/Layout/footer.tsx`
* Layout `src/components/Layout/index.jsx`
* Editor `src/components/Editors/*` that define by default
    * Simple : Superscript Only
    * Basic : Superscript, Bold, Italic, Underline, Link, Align Text
    * Full Featured : adds in more functionality to Basic such as Strikethru, headers, quotes.
 * Touts `src/components/Touts`
 For a more in-depth guide about these see [Explanation of Components that come in the Starter Kit](https://johnsonandjohnson.github.io/Bodiless-JS/#/Development/BuildingSites/ComponentsStarterKit).

### Identify Components used in Site and their variations
Since the whole building of the site is composed of components.  The first step is determining what components your site will need.  The above components provided by the starter kit are fundamental components your site will most likely use.  If you do not need, feel free to remove them.

As you look through the site build (Assets provide for a new site or existing site), you will want to identify types of components required. 

This required more in-depth walk thru so visit [How to Identify Components](https://johnsonandjohnson.github.io/Bodiless-JS/#/Development/BuildingSites/IdentifyingComponentsGuide)

So at this point, you should now have list of components your new site will use as well as possible variations of any of those components. This will help determine 
* what components you can use from Bodiless as is.
* what components can be extended/varied with tokens to meet the site requirements.
* what variations of the components will need to built.
and with this knowledge can help scope & plan your build.

## 4. Identifying Templates or One-off Custom Pages

### Templates
BodilessJS uses template to help make your site build faster.  The next step in the process is to analyze the site build (assets provided for a new site or existing site) looking for commonality in the page layouts.  Often you might find the following:
* Article Pages (Could be 1 article layout style or several styles)
* Product Listing Page
* Product Detail Page
* Utility Pages (Such as Privacy, Cookie, etc)

If you see a pattern that site uses same layout more than once, which you would expect this to happen, this is beneficial to group these pages and create a template for them. 

Besides templates, providing a fast layout that the site builder can use per page, it also allows control or governance over what the site editor can add/do/remove from the page. In addition, this also allows site builder to make future changes to all pages built off these templates, without editing each individual page. 

Let's take a look at the BodilessJS templates in the Test Site and review each of these.  In the BodilessJS [Test Site Homepage ](https://johnsonandjohnson.github.io/Bodiless-JS/#/About/GettingStarted?id=launch-the-test-site) there are currently three 4 types of [templates](https://github.com/johnsonandjohnson/Bodiless-JS/tree/master/examples/test-site/src/templates) in use.
* [_default](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/templates/_default.jsx) 
    * This provides a simple page with header/footer and flexbox area in the page to add any component the flexbox supports.
    * The site editor has control to add/remove components anywhere between the header/footer.  The flexbox area also poses no limitation to what can be added here so any components that flexbox supports can be added.
    * Very flexible, free-form page allowing site editor complete control over contents of the page.
* [special](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/templates/special.jsx) 
    * This is not a practical template as it just contains uneditable H1 used for testing.
* [product_listing](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/templates/product_listing.jsx)
    * This is a template that contains a editable title, editable image and special flexbox area that can only add variation of touts that have special product features.
    * This page is very restrictive template that site editor can only edit the title, change the image, and place specific product touts. 
* [product_detail](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/templates/product_detail.jsx)
    * This is a template page that creates a product detail pages with editable images, accordions, flexbox area for touts, & reviews if site uses this feature.
    * This page is also very restrictive page that force the site editor to only modify Image, Title, Product Details in their accordions and placing of a specific product tout.
    * This restrictiveness enforces conformity that all product detail pages are similar.  It also allows in future, a new component to be added easily to template, and apply to all products.
    * If a single product detail page had to deviate from the template, it could be copied to the page and modified and it breaks away from templating as one-off customized product detail page, requiring in future, any new components to be done on this page. 

So in creating templates, it is suggested to create templates with controlling what you see is general uniformity and applying flexbox areas within an area to add components as needed. For example in article you create two columns (2/3 & 1/3) where left side is flexbox area that can take any component and the right 1/3 sidebar maybe only takes tout components or Rich Text Editor component. This allows all articles of to have columns and uniformity, but what is placed into those areas is more flexible.


### One-off Custom
A site may have just a custom layout for a single page.  For example, a homepage often has unique layout or complex layout.  This page can be created as page directly within `src/pages/` in the correct path. An example of this is the [homepage of test site](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/data/pages/index.tsx).

If in the future, if similar pages are added they could be refactored into template.

## 5. Build a Page/Template with its components required to build out the page.

This step is a repeatable step for every template or one-off page + components identified in the previous 2 steps.

### One-off Pages:
1. Create & Develop the page in `/src/data/pages/PATH`
1. Develop Or Extend Components needed for the page. (`/src/components`) or locally in the page.
    * Suggested pattern if its reusable component/token define in `/src/components`.
    * If its really custom component (or variation) only meant for this page, you can define locally within the page, or as another file in the page folder. If in future, you determine to reuse the component on another page, its suggested to move to `/src/components` and not try share with other pages.
1. Define Element tokens that may be needed to support the page/components utilized. (`src/components/Elements.tokens.ts`)

### Templates:
1. Create & Develop the template in `/src/templates`
1. Develop Or Extend Components needed for the template. (`/src/components`)
    * Suggested pattern if its reusable define in `/src/components`.
    * If its really custom component (or variation) only meant for this page, you can define locally within the template. 
1. Define Element tokens that may be needed to support the page/components utilized.(`src/components/Elements.tokens.ts`)
1. Create a page in `src/data/pages` to use the template by creating `index.json` with definiting what templates to use. The `#template` this page will use the the specified template. `#subpage_template` (Optional) any children pages of this page will use the the specified template.
     ``` 
     {
       "#template": "product_listing",
       "#subpage_template": "product_detail"
     }
    ```
