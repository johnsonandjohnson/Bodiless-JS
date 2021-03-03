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
import Page from '../../../components/Page';

import Layout from '../../../components/Layout';
import FilterByGroup, { ContextLogger } from '../../../components/FilterByGroup';

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">Filter Demo Page</h1>
      <p className="p-5">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Iste laboriosam reiciendis in tempore velit qui soluta ullam illo ipsam vero
        placeat molestias nobis libero incidunt, dolorum provident deleniti ipsum ex.
      </p>
      <p className="p-5">
        Fuga est nihil ipsum. Porro reiciendis saepe amet, ipsa, dignissimos eaque ducimus
        ullam quia quo aut dolorem consectetur voluptatum ipsam,
        neque sint ratione cupiditate laudantium?
      </p>
      <div className="my-10">
        <FilterByGroup>
          <ContextLogger />
        </FilterByGroup>
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
