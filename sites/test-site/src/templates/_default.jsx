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
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import { withMetaSiteInfo } from '@bodiless/components';
import { withDataLayerPageType, withGlobalGA4Form } from '@bodiless/ga4';
import Layout from '../components/Layout';
import { FlowContainerDefault } from '../components/FlowContainer';

/**
 * A helmet Component containing datalayer script. In edit mode, it shows a form
 * to edit the values page type.
 *
 * The use of withGlobalGA4Form allows us to retain the global datalayer script
 * and only add page information to it.
 */
const GA4DataLayerPageHelmet = withGlobalGA4Form(
  withDataLayerPageType('page-type'),
)(Helmet);

const SiteInfoHelmet = withMetaSiteInfo(Helmet);

const main = props => (
  <Page {...props}>
    <GA4DataLayerPageHelmet />
    <SiteInfoHelmet />
    <Layout>
      <FlowContainerDefault nodeKey="page" />
    </Layout>
  </Page>
);
export default main;

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
    ...DefaultContentQuery
    allSite(filter: {pathPrefix: {eq: $slug}}) {
      edges {
        node {
          buildTime
        }
      }
    }
  }
`;
