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
import flow from 'lodash/flow';
import {
  A,
  H3,
} from '@bodiless/fclasses';
import { withNode, withNodeKey, withDefaultContent } from '@bodiless/core';
import { asBodilessLink } from '@bodiless/components';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import Layout from '../../../../components/Layout';
import { asHeader3, asLink } from '../../../../components/Elements.token';

const SubTitle = asHeader3(H3);

const DefaultContentLink = flow(
  asBodilessLink(),
  withDefaultContent({
    '': { href: 'https://www.gatsbyjs.com/' },
  }),
  withNode,
  withNodeKey('link'),
  asLink,
)(A);

export default props => (
  <Page {...props}>
    <Layout>
      <SubTitle>Default content from current node</SubTitle>
      <DefaultContentLink>Test Link</DefaultContentLink>
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
