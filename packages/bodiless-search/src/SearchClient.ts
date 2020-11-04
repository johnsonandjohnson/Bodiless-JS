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

import axios from 'axios';
import {
  SearchEngineInterface,
  SearchClientInterface,
  TSearchConf,
  TSearchResults,
  TPreview,
} from './types';
import LunrSearch from './LunrSearch';

type SearchIndex = {
  idx: object,
  preview: { [key: string]: TPreview; },
  expires: number,
};

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

  search = (queryString: string): TSearchResults => {
    const filtered = this.filter(queryString);
    return this.searchEngine.search(filtered);
  };

  // Remove the search engine specific charactors on customize search.
  private filter = (qs: string) => qs.replace(/:|\$|#|@|!|\^|\*|\+|-|~|%/g, ' ');

  validateIndex = (index: SearchIndex | false): boolean => {
    if (!index) {
      return false;
    }
    const {
      expires,
    } = index;
    return (Date.now() <= expires);
  };

  getLocalIndex = (): SearchIndex | false => {
    const rawIndex = localStorage.getItem('search:index') || '{}';
    try {
      return JSON.parse(rawIndex);
    } catch (error) {
      return false;
    }
  };

  loadIndex = async () => {
    try {
      let index = this.getLocalIndex() as SearchIndex;
      if (!index || !this.validateIndex(index)) {
        const indexUrl = process.env.BODILESS_SEARCH_INDEX_URL || '/default.idx';
        const response = await axios.get(indexUrl);
        const expires = process.env.BODILESS_SEARCH_EXPIRES || 86400;
        index = { expires: (Date.now() + Number(expires)), ...response.data };
        localStorage.setItem('search:index', JSON.stringify(index));
      }
      this.searchEngine.loadIndex(index.idx);
      this.loadPreviews(index.preview);
    } catch (error) {
      console.log('Failed to load search index file.');
    }
  };

  loadPreviews = (previews: { [key: string]: TPreview; }): void => {
    this.searchEngine.loadPreviews(previews);
  };

  setSearchEngine(searchEngine: SearchEngineInterface) {
    this.searchEngine = searchEngine;
  }
}

export default SearchClient;
