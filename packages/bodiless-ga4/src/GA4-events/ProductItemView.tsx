/**
 * Copyright © 2022 Johnson & Johnson
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
 * @file Example definition of a Product GA4 Datalayer Component with editable
 * fields.
 */
import { HOC } from '@bodiless/fclasses';
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
  dataLayerType: 'ecommerce',
};

const productItems = [
  { name: 'id', label: 'Product/Item ID', path: 'productObject.ecommerce.items.0.item_id' },
  { name: 'upc', label: 'Product/Item SKU', path: 'productObject.ecommerce.items.0.upc' },
  { name: 'GTIN', label: 'Product/Item GTIN', path: 'productObject.ecommerce.items.0.gtin' },
  { name: 'item_name', label: 'Product/Item Name', path: 'productObject.ecommerce.items.0.item_name' },
  { name: 'category', label: 'Product/Item Category', path: 'productObject.ecommerce.items.0.item_category' },
  { name: 'item_variant', label: 'Product/Item Variant Name', path: 'productObject.ecommerce.items.0.item_variant' },
  { name: 'affiliation', label: 'Product/Item Affiliation', path: 'productObject.ecommerce.items.0.affiliation' },
  { name: 'currency', label: 'Product/Item Currency', path: 'productObject.ecommerce.items.0.currency' },
  { name: 'item_subscription_type', label: 'Product/Item Subscription Type', path: 'productObject.ecommerce.items.0.item_subscription_type' },
  { name: 'location_id', label: 'Product/Item Location ID', path: 'productObject.ecommerce.items.0.location_id' },
  { name: 'item_brand', label: 'Product/Item Brand', path: 'productObject.ecommerce.items.0.item_brand' },
];

const items = Object.entries(productItems);

const dataLayerItems = items.map(([key, item]) => withDataLayerItem(item)(item.name) as HOC);

/**
 * A helmet Component containing datalayer script. In edit mode, it shows a form
 * to edit the values for sku, upc, product name, product variant respectively.
 *
 * The use of withGlobalGA4Form allows us to retain the global datalayer script
 * and only add product information to it.
 */
export const GA4DataLayerProductItemHelmet = withGlobalGA4Form(
  withDefaultDataLayer(productDefaultDataLayer),
  ...dataLayerItems,
)(Helmet);
