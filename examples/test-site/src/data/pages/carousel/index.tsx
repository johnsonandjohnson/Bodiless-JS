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
import { Page } from '@bodiless/gatsby-theme-bodiless';

import Layout from '../../../components/Layout';
import { Carousel, AutoCarousel } from '../../../components/Carousel';

const CarouselExample = (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">Carousel Test Page</h1>
      <h2 className="text-2xl font-bold">Non Rotating</h2>
      <Carousel nodeKey="nonrotating" />
      <h2 className="text-2xl font-bold">Auto Rotating with 3 seconds</h2>
      <AutoCarousel nodeKey="autorotating" />
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;

export default CarouselExample;
