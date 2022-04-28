import { pushDataAnalytics } from './pushDataAnalytics';

type SearchAnalyticsTypes = {
  corrected_term: string;
  search_term: string;
  search_type?: string;
};

export const pushSearchAnalytics = (props: SearchAnalyticsTypes) => {
  const data = {
    event: 'search',
    event_data: {
      search_type: 'site',
      corrected_term: props.corrected_term,
      search_term: props.search_term,
    },
  };

  pushDataAnalytics(data, 'search');
};
