#!/usr/bin/env node
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

/* eslint-disable no-console, import/no-dynamic-require, global-require, no-return-assign */
const fs = require('fs');
const util = require('util');
const dotenv = require('dotenv');
const path = require('path');
const glob = require('glob');
const gitCurrentBranch = require('git-branch');

const asyncGlob = util.promisify(glob);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// const DEFAULT_ENV_PACKAGE = 'gatsby-theme-bodiless';
// const DEFAULT_ENV_PATH = path.resolve(`./node_modules/@bodiless/${DEFAULT_ENV_PACKAGE}/bodiless.env.config.js`);

const writeToFile = async (filePath: string, content: string) => {
  try {
    await writeFile(filePath, content, 'utf8');
  } catch (err) {
    console.error(err);
  }
};

const envToJson = async (filePath: string) => dotenv.parse(await readFile(filePath, 'utf8'));

const jsonToEnv = async (envConfig: any, envType: string) => {
  let envFileContent = '';

  Object.keys(envConfig).forEach(key => envFileContent += `${key}='${envConfig[key]}'\n`);

  await writeToFile(`.env.${envType}`, envFileContent);
};

const getSiteEnvConfig = async (nodeEnv: string) => {
  const siteEnvFile = await envToJson(path.resolve('.env.site'));
  const siteEnvConfig = path.resolve('bodiless.env.config.js');

  if (fs.existsSync(siteEnvConfig)) {
    return {
      ...siteEnvFile,
      ...await require(siteEnvConfig).configure(siteEnvFile, nodeEnv),
    };
  }

  return siteEnvFile;
};

const getBodilessEnvConfig = async (defaultConfig: any, nodeEnv: string) => {
  const bodilessEnvConfigPaths = await asyncGlob(`node_modules/@bodiless/*/bodiless.env.config.{js,ts}`);

  return bodilessEnvConfigPaths.reduce(async (agregatedEnvConfig: any, envConfigPath: string) => {
    if (fs.existsSync(path.resolve(envConfigPath))) {
      return {
        ...await agregatedEnvConfig,
        ...await require(path.resolve(envConfigPath)).configure(agregatedEnvConfig, nodeEnv),
      };
    }

    return agregatedEnvConfig;
  }, Promise.resolve(defaultConfig));
};

const getDefaults = async (nodeEnv: string) => {
  const defaultValues = {
    BODILESS_TAILWIND_THEME_ENABLED: '1',
    BODILESS_BACKEND_DATA_FILE_PATH: 'src/data',
    BODILESS_BACKEND_STATIC_PATH: 'static',
    BODILESS_BACKEND_COMMIT_ENABLED: '0',
    BODILESS_BACKEND_SAVE_ENABLED: '1',
    APP_GIT_PATH: '.',
    BODILESS_DOCS_URL: '/___docs',
  };

  type configType = {
    [key: string]: object | string
  }

  const config: configType = {
    production: {
      ...defaultValues,
      BODILESS_BACKEND_SAVE_ENABLED: '0',
    },
    changeset: {
      ...defaultValues,
      BODILESS_BACKEND_COMMIT_ENABLED: '1',
    },
    default: { ...defaultValues },
  };

  const validNodeEnv = (val: string) => Object.keys(config).includes(val);
  const isChangeset = (branchName: string) => branchName.startsWith('test/') || branchName.startsWith('changeset/');

  const branch = await gitCurrentBranch();

  if (nodeEnv !== 'production' && isChangeset(branch)) {
    nodeEnv = 'changeset';
  }

  return validNodeEnv(nodeEnv) ? config[nodeEnv] : config.default;
};

const configureEnvFileFor = async (nodeEnv: string) => {
  const defaultEnvConfig = await getDefaults(nodeEnv);

  await jsonToEnv({
    ...await getBodilessEnvConfig(defaultEnvConfig, nodeEnv),
    ...await getSiteEnvConfig(nodeEnv),
  }, nodeEnv);
};

const init = async () => {
  await configureEnvFileFor('production');
  await configureEnvFileFor('development');
};

init();
