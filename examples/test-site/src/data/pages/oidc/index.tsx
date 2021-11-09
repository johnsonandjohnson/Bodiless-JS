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
  User,
  useBodilessOidc,
  withSignInOnClick,
  withSignOutOnClick,
  withSignInPopupOnClick,
  withSignOutRedirectOnClick,
} from '@bodiless/oidc';

import Layout from '../../../components/Layout';
import { asHeader1 } from '../../../components/Elements.token';

const withLogContext = (WrappedButton: ComponentType) => (props: any) => {
  const context = useBodilessOidc();
  return <WrappedButton {...props} onClick={() => console.log('AUTH CONTEXT:', context)} />;
};

const H1 = asToken(addClasses('pt-5'), asHeader1)(H1$);
const Description = addClasses('text-sm mb-2 italic')(Div);
const Button = addClasses('py-2 px-4 mr-3 border border-gray-600')(ButtonBase);
const UserWrapper = addClasses('p-4 border border-gray-600 max-w-md mx-auto my-4')(Div);

const LoginButton = withSignInOnClick()(Button);
const LoginPopupButton = withSignInPopupOnClick(Button);
const LogoutButton = withSignOutOnClick(Button);
const LogoutRedirectButton = withSignOutRedirectOnClick({
  post_logout_redirect_uri: typeof window !== 'undefined'
    ? window.location.href
    : '',
})(Button);
const LogContextButton = withLogContext(Button);

/**
 * This fixes a ts error:
 * Property 'given_name' does not exist on type 'UserProfile'.
 *
 * 'UserProfile' interface from 'oidc-client-ts' does not have any info about user.
 *
 * export interface UserProfile {
 *   sub?: string;
 *   sid?: string;
 *   azp?: string;
 *   at_hash?: string;
 *   auth_time?: number;
 * }
 */
type UserData = User & {
  profile: {
    given_name: string,
    name: string,
    email: string,
  },
};

const UserPreview = () => {
  const { userData, userManager } = useBodilessOidc();

  if (!userData) {
    return (
      <UserWrapper>
        <h3 className="font-bold text-lg">You are not Logged In!</h3>
        <hr className="mb-4 mt-1" />

        <div className="">
          <strong className="pr-3">Authority: </strong>
          <span>{userManager.settings.authority}</span>
        </div>

        <div className="">
          <strong className="pr-3">Client Id: </strong>
          <span>{userManager.settings.client_id}</span>
        </div>

        <div className="">
          <strong className="pr-3">Redirect URI: </strong>
          <span>{userManager.settings.redirect_uri}</span>
        </div>

        <hr className="my-4" />

        <div className="text-center">
          <LoginButton>Login</LoginButton>
          <LoginPopupButton>Login Popup</LoginPopupButton>
          <LogContextButton>Log Context</LogContextButton>
        </div>
      </UserWrapper>
    );
  }

  const { profile } = userData as UserData;

  return (
    <UserWrapper>
      <h3 className="font-bold text-lg">
        Hi
        {' ' + profile.given_name}
        !
      </h3>
      <hr className="mb-4 mt-1" />

      <div className="">
        <strong className="pr-3">Logged In As:</strong>
        <span>{profile.name}</span>
      </div>

      <div className="">
        <strong className="pr-3">Email:</strong>
        <span>{profile.email}</span>
      </div>

      <div className="">
        <strong className="pr-3">User Profile: </strong>
        <pre className="text-sm font-mono p-2 bg-gray-200 my-2">{JSON.stringify(profile, undefined, 2)}</pre>
      </div>

      <hr className="my-4" />

      <div className="text-center">
        <LogoutButton>Remove User</LogoutButton>
        <LogContextButton>Log Context</LogContextButton>
        <LogoutRedirectButton>Log Out</LogoutRedirectButton>
      </div>
    </UserWrapper>
  );
};

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <H1>Bodiless OIDC</H1>
      <Description>
        Demo Page for OIDC.
      </Description>
      <UserPreview />
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
