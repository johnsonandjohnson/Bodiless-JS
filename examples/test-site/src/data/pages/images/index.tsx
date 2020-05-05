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
  Image,
  LinkableImage,
  HorizontalImage,
} from '../../../components/Image';

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">Images Demo</h1>
      <div className="pt-4">
        <h2 className="text-2xl font-bold">Square Image</h2>
        <Image nodeKey="squareImage" />
      </div>
      <div className="pt-4">
        <h2 className="text-2xl font-bold">Horizontal Image</h2>
        <HorizontalImage />
      </div>
      <div className="pt-4">
        <h2 className="text-2xl font-bold">Linkable Square Image</h2>
        <LinkableImage nodeKey="squareImage" />
      </div>
      <div className="pt-4">
        <h2 className="text-2xl font-bold">Linkable Horizontal Image</h2>
        <LinkableImage nodeKey="horizontalImage" />
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
