/**
 * Copyright © 2023 Johnson & Johnson
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
import findUp from 'find-up';
import path from 'path';
import git from 'isomorphic-git';
import NodeCache from 'node-cache';
import fs from 'fs';

export type gitInfo = {
  repo: string,
  sha: string,
  branch: string,
};

const gitCache = new NodeCache();

const findGitFolder = async () => await findUp('.git', { type: 'directory' }) || '';

/**
 * Get git info from local fs .git directory.
 *
 * @returns {
*  repo: string,
*  sha: string,
*  branch: string,
* }
*/
const getGitInfoFromFs = async (): Promise<gitInfo> => {
  let repo = '';
  let sha = '';
  let branch = '';

  const gitDir = await findGitFolder();
  if (gitDir) {
    try {
      const projectRoot = path.dirname(gitDir);
      const remotes = await git.listRemotes({ fs, dir: projectRoot });
      const origin = remotes.find(v => v.remote === 'origin');
      repo = origin?.url ?? '';
      branch = await git.currentBranch({ fs, dir: projectRoot }) || '';
      sha = await git.resolveRef({ fs, dir: projectRoot, ref: 'HEAD' }) || '';
      gitCache.set('getGitInfoFromFs', { repo, sha, branch });
      return { repo, sha, branch };
    } catch (err) {
      console.log('Failed to retrieve git info from fs. ', err);
      return { repo, sha, branch };
    }
  }

  return { repo, sha, branch };
};

/**
* Get current git repo info.
*
* @returns Promise<{
*  repo: string,
*  sha: string,
*  branch: string,
* }>
*/
export const createGitInfo = async (): Promise<gitInfo> => {
  try {
    const gitInfoFs = gitCache.get<gitInfo>('getGitInfoFromFs') || await getGitInfoFromFs();
    if (gitInfoFs) {
      console.log('Git info from fs. ', gitInfoFs);
      return gitInfoFs;
    }
  } catch (err) {
    console.log('Failed to create git info. ', err);
  }

  return {
    repo: '',
    sha: '',
    branch: '',
  };
};
