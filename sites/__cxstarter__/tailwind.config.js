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
const requireEsm = require('esm')(module);

const { getPackageTailwindConfig, mergeConfigs } = requireEsm(
  '@bodiless/fclasses'
);

const resolver = (pkgName) => requireEsm(pkgName);

const pkgJson = require('./package.json');

const twConfig = {
  purge: [
    './src/**/!(*.d).{ts,js,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};

// Get configs sorted by precedence and/or exclude some packages:
// const getTwConfig = () => getPackageTailwindConfig({
//   pkgJson,
//   twConfig,
//   resolver,
//   prefer: ['@bodiless/test-site', '@bodiless/some-package-name'],
//   exclude: ['@bodiless/organisms', '@bodiless/accordion'],
// });

const getTwConfig = () => getPackageTailwindConfig({
  pkgJson,
  twConfig,
  resolver,
  options: {
    prefer: ['@sites/__cxstarter__', '@bodiless/__cxstarter__']
  }
});

const mergedConfigs = mergeConfigs({}, getTwConfig());
module.exports = mergedConfigs;
