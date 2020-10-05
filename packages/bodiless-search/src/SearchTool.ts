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

import cheerio from 'cheerio';
import fs from 'fs';
import glob from 'glob';
import mime from 'mime';
import path from 'path';
import { v1 } from 'uuid';
import {
  SearchEngineInterface,
  TSearchConf,
  TSearchIndexSettings,
  TDocument,
} from './types';
import LunrSearch from './LunrSearch';

/**
 * Search function helper class
 *
 * - Select search engine for search related operations, default to Lunrjs.
 * - Build index with given source path and type of content.
 */
class SearchTool {
  searchEngine: SearchEngineInterface;

  constructor(config?: TSearchConf) {
    this.searchEngine = config && config.searchEngine ? config.searchEngine : new LunrSearch();
  }

  generateIndex(settings: TSearchIndexSettings): string {
    const {
      sourcePath, sourceTypes, targetPath, indexConfig,
    } = settings;

    this.searchEngine.setIndexConfig(indexConfig);

    const sourceFiles = this.findSourceFiles({ sourcePath, sourceTypes });
    const documents = this.filesToDocument(sourceFiles, sourcePath);

    this.searchEngine.addDocuments(documents);

    const ind = this.searchEngine.exportIndex();
    fs.writeFile(targetPath, ind, 'utf8', err => {
      if (err) throw err;
    });

    // @todo: remove retur, should be void.
    return ind;
  }

  setSearchEngine(searchEngine: SearchEngineInterface) {
    this.searchEngine = searchEngine;
  }

  findSourceFiles = (settings: {
    sourcePath: string;
    sourceTypes: string[];
  }) => {
    const { sourcePath, sourceTypes } = settings;
    // @todo: glob file list

    const path$ = path.resolve(process.cwd(), sourcePath);
    if (!fs.existsSync(path$)) {
      throw new Error('Invalid source path');
    }

    const pattern = `**/+(${sourceTypes.map(v => `*.${v}`).join('|')})`;
    return glob.sync(pattern, {
      cwd: path$,
      absolute: false,
    });
  };

  /**
   * Returns index document created with given files.
   */
  filesToDocument = (filePaths: string[], sourcePath: string): TDocument[] => {
    const documents: TDocument[] = [];
    filePaths
      .filter(filePath => fs.statSync(path.join(sourcePath, filePath)).isFile())
      .forEach(filePath => {
        const mimeType = mime.getType(filePath);
        switch (mimeType) {
          case 'text/html':
            documents.push(this.htmlToDocument(filePath, sourcePath));
            break;
          default:
            throw new Error(`Only HTML is supported for indexing, ${mimeType} is given.`);
        }
      });
    return documents;
  };

  htmlToDocument = (filePath: string, sourcePath: string): TDocument => {
    const html = fs.readFileSync(path.resolve(sourcePath, filePath)).toString();
    const $ = cheerio.load(html);
    return {
      id: v1(),
      title: $('title').text(),
      body: $('body').text(),
      link: filePath,
    };
  };
}

export default SearchTool;
