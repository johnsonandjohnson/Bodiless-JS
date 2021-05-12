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
import { Page, PageProps } from '@bodiless/gatsby-theme-bodiless';
import Layout from '../../../components/Layout';
import {
  SingleAccordion,
  SingleAccordionTitleBordered,
  SingleAccordionBorderedOnFocus,
  SingleAccordionNonExpanding,
} from '../../../components/SingleAccordion';

export default (props: PageProps) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">Accordions</h1>
      <div style={{ margin: 100 }}>
        <h2 className="text-xl font-bold my-4 p-1">Accordion expanded</h2>
        <SingleAccordion expanded nodeKey="accordion-expanded" />
        <h2 className="text-xl font-bold my-4 p-1">Accordion collapsed (#accordion-2)</h2>
        <SingleAccordion nodeKey="accordion-collapsed" />
        <h2 className="text-xl font-bold my-4 p-1">Accordion fully bordered on focus (#faq3)</h2>
        <SingleAccordionBorderedOnFocus id="faq3" nodeKey="accordion-bordered-focus" />
        <h2 className="text-xl font-bold my-4 p-1">Accordion title bordered (#bordered)</h2>
        <SingleAccordionTitleBordered id="bordered" nodeKey="accordion-title-bordered" />
        <h2 className="text-xl font-bold my-4 p-1">Accordion non-collapsible</h2>
        <SingleAccordionNonExpanding expanded nodeKey="accordion-non-collapsible" />
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
