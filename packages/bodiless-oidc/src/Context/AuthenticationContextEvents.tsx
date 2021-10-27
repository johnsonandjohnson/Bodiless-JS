import { useCallback } from 'react';
import { User, UserManager, UserManagerEvents } from 'oidc-client-ts';

import { UseAuthenticationContextStateType } from './AuthenticationContextHooks';

type OidcFunctions = Omit<UseAuthenticationContextStateType, 'oidcState'>;

export interface CustomEvents {
  // 'UserManagerEvents' only refers to a type, but is being used as a namespace here. any
  onUserLoaded: UserManagerEvents.UserLoadedCallback;
  onUserUnloaded: UserManagerEvents.UserUnloadedCallback;
  onSilentRenewError: UserManagerEvents.SilentRenewErrorCallback;
  onUserSignedOut: UserManagerEvents.UserSignedOutCallback;
  onUserSessionChanged: UserManagerEvents.UserSessionChangedCallback;
  onAccessTokenExpiring(callback: (...ev: unknown[]) => void): void;
  onAccessTokenExpired(callback: (...ev: unknown[]) => void): void;
}

export const onErrorEvent = (onErrorInt: Function) => (error: Error) => {
  console.log(`Error : ${error.message}`);
  onErrorInt(error.message);
};

export const onUserLoadedEvent = (loadUserInt: Function) => (user: User | null) => {
  console.log('User Loaded');
  loadUserInt(user);
};

export const onUserUnloadedEvent = (unloadUserInternal: Function) => () => {
  console.log('User unloaded');
  unloadUserInternal();
};

export const onAccessTokenExpiredEvent = (unloadUserInternal: Function, userManager: UserManager) => async () => {
  console.log('AccessToken Expired');
  unloadUserInternal();
  await userManager.signinSilent();
};

export const useOidcEvents = (
  userManager: UserManager,
  oidcFunctions: OidcFunctions,
  customEvents?: CustomEvents
) => {
  const addOidcEvents = useCallback(() => {
    userManager.events.addUserLoaded(onUserLoadedEvent(oidcFunctions.loadUser));
    userManager.events.addSilentRenewError(onErrorEvent(oidcFunctions.onError));
    userManager.events.addUserUnloaded(onUserUnloadedEvent(oidcFunctions.unloadUser));
    userManager.events.addUserSignedOut(onUserUnloadedEvent(oidcFunctions.unloadUser));
    userManager.events.addAccessTokenExpired(
      onAccessTokenExpiredEvent(oidcFunctions.unloadUser, userManager)
    );

    if (customEvents && customEvents.onUserSessionChanged) {
      userManager.events.addUserSessionChanged(customEvents.onUserSessionChanged);
    }

    if (customEvents && customEvents.onUserLoaded) {
      userManager.events.addUserLoaded(customEvents.onUserLoaded);
    }

    if (customEvents && customEvents.onSilentRenewError) {
      userManager.events.addSilentRenewError(customEvents.onSilentRenewError);
    }

    if (customEvents && customEvents.onUserUnloaded) {
      userManager.events.addUserUnloaded(customEvents.onUserUnloaded);
    }

    if (customEvents && customEvents.onUserSignedOut) {
      userManager.events.addUserSignedOut(customEvents.onUserSignedOut);
    }

    if (customEvents && customEvents.onAccessTokenExpired) {
      userManager.events.addAccessTokenExpired(customEvents.onAccessTokenExpired);
    }

    if (customEvents && customEvents.onAccessTokenExpiring) {
      userManager.events.addAccessTokenExpiring(customEvents.onAccessTokenExpiring);
    }
  }, [
    oidcFunctions.loadUser,
    oidcFunctions.onError,
    oidcFunctions.unloadUser,
    userManager,
    customEvents,
  ]);

  const removeOidcEvents = useCallback(() => {
    userManager.events.removeUserLoaded(onUserLoadedEvent(oidcFunctions.loadUser));
    userManager.events.removeSilentRenewError(onErrorEvent(oidcFunctions.onError));
    userManager.events.removeUserUnloaded(onUserUnloadedEvent(oidcFunctions.unloadUser));
    userManager.events.removeUserSignedOut(onUserUnloadedEvent(oidcFunctions.unloadUser));
    userManager.events.removeAccessTokenExpired(
      onAccessTokenExpiredEvent(oidcFunctions.unloadUser, userManager)
    );

    if (customEvents && customEvents.onUserSessionChanged) {
      userManager.events.removeUserSessionChanged(customEvents.onUserSessionChanged);
    }

    if (customEvents && customEvents.onUserLoaded) {
      userManager.events.removeUserLoaded(customEvents.onUserLoaded);
    }

    if (customEvents && customEvents.onSilentRenewError) {
      userManager.events.removeSilentRenewError(customEvents.onSilentRenewError);
    }

    if (customEvents && customEvents.onUserUnloaded) {
      userManager.events.removeUserUnloaded(customEvents.onUserUnloaded);
    }

    if (customEvents && customEvents.onUserSignedOut) {
      userManager.events.removeUserSignedOut(customEvents.onUserSignedOut);
    }

    if (customEvents && customEvents.onAccessTokenExpired) {
      userManager.events.removeAccessTokenExpired(customEvents.onAccessTokenExpired);
    }

    if (customEvents && customEvents.onAccessTokenExpiring) {
      userManager.events.removeAccessTokenExpiring(customEvents.onAccessTokenExpiring);
    }
  }, [
    oidcFunctions.loadUser,
    oidcFunctions.onError,
    oidcFunctions.unloadUser,
    userManager,
    customEvents,
  ]);

  return { addOidcEvents, removeOidcEvents };
};
