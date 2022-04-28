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

// Define a product Item/ID editable field to be added to the GA4 form.
const withDataLayerItemID = withDataLayerItem({
  name: 'id',
  label: 'Product/Item ID',
  path: 'productObject.ecommerce.items.0.item_id',
});

// Define a product UPC editable field to be added to the GA4 form.
const withDataLayerSKU = withDataLayerItem({
  name: 'upc',
  label: 'Product/Item SKU',
  path: 'productObject.ecommerce.items.0.sku',
});

// Define a product GTIN editable field to be added to the GA4 form.
const withDataLayerGTIN = withDataLayerItem({
  name: 'sku',
  label: 'Product/Item GTIN',
  path: 'productObject.ecommerce.items.0.gtin',
});

// Define a product Name editable field to be added to the GA4 form.
const withDataLayerProductName = withDataLayerItem({
  name: 'item_name',
  label: 'Product/Item Name',
  path: 'productObject.ecommerce.items.0.item_name',
});

// Define a product category editable field to be added to the GA4 form.
const withDataLayerCategory = withDataLayerItem({
  name: 'category',
  label: 'Product/Item Category',
  path: 'productObject.ecommerce.items.0.item_category',
});

// Define a product variant editable field to be added to the GA4 form.
const withDataLayerProductVariant = withDataLayerItem({
  name: 'variant',
  label: 'Product/Item Variant Name',
  path: 'productObject.ecommerce.items.0.variant',
});

/**
 * A helmet Component containing datalayer script. In edit mode, it shows a form
 * to edit the values for sku, upc, product name, product variant respectively.
 *
 * The use of withGlobalGA4Form allows us to retain the global datalayer script
 * and only add product information to it.
 */

export const GA4DataLayerProductItemHelmet = withGlobalGA4Form(
  withDefaultDataLayer(productDefaultDataLayer),
  withDataLayerItemID('product-id'),
  withDataLayerSKU('product-sku'),
  withDataLayerGTIN('product-gtin'),
  withDataLayerProductName('product-name'),
  withDataLayerCategory('product-category'),
  withDataLayerProductVariant('product-variant'),
)(Helmet);

/* TODO
ADD:
  affiliation
  currency
  item_brand
  item_out_of_stock
  item_subscription_type
  location_id
  price
  quantity

const arrayOfProductItems = [
  { name: 'id', label: 'Product/Item ID', path: 'productObject.ecommerce.items.0.item_id' },
  { name: 'upc', label: 'Product/Item SKU', path: 'productObject.ecommerce.items.0.upc' },
];

const withMultipleProductItems = arrayOfProductItems.map(item => withDataLayerItem({ ...item }));

or

const withMultipleProductItems = arrayOfProductItems.forEach((item) => {
  withDataLayerItem({ ...item });
});

export const GA4DataLayerProductItemHelmet = withGlobalGA4Form(
  withDefaultDataLayer(productDefaultDataLayer),
  withMultipleProductItems as HOC,
 )(Helmet);
*/
