const createRedirectAliases = require('@bodiless/next/createRedirectAliases');
const createRewrites = require('@bodiless/next/createRewrites');
const NextWebpackConfig = require('@bodiless/next/Webpack/Config');
const getPublicEnv = require('@bodiless/next/getPublicEnv');

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
      nextWebpack: options,
      staticReplacement: {
        enabled: false
      }
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
    };
  }
};
