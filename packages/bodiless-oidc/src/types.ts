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

import { User, UserManager, UserManagerSettings } from 'oidc-client-ts';
import type { SignoutRedirectArgs, SigninRedirectArgs } from 'oidc-client-ts';

export type AuthProviderSignOutProps = {
  /**
   * Trigger a redirect of the current window to the end session endpoint
   *
   * You can also provide an object. This object will be sent with the
   * function.
   *
   * @example
   * ```javascript
   * const config = {
   *  signOutRedirect: {
   *    state: 'abrakadabra',
   *  },
   * };
   * ```
   */
  signoutRedirect?: boolean | unknown;
};

export type SignOutRedirectArgs = SignoutRedirectArgs & {
  post_logout_redirect_uri?: string;
};

export type AuthProviderProps = {
  /**
   * See [UserManager](https://github.com/IdentityModel/oidc-client-js/wiki#usermanager) for more details.
   */
  userManager?: UserManager;
  /**
   * The URL of the OIDC/OAuth2 provider.
   */
  authority: string;
  /**
   * Your client application's identifier as registered with the OIDC/OAuth2 provider.
   */
  clientId: string;
  /**
   * Client secret defined on the identity server.
   */
  clientSecret?: string;
  /**
   * The redirect URI of your client application
   * to receive a response from the OIDC/OAuth2 provider.
   */
  redirectUri: string;
  /**
   * The redirect URI of your client application to receive a response from
   * the OIDC/OAuth2 provider when completing a background sign-in refresh.
   */
  silentRedirectUri?: string;
  /**
   * The post-logout redirect URI of your client application
   * which your OIDC/OAuth2 provider can redirect to after completing logout.
   */
  postLogoutRedirectUri?: string;
  /**
   * Tells the authorization server which grant to execute.
   *
   * Read more: https://tools.ietf.org/html/rfc6749#section-3.1.1
   */
  responseType?: string;
  /**
   * A space-delimited list of permissions that the application requires.
   */
  scope?: string;
  /**
   * Defaults to `windows.location`.
   */
  location?: Location;
  /**
   * defaults to true
   */
  autoSignIn?: boolean;
  /**
   * Flag to indicate if there should be an automatic attempt
   * to renew the access token prior to its expiration.
   *
   * defaults to false
   */
  automaticSilentRenew?: boolean;
  /**
   * Flag to control if additional identity data is loaded from
   * the user info endpoint in order to populate the user's profile.
   *
   * defaults to true
   */
  loadUserInfo?:boolean;
  /**
   * The features parameter to window.open for the popup signin window
   *
   * defaults to { location: false, menubar: false, height: 640 }
   */
  popupWindowFeatures?: UserManagerSettings['popupWindowFeatures'];
  /**
   * The URL for the page containing the call to signinPopupCallback
   * to handle the callback from the OIDC/OAuth2
   *
   */
  popupRedirectUri?: string;
  /**
   * The target parameter to window.open for the popup signin window.
   *
   * defaults to '_blank'
   */
  popupWindowTarget?:string;
  /**
   * On before sign in hook. Can be use to store the current url for use after signing in.
   *
   * This only gets called if autoSignIn is true
   */
  onBeforeSignIn?: () => void;
  /**
   * On sign in hook. Can be a async function.
   * @param userData User
   */
  onSignIn?: (userData: User | null) => Promise<void> | void;
  /**
   * On sign out hook. Can be a async function.
   */
  onSignOut?: (options?: AuthProviderSignOutProps) => Promise<void> | void;
};

export type AuthContextProps = {
  /**
   * Alias for userManager.signInRedirect
   */
  signIn: (args?: SigninRedirectArgs) => Promise<void>;
  /**
   * Alias for userManager.signinPopup
   */
  signInPopup: () => Promise<void>
  /**
   * Alias for userManager.removeUser
   */
  signOut: () => Promise<void>;
  /**
   * Alias for userManager.signoutRedirect
   */
  signOutRedirect: (args?: SignOutRedirectArgs) => Promise<void>;
  /**
   * See [UserManager](https://github.com/IdentityModel/oidc-client-js/wiki#usermanager) for more details.
   */
  userManager: UserManager;
  /**
   * See [User](https://github.com/IdentityModel/oidc-client-js/wiki#user) for more details.
   */
  userData?: User | null;
  /**
   * State setter that may be used to update `userData`.
   */
  setUserData: React.Dispatch<React.SetStateAction<User | null>>
  /**
   * Auth state: True until the library has been initialized.
   */
  isLoading: boolean;
  /**
   * On sign in hook. Can be a async function.
   * @param userData User
   */
  onSignIn?: (userData: User | null) => Promise<void> | void;
  /**
   * On sign out hook. Can be a async function.
   */
  onSignOut?: (options?: AuthProviderSignOutProps) => Promise<void> | void;
};

export type { User, UserManager, SigninRedirectArgs };
