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

import pathUtil from 'path';
import fs from 'fs';
import { ensureDirSync } from 'fs-extra';
import locateFiles from './locateFiles';
import type { Copier } from './write';

const getPackageNameFromPackageJson = (packageJsonPath: string) => {
  let packageName;
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageName = packageJson.name;
  } catch {
    console.log(`Error reading package.json from ${packageJsonPath}`);
  }
  return packageName;
};

const findApiDocPaths = async () => locateFiles({
  filePattern: new RegExp('doc/api/globals.md$'),
  // filePattern: /docs.json$/,
  startingRoot: './',
  action: filePath => {
    const apiDocPath = pathUtil.resolve(filePath, '..');
    const packagePath = pathUtil.resolve(apiDocPath, '../..');
    const packageName = getPackageNameFromPackageJson(pathUtil.resolve(packagePath, 'package.json'));
    return Promise.resolve({
      [packageName || pathUtil.basename(packagePath)]: apiDocPath,
    });
  },
});

type Props = {
  copier: Copier;
  targetDocPath: string;
};

const generateIndexFile = (baseTargetPath: string, packages: string[]) => {
  const lines = packages.map(pkg => `* [${pkg}](/Development/API/${pkg}/globals)`);
  const targetPath = pathUtil.join(baseTargetPath, 'Development', 'API', 'README.md');
  fs.writeFileSync(targetPath, lines.join('\n'));
};

/**
 * Builds API docs.
 */
const buildApiDoc = async (props: Props) => {
  const { copier, targetDocPath } = props;
  const paths = await findApiDocPaths();
  // combine array of objects into one object
  const paths$1 = paths.reduce((prevVal, curVal) => ({ ...prevVal, ...curVal }), {});

  const promises = [] as Promise<any>[];
  Object.keys(paths$1).forEach((packageName: any) => {
    const apiDocPath = paths$1[packageName];
    const targetPath = pathUtil.join(targetDocPath, 'Development', 'API', packageName);
    ensureDirSync(pathUtil.dirname(targetPath));
    promises.push(copier(apiDocPath, targetPath));
  });
  await Promise.all(promises);

  generateIndexFile(targetDocPath, Object.keys(paths$1));
};

export default buildApiDoc;
