# Product Listing Page Template

The [Product Listing Page](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/templates/product_listing.jsx) template is a very opinionated version of a product listing page.  It can easily be changed or re-designed to meet the site requirements.

## Overview

The Product Listing Page as designed has some of the following unique characteristics

* FilterByGroup:  
  * A HOC that renders a Product Filter on left and a taggable Product flowContainer on right.

* ExampleGTMHelmetEvent
  * If Google Tag Manager is in use, this will render the data layer on the page.
    ```js
      const ExampleGTMHelmetEvent = flowRight(
        asBodilessHelmet('datalayer'),
        // On product pages, we may add product related datalayer info:
        withEvent('digitalData', { event: 'Product Viewed' }, 'product-viewed'),
      )(Helmet);
    ```

## Usage

1. The [Product Detail Page](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/templates/product_detail.jsx) template can be copied into your `src/templates` folder and customized.

2. The additional components it uses should also be imported, copied or styled as needed:
    * [Components/ProductListing](https://github.com/johnsonandjohnson/Bodiless-JS/tree/master/examples/test-site/src/components/ProductListing)  which contains some simple HOC's and styling for this page.
    * [Components/Products](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/components/Product/index.tsx)  which contains some simple HOC's and styling for this page.

3. Specify the templates to use the template via `index.json` file.
  * Create a folder in `src/pages` such as `src/pages/products` and specify the `index.json` to use this template.
    ```js
      {
        "#template": "product_listing",
      }
    ``` 