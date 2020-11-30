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

import { union } from 'lodash';
import { DefaultContentNode, Path } from '../ContentNode';

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
export default class ContentfulNode<D extends object> extends DefaultContentNode<D> {
  private baseContentPath: Path = [];

  // @ts-ignore has no initializer and is not definitely assigned in the constructor
  private content: D;

  static create(node: DefaultContentNode<object>, content: object) {
    const contentfulNode = new ContentfulNode(node.getActions(), node.getGetters(), node.path);
    contentfulNode.setContent(content);
    contentfulNode.setBaseContentPath(node.path);
    return contentfulNode;
  }

  private getContentKey() {
    return getRelativeNodeKey(this.baseContentPath, this.path);
  }

  private getDefaultContent() {
    const contentKey = this.getContentKey();
    return (this.content as any)[contentKey] || {};
  }

  public setContent(content: D) {
    this.content = content;
  }

  public setBaseContentPath(path: Path) {
    this.baseContentPath = path;
  }

  get data() {
    const { getNode } = this.getters;
    const nodeData = getNode(this.path) as D;
    // @TODO: When we deprecate componentData, this will have to be updated.
    // We'll need to return our default content instead of the emptyValue.
    const isNodeDataEmpty = !nodeData || Object.keys(nodeData).length === 0;
    return !isNodeDataEmpty ? nodeData : this.getDefaultContent();
  }

  get keys() {
    const { getKeys } = this.getters;
    return union(
      getKeys(),
      Object.keys(this.content)
        .map(key => getAbsoluteNodeKey(this.baseContentPath, key)),
    );
  }

  peer(path: Path) {
    const peerNode = new ContentfulNode<object>(this.actions, this.getters, path);
    peerNode.setContent(this.content);
    peerNode.setBaseContentPath(this.baseContentPath);
    return peerNode;
  }
}
