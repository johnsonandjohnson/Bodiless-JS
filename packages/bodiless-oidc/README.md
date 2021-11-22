

# Bodiless OIDC

Bodiless OICD is a library that provides OpenID Connect (OIDC) and OAuth2 protocol support.

OpenID Connect (OIDC) is a secure mechanism that is employed in user authentication and authorization and enables an app or a website to contact an identity service provider (like the Akamai or Okta) and authenticate the user, receive an access token that (in the case of Hosted Login) specifies the user profile information that the client is authorized to access, retrieve personal information needed by the user or by the system and refresh the user’s authentication/authorization state, and prevent that session from timing out.

### Usage
To enable OIDC on a site you need to wrap your content with the `AuthProvider`. `AuthProvider` is responsible for signing a user in, signing out, and managing the current User state. It also provides access to the currently initiated `UserManager`.

```js
import React from 'react';
// ...
import { AuthProvider } from '@bodiless/oidc';

// First we create the OIDC config.
// See `AuthProviderProps` for the full config props list.
const oidcConfig = {
  authority: 'https://demo.identityserver.io',
  clientId: 'interactive.public',
  redirectUri: 'http://localhost:8005/oidc',
  scope: 'openid profile email api offline_access',
};

// Note that we *spread* all `oidcConfig` props into the `AuthProvider`.
export default (props: any) => (
  <Page {...props}>
    <Layout>
      <AuthProvider {...oidcConfig}>
        // Access to `UserManager`, `userData`, `signIn`, `signInPopup`,
        // `signOut` and `signOutRedirect` as well as `isLoading` indicator.
        ...
      </AuthProvider>
    </Layout>
  </Page>
);
```

#### Use `withOidcProvider`
The other way to wrap something with the `AuthProvider` is to use `withOidcProvider` HOC. It accepts `oidcConfig` as a prop and wraps the provided component with the `AuthProvider`:

```js
import React from 'react';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import { withOidcProvider } from '@bodiless/oidc';
import Layout from '../../../components/Layout';

// Create the OIDC config.
// See `AuthProviderProps` for the full config props list.
const oidcConfig = {
  authority: 'https://demo.identityserver.io',
  clientId: 'interactive.public',
  redirectUri: 'http://localhost:8005/oidc',
  scope: 'openid profile email api offline_access',
};

// Wrap the default Layout component with the `AuthProvider`.
const PageLayout = withOidcProvider(oidcConfig)(Layout);

export default (props: any) => (
  <Page {...props}>
    <PageLayout>
      // Access to `UserManager`, `userData`, `signIn`, `signInPopup`,
      // `signOut` and `signOutRedirect` as well as `isLoading` indicator.
      ...
    </PageLayout>
  </Page>
);
```

### OIDC Config:
The OIDC config is used to pass required props to the `AuthProvider`. The following props are required:
```js
{
  /**
   * The URL of the OIDC/OAuth2 provider. (Okta, Akamai, etc)
   */
  authority: string;
  /**
   * Your client application's identifier as registered with the OIDC/OAuth2 provider.
   */
  clientId: string;
  /**
   * The redirect URI of your client application
   * to receive a response from the OIDC/OAuth2 provider.
   * Usually a page with the `<AuthCallback />` component.
   */
  redirectUri: string;
}
```

You may also find usefull `onSignIn` and `onSignOut` callbacks that you can pass to the `AuthProviderProps`. These are the callbacks that will be executed after successfull Sign In or Sign Out. You may redirect a user to a particular page or display a confirmation message.

The full list of the `oidcConfig` corresponds to the `AuthProviderProps` and includes the following props:
```ts
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
   * defaults to 'location=no,toolbar=no,width=500,height=500,left=100,top=100'
   */
  popupWindowFeatures?: string;
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
   * On sign out hook. Can be a async function.
   * @param userData User
   */
  onSignIn?: (userData: User | null) => Promise<void> | void;
  /**
   * On sign out hook. Can be a async function.
   */
  onSignOut?: (options?: AuthProviderSignOutProps) => Promise<void> | void;
};
```

### Consume `AuthContext`:
To consume `AuthContext` you may use `useBodilessOidc` hook:

```js
import { useBodilessOidc } from '@bodiless/oidc';

const UserPreview:FC<any> = props => {
    // Get `userData` from the AuthContext.
    // See `AuthContextProps`.
  const { userData, signIn, signOut } = useBodilessOidc();

  // See if we logged in display a first name.
  // If `userData` is `null` it means user in not authenticated.
  if (userData) {
    return (
      <div>
        <h3>Hi! My name is {userData.profile.given_name}!</h3>
        <button onClick={()=>signOut()}>Sign Out</button>
      </div>
    );
  // If not logged in display Sign In button.
  } else {
    return (
      <button onClick={()=>signIn()}>Sign In</button>
    );
  }
};
```

Here is a list of all `useBodilessOidc` props:

```ts
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
  signOutRedirect: (args?: SignoutRedirectArgs) => Promise<void>;
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
```

### Helper HOCs
There are several HOCs exported from the `@bodiless/oidc` package that may be used to add OIDC functionality to the components:

 - `withSignInOnClick` - HOC that adds an `onClick` event to the underlying component and invokes OIDC `signIn` handler when executed.
 - `withSignOutOnClick` - HOC that adds an `onClick` event to the underlying component and invokes OIDC `signOut` handler when executed.
 - `withSignInPopupOnClick` - HOC that adds an `onClick` event to the underlying component and invokes OIDC `signInPopup` handler when executed.
 - `withSignOutRedirectOnClick` - HOC that adds an `onClick` event to the underlying component and invokes OIDC `signOutRedirect` handler when executed.

```js
import { Button } from '@bodiless/fclasses';
import { withSignInOnClick, withSignOutOnClick } from '@bodiless/oidc';

const SignInButton = withSignInOnClick(Button);
/**
 * `withSignOutOnClick` does not end provider session,
 * only the local session is closed. When user tries to login after
 * this type of Sign Out, provider will usually authorize user without
 * a need to re-enter credentials.
 */
const SignOutButton = withSignOutOnClick(Button);

/**
 * `withSignOutRedirectOnClick` closes both: local and provider sessions.
 * This is the complete Sign Out and user credentials will be required
 * to login next time.
 *
 * Accepts optional `post_logout_redirect_uri` and `state` arguments.
 * `post_logout_redirect_uri` is the redirect after successfull closing
 * of the provider session.
 */
const SignOutRedirectButton = withSignOutRedirectOnClick({
  // Redirect to the current page when Sign Out is complete.
  post_logout_redirect_uri: window.location.href,
})(Button);

const UserPreview:FC<any> = props => {
  const { userData } = useBodilessOidc();

  if (userData) {
    return (
      <div>
        <h3>Hi! My name is {userData.profile.given_name}!</h3>
        <SignOutButton>Sign Out</SignOutButton>
        <SignOutRedirectButton>Sign Out Redirect</SignOutRedirectButton>
      </div>
    );
  } else {
    return (
      <SignInButton>Sign In</SignInButton>
    );
  }
};
```

### `AuthCallback` Component
This component handles OIDC Sign In and Sign Out responses. It reads the OIDC/OAuth2 provider response data from the URL and initializes `signinCallback` or `signoutCallback` with this data.

When you define OIDC config, `redirectUri` and `postLogoutRedirectUri` should point to the page with `<AuthCallback />` component.

```js
import { Page } from '@bodiless/gatsby-theme-bodiless';
import { AuthCallback } from '@bodiless/oidc';

/**
 * In addition to the `onSignIn` and `onSignOut` callbacks
 * from the OIDC config, we can add `onSuccess` and `onError` handlers
 * to the `<AuthCallback />` component.
 */
const onSuccess = (user: User | null) => {
  // ... do something when auth callback is successfull.
};

const onError = (error) => {
  // ... do something when auth callback has failed.
};

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <AuthCallback onSuccess={onSuccess} onError={onError} />
    </Layout>
  </Page>
);

```

#### Use `withAuthCallback`
You can wrap any page or component with `withAuthCallback()` HOC. It takes `onSuccess` and `onError` optional params.
```js
import React from 'react';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import { withAuthCallback } from '@bodiless/oidc';
import Layout from '../../../components/Layout';

// Create onSuccess handler
const onSuccess = (user: User | null) => {...};

// Wrap the default Layout component with the `AuthCallback`.
const PageLayout = withAuthCallback({ onSuccess })(Layout);

export default (props: any) => (
  <Page {...props}>
    <PageLayout>
      // OIDC redirects to this page with valid response in URL
      // will Sign In or Sign Out user.
      ...
    </PageLayout>
  </Page>
);
```