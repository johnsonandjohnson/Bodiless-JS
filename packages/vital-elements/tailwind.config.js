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

const tailwindcssDir = require('tailwindcss-dir')();
const designTokens = require('./assets/design-tokens.nested.json');

// Parse the JSON Tokens data
const parsedDesignTokens = JSON.parse(JSON.stringify(designTokens));

/**
 * The `design-tokens.nested.json` file should only contain all Core tokens.
 * These core tokens are then used to extend the corresponding Tailwind config sections.
 *
 * @TODO: The `border.style` tokens do not have a corresponding key in the Tailwind config.
 * `borderStyle` is only a valid key for the TW variants and plugins. The default TW values for
 * borderStyle match the provided tokens.
 *
 * @TODO: `typography` tokens include `text-decoration` and `text-transform` tokens which are
 * not intended to be extended or modified in the Tailwind config and do not have corresponding
 * keys in the Tailwind config. The default TW config covers these tokens and provides the same
 * Default classes like `capitalize` or `uppercase`.
 *
 * @TODO: Also note that currently the `design-tokens.nested.json` is manually adjusted to
 * the more favourable format to resolve certain issues with resolving Figma Plugin aliases.
 * Thehere is a script being worked on to format tokens automatically.
 *
 * @TODO: The `border-width` and `border-style` tokens in JSON are combined under the same key.
 * Tailwind treats it as two separate styles with different config key. In manually updated JSON
 * it is split into two different token "section" like `border.width` and `boder.style`
 * to avoid TW config issues.
 */
const {
  // colors,
  // spacing,
  // typography,
  opacity,
  // border,
} = parsedDesignTokens;

const resolver = (pkgName) => require.resolve(pkgName);

const twConfig = {
  content: [
    './lib/**/!(*.d).{ts,js,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      xs: ['0.75rem', '1.125rem'],
      sm: ['0.875rem', '1.25rem'],
      base: ['1rem', '1.375rem'],
      lg: ['1.75rem', '1.875rem'],
      xl: ['1.625rem', '2rem'],
      '2xl': ['2rem', '2.25rem'],
      '3xl': ['2.563rem', '2.813rem'],
      'm-xs': ['0.688rem', '0.938rem'],
      'm-sm': ['0.75rem', '1rem'],
      'm-base': ['0.875rem', '1.125rem'],
      'm-lg': ['1.125rem', '1.375rem'],
      'm-xl': ['1.438rem', '1.625rem'],
      'm-2xl': ['1.813rem', '2.125rem'],
      'm-3xl': ['2.25rem', '2.5rem'],
    },
    colors: {
      transparent: 'transparent',
      'vital-primary': {
        brand: '#CA081B',
        'card-bg': '#ffffff',
        'page-bg': '#F4F4F4',
        interactive: '#000099',
        'interactive-active': '#000341',
        divider: '#D8D8D8',
        'body-copy': '#63666A',
        'header-copy': '#212121',
        'footer-copy': '#FFFFFF',
      },
      'vital-secondary': {
        eyebrow: '#CC0099',
        'footer-bg': '#2B2B33',
        table: '#E5E7EB',
        'table-interactive': '#f3f4f6',
        separator: '#666666',
        search: '#888888',
        'button-selected': '#000041',
      },
      kenvue: {
        'neutrals-white': '#FFFFFF',
        'neutrals-lightest-grey': '#F8F8F8',
        'neutrals-light-grey': '#BFBFBF',
        'neutrals-neutrals-grey': '#999999',
        'neutrals-dark-grey': '#616161',
        'neutrals-darkest-grey': '#2B2B2B',
        'neutrals-black': '#000000',
        'green-tint-20': '#CCEAE6',
        'green-tint-40': '#99D6CD',
        'green-tint-60': '#67C1B3',
        'green-green': '#019881',
        'green-shade-40': '#003D34',
        'green-shade-60': '#015B4D',
        'green-shade-80': '#017A67',
        'purple-purple': '#D3BDF2',
        'red-red': '#FF6B6B',
        'yellow-yellow': '#FFB000',
      }
    },
    extend: {
      /**
       * Vital 2.0 Tokens coming from Figma plugin.
       */
      fontFamily: {
        DMSans: ['DM Sans', 'sans-serif'],
        // ...typography['font-family'],
        1: 'DM Sans',
        2: 'DM Sans',
      },
      fontWeights: {
        // ...typography.font,
      },
      fontSize: {
        '11.7px': '11.7px',
        '13.3px': '13.3px',
        '14px': '14px',
        '15.2px': '15.2px',
        '16px': '16px',
        '19.2px': '19.2px',
        '20.2px': '20.2px',
        '23px': '23px',
        '24.2px': '24.2px',
        '27.6px': '27.6px',
        '29px': '29px',
        '34.8px': '34.8px',
        '33.2px': '33.2px',
        '39.8px': '39.8px',
      },
      lineHeight: {
        // ...typography.leading,
        5: '120%',
        6: '150%'
      },
      textSizes: {
        // ...typography.text,
      },
      spacing: {
        // ...spacing,
        '0px': '0px',
        '1px': '1px',
        '2px': '2px',
        '3px': '3px',
        '4px': '4px',
        '5px': '5px',
        '6px': '6px',
        '7px': '7px',
        '8px': '8px',
        '9px': '9px',
        '10px': '10px',
        '12px': '12px',
        '14px': '14px',
        '16px': '16px',
        '18px': '18px',
        '20px': '20px',
        '24px': '24px',
        '32px': '32px',
        '36px': '36px',
        '40px': '40px',
        '48px': '48px',
        '64px': '64px',
      },
      borderWidth: {
        // ...border.width,
        '1px': '1px',
      },
      borderRadius: {
        // ...border.rounded,
        0: '0px',
        2: '2px',
        4: '4px',
        6: '6px',
        8: '8px',
        10: '10px',
        12: '12px',
        20: '20px',
        150: '150px',
        600: '600px',
        pill: '9999px',
      },
      opacity: {
        // ...opacity,
      },
      margin: {
        4.5: '1.125rem',
        5.75: '1.438rem',
        'site-percent': '5%',
        'md-site-percent': '8%',
      },
      padding: {
        'site-percent': '5%',
        'md-site-percent': '8%',
      },
    },
  },
  plugins: [
    tailwindcssDir,
  ],
};

module.exports = getPackageTailwindConfig({
  twConfig,
  resolver,
});
