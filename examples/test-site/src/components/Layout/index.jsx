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

import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { Div } from '@bodiless/fclasses';
import {
  withMeta,
  withMetaTitle,
  withMetaHtml,
  asBodilessHelmet,
  withEvent,
} from '@bodiless/components';
import { flowRight } from 'lodash';
import Header from './header';
import Footer from './footer';
import { asPageContainer } from '../Elements.token';

const ExampleHelmet = flowRight(
  asBodilessHelmet('meta'),
  withMeta('pagetype', 'page-type'),
  withMeta('description', 'description'),
  withMeta('bl-brand', 'brand', 'site'),
  withMeta('bl-country', 'country', 'site'),
  withMetaTitle('page-title'),
  withMetaHtml('en'),
)(Helmet);

const ExampleGTMHelmetEvent = flowRight(
  asBodilessHelmet('datalayer'),
  //withEvent('globalDataLayer','page-loaded'),
  withEvent(
    'globalDataLayer',
    {
      event: 'Page Loaded',
      page: {
        country: 'US',
        language: 'EN',
        hostname: 'bodilessjs.com',
      },
    },
    'page-loaded',
  ),
 )(Helmet);

const Container = asPageContainer(Div);
const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            logo
          }
        }
      }
    `}
    render={data => (
      <>
        <ExampleHelmet />
        <ExampleGTMHelmetEvent />
        <Header siteLogo={data.site.siteMetadata.logo} />

        <Container>{children}</Container>
        <Footer siteTitle={data.site.siteMetadata.title} />
      </>
    )}
  />
);

export default Layout;
