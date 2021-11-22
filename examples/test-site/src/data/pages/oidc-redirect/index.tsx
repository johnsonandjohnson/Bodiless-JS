/**
 * Copyright © 2021 Johnson & Johnson
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
import { Page } from '@bodiless/gatsby-theme-bodiless';
import {
  asToken, addClasses, H1 as H1$, Div, Button as ButtonBase,
} from '@bodiless/fclasses';
import {
  AuthCallback,
  useBodilessOidc,
} from '@bodiless/oidc';

import Layout from '../../../components/Layout';
import { asHeader1 } from '../../../components/Elements.token';

const withLogContext = (WrappedButton: ComponentType) => (props: any) => {
  const context = useBodilessOidc();
  return <WrappedButton {...props} onClick={() => console.log('AUTH CONTEXT:', context)} />;
};

const onSuccess = (user: any) => console.log('OIDC callback is successfull. User: ', user ? user : '');

const H1 = asToken(addClasses('pt-5'), asHeader1)(H1$);
const Button = addClasses('py-2 px-4 mr-3 border border-gray-600')(ButtonBase);
const Description = addClasses('text-sm mb-2 italic')(Div);
const LogContextButton = withLogContext(Button);
const Wrapper = addClasses('p-4 border border-gray-600 max-w-md mx-auto my-4 text-center')(Div);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <H1>Bodiless OIDC Redirect Page</H1>
      <AuthCallback onSuccess={onSuccess} />
      <Wrapper>
        <Description>
          OIDC Login redirect page. This page was specified as `redirectUri` in OIDC config.
          <a href="/oidc" className="px-1 text-blue justify-center underline flex">Go to /oidc page</a>
        </Description>
        <LogContextButton>Log Context</LogContextButton>
      </Wrapper>
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
