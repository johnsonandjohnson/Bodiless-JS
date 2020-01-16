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
import { exec } from 'child_process';

console.log('Initializing platform.sh configuration...');

const platformConfigPaths = [
  './node_modules/@bodiless/psh/resources/.platform/*',
  './.platform',
];
copyfiles(platformConfigPaths, { up: true }, (err: any) => {
  if (err) console.log('Error copying app config files', err);
});

const staticAppPaths = [
  './node_modules/@bodiless/psh/resources/static/*',
  '.',
];
copyfiles(staticAppPaths, { up: true }, (err: any) => {
  if (err) console.log('Error copying static app files', err);
  else {
    rename('./static.platform.app.yaml', './.platform.app.yaml', err$ => {
      if (err$) console.log('Error renaming static.platform.app.yaml', err$);
    });
  }
});

const docsAppPaths = [
  './node_modules/@bodiless/psh/resources/docs/*',
  './docs',
];
copyfiles(docsAppPaths, { up: true }, (err: any) => {
  if (err) console.log('Error copying docs app files', err);
  else {
    rename('./docs/documentation.platform.app.yaml', './docs/.platform.app.yaml', err$ => {
      if (err$) console.log('Error renaming docs.platform.app.yaml', err$);
    });
    rename('./docs/documentation.package.json', './docs/package.json', err$ => {
      if (err$) console.log('Error renaming package.json', err$);
    });
  }
});

console.log('Generating docs/package-lock.json...');
exec('npm --prefix ./docs install --package-lock-only', err => {
  if (err) {
    console.error(`exec error: ${err}`);
  } else {
    console.log('done');
  }
});

// Copying configs for edit environment.
const paths$$ = [
  './node_modules/@bodiless/psh/resources/edit/*',
  './edit',
];
copyfiles(paths$$, { up: true, all: true, exclude: 'platform.custom.sh' }, (err: any) => {
  if (err) console.log('Error copying /edit', err);
  else {
    rename('./edit/edit.platform.app.yaml', './edit/.platform.app.yaml', err$ => {
      if (err$) console.log('Error renaming edit.platform.app.yaml', err$);
    });
  }
});

// Don't overwrite platform.custom.sh if it already exists.
const paths$$$ = [
  './node_modules/@bodiless/psh/resources/edit/platform.custom.sh',
  './edit',
];
copyfiles(paths$$$, { up: true, soft: true }, (err: any) => {
  if (err) console.log('Error copying /edit', err);
});
