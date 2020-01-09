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
import { flow } from 'lodash';
import {
  withDesign,

  H1, Img, addClasses,
} from '@bodiless/fclasses';

import Layout from '../../components/Layout';
import { EditorFullFeatured } from '../../components/Editors';
import {
  asEditable,
  asEditableImage,
  asHeader1,
} from '../../components/Elements.token';

import Tout from '../../components/Tout';
import { asToutDefaultStyle } from '../../components/Tout/token';

const HeaderImage = asEditableImage('header_image')(Img);

const PrimaryHeader = flow(
  asHeader1,
  asEditable('title', 'Page Title'),
)(H1);

const HomePageTout = flow(
  withDesign({
    Wrapper: addClasses('w-full lg:w-1/3 p-2'),
  }),
  asToutDefaultStyle,
)(Tout);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <div className="flex my-3 w-full">
        <HeaderImage />
      </div>
      <PrimaryHeader />
      <div>
        <EditorFullFeatured nodeKey="editor" placeholder="Page Content" />
      </div>
      <div className="flex flex-wrap">
        <HomePageTout nodeKey="tout1" />
        <HomePageTout nodeKey="tout2" />
        <HomePageTout nodeKey="tout3" />
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
