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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const digitalData = [
  {
    event: 'Page Loaded',
    page: {
      country: 'US',
      language: 'en',
      hostname: 'www.listerine.com',
      pageType: 'product detail',
    },
  },
  {
    event: 'Product Viewed',
    product: [
      {
        productInfo: {
          productID: '312547306355',
          sku: '1254730635',
          upc: '312547306355',
          productName: 'LISTERINE\u00ae TOTAL CARE Mouthwash',
          careArea: '',
          concernArea: '',
        },
      },
    ],
  },
];
const defaultDataLayer = {
  name: 'DigitalData',
  events: [
    {
      event: 'Page Loaded',
      page: {
        country: 'US',
        language: 'en',
        hostname: 'www.listerine.com',
        pageType: 'product detail',
      },
    },
    {
      event: 'Product Viewed',
      product: [
        {
          productInfo: {
            productID: '312547306355',
            sku: '1254730635',
            upc: '312547306355',
            productName: 'LISTERINE',
            careArea: '',
            concernArea: '',
          },
        },
      ],
    },
  ],
};
const editableDataDefaultContent = { pageType: 'mama' };
const SiteGTMHelmetEvent = asBodilessGTMHelmet(defaultDataLayer)('datalayer', editableDataDefaultContent);
export default SiteGTMHelmetEvent;
