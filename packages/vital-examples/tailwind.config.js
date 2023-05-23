/* eslint-disable import/no-dynamic-require, global-require */
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
import { getPackageTailwindConfig } from '@bodiless/fclasses';

const resolver = (pkgName) => require.resolve(pkgName);

const plugin = require('tailwindcss/plugin');

const twConfig = {
  content: [
    './lib/**/!(*.d).{ts,js,jsx,tsx}',
  ],
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.card-corner': {
          width: 'calc(100% - 60px)',
          height: '18rem',
          float: 'right',
          'border-radius': '0 0 0 150px',
          'object-fit': 'cover',
          'object-position': 'center',
        },
        '.card-corner-md': {
          // width: '50%',
          height: '31rem',
          'border-radius': '0 0 0 150px',
          'object-position': '72%',
        },
        '.card-corner-lg': {
          width: '100%',
          height: '38rem',
          float: 'none',
          'border-radius': '0 0 0 400px',
        },
      });
    }),
  ],
};

module.exports = getPackageTailwindConfig({
  twConfig,
  resolver,
});
