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

import { flowRight } from 'lodash';
import Helmet from 'react-helmet';
import {
  withDataLayer,
  withDefaultDataLayer,
  asBodilessHelmet,
  withMetaForm,
} from '@bodiless/components';
import { useEditContext } from '@bodiless/core';

const dataLayerName = 'DigitalData';
const defaultDataLayer = {
  dataLayerName,
  dataLayerData: [
    {
      foo: 'foo value',
      bar: {
        bat: 'baz value',
      },
    },
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
      product: [
        {
          productInfo: {
            productCustomAttribute: 'Product Static Value',
          },
        },
      ],
    },
  ],
};
// Add a page type editable field:
const withDataLayerPageType = withDataLayer({
  name: 'pagetype',
  label: 'Page Type',
  path: '1.page.pageType',
});

// Add a product sku editable field:
const withDataLayerSku = withDataLayer({
  name: 'sku',
  label: 'SKU',
  path: '2.product.0.productInfo.sku',
});

const useMenuOptions = () => {
  const context = useEditContext();
  return [
    {
      name: 'gtm',
      icon: 'local_offer',
      label: 'GTM',
      isHidden: () => !context.isEdit,
    },
  ];
};

const seoFormHeader = {
  title: 'GTM Data Management',
  description: 'Enter the page level data used for DataLayer.',
};

const GTMDataLayerHelmet = flowRight(
  withMetaForm(useMenuOptions, seoFormHeader),
  asBodilessHelmet('datalayer'),
  withDefaultDataLayer(defaultDataLayer),
  // adding extra attribute in this fashion is not working
  withDataLayerSku('product-sku', 'bar'),
  withDataLayerPageType('page-type', 'foo'),
)(Helmet);

export default GTMDataLayerHelmet;
