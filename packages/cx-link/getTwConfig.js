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

const plugin = require('tailwindcss/plugin');

const resolver = (pkgName) => require.resolve(pkgName);

const twConfig = {
  purge: [
    './lib/**/!(*.d).{ts,js,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        linkicons: ['linkicons'],
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        '@font-face': {
          fontFamily: 'linkicons',
          fontWeight: 400,
          fontStyle: 'normal',
          src: 'url(\'@bodiless/cx-link/assets/font/linkicons.woff2\')',
        },
      });
    }),
    plugin(({ addUtilities }) => {
      addUtilities(
        {
          '.cx-download-link::after': {
            content: '"\\e800"',
            'font-family': '"linkicons"',
            'text-decoration': 'none',
            'line-height': '1rem',
            'vertical-align': 'text-top',
            'margin-left': '.25rem',
            display: 'inline-block',
          },
          '.cx-external-link::after': {
            content: '"\\e801"',
            'font-family': '"linkicons"',
            'font-style': 'normal',
            'line-height': '1rem',
            'text-decoration': 'none',
            'text-transform': 'none',
            'vertical-align': 'text-top',
            'margin-left': '.25rem',
            display: 'inline-block',
          },
        }
      );
    }),
  ],
};

export default getPackageTailwindConfig({
  twConfig,
  resolver,
});
