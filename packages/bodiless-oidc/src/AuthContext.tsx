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

import React, { useContext, ComponentType } from 'react';
import type { SignoutRedirectArgs, SigninRedirectArgs } from 'oidc-client-ts';

import { AuthContextProps } from './types';

/**
 * @private
 * Authorization Context.
 * @see AuthContextProps
 */
export const AuthContext = React.createContext<AuthContextProps | undefined>(undefined);

/**
 * Hook that can be used to access the Authorization Context.
 * @see AuthContextProps
 */
export const useBodilessOidc = () => useContext(AuthContext);

/**
 * Hook that adds an `onClick` event to the underlying component
 * and invokes OIDC `signIn` handler when executed.
 *
 * @param args OIDC Sign In arguments
 * @see SigninRedirectArgs
 */
export const withSignInOnClick = (
  args?: SigninRedirectArgs,
) => (Component: ComponentType) => (props: any) => {
  // Property 'signIn' does not exist on type 'AuthContextProps | undefined'
  // @ts-ignore
  const { signIn } = useBodilessOidc();
  return <Component {...props} onClick={() => signIn(args)} />;
};

/**
 * Hook that adds an `onClick` event to the underlying component
 * and invokes OIDC `signOut` handler when executed.
 *
 * @see AuthContextProps
 */
export const withSignOutOnClick = (Component: ComponentType) => (props: any) => {
  // Property 'signOut' does not exist on type 'AuthContextProps | undefined'
  // @ts-ignore
  const { signOut } = useBodilessOidc();
  return <Component {...props} onClick={signOut} />;
};

/**
 * Hook that adds an `onClick` event to the underlying component
 * and invokes OIDC `signInPopup` handler when executed.
 *
 * @see AuthContextProps
 */
export const withSignInPopupOnClick = (Component: ComponentType) => (props: any) => {
  // Property 'signInPopup' does not exist on type 'AuthContextProps | undefined'
  // @ts-ignore
  const { signInPopup } = useBodilessOidc();
  return <Component {...props} onClick={signInPopup} />;
};

/**
 * Hook that adds an `onClick` event to the underlying component
 * and invokes OIDC `signOutRedirect` handler when executed.
 *
 * @param args OIDC Sign Out Redirect arguments
 * @see SignoutRedirectArgs
 */
export const withSignOutRedirectOnClick = (
  args?: SignoutRedirectArgs,
) => (Component: ComponentType) => (props: any) => {
  // Property 'signOutRedirect' does not exist on type 'AuthContextProps | undefined'
  // @ts-ignore
  const { signOutRedirect } = useBodilessOidc();
  return <Component {...props} onClick={() => signOutRedirect(args)} />;
};
