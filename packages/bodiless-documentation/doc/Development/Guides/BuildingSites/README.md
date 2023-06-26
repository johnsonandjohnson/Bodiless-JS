# Building a Site Overview

This section describes how to build a site using BodilessJS and the Vital Design System. While this
guide specifically uses the Vital Design System, building out your own custom tokens and components
— instead of utilizing those offered by Vital — will work. Each step is composed of resources that
are useful in accomplishing the step, and most steps have a Guide explanation. While these steps are
ordered, certain steps — that have no dependencies on previous steps — can be done in any order.

## 1. Create a site

<!-- tabs:start -->
### **Overview**

This step will create a site that is set up using the VitalDS and preconfigured with many
tools/settings (such as Bodiless Shadowing).

### **Guide**

- [Site Creation: Step by Step](./SiteCreation)

### **Resources**

- Bodiless CLI [new](/Tools/CLI/BodilessCLI)
- Steps on creating and initializing a new site repository, as described in the [Getting
  Started](/About/GettingStarted) section.
- Review the description of our [monorepo setup](/Development/Packages).

<!-- tabs:end -->

## 2. Define Typography for the site

<!-- tabs:start -->
### **Overview**

This step will define and implement basic elements of the design system (typography, spacing,
colors).

### **Guide**

- [Shadowing Typography: Step by Step](./Typography/ShadowGuide)
- [Overview of steps to setup a Site's Typography](/VitalDesignSystem/Guides/SiteTypography)

### **Resources**

- [Typography Overview](./Typography/Typography)
- [Best Practices for Using Tailwind with Bodiless](../../../VitalDesignSystem/Guides/TailwindGuide)
- [Best Practices Using Custom Fonts](./Typography/Fonts)

<!-- tabs:end -->

## 3. Define Site Text Editors

<!-- tabs:start -->
### **Overview**

This step will define and implement the basic text editors for your site, which includes a Rich
Text editor and a Plain Text editor. If you have customized your Typography in the previous step,
you can provide this custom typography to your site's Rich Text editor.

### **Guide**

01. [Customizing the Rich Text Editor for your site](../../../VitalDesignSystem/Components/VitalEditors/RichTextCustomizing).
02. [Configuring the Superscripting for Plain Text Editor](../../../VitalDesignSystem/Components/VitalEditors/PlainEditor?id=via-shadowing).

### **Resources**

- [Vital Editors](/VitalDesignSystem/Components/VitalEditors/)
- [Bodiless Rich Text Editor](../../../Components/Editors/RichText)

<!-- tabs:end -->

## 4. Define Image Component

<!-- tabs:start -->
### **Overview**

This step is optional, as the [Vital Image](/VitalDesignSystem/Components/VitalImage/) presets
should provide most required functionality (e.g., [static
images](/VitalDesignSystem/Components/VitalImage/#static-images)). If there are specific image
requirements for your site, you may want to extend these tokens.


  <!-- TODO: Link to some shadowing examples and update vital Image Doc -->

### **Resources**

- [Vital Image](../../../VitalDesignSystem/Components/VitalImage/)
- [Bodiless Image](../../../Components/Image/)
- [Gatsby Image Configuration](../../../Development/GatsbyTheme?id=gatsby-image)
- [Imagery Guidelines](../../../VitalDesignSystem/Components/VitalImage/ImageGuidelines)

<!-- tabs:end -->

## 5. Basic Layout / Page

<!-- tabs:start -->
### **Overview**

This step will define and implement the general layout of your site. This will
include the general overall structure each page will reuse and the helmet (items
rendered in <head>). 

?> **Note:** Layout also includes header & footer but this step is broken out
into three individual steps: Layout, Multilingual, & Header/Footer. If your site
needs multi-language, it is best to do that step prior to setting up the Header
& Footer. This will allow components within the header/footer or the entire
header/footer component to be toggled for the different language.

- For more information, for [Multi-language](?id=_6-multi-language)
- For more information, for
  [Global Components in Header & Footer](?id=_7-global-components-in-header-amp-footer)

### **Guide**

Recommended patterns for overriding layout:

- [Layout](/Development/API/@bodiless/vital-layout/interfaces/VitalLayout?id=default)
- [Helmet](/Development/API/@bodiless/vital-layout/interfaces/VitalHelmet?id=default)

### **Resources**

- [Layout Documentation](/VitalDesignSystem/Components/VitalLayout/Layout)
  - [Layout API Components](/Development/API/@bodiless/vital-layout/interfaces/LayoutComponents)
  - [Layout API Token Collection](/Development/API/@bodiless/vital-layout/interfaces/VitalLayout)
- [Helmet Documentation](/VitalDesignSystem/Components/VitalLayout/Helmet)
  - [Helmet API Components](/Development/API/@bodiless/vital-layout/interfaces/HelmetComponents)
  - [Helmet API Token Collection](/Development/API/@bodiless/vital-layout/interfaces/VitalHelmet)
- For a more in-depth guide on working with the layout, please visit [Vital
  Layout](/VitalDesignSystem/Components/VitalLayout/).

<!-- tabs:end -->

## 6. Multi-language

<!-- tabs:start -->
### **Overview**

The option if your site is multi-language is important to set up early, as some components' schema
have to handle the multi-language node keys. Bodiless/i18 packages offers tools to support this. The
[vital-demo](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/sites/vital-demo) site, by
default, is enabled for two languages.

### **Guide**

- If your site requires multi-language, we recommend bringing in the
  Internationalization @bodiless/i18 package. Please read the documentation that
  includes a [step by step guide](../../../Components/Internationalization/).

### **Resources**

- [i18n (Internationalization) Documentation](../../../Components/Internationalization/)
- [i18n (Internationalization) API](/Development/API/@bodiless/i18n/README)

<!-- tabs:end -->

## 7. Global Components in Header & Footer

<!-- tabs:start -->
### **Overview**

This step will define the components that appear in the header and footer, and are common to all
pages. (Excluding the Menu which is the next step.)

### **Guide**

Recommended patterns for overriding layout:

- [Logo](/Development/API/@bodiless/vital-layout/interfaces/VitalLogo?id=default)
- [Header](/Development/API/@bodiless/vital-layout/interfaces/VitalHeader?id=default)
- [Footer](/Development/API/@bodiless/vital-layout/interfaces/VitalFooter?id=default)

### **Resources**

- [Logo](/VitalDesignSystem/Components/VitalLayout/Logo)
  - [Logo API Components](/Development/API/@bodiless/vital-layout/interfaces/LogoComponents)
  - [Logo API Token Collection](/Development/API/@bodiless/vital-layout/interfaces/VitalLogo)
- [Header](/VitalDesignSystem/Components/VitalLayout/Header)
  - [Header API Components](/Development/API/@bodiless/vital-layout/interfaces/HeaderComponents)
  - [Header API Token Collection](/Development/API/@bodiless/vital-layout/interfaces/VitalHeader)
- [Footer](/VitalDesignSystem/Components/VitalLayout/Footer)
  - [Footer API Components](/Development/API/@bodiless/vital-layout/interfaces/FooterComponents)
  - [Footer API Token Collection](/Development/API/@bodiless/vital-layout/interfaces/VitalFooter)
  - [CopyrightRow API Components](/Development/API/@bodiless/vital-layout/interfaces/CopyrightRowComponents)
  - [CopyrightRow API Token Collection](/Development/API/@bodiless/vital-layout/interfaces/VitalCopyrightRow)

<!-- tabs:end -->

## 8. Navigation Components

<!-- tabs:start -->
### **Overview**

This step will define the navigation components that appear in the header and footer, breadcrumbs,
and other interior menu components.

### **Guides**

- Implement your site's [Menu](/VitalDesignSystem/Components/VitalNavigation/Menu), [Burger
  Menu](/VitalDesignSystem/Components/VitalNavigation/BurgerMenu), and breadcrumb tokens; and insert
  them into your
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

This step will provide information on how to extend and customize the Vital Flow Container to use
your own components so that the Content Editor has them available to add to the page.

<!-- TODO: Step by step guide -->

### **Resources**

- [Vital FlowContainer](/VitalDesignSystem/Components/VitalFlowContainer)
- [Bodiless FlowContainer](../../../Components/FlowContainer/)

<!-- tabs:end -->

## 10. Generic Page

<!-- tabs:start -->
### **Overview**

This step will provide information on how to extend and customize the Vital Generic Page. Usually,
the Generic Page is a few Flow Container components with no specific structure. You will extend the
Generic Page into specific templates, in a later step, to provide specific structure or components.

### **Guide**

<!-- TODO: Step by step guide -->
- Implement your site's Generic Page template.
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

In this step, you will create the tokens and components that will be useful to combine and create
Complex Organisms. The Vital DS provides many basic components that can be customized to meet your
site requirements and/or you can add additional components.

### **Guide**

<!-- TODO: Step by step guide -->
- Implement the basic organism customization tokens for your site.
  - As you develop each, create a Flow Container token which makes relevant variations of the
    organism available in one or more site Flow Containers, and add to existing Flow Containers.

### **Resources**

- [Accordion](/Components/SingleAccordion)
- [Buttons](/VitalDesignSystem/Components/VitalButtons/)
- [List/CompoundList](/VitalDesignSystem/Components/VitalList)
- [Link](/VitalDesignSystem/Components/VitalLink)
- [Table](/VitalDesignSystem/Components/VitalTable)
- [YouTube](/VitalDesignSystem/Components/VitalYouTube/)

<!-- tabs:end -->

## 12.  Complex Components: Cards & Other Composed Group of Components

<!-- tabs:start -->

### **Overview**

In this step, you will build on Simple Organisms in the previous step and create component
variations to meet site requirements. The Vital DS provides cards that combine Image, Title, Body,
and Call to Action.

<!-- TODO: Step by step Guide -->

### **Resources**

- [Cards](/VitalDesignSystem/Components/VitalCard/)

<!-- tabs:end -->

## 13. Additional Templates

<!-- tabs:start -->
### **Overview**

In this step, you will extend the Generic template to offer additional templates that your site may
need — such as Article, Product Detail Page, Product Listing Page, and other custom templates.

<!-- TODO: Step by step guide -->

<!-- TODO: Find resources -->

<!-- tabs:end -->

## 14. Build out Site-Specific Components that your site may utilize

<!-- tabs:start -->
### **Overview**

If Bodiless/Vital DS doesn't have components, you will want to build out custom components in
`packages/{my-package}/src/components`.

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

The Content Library allows you to save a component with its data to the system, and it can be reused
on other pages.

### **Activation**

- [Enable Content Library](../../../Components/FlowContainer/?id=enable-content-library)

### **Resources**

- [Content Editor: Saving a component](../../../Components/FlowContainer/?id=saving-a-component-in-the-content-library)
- [Content Editor: Unlinking a component](../../../Components/FlowContainer/?id=unlinking-a-component-from-the-content-library)
- [Manual Site Builder: Building Contentful Components without use Content Library](./BuildingComponents/BuildingContentful)

<!-- tabs:end -->

## 16. Meta Components

<!-- tabs:start -->
### **Overview**

This section will provide an overview of how to set up metadata for your site that will improve the
SEO of your site. It will include metadata, favicon, sitemaps, robots, and schemas.

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

While Vital Design Template doesn't come with any analytics automatically activated, some of Vital
Design's components add data to the data analytics layer for Google Analytics 4 (GA4), to help
facilitate tracking.

### **Activation**

- [Google Analytics 4 (GA4) Activation](../../../Components/Analytics/GA4Activation)

### **Resources**

- [Analytics Overview](../../../Components/Analytics/)
- [Analytics with Google Tag Manager (GTM) and Google Analytics 4 (GA4)](../../../Components/Analytics/About_GTM_and_GA4).
- [Using GTM GA4 Data Attributes & Data Layer](../../../Components/Analytics/AddingTracking)

<!-- tabs:end -->

## 18. Integrating Third Party Components

<!-- tabs:start -->
### **Overview**

Third-party components can be integrated into your site. The integration will depend on the
component. Refer to the third-party component documentation.

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

Editable components added to your site during site build will determine what your Content Editor can
interact with and/or edit.

### **Resources**

- [Content Editor Guide](/ContentEditorUserGuide/)

<!-- tabs:end -->
