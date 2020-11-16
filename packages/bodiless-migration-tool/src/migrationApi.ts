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
} from './helpers';

type MigrationApiParams = {
  app: JamStackApp,
  pageUrl: string,
};

type MigrationApiType = {
  writeJsonFileSync(path: string, data: any): void,
  getPagePath: (pagePath?: string) => string,
  getSitePath: () => string,
};

const getPagePathFromUrl = (pageUrl: string) => {
  let filePath = url.parse(pageUrl).path;
  if (filePath === undefined) {
    return '';
  }
  filePath = removeExtensionFromUrl(filePath);
  filePath = trimQueryParamsFromUrl(filePath);
  return filePath;
};

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

  public writeJsonFileSync(path$: string, data: any) {
    return fs.writeFileSync(path$, JSON.stringify(data, null, 2));
  }

  public getPagePath(pageUrl?: string) {
    const basePath = this.app.getPagesDir();
    const pagePath = getPagePathFromUrl(pageUrl || this.pageUrl);
    return path.join(basePath, pagePath);
  }

  public getSitePath() {
    return this.app.getSiteDataDir();
  }
}

export { MigrationApi };
export type { MigrationApiType };
