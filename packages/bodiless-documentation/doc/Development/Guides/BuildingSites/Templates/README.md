# Templates Overview

The site builder can create templates that the site pages use to render the data
in a similar layout/pattern. Using templates makes the site building and editing process
more efficient.

## Template Benefits

Using templates provides the following benefits:

* Provide quick way to create similar style or layout of pages.
* It also allows control or governance over what the site editor can
  add, edit, and remove from the page.
* It allows site builder to make future changes to all pages built off these
  templates, without editing each individual page.

## Usage of Templates

The templates for the entire site are stored in the `src/templates` folder.

By default a new page, if created via Bodiless admin editor, will use
`src/templates/_default.jsx` file. This file comes as a default in the Bodiless
starter site upon creation. This default template can be customized as needed per
site.

Usage of the template in Bodiless site can be done by creating an `index.json`
in the appropriate /data/pages/ location and specifiying the template's name in
the json file.

```js
  {
    "#template": "TEMPLATE_NAME",
    "#subpage_template": "TEMPLATE_NAME"  // Optional
  }
```

An example using both the template and subpage templates could be done in the `/src/data/pages/products`.
eg.  An `index.json` file with the following content: 
```js
  {
    "#template": "product_listing",
    "#subpage_template": "product_detail"
  }
```
the page at url path "/products", would use the product listing page templates
and the sub pages would use the product detail template. This would require two templates created in the `src/templates` with the names `product_listing.jsx` and `product_detail.jsx`. We will provide these examples in the next sections of this guide.

## Brief Overview of Templates in Examples/Test-Site

Let's take a look at the Bodiless templates in the Examples/Test-Site and review each of
these. In the Bodiless Test Site there are currently three types of
[templates](https://github.com/johnsonandjohnson/Bodiless-JS/tree/master/examples/test-site/src/templates)
in use.

* **Default:**
  * View [code of _default template](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/templates/_default.jsx).
  * This provides a simple page with the sites page layout that includes:
    * ![Default template screenshot](/assets/default.jpg ':size=400')
    * Site's page layout that includes header/footer.
    * A default flowContainer to add any component the flowContainer supports.
  * The default flowContainer area poses no limitations to what can be added,
    so any components that flowContainer supports can be chosen.
  * Thus this is a very flexible, free-form page allowing site editors complete control over
    the contents of the page.
  * This template is part of the starter kit as well.

* **Product Listing Page:**
  * View [code of product_listing template](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/templates/product_listing.jsx).
  * This is a template that contains:
    * ![PLP screenshot](/assets/plp.jpg ':size=400')
    * Sites page layout that includes header/footer.
    * An editable title.
    * An editable image.
    * A special flowContainer area that can only add variation of cards that
      have special product features.
      * [View code of specific type of Flowcontainer](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/components/ProductListing/ProductListingFlowContainer.tsx).
    * Tagging components to allow product filtering.
      * [View code of filtering component](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/components/FilterByGroup/index.tsx).
  * This page is very restrictive template that site editor can only:
    * Edit the title.
    * Change the header image.
    * Place specific product cards.
    * Create the product filter.
    * Tag the products.
  * This is not part of the starter kit and the template must be manually added to the
    site.
  * Read more about [how to build out the Product Listing page](./Types/ProductListingPage.md)

* **Product Detail Page:**
  * View [code of product_detail template](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/templates/product_detail.jsx).
  * This is a template page that creates a product detail pages with:
    * ![PDP screenshot](/assets/pdp.jpg ':size=400')  
    * Sites page layout that includes header/footer.
    * Editable product image.
    * Product details in accordion layout.
    * flowContainer area for cards.
    * Reviews if site uses this feature.
  * This page is also a very restrictive page that only allows the site editor to:
    * Modify Image.
    * Edit Title.
    * Edit product details in their accordions.
    * Placing of a specific product card.
  * This restrictiveness enforces conformity that all product detail pages are
    similar in nature. It also allows, in future, a new component to be added easily to
    template, and apply to all the products.
    * If a single product detail page has to deviate from the template, the template could
      be copied to the page's `index.tsx` and modified.
      * This would break it away from templating as a one-off customized product
        detail page.
      * It wouldn't use templating any more and would have to be maintained in
        future as single product page which could have its drawbacks.
  * This is not part of the starter kit and the template must be manually added
    to the site.
  * Read more about [how to build out the Product Detail page](./Types/ProductDetailPage.md)

## Governance vs Flexibility of Templates

As a site builder creating templates, it is suggested to create templates with
defining items that need to have general uniformity and applying flowContainers within
areas to allow flexibility to the site editor.

The default template example above offers no governance and is a very flexible page
for the site builder.  

By contrast, the product detail page above has strict enforcement and doesn't
allow the site editor much variation at all. It defines the product image
placement, title, and product detail headers - only allowing the site editor to
modify the content. They have some flexiblity at the bottom where they can add
different card components in the flowContainer area but its still restrictive.
This allows quick product addition by site editor, as they
only have to enter in the specific production information.

Let's use example of article to create a template with some governance but still
a lot of flexiblity. A template could be created that has two columns (2/3 & 1/3)
where left side is a flowContainer area that can take any component and the
right 1/3 sidebar may only take card components or Rich Text Editor components.
This allows all articles to have column layouts and enforce uniformity, but what
is placed into those areas is more flexible and controlled by editor. In the
sidebar though you limit to components that fit nicely into 1/3 width space.
This offers flexibility but keeps the articles using this
template in the layout of two columns without being two restrictive.

The site builder as they design the templates can choose the following:
* Layout of the template.
* Components preplaced on template.
* Where FlowContainers reside allowing a flexible area of the template.
* Different variations of FlowContainers that control what components could be
  added to area.
