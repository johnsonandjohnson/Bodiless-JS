# Product Detail Page Template

The [Product Detail Page](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/templates/product_detail.jsx) template is a very opinionated version of a product page.  It can easily be changed or re-designed to meet the site requirements.

![PDP screenshot](../assets/pdp.jpg "PDP screenshot")  

## Overview

The Product Detail Page has the following componets:
  * Product Title (Rich Text Editor component)
  * Product Image (Image component)
  * Set of product details (Accordion components)
  * Ratings & Review component by a third party.
  * FlowContainer that allows specific componets.

The Product Detail Page as designed has some of the following unique characteristics:

* NonEditableTitle:  
  * This enforces the product accordions into the same naming convention for uniformity.  
  * It saves time when a new product page is created as the site editor doesn't have to enter them.

## Usage

1. The [Product Detail Page](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/templates/product_detail.jsx) template can be copied into your `src/templates` folder and customized.

2. The additional components it uses should also be imported, copied and styled as needed or removed.
    * [Components/Products](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/components/Product/index.tsx)  which contains some simple HOC's and styling for this page.
    * [Accordion](Components/Organisms/SingleAccordion)
    * [Flow Container](Components/FlowContainer)
    * [Rich Text Editor](Components/RichText)
    * [BazaarVoice](Components/Bazaarvoice)

3. Specify the templates to use the template via `index.json` file in `src/data/pages`.
  * Per Product Page:
    * Create a folder in `src/data/pages` such as `src/data/pages/product-a` and
      specify the `index.json` to use this template.

    e.g.
      ```js
        {
          "#template": "product_detail"
        }
      ```

  * Per Folder with sub pages of products:
    * If you plan to have folder of products the suggested pattern is put this
      in the parent folder and all new products created in the folder will use
      this template.

      e.g.
      ```js
        {
          "#subpage_template": "product_detail"
        }
      ```
