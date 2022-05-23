# Building a Site

This section describes how to build a site using BodilessJS and the CanvasX Design System. While
this guide specifically uses CanvasX design system, building out custom tokens and components —
instead of utilizing those offered by CanvasX — will work.

## Overview

!> **PLEASE NOTE:** This page is still in-progress; **Steps #1 and #4–18** are _incomplete_ and
**COMING SOON**.

<!-- TODO: When page is complete, convert numbered steps into headers.
           Not worth doing while page is in flux. -->

01. Creating a site:
    - Overview of [Building a Site using Bodiless](./BuildingOverview):
      - Create and initialize a new site repository as described in the [Getting
        Started](/About/GettingStarted) section.
      - Provide overview of monorepo structure.
      - Bodiless Starter Components

01. Defining Typography for the site:  
    This step will define and implement basic elements of the design system (typography, spacing,
    colors).
    01. Before starting, it is best to have a clear understanding of:
        - [Best Practices for Using Tailwind with Bodiless](./Typography/TailwindGuide)
        - [Best Practices Using Custom Fonts](./Typography/Fonts)
    01. [Getting Started Defining Typography](./Typography/Typography)

01. Text Editors:  
    This step will define and implement the basic text editors for your site, which includes a Rich
    Text editor and Plain Text editor. If you have customized your Typography in the previous step,
    you can provide this custom typography to your site's Rich Text editor.
    01. For an step-by-step overview of using, extending or overriding the editors, see [CanvasX
        Editors](/CX_DesignSystem/Components/CX_Editors/).

01. Image Presets:
    - This step is optional, as the [CanvasX Image](/CX_DesignSystem/Components/CX_Image/) presets
      should provide most required functionality. If there are specific image requirements for your
      site, you may want to extend these tokens.

01. Basic Layout / Page:  
    This step will define and implement the general layout of the site. This will include the
    following:
    - Basic structure for the site's Layout
    - Breakpoints for responsiveness
    - Header
    - Footer
    - Helmet
    - Togglers

    For a more in-depth guide on working with the layout, please visit [CanvasX
    Layout](/CX_DesignSystem/Components/CX_Layout/).

01. FlowContainer/Layout Tool:
    - Implement the basic layout editors for the site.
      - `FlowContainer`: Apply standard spacing tokens to create one or more Flow Containers for
        different use cases. Include your Rich Text editor.
    - All the rest of the components will be added to the Flow Container as needed.

01. Generic Page:
    - Implement the site's generic page template.
      - For components which have not yet been implemented, leave them at their defaults for now.
    - `TitleRow`
    - `GenericPage`
      - Use appropriate Flow Containers for the content areas.
      - Use the Layout from the previous step.
    - `Page`
      - Provide your `GenericPage` as the default variation in the `Page` chameleon.

01. Organism tokens/components:
    - Implement the basic organism customization tokens for the site.
      - As you develop each, create a Flow Container token which makes relevant variations of the
        organism available in one or more site Flow Containers, and add to existing Flow Containers.
    - This list includes:
      - [Accordion](/Components/SingleAccordion)
      - [List/CompoundList](/Components/List)
      - [Link](/Components/Link/)
      - [YouTube](/Components/YouTube)
      - Buttons
    <!-- TODO: Update link; page archived. -->
    - If you're exploring an existing site for ideas, or performing a rebuild, review how to
      [identify components and variations](./IdentifyingComponentsGuide) for some useful tips.

01. Multi-language:
      <!-- TODO: Complete bullet when able. -->
    - If your site requires multi-language, we recommend bringing in the i18 package... TBD

01. Cards:
    - Implement a site's card tokens. Use the image, editor, and list, etc. tokens from previous
      steps.
    - Review the variations of the different cards.

01. Navigation Components:
    - Implement a site's menu, burger menu, and breadcrumb tokens; and insert into the header/layout
      and/or generic page template.
    - Implement additional utility menus (often in header).
    - Implement additional side menus (often in articles).
    - Implement additional footer menus.

01. Identify & Build Reusable Content:
    - If your site has content that is reused across the site, it's recommended to have a developer
      build out the component with the default content (image, copy, link) so that it can be easily
      placed multiple times, saving content entry.
    - The most common case here is Cards.

01. Additional Templates:
    - Implement a site's additional page templates such as:
      - Article
      - PDP
      - PLP
      - Custom
        - Homepage often has custom features/components.

01. Address any specific components that are in the Header/Footer/Global:
    - Logo / Favicon branding
    - Header components
    - Footer components

01. Build out Site-Specific Components that your site may utilize, such as:
    - Carousel
    - Bazaarvoice (reviews)
    - Where to Buy
    - Social wall
    - Search
    - Social Share
    - Filtering
    - Custom components

01. Contentful components:
    - [Building Contentful Components](./BuildingComponents/BuildingContentful)

01. Supporting Components:
    - Meta
      - [Metadata](./Meta/Metadata)
      - [Favicon](./Meta/Favicon)
    - GTM
    - HREF
    - GDPR
    - SEO
      - `Sitemap.xml`
      - `Robots.txt`
      - Schemas

01. Content entry
