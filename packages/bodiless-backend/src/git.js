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
const GitCmd = require('./GitCmd');

/**
 * Returns the name of the current branch as a string.
 */
const getCurrentBranch = async () => {
  const result = await GitCmd.cmd().add('rev-parse', '--abbrev-ref', 'HEAD').exec();
  return result.stdout.trim();
};

/**
 * Verify the existence of an upstream branch.
 */
const getUpstreamBranch = async (branch, remote = 'origin') => {
  try {
    await GitCmd.cmd().add('ls-remote', '--heads', '--exit-code', remote, branch).exec();
    return `${remote}/${branch}`;
  } catch (e) {
    // Catch only the error where the upstream branch doesn't exist.
    if (e.code === '2') return undefined;
    throw e;
  }
};

/**
 * Returns the merge-base between two branches.
 */
const getMergeBase = async (a, b) => {
  const mergeBase = await GitCmd.cmd()
    .add('merge-base', a, b)
    .exec();
  return mergeBase.stdout.trim();
};

/**
 * Gets the commits present on one branch which are not present on another, and also the
 * files which were changed by those commits.
 *
 * @param show The branch whose commits to show.
 * @param comparedTo The branch to compare it to.
 */
const compare = async (show, comparedTo) => {
  const mergeBase = await getMergeBase(show, comparedTo);
  const commitsPromise = GitCmd.cmd()
    .add('rev-list', '--oneline', '--left-only', `${show}...${comparedTo}`)
    .exec();
  const filesPromise = GitCmd.cmd()
    .add('diff', '--name-only', show, mergeBase)
    .exec();
  const result = await Promise.all([commitsPromise, filesPromise]);
  return {
    commits: result[0].stdout.trim().split('\n').map(l => l.trim()).filter(l => l.length > 0),
    files: result[1].stdout.trim().split('\n').map(l => l.trim()).filter(l => l.length > 0),
  };
};

/**
 * Returns an object describing local and upstream changes on the changeset branch.
 */
const getChanges = async () => {
  await GitCmd.cmd().add('fetch', 'origin').exec();
  const branch = await getCurrentBranch();
  const upstreamBranch = await getUpstreamBranch(branch);
  if (!upstreamBranch) {
    return {
      upstream: {
        branch: null,
        commits: [],
        files: [],
      },
    };
  }
  const result = await Promise.all([
    compare(upstreamBranch, branch),
    // compare('origin/master', upstreamBranch),
    // compare(branch, 'origin/master'),
  ]);
  const status = {
    upstream: { branch: upstreamBranch, ...result[0] },
    // production: result[1],
    // local: result[2],
  };
  return status;
};

module.exports = {
  getCurrentBranch,
  getUpstreamBranch,
  getChanges,
  getMergeBase,
  compare,
};
