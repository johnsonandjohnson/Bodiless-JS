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

export interface SearchClientInterface {
  loadIndex: (index: object) => void;
  search: (queryString: string) => object;
}

export interface SearchEngineInterface {
  getEngineName: () => string,
  getIndexConfig: () => TIndexConfig | null,
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

export type TSearchConf = {
  searchEngine?: SearchEngineInterface,
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

export type TSearchIndexSettings = {
  sourcePath: string,
  sourceTypes: string[],
  targetPath: string,
  indexConfig: TIndexConfig,
};

export type TSearchResult = {
  id: number,
  ref: string,
  link: string,
  title: string,
  preview: string,
};

export type TSearchResults = TSearchResult[];
