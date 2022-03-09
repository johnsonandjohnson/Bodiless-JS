# Building a Site

This section describes the building of a site with BodilessJS, and using the CanvasX design system
and CanvasX. While this is explicit for using the two together, building out custom tokens and
components — instead of utilizing those offered by CanvasX — will work.

## Overview

!> **PLEASE NOTE:** This page is still in-progress; **Steps #1 and #4–18** are _incomplete_ and
**COMING SOON**.

01. Create site:
    - Overview of [Building a Site using Bodiless](./BuildingOverview):
      - Create and initialize a new site repository as described in the documentation for [Getting
        Started](/About/GettingStarted).
      - Provide overview of monorepo structure.
      - [Bodiless Starter Components](./ComponentsStarterKit)

01. Define Typography for the site:  
    This step will define and implement basic elements of the design system (typography, spacing,
    colors).
    01. Before starting, it is best to have a clear understanding of [Using Tailwind with
        Bodiless](./TypographySetup/TailwindGuide).
    01. [Defining Typography](./TypographySetup/Typography)
    01. [Using Custom Fonts](./TypographySetup/Fonts)

01. Text Editors:
    - Implement the basic text editors for the site, which includes a Rich Text editor and Plain Text
      editor.
      - For an overview of implementing the editors, see [CanvasX
        Editors](/Components/Editors/CX_Editors/).
      - `RichText`: Use tokens from `cx-Elements` to define available text styling options.
        - See: [CX Rich Text Editor Component : Site Builder
          Details](/Components/Editors/CX_Editors/CX_RTE_Editor#site-builder-details)
      - `EditorPlain`: If your brand/site's font(s) require a superscript ® (registered trademark)
        symbol, implement a version of the plain text editor which applies this CX token.
        - See: [CX Plain Text Editor Component : Site Builder
          Details](/Components/Editors/CX_Editors/CX_PlainEditor#site-builder-details)

01. FlowContainer/Layout Tool:
    - Implement the basic layout editors for the site.
      - `FlowContainer`: Apply standard spacing tokens to create one or more Flow Containers for
        different use cases. Include your Rich Text editor.
    - All the rest of the components will be added to the Flow Container as needed.

01. Image Presets:
    - Implement the basic image editors/presets for your site. In most cases, you can simply reuse
      one or more of the default tokens available in CanvasX.

01. Basic Layout / Page:
    - Implement the site's basic page structure.
    - Set up [responsiveness](./Responsiveness) (width of site/breakpoints, etc.).
    - We recommend leaving most of the design elements as their CanvasX defaults for now.
    - Utilize placeholders, keep styling limited to how the 'blocks' render in the component, and
      ignore what renders.
    - The end goal of the build will to be to replace brand-requirement working versions of:
      - Logo
      - Header and components in the Header
      - Footer and components in the Footer
      - Layout and components in the Layout

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
    - GTM
    - HREF
    - GDPR
    - SEO
      - `Sitemap.xml`
      - `Robots.txt`
      - Schemas

01. Content entry
