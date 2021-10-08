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

const { createPages } = require('../gatsby-node');

jest.mock('path', () => ({
  ...jest.requireActual('path'),
  resolve: (...pathSegment: any) => [...pathSegment].join('/'),
}));

type EdgeFile = {
  relativePath: string,
};

const graphql = jest.fn();
const actions = {
  createPage: jest.fn(),
};
const getNode = jest.fn();

const prepareMocks = (files: EdgeFile[]) => {
  const generateGraphQlData = (files$: EdgeFile[]) => {
    const edges = files$.map(file => ({
      node: {
        relativePath: file.relativePath,
        internal: {
          type: 'File',
        },
      },
    }));
    return { data: { allDirectory: { edges: [] }, allFile: { edges } } };
  };
  graphql.mockResolvedValue(generateGraphQlData(files));
};

describe('createPages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  describe('preview pages for templates', () => {
    const templates = [
      {
        relativePath: '_default.jsx',
      },
    ];
    it('generates preview pages on development environment', async () => {
      process.env.NODE_ENV = 'development';
      prepareMocks(templates);
      await createPages({ actions, graphql, getNode });
      const expectedPage = {
        path: '/___templates/_default/',
        component: './src/templates/_default.jsx',
        context: {
          slug: '/___templates/_default/',
        },
      };
      expect(actions.createPage.mock.calls[0][0]).toStrictEqual(expectedPage);
    });
    it('does not generate templates on production environment', async () => {
      process.env.NODE_ENV = 'production';
      prepareMocks(templates);
      await createPages({ actions, graphql, getNode });
      expect(actions.createPage).not.toHaveBeenCalled();
    });
  });
});
