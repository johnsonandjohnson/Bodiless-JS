@jones if anything was linking we should direct them to correct page..
I purged all the irrevalent that should find another home.   I think 

# MetaData Component

Bodiless provides a set of HOC's which work with react-helmet to place editable
meta-tags in the document HEAD.  A Site Builder can find examples of adding editable or
non-editable (static) meta data into head section from
`src/components/Layout/meta.tsx`.

For full code, please
[review code](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/examples/starter/src/components/Layout/meta.tsx).

See below for instructions on how to add meta data to a page's head and make it editable for site
editors.

- ## Adding SEO form to Editor interface
  The `withMetaForm` provides ability to insert a SEO form
within the editor interface for the site editor to manipulate meta data per
page.

  First, import `withMetaForm` from @bodiless/components package:
  ```
  import withMetaForm from @bodiless/components;
  ```
  `withMetaForm` takes 2 parameters:
  1. `useMenuOptions`: defines SEO form menu button appearance.
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
  const SeoHelmet = withMetaForm(useMenuOptions, seoFormHeader)(Helmet);
  ```

- ## Adding Meta Data Fields to Editor interface
  Next, define the form fields so site editor can update content of meta data displayed
  on the head section of each page. For example, to add editable meta description field:
  1. Import withMeta from '@bodiless/components'.
  1. Create HOC withMetaPageDescription with meta field name `description`, form
     field label `Description` and a placeholder text. e.g.:
      ```
      const withMetaPageDescription = withMeta({
        name: 'description',
        useFormElement: () => useMenuOptionUI().ComponentFormTextArea,
        label: 'Description',
        placeholder: 'Rec < 160 char',
      });
      ```
      ***useFormElement*** provides a function that returns a UI input component
      (e.g. "ComponentFormText", "ComponentFormTextArea", etc.).

  To apply this field to the meta form previously created, you can use flowRight:
  ``` 
  const SeoHelmet = flowRight(
    withMetaForm(useMenuOptions, seoFormHeader),
    asBodilessHelmet('meta'),
    withMetaPageDescription('description', ''),
  )(Helmet);
  ```
  ***asBodilessHelmet*** HOC specifies `meta` as nodeKey for server side
  storage, and the description content will be saved in data file named
  `meta$description.json`.
- #### Meta Data Rendering
  In addition to defining the form fields, the calls to `withMeta*` also render
  the meta-tags to the page document head, using data from the json files which were
  written by the editor. 
  
  The recommendation is the content editor can set the meta data per page, but the
  site-level meta is not exposed to content editor for modification. The reason being the
  site-level meta data is set once per site on the site build and changes very infrequently
  to never, so there is little need to allow a content editor to change this data.
