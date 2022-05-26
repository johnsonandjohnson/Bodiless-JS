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

  pushDataAnalytics(data, 'event_data');
};
