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
  spacing,
  typography,
  opacity,
  border,
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
        interactive: '#019881',
        'interactive-active': '#000341',
        divider: '#D8D8D8',
        'body-copy': '#63666A',
        'header-copy': '#212121',
        'footer-copy': '#FFFFFF',
        'button-selected': '#015B4D',
        'button-disabled': '#999999',
      },
      'vital-secondary': {
        eyebrow: '#CC0099',
        'footer-bg': '#2B2B33',
        interactive: '#018571',
        table: '#E5E7EB',
        'table-interactive': '#f3f4f6',
        separator: '#666666',
        search: '#888888',
        'button-selected': '#B5E1DA',
        'button-hovered': '#E1F3F0',
        'button-disabled': '#999999',
        'border-button-selected': '#015B4D',
      },
      white: '#FFFFFF',
    },
    extend: {
      /**
       * Vital 2.0 Tokens coming from Figma plugin.
       */
      colors: {
        // ...colors,
        ColorKenvueNeutralsWhite: '#ffffff',
        ColorKenvueGreenGreen: '#019881',
        ColorKenvueGreenShade80: '#017A67',
        ColorKenvueGreenShade60: '#015B4D',
        ColorKenvueNeutralsGray: '#999999',
      },
      fontFamily: {
        DMSans: ['DM Sans', 'sans-serif'],
        ...typography['font-family'],
      },
      fontWeights: {
        ...typography.font,
      },
      leading: {
        ...typography.leading,
      },
      textSizes: {
        ...typography.text,
      },
      spacing: {
        ...spacing,
      },
      borderWidth: {
        ...border.width,
      },
      borderRadius: {
        ...border.rounded,
      },
      opacity: {
        ...opacity,
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
