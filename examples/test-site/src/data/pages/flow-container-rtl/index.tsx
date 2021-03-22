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
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import { withNodeKey } from '@bodiless/core';
import {
  H1 as BaseH1,
  H2 as BaseH2,
  addClasses,
} from '@bodiless/fclasses';
import { getSnapFrom, withTailwindClasses } from '@bodiless/layouts';
import { flow } from 'lodash';
import Helmet from 'react-helmet';
import resolveConfig from 'tailwindcss/resolveConfig';
import Layout from '../../../components/Layout';
import { FlowContainerDefaultRTL } from '../../../components/FlowContainer';
import tailWindConfig from '../../../../tailwind.config';

const RTLFlowContainer = flow(
  withNodeKey('rtlFlowContainer'),
)(FlowContainerDefaultRTL);

const H1 = addClasses('text-3xl font-bold')(BaseH1);
const H2 = addClasses('text-2xl font-bold mt-4')(BaseH2);

const snapDataFullWidth = getSnapFrom(
  withTailwindClasses(resolveConfig(tailWindConfig))('w-full'),
);

const FlowContainerPage = (props: any) => (
  <Page {...props}>
    <Helmet htmlAttributes={{ dir: 'rtl' }} />
    <Layout>
      <H1>RTL FlowContainer Examples</H1>
      <H2>Default Flow Container RTL</H2>
      <RTLFlowContainer
        id="rtl-flow-container"
        nodeKey="rtl_default"
      />
      <H2>
        FlowContainer with constrained width of 100% only
      </H2>
      <RTLFlowContainer
        id="rtl-constrained-full-width"
        nodeKey="rtl_constrained_full_width"
        snapData={snapDataFullWidth}
      />
      <H2>FlowContainer restricted to 1 item</H2>
      <RTLFlowContainer
        id="rtl-restricted"
        nodeKey="rtl_restricted"
        maxComponents={1}
      />
      <H2>Default Width of 50%</H2>
      <RTLFlowContainer
        id="rl-width-50"
        nodeKey="rtl_width_50"
        getDefaultWidth={() => 'w-full lg:w-1/2'}
      />
      <H2>Default Width of 75%</H2>
      <RTLFlowContainer
        id="rtl-width-75"
        nodeKey="rtl_width_75"
        getDefaultWidth={() => 'w-full lg:w-3/4'}
      />
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
export default FlowContainerPage;
