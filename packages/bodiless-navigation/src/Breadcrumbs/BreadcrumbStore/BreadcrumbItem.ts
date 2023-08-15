/* eslint-disable no-underscore-dangle */
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

import type {
  BreadcrumbItemType,
  BreadcrumbItemLink,
  BreadcrumbItemTitle,
  BreadcrumbStoreType,
  BreadcrumbItemSettings,
} from './types';

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
    if (/^#/.test(this.link.data) || itemURL.host !== thisURL.host) return false;
    return isChildOf(itemURL.pathname, thisURL.pathname);
  }

  hasPath(item: BreadcrumbItemType | string) {
    const base = DEFAULT_URL_BASE;
    const itemURL = typeof item === 'string' ? new URL(item, base) : new URL(item.link.data, base);
    const thisURL = new URL(this.link.data, base);
    if (/^#/.test(this.link.data) || itemURL.host !== thisURL.host) return false;
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
