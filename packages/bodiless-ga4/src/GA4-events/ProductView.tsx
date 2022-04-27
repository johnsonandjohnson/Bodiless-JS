/**
 * @file Example definition of a Product GA4 Datalayer Component with editable
 * fields.
 */
import Helmet from 'react-helmet';
import withDataLayerItem, { withDefaultDataLayer } from '../gtm';
import { withGlobalGA4Form } from '../util';

// Define the product dataLayer default data.
const productDefaultDataLayer = {
  dataLayerName: 'dataLayer',
  dataLayerData: {
    productObject: {
      event: 'view_item',
      ecommerce: null,
    },
  },
};

// Define a product UPC editable field to be added to the GA4 form.
const withDataLayerItemID = withDataLayerItem({
  name: 'id',
  label: 'Product/Item ID',
  path: 'productObject.ecommerce.product.0.productInfo.item_id',
});

// Define a product UPC editable field to be added to the GA4 form.
const withDataLayerSKU = withDataLayerItem({
  name: 'upc',
  label: 'Product/Item SKU',
  path: 'productObject.ecommerce.product.0.productInfo.sku',
});

// Define a product GTIN editable field to be added to the GA4 form.
const withDataLayerGTIN = withDataLayerItem({
  name: 'sku',
  label: 'Product/Item GTIN',
  path: 'productObject.ecommerce.product.0.productInfo.gtin',
});

// Define a product Name editable field to be added to the GA4 form.
const withDataLayerProductName = withDataLayerItem({
  name: 'item_name',
  label: 'Product/Item Name',
  path: 'productObject.ecommerce.product.0.productInfo.item_name',
});

// Define a product category editable field to be added to the GA4 form.
const withDataLayerCategory = withDataLayerItem({
  name: 'category',
  label: 'Product/Item Category',
  path: 'productObject.ecommerce.product.0.productInfo.item_category',
});

// Define a product variant editable field to be added to the GA4 form.
const withDataLayerProductVariant = withDataLayerItem({
  name: 'variant',
  label: 'Product/Item Variant Name',
  path: 'productObject.ecommerce.product.0.productInfo.variant',
});

/*
item_brand
*/

/**
 * A helmet Component containing datalayer script. In edit mode, it shows a form
 * to edit the values for sku, upc, product name, product variant respectively.
 *
 * The use of withGlobalGA4Form allows us to retain the global datalayer script
 * and only add product information to it.
 */
export const GA4DataLayerProductHelmet = withGlobalGA4Form(
  withDefaultDataLayer(productDefaultDataLayer),
  withDataLayerItemID('product-id'),
  withDataLayerSKU('product-sku'),
  withDataLayerGTIN('product-gtin'),
  withDataLayerProductName('product-name'),
  withDataLayerCategory('product-category'),
  withDataLayerProductVariant('product-variant'),
)(Helmet);
