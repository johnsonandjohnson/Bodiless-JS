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

import React, { ComponentType, HTMLProps } from 'react';
import { useNode, withoutProps } from '@bodiless/core';
import type { WithNodeKeyProps, WithNodeProps } from '@bodiless/core';
import { asComponent, designable, addProps } from '@bodiless/fclasses';
import type { DesignableComponentsProps } from '@bodiless/fclasses';
import { observer } from 'mobx-react-lite';
import { flowRight } from 'lodash';
import type { BreadcrumbItemType as BreadcrumbStoreItemType } from './BreadcrumbStore';
import { useBreadcrumbStore } from './BreadcrumbStoreProvider';

type BreadcrumbsComponents = {
  StartingTrail: ComponentType<HTMLProps<HTMLSpanElement>>,
  Separator: ComponentType<HTMLProps<HTMLSpanElement>>,
  BreadcrumbWrapper: ComponentType<HTMLProps<HTMLUListElement>>,
  BreadcrumbItem: ComponentType<HTMLProps<HTMLLIElement> & {
    position: number;
    isCurrentPage: boolean;
  }>,
  BreadcrumbLink: ComponentType<HTMLProps<HTMLAnchorElement> & WithNodeKeyProps>,
  BreadcrumbTitle: ComponentType<HTMLProps<HTMLSpanElement> & WithNodeKeyProps>,
  FinalTrail: ComponentType<HTMLProps<HTMLSpanElement>>,
};

type CleanBreadcrumbItemType = {
  uuid: string | number;
  title: WithNodeProps;
  link: WithNodeProps;
  position: number;
  isCurrentPage: boolean;
};

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
} & { };

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
  { hasStartingTrail }: Pick<BreadcrumbsProps, 'hasStartingTrail' | 'hasFinalTrail'>,
) => items
  .filter(item => !(hasStartingTrail && item.isFirst() && item.hasPath('/')))
  .map(item => item.uuid);

type CleanBreadcrumbsProps = Omit<BreadcrumbsProps, 'itemsReducer'>;
const BreadcrumbsClean$ = (props: CleanBreadcrumbsProps) => {
  const {
    hasStartingTrail = false,
    components,
    items = [],
    hasFinalTrail = false,
    renderLastItemWithoutLink = false,
  } = props;
  const hasStartingTrail$ = typeof hasStartingTrail === 'function' ? hasStartingTrail() : hasStartingTrail;
  const hasFinalTrail$ = typeof hasFinalTrail === 'function' ? hasFinalTrail() : hasFinalTrail;
  const renderLastItemWithoutLink$ = typeof renderLastItemWithoutLink === 'function'
    ? renderLastItemWithoutLink()
    : renderLastItemWithoutLink;
  const {
    StartingTrail,
    Separator,
    BreadcrumbWrapper,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbTitle,
    FinalTrail,
  } = components;
  const items$ = items.map((item: CleanBreadcrumbItemType, index: number) => {
    const isLastItem = index === (items.length - 1);
    const { position, isCurrentPage } = item;
    // increment position by 1 if there is starting trail item
    const position$ = hasStartingTrail$ ? position + 1 : position;
    if (isLastItem && renderLastItemWithoutLink$) {
      return (
        <React.Fragment key={item.uuid}>
          <BreadcrumbItem position={position$} isCurrentPage={isCurrentPage}>
            <BreadcrumbTitle
              nodeKey={item.title.nodeKey}
              nodeCollection={item.title.nodeCollection}
            />
          </BreadcrumbItem>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment key={item.uuid}>
        <BreadcrumbItem position={position$} isCurrentPage={isCurrentPage}>
          <BreadcrumbLink nodeKey={item.link.nodeKey} nodeCollection={item.link.nodeCollection}>
            <BreadcrumbTitle
              nodeKey={item.title.nodeKey}
              nodeCollection={item.title.nodeCollection}
            />
          </BreadcrumbLink>
        </BreadcrumbItem>
        {!isLastItem && <Separator key={`separator${item.uuid}`} />}
      </React.Fragment>
    );
  });
  const finalTrailItemPosition = (hasStartingTrail$ ? 1 : 0) + items$.length + 1;
  return (
    <BreadcrumbWrapper>
      { hasStartingTrail$
        && (
        <>
          <BreadcrumbItem position={1} isCurrentPage={false} key="startingTrail">
            <StartingTrail />
          </BreadcrumbItem>
          { (items$.length > 0 || hasFinalTrail$)
            && <Separator key="startingTrailSeparator" />}
        </>
        )}
      {items$}
      { hasFinalTrail$
        && (
        <>
          { items$.length > 0
            && <Separator key="finalTrailSeparator" />}
          <BreadcrumbItem key="finalTrail" position={finalTrailItemPosition} isCurrentPage={false}>
            <FinalTrail />
          </BreadcrumbItem>
        </>
        )}
    </BreadcrumbWrapper>
  );
};

const BreadcrumbStartComponents: BreadcrumbsComponents = {
  StartingTrail: asComponent('span'),
  Separator: asComponent('span'),
  BreadcrumbWrapper: asComponent('ul'),
  BreadcrumbItem: flowRight(
    withoutProps(['position', 'isCurrentPage']),
    asComponent,
  )('li'),
  BreadcrumbLink: asComponent('a'),
  BreadcrumbTitle: asComponent('span'),
  FinalTrail: asComponent('span'),
};

/**
 * Clean component that renders breadcrumbs.
 * @see BreadcrumbsComponents for a list of design components.
 */
const BreadcrumbsClean = designable(BreadcrumbStartComponents, 'Breadcrumbs')(BreadcrumbsClean$);

/**
 * HOC that populates a breadcrumb based component with data from breadcrumb store.
 * @param Component a breadcrumb based component
 */
// eslint-disable-next-line max-len
const withBreadcrumbItemsFromStore = (Component: ComponentType<BreadcrumbsProps & WithNodeProps>) => {
  const WithBreadcrumbItemsFromStore = (props: BreadcrumbsProps & WithNodeProps) => {
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
    const items = itemsReducer(store.breadcrumbTrail, { hasStartingTrail, hasFinalTrail })
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
          const linkNodePath = current.link.nodePath.replace(`${basePath}$`, '');
          const titleNodePath = current.title.nodePath.replace(`${basePath}$`, '');
          prev.push({
            uuid: current.uuid,
            link: {
              nodeKey: linkNodePath,
              nodeCollection,
            },
            title: {
              nodeKey: titleNodePath,
              nodeCollection,
            },
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

/**
 * HOC that enables rendering of starting trail for a breadcrumb based component.
 * @param Component a breadcrumb based component
 */
const withStartingTrail = addProps({
  hasStartingTrail: true,
});

/**
 * HOC that disables rendering of starting trail for a breadcrumb based component.
 * @param Component a breadcrumb based component
 */
const withoutStartingTrail = addProps({
  hasStartingTrail: false,
});

/**
 * HOC that enables rendering of final trail for a breadcrumb based component.
 * @param Component a breadcrumb based component
 */
const withFinalTrail = addProps({
  hasFinalTrail: true,
});

/**
 * HOC that disables rendering of final trail for a breadcrumb based component.
 * @param Component a breadcrumb based component
 */
const withoutFinalTrail = addProps({
  hasFinalTrail: false,
});

/**
 * Component that renders breadcrumb items retrieved from breadcrumb store.
 */
const Breadcrumbs = flowRight(
  observer,
  withBreadcrumbItemsFromStore,
)(BreadcrumbsClean);

export {
  BreadcrumbsClean,
  Breadcrumbs,
  withStartingTrail as withBreadcrumbStartingTrail,
  withoutStartingTrail as withoutBreadcrumbStartingTrail,
  withFinalTrail as withBreadcrumbFinalTrail,
  withoutFinalTrail as withoutBreadcrumbFinalTrail,
};

export type {
  BreadcrumbStoreItemsReducer,
};
