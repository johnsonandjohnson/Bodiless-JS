import React, { ComponentType, useMemo } from 'react';
import Helmet from 'react-helmet';
import withDataLayerItem, { withDefaultDataLayer } from '../gtm';
import { HOC } from '@bodiless/fclasses';
import { useSearchResultContext } from '@bodiless/search';
import { withGlobalGTM } from '../util';

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
};

const withSearchResultInfos =
  (HelmetComponent: ComponentType) => (props: any) => {
    const searchResultContext = useSearchResultContext();
    const { dataLayerData } = props;
    const { searchResultObject } = dataLayerData;
    const { searchTerm, results } = searchResultContext;
    searchResultObject.event_data.result_count = results.length.toString();

    // User have not searched for anything but technically our search is wildcard or all results
    // See https://jira.jnj.com/browse/AESQ-6459?focusedCommentId=6789155&page=com.atlassian.jira.plugin.system.issuetabpanels:comment-tabpanel#comment-6789155
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

export const GTMDataLayerSearchResultHelmet = withGlobalGTM(
  withDefaultDataLayer(searchResultDefaultDataLayer),
  withDataLayerSearchResultCount('search-result-count'),
  withDataLayerSearchResultTerm('search-result-term'),
  withSearchResultInfos as HOC,
)(Helmet);
