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

describe('gatsby-node', () => {
  const actions: any = {};
  const generateData = (n: number) => {
    const edges = Array.from({ length: n }, (v, k) => k + 1).map((val, i) => ({
      node: {
        fields: {
          slug: `/pages/2017-04-18--article-${i + 1}/`,
        },
        relativePath: `pages/2017-04-18--article-${i + 1}`,
        frontmatter: {
          tags: ['starter', 'gatsby'],
        },
        internal: {
          type: 'page',
        },
      },
    }));

    return { data: { allDirectory: { edges }, allFile: { edges: [] } } };
  };

  describe('createPages', () => {
    let graphql: any;
    let getNode: any;

    beforeEach(() => {
      jest.clearAllMocks();

      actions.createPage = jest.fn();
      graphql = jest.fn();
      getNode = jest.fn();
    });

    it('should create all pages', () => {
      const countPages = 5;
      fs.existsSync.mockReturnValue(true);

      graphql.mockResolvedValue(generateData(countPages));
      return createPages({ actions, graphql, getNode })
        .then(() => {
          // expect(actions.createPage.mock.calls).toMatchSnapshot();
          expect(actions.createPage.mock.calls.length).toBe(countPages);
        });
    });

    it('should create 1 page of 5 pages', () => {
      const countPages = 5;
      fs.existsSync.mockReturnValueOnce(true);

      graphql.mockResolvedValue(generateData(countPages));
      return createPages({ actions, graphql, getNode })
        .then(() => {
          // expect(actions.createPage.mock.calls).toMatchSnapshot();
          expect(actions.createPage.mock.calls.length).toBe(countPages);
        });
    });

    it('should not create any pages', () => {
      const countPages = 5;
      fs.existsSync.mockReturnValueOnce(false);

      graphql.mockResolvedValue(generateData(countPages));
      return createPages({ actions, graphql, getNode })
        .then(() => {
          // expect(actions.createPage.mock.calls).toMatchSnapshot();
          expect(actions.createPage.mock.calls.length).toBe(countPages);
        });
    });
  });
});
