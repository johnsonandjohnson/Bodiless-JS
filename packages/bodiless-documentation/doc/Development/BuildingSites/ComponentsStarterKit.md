# Components that come in the Starter Kit

## Components that come in the Starter Kit
Lets discuss a few of these that are contained in the starter-kit:

### Layout
These components consist of the global components
* Header `src/components/Layout/header.tsx`
* Footer `src/components/Layout/footer.tsx`
* Layout `src/components/Layout/index.jsx`

The Header & Footer components are self-explanatory. The layout composes the metadata of the page with the Header & Footer.  These components work as-is out of the bodiless starter but may have to have their tokens/styling adjusted to meet the designs of the build.

#### Site Title & Logo
* This can be configured in `gatsby-config.js` by setting SiteMetaData.
```
  siteMetadata: {
    title: 'BodilessJS Starter',
    logo: '/images/bodiless_logo.png',
  },
```

#### Site Favicon
* Can be updated in `src/components/Layout/index.jsx` by defining location of favicon.

#### Other components in Global Header & Footer Menu

Often there are other elements in the header that can be added by manipulating these files. We have a [Menu](https://johnsonandjohnson.github.io/Bodiless-JS/#/Components/Organisms/Menu) & [Burger Menu](https://johnsonandjohnson.github.io/Bodiless-JS/#/Components/Organisms/BurgerMenu) (mobile) component that can be added. [See the test site for example of this usage.](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/components/Layout/header.tsx)

### Editors
The starter kit comes with pre-defined that can be changed and/or extended to meet the site requirements. You will find three rich text editors defined that are Simple, Basic & FullFeatured.
* Simple : Superscript Only
* Basic : Superscript, Bold, Italic, Underline, Link, Align Text
* Full Featured : adds in more functionality to Basic such as Strikethru, headers, quotes.

We recommend [refining the editor components](Development/BuildingSites/RichTextEditors.md) needed for meet your site's requirements. 

### Touts
Most sites use some form of Touts. (A block that consists of Image, Title, Body and Call to Action) The bodiless start comes with this basic form defined in `src/components/Tout`. Again, these can be used as is and/or extended to meet the site design requirements.  This Component has its own set of tokens as well for its different variations. 
