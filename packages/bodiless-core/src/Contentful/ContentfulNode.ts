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

import { DefaultContentNode } from '../ContentNode';

// ToDo: export from Contentful node
type Path = string | string[];

type ContentfulNodeContent = object | Function;

export const getRelativeNodeKey = (basePath: Path, nodePath: Path) => {
  const baseNodeKey = Array.isArray(basePath) ? basePath.join('$') : basePath;
  const nodeKey = Array.isArray(nodePath) ? nodePath.join('$') : nodePath;
  // ToDo: get rid of + 1 or document why it is needed
  return nodeKey.startsWith(baseNodeKey) ? nodeKey.substring(baseNodeKey.length + 1) : nodeKey;
};

// TODO: this class should expose a method that allows to check if node has value in store
// eslint-disable-next-line max-len
export default class ContentfulNode<D extends ContentfulNodeContent> extends DefaultContentNode<D> {
  // @ts-ignore has no initializer and is not definitely assigned in the constructor
  private baseContentPath: Path;

  // @ts-ignore has no initializer and is not definitely assigned in the constructor
  private content: D;

  // eslint-disable-next-line max-len
  static create(storeNode: DefaultContentNode<ContentfulNodeContent>, content: ContentfulNodeContent) {
    // eslint-disable-next-line max-len
    const contentfulNode = new ContentfulNode(storeNode.getActions(), storeNode.getGetters(), storeNode.path);
    contentfulNode.setContent(content);
    contentfulNode.setBaseContentPath(storeNode.path);
    return contentfulNode;
  }

  private getContentKey() {
    return getRelativeNodeKey(this.baseContentPath, this.path);
  }

  private getDefaultContent() {
    const contentKey = this.getContentKey();
    if (typeof this.content === 'function') {
      // @ts-ignore ToDo: remediate this one
      return this.content(contentKey);
    }
    // @ts-ignore
    return this.content[contentKey];
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
    const isNodeDataEmpty = !nodeData || Object.keys(nodeData).length === 0;
    return !isNodeDataEmpty ? nodeData : this.getDefaultContent();
  }

  peer<E extends ContentfulNodeContent>(path: Path) {
    const peerNode = new ContentfulNode<E>(this.actions, this.getters, path);
    // @ts-ignore ToDo: resolve types
    peerNode.setContent(this.content);
    peerNode.setBaseContentPath(this.baseContentPath);
    return peerNode;
  }
}
