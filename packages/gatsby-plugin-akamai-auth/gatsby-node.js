const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const FileStore = require('session-file-store')(session);
// eslint-disable-next-line
const authMiddleware = require('./dist/auth').default;
// Define options for session file storage:
// eslint-disable-next-line
const { FileStoreSessionOptions } = require('./dist/configs/config').default;
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const authenticationEnabled = (process.env.AUTHENTICATION_ENABLED || '1') === '1';

/**
 * Check the settings for the minimum amount
 * @param options
 * @returns {*|string|string}
 */
const verifyJanrainAppSettings = options => {
  // Check for the client secret in the env variable.
  if ('JANRAIN_CLIENT_SECRET' in process.env) {
    // Then check other settings.
    return (
      options.JanrainAppSettings
      && options.JanrainAppSettings.settings.tokenUrl
      && options.JanrainAppSettings.settings.capture.clientId
      && options.JanrainAppSettings.settings.capture.appId
      && options.JanrainAppSettings.settings.capture.appDomain
      && options.JanrainAppSettings.settings.capture.captureServer
      && options.JanrainAppSettings.httpLoadUrl
      && options.JanrainAppSettings.httpsLoadUrl
    );
  }
  return false;
};

/*
 * Creat an authentication middleware.
 */
exports.onCreateDevServer = ({ app }, options) => {
  if (authenticationEnabled) {
    // Check for correct configuration.
    if (!verifyJanrainAppSettings(options)) {
      throw new Error(
        'Missing required Janrain/Akamai client secret or app settings. Please refer to the documentation.',
      );
    }
    // Add the configuration to the app for later use.
    app.set('JanrainAppSettings', options.JanrainAppSettings);
    // Trust reverse proxy otherwise the app won't work.
    app.enable('trust proxy');
    // Initialize cookie-parser to allow us access the cookies stored in the browser.
    app.use(cookieParser());
    // Merge base session options and those configured in gatby-config.js
    let fileStoreSessionOptions = FileStoreSessionOptions;
    if (typeof options.FileStoreSessionOptions !== 'undefined') {
      fileStoreSessionOptions = Object.assign(
        options.FileStoreSessionOptions,
        FileStoreSessionOptions,
      );
    }
    // Warn against using the default session secret.
    if (fileStoreSessionOptions.secret === 'SUPERSECRETSTRING') {
      console.warn(
        'Using default session secret is strongly discouraged. Please use a secure session secret',
      );
    }
    // Initialize express-session to allow us track the logged-in users.
    app.use(
      session({
        authenticated: undefined,
        userData: {
          uuid: '',
          email: '',
          givenName: '',
        },
        store: new FileStore(fileStoreSessionOptions),
        name: 'user.sid',
        secret: fileStoreSessionOptions.secret,
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: true,
          httpOnly: true,
        }
      }),
    );
    // Initialize body-parser to parse incoming parameters requests to req.body.
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/janrain/styles', express.static(path.join(__dirname, 'dist', 'janrain', 'styles')),);
    app.use(
      '/janrain/scripts/janrain-utils.js',
      express.static(
        path.join(__dirname, 'dist', 'janrain', 'scripts', 'janrain-utils.js'),
      ),
    );
    // Define a login route which serves Janrain/Akamai login widget.
    app.get('/login', authMiddleware.login);
    app.get(['/janrain/scripts/janrain-init.js'], authMiddleware.janrainInit);
    app.get('/logout', authMiddleware.logout);
    app.post('/check-login', authMiddleware.checkLogin);
    // Redirect all unauthenticated traffic to /login.
    app.use(authMiddleware.authenticate);
  }
};
