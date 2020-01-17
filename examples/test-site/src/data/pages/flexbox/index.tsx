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

import Layout from '../../../components/Layout';
import tailWindConfig from '../../../../tailwind.config';
import { FlexBoxDefault } from '../../../components/Flexbox';

const FLEXBOX_PAGE_PATH = 'flexbox';

const options = getSnapFrom(
  withTailwindClasses(tailWindConfig)('w-full sm:w-1/2 sm:w-full lg:w-1/2 lg:w-full'),
);
const FlexboxPage = (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">Flexbox</h1>
      <FlexBoxDefault
        nodeKey={FLEXBOX_PAGE_PATH}
      />
      <h3 className="text-lg font-bold">This shows the json content of the grid:</h3>
      <NodeViewer nodeKey={FLEXBOX_PAGE_PATH} />
      <h1 className="text-3xl font-bold mt-4">Flexbox grid with constrained widths</h1>
      <FlexBoxDefault
        nodeKey="constrained_widths"
        snapData={options}
      />
      <h3 className="text-lg font-bold">This shows the json content of the grid:</h3>
      <NodeViewer nodeKey="constrained_widths" />
      <h1 className="text-3xl font-bold mt-4">Flexbox restricted to 1 item</h1>
      <FlexBoxDefault
        nodeKey="restricted"
        maxComponents={1}
      />
      <h3 className="text-lg font-bold">This shows the json content of the grid:</h3>
      <NodeViewer nodeKey="restricted" />
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;
export default FlexboxPage;
