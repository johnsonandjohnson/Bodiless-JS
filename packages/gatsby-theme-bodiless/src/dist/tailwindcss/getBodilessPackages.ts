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

/* eslint-disable global-require, import/no-dynamic-require */

import path from 'path';

const getPackageRoot = (packagePath: string) => path.dirname(path.dirname(packagePath));

const getBodilessPackages = () => [
  {
    root: getPackageRoot(require.resolve('@bodiless/accordion')),
    tailwindConfig: require('@bodiless/accordion/tailwind.config'),
  },
  {
    root: getPackageRoot(require.resolve('@bodiless/card')),
    tailwindConfig: require('@bodiless/card/tailwind.config'),
  },
  {
    root: getPackageRoot(require.resolve('@bodiless/navigation')),
    tailwindConfig: require('@bodiless/navigation/tailwind.config'),
  },
  {
    root: getPackageRoot(require.resolve('@bodiless/layouts')),
    tailwindConfig: require('@bodiless/layouts/tailwind.config'),
  },
  {
    root: getPackageRoot(require.resolve('@bodiless/organisms')),
    tailwindConfig: require('@bodiless/organisms/tailwind.config'),
  },
];

export {
  getPackageRoot,
  getBodilessPackages,
};
