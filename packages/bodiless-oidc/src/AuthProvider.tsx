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
  FC, useState, useEffect, useRef, ComponentType, PropsWithChildren
} from 'react';
import { User, UserManager } from 'oidc-client-ts';
import type { SigninRedirectArgs } from 'oidc-client-ts';

import { AuthContext } from './AuthContext';
import { initUserManager } from './UserManager';
import type { AuthProviderProps, SignOutRedirectArgs } from './types';

/**
 * An AuthProvider represents a particular state of the currently
 * authenticated user. If no user is logged in, `userData` will be `null`.
 *
 * @param props AuthProviderProps
 * @see AuthProviderProps
 */
export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({
  children,
  autoSignIn = false,
  onBeforeSignIn,
  onSignIn,
  onSignOut,
  location = typeof window !== 'undefined' ? window.location : undefined,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);
  const [userManager] = useState<UserManager>(initUserManager(props));

  const signOutHooks = async (): Promise<void> => {
    setUserData(null);
    if (onSignOut) onSignOut();
  };

  const signInPopupHooks = async (): Promise<void> => {
    const userFromPopup = await userManager.signinPopup();
    setUserData(userFromPopup);
    if (onSignIn) onSignIn(userFromPopup);
    await userManager.signinPopupCallback();
  };

  const isMountedRef = useRef(true);
  useEffect(() => () => {
    isMountedRef.current = false;
  }, []);

  useEffect(() => {
    const getUser = async (): Promise<void> => {
      const user = await userManager!.getUser();
      if ((!user || user.expired) && autoSignIn) {
        if (onBeforeSignIn) onBeforeSignIn();
        userManager.signinRedirect();
      } else if (isMountedRef.current) {
        setUserData(user);
        setIsLoading(false);
      }
    };
    getUser();
  }, [location, userManager, autoSignIn, onBeforeSignIn, onSignIn]);

  useEffect(() => {
    // For refreshing react state when new state is available in e.g. session storage
    const updateUserData = async () => {
      const user = await userManager.getUser();
      if (isMountedRef.current) setUserData(user);
    };

    userManager.events.addUserLoaded(updateUserData);

    return () => userManager.events.removeUserLoaded(updateUserData);
  }, [userManager]);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (args?: SigninRedirectArgs): Promise<void> => {
          await userManager.signinRedirect(args);
        },
        signInPopup: async (): Promise<void> => {
          await signInPopupHooks();
        },
        signOut: async (): Promise<void> => {
          await userManager.removeUser();
          await signOutHooks();
        },
        signOutRedirect: async (args?: SignOutRedirectArgs): Promise<void> => {
          await userManager.signoutRedirect(args);
          await signOutHooks();
        },
        userManager,
        userData,
        setUserData,
        onSignIn,
        onSignOut,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * HOC that wrapps component in AuthProvider.
 *
 * @param oidcConfig OIDC Configuration props.
 * @see AuthProviderProps
 */
export const withOidcProvider = (oidcConfig: AuthProviderProps) => <P extends Object>(
  Component: ComponentType<P> | string,
) => (props: P) => (
  <AuthProvider {...oidcConfig}>
    <Component {...props} />
  </AuthProvider>
  );
