# Building a Site Overview

This section describes how to build a site using BodilessJS and the Vital Design
System. While this guide specifically uses the Vital Design System, building out
your own custom tokens and components — instead of utilizing those offered by
Vital — will work. Each step is composed of resources that are useful in
accomplishing the step and most steps have a lesson explanation. While these
steps are ordered, certain steps that have no dependencis on previous steps can
be done in any order.

## 1. Create a site

<!-- tabs:start -->
### **Overview**

This step will create a site that is setup using the VitalDS and preconfigured
with many tools/settings such as Bodiless Shadowing.

### **Lesson**

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

### **Lesson**

- [Shadowing Typography: Step by Step](./Typography/ShadowLesson)
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

### **Lesson**

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

### **Lesson**

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

### **Lesson**

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

### **Lesson/step**

  <!-- TODO: Complete bullet when able. -->
- If your site requires multi-language, we recommend bringing in the i18 package... TBD

### **Resources**

<!-- tabs:end -->

## 7. Global Components in Header & Footer

<!-- tabs:start -->
### **Overview**
### **Resources**

- [Logo](/VitalDesignSystem/Components/VitalLayout/Logo) /
  
- [Header components](/VitalDesignSystem/Components/VitalLayout/Header)
- [Footer components](/VitalDesignSystem/Components/VitalLayout/Footer)

<!-- tabs:end -->

## 8. Navigation Components

<!-- tabs:start -->
### **Overview**

### **Lesson/Steps**

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

### **Lesson**

- TBD - Implement the basic layout editors for the site.
  - [`FlowContainer`](/VitalDesignSystem/Components/VitalFlowContainer): Apply standard spacing
    tokens to create one or more Flow Containers for different use cases. Include your Rich Text
    editor.
  - All the rest of the components will be added to the Flow Container as needed.

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

### **Lesson/Step**

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

### **Lesson/Step**

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

## 12.  Complex Organism Tokens and Components:  Cards

<!-- tabs:start -->

### **Overview**

### **Lesson**

- Implement a site's card tokens. Use the image, editor, and list, etc. tokens from previous
  steps.
- Review the variations of the different cards.

### **Resources**

- [Cards](/VitalDesignSystem/Components/VitalCard/)

<!-- tabs:end -->



## 13. Additional Templates

<!-- tabs:start -->
### **Overview**

### **Lesson/Steps**

- Implement a site's additional page templates such as:
  - Article
  - PDP
  - PLP
  - Custom
    - Homepage often has custom features/components.

### **Resources**

<!-- tabs:end -->

## 14. Build out Site-Specific Components that your site may utilize

<!-- tabs:start -->

### **Overview**

### **Resources**

- [Carousel](/Components/Carousel)
- Where to Buy
- [Search](/Components/Search/)
- [Social Share](/VitalDesignSystem/Components/VitalMeta/Share)
- [Filtering](/Components/FilterByGroup)
- [Custom components](/Development/Guides/CreatingBodilessComponents)

<!-- tabs:end -->

## 15. Contentful components

<!-- tabs:start -->
### **Overview**

### **Resources**

- [Building Contentful Components](./BuildingComponents/BuildingContentful)

<!-- tabs:end -->

## 16. Meta Components

<!-- tabs:start -->
### **Overview**

This section will give overview of how to setup meta data for your site that
will improve the SEO of your site. It will include metadata, favicon, sitemaps,
robots, and schemas.

### **Activation**

<!-- TODO: SEO step by step guide -->
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
activated. Some of Vital Design components add items to data analytics layer for
Google Analytics 4 to help facilate tracking.
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
<!-- TODO: Good to have lesson/tips on SSR/Hydration -->

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