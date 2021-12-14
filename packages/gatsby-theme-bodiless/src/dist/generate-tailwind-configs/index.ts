#!/usr/bin/env node
/**
 * Copyright © 2021 Johnson & Johnson
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
import { resolve as resolvePath } from 'path';
import {
  getDependenciesFromPackageJson,
  getPackageNameFromPackageJson,
  getBodilessTailwindConfig,
} from './getTailwindConfigs';
import { writeToFile } from '../generate-env-vars/utils';

const siteConfig = fs.existsSync('./site.tailwind.config.js')
  ? "const siteConfig = require('./site.tailwind.config');"
  : '';
const templateWrap = `/* eslint-disable */
// This file is generated automatically, please don't change it
const {
  mergeConfigs,
  getPackageRoot,
} = require('@bodiless/gatsby-theme-bodiless/dist/tailwindcss');
${siteConfig}

const bodilessCanvasxConfigs = [#pkgs];

module.exports = mergeConfigs(siteConfig, bodilessCanvasxConfigs);
`;
const template = `
  {
    root: getPackageRoot(require.resolve('#pkg')),
    tailwindConfig: require('#pkg/site.tailwind.config'),
  }`;

/*
 * This command will auto discover all tailwind configuration files
 * and generate the configuration list in the site package
 */
const init = async () => {
  const pkg = resolvePath('package.json');
  const pdgName = getPackageNameFromPackageJson(pkg);
  const deps = Object.keys(getDependenciesFromPackageJson(pkg));
  const cfg = await getBodilessTailwindConfig(pdgName, deps);
  const cfgs = cfg.map(pkgPath => template.replace(/#pkg/g, pkgPath)).join(',');
  await writeToFile('tailwind.config.js', templateWrap.replace(/#pkgs/g, cfgs));
};

export default init;
