/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/explicit-function-return-type: 0 */
import React from 'react';

import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
import { AuthContext } from '../src/AuthContext';
import { AuthProvider } from '../src/AuthProvider';

const events = {
  addUserLoaded: () => undefined,
  removeUserLoaded: () => undefined,
};

jest.mock('oidc-client-ts', () => ({
  UserManager: jest.fn().mockImplementation(() => ({
    getUser: jest.fn(),
    signinRedirect: jest.fn(),
    events,
  })),
  WebStorageStateStore: jest.fn(),
}));

describe('AuthProvider', () => {
  it('should check for user and redirect', async () => {
    await act(async () => {
      const u = {
        getUser: jest.fn(),
        signinRedirect: jest.fn(),
        events,
      } as any;
      const onBeforeSignIn = jest.fn();

      const oidcConfig = {
        userManager: u,
        onBeforeSignIn,
        autoSignIn: true,
        clientId: '',
        redirectUri: '',
        authority: '',
      };
      const wrapper = mount(<AuthProvider {...oidcConfig} />);
      return new Promise(resolve => setImmediate(resolve)).then(() => {
        setImmediate(() => {
          wrapper.update();
          expect(u.getUser).toHaveBeenCalled();
          expect(onBeforeSignIn).toHaveBeenCalled();
          expect(u.signinRedirect).toHaveBeenCalled();
        });
      });
    });
  });

  it('should redirect when asked', async () => {
    await act(async () => {
      const u = {
        getUser: jest.fn(),
        signinRedirect: jest.fn(),
        events,
      } as any;
      const oidcConfig = {
        userManager: u,
        clientId: '',
        redirectUri: '',
        authority: '',
        autoSignIn: false,
      };
      const wrapper = mount(
        <AuthProvider {...oidcConfig}>
          <AuthContext.Consumer>
            {value => {
              value?.signIn();
              return <p>Bjerk</p>;
            }}
          </AuthContext.Consumer>
        </AuthProvider>,
      );
      return new Promise(resolve => setImmediate(resolve)).then(() => {
        setImmediate(() => {
          wrapper.update();
          expect(u.getUser).toHaveBeenCalled();
          expect(u.signinRedirect).toHaveBeenCalled();
        });
      });
    });
  });

  it('should open Popup when asked', async () => {
    const u = {
      getUser: jest.fn(),
      signinPopupCallback: jest.fn(),
      signinPopup: jest.fn(),
      events,
    } as any;
    const oidcConfig = {
      userManager: u,
      clientId: '',
      redirectUri: '',
      authority: '',
      autoSignIn: false,
    };

    await act(async () => {
      mount(
        <AuthProvider {...oidcConfig}>
          <AuthContext.Consumer>
            {value => {
              value?.signInPopup();
              return <p>Bjerk</p>;
            }}
          </AuthContext.Consumer>
        </AuthProvider>,
      );
    });
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      expect(u.signinPopupCallback).toHaveBeenCalled();
      expect(u.signinPopup).toHaveBeenCalled();
    });
  });

  it('should not redirect when asked', async () => {
    const u = {
      getUser: jest.fn(),
      events,
    } as any;
    const oidcConfig = {
      userManager: u,
      clientId: '',
      redirectUri: '',
      authority: '',
      autoSignIn: false,
    };
    await act(async () => {
      mount(<AuthProvider {...oidcConfig} />);
    });
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      expect(u.getUser).toHaveBeenCalled();
    });
  });

  it('should generate a UserManager', async () => {
    const oidcConfig = {
      clientId: 'client-id-test',
      redirectUri: 'http://127.0.0.1',
      authority: 'http://127.0.0.1',
    };
    const wrapper = mount(<AuthProvider {...oidcConfig} />);
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      wrapper.update();
      expect(UserManager).toHaveBeenCalled();
    });
  });

  it('should use post-logout redirect URI when given', async () => {
    const oidcConfig = {
      clientId: 'client-id-test',
      redirectUri: 'http://127.0.0.1',
      authority: 'http://127.0.0.1',
      postLogoutRedirectUri: 'https://localhost',
    };

    const wrapper = mount(<AuthProvider {...oidcConfig} />);
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      wrapper.update();
      expect(UserManager).toHaveBeenLastCalledWith(
        expect.objectContaining({
          post_logout_redirect_uri: 'https://localhost',
        }),
      );
    });
  });

  it('should fall back to redirectUri when post-logout redirect URI is not given', async () => {
    const oidcConfig = {
      clientId: 'client-id-test',
      redirectUri: 'http://127.0.0.1',
      authority: 'http://127.0.0.1',
    };
    const wrapper = mount(<AuthProvider {...oidcConfig} />);
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      wrapper.update();
      expect(UserManager).toHaveBeenLastCalledWith(
        expect.objectContaining({
          post_logout_redirect_uri: 'http://127.0.0.1',
        }),
      );
    });
  });

  it('should use silent redirect URI when given', async () => {
    const oidcConfig = {
      clientId: 'client-id-test',
      redirectUri: 'http://127.0.0.1',
      authority: 'http://127.0.0.1',
      silentRedirectUri: 'https://localhost',
    };
    const wrapper = mount(<AuthProvider {...oidcConfig} />);

    return new Promise(resolve => setImmediate(resolve)).then(() => {
      wrapper.update();
      expect(UserManager).toHaveBeenLastCalledWith(
        expect.objectContaining({ silent_redirect_uri: 'https://localhost' }),
      );
    });
  });

  it('should fall back to redirectUri when silent redirect URI is not given', async () => {
    const oidcConfig = {
      clientId: 'client-id-test',
      redirectUri: 'http://127.0.0.1',
      authority: 'http://127.0.0.1',
    };
    const wrapper = mount(<AuthProvider {...oidcConfig} />);

    return new Promise(resolve => setImmediate(resolve)).then(() => {
      wrapper.update();
      expect(UserManager).toHaveBeenLastCalledWith(
        expect.objectContaining({ silent_redirect_uri: 'http://127.0.0.1' }),
      );
    });
  });

  it('should get userData', async () => {
    await act(async () => {
      const userManager = {
        getUser: async () => ({
          access_token: 'token',
        }),
        signinCallback: jest.fn(),
        events,
      } as any;
      const oidcConfig = {
        userManager,
        clientId: '',
        redirectUri: '',
        authority: '',
      };
      const wrapper = mount(
        <AuthProvider {...oidcConfig}>
          <AuthContext.Consumer>
            {value => value?.userData && (
            <span>
              Received:
              {value.userData.access_token}
            </span>
            )}
          </AuthContext.Consumer>
        </AuthProvider>,
      );
      return new Promise(resolve => setImmediate(resolve)).then(() => {
        setImmediate(() => {
          wrapper.update();
          expect(wrapper.text()).toBe('Received:token');
        });
      });
    });
  });

  it('should refresh userData when new data is available', async () => {
    await act(async () => {
      const userManager = {
        getUser: async () => ({
          access_token: 'token',
        }),
        signinCallback: jest.fn(),
        events: {
          addUserLoaded: (fn: () => void) => fn(),
          removeUserLoaded: () => undefined,
        },
      } as any;
      const oidcConfig = {
        userManager,
        clientId: '',
        redirectUri: '',
        authority: '',
      };
      const wrapper = mount(
        <AuthProvider {...oidcConfig}>
          <AuthContext.Consumer>
            {value => value?.userData && (
            <span>
              Received:
              {value.userData.access_token}
            </span>
            )}
          </AuthContext.Consumer>
        </AuthProvider>,
      );
      return new Promise(resolve => setImmediate(resolve)).then(() => {
        setImmediate(() => {
          wrapper.update();
          expect(wrapper.text()).toBe('Received:token');
        });
      });
    });
  });

  it.skip('should login the user', async () => {
    await act(async () => {
      const userManager = {
        getUser: jest.fn(),
        signinCallback: jest.fn(),
        signinRedirect: jest.fn(),
        events,
      } as any;
      const onSignIn = jest.fn();
      const location = {
        search: '?code=test-code',
        hash: '',
      } as Location;
      const oidcConfig = {
        userManager,
        clientId: '',
        redirectUri: '',
        authority: '',
        location,
        onSignIn,
      };

      const wrapper = mount(<AuthProvider {...oidcConfig} />);
      return new Promise(resolve => setImmediate(resolve)).then(() => {
        setImmediate(() => {
          wrapper.update();
          expect(onSignIn).toHaveBeenCalled();
          expect(userManager.signinCallback).toHaveBeenCalled();
        });
      });
    });
  });

  it('should logout the user', async () => {
    await act(async () => {
      const userManager = {
        getUser: async () => ({
          access_token: 'token',
        }),
        removeUser: jest.fn(),
        events,
      } as any;
      const onSignOut = jest.fn();
      const { location } = window;

      const oidcConfig = {
        userManager,
        clientId: '',
        redirectUri: '',
        authority: '',
        location,
        onSignOut,
      };

      const wrapper = mount(
        <AuthProvider {...oidcConfig}>
          <AuthContext.Consumer>
            {value => {
              value?.signOut();
              return <p>Bjerk</p>;
            }}
          </AuthContext.Consumer>
        </AuthProvider>,
      );
      return new Promise(resolve => setImmediate(resolve)).then(() => {
        setImmediate(() => {
          wrapper.update();
          expect(onSignOut).toHaveBeenCalled();
          expect(userManager.removeUser).toHaveBeenCalled();
        });
      });
    });
  });

  it('should end session and logout the user when signoutRedirect is true', async () => {
    await act(async () => {
      const userManager = {
        getUser: async () => ({
          access_token: 'token',
        }),
        signoutRedirect: jest.fn(),
        events,
      } as any;
      const onSignOut = jest.fn();
      const { location } = window;

      const oidcConfig = {
        userManager,
        clientId: '',
        redirectUri: '',
        authority: '',
        location,
        onSignOut,
      };

      const wrapper = mount(
        <AuthProvider {...oidcConfig}>
          <AuthContext.Consumer>
            {value => {
              value?.signOutRedirect();
              return <p>Bjerk</p>;
            }}
          </AuthContext.Consumer>
        </AuthProvider>,
      );
      return new Promise(resolve => setImmediate(resolve)).then(() => {
        setImmediate(() => {
          wrapper.update();
          expect(onSignOut).toHaveBeenCalled();
          expect(userManager.signoutRedirect).toHaveBeenCalled();
        });
      });
    });
  });
});
