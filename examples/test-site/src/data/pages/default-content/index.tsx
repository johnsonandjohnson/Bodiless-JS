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
import { flow } from 'lodash';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import {
  withContent,
  withContentfulContextMenu,
} from '@bodiless/core';
import {
  Image
} from '@bodiless/components';
import {
  withDesign
} from '@bodiless/fclasses';
import {
  Tout
} from '@bodiless/organisms';
import Layout from '../../../components/Layout';

const defaultImageValue = {
  src: '/images/jandjwebsite.jpg',
  alt: 'Default Image Text',
};

const defaultTitleValue = {
  text: 'Default Tout Title',
};

const defaultBodyValue = {
  text: 'Default Tout Body',
};

const defaultLink = {
  text: 'Default Link',
};

// ToDo: there is a bug that when a subcomponent is reverted then other components are reverted too
// ToDo: there is a concern that reverting link text reverts the href value as well
// ToDo: find a way how to inject default value for the link href
const ToutWithDefaultContent = withDesign({
  Image: flow(
    withContentfulContextMenu,
    withContent(defaultImageValue), 
  ),
  Title: flow(
    withContentfulContextMenu,
    withContent(defaultTitleValue), 
  ),
  Body: flow(
    withContentfulContextMenu,
    withContent(defaultBodyValue), 
  ),
  Link: flow(
    withContentfulContextMenu,
    withContent(defaultLink), 
  ),
})(Tout);

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
        <h2>Taco with default content</h2>
        <ToutWithDefaultContent nodeKey="tout" />
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
