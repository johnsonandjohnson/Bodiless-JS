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

import React from 'react';
import { flow } from 'lodash';
import {
  Div, designable, addClasses, replaceWith,
} from '@bodiless/fclasses';
import { useNode, withNodeKey, ifToggledOn } from '@bodiless/core';
import Header from './header';
import Footer from './footer';
import SeoHelmet from './meta';
import { asPageContainer, asYMargin } from '../Elements.token';
import { asSiteHeader, asSiteFooter } from './token';

import { MegaMenuBreadcrumbs } from '../Breadcrumbs/MenuBreadcrumbs';

const SiteHeader = asSiteHeader(Header);
const SiteFooter = asSiteFooter(Footer);

const Container = flow(
  asPageContainer,
  asYMargin,
)(Div);

const BaseLayout = ({ children, components }) => {
  const { Breadcrumbs } = components;
  return (
    <>
      <SeoHelmet />
      <SiteHeader />
      <Container>
        { Breadcrumbs && <Breadcrumbs />}
        {children}
      </Container>
      <SiteFooter />
    </>
  );
};

const isHomePage = () => useNode().node.pagePath === '/';

const Layout = designable({
  Breadcrumbs: flow(
    withNodeKey({ nodeKey: 'MainMenu', nodeCollection: 'site' }),
    addClasses('pt-2'),
    // hide breadcrumbs on home page
    ifToggledOn(isHomePage)(replaceWith(React.Fragment)),
  )(MegaMenuBreadcrumbs),
})(BaseLayout);

export default Layout;
