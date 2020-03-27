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
import { withLinkToggle, Editable } from '@bodiless/components';
import Layout from '../../../components/Layout';
import EditableLink from '../../../components/Link';

const LinkToggle = withLinkToggle(EditableLink);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">LinkToggle Demo Page</h1>
      <p>
        Below is a piece of editable text which can be turned into a link.
        The link can be removed by clicking on the link button again and
        then clicking &quot;Remove Link&quot; on the edit form.
      </p>
      <div className="my-3">
        <LinkToggle nodeKey="linktoggle1"><Editable nodeKey="text" placeholder="Link Toggle" /></LinkToggle>
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
