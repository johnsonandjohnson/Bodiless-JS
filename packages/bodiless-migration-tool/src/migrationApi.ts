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

/* eslint class-methods-use-this: 0 */

import fs from 'fs';
import url from 'url';
import path from 'path';
import type { JamStackApp } from './jamstack-app';
import {
  trimQueryParamsFromUrl,
  removeExtensionFromUrl,
  ensureDirectoryExistence,
} from './helpers';

/**
 * defines types for MigrationApi constructor
 */
type MigrationApiParams = {
  /**
   * stores page data and site data directories
   */
  app: JamStackApp,
  /**
   * url of the migrated page
   */
  pageUrl: string,
};

/**
 * defines interface for migration api object
 * exposed to the plugins
 */
type MigrationApiType = {
  /**
   * writes json data to a file synchronously
   * replaces the file if it already exists
   * @param path - path to a file
   * @param data - the data to write
   */
  writeJsonFileSync(path: string, data: any): void,
  /**
   * maps a url to the file system directory containing corresponding page data
   * @param pageUrl - page url that should be mapped
   * if not specified, pageUrl passed to migration api constructor will be taken
   * @returns file system directory containing page data
   */
  getPagePath: (pageUrl?: string) => string,
  /**
   * provides directory containing global site data
   * @returns file system directory containing global site data
   */
  getSitePath: () => string,
  /**
   * return site static directory.
   */
  getStaticPath: () => string,
  /**
   * given full path of resource file, return the relative path under static folder.
   */
  getStaticRelativePath: (path: string) => string,
  /**
   * Given the file name, return an available file path under current page path.
   * - content checked to prevent duplicates.
   */
  getAvailableJsonFilename: (filename: string, content: {}) => string,
};

/**
 * maps page url into file system path
 * removes page url extensions
 * trims page query params
 * @param pageUrl - url that should be mapped
 * @returns filePath - file system path
 */
const getPagePathFromUrl = (pageUrl: string) => {
  let filePath = url.parse(pageUrl).path;
  if (filePath === undefined) {
    return '';
  }
  filePath = removeExtensionFromUrl(filePath);
  filePath = trimQueryParamsFromUrl(filePath);
  return filePath;
};

/**
 * Exposes migration tool api that can be consumed by external plugins
 */
class MigrationApi implements MigrationApiType {
  private app: JamStackApp;

  private pageUrl: string;

  constructor({ app, pageUrl }: MigrationApiParams) {
    this.app = app;
    this.pageUrl = pageUrl;
  }

  static create(params: MigrationApiParams) {
    return new MigrationApi(params);
  }

  public writeJsonFileSync(targetPath: string, data: any) {
    ensureDirectoryExistence(targetPath);
    return fs.writeFileSync(targetPath, this.jsonToString(data));
  }

  public getPagePath(pageUrl?: string) {
    const basePath = this.app.getPagesDir();
    const pagePath = getPagePathFromUrl(pageUrl || this.pageUrl);
    return path.join(basePath, pagePath);
  }

  public getSitePath() {
    return this.app.getSiteDataDir();
  }

  public getStaticPath() {
    return this.app.getStaticDir();
  }

  public getStaticRelativePath(fullPath: string): string {
    return fullPath.replace(this.getStaticPath(), '');
  }

  public getAvailableJsonFilename(filename: string, content: {}): string {
    const ext = path.extname(filename);
    const regex = `^(.*)-(\\d+)(${ext})$`;
    const filepath = path.resolve(this.getPagePath(), filename);
    if (!fs.existsSync(filepath)) {
      return filepath;
    }

    const data = fs.readFileSync(filepath, { encoding: 'utf8', flag: 'r' });
    if (data === this.jsonToString(content)) {
      return filepath;
    }

    let newFilename = '';
    const parsed = filename.match(new RegExp(regex));
    if (parsed) {
      const next = parseInt(parsed[2], 10) + 1;
      newFilename = `${parsed[1]}-${next}${parsed[3]}`;
    } else {
      newFilename = `${path.basename(filename, ext)}-1${ext}`;
    }
    return this.getAvailableJsonFilename(newFilename, content);
  }

  private jsonToString(json: {}): string {
    return JSON.stringify(json, null, 2);
  }
}

export { MigrationApi, getPagePathFromUrl };
export type { MigrationApiType };
