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

/* eslint max-len: 0 */
import fs from 'fs';
import path from 'path';
import {
  deleteFolderRecursive,
} from '../src/helpers';
import {
  SiteFlattener,
  SiteFlattenerParams,
  TransformerRule,
} from '../src/site-flattener';

import TestServer from './testserver';

// ToDo move test server setup logic to a separate file. shared with scrape-site.ts
const assetsPath = path.join(__dirname, 'testserver', 'assets');
const port = 8907;
const serverUrl = `http://127.0.0.1:${port}`;
const server = new TestServer(assetsPath, port);

function getWorkDir() {
  return 'test-app';
}

function getWorkDirFullPath() {
  return path.resolve(__dirname, '..', getWorkDir());
}

beforeAll(async () => {
  deleteFolderRecursive(getWorkDirFullPath());
  fs.mkdirSync(getWorkDirFullPath());
  await server.start();
});

afterAll(async () => {
  deleteFolderRecursive(getWorkDirFullPath());
  await server.stop();
});

function getDefaultFlattenedParams(): SiteFlattenerParams {
  return {
    websiteUrl: serverUrl,
    workDir: getWorkDirFullPath(),
    scraperParams: {
      pageUrl: serverUrl,
      maxDepth: 5,
      maxConcurrency: 1,
      javascriptEnabled: true,
    },
    steps: {
      setup: false,
      scrape: true,
      startDev: false,
      build: false,
      serve: false,
    },
    transformers: [
      {
        rule: TransformerRule.Replace,
        selector: '.share-buttons',
        replacement: '<div>share buttons</div>',
        context: '**/shampoo/**',
      },
      {
        rule: TransformerRule.ToComponent,
        selector: 'header',
        replacement: 'Header',
        context: '/',
      },
    ],
    htmltojsx: false,
  };
}

function getPathInWorkDir(path$: string) {
  return path.resolve(getWorkDirFullPath(), path$);
}

function existsInWorkDir(path$: string) {
  return fs.existsSync(getPathInWorkDir(path$));
}

jest.setTimeout(30000);

test('flattening of the test website', async () => {
  const siteFlattener = new SiteFlattener(getDefaultFlattenedParams());
  await siteFlattener.start();
  expect(existsInWorkDir('src/data/pages/index.jsx')).toBe(true);
  expect(existsInWorkDir('static/gatsby.png')).toBe(true);
  expect(existsInWorkDir('static/test1.js')).toBe(true);
  expect(existsInWorkDir('static/test2.css')).toBe(true);
  expect(existsInWorkDir('static/non-existing-file.css')).toBe(false);
  // asset loaded by xhr
  expect(existsInWorkDir('static/lazy-loaded.js')).toBe(true);
}, 30000);

test('tranforming of html during website flattening', async () => {
  const productsUrl = `${serverUrl}/products/index.html`;
  const params: SiteFlattenerParams = {
    ...getDefaultFlattenedParams(),
    websiteUrl: productsUrl,
    scraperParams: {
      ...getDefaultFlattenedParams().scraperParams,
      pageUrl: productsUrl,
    },
    htmltojsx: true,
  };
  const siteFlattener = new SiteFlattener(params);
  await siteFlattener.start();
  const parentPath = getPathInWorkDir('src/data/pages/products/index.jsx');
  const childPath = getPathInWorkDir('src/data/pages/products/shampoo/index.jsx');
  expect(fs.existsSync(parentPath)).toBe(true);
  expect(fs.existsSync(childPath)).toBe(true);
  // const parentIndexPage = require(parentPath).default
  // const parentMarkup = renderToStaticMarkup(React.createElement(parentIndexPage))
  // const childIndexPage = require(childPath).default
  // const childMarkup = renderToStaticMarkup(React.createElement(childIndexPage))
  // expect(cheerio('html', parentMarkup).length).toBe(0)
  // dynamic blocks remove
  // expect(cheerio('.share-buttons', parentMarkup).length).toBe(1)
  // expect(cheerio('.share-buttons', childMarkup).length).toBe(0)
  // absolute to relative url transformation
  // expect(cheerio('#link-to-product', parentMarkup)[0].attribs.href).toBe('/products/shampoo/index.html')
  // remove trailing slash
  // expect(cheerio('#absolute-link', parentMarkup)[0].attribs.href).toBe('/products/shampoo/index.html')
  // relative to internal url transformation
  // expect(cheerio('#with-trailing-slash-link', parentMarkup)[0].attribs.href).toBe('/products/shampoo/')
  // external link should not be processed
  // expect(cheerio('#external-link', parentMarkup)[0].attribs.href).toBe('http://externaldomain.com/test/url')
  // slash appended to canonical url
  // expect(cheerio('#canonical-link', parentMarkup)[0].attribs.href).toBe('http://127.0.0.1:8907/products/')
  // attribute transformation
  // expect(cheerio('#attr-with-xmlnamespace', parentMarkup)[0].attribs["xmlns:fb"]).toBeUndefined()
  // expect(cheerio('#attr-with-xmlnamespace', parentMarkup)[0].attribs["fakexmlnsfb"]).toBe('http://www.facebook.com')
  // to extend the test
}, 30000);

test('migration of attached files', async () => {
  const attachedFilesUrl = `${serverUrl}/attached_files.html`;
  const params: SiteFlattenerParams = {
    ...getDefaultFlattenedParams(),
    websiteUrl: attachedFilesUrl,
    scraperParams: {
      ...getDefaultFlattenedParams().scraperParams,
      pageUrl: attachedFilesUrl,
      maxDepth: 2,
    },
  };
  const siteFlattener = new SiteFlattener(params);
  await siteFlattener.start();
  const sourcePath = path.join(__dirname, 'testserver', 'assets', 'files', 'test.pdf');
  const targetPath = getPathInWorkDir('static/files/test.pdf');
  expect(fs.existsSync(targetPath)).toBe(true);
  // filesize of the downloaded file should be the same to the source file
  expect(fs.statSync(sourcePath).size).toBe(fs.statSync(targetPath).size);
}, 30000);
