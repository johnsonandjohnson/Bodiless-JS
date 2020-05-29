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

import path from 'path';
import { mkdirSync } from 'fs';
import GitCmd from '../src/GitCmd';

// eslint-disable-next-line import/no-extraneous-dependencies
const rimraf = require('rimraf');

const originalCwd = process.cwd();

export const resolveRelativeToMe = (...segments: string[]) => {
  const scriptName = path.basename(__filename);
  const scriptPath = require.resolve(`./${scriptName}`);
  return path.resolve(path.dirname(scriptPath), ...segments);
};

export const cloneGitFixture = (repo: string, branch: string) => async () => {
  const tmp = resolveRelativeToMe(`tmp-${repo}`);
  rimraf.sync(tmp);
  mkdirSync(tmp);
  const target = path.join(tmp, repo);
  const source = resolveRelativeToMe('fixtures', 'git', repo);
  await GitCmd.cmd().add('clone', '-b', branch, '--local', source, target).exec();
  process.chdir(target);
};

export const cleanGitFixture = (repo: string) => () => {
  const tmp = resolveRelativeToMe(`tmp-${repo}`);
  rimraf.sync(tmp);
  process.chdir(originalCwd);
};
