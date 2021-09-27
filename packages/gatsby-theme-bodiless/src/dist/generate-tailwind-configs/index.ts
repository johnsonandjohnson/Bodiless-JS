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

import { resolve as resolvePath } from 'path';
import {
  getDependencies,
  getBodilessTailwindConfig,
} from './getTailwindConfigs';
import { writeToFile } from '../generate-env-vars/utils';

const templateWrap = `
// This file is generated automatically, please don't change it
module.exports = (getPackageRoot) => [#pkgs];
`;
const template = `
  {
    root: getPackageRoot(require.resolve('#pkg')),
    tailwindConfig: require('#pkg/tailwind.config'),
  }`;

const init = async () => {
  const pkg = resolvePath('package.json');
  const deps = getDependencies(pkg);
  const cfg = await getBodilessTailwindConfig(deps);
  const cfgs = cfg.map(item => template.replace(/#pkg/g, item)).join(',');
  await writeToFile('.tailwindConfigs.js', templateWrap.replace(/#pkgs/g, cfgs));
};

export default init;
