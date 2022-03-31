# Metadata Component

Bodiless provides a set of HOCs which work with [React
Helmet](https://github.com/nfl/react-helmet#readme) to place editable meta-tags in the document
`head`. Site Builders can find a few examples on how to place editable and static metadata into a
site's head section at
[`src/components/Layout/meta.tsx`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/sites/test-site/src/components/Layout/meta.tsx).

See below for instructions on how to add metadata to a page's head and make it editable for Content
Editors.

## Add SEO Form to Editor Interface

The `withMetaForm` provides the ability to insert an SEO form within the editor interface for the
Content Editor to manipulate metadata per page.

01. First, import `withMetaForm` from the `@bodiless/components` package:

    ```js
    import withMetaForm from @bodiless/components;
    ```

01. Prepare your arguments; `withMetaForm` takes 2 parameters:

    01. `useMenuOptions`: Defines SEO form menu button appearance.

        ```js
        const useMenuOptions = () => [
          {
            name: 'seo',                     // Menu item name
            isHidden: () => !context.isEdit, // Hide the button in preview mode
            icon: 'category',                // Button icon
            label: 'SEO',                    // Button label
            group: 'page-group',             // Name of a group to which this option belongs
          },
        ];
        ```

    01. `seoFormHeader`: [Optional] Defines SEO form title and description for users.

        ```js
        const seoFormHeader = {
          title: 'SEO Data form',
          description: `Enter the page level data used for SEO ...`
        };
        ```

01. Then, apply this HOC to the Helmet component:

    ```js
    const SeoHelmet = withMetaForm(useMenuOptions, seoFormHeader)(Helmet);
    ```

## Add Metadata Fields to Editor Interface

Next, define the form fields so the Content Editor can update the content of the metadata displayed
in the head section of each page.  
For example, to add an editable meta description field:

01. Import `withMeta` from `@bodiless/components`.
01. Create an HOC `withMetaPageDescription`, with meta field name `description`, form
    field label `Description`, and placeholder text.  
    For example:

    ```js
    import { withMeta } from '@bodiless/components';
    import { useMenuOptionUI } from '@bodiless/core';

    const withMetaPageDescription = withMeta({
      name: 'description',
      useFormElement: () => useMenuOptionUI().ComponentFormTextArea,
      label: 'Description',
      placeholder: 'Rec < 160 char',
    });
    ```

    `useFormElement` accepts a function that returns a UI input component (e.g.,
    `ComponentFormText`, `ComponentFormTextArea`, etc.).

01. To apply this field to the meta form previously created, you can use `flowRight`:

    ``` js
    const SeoHelmet = flowRight(
      withMetaForm(useMenuOptions, seoFormHeader),
      asBodilessHelmet('meta'),
      withMetaPageDescription('description', ''),
    )(Helmet);
    ```

    `asBodilessHelmet` HOC specifies `meta` as a nodeKey for server-side storage, and the
    description content will be saved in a data file named `meta$description.json`.

### Metadata Rendering

In addition to defining the form fields, the calls to `withMeta*` also render the meta-tags to the
page document head, using data from the JSON files which were written by the editor.

The recommendation is the Content Editor can set the metadata per page, but the site-level meta is
not exposed to Content Editor for modification. The reason being the site-level metadata is set once
per site on the site build and changes very infrequently to never, so there is little need to allow
a Content Editor to change this data.
