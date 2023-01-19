const { addTokenShadowPlugin } = require('@bodiless/webpack');
const createRedirectAliases = require('@bodiless/next/createRedirectAliases');
const createRewrites = require('@bodiless/next/createRewrites');
const shadow = require('--vital--/shadow');
const shadowtest = require('@bodiless/vital-test/shadow');
const NextWebpackConfig = require('@bodiless/next/Webpack/Config');
const getPublicEnv = require('@bodiless/next/getPublicEnv');

module.exports = {
  images: {
    unoptimized: true
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
    const tokenShadow = addTokenShadowPlugin({}, { resolvers: [shadow, shadowtest] });

    const { usedExports, ...optimization } = config.optimization;
    const BodilessNextConfig = NextWebpackConfig(config, {nextWebpack: options});
    return {
      ...BodilessNextConfig,
      plugins: [
        ...(BodilessNextConfig.plugins || []),
        ...tokenShadow.plugins,
      ],
      optimization: {
        ...optimization,
        providedExports: true
      },
    };
  }
};
