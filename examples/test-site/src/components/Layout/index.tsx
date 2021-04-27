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

import React, { ComponentType, Fragment } from 'react';
import { flow } from 'lodash';
import {
  Div, designable, addClasses, replaceWith, DesignableComponentsProps,
} from '@bodiless/fclasses';
import { useNode, withNodeKey, ifToggledOn } from '@bodiless/core';
import { withSearchResult } from '@bodiless/search';
import { withBurgerMenuProvider, withBreadcrumbStore } from '@bodiless/navigation';
import Header from './header';
import Footer from './footer';
import SeoHelmet from './meta';
import { SocialShareHelmet } from '../SocialShare';
import { asPageContainer, asYMargin } from '../Elements.token';
import { asSiteHeader, asSiteFooter } from './token';

import BreadcrumbsBase from '../Breadcrumbs/MenuBreadcrumbs';

const SiteHeader = asSiteHeader(Header);
const SiteFooter = asSiteFooter(Footer);

const Container = flow(
  asPageContainer,
  asYMargin,
)(Div) as ComponentType;

const SiteProviders = flow(
  withBreadcrumbStore,
  withBurgerMenuProvider,
)(Fragment) as ComponentType;

type LayoutComponents = {
  Breadcrumbs: ComponentType<any>,
};

type LayoutProps = DesignableComponentsProps<LayoutComponents>;

const BaseLayout: ComponentType<LayoutProps> = ({ children, components }) => {
  const { Breadcrumbs } = components;
  return (
    <>
      <SeoHelmet />
      <SiteProviders>
        <SocialShareHelmet />
        <SiteHeader />
        <Container>
          { Breadcrumbs && <Breadcrumbs />}
          {children}
        </Container>
      </SiteProviders>
      <SiteFooter />
    </>
  );
};

const isHomePage = () => useNode().node.pagePath === '/';

const Layout$ = designable({
  Breadcrumbs: flow(
    withNodeKey({ nodeKey: 'MainMenu', nodeCollection: 'site' }),
    addClasses('pt-2'),
    // hide breadcrumbs on home page
    ifToggledOn(isHomePage)(replaceWith(React.Fragment)),
  )(BreadcrumbsBase),
})(BaseLayout);

const Layout = withSearchResult(Layout$);

export default Layout;
