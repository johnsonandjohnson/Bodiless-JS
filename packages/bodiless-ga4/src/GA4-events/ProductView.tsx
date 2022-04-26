/**
 * @file Example definition of a Product GTM Datalayer Component with editable
 * fields.
 */
import Helmet from 'react-helmet';
import withDataLayerItem, { withDefaultDataLayer } from '../gtm';
import { withGlobalGTMForm } from '../util';

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

// Define a product UPC editable field to be added to the GTM form.
const withDataLayerProductID = withDataLayerItem({
  name: 'id',
  label: 'Product ID',
  // The path relevant the product dataLayer defined above note.
  // 'productObject.product.0.productInfo.sku' will add the SKU at
  // productObject.product[0].productInfo.sku
  path: 'productObject.ecommerce.product.0.productInfo.productID',
});

// Define a product UPC editable field to be added to the GTM form.
const withDataLayerSku = withDataLayerItem({
  name: 'sku',
  label: 'Product SKU',
  // The path relevant the product dataLayer defined above note.
  // 'productObject.product.0.productInfo.sku' will add the SKU at
  // productObject.product[0].productInfo.sku
  path: 'productObject.ecommerce.product.0.productInfo.sku',
});

// Define a product UPC editable field to be added to the GTM form.
const withDataLayerUPC = withDataLayerItem({
  name: 'upc',
  label: 'Product UPC',
  path: 'productObject.ecommerce.product.0.productInfo.upc',
});

// Define a product Name editable field to be added to the GTM form.
const withDataLayerProductName = withDataLayerItem({
  name: 'productName',
  label: 'Product Name',
  path: 'productObject.ecommerce.product.0.productInfo.productName',
});

// Define a product category editable field to be added to the GTM form.
const withDataLayerCategory = withDataLayerItem({
  name: 'category',
  label: 'Product Category',
  path: 'productObject.ecommerce.product.0.productInfo.category',
});

// Define a product variant editable field to be added to the GTM form.
const withDataLayerProductVariant = withDataLayerItem({
  name: 'variant',
  label: 'Product Variant Name',
  path: 'productObject.ecommerce.product.0.productInfo.variant',
});

/**
 * A helmet Component containing datalayer script. In edit mode, it shows a form
 * to edit the values for sku, upc, product name, product variant respectively.
 *
 * The use of withGlobalGTMForm allows us to retain the global datalayer script
 * and only add product information to it.
 */
export const GTMDataLayerProductHelmet = withGlobalGTMForm(
  withDefaultDataLayer(productDefaultDataLayer),
  withDataLayerProductID('product-id'),
  withDataLayerSku('product-sku'),
  withDataLayerUPC('product-upc'),
  withDataLayerProductName('product-name'),
  withDataLayerCategory('product-category'),
  withDataLayerProductVariant('product-variant'),
)(Helmet);
