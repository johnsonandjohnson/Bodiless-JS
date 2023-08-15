/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const git = require('isomorphic-git');
const findUp = require('find-up');

const getCurrentGitBranch = async () => {
  let gitBranchName = process.env.PLATFORM_BRANCH || '';

  try {
    const gitDir = await findUp('.git', { type: 'directory' }) || '';
    const currentBranch = await git.currentBranch({ fs, gitdir: gitDir }) ?? undefined;

    if (currentBranch) {
      gitBranchName = currentBranch;
    } else {
      console.warn('You are in "detached HEAD" state...');
    }
  } catch (e) {
    console.warn(e);
  }

  return gitBranchName;
};

module.exports = {
  configure: async (defaultConfig) => {
    const finalConfig = { ...defaultConfig };
    if (defaultConfig && typeof defaultConfig.BODILESS_SEARCH_CONFIG === 'string') {
      const confFilePath = path.resolve(defaultConfig.BODILESS_SEARCH_CONFIG);
      if (fs.existsSync(confFilePath) && fs.lstatSync(confFilePath).isFile()) {
        const searchConf = JSON.parse(fs.readFileSync(confFilePath, 'utf8'));
        finalConfig.BODILESS_SEARCH_PARAMS = JSON.stringify(searchConf);
      }
    }
    if (await getCurrentGitBranch() === 'main') {
      finalConfig.BODILESS_BACKEND_COMMIT_ENABLED = '0';
    } else {
      finalConfig.BODILESS_BACKEND_COMMIT_ENABLED = '1';
    }
    return finalConfig;
  },
};
