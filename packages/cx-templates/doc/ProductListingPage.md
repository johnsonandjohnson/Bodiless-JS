# Product Listing Page Template

The [Product Listing
Page](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/sites/test-site/src/templates/product_listing.jsx)
template is a very opinionated version of a product listing page. It can easily be changed or
re-designed to meet your site requirements.

![PLP screenshot](../assets/plp.jpg "PLP screenshot")

## Overview

The Product Detail Page has the following components:

* Page Title (Rich Text Editor component)
* Header Image (Image component)
* Product Filter (custom FilterByGroup Component)
  * This is an HOC that renders a Product Filter on the left, and a taggable Product Flow Container
    on the right.
  * The Flow Container on the right component allows the addition of customized product-taggable
    cards.

## Usage

01. The [Product Listing
    Page](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/sites/test-site/src/templates/product_listing.jsx)
    template can be copied into your `src/templates` folder and customized.

01. The additional components it uses should also be imported, copied, and styled as needed; or
    removed.
    * [Components/ProductListing](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/sites/test-site/src/components/ProductListing)
      (which contains some simple HOCs and styling for this page)
    * [Components/Products](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/sites/test-site/src/components/Product/index.tsx)
      (which contains some simple HOCs and styling for this page)
    * [FilterByGroup](https://github.com/johnsonandjohnson/Bodiless-JS/tree/main/sites/test-site/src/components/FilterByGroup)
      (which contains an HOC that renders a Product Filter on the left and a taggable Product Flow
      Container on the right)

01. Configure pages to use the template via `index.json` file in `src/data/pages`.
    * Create a folder in `src/data/pages`, such as `src/data/pages/products`, and create an
      `index.json` file using the desired template.  
      E.g.,

      ```json
      {
        "#template": "product_listing"
      }
      ```
