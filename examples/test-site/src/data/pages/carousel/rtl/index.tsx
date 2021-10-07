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

/* eslint-disable max-len */

import React from 'react';
import { graphql } from 'gatsby';
import { Page as BasePage } from '@bodiless/gatsby-theme-bodiless';
import Layout from '../../../../components/Layout';
import { CarouselExamples } from '..';
import { asRtlPage } from '../../../../components/Page';

const Page = asRtlPage(BasePage);

const CarouselPage = (props: any) => (
  <Page {...props}>
    <Layout>
      <CarouselExamples />
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

export default CarouselPage;
export { CarouselExamples };
