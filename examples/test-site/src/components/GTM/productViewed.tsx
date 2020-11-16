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

/**
 * @file Example definition of a Product GTM Datalayer Component with editable
 * fields.
 */
import Helmet from 'react-helmet';
import {
  withDefaultDataLayer, withDataLayerItem,
} from '@bodiless/components';
import { withDataLayerPageType, withGlobalGTMForm } from './index';
// Define the product dataLayer default data.
const productDefaultDataLayer = {
  dataLayerName: 'DigitalData',
  dataLayerData: {
    productObject: {
      event: 'Product Viewed',
    },
  },
};

// Define a product UPC editable field to be added to the GTM form.
const withDataLayerProductID = withDataLayerItem({
  name: 'id',
  label: 'Product ID',
  // The path relevant the product dataLayer defined above note.
  // 'productObject.product.0.productInfo.sku' will add the SKU at
  // productObject.product[0].productInfo.sku
  path: 'productObject.product.0.productInfo.productID',
});

// Define a product UPC editable field to be added to the GTM form.
const withDataLayerSku = withDataLayerItem({
  name: 'sku',
  label: 'Product SKU',
  // The path relevant the product dataLayer defined above note.
  // 'productObject.product.0.productInfo.sku' will add the SKU at
  // productObject.product[0].productInfo.sku
  path: 'productObject.product.0.productInfo.sku',
});

// Define a product UPC editable field to be added to the GTM form.
const withDataLayerUPC = withDataLayerItem({
  name: 'upc',
  label: 'Product UPC',
  path: 'productObject.product.0.productInfo.upc',
});

// Define a product Name editable field to be added to the GTM form.
const withDataLayerProductName = withDataLayerItem({
  name: 'productName',
  label: 'Product Name',
  path: 'productObject.product.0.productInfo.productName',
});

// Define a product category editable field to be added to the GTM form.
const withDataLayerCategory = withDataLayerItem({
  name: 'category',
  label: 'Product Category',
  path: 'productObject.product.0.productInfo.category',
});
// Define a product variant editable field to be added to the GTM form.
const withDataLayerProductVariant = withDataLayerItem({
  name: 'variant',
  label: 'Product Variant Name',
  path: 'productObject.product.0.productInfo.variant',
});

/**
 * A helmet Component containing datalayer script. In edit mode, it shows a form
 * to edit the values for sku, upc, product name, product variant respectively.
 *
 * The use of withGlobalGTMForm allows us to retain the global datalayer script
 * and only add product information to it.
 */
const GTMDataLayerProductHelmet = withGlobalGTMForm(
  withDefaultDataLayer(productDefaultDataLayer),
  withDataLayerPageType('page-type', 'Product'),
  withDataLayerProductID('product-id'),
  withDataLayerSku('product-sku'),
  withDataLayerUPC('product-upc'),
  withDataLayerProductName('product-name'),
  withDataLayerCategory('product-category'),
  withDataLayerProductVariant('product-variant'),
)(Helmet);

export default GTMDataLayerProductHelmet;
