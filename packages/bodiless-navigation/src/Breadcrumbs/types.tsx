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

/* eslint-disable jsx-a11y/anchor-is-valid */
import { ComponentType, HTMLProps } from 'react';
import type { WithNodeProps } from '@bodiless/core';
import type { DesignableComponentsProps } from '@bodiless/fclasses';
import type { BreadcrumbItemType as BreadcrumbStoreItemType } from './BreadcrumbStore';

type BreadcrumbsComponents = {
  StartingTrail: ComponentType<any>,
  Separator: ComponentType<HTMLProps<HTMLSpanElement>>,
  Wrapper: ComponentType<HTMLProps<HTMLUListElement>>,
  Item: ComponentType<HTMLProps<HTMLLIElement> & {
    position: number;
    isCurrentPage: boolean;
  }>,
  Title: ComponentType<any>,
  FinalTrail: ComponentType<any>,
};

type CleanBreadcrumbItemType = {
  uuid: string | number;
  position: number;
  isCurrentPage: boolean;
} & WithNodeProps;

/**
 * contains breadcrumb item public properties
*/
type BreadcrumbItemType = Pick<BreadcrumbStoreItemType, 'uuid' | 'title' | 'link' | 'isFirst' | 'hasPath'>;

/**
 * reduces items retrieved from breadcrumb store
 *
 * @param items - a list of items retrieved from store
 * @param props - props passed to breadcrumb component
 *
 * @returns uuids - a collection of breadcrumb item uuids
 */
type BreadcrumbStoreItemsReducer = (
  items: BreadcrumbItemType[],
  props?: Pick<BreadcrumbsProps, 'hasStartingTrail' | 'hasFinalTrail'>,
) => string[];

type BreadcrumbsProps = DesignableComponentsProps<BreadcrumbsComponents> & {
  /**
   * whether starting custom item is enabled and should be rendered
   * default: disabled
   */
  hasStartingTrail?: boolean | (() => boolean),
  /**
   * list of breadcrumb items to render
   */
  items?: CleanBreadcrumbItemType[],
  /**
   * whether final custom item is enabled and should be rendered
   */
  hasFinalTrail?: boolean | (() => boolean),
  /**
   * allows to reduce items retrieved from breadcrumb store
   * default: firstItemHomeLinkReducer
   */
  itemsReducer?: BreadcrumbStoreItemsReducer,
  /**
   * whether the last breadcrumb item should not be rendered as a link
   * default: false
   */
  renderLastItemWithoutLink?: boolean | (() => boolean),
} & WithNodeProps;

type CleanBreadcrumbsProps = Omit<BreadcrumbsProps, 'itemsReducer'>;

export type {
  BreadcrumbsComponents,
  BreadcrumbsProps,
  CleanBreadcrumbsProps,
  BreadcrumbItemType,
  CleanBreadcrumbItemType,
  BreadcrumbStoreItemsReducer,
};
