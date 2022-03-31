#!/usr/bin/env node
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
import copyfiles from 'copyfiles';
import { rename } from 'fs';

// Copying configs for edit environment.
const pshEditResourcesDir = './node_modules/@bodiless/psh/resources/edit';
const paths = [
  `${pshEditResourcesDir}/*`,
  './edit',
];
const excludeFiles = [
  'ecosystem.config.js',
  'platform.custom.sh',
];
const excludedPaths = excludeFiles.map(file => `${pshEditResourcesDir}/${file}`);
// @ts-ignore due to copyfiles types do not allow passing an array to exclude
// while copyfiles supports this option
copyfiles(paths, { up: true, exclude: excludedPaths }, (err: any) => {
  if (err) console.log('Error copying /edit', err);
  else {
    rename('./edit/edit.platform.app.yaml', './edit/.platform.app.yaml', err$ => {
      if (err$) console.log('Error renaming edit.platform.app.yaml', err$);
    });
  }
});
