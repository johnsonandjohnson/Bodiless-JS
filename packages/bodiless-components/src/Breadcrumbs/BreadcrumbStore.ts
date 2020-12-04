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

/* eslint-disable no-underscore-dangle */

import { observable, action, computed } from 'mobx';

type BreadcrumbItemTitle = {
  // ToDo: Remove it, there is no need to store it here
  data: string | object;
  nodePath: string;
};
type BreadcrumbItemLink = {
  data: string ;
  nodePath: string;
};
type BreadcrumbItemSettings = {
  uuid: string;
  parent?: BreadcrumbItemType;
  title: BreadcrumbItemTitle;
  link: BreadcrumbItemLink;
  store: BreadcrumbStoreType;
};
export type BreadcrumbItemType = {
  setTitle: (title: BreadcrumbItemTitle) => void,
  setLink: (link: BreadcrumbItemLink) => void,
  uuid: string,
  title: BreadcrumbItemTitle;
  link: BreadcrumbItemLink;
  isSubpathOf: (item: BreadcrumbItemType | string) => boolean;
  hasPath: (item: BreadcrumbItemType | string) => boolean;
  isAncestorOf: (item: BreadcrumbItemType) => boolean;
  isDescendantOf: (item: BreadcrumbItemType) => boolean;
  isEqual: (item: BreadcrumbItemType | string) => boolean;
  isFirst: () => boolean;
  isLast: () => boolean;
  isActive: () => boolean;
  getAncestors: () => BreadcrumbItemType[];
  parent: BreadcrumbItemType | undefined;
};

const DEFAULT_URL_BASE = 'http://host';

const trimTrailingSlash = (str: string) => str.replace(/\/$/, '');

const isChildOf = (child: string, parent: string) => {
  if (child === parent) return false;
  const childTokens = child.split('/').filter(i => i.length);
  const parentTokens = parent.split('/').filter(i => i.length);
  return parentTokens.every((t, i) => childTokens[i] === t);
};

/**
 * Stores breadcrumb item data.
 */
export class BreadcrumbItem implements BreadcrumbItemType {
  _uuid: string;

  _parent?: BreadcrumbItemType;

  _title: BreadcrumbItemTitle;

  _link: BreadcrumbItemLink;

  _store: BreadcrumbStoreType;

  constructor({
    uuid,
    title,
    link,
    store,
    parent,
  }: BreadcrumbItemSettings) {
    this._uuid = uuid;
    this._parent = parent;
    this._title = title;
    this._link = link;
    this._store = store;
  }

  isActive(): boolean {
    return Boolean(
      this._store.breadcrumbTrail.find(tItem => tItem.isEqual(this)),
    );
  }

  isSubpathOf(item: BreadcrumbItemType | string) {
    const base = DEFAULT_URL_BASE;
    const itemURL = typeof item === 'string' ? new URL(item, base) : new URL(item.link.data, base);
    const thisURL = new URL(this.link.data, base);
    if (itemURL.host !== thisURL.host) return false;
    return isChildOf(itemURL.pathname, thisURL.pathname);
  }

  hasPath(item: BreadcrumbItemType | string) {
    const base = DEFAULT_URL_BASE;
    const itemURL = typeof item === 'string' ? new URL(item, base) : new URL(item.link.data, base);
    const thisURL = new URL(this.link.data, base);
    if (itemURL.host !== thisURL.host) return false;
    return trimTrailingSlash(thisURL.pathname) === trimTrailingSlash(itemURL.pathname);
  }

  isDescendantOf(item: BreadcrumbItemType) {
    for (let current: BreadcrumbItemType | undefined = this._parent;
      current;
      current = this._parent
    ) if (current === item) return true;
    return false;
  }

  isAncestorOf(item: BreadcrumbItemType) {
    const isDescendant = item.isDescendantOf(this);
    return isDescendant;
  }

  isEqual(item: BreadcrumbItemType | string) {
    const uuid = typeof item === 'string' ? item : item.uuid;
    return uuid === this._uuid;
  }

  isFirst() {
    return this.parent === undefined;
  }

  isLast(): boolean {
    const lastTrailItem = this._store.breadcrumbTrail[this._store.breadcrumbTrail.length - 1];
    return this._uuid === lastTrailItem.uuid;
  }

  getAncestors() {
    const ancestors = [];
    for (let current = this._parent;
      current;
      current = current.parent
    ) {
      ancestors.push(current);
    }
    return ancestors;
  }

  get uuid() {
    return this._uuid;
  }

  get title() {
    return this._title;
  }

  get link() {
    return this._link;
  }

  get parent() {
    return this._parent;
  }

  setTitle(title: BreadcrumbItemTitle) {
    this._title = title;
  }

  setLink(link: BreadcrumbItemLink) {
    this._link = link;
  }

  toString() {
    return `[${this.link.data}${this.isActive() ? '***' : ''}](${this.uuid})`;
  }
}

export type BreadcrumbStoreType = {
  getItem: (key: string) => BreadcrumbItemType | undefined;
  setItem: (item: BreadcrumbItemType) => BreadcrumbItemType | undefined;
  deleteItem: (item: BreadcrumbItemType | string) => boolean;
  getPagePath: () => string;
  breadcrumbTrail: BreadcrumbItemType[];
  export: () => BreadcrumbItemType[];
  hasCurrentPageItem: () => boolean;
};

/**
 * MobX storage of breadcrumb items.
 * API:
 * + set/delete item.
 * + get breadcrumb trail.
 * + check if last breadcrumb item exists in the store.
 */
export class BreadcrumbStore implements BreadcrumbStoreType {
  // eslint-disable-next-line max-len
  @observable private items: Map<string, BreadcrumbItemType> = new Map<string, BreadcrumbItemType>();

  @observable private activeItem?: BreadcrumbItemType = undefined;

  private pagePath: string;

  constructor(pagePath: string) {
    this.pagePath = pagePath;
  }

  @action private setActiveItem(item: BreadcrumbItemType | undefined) {
    this.activeItem = item;
  }

  private isNewActive(item: BreadcrumbItemType) {
    return (item.hasPath(this.pagePath) || item.isSubpathOf(this.pagePath))
      && (!this.activeItem || this.activeItem.isSubpathOf(item));
  }

  private updateActive() {
    this.setActiveItem(undefined);
    this.items.forEach((item: BreadcrumbItemType) => {
      if (this.isNewActive(item)) this.setActiveItem(item);
    });
  }

  private isActiveItemPathChanged(item: BreadcrumbItemType) {
    return this.activeItem !== undefined
      && this.activeItem.isEqual(item)
      && !this.activeItem.hasPath(item);
  }

  getItem(key: string) {
    return this.items.get(key);
  }

  @action setItem(item: BreadcrumbItemType) {
    this.items.set(item.uuid, item);
    if (this.isActiveItemPathChanged(item)) this.updateActive();
    if (this.isNewActive(item)) this.setActiveItem(item);
    return item;
  }

  @action deleteItem(item: BreadcrumbItemType | string) {
    const uuid = typeof item === 'string' ? item : item.uuid;
    const result = this.items.delete(uuid);
    if (
      this.activeItem !== undefined
      && this.activeItem.isEqual(item)
    ) this.updateActive();
    return result;
  }

  getPagePath() {
    return this.pagePath;
  }

  @computed get breadcrumbTrail() {
    if (this.activeItem === undefined) return [];
    return [
      this.activeItem,
      ...this.activeItem.getAncestors(),
    ].reverse();
  }

  export() {
    return Array.from(this.items.values());
  }

  hasCurrentPageItem() {
    return this.activeItem !== undefined && this.activeItem.hasPath(this.pagePath);
  }

  toString() {
    return this.breadcrumbTrail.map(i => i.toString()).join('--');
  }
}
