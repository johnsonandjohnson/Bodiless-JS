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

/* eslint max-len: 0 */

import React from 'react';
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import { asReadOnly } from '@bodiless/core';
import {
  withBreadcrumbStore,
  BreadcrumbsClean,
  asBreadcrumbs,
  withEditableStartingTrail,
  withEditableFinalTrail,
  withMenuTitleEditors,
} from '@bodiless/navigation';
import {
  addClasses, H1 as H1$, H2 as H2$, P as P$, asToken, Fragment,
} from '@bodiless/fclasses';

import Layout from '../../../components/Layout';
import Menu from '../../../components/Menu/Menu';
import {
  withStartingTrailIcon,
  withNonLinkableItems,
  withBoldedFinalTrail,
  withVerticalBarSeparator,
  withSlashSeparator,
  withHiddenCurrentPageItem,
  withStartingTrailLinkStyles,
  withReadOnlyStartingTrail,
  $withBreadcrumbStyles,
} from '../../../components/Breadcrumbs/MenuBreadcrumbs.token';
import {
  asHeader2, asHeader1, asItalic,
} from '../../../components/Elements.token';

const DemoBreadcrumbs = asToken(
  asBreadcrumbs,
  withMenuTitleEditors(undefined, asReadOnly),
  withEditableFinalTrail(),
  $withBreadcrumbStyles,
)(BreadcrumbsClean);

const DEFAULT_STARTING_TRAIL_NODE_KEY = 'startingTrail';

const MenuBreadcrumbs = asToken(
  withEditableStartingTrail(undefined, `${DEFAULT_STARTING_TRAIL_NODE_KEY}Default`),
  withStartingTrailLinkStyles,
)(DemoBreadcrumbs);

const BreadcrumbWithStartingTrailIcon = withStartingTrailIcon(`${DEFAULT_STARTING_TRAIL_NODE_KEY}Icon`)(DemoBreadcrumbs);

const BreadcrumbWithNonLinkableItems = asToken(
  withEditableStartingTrail(undefined, `${DEFAULT_STARTING_TRAIL_NODE_KEY}NonLinkable`),
  withStartingTrailLinkStyles,
  withNonLinkableItems,
)(DemoBreadcrumbs);

const BreadcrumbWithBoldableFinalItem = asToken(
  withEditableStartingTrail(undefined, `${DEFAULT_STARTING_TRAIL_NODE_KEY}BoldedFinal`),
  withStartingTrailLinkStyles,
  withBoldedFinalTrail,
)(DemoBreadcrumbs);

const BreadcrumbWithVerticalBarSeparator = asToken(
  withEditableStartingTrail(undefined, `${DEFAULT_STARTING_TRAIL_NODE_KEY}VerticalBar`),
  withStartingTrailLinkStyles,
  withVerticalBarSeparator,
)(DemoBreadcrumbs);

const BreadcrumbWithSlashSeparator = asToken(
  withEditableStartingTrail(undefined, `${DEFAULT_STARTING_TRAIL_NODE_KEY}SlashSeparator`),
  withStartingTrailLinkStyles,
  withSlashSeparator,
)(DemoBreadcrumbs);

const BreadcrumbWithHiddenCurrentPageItem = asToken(
  withEditableStartingTrail(undefined, `${DEFAULT_STARTING_TRAIL_NODE_KEY}CurrentPage`),
  withStartingTrailLinkStyles,
  withHiddenCurrentPageItem,
)(DemoBreadcrumbs);

const MegaMenuBreadcrumbWithNonLinkableItems = asToken(
  withEditableStartingTrail(undefined, `${DEFAULT_STARTING_TRAIL_NODE_KEY}MegaMenuNonLinkable`),
  withStartingTrailLinkStyles,
  withReadOnlyStartingTrail,
  withNonLinkableItems,
)(DemoBreadcrumbs);

const H1 = asToken(addClasses('pt-5'), asHeader1)(H1$);
const H2 = asToken(addClasses('pt-5'), asHeader2)(H2$);
const P = asToken(asItalic, addClasses('text-sm'))(P$);

const BreadcrumbProvider = withBreadcrumbStore(Fragment);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <H1>Breadcrumb Demo</H1>
      <BreadcrumbProvider>
        <Menu nodeKey="bodilessMenu" />
        <H2>Breadcrumbs with editable starting trail</H2>
        <MenuBreadcrumbs nodeKey="bodilessMenu" />
        <H2>Breadcrumbs with starting trail icon</H2>
        <BreadcrumbWithStartingTrailIcon nodeKey="bodilessMenu" />
        <H2>Breadcrumbs with non-linkable Middle Trail group</H2>
        <BreadcrumbWithNonLinkableItems nodeKey="bodilessMenu" />
        <H2>Breadcrumbs with boldable final trail item</H2>
        <BreadcrumbWithBoldableFinalItem nodeKey="bodilessMenu" />
        <H2>Breadcrumbs with vertical bar separator</H2>
        <BreadcrumbWithVerticalBarSeparator nodeKey="bodilessMenu" />
        <H2>Breadcrumbs with slash separator</H2>
        <BreadcrumbWithSlashSeparator nodeKey="bodilessMenu" />
        <H2>Breadcrumbs with hidden current page item</H2>
        <P>
          {`
          This example does not display custom final trail item and does not display current page item
          derived from menu. For instance, when the trail derived from menu is Components -> Breadcrumb
          and current page is /breadcrumb, then this test component will render just Home -> Components
        `}
        </P>
        <BreadcrumbWithHiddenCurrentPageItem nodeKey="bodilessMenu" />
        <H2>MegaMenu breadcrumbs with non-editable starting trail and non-linkable Middle Trail group</H2>
        <MegaMenuBreadcrumbWithNonLinkableItems nodeKey="bodilessMenu" />
      </BreadcrumbProvider>
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
    ...DefaultContentQuery
  }
`;
