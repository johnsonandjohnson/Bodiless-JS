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

import { cloneGitFixture, cleanGitFixture } from './tools';

const { getConflicts, getUpstreamTrackingBranch } = require('../src/git');
const GitCmd = require('../src/GitCmd');

describe('getConflicts', () => {
  beforeEach(cloneGitFixture('get-conflicts', 'feat/foo-test-1'));

  afterEach(cleanGitFixture('get-conflicts'));

  it('returns conflict files when conflict exists', async () => {
    const result = await getConflicts();
    console.log(result);
    expect(result.hasConflict).toBeTruthy();
    expect(result.files).toHaveLength(1);
    expect(result.files[0]).toMatch(/foo.txt$/);
  });

  it('returns conflict false when no conflict', async () => {
    await GitCmd.cmd()
      .add('checkout', '-b', 'feat/foo-test-2', 'origin/feat/foo-test-2')
      .exec();
    const result = await getConflicts();
    console.log(result);
    expect(result.hasConflict).toBeFalsy();
    expect(result.files).toEqual([]);
  });
});

describe('getUpstreamBranch', () => {
  const branch = 'feat/foo-test-upstream-tracking';
  beforeEach(cloneGitFixture('get-conflicts-b', branch));

  afterEach(cleanGitFixture('get-conflicts-b'));

  it('returns remote tracking branch name', async () => {
    const result = await getUpstreamTrackingBranch(branch);
    expect(result).toBe(`origin/${branch}`);

    // Check out another branch.
    await GitCmd.cmd()
      .add('checkout', '-b', 'feat/foo-test-2', 'origin/feat/foo-test-2')
      .exec();

    // Still tracking the original upstream branch.
    const result1 = await getUpstreamTrackingBranch(branch);
    expect(result1).toBe(`origin/${branch}`);

    // Empty upstream branch name returned after tracking branch removed.
    await GitCmd.cmd()
      .add('branch', '--unset-upstream', branch)
      .exec();
    const result2 = await getUpstreamTrackingBranch(branch);
    expect(result2).toBe('');
  });
});
