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
import { flow } from 'lodash';
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import { asBodilessAnchor } from '@bodiless/components';
import { H1, Span } from '@bodiless/fclasses';
import Layout from '../../../components/Layout';
import { asHeader1 } from '../../../components/Elements.token';

const ExampleAnchor = flow(
  asBodilessAnchor('foo'),
)(Span);
const Title = asHeader1(H1);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <Title>Link Demo Page</Title>
      <ExampleAnchor>TEST ANCHOR</ExampleAnchor>
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
