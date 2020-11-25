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

import { observable, action } from 'mobx';
import { isString } from 'util';

class DummyContentNodeStore {
  @observable data = {};

  @action setData(newData: any) {
    this.data = { ...newData };
  }

  constructor(initialData: any) {
    this.data = { ...initialData };
  }
}

export type Actions = {
  setNode(path: string[], data: any): void;
  deleteNode(path: string[]): void;
};

export type Getters = {
  getNode(path: string[]): any;
  getKeys(): string[];
  hasError(): boolean;
  getPagePath(): string;
  getBaseResourcePath(collection: string): string;
};

export type Path = string | string[];

export type ContentNode<D> = {
  data: D;
  setData: (data: D) => void;
  delete: (path?: Path) => void;
  keys: string[];
  path: string[];
  pagePath: string;
  baseResourcePath: string;
  child<E extends object>(path: string): ContentNode<E>;
  peer<E extends object>(path: Path): ContentNode<E>;
  hasError: () => boolean;
};

export class DefaultContentNode<D extends object> implements ContentNode<D> {
  protected actions: Actions;

  protected getters: Getters;

  path: string[];

  constructor(actions: Actions, getters: Getters, path: Path) {
    this.actions = actions;
    this.getters = getters;
    const path$1 = path || [];
    this.path = Array.isArray(path$1) ? path$1 : path$1.split('$');
  }

  peer<E extends object>(path: Path) {
    return new DefaultContentNode<E>(this.actions, this.getters, path);
  }

  child<E extends object>(path: Path) {
    const paths = Array.isArray(path) ? path : [path];
    return this.peer<E>([...this.path, ...paths]);
  }

  get data() {
    const { getNode } = this.getters;
    return getNode(this.path) as D;
  }

  get pagePath() {
    const { getPagePath } = this.getters;
    return getPagePath();
  }

  get baseResourcePath() {
    const { getBaseResourcePath } = this.getters;
    return getBaseResourcePath('page');
  }

  setData(dataObj: D) {
    const { setNode } = this.actions;
    setNode(this.path, dataObj);
  }

  delete(path?: Path) {
    const { deleteNode } = this.actions;
    const path$ = isString(path) ? [path] : path;
    const path$$ = path$ || this.path;
    deleteNode(path$$);
  }

  get keys() {
    const { getKeys } = this.getters;
    return getKeys();
  }

  get hasError() {
    const { hasError } = this.getters;
    return hasError;
  }

  getGetters() {
    return this.getters;
  }

  getActions() {
    return this.actions;
  }

  static dummy(path = 'root', initialData = {}) {
    const path$1 = Array.isArray(path) ? path : path.split('$');
    const store = new DummyContentNodeStore(initialData);
    const getNode = () => store.data;
    const getKeys = () => path$1;
    const getPagePath = () => '/';
    const getBaseResourcePath = () => '/';
    const hasError = () => false;
    const setNode = (p: Path, d: any) => {
      store.setData(d);
    };
    const deleteNode = () => {};
    const getters = {
      getNode, getKeys, hasError, getPagePath, getBaseResourcePath,
    };
    const actions = { setNode, deleteNode };
    return new DefaultContentNode(actions, getters, path$1);
  }
}
