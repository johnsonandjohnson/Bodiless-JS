# Product Detail Page Template

The [Product Detail
Page](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/sites/test-site/src/templates/product_detail.jsx)
template is a very opinionated version of a product page. It can easily be changed or re-designed to
meet your site requirements.

![PDP screenshot](../assets/pdp.jpg "PDP screenshot")

## Overview

The Product Detail Page has the following components:

* Product Title (Rich Text Editor component)
* Product Image (Image component)
* Set of product details (Accordion components)
* Ratings & Review component by a third party
* Flow Container that allows specific components

The Product Detail Page, as designed, has the following unique characteristics:

* `NonEditableTitle`:
  * This enforces the product accordions into the same naming convention for uniformity.
  * It saves time when a new product page is created, as the Content Editor doesn't have to enter
    them again.

## Usage

01. The [Product Detail
    Page](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/sites/test-site/src/templates/product_detail.jsx)
    template can be copied into your `src/templates` folder and customized.

01. The additional components it uses should also be imported, copied, and styled as needed; or
    removed.
    * [Components/Products](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/sites/test-site/src/components/Product/index.tsx)
      (which contains some simple HOCs and styling for this page)
    * [Accordion](/Components/SingleAccordion)
    * [Flow Container](/Components/FlowContainer/)
    * [Rich Text Editor](/Components/Editors/RichText)
    * [BazaarVoice](/Components/Bv)

01. Configure pages to use the template via `index.json` file in `src/data/pages`.
    * Per Product Page:
      * Create a folder in `src/data/pages`, such as `src/data/pages/product-a`, and create an
        `index.json` file using the desired template.  
        E.g.,

        ```json
        {
          "#template": "product_detail"
        }
        ```

    * Per Folder with sub-pages of products:
      * If you plan to have a folder of products, the suggested pattern is to set a
        `#subpage_template` in the parent folder, and all new products created in the folder will
        use this template by default.  
        E.g.,

        ```json
        {
          "#subpage_template": "product_detail"
        }
        ```
