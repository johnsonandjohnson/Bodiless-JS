import {
  User,
  UserManager,
  WebStorageStateStore,
  UserManagerSettings,
  InMemoryWebStorage,
} from 'oidc-client-ts';

let userManager: UserManager | null;

export const setUserManager = (userManagerToSet: UserManager | null) => {
  userManager = userManagerToSet;
};

export const getUserManager = () => userManager;

// Fallback for "Storage" interface.
export interface StateStore {
    set(key: string, value: string): Promise<void>;
    get(key: string): Promise<string | null>;
    remove(key: string): Promise<string | null>;
    getAllKeys(): Promise<string[]>;
}

// Casting 'any' as it produces TS error:
// This expression is not constructable. Type 'StateStore' has no construct signatures.
//
// This has to be of type "Storage" as it is in the `WebStorageStateStore` in `oidc-client-ts`.
export type UserStoreType = Storage | StateStore | any;

const useAuthenticationService = (
  WebStorageStateStoreInt: typeof WebStorageStateStore
) => (configuration: UserManagerSettings, UserStore?: UserStoreType) => {
  if (userManager) {
    return userManager;
  }

  const overriddenConfiguration = { ...configuration };

  if (UserStore) {
    overriddenConfiguration.userStore = new WebStorageStateStoreInt({ store: new UserStore() });
  }
  userManager = new UserManager(overriddenConfiguration);
  return userManager;
};

export const authenticationService = useAuthenticationService(WebStorageStateStore);
export { InMemoryWebStorage };

let userRequested = false;
let numberAuthentication = 0;

export const isRequireAuthentication = (user: User, isForce?: boolean): boolean =>
  isForce || !user || (user && user.expired === true);

export const isRequireSignin = (oidcUser: User | null, isForce?: boolean) => isForce || !oidcUser;

export const authenticateUser = (
  userManager: UserManager,
  // location: Location,
  // history?: ReactOidcHistory,
  user: User | null = null
) => async (isForce: boolean = false/*, callbackPath?: string*/) => {
  let oidcUser = user;

  if (!oidcUser) oidcUser = await userManager.getUser();
  if (userRequested) return;

  numberAuthentication++;
  // const url = callbackPath || location.pathname + (location.search || '') + (location.hash || '');

  if (isRequireSignin(oidcUser, isForce)) {
    // oidcLog.info('authenticate user...');
    userRequested = true;
    await userManager.signinRedirect();
    userRequested = false;
  } else if (oidcUser && oidcUser.expired) {
    userRequested = true;
    try {
      await userManager.signinSilent();
    } catch (error) {
      const err = error as Error;
      if (numberAuthentication <= 1) {
        await userManager.signinRedirect();
      } else {
        userRequested = false;
        // oidcLog.warn(`session lost ${error.toString()}`);
        console.log(`session lost ${err.toString()}`);
        // history.push(`/authentication/session-lost?path=${encodeURI(url)}`);
      }
    }
    userRequested = false;
  }
};

export const logoutUser = async (userManager: UserManager) => {
  if (!userManager || !userManager.getUser) return;

  const oidcUser = await userManager.getUser();
  if (oidcUser) {
    // oidcLog.info('Logout user...');
    await userManager.signoutRedirect();
  }
};

export const signinSilent = (getUserManager: () => UserManager) => (data: any = undefined) =>
  getUserManager().signinSilent(data);
