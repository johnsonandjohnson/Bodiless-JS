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
meta-tags in the document HEAD.  A Site Builder can find examples of adding editable or 
non-editable (static) meta data into head section from
`src/components/Layout/meta.tsx`.

For full code, please
[review code](https://github.com/johnsonandjohnson/Bodiless-JS/tree/master/examples/starter/src/components/Layout/meta.tsx).

See below for instructions on how to add meta data to a page's head and make it editable for site 
editors.

- #### Adding SEO form to Editor interface
  The `withMetaForm` provides ability to insert a SEO form
within the editor interface for the site editor to manipulate meta data per
page.

  First, import `withMetaForm` from @bodiless/components package:
  ```
  import withMetaForm from @bodiless/components;
  ```
  `withMetaForm` takes 2 parameters:
  1. `useGetMenuOptions`: defines SEO form menu button appearance. 
      ```
      {
        name: 'seo',                     // Menu item name
        isHidden: () => !context.isEdit, // Hidden the button in preview mode
        icon: 'category',                // Button icon
        label: 'SEO',                    // Button label
      },
      ```
  1. `seoFormHeader`: [Optional] defines SEO form title and description for users.
      ```
      {
        title: 'SEO Data form',
        description: `Enter the page level data used for SEO ...`
      };
      ```
  Then, apply this HOC to Helmet component:
  ```
  const SeoHelmet = withMetaForm(useGetMenuOptions, seoFormHeader)(Helmet);
  ```
- #### Adding Meta Data Fields to Editor interface
  Next, define the form fields so site editor can update content of meta data displayed 
  on the head section of each page. For example, to add editable meta description field:
  1. Import withMeta from '@bodiless/components'.
  1. Create HOC withMetaPageDescription with meta field name `description`, form field label `Description` and a placeholder text.
  e.g.:
      ```
      const withMetaPageDescription = withMeta({
        name: 'description',
        useFormElement: () => useMenuOptionUI().ComponentFormTextArea,
        label: 'Description',
        placeholder: 'Rec < 160 char',
      });
      ```
  ***useFormElement*** provides a function that returns a UI input component (e.g. "ComponentFormText", "ComponentFormTextArea", etc.).

  To apply this field to the meta form previously created, you can use flowRight:
  ``` 
  const SeoHelmet = flowRight(
    withMetaForm(useGetMenuOptions, seoFormHeader),
    asBodilessHelmet('meta'),
    withMetaPageDescription('description', ''),
  )(Helmet);
  ```
  ***asBodilessHelmet*** HOC specifies `meta` as nodeKey for server side storage, and the description content will be saved in data file named `meta$description.json`.
- #### Meta Data Rendering
  In addition to defining the form fields, the calls to `withMeta*` also render
  the meta-tags to the page document head, using data from the json files which were
  written by the editor. 
  
  The recommendation is the content editor can set the meta data per page, but the 
  site-level meta is not exposed to content editor for modification. The reason being the 
  site-level meta data is set once per site on the site build and changes very infrequently 
  to never, so there is little need to allow a content editor to change this data.

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
