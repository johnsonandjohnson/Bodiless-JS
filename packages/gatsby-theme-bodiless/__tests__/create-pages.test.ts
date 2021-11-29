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

import { validatePageUrl } from '../src/dist/PageOperations/utils';

describe('validatePath', () => {
  it('Should return undefined when the path is valid.', () => {
    const path = 'shampoo_1';
    expect(validatePageUrl(path)).toBeUndefined();
  });
  it('Should return a string warning when the path contains special chars', () => {
    const path = 'sha##mpoo';
    expect(typeof validatePageUrl(path)).toBe('string');
  });
  it('Should return a string warning when the path contains uppercase letters', () => {
    const path = 'Shampoo';
    expect(typeof validatePageUrl(path)).toBe('string');
  });
  it('Should return a string warning when the path contains spaces', () => {
    const path = 'shampo o1';
    expect(typeof validatePageUrl(path)).toBe('string');
  });
  it('Should return a string warning when the path starts/ends with _ or -', () => {
    const path1 = 'shampoo_';
    const path2 = '-shampoo';
    expect(typeof validatePageUrl(path1)).toBe('string');
    expect(typeof validatePageUrl(path2)).toBe('string');
  });
});

describe('validateUrl', () => {
  it('Should return undefined when the url is valid.', () => {
    const url = '/products/shampoo_1';
    expect(validatePageUrl(url)).toBeUndefined();
  });
  it('Should return a string warning when the url is empty.', () => {
    const url = '';
    expect(typeof validatePageUrl(url)).toBe('string');
  });
  it('Should return a string warning when the url contains special chars.', () => {
    const url = '/products/shampoo@1';
    expect(typeof validatePageUrl(url)).toBe('string');
  });
  it('Should return a string warning when the url starts/ends with _ or -', () => {
    const url1 = '/products/shampoo_';
    const url2 = '-/products/shampoo';
    expect(typeof validatePageUrl(url1)).toBe('string');
    expect(typeof validatePageUrl(url2)).toBe('string');
  });
});

export {};

const fs = require('fs');
const { createPages } = require('../gatsby-node');

jest.mock('fs');
jest.mock('path', () => ({
  ...jest.requireActual('path'),
  resolve: (...pathSegment: any) => [...pathSegment].join('/'),
}));

type EdgeFile = {
  directotyPath: string,
  filePath: string,
  data: any,
};

const graphql = jest.fn();
const actions = {
  createPage: jest.fn(),
};
const getNode = jest.fn();

const prepareMocks = (files: EdgeFile[]) => {
  fs.existsSync.mockImplementation((path$: string) => files.some(file => path$ === file.filePath));

  fs.readFileSync.mockImplementation((path$: string) => {
    let data = '';
    files.some(file => {
      if (file.filePath === path$) {
        data = JSON.stringify(file.data);
        return true;
      }
      return false;
    });
    return data;
  });

  const generateGraphQlData = (files$: EdgeFile[]) => {
    const edges = files$.map(file => ({
      node: {
        relativePath: file.directotyPath,
        internal: {
          type: 'Directory',
        },
      },
    }));
    return { data: { allDirectory: { edges }, allFile: { edges: [] } } };
  };
  graphql.mockResolvedValue(generateGraphQlData(files));
};

describe('createPages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  describe('when a template is specified for a page in index.json', () => {
    const basePath = './src/data/pages';
    const files = [
      {
        directotyPath: 'pages/products/shampoo_1',
        filePath: `${basePath}/products/shampoo_1/index.json`,
        data: {
          '#template': 'product',
        },
      },
    ];
    it('creates a page with the specified template', async () => {
      prepareMocks(files);
      await createPages({ actions, graphql, getNode });
      const pageObject = actions.createPage.mock.calls[0][0];
      const expected = {
        path: '/products/shampoo_1/',
        component: './src/templates/product.jsx',
        context: {
          slug: '/products/shampoo_1/',
          template: 'product',
          subPageTemplate: 'product',
        },
      };
      expect(pageObject).toStrictEqual(expected);
    });
  });
  describe('when a parent page specifies subpage template', () => {
    const basePath = './src/data/pages';
    const files = [
      {
        directotyPath: 'pages/products',
        filePath: `${basePath}/products/index.json`,
        data: {
          '#template': '_default',
          '#subpage_template': 'product',
        },
      },
      {
        directotyPath: 'pages/products/shampoo_1',
        filePath: `${basePath}/products/shampoo_1/index.json`,
        data: {
        },
      },
    ];
    it('creates subpage with template specified in the parent page', async () => {
      prepareMocks(files);
      await createPages({ actions, graphql, getNode });
      const parentPageObject = actions.createPage.mock.calls[0][0];
      const parentExpected = {
        path: '/products/',
        component: './src/templates/_default.jsx',
        context: {
          slug: '/products/',
          subPageTemplate: 'product',
          template: '_default',
        },
      };
      expect(parentPageObject).toStrictEqual(parentExpected);
      const childPageObject = actions.createPage.mock.calls[1][0];
      const childExpected = {
        path: '/products/shampoo_1/',
        component: './src/templates/product.jsx',
        context: {
          slug: '/products/shampoo_1/',
          subPageTemplate: 'product',
          template: 'product',
        },
      };
      expect(childPageObject).toStrictEqual(childExpected);
    });
  });
});
