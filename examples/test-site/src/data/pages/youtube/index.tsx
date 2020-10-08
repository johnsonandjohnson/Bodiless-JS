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
import {
  DefaultReponsive16By9YouTube,
  Reponsive16By9AutoPlayYouTube,
} from '../../../components/YouTube';

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">YouTube Demo</h1>
      <h2 className="text-xl font-bold my-4">Responsive youtube 16:9</h2>
      <DefaultReponsive16By9YouTube nodeKey="youtube" />
      <h2 className="text-xl font-bold my-4">Responsive Autoplay youtube 16:9</h2>
      <Reponsive16By9AutoPlayYouTube nodeKey="autoplay" />
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;
