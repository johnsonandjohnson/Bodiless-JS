// @ts-nocheck

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

import * as https from 'https';
import * as path from 'path';
import * as fs from 'fs';
import config from './configs/config';

const { clientSecret } = config;
const janrainInit = (req, resp) => {
  const janrainAppSettings = req.app.get('JanrainAppSettings');
  // Read the static js file.
  fs.readFile(path.join(__dirname, req.originalUrl), 'utf8', (err, file) => {
    if (err) throw err;
    resp.setHeader('Content-Type', 'application/javascript');
    resp.send(
      // Fill in the necessary janrain setting in the JS file before serving it.
      // @Todo is there a better way to fill in the settings?
      file.replace(
        "'DUMMY_VALUE_REPLACED_ON_RENDER'",
        JSON.stringify(janrainAppSettings),
      ),
    );
  });
};

const login = (req, resp, next) => {
  if (typeof req.session.authenticated === 'undefined') {
    // Check if we are requesting a janrain static file.
    resp.sendFile(path.join(__dirname, '/janrain/index.html'));
  } else {
    next();
  }
};

const authenticate = (req, res, next) => {
  const { _parsedUrl: parsedUrl } = req;
  // Prevent this from throwing errors as the browser redirect favicon to login.
  if (parsedUrl.pathname === '/favicon.ico') return next();

  if (typeof req.session !== 'undefined' && typeof req.session.authenticated === 'undefined') {
    res.redirect('/login');
  }
  return next();
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } else {
      res.clearCookie('user.sid');
      res.redirect('/login');
    }
  });
};

const getJanrainToken = (req, authorizationCode, callback, err) => {
  const janrainAppSettings = req.app.get('JanrainAppSettings');
  const { clientId, redirectUri, appDomain } = janrainAppSettings.settings.capture;
  const janrainRedirectUri = redirectUri || req.headers.origin;
  const authCreds = `${clientId}:${clientSecret}`;
  const options = {
    protocol: 'https:',
    port: 443,
    host: `${appDomain}.janraincapture.com`,
    path: `/oauth/token?code=${authorizationCode}&grant_type=authorization_code&redirect_uri=${janrainRedirectUri}`,
    method: 'POST',
    auth: authCreds,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ciphers: 'DES-CBC3-SHA',
    },
  };

  const request = https.request(options, res => {
    res.setEncoding('utf8');
    let chunks = '';
    res.on('data', data => {
      chunks += data;
    });
    res.on('end', () => {
      if (res.headers['content-type'] === 'application/json') {
        callback(JSON.parse(chunks));
      }
    });
    res.on('error', e => {
      console.log(e);
      err(e, request);
    });
  });
  request.end();
};

const checkLogin = (req, res) => {
  const data = Object.keys(req.body)[0];
  const jsonData = JSON.parse(data);
  // Only evaluate if we have not retrieved an access token and started a session already.
  if (!req.session.accessToken) {
    const {
      uuid,
      email,
      name,
      authorizationCode,
    } = jsonData;
    if (authorizationCode === null) {
      res.redirect('/login');
    }
    // Call janrain to get an access token using the oauth/token endpoint.
    getJanrainToken(
      req,
      authorizationCode,
      janrainRespData => {
        const {
          access_token: accessToken,
          expires_in: expires,
          stat,
        } = janrainRespData;
        if (stat !== 'ok') {
          console.error('Error received from janrain:', janrainRespData);
          res.status(401);
          res.send(JSON.stringify({ 'janrain-resp': janrainRespData }));
        }
        if (stat === 'ok') {
          req.session.accessToken = accessToken;
          req.session.name = name;
          req.session.uuid = uuid;
          req.session.email = email;
          req.session.expires = expires;
          req.session.authenticated = true;
          req.session.save();
          res.cookie('author', `${name} <${email}>`, { secure: true, httpOnly: true });
          res.status(200);
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({ janrainRespData }));
        }
      },
      // @todo better logging
      () => {
        res.status(500);
        res.send('An unkown error occured, please check logs.');
      },
    );
  }
};

const Auth = {
  janrainInit,
  login,
  authenticate,
  logout,
  checkLogin,
};

export default Auth;
