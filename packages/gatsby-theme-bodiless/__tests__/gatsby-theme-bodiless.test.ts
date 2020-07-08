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

import GatsbyMobxStore from '../src/dist/GatsbyMobxStore';

const data = {
  Page: {
    edges: [
      {
        node: {
          name: 'linkit',
          content: '{\n  "href": "Now is the time sdf"\n}',
          fields: {
            slug: '/context/',
          },
        },
      },
    ],
  },
  Site: {
    edges: [
      {
        node: {
          name: 'body',
          content: '{\n  "document": {\n    "object": "document",\n    "data": {},\n    "nodes": [\n      {\n        "object": "block",\n        "type": "paragraph",\n        "data": {},\n        "nodes": [\n          {\n            "object": "text",\n            "leaves": [\n              {\n                "object": "leaf",\n                "text": "body",\n                "marks": []\n              }\n            ]\n          }\n        ]\n      }\n    ]\n  }\n}',
          fields: {
            slug: '../site/',
          },
        },
      },
      {
        node: {
          name: 'sitedata-1',
          content: '{\n  "#type": "LinkData",\n  "text": "SITE DATA ONLY #1",\n  "href": "http://foobar.com"\n}\n',
          fields: {
            slug: '../site/',
          },
        },
      },
      {
        node: {
          name: 'sitedata-2',
          content: '{\n  "#type": "TextData",\n  "text": "SITE DATA #2: w is the   time for all really good men to come to the aid of their country."\n}\n',
          fields: {
            slug: '../site/',
          },
        },
      },
      {
        node: {
          name: 'title',
          content: '{\n  "document": {\n    "object": "document",\n    "data": {},\n    "nodes": [\n      {\n        "object": "block",\n        "type": "paragraph",\n        "data": {},\n        "nodes": [\n          {\n            "object": "text",\n            "leaves": [\n              {\n                "object": "leaf",\n                "text": "title",\n                "marks": []\n              }\n            ]\n          }\n        ]\n      }\n    ]\n  }\n}',
          fields: {
            slug: '../site/',
          },
        },
      },
      {
        node: {
          name: 'sitedata-3',
          content: '{\n  "text": "SITE DATA #3 Text go   jfjffes here."\n}\n',
          fields: {
            slug: '../site/',
          },
        },
      },
    ],
  },
};

const client = {
  savePath: jest.fn(() => Promise.resolve({})),
};

const dataSource = {
  slug: 'slug',
};

describe('GatsbyMobxStore', () => {
  it('Processes data correctly', () => {
    // @ts-ignore
    const store = new GatsbyMobxStore(dataSource, client);
    store.updateData(data);
    /* eslint no-console: ["error", { allow: ["log"] }] */
    console.log(store.store);
  });
});
