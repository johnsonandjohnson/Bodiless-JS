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
const boundActionCreators = {
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
        directotyPath: 'pages/products/shampoo',
        filePath: `${basePath}/products/shampoo/index.json`,
        data: {
          '#template': 'product',
        },
      },
    ];
    it('creates a page with the specified template', async () => {
      prepareMocks(files);
      await createPages({ actions: boundActionCreators, graphql, getNode });
      const pageObject = boundActionCreators.createPage.mock.calls[0][0];
      const expected = {
        path: '/products/shampoo/',
        component: './src/templates/product.jsx',
        context: {
          slug: '/products/shampoo/',
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
        directotyPath: 'pages/products/shampoo',
        filePath: `${basePath}/products/shampoo/index.json`,
        data: {
        },
      },
    ];
    it('creates subpage with template specified in the parent page', async () => {
      prepareMocks(files);
      await createPages({ actions: boundActionCreators, graphql, getNode });
      const parentPageObject = boundActionCreators.createPage.mock.calls[0][0];
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
      const childPageObject = boundActionCreators.createPage.mock.calls[1][0];
      const childExpected = {
        path: '/products/shampoo/',
        component: './src/templates/product.jsx',
        context: {
          slug: '/products/shampoo/',
          subPageTemplate: 'product',
          template: 'product',
        },
      };
      expect(childPageObject).toStrictEqual(childExpected);
    });
  });
});
