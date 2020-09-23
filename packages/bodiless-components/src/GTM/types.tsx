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

export type DataLayerEventName = 'Page Loaded' | 'Product Viewed';

export type GTMPage = {
  country: string,
  language: string,
  hostname: string,
  pageType?: string,
};

// @todo: check with heidi for dataLayer info such as productID, care ..etc see listerine
export type GTMProduct = {
  productInfo: {
    sku: string,
    upc: string,
    variant: string
    productName: string,
  }
};

export type DataLayerEvent = {
  event: DataLayerEventName,
  page?: GTMPage,
  product? :GTMProduct,
};

export type GTMDefaultPageData = {
  name: string;
  events: [DataLayerEvent];
};

export type GTMNodeData = {
  pageType: string,
  sku: string,
  upc: string,
  productName: string,
  variant: string
};
