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
const copyfiles = require('copyfiles');
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

const getGitCmdOutputString = result => result.stdout.trim().replace('\n$', '');
const getGitCmdOutputArray = result => (
  result.stdout.trim().split('\n').map(l => l.trim()).filter(l => l.length > 0)
);

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
    commits: getGitCmdOutputArray(result[0]),
    files: getGitCmdOutputArray(result[1]),
  };
};

/**
 * Gets local uncommitted changes and untracked json files.
 */
const uncommitted = async () => {
  const untrackedPromise = GitCmd.cmd()
    .add('ls-files', '--exclude-standard', '--others', '--full-name')
    .exec();
  const uncommittedPromise = GitCmd.cmd()
    .add('diff', '--name-only', '.')
    .exec();
  const result = await Promise.all([uncommittedPromise, untrackedPromise]);
  return {
    files: [
      ...getGitCmdOutputArray(result[0]),
      ...getGitCmdOutputArray(result[1]),
    ],
  };
};

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
  try {
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
      uncommitted(),
    ]);
    const status = {
      upstream: { branch: upstreamBranch, ...result[0] },
      production: { branch: productionBranch, ...result[1] },
      local: {
        branch,
        commits: [...result[2].commits],
        files: [...result[2].files, ...result[3].files],
      },
    };
    return status;
  } catch (e) {
    throw new Error(`Error occurred: ${e.message}`);
  }
};

/**
 * Clone a repo with url and branch to checkout.
 *
 * @param {string} url - Repo url.
 * @param {array} options - Clone options [branch|directory].
 */
const clone = async (url, options = {}) => {
  const logger = new Logger('BACKEND');
  let result = await GitCmd.cmd().add('config', '--get', 'user.name').exec();
  const configName = result.stdout.trim().replace('\n', '');
  result = await GitCmd.cmd().add('config', '--get', 'user.email').exec();
  const configEmail = result.stdout.trim().replace('\n', '');

  const cmd = GitCmd.cmd().add('clone', url);
  cmd.add('--config', `user.email=${configEmail}`);
  cmd.add('--config', `user.name=${configName}`);
  if (options.branch) cmd.add('-b', options.branch);
  if (options.directory) cmd.add(options.directory);
  logger.log([`Clone to path: ${options.directory}`]);
  return cmd.exec();
};

/**
 * Get origin master to upstream or local branch merge conflict status.
 *
 * @param {target} branch type to check conflict against production.
 *        Can be 'upstream' (default) or ed'it.
 *
 * @return {object} Results.
 */
const getConflicts = async (target = 'upstream') => {
  // const remoteUrl = await getRemote('origin');
  const logger = new Logger('BACKEND');
  const tmpDir = path.resolve(process.env.BODILESS_BACKEND_TMP || os.tmpdir(), v1());
  const originalDir = process.cwd();

  // @todo: fs directory existence check.
  const branch = await getCurrentBranch();
  const upstreamBranch = await getUpstreamTrackingBranch(branch);
  if (!upstreamBranch) {
    throw new Error(`No upstream branch found for current branch ${branch}.
      Please contact your server administrator`);
  }

  const rootResult = await GitCmd.cmd().add('rev-parse', '--show-toplevel').exec();
  const rootDir = getGitCmdOutputString(rootResult);
  logger.log([`Repo root: ${rootDir}`]);

  let workBranch = '';
  let targetBranch = '';
  let uncommittedResult;
  let files = [];
  switch (target) {
    case 'edit':
      targetBranch = `origin-${branch}`;
      workBranch = branch;

      // Create a new branch from local HEAD.
      await GitCmd.cmd().add(
        'branch',
        '--force',
        `${targetBranch}`,
      ).exec();

      uncommittedResult = await uncommitted();
      files = uncommittedResult.files.map(f => `${rootDir}/${f}`);

      break;
    case 'upstream':
      targetBranch = `origin-${upstreamBranch.replace('origin/', '')}`;
      workBranch = upstreamBranch.replace('origin/', '');

      // Create a new branch from remote.
      await GitCmd.cmd().add(
        'fetch',
        'origin',
        `${workBranch}:${targetBranch}`,
      ).exec();

      break;
    default:
      throw new Error('Invalid target branch value, must be `edit` or `upstream`.');
  }

  // Create a tmp origin master mapping branch for new repo merge. Remove after.
  const mergeMasterBranch = 'origin-master';
  await GitCmd.cmd().add(
    'fetch',
    'origin',
    `master:${mergeMasterBranch}`,
  ).exec();

  await clone(rootDir, { directory: tmpDir, branch: targetBranch });
  process.chdir(tmpDir);
  if (files.length) {
    logger.log([`Copy Files: ${files} ${tmpDir}`, process.cwd()]);

    try {
      const result = await new Promise((resolve, reject) => {
        copyfiles(
          [...files, tmpDir],
          { error: true, up: (rootDir.match(/\//g) || []).length + 1 },
          (err) => {
            if (err) {
              reject(new Error(`Error copying uncommitted files ${err}.`));
            }
            resolve('ok');
          },
        );
      });

      logger.log(`Result: ${result}`);

      await GitCmd.cmd()
        .add('add', '--all')
        .exec();
      await GitCmd.cmd()
        .add('commit', '-m', 'TEMPORARY COMMIT')
        .exec();
    } catch (e) {
      logger.error(e);
    }
  }

  let conflictFiles = [];
  try {
    await GitCmd.cmd()
      .add('merge', '--no-commit', '--no-ff', 'origin/origin-master')
      .exec();
  } catch (e) {
    const conflictResult = await GitCmd.cmd()
      .add('diff', '--name-only', '--diff-filter=U')
      .exec();
    conflictFiles = getGitCmdOutputArray(conflictResult).map(file => `${rootDir}/${file}`);
    await GitCmd.cmd()
      .add('merge', '--abort')
      .exec();
  }

  // cleanup tmp repo and branches.
  process.chdir(rootDir);
  await GitCmd.cmd()
    .add(
      'branch',
      '--delete',
      '--force',
      `${mergeMasterBranch}`,
      `${targetBranch}`,
    )
    .exec();
  rimraf.sync(tmpDir);
  logger.log(`${tmpDir} removed.`);

  // restore original working directory
  process.chdir(originalDir);
  logger.log(`${originalDir} restored.`, process.cwd());

  return {
    hasConflict: conflictFiles.length > 0,
    files: conflictFiles,
    target,
  };
};

/**
 * Merge latest origin master to upstream branch.
 */
const mergeMaster = async () => {
  const logger = new Logger('BACKEND');
  const tmpDir = path.resolve(process.env.BODILESS_BACKEND_TMP || os.tmpdir(), v1());
  const originalDir = process.cwd();
  const branch = await getCurrentBranch();
  const upstreamBranch = await getUpstreamTrackingBranch(branch);

  if (!upstreamBranch) {
    throw new Error(`No upstream branch found for current branch ${branch}. Please contact your server administrator`);
  }

  const remote = getGitCmdOutputString(await GitCmd.cmd().add('remote', 'get-url', 'origin').exec());
  const rootCmd = GitCmd.cmd().add('rev-parse', '--show-toplevel');
  const rootDir = getGitCmdOutputString(await rootCmd.exec());

  await clone(rootDir, { directory: tmpDir, branch: upstreamBranch.replace('origin/', '') });
  process.chdir(tmpDir);

  try {
    await GitCmd.cmd()
      .add('remote', 'set-url', 'origin', remote)
      .exec();

    await GitCmd.cmd()
      .add('pull')
      .exec();

    await GitCmd.cmd()
      .add('merge', 'origin/master', '--no-edit', '-Xours')
      .exec();

    await GitCmd.cmd()
      .add('push')
      .exec();
  } catch (e) {
    logger.error(e);
  }

  process.chdir(rootDir);
  rimraf.sync(tmpDir);
  logger.log(`${tmpDir} removed.`);

  // restore original working directory
  process.chdir(originalDir);
  logger.log(`${originalDir} restored.`, process.cwd());

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
