# Components that come in the Bodiless starter

Lets discuss a few of these that are contained in the Bodiless starter:

## Layout
These components consist of the global components
* Header `src/components/Layout/header.tsx`
* Footer `src/components/Layout/footer.tsx`
* Layout `src/components/Layout/index.jsx`

The Header & Footer components are self-explanatory. The layout composes the metadata of the page with the Header & Footer.  These components work as-is out of the Bodiless starter but may have to have their tokens/styling adjusted to meet the designs of the build.

### Site Title & Logo
* This can be configured in `gatsby-config.js` by setting SiteMetaData.
```
  siteMetadata: {
    title: 'BodilessJS Starter',
    logo: '/images/bodiless_logo.png',
  },
```

### Site Favicon
* Can be updated in `src/components/Layout/index.jsx` by defining location of favicon.

### Other components in Global Header & Footer Menu

Often there are other elements in the header that can be added by manipulating these files.  By default the menu is in the header.
This header & footer is components that all pages use.  The data for them should be stored at site wide vs page wide, so that every page reflects the same data. 
```
<DesktopMenu nodeKey="MainMenu" nodeCollection="site" />
<MobileMenu nodeKey="MainMenu" nodeCollection="site" />
```
The nodeCollection is specified to save at site level so its global data.

#### Menu & Burger Menu
The Bodiless starter comes with menu that is placed in the header.  It is menu that the data is shared site-wide so that all pages use the same menu data.  In addition the burger menu (mobile) menu generates its menu off this desktop menu's data. 
For more details, please see [Menu](#/bodiless/Components/Organisms/MainMenu) & [Burger Menu](#/bodiless/Components/Organisms/BurgerMenu)

## Editors
The Bodiless starter comes with pre-defined editors that can be changed and/or extended to meet the site requirements. You will find three rich text editors defined that are Simple, Basic & FullFeatured.
* Simple : Superscript Only
* Basic : Superscript, Bold, Italic, Underline, Link, Align Text
* Full Featured : adds in more functionality to Basic such as Strikethru, headers, quotes.

We recommend [refining the editor components](Development/BuildingSites/RichTextEditors.md) needed for meet your site's requirements. 

## Images
The images contain simple editable images that are either render linkable or nonlinkable images and a few variations of image placeholders. 

## Touts
Most sites use some form of Touts. (A block that consists of Image, Title, Body and Call to Action) The Bodiless starter comes with this basic form defined in `src/components/Tout`. Again, these can be used as is and/or extended to meet the site design requirements.  This Component has its own set of tokens as well for its different variations. 

## Sitemap.xml & Robots.txt file
Following best practices, the site will automatically render the sitemap.xml & robots.txt file.
For more details, please see activation documentation for [Robots.txt](#/Components/Robots/RobotsTxt) & [Sitemap.xml](#/Components/Sitemap/SitemapXml)
