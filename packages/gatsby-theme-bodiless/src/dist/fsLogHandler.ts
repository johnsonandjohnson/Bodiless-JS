/**
 * Copyright © 2020 Johnson & Johnson
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

/* eslint-disable global-require */

declare global {
  namespace NodeJS {
    interface Global {
      BODILESS_GATSBY_LOGS: string[];
    }
  }
}

const LOG_FILE = 'gatsby_error.log';

const log = (message: string) => {
  global.BODILESS_GATSBY_LOGS = global.BODILESS_GATSBY_LOGS || [];
  global.BODILESS_GATSBY_LOGS.push(message);
};

/**
 * flush logs to a file and clear global object
 * @param message that will be prepended to the logs
 */
const flush = (message: string) => {
  try {
    const { appendFileSync } = require('fs');
    const { EOL } = require('os');
    const data = message
      .concat(EOL)
      .concat(global.BODILESS_GATSBY_LOGS.join(EOL))
      .concat(EOL);
    appendFileSync(LOG_FILE, data);
    global.BODILESS_GATSBY_LOGS = [];
  } catch (e) {
    throw new Error('There is an error found during log flushing');
  }
};

const validate = () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { existsSync } = require('fs');
    if (existsSync(LOG_FILE)) {
      throw new Error(`Some errors found. Check ${LOG_FILE} for details.`);
    }
  } catch (e) {
    throw e;
  }
};

const clear = () => {
  try {
    const { unlinkSync } = require('fs');
    unlinkSync(LOG_FILE);
  } catch (e) {
    if (e.code !== 'ENOENT') {
      throw e;
    }
  }
};

const hasLogs = () => global.BODILESS_GATSBY_LOGS && global.BODILESS_GATSBY_LOGS.length > 0;

export {
  log,
  flush,
  hasLogs,
  validate,
  clear,
};
