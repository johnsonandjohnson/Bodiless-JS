# Product Detail Page Template

The [Product Detail Page](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/templates/product_detail.jsx) template is a very opinionated version of a product page.  It can easily be changed or re-designed to meet the site requirements.

## Overview

The Product Detail Page as designed has some of the following unique characteristics

* NonEditableTitle:  
  * This enforces the product accordions into the same naming convention for uniformity.  
  * It saves time when a new product page is created as they site editor doesn't have to enter them.
    ```js
      // Do not allow editors to set accordion titles.
      const NonEditableTitle = ({ producttitle }) => (
        <h2>
          {producttitle}
        </h2>
      );
    ```

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
    * [Components/Products](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/components/Product/index.tsx)  which contains some simple HOC's and styling for this page.
    * Other Componets used 
      * [Accordion](Components/Organisms/SingleAccordion)
      * [Flow Container](Components/FlowContainer)
      * [Rich Text Editor](Components/RichText)
      * [BazaarVoice](Components/Bazaarvoice) (Optional)

3. Specify the templates to use the template via `index.json` file.
  * Per Product Page: 
    * Create a folder in `src/pages` such as `src/pages/product-a` and specify the `index.json` to use this template.
      ```js
        {
          "#template": "product_detail"
        }
      ``` 
  * Per Folder with sub pages of products:
    * If you plan to have folder of products the suggested pattern is put this in the parent folder and all new products created in the folder will use this template.
      ```js
        {
          "#subpage_template": "product_detail"
        }
      ``` 