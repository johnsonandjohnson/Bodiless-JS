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
  AuthProvider,
  useBodilessOidc,
} from '@bodiless/oidc';

import Layout from '../../../components/Layout';
import { asHeader1 } from '../../../components/Elements.token';

const asLoginButton = (WrappedButton: ComponentType) => (props: any) => {
  // Property 'signIn' does not exist on type 'AuthContextProps | undefined'
  // @ts-ignore
  const { signIn } = useBodilessOidc();
  const onClick = () => {
    console.log('LOGGING IN...');
    signIn();
  };
  return <WrappedButton {...props} onClick={onClick} />;
};

const asLogoutButton = (WrappedButton: ComponentType) => (props: any) => {
  // Property 'signOut' does not exist on type 'AuthContextProps | undefined'
  // @ts-ignore
  const { signOut } = useBodilessOidc();
  const onClick = () => {
    console.log('LOGGING OUT...');
    signOut();
  };
  return <WrappedButton {...props} onClick={onClick} />;
};

const withLogContext = (WrappedButton: ComponentType) => (props: any) => {
  const context = useBodilessOidc();
  const onClick = () => {
    console.log('AUTH CONTEXT:', context);
  };
  return <WrappedButton {...props} onClick={onClick} />;
};

const H1 = asToken(addClasses('pt-5'), asHeader1)(H1$);
const Description = addClasses('text-sm mb-2 italic')(Div);
const Button = addClasses('py-2 px-4 mr-3 border border-gray-600')(ButtonBase);

const LoginButton = asLoginButton(Button);
const LogoutButton = asLogoutButton(Button);
const LogContextButton = withLogContext(Button);

const oidcConfig = {
  clientId: 'interactive.public',
  redirectUri: 'http://localhost:8005/oidc',
  scope: 'openid profile email api offline_access',
  authority: 'https://demo.identityserver.io',
  autoSignIn: false,
};

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <AuthProvider {...oidcConfig}>
        <H1>Bodiless OIDC</H1>
        <Description>
          Demo Page for OIDC.
        </Description>
        <LoginButton>Login</LoginButton>
        <LogoutButton>Log Out</LogoutButton>
        <LogContextButton>Log Context</LogContextButton>
      </AuthProvider>
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
