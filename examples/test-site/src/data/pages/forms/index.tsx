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
import React, { HTMLProps } from 'react';
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import { asEditable } from '@bodiless/components';
import ReactMarkdown from 'react-markdown';

import flow from 'lodash/flow';
import Layout from '../../../components/Layout';
import asBodilessMarkdown from './asBodilessMarkdown';
import withLastModified from './withLastModified';
import withMarkdownFetchButton from './withMarkdownFetchButton';

const Markdown = flow(
  withLastModified('last-modified'),
  withMarkdownFetchButton,
  asBodilessMarkdown('body', undefined, () => ({
    root: true,
    group: 'page-group',
    label: 'Body',
  })),
)(ReactMarkdown);

const H1 = asEditable('title', 'Title')<HTMLProps<HTMLHeadingElement>>('h1');

const PageBody = ({ title, markdownContent }: any) => (
  <main>
    <H1>{title}</H1>
    <Markdown source={markdownContent} />
  </main>
);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <PageBody
        title="Forms"
        markdownContent="Foo"
      />
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
