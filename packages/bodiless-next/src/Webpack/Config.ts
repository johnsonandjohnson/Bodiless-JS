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
import webpack from 'webpack';
import { dirname, join, resolve } from 'path';
import { existsSync, readFileSync } from 'fs';
import { addStaticReplacementPlugin } from '@bodiless/webpack';
import { sync as globSync} from 'glob';
import generateSitemapXml from './Sitemapxml';
import generateRobotsTxt from './Robotstxt';
import generateManifest from './Manifest';
import bodilessNextConfig from '../NextConfig/bodilessNextConfigLoader';
import type { BodilessNextConfig } from '../NextConfig/bodilessNextConfigLoader';

type BodilessNextConfigWithNext = BodilessNextConfig & {
  nextWebpack: any
};

const REGEXP = /\.gatsby/;
const REPLACEMENT = '.next';

const createLogger = (log = true) => (message :String) => {
  // eslint-disable-next-line no-console
  if (log) console.log(message);
};

const findPackageName = (resourcePath: string): string | undefined => {
  if (resourcePath.length === 1) return undefined;
  const dir = dirname(resourcePath);
  try {
    const pjPath = join(dir, 'package.json');
    if (existsSync(pjPath)) {
      const json = readFileSync(pjPath);
      const pj = JSON.parse(json.toString());
      if (pj.name) return pj.name;
    }
  } catch (e) {
    return undefined;
  }
  return findPackageName(dir);
};

const createTokenNextPlugin = (
  { logging }: { logging: boolean}
) => {
  const log = createLogger(logging || true);
  return new webpack.NormalModuleReplacementPlugin(
    REGEXP,
    resource => {
      const newRequest = resource.request.replace(REGEXP, REPLACEMENT);
      const newResource = join(resource.context, newRequest);
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

const replaceCssLoader = (config: any, newCssLoader: any) => (
  {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...(config.module && config.module.rules ? config.module.rules : []).map((rule: any) => {
          if (
            typeof rule !== 'object'
            || typeof rule.oneOf !== 'object'
          ) return rule;
          const oneOf = rule.oneOf.map((oneOf: any) => {
            const regexGlobals = [
              /(?<!\.module)\.css$/,
              /(?<!\.module)\.(scss|sass)$/
            ];
            if (
              typeof oneOf.use !== 'object'
              || (oneOf.use.loader && oneOf.use.loader !== 'error-loader')
              || !Array.isArray(oneOf.test)
            ) return oneOf;
            if (
              oneOf.test.every((el: any, i: any) => el.toString() === regexGlobals[i].toString())
            ) {
              return {
                ...oneOf,
                use: newCssLoader
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

/**
 *
 * Helper function which removes NextJS error loader for global css.
 * @param {Object} config
 *  Webpack configuration.
 * @returns {Object} Webpack configuration.
 */
const enableGlobalCssOnEdit = (config: any, options: any) => {
  const getTailwindConfig = () => {
    const processDirFile = resolve(process.cwd(), 'tailwind.config.js');
    if (existsSync(processDirFile)) {
      return processDirFile;
    }
    const siteDirFile = resolve(__dirname, 'tailwind.config.js');
    if (existsSync(siteDirFile)) {
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

  const cssLoader = [
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
  ];

  return replaceCssLoader(config, cssLoader);
};

const ignoreGlobalCssOnStatic = (config: any) => replaceCssLoader(config, 'null-loader');

const bodilessWepackConfig = (config: any, options: BodilessNextConfigWithNext) => {
  const { nextWebpack } = options;
  const isEdit = process.env.NODE_ENV === 'development';
  const buildJS = !nextWebpack.dev && !nextWebpack.isServer;
  const devJS = nextWebpack.dev && !nextWebpack.isServer;

  if (nextWebpack.isServer && nextWebpack.nextRuntime === 'nodejs') {
    generateRobotsTxt(options.robotstxt);

    const sitemapxmlOptions = {
      prefix: nextWebpack.config.basePath || '',
      ...options.sitemapxml
    };
    generateSitemapXml(sitemapxmlOptions);
    generateManifest(options.manifest);
  }

  if (isEdit) {
    // eslint-disable-next-line no-param-reassign
    config = enableGlobalCssOnEdit(config, nextWebpack);
  } else {
    // eslint-disable-next-line no-param-reassign
    config = ignoreGlobalCssOnStatic(config);
  }

  const serverModuleFallback = buildJS || devJS ? {
    path: require.resolve('path-browserify'),
  } : {};

  const staticReplacement = buildJS && !isEdit ? addStaticReplacementPlugin({}, {
    ...bodilessNextConfig.staticReplacement,
    ...options.staticReplacement || {}
  }) : { plugins: []};

  const { usedExports = false, ...optimization } = config.optimization || {};

  // On development, we want changes on Bodiless packages to trigger
  // new builds. Webpack won't watch packages inside node_modules by
  // default, so we remove the @bodiless folder from its default list.
  //
  // See: https://webpack.js.org/configuration/other-options/#snapshot
  const snapshot = nextWebpack.dev ? {
    managedPaths: globSync(
      './node_modules/!(@bodiless)*',
      { absolute: true },
    ),
  } : {};

  return {
    ...config,
    plugins: [
      ...(config.plugins || []),
      ...(staticReplacement.plugins || []),
      createTokenNextPlugin({logging: true}),
      new webpack.DefinePlugin({
        BL_IS_EDIT: JSON.stringify(process.env.NODE_ENV !== 'production')
      })
    ],
    resolve: {
      ...config.resolve || {},
      alias: {
        ...(config.resolve ? config.resolve.alias : {}),
      },
      fallback: {
        ...(config.resolve ? config.resolve.fallback : {}),
        ...serverModuleFallback
      }
    },
    optimization: {
      ...optimization,
      providedExports: true
    },
    snapshot,
  };
};

const configuration = (
  config :any,
  options :BodilessNextConfigWithNext,
) => bodilessWepackConfig(config, options);

export default configuration;
