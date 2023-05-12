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
  const beforeFiles = [];
  const generateDestinationPath = process.env.BODILESS_GENERATED_DESTINATION_PATH || 'generated';
  if (process.env.NODE_ENV === 'development') {
    const docBasePath = (process.env.BODILESS_DOCS_DESTINATION_PATH || `/${generateDestinationPath}/doc`).replace('./public', '');
    beforeFiles.push({
      source: `${process.env.BODILESS_DOCS_URL || '/___docs'}`,
      destination: `${docBasePath}/index.html`
    });
    beforeFiles.push({
      source: `${process.env.BODILESS_DOCS_URL || '/___docs'}/:slug*`,
      destination: `${docBasePath}/:slug*`,
    });
    beforeFiles.push({
      source: `/${process.env.BODILESS_BACKEND_PREFIX || '___backend'}/:slug*`,
      destination: `http://localhost:${process.env.BODILESS_BACKEND_PORT || 8001}/${process.env.BODILESS_BACKEND_PREFIX || '___backend'}/:slug*`,
    });
  }

  return {
    beforeFiles,
    fallback: [
      {
        source: '/:slug*',
        destination: `/${generateDestinationPath}/:slug*`,
      }
    ]
  };
};

export default createRewrites;
