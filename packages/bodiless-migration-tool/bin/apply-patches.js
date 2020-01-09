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

const shell = require('shelljs');
const path = require('path');
const fs = require('fs');
const debug = require('debug')('migration_tool');

const patchesDir = path.resolve(__dirname, '..', 'patches');

const getPatches = patchesDir1 => {
  try {
    const patchesNames = fs.readdirSync(patchesDir);
    if (patchesNames.length) {
      const pathsToPatches = patchesNames.map(patchName => (
        path.resolve(patchesDir1, patchName)
      )).join(' ');
      return pathsToPatches;
    }
  } catch (error) {
    debug(error);
    return '';
  }
  return '';
};

const getAppRootDir = () => {
  const currentWorkDir = process.cwd();
  // process.cwd is unrelieble, so lets check where
  // the package is actually located and get home directory based on it.
  const staticPaths = [
    // Monorepo.
    path.join('packages', 'bodiless-migration-tool', 'bin'),
    // Starterkit.
    path.join('node_modules', '@bodiless', 'migration-tool', 'bin'),
  ];
  const staticAppRootDir = staticPaths
    .filter(staticPath => __dirname.endsWith(staticPath))
    .map(staticPath => __dirname.replace(staticPath, ''))
    .pop();
  return staticAppRootDir || currentWorkDir;
};

const composeGitApplyCommand = (patchesPaths, appRootDir) => {
  const gitApplyCommandString = [
    'git --bare',
    `apply ${patchesPaths}`,
    `--directory=${appRootDir}`,
    '--unsafe-paths --ignore-space-change --reject',
  ].join(' ');
  return gitApplyCommandString;
};

const init = () => {
  const patches = getPatches(patchesDir);
  if (patches) {
    const appRootDir = getAppRootDir();
    const gitApplyCommand = composeGitApplyCommand(patches, appRootDir);
    debug('Applying patches:', '\n', gitApplyCommand, '\n');
    shell.exec(gitApplyCommand);
  }
};

init();
