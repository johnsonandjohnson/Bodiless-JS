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
import { Editable } from '@bodiless/components';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import Layout from '../components/Layout';

export default props => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">This page is using the default template.</h1>
      <div>
        <h3 className="text-lg font-bold">Here is a simple editable text field.</h3>
        <p className="w-1/2 h-24 border border-blue">
          <Editable nodeKey="text" />
        </p>
      </div>
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery,
    ...SiteQuery
  }
`;
