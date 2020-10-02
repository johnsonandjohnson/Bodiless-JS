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

import lunr, { Builder } from 'lunr';
import { SearchEngineInterface, TDocument, TIndexConfig } from './types';

/**
 * Wrapper class for Lunr static site search engine.
 */
class LunrSearch implements SearchEngineInterface {
  name: string;

  documents: TDocument[];

  indexConfig: TIndexConfig | null;

  constructor() {
    this.name = 'Lunr';
    this.documents = [];
    this.indexConfig = null;
  }

  getEngineName = () => this.name;

  getIndexConfig = () => this.indexConfig;

  setIndexConfig = (conf: TIndexConfig) => { this.indexConfig = conf; };

  addDocuments = (doc: TDocument | TDocument[]): void => {
    if (doc instanceof Array) {
      this.documents = [...doc, ...this.documents];
    } else {
      this.documents.push(doc);
    }
  };

  /**
   * Create Lunr search index object with given configures.
   */
  createIndex = (): lunr.Index => {
    if (!this.documents.length) {
      throw new Error('There are no documents to be indexed');
    }

    if (!this.indexConfig) {
      throw new Error('Index configure must be set before creating index.');
    }
    /**
     * https://lunrjs.com/docs/lunr.Builder.html
     */
    const builder = new Builder();

    // Configure index ref and fields
    builder.ref(this.indexConfig.ref);
    this.indexConfig.fields.forEach(field => {
      builder.field(field.name);
    });

    // Add documents to index.
    this.documents.forEach(doc => {
      builder.add(doc);
    });
    return builder.build();
  };

  /**
   * Export serialized index.
   */
  exportIndex = (index: lunr.Index): string => JSON.stringify(index.toJSON());
}

export default LunrSearch;
