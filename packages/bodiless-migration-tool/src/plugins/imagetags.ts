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

import path from 'path';
import type { OnPageCreateParams } from '../pluginManager';
import debug from '../debug';

type ImagetagsFactoryParams = {
  /**
   * prefix of the image json file.
   */
  prefix: string,
};

/**
 * creates json file for each image tags
 * allows to prefix the json file
 *
 * @param params to create the image tag scraper plugin
 */
const onPageCreate = ({
  prefix,
}: ImagetagsFactoryParams) => ({
  document, api, downloader, pagePath: pageUrl,
}: OnPageCreateParams) => {
  document('img')
    .toArray()
    .forEach(async asset => {
      if (!asset.attribs.src) {
        return;
      }
      const resourceUrl = new URL(asset.attribs.src, pageUrl);
      const url = resourceUrl.href;
      try {
        const downloaded = await downloader.downloadFiles([url]);
        if (downloaded.length >= 1) {
          const { targetPath } = downloaded[0];
          if (!targetPath) {
            return;
          }
          const ext = path.extname(targetPath);
          const content = {
            src: api.getStaticRelativePath(targetPath),
            alt: asset.attribs.alt,
          };
          const jsonFilePath = api.getAvailableJsonFilename(
            `${prefix}${path.basename(targetPath, ext)}.json`,
            content,
          );
          api.writeJsonFileSync(
            jsonFilePath,
            content,
          );
        }
      } catch (e) {
        debug(`${url} is not available for image json.`);
      }
    });
};

const createImagetagsPlugin = (params: ImagetagsFactoryParams) => ({
  onPageCreate: onPageCreate(params),
});

export default createImagetagsPlugin;
