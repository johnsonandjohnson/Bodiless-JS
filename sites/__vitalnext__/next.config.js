const createRedirectAliases = require('@bodiless/next/createRedirectAliases');
const createRewrites = require('@bodiless/next/createRewrites');
const NextWebpackConfig = require('@bodiless/next/Webpack/Config');
const getPublicEnv = require('@bodiless/next/getPublicEnv');
const glob = require('glob');

module.exports = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      ...(await createRedirectAliases())
    ];
  },
  async rewrites() {
    return {
      ...createRewrites(),
    };
  },
  trailingSlash: true,
  env: {
    ...getPublicEnv()
  },
  reactStrictMode: false,
  webpack: (config, options) => {
    const { usedExports, ...optimization } = config.optimization;
    const BodilessNextConfig = NextWebpackConfig(config, {
      nextWebpack: options
    });
    return {
      ...BodilessNextConfig,
      plugins: [
        ...(BodilessNextConfig.plugins || []),
      ],
      optimization: {
        ...optimization,
        providedExports: true
      },
      // On development, we want changes on Bodiless packages to trigger
      // new builds. Webpack won't watch packages inside node_modules by
      // default, so we remove the @bodiless folder from its default list.
      //
      // See: https://webpack.js.org/configuration/other-options/#snapshot
      snapshot: {
        managedPaths: glob.sync(
          './node_modules/!(@bodiless)*',
          { absolute: true },
        ),
      }
    };
  }
};
