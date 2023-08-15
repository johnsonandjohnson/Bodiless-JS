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

import { pushDataAnalytics } from './pushDataAnalytics';

export type ItemsDataType = {
  item_brand: string;
  item_category: string;
  item_id: string;
  item_list_id: string;
  item_list_name: string;
  item_name: string;
};

type AnalyticsTypes = {
  event: string;
  ecommerce: {
    facets: string;
    items?: ItemsDataType[];
    itemListId?: string;
    itemListName?: string;
    searchType?: string;
    slot?: number;
  };
};

export const pushPLPAnalytics = (props: AnalyticsTypes) => {
  const { event, ecommerce } = props;
  const {
    facets, items, itemListId, itemListName, searchType, slot
  } = ecommerce;

  const data = {
    event,
    ecommerce: {
      facets,
    },
  };

  if (items) Object.assign(data.ecommerce, { items });
  if (itemListId) Object.assign(data.ecommerce, { item_list_id: itemListId });
  if (itemListName) Object.assign(data.ecommerce, { item_list_name: itemListName });
  if (searchType) Object.assign(data.ecommerce, { search_type: searchType });
  if (slot) Object.assign(data.ecommerce, { slot });

  pushDataAnalytics(data, 'ecommerce');
};
