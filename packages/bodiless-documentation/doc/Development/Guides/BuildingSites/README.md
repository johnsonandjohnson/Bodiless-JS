# Building a Site Overview

This section describes how to build a site using BodilessJS and the Vital Design
System. While this guide specifically uses the Vital Design System, building out
your own custom tokens and components — instead of utilizing those offered by
Vital — will work. Each step is composed of resources that are useful in
accomplishing the step and most steps have a Guide explanation. While these
steps are ordered, certain steps that have no dependencis on previous steps can
be done in any order.

## 1. Create a site

<!-- tabs:start -->
### **Overview**

This step will create a site that is setup using the VitalDS and preconfigured
with many tools/settings such as Bodiless Shadowing.

### **Guide**

[Site Creation: Step by Step](./SiteCreation)

### **Resources**

- Bodiless CLI [new](/Tools/CLI/BodilessCLI)
- Steps on creating and initializing a new site repository as described in the
  [Getting Started](/About/GettingStarted) section.
- Review the description of our [monorepo setup](/Development/Packages)

<!-- tabs:end -->

## 2. Define Typography for the site

<!-- tabs:start -->
### **Overview**

This step will define and implement basic elements of the design system (typography, spacing,
colors).

### **Guide**

- [Shadowing Typography: Step by Step](./Typography/ShadowGuide)
- [Overview of steps to setup a Site's Typography](../../../VitalDesignSystem/Components/VitalElements/SiteTypography)

### **Resources**

- [Typography Overview](./Typography/Typography)
- [Best Practices for Using Tailwind with Bodiless](./Typography/TailwindGuide)
- [Best Practices Using Custom Fonts](./Typography/Fonts)

<!-- tabs:end -->

## 3. Define Site Text Editors

<!-- tabs:start -->
### **Overview**

This step will define and implement the basic text editors for your site, which includes a Rich
Text editor and Plain Text editor. If you have customized your Typography in the previous step,
you can provide this custom typography to your site's Rich Text editor.

### **Guide**

01. [Customizing the Rich Text Editor for your site](../../../VitalDesignSystem/Components/VitalEditors/RichTextCustomizing).
02. [Configuring the Superscripting for Plain Text Editor](../../../VitalDesignSystem/Components/VitalEditors/PlainEditor?id=via-shadowing)

### **Resources**

- [Vital Editors](/VitalDesignSystem/Components/VitalEditors/)
- [Bodiless Rich Text Editor](../../../Components/Editor/RichText)

<!-- tabs:end -->

## 4. Define Image Component

<!-- tabs:start -->
### **Overview**

This step is optional, as the
[Vital Image](/VitalDesignSystem/Components/VitalImage/) presets should provide
most required functionality (e.g.,
[static images](/VitalDesignSystem/Components/VitalImage/#static-images)). If
there are specific image requirements for your site, you may want to extend
these tokens.


  <!-- TODO: Link to some shadowing examples and update vital Image Doc -->

### **Resources**

- [Vital Image](/VitalDesignSystem/Components/VitalImage/)
- [Bodiless Image](../../../Components/Image/)
- [Gatsby Image Configuration](../../../Design/GatsbyTheme?id=gatsby-image)
- [Imagery Guidelines](../../Design/ImageGuidelines)

<!-- tabs:end -->

## 5. Basic Layout / Page

<!-- tabs:start -->
### **Overview**

This step will define and implement the general layout of the site. This will
include breakpoints, header & footer and general overall structure each page
will reuse.

  <!-- TODO: Link to Layout doc and shadowing examples -->

### **Resources**

- Basic structure for the site's [Layout](/VitalDesignSystem/Components/VitalLayout/Layout)
- [Breakpoints for responsiveness](/VitalDesignSystem/Components/VitalLayout/Responsiveness#breakpoints)
- [Header](/VitalDesignSystem/Components/VitalLayout/Header)
- [Footer](/VitalDesignSystem/Components/VitalLayout/Footer)
- [Helmet](/VitalDesignSystem/Components/VitalLayout/Helmet)
- Togglers:
  - [Menu Toggler](/VitalDesignSystem/Components/VitalLayout/MenuToggler)
  - [Search Toggler](/VitalDesignSystem/Components/VitalLayout/SearchToggler)
- For a more in-depth guide on working with the layout, please visit [Vital
Layout](/VitalDesignSystem/Components/VitalLayout/).

<!-- tabs:end -->

## 6. Multi-language

<!-- tabs:start -->
### **Overview**

The option if your site is multi-language is important to setup early as some
components shema have to handle the multi-language node keys. Bodiless/i18
packages offers tools to support this. The vital-demo by default is enabled for
two languages.

### **Guide**

  <!-- TODO: Complete bullet when able. -->
- If your site requires multi-language, we recommend bringing in the @bodiless/i18 package... TBD


<!-- TODO: Resources. -->

<!-- tabs:end -->

## 7. Global Components in Header & Footer

<!-- tabs:start -->
### **Overview**

This step will define the components that appear in the header & footer and
common to all pages.  (Excluding the Menu which is next step.)

### **Resources**

- [Logo](/VitalDesignSystem/Components/VitalLayout/Logo)
- [Header components](/VitalDesignSystem/Components/VitalLayout/Header)
- [Footer components](/VitalDesignSystem/Components/VitalLayout/Footer)

<!-- tabs:end -->

## 8. Navigation Components

<!-- tabs:start -->
### **Overview**

This step will define the navigation components that appear in the header and
footer, breadcrumbs and other interior menu components.

### **Guides**

- Implement your site's [Menu](/VitalDesignSystem/Components/VitalNavigation/Menu), [Burger
  Menu](/VitalDesignSystem/Components/VitalNavigation/BurgerMenu), and breadcrumb tokens; and
  insert them into your
  [Header](/VitalDesignSystem/Components/VitalLayout/Header)/[Layout](/VitalDesignSystem/Components/VitalLayout/Layout)
  and/or [Generic Page Template](/VitalDesignSystem/Components/VitalTemplates/Generic).
- Implement additional utility menus (often in header).
- Implement additional side menus (often in articles).
- Implement additional footer menus.

### **Resources**

- [Navigation Components](/VitalDesignSystem/Components/VitalNavigation/)
<!-- tabs:end -->
## 9. FlowContainer/Layout Tool

<!-- tabs:start -->
### **Overview**

This step will provide how to extend and customize the Vital Flow Container to
use your own components so the content editor has them available to add to the
page.

<!-- TODO: Step by step guide -->

### **Resources**

- [Vital FlowContainer](/VitalDesignSystem/Components/VitalFlowContainer)
- [Bodiless FlowContainer](../../../Components/FlowContainer)

<!-- tabs:end -->

## 10. Generic Page

<!-- tabs:start -->
### **Overview**

This step will provide how to extend and customize the Vital Generic Page.
Usually the generic page is few Flow Container components with no specific
structure. You will extend the Generic page into specific templates in a later
step to provide specific structure or components.

### **Guide**

<!-- TODO: Step by step guide -->
- Implement your site's generic page template.
  - For components which have not yet been implemented, leave them at their defaults for now.
- `TitleRow`
- `GenericPage`
  - Use appropriate Flow Containers for the content areas.
  - Use the Layout from the previous step.
- `Page`
  - Provide your `GenericPage` as the default variation in the `Page` chameleon.

### **Resources**

- [Vital Generic Page](/VitalDesignSystem/Components/VitalTemplates/Generic)

<!-- tabs:end -->

## 11. Simple Organism Tokens and Components

<!-- tabs:start -->
### **Overview**

This step you will create the tokens & components that will be useful to combine
and create Complex Organisms. The Vital DS provides many basic components that
can be customized to meet your site reqirements and/or you can add additional
components.

### **Guide**

<!-- TODO: Step by step guide -->
- Implement the basic organism customization tokens for the site.
  - As you develop each, create a Flow Container token which makes relevant variations of the
    organism available in one or more site Flow Containers, and add to existing Flow Containers.

### **Resources**

- This list includes:
  - [Accordion](/Components/SingleAccordion)
  - [Buttons](VitalDesignSystem/Components/VitalButtons/)  
  - [List/CompoundList](/VitalDesignSystem/Components/VitalList)
  - [Link](/VitalDesignSystem/Components/VitalLink)
  - [YouTube](/VitalDesignSystem/Components/VitalYouTube/)
  
<!-- tabs:end -->

## 12.  Complex Components:  Cards & Other Composed Group of Components

<!-- tabs:start -->

### **Overview**

This step you will build on Simple Organisms in previous step and create
component variations to meet site requirements. The Vital DS provides cards that
combine Image, Title, Body, Call to Action.

<!-- TODO: Step by step Guide -->

### **Resources**

- [Cards](/VitalDesignSystem/Components/VitalCard/)

<!-- tabs:end -->

## 13. Additional Templates

<!-- tabs:start -->
### **Overview**
In this step you will extend the Genric template to offer additional templates that your site may need, such as Article, Product Detail Page, Product Listing Page, and other custom templates.

<!-- TODO: Step by step guide -->

<!-- TODO: Find resources -->

<!-- tabs:end -->

## 14. Build out Site-Specific Components that your site may utilize

<!-- tabs:start -->

### **Overview**

If Bodiless/Vital DS doesn't have components, you will want to build out custom
components in `packages/mysite/src/components`.

<!-- TODO: Step by step Guide -->

### **Resources**

Components available by Bodiless / Vital DS:
- [Carousel](/Components/Carousel)
- Where to Buy
- [Search](/Components/Search/)
- [Filtering](/Components/FilterByGroup)
- [Custom components](/Development/Guides/CreatingBodilessComponents)

<!-- tabs:end -->

## 15. Reusable Content Library

<!-- tabs:start -->
### **Overview**

The Content Library allows you to save a component with its data to the system
and it can be reused on other pages.

### **Activation**

- [Enable Content Library](../../../Components/FlowContainer/?id=enable-content-library)
### **Resources**

- [Content Editor: Saving a compoenent](../../../Components/FlowContainer/?id=saving-a-component-in-the-content-library)
- [Content Editor: Unlinking a compoenent](../../../Components/FlowContainer/?id=unlinking-a-component-from-the-content-library)
- [Manual Site Builder: Building Contentful Components without use Content Library](./BuildingComponents/BuildingContentful)

<!-- tabs:end -->

## 16. Meta Components

<!-- tabs:start -->
### **Overview**

This section will give overview of how to setup meta data for your site that
will improve the SEO of your site. It will include metadata, favicon, sitemaps,
robots, and schemas.

<!-- TODO: SEO step by step guide to activate -->

### **Resources**

- Meta
  - [Metadata](./Meta/Metadata)
  - [Favicon](./Meta/Favicon)
- SEO
  - `Sitemap.xml`
  - [`Robots.txt`](/Design/GatsbyTheme#robotstxt)
  - [Schemas](/Components/Schema/):
    - [Organization](/Components/Schema/Organization)
    - [Product](/Components/Schema/Product)
    - [Video](/Components/Schema/Video)
    - [WebSite](/Components/Schema/Website)

<!-- tabs:end -->
## 17. Analytic Components

<!-- tabs:start -->
### **Overview**

While Vital Design Template doesn't come with any analytics automatically
activated. Some of Vital Design components add data to the data analytics layer
for Google Analytics 4 to help facilate tracking.

### **Activation**

- [Google Analytics 4 Activation](../../../Components/Analytics/GA4Activation)

### **Resources**

- [Analytics Overview](../../../Components/Analytics/)
- [Analytics with Google Tag Manager (GTM) and Google Analytics 4 (GA4)](../../../Components/Analytics/About_GTM_and_GA4).
- [Using GTM GA4 Data Attributes & Data Layer](../../../Components/Analytics/AddingTracking)

<!-- tabs:end -->

## 18. Integrating Third Party Components

<!-- tabs:start -->
### **Overview**

Third party components can be intergrated into your site and depending on component depends on the integration.
Refer to the third party component documentation.

<!-- **Tips**  -->
<!-- TODO: Good to have Guide/tips on SSR/Hydration -->

### **Resources**

- GDPR
- [Bazaarvoice (reviews)](/Components/bv)
- [Social Wall](/Components/SocialWall)

<!-- tabs:end -->

## 19. Content Editing

<!-- tabs:start -->
### **Overview**

Editables components added to your site during site build, will determine what
Content Editor can interact/edit.

### **Resources**

- [Content Editor Guide](/ContentEditorUserGuide/)

<!-- tabs:end -->