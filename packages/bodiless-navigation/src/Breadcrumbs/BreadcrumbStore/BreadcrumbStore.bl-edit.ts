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
import { BreadcrumbStore as BreadcrumbStoreStatic } from './BreadcrumbStore.static';

/**
 * MobX storage of breadcrumb items.
 * API:
 * + set/delete item.
 * + get breadcrumb trail.
 * + check if last breadcrumb item exists in the store.
 */
export class BreadcrumbStore extends BreadcrumbStoreStatic implements BreadcrumbStoreType {
  @observable
  protected items: Map<string, BreadcrumbItemType> = new Map<string, BreadcrumbItemType>();

  @observable
  protected activeItem?: BreadcrumbItemType = undefined;

  constructor(pagePath: string) {
    super(pagePath);
    makeObservable(this);
  }

  @action
  protected setActiveItem(item: BreadcrumbItemType | undefined) {
    return super.setActiveItem(item);
  }

  @action
  setItem(item: BreadcrumbItemType) {
    return super.setItem(item);
  }

  @action
  deleteItem(item: BreadcrumbItemType | string) {
    return super.deleteItem(item);
  }

  @computed
  get breadcrumbTrail() {
    return this.getBreadcrumbTrail();
  }
}
