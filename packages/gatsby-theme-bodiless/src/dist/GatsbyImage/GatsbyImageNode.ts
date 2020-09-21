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

import { DefaultContentNode } from '@bodiless/core';

export default class GatsbyImageNode<D extends object> extends DefaultContentNode<D> {
  // @ts-ignore has no initializer and is not definitely assigned in the constructor
  private preset: string;

  static create(node: DefaultContentNode<object>, nodeKey: string, preset: string) {
    const path = [...node.path, nodeKey];
    const gatsbyImgNode = new GatsbyImageNode(node.getActions(), node.getGetters(), path);
    gatsbyImgNode.setPreset(preset);
    return gatsbyImgNode;
  }

  setPreset(preset: string) {
    this.preset = preset;
  }

  setData(dataObj: D) {
    const { setNode } = this.actions;
    setNode(this.path, {
      ...dataObj,
      preset: this.preset,
    });
  }
}
