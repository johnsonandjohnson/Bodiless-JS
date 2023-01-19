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
const createRewrites = () => {
  const rewrites = process.env.NODE_ENV === 'development' ? {
    beforeFiles: [
      {
        source: `${process.env.BODILESS_DOCS_URL || '/___docs'}`,
        destination: '/doc/index.html',
      },
      {
        source: `${process.env.BODILESS_DOCS_URL || '/___docs'}/:slug*`,
        destination: '/doc/:slug*',
      },
      {
        source: `/${process.env.BODILESS_BACKEND_PREFIX || '___backend'}/:slug*`,
        destination: `http://localhost:${process.env.BODILESS_BACKEND_PORT || 8001}/${process.env.BODILESS_BACKEND_PREFIX || '___backend'}/:slug*`,
      },
    ],
  } : {};

  return rewrites;
};

module.exports = createRewrites;
