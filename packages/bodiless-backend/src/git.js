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
const path = require('path');
const os = require('os');
const rimraf = require('rimraf');
const { v1 } = require('uuid');
const GitCmd = require('./GitCmd');
const Logger = require('./logger');

/**
 * Returns the name of the current branch as a string.
 */
const getCurrentBranch = async () => {
  const result = await GitCmd.cmd().add('rev-parse', '--abbrev-ref', 'HEAD').exec();
  return result.stdout.trim();
};

/**
 * Verify the existence of an upstream branch.
 * @todo: replace with getUpstreamTrackingBranch?
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
 * Get current branch remote tracking branch.
 *
 * @param {string} local branch name.
 */
const getUpstreamTrackingBranch = async branch => {
  const result = await GitCmd.cmd()
    .add('for-each-ref', '--format="%(upstream:short)"', `refs/heads/${branch}`)
    .exec();
  return result.stdout.replace(/"([^"]*)".*/g, '$1').split('\n')[0];
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

const getGitCmdOutput = result => result.stdout.trim().replace('\n$', '');

/**
 * Returns an object describing local and upstream changes on the changeset branch.
 *
 * @return {object} changes between branches.
 *            {
 *              upstream,   // Commits from upstream branch.
 *              production, // Commits from origin/master.
 *              local,      // Commits made on local branch.
 *            }
 */
const getChanges = async () => {
  await GitCmd.cmd().add('fetch', 'origin').exec();
  const branch = await getCurrentBranch();
  const upstreamBranch = await getUpstreamBranch(branch);
  const productionBranch = 'origin/master';
  if (!upstreamBranch) {
    return {
      upstream: { branch: null, commits: [], files: [] },
      production: { branch: productionBranch, commits: [], files: [] },
      local: { branch, commits: [], files: [] },
    };
  }
  const result = await Promise.all([
    compare(upstreamBranch, branch),
    compare(productionBranch, upstreamBranch),
    compare(branch, productionBranch),
  ]);
  const status = {
    upstream: { branch: upstreamBranch, ...result[0] },
    production: { branch: productionBranch, ...result[1] },
    local: { branch, ...result[2] },
  };
  return status;
};

/**
 * Clone a repo with url and branch to checkout.
 *
 * @param {string} url - Repo url.
 * @param {array} options - Clone options [branch|directory].
 */
const clone = async (url, options = {}) => {
  let result = await GitCmd.cmd().add('config', '--get', 'user.name').exec();
  const configName = result.stdout.trim().replace('\n', '');
  result = await GitCmd.cmd().add('config', '--get', 'user.email').exec();
  const configEmail = result.stdout.trim().replace('\n', '');

  const cmd = GitCmd.cmd().add('clone', url);
  cmd.add('--config', `user.email=${configEmail}`);
  cmd.add('--config', `user.name=${configName}`);
  if (options.branch) cmd.add('-b', options.branch);
  if (options.directory) cmd.add(options.directory);
  return cmd.exec();
};

/**
 * Get origin master to upstream branch merge conflict status.
 *
 * @return {object} Results.
 */
const getConflicts = async () => {
  // const remoteUrl = await getRemote('origin');
  const logger = new Logger('BACKEND');
  const directory = path.resolve(process.env.BODILESS_BACKEND_TMP || os.tmpdir(), v1());

  // @todo: fs directory existence check.
  const branch = await getCurrentBranch();
  const upstreamBranch = await getUpstreamTrackingBranch(branch);
  if (!upstreamBranch) {
    throw new Error(`No upstream branch found for current branch ${branch}. Please contact your server administrator`);
  }

  const rootCmd = GitCmd.cmd().add('rev-parse', '--show-toplevel');
  const root = getGitCmdOutput(await rootCmd.exec());
  logger.log([`Repo root: ${root}`]);

  const mergeUpstreamBranch = `origin-${upstreamBranch.replace('origin/', '')}`;
  const mergeMasterBranch = 'origin-master';
  await GitCmd.cmd().add(
    'fetch',
    'origin',
    `${upstreamBranch.replace('origin/', '')}:${mergeUpstreamBranch}`,
  ).exec();

  await GitCmd.cmd().add(
    'fetch',
    'origin',
    `master:${mergeMasterBranch}`,
  ).exec();

  await clone(root, { directory, branch: mergeUpstreamBranch });
  process.chdir(directory);

  let conflictFiles = [];
  try {
    await GitCmd.cmd()
      .add('merge', '--no-commit', '--no-ff', 'origin/origin-master')
      .exec();
  } catch (e) {
    const conflictResult = await GitCmd.cmd()
      .add('diff', '--name-only', '--diff-filter=U')
      .exec();
    conflictFiles = conflictResult.stdout.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    await GitCmd.cmd()
      .add('merge', '--abort')
      .exec();
  }

  // cleanup tmp repo and branches.
  process.chdir(root);
  await GitCmd.cmd()
    .add(
      'branch',
      '--delete',
      '--force',
      `${mergeMasterBranch}`,
      `${mergeUpstreamBranch}`,
    )
    .exec();
  rimraf.sync(directory);
  logger.log(`${directory} removed.`);

  return { hasConflict: conflictFiles.length > 0, files: conflictFiles };
};

/**
 * Merge latest origin master to upstream branch.
 *
 * @return {object} Results.
 */
const mergeMaster = async () => {
  const logger = new Logger('BACKEND');
  const directory = path.resolve(process.env.BODILESS_BACKEND_TMP || os.tmpdir(), v1());
  const branch = await getCurrentBranch();
  const upstreamBranch = await getUpstreamTrackingBranch(branch);

  if (!upstreamBranch) {
    throw new Error(`No upstream branch found for current branch ${branch}. Please contact your server administrator`);
  }

  const remote = getGitCmdOutput(await GitCmd.cmd().add('remote', 'get-url', 'origin').exec());
  const rootCmd = GitCmd.cmd().add('rev-parse', '--show-toplevel');
  const root = getGitCmdOutput(await rootCmd.exec());

  await clone(root, { directory, branch: upstreamBranch.replace('origin/', '') });
  process.chdir(directory);

  try {
    await GitCmd.cmd()
      .add('remote', 'set-url', 'origin', remote)
      .exec();

    await GitCmd.cmd()
      .add('pull')
      .exec();

    await GitCmd.cmd()
      .add('merge', 'origin/master')
      .exec();

    await GitCmd.cmd()
      .add('push')
      .exec();
  } catch (e) {
    logger.error(e);
  }

  process.chdir(root);
  rimraf.sync(directory);
  logger.log(`${directory} removed.`);

  return {};
};

module.exports = {
  getCurrentBranch,
  getUpstreamBranch,
  getUpstreamTrackingBranch,
  getChanges,
  getConflicts,
  getMergeBase,
  compare,
  mergeMaster,
};
