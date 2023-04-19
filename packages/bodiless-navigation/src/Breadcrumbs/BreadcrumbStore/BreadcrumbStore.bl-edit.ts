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

import {
  observable, action, computed, makeObservable,
} from '@bodiless/core';
import type { BreadcrumbStoreType, BreadcrumbItemType } from './types';

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
    makeObservable(this);
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
