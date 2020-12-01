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
import {
  withBodilessLinkToggle, asEditable, asBodilessLink, DefaultNormalHref,
} from '@bodiless/components';
import { A, H2, H1 } from '@bodiless/fclasses';
import { flowRight } from 'lodash';
import { withNode, withNodeKey } from '@bodiless/core';
import Layout from '../../../components/Layout';
import {
  asEditableLink, asLink, asHeader1, asHeader2,
} from '../../../components/Elements.token';

export const LinkToggle = flowRight(
  withNodeKey('linktoggle1'),
  withNode,
  asEditable('text', 'Link Toggle'),
  withBodilessLinkToggle(asEditableLink)('link'),
  asLink,
)(A);

const stripSlashOverrides = {
  normalizeHref: (href?: string) => new DefaultNormalHref(href, { trailingSlash: false })
    .toString(),
  instructions: 'This href will have trailing slashes stripped',
};
const Stripslashlink = asBodilessLink(
  'strip-slash', undefined, () => stripSlashOverrides,
)(A);

const doNotNormalizeOverrides = {
  normalizeHref: (href?: string) => href,
  instructions: 'This href will be saved as is.',
};
const DoNotNormalizeLink = asBodilessLink(
  'do-not-normalize', undefined, () => doNotNormalizeOverrides,
)(A);

const Title = asHeader1(H1);
const SectionTitle = asHeader2(H2);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <Title>Link Demo Page</Title>
      <SectionTitle>Link Toggle</SectionTitle>
      <p>
        Below is a piece of editable text which can be turned into a link.
        The link can be removed by clicking on the link button again and
        then clicking &quot;Remove Link&quot; on the edit form.
      </p>
      <div className="my-3" data-linktoggle-element="link-toggle">
        <LinkToggle />
      </div>
      <SectionTitle>Different Href Normalizers</SectionTitle>
      <p>The following link will normalize by stripping traling slash.</p>
      <div className="my-3" data-stropslash-element="strip-slash">
        <Stripslashlink>Strip Slash</Stripslashlink>
      </div>
      <p>The following link will not normalize the href.</p>
      <div className="my-3" data-stropslash-element="strip-slash">
        <DoNotNormalizeLink>Do Not Normalize</DoNotNormalizeLink>
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
