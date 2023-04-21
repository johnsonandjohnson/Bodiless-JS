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

import type { BreadcrumbStoreType, BreadcrumbItemType } from './types';

/**
 * Non-MobX storage of breadcrumb items.
 * API:
 * + set/delete item.
 * + get breadcrumb trail.
 * + check if last breadcrumb item exists in the store.
 */
export class BreadcrumbStore implements BreadcrumbStoreType {
  // eslint-disable-next-line max-len
  protected items: Map<string, BreadcrumbItemType> = new Map<string, BreadcrumbItemType>();

  protected activeItem?: BreadcrumbItemType = undefined;

  protected pagePath: string;

  constructor(pagePath: string) {
    this.pagePath = pagePath;
  }

  protected setActiveItem(item: BreadcrumbItemType | undefined) {
    this.activeItem = item;
  }

  protected isNewActive(item: BreadcrumbItemType) {
    return (item.hasPath(this.pagePath) || item.isSubpathOf(this.pagePath))
      && (!this.activeItem || this.activeItem.isSubpathOf(item));
  }

  protected updateActive() {
    this.setActiveItem(undefined);
    this.items.forEach((item: BreadcrumbItemType) => {
      if (this.isNewActive(item)) this.setActiveItem(item);
    });
  }

  protected isActiveItemPathChanged(item: BreadcrumbItemType) {
    return this.activeItem !== undefined
      && this.activeItem.isEqual(item)
      && !this.activeItem.hasPath(item);
  }

  getItem(key: string) {
    return this.items.get(key);
  }

  setItem(item: BreadcrumbItemType) {
    this.items.set(item.uuid, item);
    if (this.isActiveItemPathChanged(item)) this.updateActive();
    if (this.isNewActive(item)) this.setActiveItem(item);
    return item;
  }

  deleteItem(item: BreadcrumbItemType | string) {
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

  protected getBreadcrumbTrail() {
    if (this.activeItem === undefined) return [];
    return [
      this.activeItem,
      ...this.activeItem.getAncestors(),
    ].reverse();
  }

  get breadcrumbTrail() {
    return this.getBreadcrumbTrail();
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
