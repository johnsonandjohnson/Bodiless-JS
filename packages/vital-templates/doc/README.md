# Vital Templates Overview

The Site Builder can create templates that the site pages use to render the data in a similar
layout/pattern. Using templates makes the site building and editing process more efficient.

## Template Benefits

Using templates provides the following benefits:

* A quick way to create similar style or layout of pages.
* It allows control or governance over what the Content Editor can add, edit, and remove from the
  page.
* It allows the Site Builder to make future changes to all pages built off these templates, without
  editing each individual page.

## Brief Overview of Templates in the Vital Design System

* [Generic Template](./Generic): A basic page with three slots for content and one for breadcrumbs.

## Governance vs Flexibility of Templates

As a Site Builder, you can create templates with defined items to allow general uniformity, and with
Flow Containers within areas to allow flexibility to the Content Editor.

![Default Template](../assets/default.jpg)

The default template example above offers no governance and is a very flexible page for the Site
Builder.

Let's use an example of an article to create a template with some governance, but still a lot of
flexibility. A template could be created that has two columns (two-thirds and one-third), where the
left side is a Flow Container area that can take any component, and the right-one-third sidebar may
only take card components or Rich Text Editor components. This allows all articles to have column
layouts and enforce uniformity, but what is placed into those areas is more flexible and controlled
by the editor. In the sidebar, though, you're limited to components that fit nicely into
one-third-width space. This offers flexibility, but keeps the articles using this template in the
layout of two columns without being too restrictive.

As they design templates, Site Builders can choose the following:

* The Layout of the template.
* To add pre-placed components on the template.
* Where to place Flow Containers, allowing flexible areas in the template.
* Different variations of Flow Containers that control what components could be added to an area.

## Content Editor Details

When you create a new page, it will create the new page using the default template.

### Change Template

![Template icon](../assets/PageTemplateIcon.jpg ':size=60')

To switch the template that a page is using:

01. Navigate to the page for which you'd like to change the template.
01. From the [Toolbar](/ContentEditorUserGuide/#toolbar), click **Page > Template** to open the
    _Choose a template for this page_ form.  
    !["Choose a template for this page" form](../assets/PageChooseTemplate.jpg ':size=50%')
01. Select the radio button of the template you'd like to switch to, and click the checkmark to
    confirm.
01. The page template should automatically update.

## Site Builder Details

As a Site Builder, you can use a Gatsby template within your site and place the created template
components directly within the template.

The Vital Design System offers an alternative method to using Gatsby templates that allows Content
Editors a choice to quickly switch a page between templates. A generic Page component is placed in
the site's Gatsby `_default` template file, and this component offers individual template/layout
components to choose from. Each of these template/layout components is a component that renders the
pages' contents in its specific requirements.

You can override templates via shadowing or extending; see below for instructions on [customizing
templates without shadowing](#customize-without-shadowing).

### Customize Without Shadowing

The list of available templates in the _Choose a template for this page_ form is configurable via
the
[`vitalPage`](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/packages/vital-templates/src/components/Page
':target=_blank') Component.

01. First, create a Page token defining what templates and their tokens should apply to a page
    option, and export as necessary.
    ```js
    const Default = asFluidToken({
      ...vitalPage.Default,
      Components: {
        _default: on(GenericTemplateClean)(vitalGenericTemplate.Default),
        PDP: on(PDPClean)(vitalPDP.Default),
        PLP: on(PLPClean)(vitalPLP.Default),
      },
    });

    export default {
      ...vitalPage,
      Default,
    };
    ```
01. Within the `_default.jsx` file in the `sites/SITE-NAME/src/templates` directory, the `_default`
    template will then call the page component created from the previous step. This will replace the
    Gatsby `_default` content with the page template component and editor functionality, to allow
    the Content Editor to switch between template components.
    ```js
    const DefaultPage = as(__vital__Page.Default)(Fragment);

    export default DefaultPage;
    ```
