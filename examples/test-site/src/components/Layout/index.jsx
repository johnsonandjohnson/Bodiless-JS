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
  withGTM,
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
  withEvent('view-product'),
)(Helmet);

const ExampleGTMHelmet = flowRight(
  withGTM({
    id: 'GTM-1234',
    dataLayerName: 'dataLayer',
    gtmAuth: 'foo',
    gtmPreview: 'bar',
    defaultDataLayer: {
      // platform: 'gatsby',
      // value: { // Possible default datalayer data.
      //   page: {
      //     country: 'US',
      //     language: 'en',
      //     hostname: '/',
      //   },
      // },
    },
    includeInDevelopment: true,
  }),
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
        <ExampleGTMHelmet />
        <ExampleGTMHelmetEvent />
        <Header siteLogo={data.site.siteMetadata.logo} />

        <Container>{children}</Container>
        <Footer siteTitle={data.site.siteMetadata.title} />
      </>
    )}
  />
);

export default Layout;
