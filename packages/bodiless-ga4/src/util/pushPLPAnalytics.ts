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

  pushDataAnalytics(data);
};
