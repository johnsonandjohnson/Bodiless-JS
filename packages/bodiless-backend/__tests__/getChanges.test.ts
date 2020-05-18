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

// eslint-disable-next-line import/no-extraneous-dependencies
const rimraf = require('rimraf');
const GitCmd = require('../src/GitCmd');
const { getChanges } = require('../src/git');

const originalCwd = process.cwd();

const resolveRelativeToMe = (...segments: string[]) => {
  const scriptName = path.basename(__filename);
  const scriptPath = require.resolve(`./${scriptName}`);
  return path.resolve(path.dirname(scriptPath), ...segments);
};

const cloneGitFixture = (repo: string, branch: string) => async () => {
  const tmp = resolveRelativeToMe('tmp');
  rimraf.sync(tmp);
  mkdirSync(tmp);
  const target = path.join(tmp, repo);
  const source = resolveRelativeToMe('fixtures', 'git', repo);
  await GitCmd.cmd().add('clone', '-b', branch, '--local', source, target).exec();
  process.chdir(target);
};

const cleanGitFixture = () => () => {
  const tmp = resolveRelativeToMe('tmp');
  rimraf.sync(tmp);
  process.chdir(originalCwd);
};

describe('getChanges', () => {
  beforeEach(cloneGitFixture('get-changes', 'test-upstream-changes'));

  afterEach(cleanGitFixture());

  it('properly lists no changes when none are there', async () => {
    const result = await getChanges();
    expect(result.upstream.branch).toBe('origin/test-upstream-changes');
    expect(result.upstream.commits).toHaveLength(0);
    expect(result.upstream.files).toHaveLength(0);
  });

  it('lists no changes when there is no upstream branch', async () => {
    await GitCmd.cmd().add('reset', '--hard', 'test-upstream-changes-local').exec();
    await GitCmd.cmd().add('checkout', '-b', 'foo').exec();
    const result = await getChanges();
    expect(result.upstream.branch).toBeNull();
    expect(result.upstream.commits).toHaveLength(0);
    expect(result.upstream.files).toHaveLength(0);
  });

  it('lists upstream changes when they exist', async () => {
    await GitCmd.cmd().add('reset', '--hard', 'test-upstream-changes-local').exec();
    const result = await getChanges();
    expect(result).not.toBeUndefined();
    const { branch, files, commits } = result.upstream;
    expect(branch).toBe('origin/test-upstream-changes');
    expect(files.sort()).toEqual(['foo', 'bar', 'baz'].sort());
    expect(commits).toEqual([
      '229389a Upstream remove file',
      'a6eb035 Upstream add file',
      '9da0814 Upstream change',
    ]);
  });
});
