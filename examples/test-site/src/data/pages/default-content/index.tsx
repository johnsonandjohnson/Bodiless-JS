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
// ToDo: remove this page
import React from 'react';
import { graphql } from 'gatsby';
import { flow } from 'lodash';
import {
  withNode,
  withNodeKey,
  withDefaultContent
} from '@bodiless/core';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import Layout from '../../../components/Layout';
import {
  asEditableImage,
  asEditableLink,
} from '../../../components/Elements.token';
import { WantToLearnMore } from '../../../components/Contentful/Tout';
import imageContent from '../../../components/Contentful/Tout/WantToLearnMore/image';
import cta from '../../../components/Contentful/Tout/WantToLearnMore/cta';

const TestImage = flow(
  asEditableImage(),
  withDefaultContent(imageContent),
  withNode,
  withNodeKey('image'),
  asEditableLink(),
  withDefaultContent(cta.link),
  withNode,
  withNodeKey('cta'),
)('img');

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">Componens with Default Content Demo</h1>
      <div className="ml-10">
        <p className="py-3">
          This page demonstrates how to use components with default content
        </p>
      </div>
      <div className="ml-10">
        <h2>Experiments with Image</h2>
        <TestImage />
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
