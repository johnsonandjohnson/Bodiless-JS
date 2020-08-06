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
import { flow } from 'lodash';
import {
  H1, addClasses, Div,
} from '@bodiless/fclasses';
import { asEditable } from '@bodiless/components';
import { LandscapeLinkableImage } from '../../../components/Image';
import Layout from '../../../components/Layout';
import withSimpleEditor from './withSimpleEditor';
import Gallery, { GalleryTile } from './Gallery';

const asPrimaryHeader = addClasses('text-3xl font-bold');
const PrimaryHeader = flow(
  asPrimaryHeader,
  asEditable('title', 'Title'),
)(H1);

const Body = withSimpleEditor('body', 'Body')(Div);

export default (props: PageProps) => (
  <Page {...props}>
    <Layout>
      <LandscapeLinkableImage />
      <PrimaryHeader />
      <Body />
      <Gallery nodeKey="gallery">
        <GalleryTile nodeKey="tile1" />
        <GalleryTile nodeKey="tile2" />
      </Gallery>
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery,
    ...SiteQuery
  }
`;
