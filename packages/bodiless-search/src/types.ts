/**
 * Copyright © 2019 Johnson & Johnson
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

import lunr from 'lunr';

export interface SearchToolInterface {
  generateIndex: (conf: TSearchConf) => void;
}
export interface SearchClientInterface {
  loadIndex: (index: object) => void;
  search: (queryString: string) => object;
}
export interface SearchEngineInterface {
  getEngineName: () => string,
  getIndexConfig: () => TIndexConfig | null,
  getIndex: () => lunr.Index | null,
  setIndexConfig: (conf: TIndexConfig) => void,
  createIndex: () => lunr.Index,
  exportIndex: () => string,
  addDocuments: (doc: TDocument | TDocument[]) => void,
  loadIndex: (index: object) => void;
  loadPreviews: (previews: { [key: string]: TPreview; }) => void;
  search: (queryString: string) => TSearchResults;
}
export type TDocument = { [key: string]: string; };
export type TPreview = { [key: string]: string; };

export type TSourcePath = {
  path: string,
  exclude?: string[],
};

/**
 * Type describes a language index setting.
 *
 * @param name            - language name, i.e. "English", "French" etc.
 * @param code            - 2 letter language code (ISO 639-1).
 * @param sourcePaths     - set of source content path for indexing. i.e. ['public', 'public/fr']
 * @param excludePaths    - set of content paths to be excluded from indexing.
 * @param indexFileName   - index file name for this language, used for both
 *                          frontend and backend search process. i.e. 'lunr.json'.
 * @param indexUrlPath    - index file url path for frontend access, i.e. '/fr'
 * @param indexFilePath   - path where index file saved.
 * @param searchPath      - frontend search page path, i.e. 'fr/search'
 */
export type TLanguageSetting = {
  name: string,
  code: string,
  sourcePaths: Array<string | TSourcePath>,
  excludePaths: string[],
  indexFileName: string,
  indexUrlName: string,
  indexFilePath: string,
  searchPath: string,
};

/**
 * Search configuration
 *
 * @param searchEngine      - instance of a search engine class, default to LunrSearch.
 * @param sourceTypes       - file types to be indexed for search.
 * @param contentSelectors  - jQuery style selector for selecting content for index.
 *                            see https://cheerio.js.org/#selectors
 * @param contentExcluders  - jQuery style selector for excluding content from index.
 *                            see https://cheerio.js.org/#selectors
 * @param languages         - language based search settings.
 */
export type TSearchConf = {
  searchEngine?: SearchEngineInterface,
  sourceTypes: string[],
  contentSelectors: string[],
  contentExcluders: string[],
  languages: TLanguageSetting[],
  indexConfig: TIndexConfig,
};

export type TField = {
  name: string,
  attributes?: {
    boost?: number,
    extractor?: (doc: object) => string | object | object[],
  },
};

export type TIndexConfig = {
  ref: string,
  fields: TField[],
};

export type TSearchResult = {
  id: number,
  ref: string,
  link: string,
  title: string,
  preview: string,
};

export type Suggestion = {
  text: string;
  count: number;
};

export type TSearchResults = TSearchResult[];

export type TSourceMap = {
  path: string,
  files: string[]
};