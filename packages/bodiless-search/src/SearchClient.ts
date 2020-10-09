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

import {
  SearchEngineInterface,
  SearchClientInterface,
  TSearchConf,
} from './types';
import LunrSearch from './LunrSearch';

/**
 * Search client wraps search engine for in-browser search features.
 *
 * - Load index from json.
 * - Perform search query.
 */
class SearchClient implements SearchClientInterface {
  searchEngine: SearchEngineInterface;

  constructor(config?: TSearchConf) {
    this.searchEngine = config && config.searchEngine ? config.searchEngine : new LunrSearch();
  }

  search = (queryString: string): object => this.searchEngine.search(queryString);

  loadIndex = (index: object): void => {
    this.searchEngine.loadIndex(index);
  };

  setSearchEngine(searchEngine: SearchEngineInterface) {
    this.searchEngine = searchEngine;
  }
}

export default SearchClient;
