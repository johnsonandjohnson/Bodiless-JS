// @ts-nocheck
/**
 * Copyright © 2020 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { asBodilessGTMHelmet } from '@bodiless/components';

const dataLayer = {
  name: 'DigitalData',
  events: [
    {
      event: 'Page Loaded',
      page: {
        country: 'US',
        language: 'en',
        hostname: 'www.listerine.com',
      },
    },
    {
      event: 'Product Viewed',
      product: [{
        productInfo: {
          productCustomAttribute: 'Product Static Value',
        },
      }],
    },
  ],
  // Define additional datalayer fields that are editable using the UI.
  // These fields will be injected into the datalayer events object using the
  // required path property defined on each field.
  editableFields: [
    {
      id: 'page-type',
      fieldTitle: 'Page Type',
      fieldName: 'pageType',
      // Maps to page object on the first event.
      path: '0.page.pageType',
    },
    {
      id: 'product-sku',
      fieldTitle: 'Product SKU',
      fieldName: 'sku',
      // Maps to the first product on the second event.
      path: '1.product.0.productInfo.sku',
    },
    {
      id: 'product-name',
      fieldTitle: 'Product Name',
      fieldName: 'productName',
      path: '1.product.0.productInfo.productName',
    },
    {
      id: 'product-upc',
      fieldTitle: 'Product UPC',
      fieldName: 'upc',
      path: '1.product.0.productInfo.upc',
    },
    {
      id: 'product-variant',
      fieldTitle: 'Product Variant',
      fieldName: 'variant',
      path: '1.product.0.productInfo.variant',
    },
  ],
};
// This will provide the default values for the editable gtm content currently
// limited to fields defined below:
const editableDataDefaultContent = {
  pageType: 'Bodiless Page',
  sku: 'Bodiless sku',
  productName: 'Product',
  upc: 'UPC',
  variant: 'Variant',
};

const SiteGTMHelmetEvent = asBodilessGTMHelmet(dataLayer)(
  'datalayer',
  editableDataDefaultContent,
);
export default SiteGTMHelmetEvent;
