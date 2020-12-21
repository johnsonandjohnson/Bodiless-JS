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
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import {
  withNodeKey,
} from '@bodiless/core';
import { flow } from 'lodash';
import Helmet from 'react-helmet';
import Layout from '../../../components/Layout';
import { FlowContainerDefault } from '../../../components/FlowContainer';
import { asFlowContainerRTL } from '../../../components/FlowContainer/token';

const RTLFlowContainer = flow(
  withNodeKey('rtlFlowContainer'),
  asFlowContainerRTL,
)(FlowContainerDefault);

const FlowContainerPage = (props: any) => (
  <Page {...props}>
    <Helmet htmlAttributes={{ dir: 'rtl' }} />
    <Layout>
      <h2 className="text-2xl font-bold mt-4">Flow Container RTL</h2>
      <RTLFlowContainer id="rtl-flow-container" />
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;
export default FlowContainerPage;
