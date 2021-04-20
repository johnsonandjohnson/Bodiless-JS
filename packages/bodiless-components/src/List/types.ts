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

import type { HTMLProps, ComponentType } from 'react';
import type { DesignableComponentsProps, DesignableProps } from '@bodiless/fclasses';
import type { WithNodeProps, EditButtonOptions } from '@bodiless/core';

export type ListComponents = {
  Wrapper: ComponentType<any>,
  Item: ComponentType<any>,
  Title: ComponentType<any>,
};

export type ListContextValue = {
  items?: string[],
  currentItem?: string,
  addItem?: Function,
  deleteItem?: Function,
};

export type ListBaseProps = {
  /**
   * Callback to invoke when the last itme in the list is deleted.
   */
  unwrap?: Function,
  /**
   * Callback to invoke when an item in the list is deleted.
   */
  onDelete?: Function,
  /**
   * List of items to be prepended to those which are derived from list
   * data. This is an array of strings which will be use as node keys for
   * the items.
   */
  prependItems?: string[],
  /**
   * List of items to be appended to those which are derived from list
   * data. This is an array of strings which will be used as node keys for
   * the items.
   */
  appendItems?: string[],
} & DesignableComponentsProps<ListComponents> & HTMLProps<HTMLElement>;

export type ListProps =
  Omit<ListBaseProps, keyof DesignableComponentsProps<ListComponents>>
  & WithNodeProps
  & DesignableProps<ListComponents>;

export type ItemsMutator = (item: string) => void;

export type ListData = {
  items?: string[],
};

export type UseListOverrides<P = any> = (props: P) => Partial<EditButtonOptions<P, ListData>>;
