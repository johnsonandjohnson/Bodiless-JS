/**
 * Copyright © 2019 Johnson & Johnson
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

/* eslint-disable no-console */
const net = require('net');

let timeout = 10;

/**
 * Wait for the pm2 socket to be available.
 */
const tryToConnect = () => {
  const client = net.createConnection('/app/.pm2/rpc.sock')
    .on('connect', () => {
      console.log('PM2 socket is ready');
      client.end();
      process.exit(0);
    })
    .on('error', () => {
      if (timeout > 0) {
        timeout -= 1;
        console.log('Waiting for PM2 Socket...');
        setTimeout(tryToConnect, 1000);
      } else {
        console.log('Could not connect to PM2 socket!');
        process.exit(1);
      }
    });
};

tryToConnect();
