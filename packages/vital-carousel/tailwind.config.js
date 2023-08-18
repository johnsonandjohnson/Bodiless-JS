/* eslint-disable import/no-dynamic-require, global-require */
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
import { getPackageTailwindConfig } from '@bodiless/fclasses';

const plugin = require('tailwindcss/plugin');

const twConfig = {
  content: [
    './lib/**/!(*.d).{ts,js,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* TODO
         * These are currently hardcoded until we determine best way to pass token values
         * back directly into here tailwind config
         */
        ScrollIndicatorActive: '#019881',
        ScrollIndicatorInActive: '#BFBFBF',
      }
    },
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        '.scrollbar': {
          overflowY: 'auto',
        },
        '.scrollbar::-webkit-scrollbar': {
          height: '8px',
          'border-radius': '10px',
        },
        '.scrollbar::-webkit-scrollbar-thumb': {
          backgroundColor: theme('colors.ScrollIndicatorActive'),
          'border-radius': '10px',
        },
        '.scrollbar::-webkit-scrollbar-track': {
          backgroundColor: theme('colors.ScrollIndicatorInActive'),
          'border-radius': '10px',
        },
      });
    }),
    plugin(({ addUtilities, theme }) => {
      addUtilities(
        {
          '.scroll-snap-slider': {
            'padding-inline': '0',
          },
          '.scroll-snap-slider.-draggable': {
            cursor: 'grab',
          },
          '.scroll-snap-slider.-draggable.-dragging': {
            cursor: 'grabbing',
          },
          '.indicators.-hidden': {
            opacity: '0',
          },
          '.indicators .counter.-active': {
            display: 'block',
          },
          '.indicators .counter:not(.-active)': {
            display: 'none',
          },
          '.indicators .indicator.-active .dot': {
            'background-color': theme('colors.ScrollIndicatorActive'),
          },
          '.indicator.-hide': {
            display: 'none',
          },
          '.indicator.-hide.-peek': {
            display: 'block',
            height: '10px',
            overflow: 'hidden',
            'margin-bottom': '24px',
          },
          '.arrow.-disabled': {
            color: theme('colors.ScrollIndicatorInActive'),
          }
        }
      );
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
        '.scrollbar-default': {
          /* IE and Edge */
          '-ms-overflow-style': 'auto',

          /* Firefox */
          'scrollbar-width': 'auto',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'block'
          }
        }
      }, ['responsive']);
    }),
  ],
};

module.exports = getPackageTailwindConfig({
  twConfig,
  resolver: (pkgName) => require.resolve(pkgName),
});
