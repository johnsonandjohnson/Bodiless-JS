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
import path from 'path';

enum Stage {
  Build = 'build',
  Deploy = 'deploy',
}

const ssiConfPath = process.env.SSI_CONF_PATH;
const ssiEnv = process.env.SSI_ENV || 'dev';
const documentRoot = process.env.DOCUMENT_ROOT;
const writableVolumeDir = process.env.VOLUME_DIR;

const handleError = (err: any) => {
  throw new Error(err);
};

const handleNotice = (msg: string) => {
  // eslint-disable-next-line no-console
  console.info(msg);
};

const getSSIEntities = () => {
  if (ssiConfPath !== undefined) {
    const ssiConf = fs.readFileSync(ssiConfPath).toString();
    return JSON.parse(ssiConf);
  }
  return [];
};

const getSSIFile = (SSIkey: string) => `${SSIkey}.html`;

const build = () => {
  if (ssiConfPath === undefined) {
    handleNotice('skipping ssi files generation since ssi is not configured.');
    return;
  }
  if (!fs.existsSync(ssiConfPath)) {
    handleNotice(`skipping ssi files generation since ssi conf path: ${ssiConfPath} does not exist.`);
    return;
  }
  if (documentRoot === undefined) {
    handleError('Invalid input. DOCUMENT_ROOT environment variable is not set.');
    return;
  }
  if (writableVolumeDir === undefined) {
    handleError('Invalid input. VOLUME_DIR environment variable is not set.');
    return;
  }
  const ssiEntities = getSSIEntities();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Object.keys(ssiEntities).forEach((ssiEntityKey, value) => {
    if (ssiEntities[ssiEntityKey].pragma) {
      const file = getSSIFile(ssiEntityKey);
      const targetFile = path.resolve(writableVolumeDir, file);
      const srcFile = path.resolve(documentRoot, file);
      fs.symlink(targetFile, srcFile, err => {
        if (err) {
          handleError(err);
        }
      });
    }
  });
};

const deploy = () => {
  if (ssiConfPath === undefined) {
    return;
  }
  if (writableVolumeDir === undefined) {
    handleError('Invalid input. VOLUME_DIR environment variable is not set.');
    return;
  }
  const ssiEntities = getSSIEntities();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Object.keys(ssiEntities).forEach((ssiEntityKey, value) => {
    if (ssiEntities[ssiEntityKey].pragma) {
      if (ssiEntities[ssiEntityKey][ssiEnv] && ssiEntities[ssiEntityKey][ssiEnv].file) {
        const ssiConfDir = path.dirname(ssiConfPath);
        const sourceFile = path.resolve(ssiConfDir, ssiEntities[ssiEntityKey][ssiEnv].file);
        const targetFile = path.resolve(writableVolumeDir, getSSIFile(ssiEntityKey));
        fs.copyFile(sourceFile, targetFile, err => {
          if (err) {
            handleError(err);
          }
        });
      }
    }
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
