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
import fs from 'fs';

enum Stage {
  Build = 'build',
  Deploy = 'deploy',
}

const srcFile = process.env.PSH_URL_REPLACER_SRC_FILE;
const tmpFile = process.env.PSH_URL_REPLACER_TMP_FILE;
const targetFile = process.env.PSH_URL_REPLACER_TARGET_FILE;
const srcUrl = process.env.PSH_URL_REPLACER_SRC_URL;
const targetUrl = process.env.PSH_URL_REPLACER_TARGET_URL;
const isProdEnv = process.env.PSH_URL_REPLACER_PROD_ENV === '1';

const handleError = (err: any) => {
  throw new Error(err);
};

const handleNotice = (msg: string) => {
  // eslint-disable-next-line no-console
  console.info(msg);
};

const build = () => {
  if (srcFile === undefined) {
    handleError('Invalid input. PSH_URL_REPLACER_SRC_FILE environment variable is not set.');
    return;
  }
  if (tmpFile === undefined) {
    handleError('Invalid input. PSH_URL_REPLACER_TMP_FILE environment variable is not set.');
    return;
  }
  if (targetFile === undefined) {
    handleError('Invalid input. PSH_URL_REPLACER_TARGET_FILE environment variable is not set.');
    return;
  }
  if (!fs.existsSync(srcFile)) {
    handleNotice(`[build] skipping file processing since source file(${srcFile}) does not exist`);
    return;
  }
  fs.rename(srcFile, tmpFile, err => {
    if (err) {
      handleError(err);
      return;
    }
    fs.symlink(targetFile, srcFile, err$ => {
      if (err$) {
        handleError(err);
      }
    });
  });
};

const deploy = () => {
  if (srcUrl === undefined) {
    handleError('Invalid input. PSH_URL_REPLACER_SRC_URL environment variable is not set.');
    return;
  }
  if (targetUrl === undefined) {
    handleError('Invalid input. PSH_URL_REPLACER_TARGET_URL environment variable is not set.');
    return;
  }
  if (tmpFile === undefined) {
    handleError('Invalid input. PSH_URL_REPLACER_TMP_FILE environment variable is not set.');
    return;
  }
  if (targetFile === undefined) {
    handleError('Invalid input. PSH_URL_REPLACER_TARGET_FILE environment variable is not set.');
    return;
  }
  if (!fs.existsSync(tmpFile)) {
    handleNotice(`[deploy] skipping file processing since source file(${tmpFile}) does not exist`);
    return;
  }
  fs.readFile(tmpFile, 'utf8', (err, data) => {
    if (err) {
      handleError(err);
      return;
    }
    let result = data;
    if (!isProdEnv && srcUrl !== '' && targetUrl !== '') {
      // we need global flag to replace all occurrences
      result = data.replace(new RegExp(srcUrl, 'g'), targetUrl);
    }
    fs.writeFile(targetFile, result, 'utf8', err$ => {
      if (err$) {
        handleError(err);
      }
    });
  });
};

const main = (stage: string) => {
  switch (stage) {
    case Stage.Build:
      build();
      break;
    case Stage.Deploy:
      deploy();
      break;
    default:
      handleError(`Invalid input. Unknown stage: ${stage} specified. Allowed values: build|deploy.`);
  }
};

module.exports.main = main;

if (require.main === module) {
  main(process.argv[2]);
}
