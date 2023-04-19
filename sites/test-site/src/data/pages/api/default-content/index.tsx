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

import React, { ComponentType } from 'react';
import { graphql } from 'gatsby';
import {
  A,
  H3,
  flowHoc,
  Div,
} from '@bodiless/fclasses';
import { withNode, withNodeKey, withDefaultContent } from '@bodiless/data';
import { asBodilessLink } from '@bodiless/components-ui';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import { asEditable } from '@bodiless/components';
import Layout from '../../../../components/Layout';
import { asHeader3, asLink } from '../../../../components/Elements.token';

const SubTitle: ComponentType = asHeader3(H3);

const DefaultContentLink = flowHoc(
  asBodilessLink(),
  withDefaultContent({
    '': { href: 'https://www.bodiless-js.org/' },
  }),
  withNode,
  withNodeKey('link'),
  asLink,
)(A);

const DefaultContentEditable = asEditable('editable', 'Default editable')(Div);

const PageContent$ = () => (
  <>
    <SubTitle>Default content from current node</SubTitle>
    <DefaultContentLink>Test Link</DefaultContentLink>
    <DefaultContentEditable />
  </>
);

const PageContent = withDefaultContent({
  editable: {
    text: 'This is the default content for an editable',
  },
})(PageContent$);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <PageContent />
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
