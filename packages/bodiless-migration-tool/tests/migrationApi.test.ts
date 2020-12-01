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

import path from 'path';
import { MigrationApi, getPagePathFromUrl } from '../src/migrationApi';
// import * as app from '../src/jamstack-app';
const { GatsbyApp } = require('../src/jamstack-app');

jest.mock('../src/jamstack-app');

describe('MigrationApi', () => {
  describe('getPagePathFromUrl', () => {
    it('converts frontpage url to path', () => {
      expect(getPagePathFromUrl('/')).toBe('/');
    });
    it('converts basic 2-level url to path', () => {
      expect(getPagePathFromUrl('/products')).toBe('/products');
    });
    it('converts page url with extension to path', () => {
      expect(getPagePathFromUrl('/products.html')).toBe('/products');
    });
  });

  describe('Static path methods', () => {
    const workDir = '/path/to/workDir';
    const gatsbyApp = new GatsbyApp();
    gatsbyApp.getStaticDir = () => path.resolve(workDir, 'static');

    const params = {
      app: gatsbyApp,
      pageUrl: 'http://host/path/to/page/',
    };
    const migrationApi = new MigrationApi(params);
    it('returns correct static folder', () => {
      expect(migrationApi.getStaticPath()).toBe(`${workDir}/static`);

      const fullResourcePath = `${workDir}/static/path/to/resource`;
      expect(migrationApi.getStaticRelativePath(fullResourcePath)).toBe('/path/to/resource');
    });
  });
});
