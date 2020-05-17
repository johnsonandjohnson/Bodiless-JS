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

const { getConflicts } = require('../src/git');
const GitCmd = require('../src/GitCmd');

describe('getConflicts', () => {
  beforeEach(cloneGitFixture('get-conflicts', 'feat/foo-test-1'));

  afterEach(cleanGitFixture('get-conflicts'));

  it('returns conflict files when conflict exists', async () => {
    const result = await getConflicts();
    expect(result.hasConflict).toBeTruthy();
    expect(result.files).toHaveLength(1);
    expect(result.files).toContain('foo.txt');
  });

  it('returns conflict false when no conflict', async () => {
    await GitCmd.cmd().add('checkout', '-b', 'feat/foo-test-2').exec();
    const result = await getConflicts();
    expect(result.hasConflict).toBeFalsy();
    expect(result.files).toBe(undefined);
  });
});
