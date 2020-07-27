# Components & Templates that come in the Bodiless starter

Let's discuss a few of these components/templates that are contained within the Bodiless starter:

## Layout

These components consist of the global components

* Header `src/components/Layout/header.tsx`
* Footer `src/components/Layout/footer.tsx`
* Meta `src/components/Layout/meta.tsx`
* Logo `src/components/Layout/logo.tsx`
* Layout `src/components/Layout/index.tsx`
  * This file bring together header & footer into the page layout & composes the
    metadata of the page.

These components work as-is out of the Bodiless starter but site builder may
have to adjust their tokens (styling) to meet the designs of the site.

### MetaData Component

Bodiless provides a set of HOC's which work with react-helmet to place editable
meta-tags in the document HEAD.  A Site Builder can find an example in
`src/components/Layout/meta.tsx`.

For full code, please
[review code](https://github.com/johnsonandjohnson/Bodiless-JS/tree/master/examples/starter/src/components/Layout)

The HOC's used in this file are responsible for both rendering and editing meta-tags:
#### Adding SEO form to Editor interface
The `withMetaForm` provides ab ability to insert a SEO form
within the editor inferface for the site editor to manipulate meta date per
page. 

Besides adding the form, the site builder will also define the fields that the
content editor can see to edit in the page.

#### Adding metatag to the document HEAD

In addition fo defining the form fields, the calls to `withMeta*` also render
the meta-tags to the document head, using data from json objects which were
written by the editor. You can also see defined here some site-level meta-tags
which are not exposed to the editor for modification.

For full information on adding metadata, please read [Meta](TBD)

### Site Title & Logo

* This can be configured in `gatsby-config.js` by setting SiteMetaData.

```
  siteMetadata: {
    title: 'BodilessJS Starter',
    logo: '/images/bodiless_logo.png',
  },
```

Both the desktop menu and mobile burger menu will use the logo defined here.
The footer will use title in the copyright.

Note: This is a vanilla Gatsby pattern and there is nothing unique that Bodiless
is doing with it.

### Site Favicon

* Can be updated in `src/components/Layout/index.jsx` by defining location of
  favicon.

### Addition of other components in the Header & Footer

Often there are other elements in the header/footer and they can be added by
manipulating these files. As site builder adds more components, remember the
header and footer are components that all pages will use, so the data for them
should be stored at site level. This can be done via specifying
`nodeCollection="site"`. For more information, read about
[Data](../..//Development/Architecture/Data).

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
extended to meet the site requirements. The site builder will find three rich text editors
defined that are Simple, Basic & Full Featured.

* Simple : Superscript Only
* Basic : Superscript, Bold, Italic, Underline, Link, Align Text
* Full Featured : adds in more functionality to Basic such as Strikethru, headers, quotes.

Editors can be extended or customized by using the Bodiless Design API to apply
token HOC's which add, remove, replace or style the components which render
different text formatting.

We recommend
[refining the editor components](/Components/RichText?id=richtext-component)
needed to meet the site's requirements.

## Images

The starterkit contain simple editable images that render either linkable or
nonlinkable images and a few variations of image placeholders.

For more information please read [Images](/Components/Image).

## Touts

Most sites use some form of Touts. (A block that consists of Image, Title, Body
and Call to Action) The Bodiless starter comes with this basic form defined in
`src/components/Tout`. These can be used as is and/or extended to meet
the site design requirements. This component has its own set of tokens as well
for its different variations.

## Flow Container

The Flow Container component is a layout component that allows a content editor
to select from a set of components, place them on the page, and resize them.

Site builder can define set of component variations available to be placed in
any particular FlowContainer. The starter kit provides a starting point which
contains the example components described above (Editors, Images and Touts). As
with editors, site builder can use the design api to add, remove, replace or
style these variations. In addition, she can create different FlowContainers to
control what components may be placed in different areas of sites. e.g. A
FlowContainer for a sidebar could have reduced set of components to select from.

For more information, please read [FlowContainer](/Components/FlowContainer).

## Sitemap.xml & Robots.txt file

Following best practices, the site will automatically render the sitemap.xml &
robots.txt file.

## Templates
A default page template using a FlowContainer can be found in
`src/templates/_default.jsx`.
