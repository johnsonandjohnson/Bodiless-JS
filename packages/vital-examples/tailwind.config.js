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

const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

const resolver = (pkgName) => require.resolve(pkgName);

const twConfig = {
  content: ['./lib/**/!(*.d).{ts,js,jsx,tsx}'],
  theme: {
    screens: {
      sm: '576px', // => @media (min-width: 576px) { ... }
      md: '768px', // => @media (min-width: 768px) { ... }
      lg: '992px', // => @media (min-width: 992px) { ... }
      xl: '1200px', // => @media (min-width: 1200px) { ... }
      xxl: '1400px', // => @media (min-width: 1400px) { ... }
    },
    colors: {
      'vital-primary': {
        brand: '#CD8987',
        card: '#CDCACC',
        interactive: '#CDACA1',
        divider: '#CDCACC',
        'header-copy': '#330000',
        'body-copy': '#330000',
        'footer-copy': '#330000',
        'page-bg': '#CDCACC',
      },
      'vital-secondary': {
        eyebrow: '#CCFBFE',
        separator: '#330000',
        'footer-bg': '#CDCACC',
      },
    },
    extend: {
      // We are adding back the default tailwind red/blue so that we can use
      // some default colors in our examples.
      // This is just to simplify the examples, and would not normally be part
      // of a site build.
      // Note that this is necessary bc vital-elements *overrides* rather
      // than *extending* the default Tailwind palette.
      colors: {
        red: colors.red,
        blue: colors.blue,
      },
      backgroundImage: {
        'mobile-wave-top': "url('@bodiless/vital-examples/src/background-images/assets/images/mobilewave.svg')",
      },
      backgroundSize: {
        'wave-full': '100% 100%',
      },
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.footer-wave': {
          maskImage: "url('@bodiless/vital-examples/src/background-images/assets/images/desktopwave.svg')",
          maskPosition: 'bottom center',
          maskSize: '100%',
        },
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
