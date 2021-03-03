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
import { getSnapFrom, withTailwindClasses } from '@bodiless/layouts';
import {
  NodeViewer,
} from '@bodiless/components';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import resolveConfig from 'tailwindcss/resolveConfig';
import { withDefaultContent, withNodeKey, withResetButton } from '@bodiless/core';
import { H2 as BaseH2, addClasses } from '@bodiless/fclasses';
import { flow } from 'lodash';
import Layout from '../../../components/Layout';
import tailWindConfig from '../../../../tailwind.config';
import { FlowContainerDefault, FlowContainerLimited } from '../../../components/FlowContainer';

const FLOW_CONTAINER_PAGE_PATH = 'flowContainer';

const options = getSnapFrom(
  withTailwindClasses(resolveConfig(tailWindConfig))('w-full sm:w-1/2 sm:w-full lg:w-1/2 lg:w-full'),
);

const snapDataFullWidth = getSnapFrom(
  withTailwindClasses(resolveConfig(tailWindConfig))('w-full'),
);

const contentfulFlowContainer = {
  items: [
    {
      uuid: 'c68e8090-1dc6-11eb-9a1b-2b284c8ff835',
      wrapperProps: {
        className: 'w-full',
      },
      type: 'ToutHorizontalWithTitleBodyWithCTA',
    },
  ],
};

const ContentfulFlowContainer = flow(
  withDefaultContent({ contentfulFlowContainer }),
  withNodeKey('contentfulFlowContainer'),
  withResetButton({ nodeKey: 'contentfulFlowContainer' }),
)(FlowContainerDefault);

const H2 = addClasses('text-2xl font-bold mt-4')(BaseH2);

const FlowContainerPage = (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">FlowContainer Examples</h1>
      <H2>Default FlowContainer</H2>
      <FlowContainerDefault
        id={FLOW_CONTAINER_PAGE_PATH}
        nodeKey={FLOW_CONTAINER_PAGE_PATH}
      />
      <h3 className="text-lg font-bold">This shows the json content of the grid:</h3>
      <NodeViewer nodeKey={FLOW_CONTAINER_PAGE_PATH} />
      <H2>
        FlowContainer with constrained widths of 50% & 100% only
      </H2>
      <FlowContainerDefault
        id="constrained_widths"
        nodeKey="constrained_widths"
        snapData={options}
      />
      <H2>
        FlowContainer with constrained width of 100% only
      </H2>
      <FlowContainerDefault
        id="constrained_full_width"
        nodeKey="constrained_full_width"
        snapData={snapDataFullWidth}
      />
      <h3 className="text-lg font-bold">This shows the json content of the grid:</h3>
      <NodeViewer nodeKey="constrained_widths" />
      <H2>FlowContainer restricted to 1 item</H2>
      <FlowContainerDefault
        id="restricted"
        nodeKey="restricted"
        maxComponents={1}
      />
      <h3 className="text-lg font-bold">This shows the json content of the grid:</h3>
      <NodeViewer nodeKey="restricted" />
      <H2>Default Width of 25%</H2>
      <FlowContainerDefault
        id="width_25"
        nodeKey="width_25"
        getDefaultWidth={() => 'w-full lg:w-1/4'}
      />
      <H2>Default Width of 33% (should round up to 33.33%)</H2>
      <FlowContainerDefault
        id="width_33"
        nodeKey="width_33"
        getDefaultWidth={() => 'w-full lg:w-1/3'}
      />
      <H2>Default Width of 50%</H2>
      <FlowContainerDefault
        id="width_50"
        nodeKey="width_50"
        getDefaultWidth={() => 'w-full lg:w-1/2'}
      />
      <H2>Default Width of 66.66% </H2>
      <FlowContainerDefault
        id="width_66"
        nodeKey="width_66"
        getDefaultWidth={() => 'w-full lg:w-2/3'}
      />
      <H2>Default Width of 75%</H2>
      <FlowContainerDefault
        id="width_75"
        nodeKey="width_75"
        getDefaultWidth={() => 'w-full lg:w-3/4'}
      />
      <H2>Contentful Flow Container</H2>
      <ContentfulFlowContainer />
      <H2>Limited Flow Container</H2>
      <FlowContainerLimited nodeKey="limited" />
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
