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
import Layout from '../../../components/Layout';
import SingleAccordion from '../../../components/SingleAccordion';

export default props => (
  <Page {...props}>
    <Layout>
      <div style={{ margin: 100 }}>
        <SingleAccordion expanded nodeKey="accordion-1" id="accordion-1" />
        <SingleAccordion nodeKey="accordion-2" id="accordion-2" />
        <SingleAccordion nodeKey="accordion-3" id="accordion-3" />
        <SingleAccordion nodeKey="accordion-4" id="accordion-4" />
        <SingleAccordion nodeKey="accordion-5" id="accordion-5" />
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
