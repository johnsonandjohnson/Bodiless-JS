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
import { flow } from 'lodash';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import Layout from '../../../components/Layout';
import {
  asTableFirstExtraWidth,
  asTableFirstLeft,
  StandardTable,
} from '../../../components/Table';

const Table1 = flow(
)(StandardTable);
const Table2 = flow(
  asTableFirstExtraWidth,
  asTableFirstLeft,
)(StandardTable);
export default (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">Editable List Demo</h1>
      <p className="pt-4">
        The following are editable Tables. Clicking on each cell will display
        a menu with available operations. One can add rows and columns to the body or
        the header. We are showing two veriations one where the first column is styled
        differently then the others.
      </p>
      <div className="flex pt-4">
        <Table1 nodeKey="table1" className="w-1/2" data-list-element="outerlist" />
        <Table2 nodeKey="table2" className="w-1/2" data-list-element="outerlinklist" />
      </div>
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;
