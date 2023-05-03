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

import React, {
  ComponentType,
  FC,
  useEffect,
  PropsWithChildren
} from 'react';
import { User } from 'oidc-client-ts';

import { useBodilessOidc } from './AuthContext';
import { hasCodeInUrl } from './UserManager';

export type AuthCallbackProps = {
  onSuccess?: (user: User | null) => void;
  onError?: (err: any) => void;
};

/**
 * Component to handle OIDC Sign In and Sign Out response.
 * OIDC `redirectUri` and/or `postLogoutRedirectUri` should point to
 * the page with the `AuthCallback` component.
 *
 * @param props Optional `onSuccess` and `onError` callbacks.
 * @see AuthCallbackProps
 */
export const AuthCallback: FC<PropsWithChildren<AuthCallbackProps>> = ({
  onSuccess,
  onError,
  children,
}) => {
  const { userManager, setUserData, onSignIn } = useBodilessOidc();

  useEffect(() => {
    /**
     * Check if the user is returning back from OIDC.
     */
    if (hasCodeInUrl(window.location)) {
      const getUser = async (): Promise<void> => {
        try {
          const user = await userManager.signinCallback();
          setUserData(user);
          if (onSignIn) onSignIn(user);
          if (onSuccess) onSuccess(user);
        } catch (e: any) {
          if (onError) onError(e);
        }
      };
      getUser();
    }
  }, [userManager, onSignIn]);

  return <>{children}</>;
};

/**
 * HOC that wrapps given component in AuthCallback.
 * AuthCallback handles OIDC Sign In and Sign Out responses.
 *
 * @param callbackProps `onSuccess` and `onError` optional handlers.
 * @see AuthCallbackProps
 */
export const withAuthCallback = (callbackProps: AuthCallbackProps) => <P extends Object>(
  Component: ComponentType<P> | string,
) => (props: P) => (
  <AuthCallback {...callbackProps}>
    <Component {...props} />
  </AuthCallback>
  );
