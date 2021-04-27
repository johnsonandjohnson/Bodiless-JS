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
import React, { ComponentType } from 'react';
import { useNode } from '@bodiless/core';
import { useBreadcrumbStore } from './BreadcrumbStoreProvider';

import type {
  BreadcrumbsProps,
  BreadcrumbItemType,
  CleanBreadcrumbItemType,
} from './types';

/**
 * removes first item from the trail
 * when there is a custom starting trail and
 * when the first store item has frontpage path
 *
 * @param items - breadcrumb store items
 * @param props - breadcrumb component props
 *
 * @returns uuids - a list of item uuids
 */
const firstItemHomeLinkReducer = (
  items: BreadcrumbItemType[],
  { hasStartingTrail }: Pick<BreadcrumbsProps, 'hasStartingTrail'>,
) => items
  .filter(item => !(hasStartingTrail && item.isFirst() && item.hasPath('/')))
  .map(item => item.uuid);

/**
 * HOC that populates a breadcrumb based component with data from breadcrumb store.
 * @param Component a breadcrumb based component
 */
const withBreadcrumbItemsFromStore = (Component: ComponentType<BreadcrumbsProps>) => {
  const WithBreadcrumbItemsFromStore = (props: BreadcrumbsProps) => {
    const {
      nodeCollection,
      hasStartingTrail = false,
      hasFinalTrail = false,
      itemsReducer = firstItemHomeLinkReducer,
      renderLastItemWithoutLink = true,
      ...rest
    } = props;
    const store = useBreadcrumbStore();
    if (store === undefined) return <Component {...props} />;
    const { node } = useNode(nodeCollection);
    const basePath = node.path;
    const items = itemsReducer(store.breadcrumbTrail, { hasStartingTrail })
      .map(uuid => store.getItem(uuid))
      // map items retrieved from store
      // into items expected by base breadcrumb component
      /* eslint-disable @typescript-eslint/indent */
      // eslint throws an indentation error for lines inside reduce body
      // automatic eslint fix brings code to unreadable state
      // probably that is an eslint plugin issue
      // the disabled rule is enabled back after reduce
      .reduce<CleanBreadcrumbItemType[]>(
        (prev, current, index) => {
          if (current === undefined) return prev;
          const titleNodePath = current.title.nodePath.replace(`${basePath}$`, '');
          // @todo probably a better way to get the nodeKey...
          const temp = titleNodePath.split('$');
          const nodeKey = temp.slice(0, temp.length - 1).join('$');
          prev.push({
            uuid: current.uuid,
            nodeKey,
            nodeCollection,
            position: index + 1,
            isCurrentPage: current.isLast() && store.hasCurrentPageItem(),
          });
          return prev;
        }, [],
      );
    /* eslint-enable @typescript-eslint/indent */
    const hasFinalTrail$0 = typeof hasFinalTrail === 'function' ? hasFinalTrail() : hasFinalTrail;
    const hasFinalTrail$1 = hasFinalTrail$0 && !store.hasCurrentPageItem();
    const lastItemWithoutLink = typeof renderLastItemWithoutLink === 'function'
      ? renderLastItemWithoutLink()
      : renderLastItemWithoutLink;
    const props$1 = {
      ...rest,
      items,
      hasFinalTrail: hasFinalTrail$1,
      hasStartingTrail,
      renderLastItemWithoutLink: lastItemWithoutLink
        && !hasFinalTrail$1
        && store.hasCurrentPageItem(),
    };
    return <Component {...props$1} />;
  };
  return WithBreadcrumbItemsFromStore;
};

export default withBreadcrumbItemsFromStore;
export {
  firstItemHomeLinkReducer,
};
