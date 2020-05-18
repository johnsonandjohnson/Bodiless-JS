# Templates Overview

The site builder can create template that the site pages uses to render the data
in a similar pattern. This is very useful in site building to create similar types of pages.

## Template Benefits:

Using templates provides the following benefits:

* Provide quick way to create similar style/layout of pages.
* It also allows control or governance over what the site editor can
  add, edit and remove from the page.
* It allows site builder to make future changes to all pages built off these
  templates, without editing each individual page.

## Usage of Templates

The templates for the whole site are stored `src/templates` folder.

By default a new page if created via Bodiless, will use `src/templates/_default.jsx` file.  
This file comes as a default in the Bodiless starter site upon creation. 

Usage of the template in Bodiless can be done by creating an `index.json` in the
appropriate /data/pages/ location and specifiying the template's name in the
json file.

```js
  {
    "#template": "TEMPLATE_NAME",
    "#subpage_template": "TEMPLATE_NAME"  // Optional 
  }
```

An example in the `/src/data/pages/products` would use the product listing
template for the current page and product detail template for all sub pages.
```js
  {
    "#template": "product_listing",
    "#subpage_template": "product_detail"
  }
```

## Brief Overview of Templates in Example Test Site

Let's take a look at the Bodiless templates in the Test Site and review each of
these. In the Bodiless Test Site there are currently three types of
[templates](https://github.com/johnsonandjohnson/Bodiless-JS/tree/master/examples/test-site/src/templates)
in use.

* Default: [_default](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/templates/_default.jsx)
  * This provides a simple page with the sites page layout that includes the
    header/footer and a flowContainer to add any component the flowContainer
    supports.
  * The flowContainer area poses no limitation (by default) to what can be added
    here so any components that flowContainer supports can be added.
  * Thus this is a very flexible, free-form page allowing site editor complete control over
    contents of the page.
  * This is part of the starter kit.

* Product Listing Page: [product_listing](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/templates/product_listing.jsx)
  * This is a template that contains:
    * Sites page layout that includes header/footer.
    * editable title.
    * editable image.
    * special flowContainer area that can only add variation of touts that have
    special product features.
    * tagging components to allow product filtering.
  * This page is very restrictive template that site editor can only edit the
    title, change the image, place specific product touts, tag the products and
    create the product filter.
  * This is not part of the starter kit and the template must be manually added to the
    site.
  * Read more about [how to build out the Product Listing page](./PLP.md)      

* Product Detail Page: [product_detail](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/templates/product_detail.jsx)
  * This is a template page that creates a product detail pages with:
    * Sites page layout that includes header/footer.
    * Editable product image.
    * Product details in accordion layout.
    * flowContainer area for touts.
    * Reviews if site uses this feature.
  * This page is also a very restrictive page that forces the site editor to only
    modify Image, Title, Product Details in their accordions and placing of a
    specific product tout.
  * This restrictiveness enforces conformity that all product detail pages are
    similar. It also allows in future, a new component to be added easily to
    template, and apply to all products.
    * If a single product detail page had to deviate from the template, it could
      be copied to the page and modified. 
      * This would break it away from templating as one-off customized product
        detail page.
      * It wouldn't use templating and would have to be maintained in future as
        single product page.
  * This is not part of the starter kit and the template must be manually added
    to the site.
  * Read more about [how to build out the Product Detail page](./PDP.md)

## Governance vs Flexibility

As a site builder creating templates, it is suggested to create templates with
defining what you see is general uniformity and applying flowContainers within
an area to allow flexibility and site editor can add items.

For example, in an article you create two columns (2/3 & 1/3) where left side is
a flowContainer area that can take any component and the right 1/3 sidebar maybe
only takes tout components or Rich Text Editor component. This allows all
articles to have column layouts and enforce uniformity, but what is placed into
those areas is more flexible and controlled by editor.

By contrast, the product detail page above has strict enforcement and doesn't
allow the site editor much variation. It defines the product image placement,
title, and product details only allowing the site editor to modify the content.
They have some flexiblity at the bottom where they can add components in the
flowContainer.
