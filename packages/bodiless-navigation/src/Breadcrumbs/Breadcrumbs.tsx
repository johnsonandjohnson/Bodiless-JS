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
import { withNode } from '@bodiless/core';
import type { WithNodeProps } from '@bodiless/core';
import {
  asComponent, designable, addProps, Fragment, withDesign, replaceWith, withoutProps,
} from '@bodiless/fclasses';
import { observer } from 'mobx-react-lite';
import { flowRight } from 'lodash';
import { asStylableBreadcrumbs } from './Breadcrumb.token';

import withBreadcrumbItemsFromStore from './withBreadcrumbItemsFromStore';
import withBreadcrumbsSD from './withBreadcrumbsStructuredData';
import MenuTitle from '../Menu/MenuTitles';

import type {
  BreadcrumbsComponents,
  CleanBreadcrumbsProps,
  CleanBreadcrumbItemType,
  BreadcrumbsProps,
} from './types';

const ItemNodeProvider = withNode(Fragment) as ComponentType<WithNodeProps>;

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
    Wrapper,
    Item,
    Title,
    FinalTrail,
  } = components;
  const items$ = items.map((item: CleanBreadcrumbItemType, index: number) => {
    const isLastItem = index === (items.length - 1);
    const { position, isCurrentPage } = item;
    // increment position by 1 if there is starting trail item
    const position$ = hasStartingTrail$ ? position + 1 : position;
    if (isLastItem && renderLastItemWithoutLink$) {
      const TitleWithNoLink = withDesign({
        Link: replaceWith(Fragment),
      })(Title);
      return (
        <React.Fragment key={item.uuid}>
          <Item position={position$} isCurrentPage={isCurrentPage}>
            <ItemNodeProvider nodeKey={item.nodeKey} nodeCollection={item.nodeCollection}>
              <TitleWithNoLink />
            </ItemNodeProvider>
          </Item>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment key={item.uuid}>
        <Item position={position$} isCurrentPage={isCurrentPage}>
          <ItemNodeProvider nodeKey={item.nodeKey} nodeCollection={item.nodeCollection}>
            <Title />
          </ItemNodeProvider>
        </Item>
        {!isLastItem && <Separator key={`separator${item.uuid}`} />}
      </React.Fragment>
    );
  });
  const finalTrailItemPosition = (hasStartingTrail$ ? 1 : 0) + items$.length + 1;
  return (
    <Wrapper>
      { hasStartingTrail$
        && (
        <>
          <Item position={1} isCurrentPage={false} key="startingTrail">
            <StartingTrail />
          </Item>
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
          <Item key="finalTrail" position={finalTrailItemPosition} isCurrentPage>
            <FinalTrail />
          </Item>
        </>
        )}
    </Wrapper>
  );
};

const BreadcrumbStartComponents: BreadcrumbsComponents = {
  StartingTrail: MenuTitle,
  Separator: asComponent('span'),
  Wrapper: asComponent('ul'),
  Item: flowRight(
    withoutProps(['position', 'isCurrentPage']),
    asComponent,
  )('li'),
  Title: MenuTitle,
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
const withStartingTrail = addProps<Pick<BreadcrumbsProps, 'hasStartingTrail'>>({
  hasStartingTrail: true,
});

/**
 * HOC that disables rendering of starting trail for a breadcrumb based component.
 * @param Component a breadcrumb based component
 */
const withoutStartingTrail = addProps<Pick<BreadcrumbsProps, 'hasStartingTrail'>>({
  hasStartingTrail: false,
});

/**
 * HOC that enables rendering of final trail for a breadcrumb based component.
 * @param Component a breadcrumb based component
 */
const withFinalTrail = addProps<Pick<BreadcrumbsProps, 'hasFinalTrail'>>({
  hasFinalTrail: true,
});

/**
 * HOC that disables rendering of final trail for a breadcrumb based component.
 * @param Component a breadcrumb based component
 */
const withoutFinalTrail = addProps<Pick<BreadcrumbsProps, 'hasFinalTrail'>>({
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
