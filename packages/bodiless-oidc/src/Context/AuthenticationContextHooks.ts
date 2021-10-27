import { useReducer, Dispatch, useCallback } from 'react';
import { User, UserManager } from 'oidc-client-ts';

export interface OidcState {
  oidcUser: User | null;
  userManager: UserManager;
  isLoading: boolean;
  error: string;
  isLoggingOut: boolean;
}

export interface UseAuthenticationContextStateType {
  onError: Function;
  loadUser: Function;
  onLoading: Function;
  unloadUser: Function;
  onLogout: Function;
  oidcState: OidcState;
}

const ON_LOADING = 'ON_LOADING';
const ON_ERROR = 'ON_ERROR';
const ON_LOAD_USER = 'ON_LOAD_USER';
const ON_UNLOAD_USER = 'ON_UNLOAD_USER';
const ON_LOGOUT = 'ON_LOGOUT';

type OidcAction =
  | { type: 'ON_LOADING' }
  | { type: 'ON_ERROR'; message: string }
  | { type: 'ON_LOAD_USER'; user: User | null }
  | { type: 'ON_UNLOAD_USER' }
  | { type: 'ON_LOGOUT' };

const getDefaultState = (userManager: UserManager): OidcState => {
  return {
    oidcUser: null,
    userManager,
    isLoading: false,
    error: '',
    isLoggingOut: false,
  };
};

const oidcReducer = (oidcState: OidcState, action: OidcAction): OidcState => {
  switch (action.type) {
    case ON_ERROR:
      return { ...oidcState, error: action.message, isLoading: false };
    case ON_LOADING:
      return { ...oidcState, isLoading: true };
    case ON_LOAD_USER:
      return { ...oidcState, oidcUser: action.user, isLoading: false };
    case ON_UNLOAD_USER:
      return { ...oidcState, oidcUser: null, isLoading: false };
    case ON_LOGOUT:
      return { ...oidcState, isLoggingOut: true };
    default:
      return oidcState;
  }
};

const onError = (dispatch: Dispatch<OidcAction>) => (message: string) => dispatch({ type: 'ON_ERROR', message });
const loadUser = (dispatch: Dispatch<OidcAction>) => (user: User | null) => dispatch({ type: 'ON_LOAD_USER', user });
const onLoading = (dispatch: Dispatch<OidcAction>) => () => dispatch({ type: 'ON_LOADING' });
const unloadUser = (dispatch: Dispatch<OidcAction>) => () => dispatch({ type: 'ON_UNLOAD_USER' });
const onLogout = (dispatch: Dispatch<OidcAction>) => () => dispatch({ type: 'ON_LOGOUT' });

export const useAuthenticationContextState = (userManager: UserManager): UseAuthenticationContextStateType => {
  const defaultState = getDefaultState(userManager);
  const [oidcState, dispatch] = useReducer(oidcReducer, defaultState);

  return {
    onError: useCallback(error => onError(dispatch)(error), []),
    loadUser: useCallback(user => loadUser(dispatch)(user), []),
    onLoading: useCallback(() => onLoading(dispatch)(), []),
    unloadUser: useCallback(() => unloadUser(dispatch)(), []),
    onLogout: useCallback(() => onLogout(dispatch)(), []),
    oidcState,
  };
};
