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

import { SearchEngineInterface, TSearchConf } from './types';
import LunrSearch from './LunrSearch';


/**
 * Search function helper class
 *
 * - Select search engine for search related operations, default to Lunrjs.
 * - Build index with given source path and type of content.
 */
class SearchTool {
  searchEngine: SearchEngineInterface;

  constructor(config: TSearchConf) {
    this.searchEngine = config.searchEngine ? config.searchEngine : new LunrSearch();
  }

  generateIndex(settings: searchIndexSettings) {
    const { sourcePath, sourceType, targetPath } = settings;

    // 1. create documents from source

    // 2. add docs to index
    this.searchEngine.createIndex();
  }

  setSearchEngine(searchEngine: SearchEngineInterface) {
    this.searchEngine = searchEngine;
  }
}

export default SearchTool;
