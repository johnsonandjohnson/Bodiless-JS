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

const twConfig = {
  purge: [
    './lib/**/!(*.d).{ts,js,jsx,tsx}',
  ],
  theme: {
    screens: {
      md: '768px',
      lg: '1025px',
      xl: '1921px',
    },
    // Colors are used in styleguide.
    colors: {
      red: '#FF0000',
      green: '#00FF00',
      blue: '#0000FF',
      orange: '#FFA500',
    },
    maxWidth: {
      48: '12rem',
      56: '14rem',
      screen: '100vw',
    },
    extend: {
      margin: {
        'negative-half-screen': '-50vw',
      },
    },
  },
  variants: {
    backgroundColor: ['first', 'last', 'responsive'],
    margin: ['first', 'last', 'responsive'],
    padding: ['first', 'last', 'responsive'],
    width: ['first', 'last', 'responsive'],
  },
};

module.exports = getPackageTailwindConfig({
  twConfig,
  resolver,
});
