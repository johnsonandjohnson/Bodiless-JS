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

/* eslint-disable no-console */

const fs = require('fs');

const shouldOverwrite = process.argv[2] && process.argv[2] === '--overwrite';

function logNotice(msg) {
  console.log(`\u001B[96m> ${msg}\u001B[0m`);
}
function logWarn(msg) {
  console.log(`\x1b[33m> ${msg}\x1b[33m`);
}
function logError(msg) {
  console.error(`\x1b[31m> ${msg}\x1b[31m`);
}

function generateEnvironmentVariables(source, target) {
  if (!source) {
    logError(`source environment variable file ${source} is not found`);
    return;
  }
  const targetExists = fs.existsSync(target);
  if (targetExists && !shouldOverwrite) {
    logNotice(`environment variable file ${target} already exists. try using --overwrite if you want to overwrite it`);
    return;
  }
  if (targetExists && shouldOverwrite) {
    logWarn('environment variable file exists and will be overwritten');
  }
  fs.copyFileSync(source, target);
}

const shouldOverwriteMsg = shouldOverwrite ? 'existing environments will be overwritten' : '';
logNotice(`environment variables generation started. ${shouldOverwriteMsg}`);
generateEnvironmentVariables('.env.default', '.env.development');
generateEnvironmentVariables('.env.default', '.env.production');
logNotice('environment variables generation finished');
