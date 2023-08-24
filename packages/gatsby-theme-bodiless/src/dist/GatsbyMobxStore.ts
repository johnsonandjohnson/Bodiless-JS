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

import { BodilessMobxStore } from '@bodiless/core';

type BodilessNode = {
  node: {
    content: string;
    name: string;
  };
};

type PageTreeNode = {
  node: {
    relativePath: string,
  }
};

type PageTreeData = {
  Pages?: {
    edges: PageTreeNode[],
  }
};

type BodilessData = {
  [collection: string]: {
    edges: BodilessNode[];
  };
};

type GatsbyData = BodilessData&PageTreeData;

export default class GatsbyMobxStore extends BodilessMobxStore<GatsbyData> {
  // eslint-disable-next-line class-methods-use-this
  protected parseData(gatsbyData$: GatsbyData) {
    const { Pages = { edges: [] }, ...gatsbyData } = gatsbyData$;
    const result = new Map();
    Object.keys(gatsbyData).forEach(collection => {
      if (gatsbyData[collection] === null) return;
      gatsbyData[collection].edges.forEach(({ node }) => {
        try {
          // Namespace the key name to the query name.
          const key = `${collection}${BodilessMobxStore.nodeChildDelimiter}${node.name}`;
          const data = JSON.parse(node.content);
          result.set(key, data);
        } catch (e) {
          // console.log(e);
          // Just ignore any nodes which fail to parse.
        }
      });
    });
    const pages = Pages.edges.map(
      ({ node }) => node.relativePath.split('/').slice(1).join('/'),
    ).filter(p => !!p);
    result.set('Site$_pages', pages);
    return result;
  }
}
