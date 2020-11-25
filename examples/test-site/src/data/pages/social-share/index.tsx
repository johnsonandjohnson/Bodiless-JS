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
import {
  Section, addClasses, H3,
} from '@bodiless/fclasses';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import Layout from '../../../components/Layout';
import SocialShare, { IconOnlySocialShare, EmailOnlySocialShare } from '../../../components/SocialShare';

const FlexSection = addClasses('text-right border')(Section);
const StyledH3 = addClasses('text-2xl m-2')(H3);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-2xl font-bold">Social Share</h1>
      <FlexSection>
        <StyledH3>Simple share button</StyledH3>
        <SocialShare />
      </FlexSection>
      <FlexSection>
        <StyledH3>Customized share button</StyledH3>
        <IconOnlySocialShare />
      </FlexSection>
      <FlexSection>
        <StyledH3>Single share button</StyledH3>
        <EmailOnlySocialShare />
      </FlexSection>
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;
