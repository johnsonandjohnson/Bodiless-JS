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

/* eslint-disable max-len */

import { union } from 'lodash';
import { DefaultContentNode, Path } from '../ContentNode';
import type { ContentNode } from '../ContentNode';

/**
 * provides data for a particular default content key
 * can be used for merging default content data with a node data
 * @param node - content node of the type equal to node at the time withDefaultContent is invoked
 * @returns data of the node
 */
export type GetContentFrom<D extends object, E extends object = D> = (node: ContentNode<D>) => E;

type Content = {
  [nodePath: string]: any,
};

export const getRelativeNodeKey = (basePath: Path, nodePath: Path) => {
  const delimiter = '$';
  const baseNodeKey = Array.isArray(basePath) ? basePath.join(delimiter) : basePath;
  const baseNodeKeyLength = baseNodeKey.length + delimiter.length;
  const nodeKey = Array.isArray(nodePath) ? nodePath.join(delimiter) : nodePath;
  return nodeKey.startsWith(baseNodeKey) ? nodeKey.substring(baseNodeKeyLength) : nodeKey;
};

export const getAbsoluteNodeKey = (basePath: Path, contentPath: Path) => {
  const delimiter = '$';
  const basePathArray = Array.isArray(basePath) ? basePath : basePath.split(delimiter);
  const contentPathArray = Array.isArray(contentPath) ? contentPath : contentPath.split(delimiter);
  return basePathArray.concat(contentPathArray).join(delimiter);
};

// TODO: this class should expose a method that allows to check if node has value in store
export default class ContentfulNode<D extends object, K extends object> extends DefaultContentNode<D> {
  // @ts-ignore has no initializer and is not definitely assigned in the constructor
  protected sourceNode: DefaultContentNode<K>;

  // @ts-ignore has no initializer and is not definitely assigned in the constructor
  private content: Content;

  static create(node: DefaultContentNode<object>, content: object) {
    const contentfulNode = new ContentfulNode(node.getActions(), node.getGetters(), node.path);
    contentfulNode.setContent(content);
    contentfulNode.setSourceNode(node);
    return contentfulNode;
  }

  private getContentKey() {
    return getRelativeNodeKey(this.sourceNode.path, this.path);
  }

  private getDefaultContent() {
    const contentKey = this.getContentKey();
    const contentValue = this.content[contentKey];
    return contentValue || {};
  }

  public setContent(content: Content) {
    this.content = content;
  }

  public setSourceNode(node: DefaultContentNode<K>) {
    this.sourceNode = node;
  }

  /**
   * when default content is not a function
   * then take data from store
   * if data does not exist in store then return default content
   *
   * when default content is a function
   * then return data from the function
   * assuming the function is responsible for merging store data with default data
   */
  get data() {
    const defaultContent = this.getDefaultContent();
    if (typeof defaultContent === 'function') {
      // passing content node of the type equal to node at the time withDefaultContent is invoked
      return (defaultContent as GetContentFrom<D>)(this.sourceNode.peer(this.path));
    }
    const { getNode } = this.getters;
    const nodeData = getNode(this.path) as D;
    // @TODO: When we deprecate componentData, this will have to be updated.
    // We'll need to return our default content instead of the emptyValue.
    const isNodeDataEmpty = !nodeData || Object.keys(nodeData).length === 0;
    return !isNodeDataEmpty ? nodeData : defaultContent;
  }

  get keys() {
    const { getKeys } = this.getters;
    return union(
      getKeys(),
      Object.keys(this.content)
        .map(key => getAbsoluteNodeKey(this.sourceNode.path, key)),
    );
  }

  peer<E extends object>(path: Path) {
    const peerNode = new ContentfulNode<E, K>(this.actions, this.getters, path);
    peerNode.setContent(this.content);
    peerNode.setSourceNode(this.sourceNode);
    return peerNode;
  }
}
