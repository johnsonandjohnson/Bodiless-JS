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
// TODO: needs further investigation on why import is leading to TS errors in jest run.
import type { AnyNode as CheerioNode } from 'cheerio';
import fs from 'fs';
import glob from 'glob';
import mime from 'mime';
import path from 'path';
import { v1 } from 'uuid';
import type {
  SearchEngineInterface,
  SearchToolInterface,
  TSearchConf,
  TLanguageSetting,
  TDocument,
  TSourceMap,
} from './types';
import LunrSearch from './LunrSearch';

/**
 * Search function helper class
 *
 * - Select search engine for search related operations, default to Lunrjs.
 * - Build index with given source path and type of content.
 */
class SearchTool implements SearchToolInterface {
  searchEngine: SearchEngineInterface;

  config: TSearchConf;

  constructor(config: TSearchConf) {
    this.config = config;
    this.searchEngine = config && config.searchEngine ? config.searchEngine : new LunrSearch();
    this.searchEngine.setIndexConfig(this.config.indexConfig);
  }

  generateIndex(): void {
    this.config.languages.forEach(setting => {
      const sourceFiles = this.findSourceFiles(setting);
      const documents = this.filesToDocument(sourceFiles);
      this.searchEngine.addDocuments(documents);
      const ind = this.searchEngine.exportIndex();
      const targetPath$ = path.resolve(process.cwd(), setting.indexFilePath, setting.indexFileName);
      fs.writeFile(targetPath$, ind, 'utf8', err => {
        if (err) throw err;
      });
    });
  }

  setSearchEngine(searchEngine: SearchEngineInterface) {
    this.searchEngine = searchEngine;
  }

  findSourceFiles = (settings: TLanguageSetting): TSourceMap[] => {
    const { sourcePaths, excludePaths } = settings;

    return sourcePaths.map(source => {
      const sourcePath = typeof source === 'string' ? source : source.path;
      const folderPath = path.resolve(process.cwd(), sourcePath);
      const exclude = (typeof source !== 'string' && source.exclude) || excludePaths;

      if (!fs.existsSync(folderPath)) {
        throw new Error(`${settings.name} source path not found: ${folderPath}. Did you forget to build your site before attempting to create a search index?`);
      }

      const pattern = `**/+(${this.config.sourceTypes.map(v => `*.${v}`).join('|')})`;

      const files = glob.sync(pattern, {
        cwd: folderPath,
        absolute: true,
        ignore: exclude,
      });

      if (process.env.BODILESS_SEARCH_DEBUG_PATHS === '1') {
        console.log(`[${settings.name}] Source path: ${folderPath}`);
        console.log(`[${settings.name}] Excluded paths: `, exclude);
        console.log(`[${settings.name}] Found files: `, files);
      }

      return {
        path: sourcePath,
        files,
      };
    });
  };

  /**
   * Returns index document created with given files.
   */
  filesToDocument = (sources: TSourceMap[]): TDocument[] => {
    const documents: TDocument[] = [];
    const selectors = this.config.contentSelectors;
    const excluders = this.config.contentExcluders;

    sources.forEach(source => {
      source.files
        .filter(filePath => fs.statSync(filePath).isFile())
        .forEach(filePath => {
          const mimeType = mime.getType(filePath);
          const sourcePath = path.join(process.cwd(), source.path);

          switch (mimeType) {
            case 'text/html': {
              const html = fs.readFileSync(filePath).toString();
              const doc = this.htmlToDocument(html, selectors, excluders);
              const filePathClean = filePath.replace(/index.html$/i, '').replace(/.html$/i, '');
              const link = path.relative(sourcePath, filePathClean);

              if (!doc.title) {
                // An empty link means this file is the site home page, since the file
                // is located at the source root folder. If the home page has no title,
                // we use '/' as a fallback.
                doc.title = link.length ? link : '/';
              }

              documents.push({
                ...doc,
                link,
              });

              break;
            }
            default:
              throw new Error(`Only HTML is supported for indexing, ${mimeType} was given.`);
          }
        });
    });

    return documents;
  };

  /**
   * Create index document from HTML content.
   */
  htmlToDocument = (html: string, selectors: string[], excluders: string[]): TDocument => {
    const $ = cheerio.load(html);
    const title = $('h1').text().trim() || $('title').text().trim();
    if (excluders) {
      $(excluders.join(',')).remove();
    }
    // eslint-disable-next-line func-names
    const body = $(selectors.join(',')).contents().map(function (this: CheerioNode) {
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

/**
 * Load search settings by searching for a `search.config.json` file on the
 * current execution directory. Returns false if the file isn't found.
 */
export class SearchConfig {
  static getConfig = (configFile: string): TSearchConf | false => {
    if (!configFile || !fs.statSync(configFile, { throwIfNoEntry: false })?.isFile()) return false;

    const {
      sourceTypes,
      contentSelectors,
      contentExcluders,
      languages,
      indexConfig,
    } = JSON.parse(fs.readFileSync(configFile, 'utf8'));

    return {
      sourceTypes,
      contentSelectors,
      contentExcluders,
      languages,
      indexConfig,
    };
  };
}

export default SearchTool;
