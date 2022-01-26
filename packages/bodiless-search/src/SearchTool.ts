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
  SearchToolInterface,
  TSearchConf,
  TLanguageSetting,
  TDocument,
  TSourceMap,
} from './types';
import LunrSearch from './LunrSearch';

const env2string = (envVar: string, defaultVar?: string): string => {
  if (typeof process.env[envVar] === 'undefined') {
    return defaultVar || '';
  }
  return process.env[envVar] || '';
};

const env2array = (envVar: string, defaultVar?: string[]): string[] => {
  if (typeof process.env[envVar] === 'undefined') {
    return defaultVar || [];
  }
  return process.env[envVar]!.split('|');
};

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
        throw new Error(`Invalid source path for the ${settings.name} language: ${folderPath}`);
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

          switch (mimeType) {
            case 'text/html': {
              const html = fs.readFileSync(filePath).toString();
              const doc = this.htmlToDocument(html, selectors, excluders);
              const filePathClean = filePath.replace(/index.html$/i, '');
              const link = path.relative(path.join(process.cwd(), source.path), filePathClean);

              if (!doc.title) {
                doc.title = link;
              }

              documents.push({
                ...doc,
                link,
              });

              break;
            }
            default:
              throw new Error(`Only HTML is supported for indexing, ${mimeType} is given.`);
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
    const body = $(selectors.join(',')).contents().map(function (this: cheerio.Element) {
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
 * Utility class for loading search related configuration.
 *
 * Search setting parameters are used for build index and frontend
 * search process. It's collected from environment variables, i.e.
 *   - BODILESS_SEARCH_PAGE
 *   - BODILESS_SEARCH_EXPIRES
 *  etc.
 *
 * or search configuration file specified with environment variable
 *   - BODILESS_SEARCH_CONFIG
 */

/**
 * load setting parameters from environment variables. If BODILESS_SEARCH_CONFIG
 * json configure file is defined, overrides all other search env variables.
 */
export class SearchConfig {
  static getConfig = (): TSearchConf => {
    const configFile = path.resolve(process.cwd(), env2string('BODILESS_SEARCH_CONFIG', ''));

    if (configFile && fs.statSync(configFile).isFile()) {
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
    }

    let searchEngine: SearchEngineInterface;
    const engine = env2string('BODILESS_SEARCH_ENGINE', '');

    switch (engine) {
      case 'lunr':
      default:
        searchEngine = new LunrSearch();
        break;
    }

    const sourcePaths = env2array('BODILESS_SEARCH_SOURCE_PATH', ['./public']);
    const sourceTypes = env2array('BODILESS_SEARCH_SOURCE_TYPE', ['html', 'htm']);
    const indexFilePath = env2string('BODILESS_SEARCH_INDEX_PATH', './public');
    const indexUrlName = '';
    const indexFileName = env2string('BODILESS_SEARCH_INDEX_NAME', 'lunr.json');
    const excludePaths = env2array('BODILESS_SEARCH_EXCLUDE_PATH', []);
    const contentSelectors = env2array('BODILESS_SEARCH_INDEX_SELECTOR', ['body *']);
    const contentExcluders = env2array(
      'BODILESS_SEARCH_INDEX_EXCLUDE_SELECTOR',
      ['script', 'noscript', 'style'],
    );
    const searchPath = env2string('BODILESS_SEARCH_PAGE', 'search');
    const indexConfig = {
      ref: 'id',
      fields: [
        { name: 'title', attributes: { boost: 2 } },
        { name: 'body' },
      ],
    };
    const languageSettings = {
      name: 'English',
      code: 'en',
      sourcePaths,
      excludePaths,
      indexFilePath,
      indexUrlName,
      indexFileName,
      searchPath,
    };

    return {
      searchEngine,
      sourceTypes,
      contentSelectors,
      contentExcluders,
      languages: [languageSettings],
      indexConfig,
    };
  };
}

export default SearchTool;
