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
import { graphql, Link } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';

import { Editable } from '@bodiless/components';
import Layout from '../../../components/Layout';

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">Demo of site/page level data</h1>
      <h3 className="text-lg font-bold">This is page 2</h3>
      <p className="my-2"><Link to="/sitedatapage">Go to page 1</Link></p>
      <h4 className="text-base font-bold">The following is page level</h4>
      <div className="m-2 p-2 w-1/3 h-12 border-blue border">
        <Editable nodeKey="sitedatapage" placeholder="Page level data..." />
      </div>
      <h4 className="text-base font-bold">The following is site level</h4>
      <div className="m-2 p-2 w-1/3 h-12 border-blue border">
        <Editable nodeKey="sitedatapage" nodeCollection="site" placeholder="Site level data..." />
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
