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
import { Page, GatsbyImage } from '@bodiless/gatsby-theme-bodiless';
import {
  H1,
  H2,
  withDesign,
  replaceWith,
} from '@bodiless/fclasses';
import {
  withTitle,
  withDesc,
} from '@bodiless/layouts';
import { flow } from 'lodash';
import Layout from '../../../../components/Layout';
import {
  asHeader1,
  asHeader2,
} from '../../../../components/Elements.token';
import { FlowContainerDefault } from '../../../../components/FlowContainer';
import { withType } from '../../../../components/FlowContainer/Categories';

const PageTitle = asHeader1(H1);
const SecondTitle = asHeader2(H2);

const withGatsbyImgVariation = withDesign({
  GatsbyImage: flow(
    replaceWith(GatsbyImage),
    withType('Gatsby Image')(),
    withTitle('Gatsby Image'),
    withDesc('Adds a gatsby image'),
  ),
});

const FlowContainer = withGatsbyImgVariation(FlowContainerDefault);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <PageTitle>Gatsby Images Demo</PageTitle>
      <SecondTitle>Standalone Gatsby Image</SecondTitle>
      <GatsbyImage nodeKey="staticImg" />
      <SecondTitle>Flow Container</SecondTitle>
      <FlowContainer nodeKey="images" />
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;
