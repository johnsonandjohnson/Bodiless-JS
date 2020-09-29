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

import React from 'react';
import { shallow } from 'enzyme';
import { asBodilessGTMHelmet } from '../src/GTM/gtm';

const core = require('@bodiless/core');

jest.mock('@bodiless/core');

const setMockNode = (items: any) => {
  const node = {
    child: (key: string) => ({
      data: items[key],
    }),
  };
  core.useNode.mockReturnValue({ node });
  return node;
};

const testDataLayer = {
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
  editableFields: [
    {
      id: 'page-type',
      fieldTitle: 'Page Type',
      fieldName: 'pageType',
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

const testEditableDataDefaultContent = {
  pageType: 'Bodiless Page',
  sku: 'Bodiless sku',
  productName: 'Product',
  upc: 'UPC',
  variant: 'Variant',
};

process.env.NODE_ENV = 'production';
const TestGTMHelmet = asBodilessGTMHelmet(testDataLayer)(
  'datalayer',
  testEditableDataDefaultContent,
);

describe('withDataLayer', () => {
  const mockItem = {
    datalayer: {
      pageType: 'Test PageType',
      sku: 'Test sku',
    },
  };
  setMockNode(mockItem);
  it('add a data layer script in the Helmet component', () => {
    const wrapper = shallow(<TestGTMHelmet />);
    expect(wrapper.childAt(0).type()).toEqual('script');
  });

  it('adds node content to the datalayer object', () => {
    const wrapper = shallow(<TestGTMHelmet />);
    // expect(wrapper.childAt(0).dive()).toEqual('script');
    console.log(wrapper);
  });
});
