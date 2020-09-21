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
import { flowRight } from 'lodash';
import { ifReadOnly } from '@bodiless/core';
import { asBodilessIframe } from '@bodiless/components';
import { Embed } from '@bodiless/organisms';
import { Page } from '@bodiless/gatsby-theme-bodiless';

import {
  addClasses,
  withDesign,
  replaceWith,
  Iframe,
} from '@bodiless/fclasses';
import Layout from '../../../components/Layout';

const BodilessIframe = flowRight(
  asBodilessIframe(),
  addClasses('w-full'),
)(Iframe);

const ResponsiveIframe = withDesign({
  Wrapper: addClasses('relative overflow-hidden w-full'),
  Item: flowRight(
    addClasses('absolute w-full h-full inset-0'),
    replaceWith(BodilessIframe),
  ),
})(Embed);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">iFrame Demo</h1>
      <h2>Iframe</h2>
      <BodilessIframe nodeKey="iframe" />
      <h2>Responsive iframe</h2>
      <ResponsiveIframe nodeKey="iframe" />
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;
