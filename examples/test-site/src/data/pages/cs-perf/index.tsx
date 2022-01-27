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
import { createHeavyElements } from './heavy';
import Layout from '../../../components/Layout';

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">Page with heavy component selectors</h1>
      <p>
        This page is designed to demostrate/test the performance of flow containers
        and Chameleons with a very large number of available components. If the system
        is operating properly, this page should load fairly quickly. Note that there
        will be a slight delay when opening the component selector.
      </p>
      <p>
        NOTE: The classes used to style these variations are generated dynamically, and
        will be purged on the static version of this page.
      </p>
      <h3 className="text-lg font-bold">Chameleons</h3>
      <div className="flex flex-wrap">
        {createHeavyElements('chameleon', 20)}
      </div>
      <h3 className="text-lg font-bold">Flow Containers</h3>
      <div className="flex flex-wrap">
        {createHeavyElements('fc', 20)}
      </div>
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
