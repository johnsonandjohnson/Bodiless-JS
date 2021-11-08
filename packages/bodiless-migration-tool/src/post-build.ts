/**
 * Copyright © 2019 Johnson & Johnson
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

import fs from 'fs';
import glob from 'glob';
import path from 'path';
import {
  replaceAttributes as transformAttributes,
  AttrTransformerDirecton,
} from './attr-transformer';
import debug from './debug';

function replaceAttributes(pagePath: string) {
  const pageHtml = fs.readFileSync(pagePath).toString();
  const transformedHtml = transformAttributes(pageHtml, AttrTransformerDirecton.Reverse);
  fs.writeFileSync(pagePath, transformedHtml);
}

export default function postBuild(staticDir: string) {
  const pageDataFilePath = path.resolve(staticDir, 'page-data');
  if (!fs.existsSync(pageDataFilePath)) {
    throw new Error(`${pageDataFilePath} directory does not exist. probably you did not trigger static site build`);
  }
  const files = glob.sync(`${staticDir}/**/page-data.json`);
  files.forEach(pageDataFile => {
    try {
      const pageDataJsonContent = JSON.parse(fs.readFileSync(pageDataFile).toString());
      const slug = pageDataJsonContent.path;
      const pageHtmlPath = path.resolve(staticDir + slug, 'index.html');
      if (!fs.existsSync(pageHtmlPath)) {
        debug(`skipping ${pageHtmlPath} as it does not exist`);
        return;
      }
      replaceAttributes(pageHtmlPath);
    } catch (e:any) {
      debug(`an error during processing of ${pageDataFile}. error message: ${e.message}`);
    }
  });
}
