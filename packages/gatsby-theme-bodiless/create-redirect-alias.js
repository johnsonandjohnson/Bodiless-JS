/**
 * Copyright © 2021 Johnson & Johnson
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

const { getRedirectAliases } = require('@bodiless/page/lib/cjs/NodeApi');

module.exports = async ({ actions }, logger) => {
  const { createRedirect } = actions;
  const aliases = await getRedirectAliases();

  if (aliases && aliases.length) {
    aliases.forEach(item => {
      logger.log('Creating redirect ', item.fromPath);

      const hasTrailingSlash = item.fromPath.substr(-1) === '/';
      const baseItem = {
        toPath: item.toPath,
        statusCode: item.statusCode,
        redirectInBrowser: true,
      };

      if (hasTrailingSlash) {
        createRedirect({
          fromPath: item.fromPath.replace(/\/$/, ''),
          ...baseItem,
        });
      } else {
        createRedirect({
          fromPath: `${item.fromPath}/`,
          ...baseItem,
        });
      }

      createRedirect({
        fromPath: item.fromPath,
        ...baseItem,
      });
    });
  }
};
