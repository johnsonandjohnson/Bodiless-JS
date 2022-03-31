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
import fs from 'fs';
import path from 'path';

const compareFiles = (path1: string, path2: string): boolean => {
  const buffer1 = fs.readFileSync(path1);
  const buffer2 = fs.readFileSync(path2);
  return buffer1.equals(buffer2);
};

const files: { [source: string]: string } = {
  'platform.sh': 'platform.sh',
  'waitForPM2.js': 'waitForPM2.js',
  'edit.platform.app.yaml': '.platform.app.yaml',
};

const sourceDir = './node_modules/@bodiless/psh/resources/edit';
const targetDir = './edit';

Object.keys(files).forEach(file => {
  const sourcePath = path.resolve(sourceDir, file);
  const targetPath = path.resolve(targetDir, files[file]);
  let differentFiles = 0;
  if (!compareFiles(sourcePath, targetPath)) {
    console.error(`${sourcePath} is not equal to ${targetPath}`);
    differentFiles += 1;
  }
  if (differentFiles > 0) {
    throw new Error('updates found for edit platform.sh resources.');
  }
});
