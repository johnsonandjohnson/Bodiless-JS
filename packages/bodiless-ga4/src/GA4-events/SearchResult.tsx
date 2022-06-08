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

import React, { ComponentType, useMemo } from 'react';
import Helmet from 'react-helmet';
import { HOC } from '@bodiless/fclasses';
import { useSearchResultContext } from '@bodiless/search';
import withDataLayerItem, { withDefaultDataLayer } from '../gtm';
import { withGlobalGA4 } from '../util';

const searchResultDefaultDataLayer = {
  dataLayerName: 'dataLayer',
  dataLayerData: {
    searchResultObject: {
      event: 'view_search_results',
      event_data: {
        search_type: 'site',
      },
    },
  },
  dataLayerType: 'event_data',
};

const withSearchResultInfos = (HelmetComponent: ComponentType) => (props: any) => {
  const searchResultContext = useSearchResultContext();
  const { dataLayerData } = props;
  const { searchResultObject } = dataLayerData;
  const { searchTerm, results } = searchResultContext;
  searchResultObject.event_data.result_count = results.length.toString();

  // User have not searched for anything but technically our search is wildcard or all results
  if (searchTerm === '' && results.length) {
    searchResultObject.event_data.search_term = '*';
  } else {
    searchResultObject.event_data.search_term = searchTerm;
  }
  return useMemo(
    () => <HelmetComponent {...dataLayerData} {...props} />,
    [results],
  );
};

const withDataLayerSearchResultCount = withDataLayerItem({
  name: 'search_count',
  label: 'Search Result Count',
  path: 'searchResultObject.event_data.result_count',
});

const withDataLayerSearchResultTerm = withDataLayerItem({
  name: 'search_term',
  label: 'Search Result Term',
  path: 'searchResultObject.event_data.search_term',
});

export const GA4DataLayerSearchResultHelmet = withGlobalGA4(
  withDefaultDataLayer(searchResultDefaultDataLayer),
  withDataLayerSearchResultCount('search-result-count'),
  withDataLayerSearchResultTerm('search-result-term'),
  withSearchResultInfos as HOC,
)(Helmet);
