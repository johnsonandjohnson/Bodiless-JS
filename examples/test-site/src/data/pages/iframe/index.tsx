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
import {
  IframeWithResponsiveWidth,
  Reponsive21By9Iframe,
  Reponsive16By9Iframe,
  Reponsive4By3Iframe,
  Reponsive1By1Iframe,
} from '../../../components/Iframe';

import Layout from '../../../components/Layout';

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">iFrame Demo</h1>
      <h2>Iframe with responive width</h2>
      <IframeWithResponsiveWidth nodeKey="iframe" />
      <h2>Responsive iframe 21:9</h2>
      <Reponsive21By9Iframe nodeKey="iframe" />
      <h2>Responsive iframe 16:9</h2>
      <Reponsive16By9Iframe nodeKey="iframe" />
      <h2>Responsive iframe 4:3</h2>
      <Reponsive4By3Iframe nodeKey="iframe" />
      <h2>Responsive iframe 1:1</h2>
      <Reponsive1By1Iframe nodeKey="iframe" />
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;
