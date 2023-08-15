/**
 * Copyright © 2022 Johnson & Johnson
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

afterEach(() => {
  jest.clearAllMocks();
});

describe('AuthProvider', () => {
  it('should check for user and redirect', async () => {
    const userManager = {
      getUser: jest.fn(),
      signinRedirect: jest.fn(),
      events,
    } as any;
    const onBeforeSignIn = jest.fn();
    const oidcConfig = {
      userManager,
      onBeforeSignIn,
      autoSignIn: true,
      clientId: '',
      redirectUri: '',
      authority: '',
    };
    const wrapper = mount(<AuthProvider {...oidcConfig} />);
    await act(async () => {
      wrapper.update();
    });
    expect(userManager.getUser).toHaveBeenCalled();
    expect(onBeforeSignIn).toHaveBeenCalled();
    expect(userManager.signinRedirect).toHaveBeenCalled();
  });

  it('should redirect when asked', async () => {
    const userManager = {
      getUser: jest.fn(),
      signinRedirect: jest.fn(),
      events,
    } as any;
    const oidcConfig = {
      userManager,
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
    await act(async () => {
      wrapper.update();
    });
    expect(userManager.getUser).toHaveBeenCalled();
    expect(userManager.signinRedirect).toHaveBeenCalled();
  });

  it('should open Popup when asked', async () => {
    const userManager = {
      getUser: jest.fn(),
      signinPopupCallback: jest.fn(),
      signinPopup: jest.fn(),
      events,
    } as any;
    const oidcConfig = {
      userManager,
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
    expect(userManager.signinPopupCallback).toHaveBeenCalled();
    expect(userManager.signinPopup).toHaveBeenCalled();
  });

  it('should not redirect when asked', async () => {
    const userManager = {
      getUser: jest.fn(),
      events,
    } as any;
    const oidcConfig = {
      userManager,
      clientId: '',
      redirectUri: '',
      authority: '',
      autoSignIn: false,
    };
    await act(async () => {
      mount(<AuthProvider {...oidcConfig} />);
    });
    expect(userManager.getUser).toHaveBeenCalled();
  });

  it('should generate a UserManager', async () => {
    const oidcConfig = {
      clientId: 'client-id-test',
      redirectUri: 'http://127.0.0.1',
      authority: 'http://127.0.0.1',
    };
    const wrapper = mount(<AuthProvider {...oidcConfig} />);
    await act(async () => {
      wrapper.update();
    });
    expect(UserManager).toHaveBeenCalled();
  });

  it('should use post-logout redirect URI when given', async () => {
    const oidcConfig = {
      clientId: 'client-id-test',
      redirectUri: 'http://127.0.0.1',
      authority: 'http://127.0.0.1',
      postLogoutRedirectUri: 'https://localhost',
    };

    const wrapper = mount(<AuthProvider {...oidcConfig} />);
    await act(async () => {
      wrapper.update();
    });
    expect(UserManager).toHaveBeenLastCalledWith(
      expect.objectContaining({
        post_logout_redirect_uri: 'https://localhost',
      }),
    );
  });

  it('should fall back to redirectUri when post-logout redirect URI is not given', async () => {
    const oidcConfig = {
      clientId: 'client-id-test',
      redirectUri: 'http://127.0.0.1',
      authority: 'http://127.0.0.1',
    };
    const wrapper = mount(<AuthProvider {...oidcConfig} />);
    await act(async () => {
      wrapper.update();
    });
    expect(UserManager).toHaveBeenLastCalledWith(
      expect.objectContaining({
        post_logout_redirect_uri: 'http://127.0.0.1',
      }),
    );
  });

  it('should use silent redirect URI when given', async () => {
    const oidcConfig = {
      clientId: 'client-id-test',
      redirectUri: 'http://127.0.0.1',
      authority: 'http://127.0.0.1',
      silentRedirectUri: 'https://localhost',
    };
    const wrapper = mount(<AuthProvider {...oidcConfig} />);

    await act(async () => {
      wrapper.update();
    });
    expect(UserManager).toHaveBeenLastCalledWith(
      expect.objectContaining({ silent_redirect_uri: 'https://localhost' }),
    );
  });

  it('should fall back to redirectUri when silent redirect URI is not given', async () => {
    const oidcConfig = {
      clientId: 'client-id-test',
      redirectUri: 'http://127.0.0.1',
      authority: 'http://127.0.0.1',
    };
    const wrapper = mount(<AuthProvider {...oidcConfig} />);

    await act(async () => {
      wrapper.update();
    });
    expect(UserManager).toHaveBeenLastCalledWith(
      expect.objectContaining({ silent_redirect_uri: 'http://127.0.0.1' }),
    );
  });

  it.skip('should get userData', async () => {
    const userManager = {
      getUser: async () => ({
        access_token: 'token',
      }),
      signinRedirect: jest.fn(),
      signinPopup: jest.fn(),
      events,
    } as any;

    const oidcConfig = {
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

    await act(async () => {
      wrapper.update();
    });
    setImmediate(() => {
      expect(wrapper.text()).toBe('Received:token');
    });
  });

  it.skip('should refresh userData when new data is available', async () => {
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
    await act(async () => {
      wrapper.update();
    });
    expect(wrapper.text()).toBe('Received:token');
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
    await act(async () => {
      wrapper.update();
    });
    expect(onSignOut).toHaveBeenCalled();
    expect(userManager.removeUser).toHaveBeenCalled();
  });

  it('should end session and logout the user when signoutRedirect is true', async () => {
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
    await act(async () => {
      wrapper.update();
    });
    expect(onSignOut).toHaveBeenCalled();
    expect(userManager.signoutRedirect).toHaveBeenCalled();
  });
});
