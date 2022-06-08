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

/*
Initializations and settings for the Capture Widget.

For more information about these settings, see the following documents:
    https://identitydocs.akamai.com/home/registration-javascript-apis-settings
    https://identitydocs.akamai.com/home/the-reference-implementation
*/

/* eslint-disable */

(function() {
  // Check for settings. If there are none, create them
  if (typeof window.janrain !== 'object') window.janrain = {};
  if (typeof window.janrain.settings !== 'object') window.janrain.settings = {};
  if (typeof window.janrain.settings.capture !== 'object')
    window.janrain.settings.capture = {};

  /*--- Application Settings -----------------------------------------------*\

        When transitioning from a development to production, these are the
        settings that need to be changed. Others may also need to be changed if
        you have purchased optional products and features, such as Federate.
        Those settings are located below.

        janrain.settings.appUrl:
            The URL of your Engage application.
            Example: https://your-company.rpxnow.com

        janrain.settings.capture.captureServer:
            The URL of your Capture application.
            Example: https://your-company.janraincapture.com

        janrain.settings.capture.appId:
            The the application ID of your Capture application.

        janrain.settings.capture.clientId:
            The client ID of the Capture application.

        Example Dev Configuration:
            janrain.settings.appUrl                = 'https://your-company-dev.rpxnow.com';
            janrain.settings.capture.captureServer = 'https://your-company-dev.janraincapture.com';
            janrain.settings.capture.appId         = <DEV CAPTURE APP ID>;
            janrain.settings.capture.clientId      = <DEV CAPTURE CLIENT ID>;
            var httpLoadUrl                        = "http://widget-cdn.rpxnow.com/load/your-company-dev";
            var httpsLoadUrl                       = "https://rpxnow.com/load/your-company-dev";

        Example Prod Configuration:
            janrain.settings.appUrl                = 'https://login.yourcompany.com';
            janrain.settings.capture.captureServer = 'https://your-company.janraincapture.com';
            janrain.settings.capture.appId         = <PROD CAPTURE APP ID>;
            janrain.settings.capture.clientId      = <PROD CAPTURE CLIENT ID>;
            var httpLoadUrl                        = "http://widget-cdn.rpxnow.com/load/login.yourcompany.com";
            var httpsLoadUrl                       = "https://rpxnow.com/load/login.yourcompany.com";

    \*------------------------------------------------------------------------*/
  // Configuration for Janrain app.
  var JanrainAppSettings = 'DUMMY_VALUE_REPLACED_ON_RENDER';

  // Load Engage and Capture. 'login' is Engage, 'capture' is Capture.
  // Changing these values without guidance can result in unexpected behavior.
  janrain.settings = JanrainAppSettings.settings;
  janrain.settings.capture.redirectUri = window.location.origin;
  var httpLoadUrl = JanrainAppSettings.httpLoadUrl;
  var httpsLoadUrl = JanrainAppSettings.httpsLoadUrl;

  function isReady() {
    janrain.ready = true;
  }
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', isReady, false);
  } else {
    window.attachEvent('onload', isReady);
  }

  var injector = document.createElement('script');
  injector.type = 'text/javascript';
  injector.id = 'janrainAuthWidget';
  if (document.location.protocol === 'https:') {
    injector.src = httpsLoadUrl;
  } else {
    injector.src = httpLoadUrl;
  }
  var firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(injector, firstScript);

  // --- END WIDGET INJECTION CODE -------------------------------------------
})();

// This function is called by the Capture Widget when it has completred loading
// itself and all other dependencies. This function is required, and must call
// janrain.capture.ui.start() for the Widget to initialize correctly.
function janrainCaptureWidgetOnLoad() {
  var implFuncs = janrainExampleImplementationFunctions(); // Located below.

  /*==== CUSTOM ONLOAD CODE START ==========================================*\
    ||  Any javascript that needs to be run before screens are rendered but   ||
    ||  after the Widget is loaded should go between this comment and "CUSTOM ||
    ||  ONLOAD CODE END" below.                                               ||
    \*                                                                        */

  /*--
        SCREEN TO RENDER:
        This setting defines which screen to render. We've set it to the result
        of implFuncs.getParameterByName() so that if you pass in a parameter
        in your URL called 'screenToRender' and provide a valid screen name,
        that screen will be shown when the Widget loads.
                                                                            --*/
  janrain.settings.capture.screenToRender = implFuncs.getParameterByName(
    'screenToRender',
  );

  /*--
        EVENT HANDLING:

        Event Documentation:
        http://developers.janrain.com/reference/javascript-api/registration-js-api/events/
    --*/
  janrain.events.onCaptureScreenShow.addHandler(
    implFuncs.enhanceReturnExperience,
  );
  janrain.events.onCaptureSaveSuccess.addHandler(implFuncs.hideResendLink);

  /*--
        NAVIGATION EVENTS:
        These event handlers are used for navigating the example implementation
        that exists on our servers for testing/demo/sample purposes. It is not
        required for your implementation, but can be modified to suit your
        needs. These event handlers are provided as an example.
                                                                            --*/
  janrain.events.onCaptureLoginSuccess.addHandler(
    implFuncs.setNavigationForLoggedInUser,
  );
  janrain.events.onCaptureSessionFound.addHandler(
    implFuncs.setNavigationForLoggedInUser,
  );
  janrain.events.onCaptureRegistrationSuccess.addHandler(
    implFuncs.setNavigationForLoggedInUser,
  );
  janrain.events.onCaptureSessionEnded.addHandler(
    implFuncs.setNavigationForLoggedOutUser,
  );
  janrain.events.onCaptureExpiredToken.addHandler(
    implFuncs.setNavigationForLoggedOutUser,
  );
  janrain.events.onCaptureAccessDenied.addHandler(
    implFuncs.setNavigationForLoggedOutUser,
  );
  janrain.events.onCaptureLoginFailed.addHandler(
    implFuncs.handleDeactivatedAccountLogin,
  );
  janrain.events.onCaptureAccountDeactivateSuccess.addHandler(
    implFuncs.handleAccountDeactivation,
  );
  janrain.events.onCaptureAccountReactivateSuccess.addHandler(
    implFuncs.handleAccountReactivationSuccess,
  );
  janrain.events.onCaptureAccountReactivateFailed.addHandler(
    implFuncs.handleAccountReactivationFailed,
  );

  /*--
        SHOW EVENTS:
        This function will log Janrain events in your browser's console. You must
        include janrain-utils.js to run this function. Comment this line to hide
        event logging.
                                                                            --*/
  janrainUtilityFunctions().showEvents();

  /*--
        SHOW FLOW VERSION:
        This event handler shows the flow version in the specified element.
        This is primarily for our developers' convenience, but your developers
        may also find it useful.
                                                                            --*/

  janrain.events.onCaptureRenderStart.addHandler(function(result) {
    implFuncs.showFlowVersion('flow-version', result);
  });
  // ======================== Gatsby Plugin Specific Code ===================
  var modalShown = false;
  janrain.events.onCaptureRenderStart.addHandler(function(result) {
    // for some reason this keep getting fired. Probably some recursion is going on. Therefore, we
    // added a global var to handle it.
    if (modalShown == false) {
      janrain.capture.ui.renderScreen('signIn');
      modalShown = true;
    }
  });

  //Get token and UUID out of local storage when session is created
  janrain.events.onCaptureSessionFound.addHandler(function(result) {
    var token = localStorage.janrainCaptureToken;
    if (token && window.location.pathname !== '/logout') {
      //Do something with token and/or UUID
      //return [token, b.uuid];
      const url = window.location.origin + '/check-login';
      fetch(url, {
        method: 'POST',
        mode: 'same-origin',
        redirect: 'follow',
        credentials: 'include',
        // credentials: 'same-origin',
        body: JSON.stringify({
          userData: result.userData,
          accessToken: result.accessToken,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
        window.location.href = '/';
        console.log(response);
      });
    }
  });

  // =================================================================
  //Write out result object with a successful login
  janrain.events.onCaptureLoginSuccess.addHandler(function(result) {
    console.log('logging onCaptureLoginSuccess result', result);
    const url = window.location.origin + '/check-login';

    // Add a spinner while we verify the token.
    const node = document.createElement('div');
    node.innerHTML = '<div class="loading">Verifying access. Please wait</div>';
    document.body.appendChild(node);

    fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        uuid: result.userData.uuid,
        email: result.userData.email,
        name: result.userData.givenName,
        authorizationCode: result.authorizationCode,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        if (response.status === 401) {
          document.title = 'Access denied'
          node.innerHTML = '<h1 class="title">Access Denied</h1><div class="content">You do not have permission to access this site.</div>';
          return response.json();
        }
        if (response.status !== 200) {
          document.title = 'Error '
          node.innerHTML = '<div class="content">Oops, an internal error occurred. Please try again later</div>';
          return response.json();
        } else {
          window.location.href = '/';
        }
      });
  });

  // =================================================================
  //Check whether user has a session when the traditional reg screen is rendered
  janrain.events.onCaptureRenderComplete.addHandler(function(result) {
    if (result.screen == 'returnTraditional') {
      if (janrain.capture.ui.hasActiveSession() == true) {
        console.log('User has a session');
      } else if (janrain.capture.ui.hasActiveSession() == false) {
        console.log('User does not have a session');
      }
    }
  });
  // ==================== END CANVASX CUSTOM CODE =========================

  /*                                                                        *\
    || *** CUSTOM ONLOAD CODE END ***                                         ||
    \*========================================================================*/

  // This should be the last line in janrainCaptureWidgetOnLoad()
  janrain.capture.ui.start();
}

// Reference implementation navigation.
function janrainExampleImplementationFunctions() {
  function setNavigationForLoggedInUser(result) {
    janrain.capture.ui.modal.close();
    document.getElementById('captureSignInLink').style.display = 'none';
    document.getElementById('captureSignOutLink').style.display = '';
    // document.getElementById('captureProfileLink').style.display = '';
  }
  function setNavigationForLoggedOutUser(result) {
    window.location = 'index.html';
  }
  function getParameterByName(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
      results = regex.exec(location.search);
    return results === null
      ? ''
      : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }
  function enhanceReturnExperience(result) {
    if (result.screen == 'returnTraditional') {
      var span = document.getElementById('traditionalWelcomeName');
      var name = janrain.capture.ui.getReturnExperienceData('displayName');
      if (span && name) {
        span.innerHTML = 'Welcome back, ' + name + '!';
      }
    }
  }
  function hideResendLink(result) {
    // Hide the 'Resend confirmation email' link if it's been clicked
    // from the edit profile page. Link will reappear if the user
    // refreshes their profile page.
    if (
      result.controlName == 'resendVerificationEmail' &&
      result.screen == 'editProfile'
    ) {
      document.getElementById('capture_editProfile_resendLink').style.display =
        'none';
    }
  }
  function handleDeactivatedAccountLogin(result) {
    if (result.statusMessage == 'accountDeactivated') {
      janrain.capture.ui.renderScreen('accountDeactivated');
    }
  }
  function handleAccountDeactivation(result) {
    if (result.status == 'success') {
      document.getElementById('editProfile').style.display = 'none';
      janrain.capture.ui.modal.close();
      janrain.capture.ui.endCaptureSession();
      window.location = 'index.html?screenToRender=accountDeactivated';
    }
  }
  function handleAccountReactivationSuccess(result) {
    if (result.status == 'success') {
      janrain.capture.ui.renderScreen('reactivateAccountSuccess');
    }
  }
  function handleAccountReactivationFailed(result) {
    if (result.status == 'error') {
      janrain.capture.ui.renderScreen('reactivateAccount');
    }
  }
  function passwordValidation(name, value) {
    return /.*/.test(value);
  }
  function showFlowVersion(elementId, result) {
    var elem = document.getElementById(elementId);
    elem.innerText = 'Flow version: ' + result.version;
  }

  var showModal = (function() {
    var executed = false;
    return function() {
      if (!executed) {
        executed = true;
        // do something
        janrain.capture.ui.renderScreen('signIn');
      }
    };
  })();
  return {
    setNavigationForLoggedInUser: setNavigationForLoggedInUser,
    setNavigationForLoggedOutUser: setNavigationForLoggedOutUser,
    getParameterByName: getParameterByName,
    enhanceReturnExperience: enhanceReturnExperience,
    hideResendLink: hideResendLink,
    handleDeactivatedAccountLogin: handleDeactivatedAccountLogin,
    handleAccountDeactivation: handleAccountDeactivation,
    handleAccountReactivationSuccess: handleAccountReactivationSuccess,
    handleAccountReactivationFailed: handleAccountReactivationFailed,
    showFlowVersion: showFlowVersion,
    showModal: showModal,
    passwordValidation: passwordValidation,
  };
}
