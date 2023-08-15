# Meta Component

Metadata is used by search engines (such as Google) to understand information about a webpage.
Search engines can use this information for ranking purposes or to display snippets in search
results. Bodiless provides a set of HOCs which work with [React
Helmet](https://github.com/nfl/react-helmet#readme ':target=_blank') to manage and dynamically set
meta tags in the document head, allowing you to ensure that your pages' search engine result pages
are as effective as possible.

## Content Editor Details

As a Content Editor, to configure SEO metadata for your site and its pages, a Site Builder will had
to have [added an SEO form to the Editor Interface](#add-seo-form-to-editor-interface). Assuming a
Site Builder has followed the provided instructions, the steps to manage metadata on a page should
resemble the following:

01. While in [Edit Mode](/ContentEditorUserGuide/#edit-mode), (from the
    [Toolbar](/ContentEditorUserGuide/#toolbar)) click **Page > SEO** to open the _SEO Data
    Management_ form.  
    ![SEO Data Management Form](./assets/SeoDataManagementForm.jpg ':size=50%')
01. Provide values for the fields in the form, and click the checkmark to confirm.
    - The _Title_ and _Description_ fields in the screenshot above are examples of meta tag fields
      you might see in the form.

## Site Builder Details

As a Site Builder, you can add metadata to a page's head, and make it editable for Content
Editors by providing an SEO form in the editor interface.

You can find a few examples of how to place editable and static metadata into a site's head section
in the [Test Site](../Development/LocalSites/#example-sites).  
See the code here:
[`sites/test-site/src/components/Layout/meta.tsx`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/sites/test-site/src/components/Layout/meta.tsx
':target=_blank')

### Activate Meta Tags

01. Where applicable, update the Helmet components as needed (e.g., you may have created a Layout
    component (`components/Layout/index.jsx`)).
    ```js
    import Helmet from 'react-helmet';
    import {
      withMeta, withMetaTitle, withMetaHtml, asBodilessHelmet,
    } from '@bodiless/components';
    import flowRight from 'lodash/flowRight';

    const ExampleHelmet = flowRight(
      asBodilessHelmet('meta'),
      withMeta('description', 'description'),
      withMetaTitle('page-title'),
      withMetaHtml('en'),
    )(Helmet);
    ```
01. Add with rendering of layout `<ExampleHelmet />`.
01. Individual pages use these JSON data files (stored in `src/data/pages/NAMEOFPAGE`):
    - `meta$description.json`
    - `meta$page-title.json`
    - E.g.:
      ```json
      {
        "content": "Applicable Content"
      }
      ```

### Add SEO Form to Editor Interface

The `withMetaForm` provides the ability to insert an SEO form within the editor interface for
Content Editors to manipulate metadata per page.

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
          description: 'Enter the page level data used for SEO ...',
        };
        ```
01. Then, apply this HOC to the Helmet component:
    ```js
    const SeoHelmet = withMetaForm(useMenuOptions, seoFormHeader)(Helmet);
    ```

### Add Metadata Fields to SEO Form

After [adding an SEO form to the editor interface](#add-seo-form-to-editor-interface), define the
form fields so Content Editors can update the content of the metadata displayed in the head section
of each page.  
For example, to add an editable meta description field:

01. Import `withMeta` from `@bodiless/components`.
01. Create a HOC `withMetaPageDescription`, with meta field name `description`, form field label
    `Description`, and placeholder text.  
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

In addition to defining the form fields, the calls to `withMeta*` also render the meta tags to the
page document head using data from the JSON files which were written by the editor.

The recommendation is that Content Editors can set the metadata per page, but the site-level meta is
not exposed to Content Editors for modification. The reason being that the site-level metadata is
set once per site on the site-build and changes very infrequently to never, so there is little need
to allow Content Editors to change this data.

#### Expected Behavior of Metadata

| Edit      | Preview   | Static HTML Site |
| --------- | --------- | ---------------- |
| Generated | Generated | Generated        |
