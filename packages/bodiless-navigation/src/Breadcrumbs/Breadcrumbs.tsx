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
import { withNode, useNode } from '@bodiless/data';
import { LinkData } from '@bodiless/components';
import type { WithNodeProps } from '@bodiless/data';
import {
  designable, addProps, Fragment, withDesign, replaceWith, withoutProps, ComponentOrTag, flowIf,
} from '@bodiless/fclasses';
import { observer } from '@bodiless/core';
import flowRight from 'lodash/flowRight';
import { asStylableBreadcrumbs } from './Breadcrumb.token';

import withBreadcrumbItemsFromStore from './withBreadcrumbItemsFromStore';
import withBreadcrumbsSD from './withBreadcrumbsStructuredData';
import MenuTitle from '../Menu/MenuTitles';

import type {
  BreadcrumbsComponents,
  CleanBreadcrumbsProps,
  CleanBreadcrumbItemType,
} from './types';

const ItemNodeProvider = withNode(Fragment) as ComponentType<WithNodeProps>;
const useIsLink = (linkNodeKey: string) => {
  const { node } = useNode();
  const linkHref = node.child<LinkData>(linkNodeKey);
  return Boolean(linkHref.data.href);
};

const BreadcrumbsClean$ = (props: CleanBreadcrumbsProps) => {
  const {
    hasStartingTrail = false,
    items = [],
    hasFinalTrail = false,
    renderLastItemWithoutLink = false,
    components: C,
  } = props;
  const hasStartingTrail$ = typeof hasStartingTrail === 'function' ? hasStartingTrail() : hasStartingTrail;
  const hasFinalTrail$ = typeof hasFinalTrail === 'function' ? hasFinalTrail() : hasFinalTrail;
  const renderLastItemWithoutLink$ = typeof renderLastItemWithoutLink === 'function'
    ? renderLastItemWithoutLink()
    : renderLastItemWithoutLink;
  const items$ = items.map((item: CleanBreadcrumbItemType, index: number) => {
    const isLastItem = index === (items.length - 1);
    const { position, isCurrentPage } = item;
    // increment position by 1 if there is starting trail item
    const position$ = hasStartingTrail$ ? position + 1 : position;
    if (isLastItem && renderLastItemWithoutLink$) {
      const TitleWithNoLink = withDesign({
        Link: replaceWith(Fragment),
      })(C.Title);
      return (
        <React.Fragment key={item.uuid}>
          <C.Item position={position$} isCurrentPage={isCurrentPage}>
            <ItemNodeProvider nodeKey={item.nodeKey} nodeCollection={item.nodeCollection}>
              <TitleWithNoLink isCurrentPage={isCurrentPage} />
            </ItemNodeProvider>
          </C.Item>
        </React.Fragment>
      );
    }
    // Replace Link with Fragment if no link data found.
    const Title = withDesign({
      Link: flowIf(() => !(useIsLink('link')))(replaceWith(Fragment)),
    })(C.Title);
    return (
      <React.Fragment key={item.uuid}>
        <C.Item position={position$} isCurrentPage={isCurrentPage}>
          <ItemNodeProvider nodeKey={item.nodeKey} nodeCollection={item.nodeCollection}>
            <Title isCurrentPage={isCurrentPage} />
          </ItemNodeProvider>
        </C.Item>
        {!isLastItem && <C.Separator key={`separator${item.uuid}`} />}
      </React.Fragment>
    );
  });
  const finalTrailItemPosition = (hasStartingTrail$ ? 1 : 0) + items$.length + 1;
  return (
    <C.NavWrapper>
      <C.Wrapper>
        {hasStartingTrail$
          && (
            <>
              <C.Item position={1} isCurrentPage={false} key="startingTrail">
                <C.StartingTrail />
              </C.Item>
              {(items$.length > 0 || hasFinalTrail$)
                && <C.Separator key="startingTrailSeparator" />}
            </>
          )}
        {items$}
        {hasFinalTrail$
          && (
            <>
              {items$.length > 0
                && <C.Separator key="finalTrailSeparator" />}
              <C.Item key="finalTrail" position={finalTrailItemPosition} isCurrentPage>
                <C.FinalTrail />
              </C.Item>
            </>
          )}
      </C.Wrapper>
    </C.NavWrapper>
  );
};

const BreadcrumbStartComponents: BreadcrumbsComponents = {
  StartingTrail: MenuTitle,
  Separator: 'span',
  NavWrapper: 'nav',
  Wrapper: 'ol',
  Item: withoutProps('position', 'isCurrentPage')('li') as ComponentOrTag<any>,
  Title: withoutProps(['isCurrentPage'])(MenuTitle),
  FinalTrail: MenuTitle,
};

/**
 * Clean component that renders breadcrumbs.
 * @see BreadcrumbsComponents for a list of design components.
 */
const BreadcrumbsClean = designable(BreadcrumbStartComponents, 'Breadcrumbs')(BreadcrumbsClean$);

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
 * HOC that adds breadcrumb props retrieved from breadcrumb store.
 */
const asBreadcrumbs = flowRight(
  observer,
  withBreadcrumbItemsFromStore,
  asStylableBreadcrumbs,
  withBreadcrumbsSD,
);

/**
 * Component that renders breadcrumb items retrieved from breadcrumb store.
 */
const MenuBreadcrumbs = asBreadcrumbs(BreadcrumbsClean);

export {
  asBreadcrumbs,
  BreadcrumbsClean,
  MenuBreadcrumbs,
  withStartingTrail as withBreadcrumbStartingTrail,
  withoutStartingTrail as withoutBreadcrumbStartingTrail,
  withFinalTrail as withBreadcrumbFinalTrail,
  withoutFinalTrail as withoutBreadcrumbFinalTrail,
};
