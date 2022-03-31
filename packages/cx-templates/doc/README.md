# CanvasX Templates Overview

The Site Builder can create templates that the site pages use to render the data in a similar
layout/pattern. Using templates makes the site building and editing process more efficient.

## Template Benefits

Using templates provides the following benefits:

* A quick way to create similar style or layout of pages.
* It allows control or governance over what the Content Editor can add, edit, and remove from the
  page.
* It allows Site Builder to make future changes to all pages built off these templates, without
  editing each individual page.

## Usage of Templates

The templates for the entire site are stored in the `src/templates` folder.

By default, a new page, if created via Bodiless admin editor, will use the
`src/templates/_default.jsx` file. This file comes as a default in the Bodiless Starter Site upon
creation. This default template can be customized as needed per site.

Usage of the template in Bodiless site can be done by creating an `index.json` file in the
appropriate `/data/pages/` location, and specifying the template's name in the JSON file.

```js
{
  "#template": "TEMPLATE_NAME",
  "#subpage_template": "TEMPLATE_NAME"  // Optional
}
```

An example using both the template and sub-page templates could be done in the
`/src/data/pages/products`.  
E.g., an `index.json` file with the following content:

```js
{
  "#template": "product_listing",
  "#subpage_template": "product_detail"
}
```

The page at URL path "/products", would use the Product Listing Page templates, and the sub-pages
would use the Product Detail Page template. This would require two templates created in the
`src/templates` directory with the names `product_listing.jsx` and `product_detail.jsx`. We will
provide these examples in the next sections of this guide.

?> When using TypeScript, the `.tsx` file extension is also supported.

## Brief Overview of Templates in the Test Site

Let's take a look at the Bodiless templates in the Test Site, and review each of them. In the
Bodiless Test Site, there are currently three types of
[templates](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/sites/test-site/src/templates)
in use.

### Default

* View [code of `_default`
  template](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/sites/test-site/src/templates/_default.jsx).
* This provides a simple page with the site's page layout that includes:  
  ![Default template screenshot](../assets/default.jpg ':size=400')
  * Site's page layout that includes header/footer.
  * A default Flow Container to add any component the Flow Container supports.
* The default Flow Container area poses no limitations to what can be added, so any components that
  Flow Container supports can be chosen.
* Thus, this is a very flexible, free-form page allowing Content Editors complete control over the
  contents of the page.
* This template is part of the Starter Kit as well.

### Product Listing Page

* View [code of `product_listing`
  template](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/sites/test-site/src/templates/product_listing.jsx).
* This is a template that contains:  
  ![PLP screenshot](../assets/plp.jpg ':size=400')
  * Site's page layout that includes header/footer.
  * An editable title.
  * An editable image.
  * A special Flow Container area that can only add variations of cards that have special product
    features.
    * [View code of specific type of Flow Container](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/sites/test-site/src/components/ProductListing/ProductListingFlowContainer.tsx).
  * Tagging components to allow product filtering.
    * [View code of filtering component](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/sites/test-site/src/components/FilterByGroup/index.tsx).
* This page is a very restrictive template where the Content Editor can only:
  * Edit the title.
  * Change the header image.
  * Place specific product cards.
  * Create the product filter.
  * Tag the products.
* This is not part of the Starter Kit, and the template must be manually added to your site.
* Read more about [how to build out the Product Listing Page](./ProductListingPage.md).

### Product Detail Page

* View [code of `product_detail` template](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/sites/test-site/src/templates/product_detail.jsx).
* This is a template page that creates a product detail page with:  
  ![PDP screenshot](../assets/pdp.jpg ':size=400')  
  * Site's page layout that includes header/footer.
  * Editable product image.
  * Product details in accordion layout.
  * Flow Container area for cards.
  * Reviews, if site uses this feature.
* This page is also a very restrictive page that only allows the Content Editor to:
  * Modify the image.
  * Edit the title.
  * Edit product details in their accordions.
  * Edit the placing of a specific product card.
* This restrictiveness enforces conformity that all product detail pages are similar in nature. It
  also allows, in the future, a new component to be added easily to the template, and applied to all
  the products.
  * If a single product detail page has to deviate from the template, the template could be copied
    to the page's `index.tsx` file and modified.
    * This would break it away from it being templated as a one-off customized product detail page.
    * It wouldn't use templating anymore, and would have to be maintained in the future as a single
      product page, which could have its drawbacks.
* This is not part of the Starter Kit, and the template must be manually added to your site.
* Read more about [how to build out the Product Detail Page](./ProductDetailPage.md).

## Governance vs Flexibility of Templates

As a Site Builder, you can create templates with defined items to allow general uniformity, and with
Flow Containers within areas to allow flexibility to the Content Editor.

The default template example above offers no governance and is a very flexible page for the Site
Builder.

By contrast, the Product Detail Page above has strict enforcement and doesn't allow the Content
Editor much variation at all. It defines the product image placement, title, and product detail
headers — only allowing the Content Editor to modify the content. They have some flexibility at the
bottom, where they can add different card components in the Flow Container area, but it's still
restrictive. This allows quick product additions by Content Editor, as they only have to enter in
the specific production information.

Let's use an example of an article to create a template with some governance, but still a lot of
flexibility. A template could be created that has two columns (⅔ and ⅓), where the left side is a
Flow Container area that can take any component, and the right-⅓ sidebar may only take card
components or Rich Text Editor components. This allows all articles to have column layouts and
enforce uniformity, but what is placed into those areas is more flexible and controlled by the
editor. In the sidebar, though, you're limited to components that fit nicely into ⅓-width space.
This offers flexibility, but keeps the articles using this template in the layout of two columns
without being too restrictive.

As they design templates, Site Builders can choose the following:

* The Layout of the template.
* To add pre-placed components on the template.
* Where to place Flow Containers, allowing flexible areas in the template.
* Different variations of Flow Containers that control what components could be added to an area.
