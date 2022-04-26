import { addProps } from '@bodiless/fclasses';
import { pushSearchAnalytics } from '../util';

export const withSearchDataLayer = {
  Behavior: {
    _: addProps({
      onSubmit: (value: any) => {
        pushSearchAnalytics({
          corrected_term: '',
          search_term: value,
        });
      },
    }),
  },
};

export const withSearchDataLayerSuggestion = {
  Behavior: {
    _: addProps({
      additionalHandler: (v: any) => {
        pushSearchAnalytics({
          corrected_term: v.searchTerm,
          search_term: v.text,
        });
      },
    }),
  },
};
