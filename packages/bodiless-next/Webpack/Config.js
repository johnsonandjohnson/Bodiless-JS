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
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const { addStaticReplacementPlugin } = require('@bodiless/webpack');
const generateSitemapXml = require('./Sitemapxml');
const generateRobotsTxt = require('./Robotstxt');

const REGEXP = /\.gatsby/;
const REPLACEMENT = '.next';

const createLogger = (log = true) => (message) => {
  // eslint-disable-next-line no-console
  if (log) console.log(message);
};

const findPackageName = (resourcePath) => {
  if (resourcePath.length === 1) return undefined;
  const dir = path.dirname(resourcePath);
  try {
    const pjPath = path.join(dir, 'package.json');
    if (fs.existsSync(pjPath)) {
      const json = fs.readFileSync(pjPath);
      const pj = JSON.parse(json.toString());
      if (pj.name) return pj.name;
    }
  } catch (e) {
    return undefined;
  }
  return findPackageName(dir);
};

const createTokenNextPlugin = (
  { logging }
) => {
  const log = createLogger(logging || true);
  return new webpack.NormalModuleReplacementPlugin(
    REGEXP,
    resource => {
      const newRequest = resource.request.replace(REGEXP, REPLACEMENT);
      const newResource = path.join(resource.context, newRequest);
      try {
        // Ensure that the replacement exists and is resolvable.
        require.resolve(newResource);

        log(`[Next component replacement] Replacing import in ${resource.contextInfo.issuer}`);
        log(` ↳ ${resource.request} → ${newRequest}\n`);

        // eslint-disable-next-line no-param-reassign
        resource.request = newRequest;
      } catch (e) {
        if (logging) {
          console.warn(`[Next component replacement] Not replacing ${resource.request}: unable to resolve ${newResource}`);
        }
      }
    },
  );
};

/**
 *
 * Helper function which removes NextJS error loader for global css.
 * @param {Object} config
 *  Webpack configuration.
 * @returns {Object} Webpack configuration.
 */
const enableGlobalCssOnEdit = (config, options) => {
  const getTailwindConfig = () => {
    const processDirFile = path.resolve(process.cwd(), 'tailwind.config.js');
    if (fs.existsSync(processDirFile)) {
      return processDirFile;
    }
    const siteDirFile = path.resolve(__dirname, 'tailwind.config.js');
    if (fs.existsSync(siteDirFile)) {
      return siteDirFile;
    }
    return false;
  };

  const tailWindConfigFile = getTailwindConfig();

  const postCssPlugins = [
    // eslint-disable-next-line global-require
    require('tailwindcss')(tailWindConfigFile),
    // eslint-disable-next-line global-require
    require('autoprefixer')(),
  ];

  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules.map(rule => {
          if (
            typeof rule !== 'object'
            || typeof rule.oneOf !== 'object'
          ) return rule;
          const oneOf = rule.oneOf.map(oneOf => {
            const regexGlobals = [
              /(?<!\.module)\.css$/,
              /(?<!\.module)\.(scss|sass)$/
            ];
            if (
              typeof oneOf.use !== 'object'
              || oneOf.use.loader !== 'error-loader'
              || !Array.isArray(oneOf.test)
            ) return oneOf;
            if (
              oneOf.test.every((el, i) => el.toString() === regexGlobals[i].toString())
            ) {
              return {
                ...oneOf,
                use: [
                  { loader: options.isServer ? 'file-loader' : 'style-loader'},
                  { loader: 'css-loader' },
                  {
                    loader: 'postcss-loader',
                    options: {
                      postcssOptions: {
                        plugins: postCssPlugins,
                      }
                    }
                  },
                ]
              };
            }
            return oneOf;
          });
          return {
            ...rule,
            oneOf
          };
        }),
      ]
    }
  };
};

const ignoreGlobalCssOnStatic = (config) => (
  {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules.map(rule => {
          if (
            typeof rule !== 'object'
            || typeof rule.oneOf !== 'object'
          ) return rule;
          const oneOf = rule.oneOf.map(oneOf => {
            const regexGlobals = [
              /(?<!\.module)\.css$/,
              /(?<!\.module)\.(scss|sass)$/
            ];
            if (
              typeof oneOf.use !== 'object'
              || oneOf.use.loader !== 'error-loader'
              || !Array.isArray(oneOf.test)
            ) return oneOf;
            if (
              oneOf.test.every((el, i) => el.toString() === regexGlobals[i].toString())
            ) {
              return {
                ...oneOf,
                use: 'null-loader'
              };
            }
            return oneOf;
          });
          return {
            ...rule,
            oneOf
          };
        }),
      ]
    }
  }
);

const bodilessWepackConfig = (config, options) => {
  const { nextWebpack } = options;
  const isEdit = process.env.NODE_ENV === 'development' || false;
  const buildJS = !nextWebpack.dev && !nextWebpack.isServer;
  const devJS = nextWebpack.dev && !nextWebpack.isServer;

  if (nextWebpack.isServer && nextWebpack.nextRuntime === 'nodejs') {
    generateRobotsTxt(options.robotstxt || {});

    const sitemapxmlOptions = {
      prefix: nextWebpack.config.basePath || '',
      ...options.sitemapxml
    };
    generateSitemapXml(sitemapxmlOptions || {});
  }

  if (isEdit) {
    // eslint-disable-next-line no-param-reassign
    config = enableGlobalCssOnEdit(config, options);
  } else {
    // eslint-disable-next-line no-param-reassign
    config = ignoreGlobalCssOnStatic(config);
  }

  const serverModuleFallback = buildJS || devJS ? {
    crypto: require.resolve('crypto-browserify'),
    // stream is required for crypto
    stream: require.resolve('stream-browserify'),
    path: require.resolve('path-browserify'),
  } : {};

  const staticReplacement = buildJS && !isEdit ? addStaticReplacementPlugin({}, {
    enabled: true,
    include: true,
    logging: true,
    exclude: false,
    ...options.staticReplacement || {}
  }) : { plugins: []};

  return {
    ...config,
    plugins: [
      ...(config.plugins || []),
      ...(staticReplacement.plugins || []),
      createTokenNextPlugin(options),
    ],
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        // ...bodilessEditCssAliases,
      },
      fallback: {
        ...config.resolve.fallback,
        ...serverModuleFallback
      }
    },
  };
};

module.exports = (
  config,
  options,
) => bodilessWepackConfig(config, options);
