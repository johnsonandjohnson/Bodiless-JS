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

import webpack, { Configuration } from 'webpack';

const babelConfig = {
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-optional-chaining',
    'babel-plugin-preval',
  ],
  presets: [
    [
      '@babel/preset-react',
      { modules: false }
    ]
  ],
  env: {
    test: {
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-transform-modules-commonjs'],
      ]
    }
  }
};

const createNoGatsbyWebpackPlugin = () => new webpack.NormalModuleReplacementPlugin(
  /vital-gatsby-image/,
  (res: any) => {
    res.request = `${res.request}/mocks`;
  }
);

const createNoGatsbyRules = () => [
  {
    test: (file: string) => file.endsWith('js') && file.includes('gatsby/cache-dir'),
    loader: 'babel-loader',
    options: babelConfig,
  },
  {
    test: /\.(js|jsx|mjs|ts|tsx)$/,
    loader: 'babel-loader',
    options: babelConfig,
    exclude: [
      (file: string) => {
        if (file.includes('gatsby-browser-entry')) {
          return false;
        }
        return file.includes('node_modules');
      },
    ],
  },
];

const addNoGatsbyWebpackConfig = (config: Configuration): Configuration => ({
  ...config,
  plugins: [
    ...(config.plugins || []),
    createNoGatsbyWebpackPlugin(),
  ],
  module: {
    ...(config.module || {}),
    rules: [
      ...(config.module?.rules || []),
      ...createNoGatsbyRules()
    ]
  },
});

export { createNoGatsbyWebpackPlugin, createNoGatsbyRules, addNoGatsbyWebpackConfig };
