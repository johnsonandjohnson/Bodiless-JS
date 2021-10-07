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

import fs from 'fs';
import path from 'path';
import {
  formatJsx,
} from '../src/jsx-parser';
import {
  PageCreator,
  PageCreatorParams,
} from '../src/page-creator';
import {
  ComponentScope,
  HtmlToComponentsSettings,
} from '../src/html-to-components';
import debug from '../src/debug';
import { MigrationApi } from '../src/migrationApi';
import { GatsbyApp } from '../src/jamstack-app';

function getDefaultPageParams(): PageCreatorParams {
  jest.spyOn(fs, 'mkdirSync').mockImplementation(() => true);
  const defaultPageUrl = 'https://localhost';
  const sitePath = '/app/examples/test-site';
  return {
    pagesDir: path.join(sitePath, 'src/data/pages'),
    staticDir: path.join(sitePath, 'static'),
    templatePath: path.resolve(__dirname, 'data/canvasx_template.jsx'),
    templateDangerousHtml: path.resolve(__dirname, 'data/template_dangerous_html.jsx'),
    pageUrl: defaultPageUrl,
    bodyHtml: '<h1>Hello World</h1>',
    scripts: [
      'https://localhost/test1.js',
      '/test2.js',
      'https://code.jquery.com/jquery-3.4.1.min.js',
    ],
    inlineScripts: [
      'console.log(test);',
    ],
    styles: [
      'https://localhost/test1.css',
      '/test2.css',
      'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
    ],
    inlineStyles: [
      'p {color: red}',
    ],
    htmlTag: '<html class="class1 class2" data-widget="globalScriptsWidget"></html>',
    bodyTag: '<body class="class3 class4"></body>',
    images: [
      'https://localhost/gatsby.png',
      'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    ],
    downloadAssets: false,
    isEnabled: false,
    htmlToComponents: false,
    headHtml: `
      <base href="https://localhost/" />
      <link type = "text/css" rel = "stylesheet" href = "https://localhost/test1.css" />
      <!--[if lt IE 9]>
      <link type="text/css" rel="stylesheet" href="https://localhost/conditional.css" media="all" />
      <![endif]-->
      <link type = "text/css" rel = "stylesheet" href = "https://localhost/test2.css" />
      <link type = "text/css" rel = "stylesheet" href = "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
      <meta name = "MobileOptimized" content = "width" />
      <meta name = "pagetype" content = "home" >
      <script>var a = 4;</script>
      <style>.wrapper { max-width: 980px; }</style>
    `,
    migrationApi: MigrationApi.create({
      pageUrl: defaultPageUrl,
      app: new GatsbyApp({
        workDir: sitePath,
      }),
    }),
  };
}

function getExpectedContent(filePath: string): string {
  const expectedFilePath = path.resolve(__dirname, filePath);
  const expectedFileContent = fs.readFileSync(expectedFilePath).toString();
  return formatJsx(expectedFileContent);
}

function getFrontPageParams(): PageCreatorParams {
  return { ...getDefaultPageParams() };
}

function getProductsListingPageParams(): PageCreatorParams {
  return { ...getDefaultPageParams(), pageUrl: 'https://localhost/products' };
}

beforeAll(() => {
  // https://github.com/facebook/jest/issues/5792
  // eslint-disable-next-line no-console
  debug('workaround to get logs inside functions');
});

beforeEach(() => {
  jest.clearAllMocks();
});
afterEach(() => {
  jest.restoreAllMocks();
});

describe('creation of pages', () => {
  test('creation of frontpage', async () => {
    const params = {
      ...getFrontPageParams(),
      isEnabled: true,
      downloadAssets: false,
    };
    const expectedFileContent = getExpectedContent('data/canvasx_test_page.jsx');
    jest.spyOn(fs, 'mkdirSync').mockImplementation(() => true);
    const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => true);
    const pageCreator = new PageCreator(params);
    await pageCreator.createPage();
    expect(writeFileSyncSpy.mock.calls[0][0]).toBe(path.join(params.pagesDir, 'index.jsx'));
    expect(writeFileSyncSpy.mock.calls[0][1]).toBe(expectedFileContent);
  });

  // ToDo move shared logic outside
  test('creation of products page', async () => {
    const params = {
      ...getProductsListingPageParams(),
      isEnabled: true,
      downloadAssets: false,
    };
    const expectedFileContent = getExpectedContent('data/canvasx_test_page.jsx');
    jest.spyOn(fs, 'mkdirSync').mockImplementation(() => true);
    const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => true);
    const pageCreator = new PageCreator(params);
    await pageCreator.createPage();
    expect(writeFileSyncSpy.mock.calls[0][0]).toBe(path.join(params.pagesDir, 'products', 'index.jsx'));
    expect(writeFileSyncSpy.mock.calls[0][1]).toBe(expectedFileContent);
  });
});

describe('mapStaticPaths', () => {
  const params = getDefaultPageParams();
  const pageCreator = new PageCreator(params);

  test('one-level path image', () => {
    const expectedPath = path.join(params.staticDir, 'gatsby.png');
    expect(pageCreator.mapStaticPath('http://localhost/gatsby.png')).toBe(expectedPath);
  });
  test('two-level path image', () => {
    const expectedPath = path.join(params.staticDir, 'products/gatsby.png');
    expect(pageCreator.mapStaticPath('http://localhost/products/gatsby.png')).toBe(expectedPath);
  });
});

describe('extract and downloads assets from css', () => {
  const params = getDefaultPageParams();
  const pageCreator = new PageCreator(params);
  test('extract assets from two css files', () => {
    jest.spyOn(fs, 'mkdirSync').mockImplementation(() => true);
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => true);
    jest.spyOn(fs, 'readFileSync').mockImplementation((resource: any) => {
      switch (resource) {
        case path.join(params.staticDir, '1.css'):
          return 'p: {background-image:url(/misc/menu-expanded.png);} a: {background-image:url(https://localhost/search.png);} div: {background-image:url(https://external.com/gatsby.png);}';
        case path.join(params.staticDir, '2.css'):
          return 'a: {background-image:url(https://localhost/expanded.png);} div: {background-image:url(https://external.com/gatsby2.png);}';
        default:
          return '';
      }
    });
    const resources = pageCreator.getResourcesFromCSS(['1.css', '2.css']);
    expect(resources.length).toBe(3);
    expect(resources[0]).toBe('/misc/menu-expanded.png');
    expect(resources[1]).toBe('https://localhost/search.png');
    expect(resources[2]).toBe('https://localhost/expanded.png');
  });
});

describe('break monolithic html down to jsx components', () => {
  const bodyHtml = `
    <div>
      <header><h1>Test header</h1></header>
      <div class="search"><h3>Test search</h3></search>
      <footer><h2>Test footer</h2></footer>
    </div>
  `;
  const settings: HtmlToComponentsSettings = {
    rules:
      [
        {
          selector: 'header',
          component: 'Header',
          scope: ComponentScope.Global,
        },
        {
          selector: 'footer',
          component: 'Footer',
          scope: ComponentScope.Global,
        },
        {
          selector: '.search',
          component: 'Search',
          scope: ComponentScope.Local,
        },
      ],
  };

  test('break into header, footer, search', async () => {
    const params = {
      ...getFrontPageParams(),
      bodyHtml,
      isEnabled: true,
      downloadAssets: false,
      htmlToComponents: true,
      htmlToComponentsSettings: settings,
    };
    // applying the workaround since this file will be required after we mock fs
    const babelTypes = fs.readFileSync(require.resolve('@babel/types/package.json'));
    const jsesc = fs.readFileSync(require.resolve('jsesc/package.json'));
    const components: { [s: string]: string } = {};
    jest.spyOn(fs, 'mkdirSync').mockImplementation(() => true);
    jest.spyOn(fs, 'writeFileSync').mockImplementation(
      (path$: any, data: any) => {
        settings.rules.forEach(rule => {
          const componentFile = `${rule.component}.jsx`;
          if (path$.toString().endsWith(`.cache/${componentFile}`)) {
            components[componentFile] = data;
          }
        });
      },
    );
    jest.spyOn(fs, 'readFileSync').mockImplementation(
      (path$: any) => {
        if (path$.toString().endsWith('@babel/types/package.json')) {
          return babelTypes;
        }
        if (path$.toString().endsWith('jsesc/package.json')) {
          return jsesc;
        }
        let componentContent = '';
        settings.rules.forEach(rule => {
          const componentFile = `${rule.component}.jsx`;
          if (path$.toString().endsWith(`.cache/${componentFile}`)) {
            componentContent = components[componentFile];
          }
        });
        return componentContent;
      },
    );
    jest.spyOn(fs, 'readdirSync').mockImplementation(
      // @ts-ignore
      (path$: any) => {
        if (path$.toString().endsWith('.cache')) {
          return Object.keys(components);
        }
        return [];
      },
    );
    jest.spyOn(fs, 'existsSync').mockImplementation(
      (path$: any) => {
        if (path$.endsWith('.cache')) {
          return false;
        }
        if (path$.endsWith('.cache/Search.jsx')) {
          return true;
        }
        return true;
      },
    );
    const copySyncMock = jest.spyOn(fs, 'copyFileSync').mockImplementation(() => true);
    const pageCreator = new PageCreator(params);
    await pageCreator.createPage();
    expect(copySyncMock.mock.calls[0][0].toString().endsWith('.cache/Header.jsx')).toBeTruthy();
    expect(copySyncMock.mock.calls[0][1].toString().endsWith('src/components/Header.jsx')).toBeTruthy();
    expect(copySyncMock.mock.calls[1][0].toString().endsWith('.cache/Footer.jsx')).toBeTruthy();
    expect(copySyncMock.mock.calls[1][1].toString().endsWith('src/components/Footer.jsx')).toBeTruthy();
    expect(copySyncMock.mock.calls[2][0].toString().endsWith('.cache/Search.jsx')).toBeTruthy();
    expect(copySyncMock.mock.calls[2][1].toString().endsWith('src/data/pages/Search.jsx')).toBeTruthy();
  });
});
