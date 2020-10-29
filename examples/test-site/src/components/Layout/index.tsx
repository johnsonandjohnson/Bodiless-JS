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
import { Div } from '@bodiless/fclasses';
import Header from './header';
import Footer from './footer';
import SeoHelmet from './meta';
import { asPageContainer, asYMargin } from '../Elements.token';
import { asSiteHeader, asSiteFooter } from './token';

const SiteHeader = asSiteHeader(Header);
const SiteFooter = asSiteFooter(Footer);

const Container = flow(
  asPageContainer,
  asYMargin,
)(Div);

const Layout = ({ children }) => (
  <>
    <SeoHelmet />
    <SiteHeader />
    <Container>
      {children}
    </Container>
    <SiteFooter />
  </>
);

export default Layout;
