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

import React, { ComponentType } from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import {
  asToken, addClasses, H1 as H1$, H2 as H2$, Div, Button as ButtonBase,
} from '@bodiless/fclasses';
import { useBodilessOidc, AuthenticationProvider, InMemoryWebStorage } from '@bodiless/oidc';

import Layout from '../../../components/Layout';
import { asHeader2, asHeader1 } from '../../../components/Elements.token';

const oidcConfig = {
  client_id: 'interactive.public.short',
  redirect_uri: 'http://localhost:8005/oidc',
  response_type: 'code',
  post_logout_redirect_uri: 'http://localhost:8005/oidc',
  scope: 'openid profile email api offline_access',
  authority: 'https://demo.identityserver.io',
  silent_redirect_uri: 'http://localhost:8005/oidc',
  automaticSilentRenew: true,
  loadUserInfo: true,
};

const asLoginButton = (WrappedButton: ComponentType) => (props: any) => {
  const { /*isEnabled,*/ login, /*logout, signinSilent,*/ oidcUser } = useBodilessOidc();
  console.log('useBodilessOidc: ', useBodilessOidc());
  const onClick = (e: any) => {
    console.log('LOGGING IN...');
    login();
  };
  return <WrappedButton {...props} onClick={onClick} />;
};

const asLogoutButton = (WrappedButton: ComponentType) => (props: any) => {
  const { /*isEnabled, login,*/ logout/*, signinSilent, oidcUser*/ } = useBodilessOidc();
  const onClick = (e: any) => {
    console.log('LOGGING OUT...');
    logout();
  };
  return <WrappedButton {...props} onClick={onClick} />;
};

const H1 = asToken('pt-5', asHeader1)(H1$);
const H2 = asToken('pt-5', asHeader2)(H2$);
const Description = addClasses('text-sm mb-2 italic')(Div);
const Button = addClasses('py-2 px-4 mr-3 border border-gray-600')(ButtonBase);

const LoginButton = asLoginButton(Button);
const LogoutButton = asLogoutButton(Button);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <AuthenticationProvider
        configuration={oidcConfig}
        // loggerLevel={oidcLog.DEBUG}
        isEnabled={true}
        // callbackComponentOverride={CustomCallback}
        UserStore={InMemoryWebStorage}
      >
        <H1>Bodiless OIDC</H1>
        <Description>
          Demo Page for OIDC.
        </Description>
        <LoginButton>Login</LoginButton>
        <LogoutButton>Log Out</LogoutButton>
      </AuthenticationProvider>
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
