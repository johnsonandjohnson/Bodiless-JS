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
import type {
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

  generateIndex(settings: TSearchIndexSettings): void {
    const {
      sourcePath, sourceTypes, targetPath, indexConfig,
    } = settings;

    this.searchEngine.setIndexConfig(indexConfig);

    const sourceFiles = this.findSourceFiles({ sourcePath, sourceTypes });
    const documents = this.filesToDocument(sourceFiles, sourcePath);

    this.searchEngine.addDocuments(documents);

    const ind = this.searchEngine.exportIndex();
    const targetPath$ = path.resolve(process.cwd(), targetPath);
    fs.writeFile(targetPath$, ind, 'utf8', err => {
      if (err) throw err;
    });
  }

  setSearchEngine(searchEngine: SearchEngineInterface) {
    this.searchEngine = searchEngine;
  }

  findSourceFiles = (settings: {
    sourcePath: string;
    sourceTypes: string[];
  }) => {
    const { sourcePath, sourceTypes } = settings;
    const path$ = path.resolve(process.cwd(), sourcePath);
    if (!fs.existsSync(path$)) {
      throw new Error(`Invalid source path: ${path$}`);
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
    const selector = process.env.BODILESS_SEARCH_INDEX_SELECTOR || 'body *';
    const exclude = process.env.BODILESS_SEARCH_INDEX_EXCLUDE_SELECTOR || 'script,noscript,style';
    filePaths
      .filter(filePath => fs.statSync(path.join(sourcePath, filePath)).isFile())
      .forEach(filePath => {
        const mimeType = mime.getType(filePath);
        switch (mimeType) {
          case 'text/html': {
            const html = fs.readFileSync(path.resolve(sourcePath, filePath)).toString();
            const doc = this.htmlToDocument(html, selector, exclude);
            const filePathClean = filePath.replace(/index.html$/i, '');
            if (!doc.title) {
              doc.title = filePathClean;
            }
            documents.push({
              ...doc,
              link: filePathClean,
            });
            break;
          }
          default:
            throw new Error(`Only HTML is supported for indexing, ${mimeType} is given.`);
        }
      });
    return documents;
  };

  /**
   * Create index document from HTML content.
   */
  htmlToDocument = (html: string, selector: string, exclude: string): TDocument => {
    const $ = cheerio.load(html);
    const title = $('h1').text().trim() || $('title').text().trim();
    if (exclude) {
      $(exclude).remove();
    }
    // eslint-disable-next-line func-names
    const body = $(selector).contents().map(function (this: cheerio.Element) {
      return (this.type === 'text') ? $(this).text().trim() : '';
    }).get()
      .join(' ')
      .replace(/ +/gi, ' ')
      .trim();

    return {
      id: v1(),
      title,
      body,
    };
  };
}

export default SearchTool;
