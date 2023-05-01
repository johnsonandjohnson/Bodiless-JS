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
import createRedirectAliases from './createRedirectAliases';
import createRewrites from './createRewrites';
import getPublicEnv from './getPublicEnv';

module.exports = {
  async redirects() {
    return [
      ...(await createRedirectAliases())
    ];
  },
  async rewrites() {
    return {
      ...createRewrites(),
    };
  },
  trailingSlash: process.env.BODILESS_NEXT_TRAILING_SLASH || true,
  env: {
    ...getPublicEnv()
  },
};
