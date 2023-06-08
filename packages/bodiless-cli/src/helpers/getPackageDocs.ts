/* eslint-disable global-require, import/no-dynamic-require */
/**
 * Copyright © 2022 Johnson & Johnson
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

const { join } = path;
const maxDepth = Number(process.env.BODILESS_DOCS_MAX_DEPTH || 5);

export type GetPackageDocsProps = {
  pkgPath: string,
  resolver?: any,
  nameSpace?: string,
  depth?: number,
};

export type GetPackageDocs = (props: GetPackageDocsProps) => string[];

export const getPackageDocs: GetPackageDocs = ({
  resolver,
  nameSpace = 'bodiless',
  depth = 0,
}) => {
  try {
    const pkgPath = join(resolver('./package.json'), '..');
    const pkgJson = require(join(pkgPath, 'package.json'));
    const paths: string[] = [];
    const deps = Object.keys(pkgJson.dependencies);

    try {
      const docsJsonPath = join(pkgPath, `${nameSpace}.docs.json`);
      require(docsJsonPath);
      paths.push(docsJsonPath);
    } catch (e) {
      // do nothing
    }
    if (depth >= maxDepth) return paths;

    deps.forEach(dep => {
      try {
        const depDocsJsonPath = require(resolver(join(dep, 'getDocs')))
          .getDocs(nameSpace, depth + 1);
        paths.push(depDocsJsonPath[0]);
      } catch (e) {
        // do nothing
      }
    });
    return paths;
  } catch (e) {
    return [];
  }
};

export default getPackageDocs;
