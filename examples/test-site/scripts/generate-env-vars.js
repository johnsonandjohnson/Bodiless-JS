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

const asyncGlob = util.promisify(glob);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const DEFAULT_ENV_PACKAGE = 'gatsby-theme-bodiless';
const DEFAULT_ENV_PATH = path.resolve(`./node_modules/@bodiless/${DEFAULT_ENV_PACKAGE}/bodiless.env.config.js`);

const writeToFile = async (filePath, content) => {
  try {
    await writeFile(filePath, content, 'utf8');
  } catch (err) {
    console.error(err);
  }
};

const envToJson = async filePath => dotenv.parse(await readFile(filePath, 'utf8'));

const jsonToEnv = async (envConfig, envType) => {
  let envFileContent = '';

  Object.keys(envConfig).forEach(key => envFileContent += `${key}='${envConfig[key]}'\n`);

  await writeToFile(`.env.${envType}`, envFileContent);
};

const getSiteEnvConfig = async nodeEnv => {
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

const getBodilessEnvConfig = async (defaultConfig, nodeEnv) => {
  const bodilessEnvConfigPaths = await asyncGlob(`node_modules/@bodiless/[!${DEFAULT_ENV_PACKAGE}]*/bodiless.env.config.{js,ts}`);

  return bodilessEnvConfigPaths.reduce(async (agregatedEnvConfig, envConfigPath) => {
    if (fs.existsSync(path.resolve(envConfigPath))) {
      return {
        ...await agregatedEnvConfig,
        ...await require(path.resolve(envConfigPath)).configure(agregatedEnvConfig, nodeEnv),
      };
    }

    return agregatedEnvConfig;
  }, Promise.resolve(defaultConfig));
};

const getDefaults = async (defaultConfig, nodeEnv) => {
  const defaultEnvConfigPath = path.resolve(DEFAULT_ENV_PATH);

  if (fs.existsSync(defaultEnvConfigPath)) {
    return {
      ...await require(defaultEnvConfigPath).configure(defaultConfig, nodeEnv),
    };
  }
}

const configureEnvFileFor = async nodeEnv => {
  const defaultEnvConfig = await getDefaults({}, nodeEnv);

  await jsonToEnv({
    ...await getBodilessEnvConfig(defaultEnvConfig, nodeEnv),
    ...await getSiteEnvConfig(nodeEnv),
  }, nodeEnv);
}

const init = async () => {
  await configureEnvFileFor('production');
  await configureEnvFileFor('development');
};

init();
