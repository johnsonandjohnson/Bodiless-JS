import React, { FC, useEffect, useCallback, /*ComponentType, PropsWithChildren*/ } from 'react';
import { User, UserManagerSettings } from 'oidc-client-ts';

import {
  authenticationService,
  UserStoreType,
  authenticateUser,
  logoutUser,
  setUserManager,
} from '../authenticationService';
import { AuthenticationContext } from './AuthenticationContext';
import { useAuthenticationContextState } from './AuthenticationContextHooks';
import { useOidcEvents } from './AuthenticationContextEvents';

// type AuthenticationProviderIntProps = PropsWithChildren<{
//   location: Location;
//   history: ReactOidcHistory;
//   loggerLevel: number;
//   logger: Logger;
//   notAuthenticated: ComponentType;
//   notAuthorized: ComponentType;
//   authenticating: ComponentType;
//   callbackComponentOverride: ComponentType;
//   sessionLostComponent: ComponentType;
//   UserStore: UserStoreType;
//   isEnabled?: boolean;
//   configuration: UserManagerSettings;
//   authenticationServiceInt: typeof authenticationService;
//   CallbackInt: typeof Callback;
//   setLoggerInt: typeof setLogger;
//   OidcRoutesInt: typeof OidcRoutes;
//   oidcLogInt: typeof oidcLog;
//   authenticateUserInt: typeof authenticateUser;
//   logoutUserInt: typeof logoutUser;
//   customEvents: CustomEvents;
//   setUserManagerInt: typeof setUserManager;
// }>;

type AuthenticationProviderProps = {
    isEnabled?: boolean;
    authenticationServiceInt: typeof authenticationService;
    authenticateUserInt: typeof authenticateUser;
    logoutUserInt: typeof logoutUser;
    setUserManagerInt: typeof setUserManager;
    configuration: UserManagerSettings;
    UserStore: UserStoreType;
};

export const AuthenticationProvider:FC<AuthenticationProviderProps> = props => {
  const {
    isEnabled = true,
    authenticationServiceInt = authenticationService,
    authenticateUserInt = authenticateUser,
    logoutUserInt = logoutUser,
    setUserManagerInt = setUserManager,
    configuration,
    UserStore,
    children,
  } = props;

  const userManager = authenticationServiceInt(configuration, UserStore);
  const { oidcState, loadUser, onError, onLoading, unloadUser, onLogout } = useAuthenticationContextState(userManager);
  const oidcFunctions = { loadUser, onError, onLoading, unloadUser, onLogout };
  const { addOidcEvents, removeOidcEvents } = useOidcEvents(userManager, oidcFunctions);

  useEffect(() => {
    onLoading();
    // setLoggerInt(loggerLevel, logger);
    addOidcEvents();
    let mount = true;
    userManager.getUser().then((user: User | null) => {
      console.log('USER: ', user);
      if (mount) {
        loadUser(user);
      }
    });
    return () => {
      removeOidcEvents();
      mount = false;
      setUserManagerInt(null);
    };
  }, [addOidcEvents, loadUser, onLoading, removeOidcEvents, /*setUserManagerInt,*/ userManager]);

  useEffect(() => {
    // const handleRedirects = async () => {
    //   const userTest = await userManager.signinRedirectCallback();
    //   console.log('userTest: ', userTest);
    // };
    // handleRedirects();
  }, []);

  const loginCallback = useCallback(async () => {
    onLoading();
    // oidcLogInt.info('Login requested');
    // await authenticateUserInt(userManager)();
    await userManager.signinRedirect();
    console.log('loginCallback');
  }, [onLoading, authenticateUserInt, userManager]);

  const logoutCallback = useCallback(async () => {
    try {
      userManager.getUser().then((user: User | null) => {
        console.log('USER: ', user);
      });
      // onLogout();
      // await logoutUserInt(userManager);
      // oidcLogInt.info('Logout successfull');
      console.log('logoutCallback');
    } catch (error) {
      const { message } = error as Error;
      onError(message);
    }
  }, [logoutUserInt, onError, onLogout, userManager]);

  const signinCallBack = useCallback(
    (...args) => {
      try {
        // oidcLogInt.info('SILENT SIGNIN Requested');
        oidcState.userManager.signinSilent(...args);
        console.log('signinCallBack');
      } catch (error) {
        const { message } = error as Error;
        onError(message);
      }
    },
    [oidcState.userManager, onError]
  );

  return (
    <AuthenticationContext.Provider
      value={{
        ...oidcState,
        isEnabled,
        signinSilent: signinCallBack,
        login: loginCallback,
        logout: logoutCallback,
        events: oidcState.userManager.events,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
