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

import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
import { AuthProviderProps } from './types';
import { SSRStorage, isSSR } from './SSRStorage';

/**
 * @private
 * Check if location has oidc auth response params.
 *
 * @param location - window.location by default.
 */
export const hasCodeInUrl = (location?: Location): boolean => {
  if (!location) return false;
  const searchParams = new URLSearchParams(location.search);
  const hashParams = new URLSearchParams(location.hash.replace('#', '?'));

  return Boolean(
    searchParams.get('code')
      || searchParams.get('id_token')
      || searchParams.get('session_state')
      || hashParams.get('code')
      || hashParams.get('id_token')
      || hashParams.get('session_state'),
  );
};

/**
 * @private
 * Helper to initialize new UserManager
 *
 * @param props - AuthProviderProps.
 */
export const initUserManager = (props: AuthProviderProps): UserManager => {
  if (props.userManager) return props.userManager;

  /**
   * We can't initialize UserManager.userStore or UserManager.stateStore during SSR.
   * There is a bug in the `oidc-client-ts` package where it assigns
   * a `sessionStorage` to the `userStore` without a check to see if a `sessionStorage` defined.
   *
   * From `UserManagerSettingsStore` at `oidc-client-ts/src/UserManagerSettings.ts`:
   *   - `userStore = new WebStorageStateStore({ store: sessionStorage })`
   */
  const userStore = isSSR()
    ? new WebStorageStateStore({ store: new SSRStorage() })
    : new WebStorageStateStore({ store: window.sessionStorage });

  const stateStore = isSSR()
    ? new WebStorageStateStore({ store: new SSRStorage() })
    : new WebStorageStateStore({ store: window.localStorage });

  const {
    authority,
    clientId,
    clientSecret,
    redirectUri,
    silentRedirectUri,
    postLogoutRedirectUri,
    responseType,
    scope,
    automaticSilentRenew,
    loadUserInfo,
    popupWindowFeatures,
    popupRedirectUri,
    popupWindowTarget,
  } = props;

  return new UserManager({
    authority,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    silent_redirect_uri: silentRedirectUri || redirectUri,
    post_logout_redirect_uri: postLogoutRedirectUri || redirectUri,
    response_type: responseType || 'code',
    scope: scope || 'openid',
    loadUserInfo: loadUserInfo !== undefined ? loadUserInfo : true,
    popup_redirect_uri: popupRedirectUri,
    popupWindowFeatures,
    popupWindowTarget,
    automaticSilentRenew,
    userStore,
    stateStore,
  });
};
