# Components & Templates that come in the Bodiless starter

Let us discuss a few of these components/templates that are contained within the Bodiless starter:

## Layout

These components consist of the global components

* Header `src/components/Layout/header.tsx`
* Footer `src/components/Layout/footer.tsx`
* Layout `src/components/Layout/index.jsx`
  * This file bring together header & footer into the page layout & composes the
    metadata of the page.

These components work as-is out of the Bodiless starter but you may have to adjust
their tokens (styling) to meet the designs of the site.

### MetaData Component
Within `src/components/Layout/index.jsx` you will find Helmet component that
will manage all of your metadata in the document head.

The starter kit provides the following example:
```
const ExampleHelmet = flowRight(
  asBodilessHelmet('meta'),
  withMeta('pagetype', 'page-type'),
  withMeta('description', 'description'),
  withMeta('bl-brand', 'brand', 'site'),
  withMeta('bl-country', 'country', 'site'),
  withMetaTitle('page-title'),
  withMetaHtml('en'),
)(Helmet);
```
`withMeta`, `withMetaTitle` are HOC's that will obtain the value of data out
json object associated at page level or if specified at site level.

e.g.
- `withMeta('pagetype', 'page-type')` will obtain its value at page level from
  `meta$page-type.json` which contains `{ "content": "Home" }`
- `withMeta('bl-brand', 'brand', 'site')` will obtain its value from
  `src/data/site.meta$brand.json` which contains `{ "content": "BodilessJS" }`

### Site Title & Logo

* This can be configured in `gatsby-config.js` by setting SiteMetaData.

```
  siteMetadata: {
    title: 'BodilessJS Starter',
    logo: '/images/bodiless_logo.png',
  },
```
Note: the mobile logo is defined within `/src/components/Menus/token.tsx` and
doesn't use siteMetaData.

### Site Favicon

* Can be updated in `src/components/Layout/index.jsx` by defining location of
  favicon.

### Addition of other components in the Header & Footer

Often there are other elements in the header/footer and they can be added by
manipulating these files. As you add more components, remember the header and
footer are components that all pages will use, so the data for them should be
stored at site level. This can be done via specifying `nodeCollection="site"`.

e.g.
```
 <Menu nodeKey="MainMenu" nodeCollection="site" />
```

## Menu & Burger Menu

The Bodiless starter comes with menu that is placed in the header. It is menu
that the data is shared site-wide so that all pages use the same menu data. In
addition the burger menu (mobile) menu generates its menu off this desktop
menu's data. For more details, please see
[Menu](/Components/Organisms/MainMenu) &
[Burger Menu](/Components/Organisms/BurgerMenu)

## Editors

The Bodiless starter comes with pre-defined editors that can be changed and/or
extended to meet the site requirements. You will find three rich text editors
defined that are Simple, Basic & FullFeatured.

* Simple : Superscript Only
* Basic : Superscript, Bold, Italic, Underline, Link, Align Text
* Full Featured : adds in more functionality to Basic such as Strikethru, headers, quotes.

We recommend
[refining the editor components](/Components/RichText?id=richtext-component)
needed to meet your site's requirements.

## Images

The images contain simple editable images that are either render linkable or
nonlinkable images and a few variations of image placeholders.

For more information please read [Images](/Components/Image).

## Touts

Most sites use some form of Touts. (A block that consists of Image, Title, Body
and Call to Action) The Bodiless starter comes with this basic form defined in
`src/components/Tout`. These can be used as is and/or extended to meet
the site design requirements. This component has its own set of tokens as well
for its different variations.

## Flow Container

The Flow Container component is a layout component that allows you to select from
a set of components, place them on the page, and resize them.

The Editors, Images & Touts are available as a starting point of components that
can be added to your site via the Flow Container. Additional components as they
are built or extended can be added to allow other components to be added via
FlowContainer. In addition, you can create multiple variations of FlowContainers
to control what components are used in different areas of sites. e.g. A
FlowContainer for a sidebar could have reduced set of components to select from.

For more information, please read [FlowContainer](/Components/FlowContainer).

## Sitemap.xml & Robots.txt file

Following best practices, the site will automatically render the sitemap.xml &
robots.txt file.

## Templates
A default template can be found in `src/templates/_default.jsx` that uses the FlowContainer.