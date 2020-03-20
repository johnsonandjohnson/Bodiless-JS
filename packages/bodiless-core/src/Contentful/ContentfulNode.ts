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

import { ContentNode } from '../ContentNode';

type Path = string | string[];

// TODO: since we want to adjust data method only and proxy other ContentNode methods
// consider a way how to avoid duplicating all methods that ContentNode has
// TODO: this class should expose a method that allows to check if node has value in store
export class ContentfulNode<D extends object> implements ContentNode<D> {
  private node: ContentNode<D>;
  private content: D;

  constructor(contentNode: ContentNode<D>, content: D) {
    this.node = contentNode;
    this.content = content;
  }

  get data() {
    const nodeData = this.node.data;
    const isNodeDataEmpty = Object.keys(nodeData).length === 0;
    return !isNodeDataEmpty ? nodeData : this.content;
  }

  setData(dataObj: D) {
    this.node.setData(dataObj);
  }

  delete(path?: Path) {
    this.node.delete(path);
  }

  get keys() {
    return this.node.keys;
  }

  get path() {
    return this.node.path;
  }

  peer<E extends object>(path: Path) {
    const contentNode = this.node.peer(path);
    return new ContentfulNode(contentNode, this.content) as unknown as ContentNode<E>;
  }

  // ToDo: avoid copy pasting from DefaultContentNode class
  child<E extends object>(path: string) {
    const paths = Array.isArray(path) ? path : [path];
    return this.peer<E>([...this.path, ...paths]);
  }
}
