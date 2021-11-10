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
import { AuthContextProps, SignOutRedirectArgs, SigninRedirectArgs } from './types';

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
export const useBodilessOidc = () => useContext(AuthContext)!;

/**
 * HOC that adds an `onClick` event to the underlying component
 * and invokes OIDC `signIn` handler when executed.
 *
 * @param args OIDC Sign In arguments
 * @see SigninRedirectArgs
 */
export const withSignInOnClick = (
  args?: SigninRedirectArgs,
) => (Component: ComponentType) => (props: any) => {
  const { signIn } = useBodilessOidc();
  return <Component {...props} onClick={() => signIn(args)} />;
};

/**
 * HOC that adds an `onClick` event to the underlying component
 * and invokes OIDC `signOut` handler when executed.
 *
 * @see AuthContextProps
 */
export const withSignOutOnClick = (Component: ComponentType) => (props: any) => {
  const { signOut } = useBodilessOidc();
  return <Component {...props} onClick={signOut} />;
};

/**
 * HOC that adds an `onClick` event to the underlying component
 * and invokes OIDC `signInPopup` handler when executed.
 *
 * @see AuthContextProps
 */
export const withSignInPopupOnClick = (Component: ComponentType) => (props: any) => {
  const { signInPopup } = useBodilessOidc();
  return <Component {...props} onClick={signInPopup} />;
};

/**
 * HOC that adds an `onClick` event to the underlying component
 * and invokes OIDC `signOutRedirect` handler when executed.
 * Accepts `post_logout_redirect_uri` and `state` arguments.
 *
 * @param args OIDC Sign Out Redirect arguments
 * @see SignOutRedirectArgs
 */
export const withSignOutRedirectOnClick = (
  args?: SignOutRedirectArgs,
) => (Component: ComponentType) => (props: any) => {
  const { signOutRedirect } = useBodilessOidc();
  return <Component {...props} onClick={() => signOutRedirect(args)} />;
};
