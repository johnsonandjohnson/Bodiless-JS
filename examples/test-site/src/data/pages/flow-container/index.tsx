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
import Layout from '../../../components/Layout';
import tailWindConfig from '../../../../tailwind.config';
import { FlowContainerDefault } from '../../../components/FlowContainer';

const FLOW_CONTAINER_PAGE_PATH = 'flowContainer';

const options = getSnapFrom(
  withTailwindClasses(resolveConfig(tailWindConfig))('w-full sm:w-1/2 sm:w-full lg:w-1/2 lg:w-full'),
);
const FlowContainerPage = (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">FlowContainer Examples</h1>
      <h2 className="text-2xl font-bold mt-4">Default FlowContainer</h2>
      <FlowContainerDefault
        id={FLOW_CONTAINER_PAGE_PATH}
        nodeKey={FLOW_CONTAINER_PAGE_PATH}
      />
      <h3 className="text-lg font-bold">This shows the json content of the grid:</h3>
      <NodeViewer nodeKey={FLOW_CONTAINER_PAGE_PATH} />
      <h2 className="text-2xl font-bold mt-4">
        FlowContainer with constrained widths of 50% & 100% only
      </h2>
      <FlowContainerDefault
        id="constrained_widths"
        nodeKey="constrained_widths"
        snapData={options}
      />
      <h3 className="text-lg font-bold">This shows the json content of the grid:</h3>
      <NodeViewer nodeKey="constrained_widths" />
      <h2 className="text-2xl font-bold mt-4">FlowContainer restricted to 1 item</h2>
      <FlowContainerDefault
        id="restricted"
        nodeKey="restricted"
        maxComponents={1}
      />
      <h3 className="text-lg font-bold">This shows the json content of the grid:</h3>
      <NodeViewer nodeKey="restricted" />
      <h2 className="text-2xl font-bold mt-4">Default Width of 25%</h2>
      <FlowContainerDefault
        id="width_25"
        nodeKey="width_25"
        defaultWidthClasses="w-full lg:w-1/4"
      />
      <h2 className="text-2xl font-bold mt-4">Default Width of 33% (should round up to 33.33%)</h2>
      <FlowContainerDefault
        id="width_33"
        nodeKey="width_33"
        defaultWidthClasses="w-full lg:w-1/3"
      />
      <h2 className="text-2xl font-bold mt-4">Default Width of 50%</h2>
      <FlowContainerDefault
        id="width_50"
        nodeKey="width_50"
        defaultWidthClasses="w-full md:w-1/2"
      />
      <h2 className="text-2xl font-bold mt-4">Default Width of 66.66% </h2>
      <FlowContainerDefault
        id="width_66"
        nodeKey="width_66"
        defaultWidthClasses="w-full lg:w-2/3"
      />
      <h2 className="text-2xl font-bold mt-4">Default Width of 75%</h2>
      <FlowContainerDefault
        id="width_75"
        nodeKey="width_75"
        defaultWidthClasses="w-full lg:w-3/4"
      />
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
