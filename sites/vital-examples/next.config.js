const path = require('path');
const NextWebpackConfig = require('@bodiless/next/lib/cjs/Webpack/Config').default;
const bodilessNextConfig = require('@bodiless/next/lib/cjs/NextConfig/nextConfig');
const { addTokenShadowPlugin, addStatoscopePlugin } = require('@bodiless/webpack');
const shadow = require('vital-examples/shadow');

module.exports = {
  ...bodilessNextConfig,
  reactStrictMode: false,
  webpack: (config, options) => {
    let nextConfig = NextWebpackConfig(config, {
      nextWebpack: options
    });
    if (!options.dev && !options.isServer) {
      const options = {
        enabled: process.env.BODILESS_BUILD_STATS === '1',
        sitePath: process.env.BODILESS_STATS_PATH || path.resolve('./public/generated'),
        name: 'vital-examples',
        open: process.env.BODILESS_OPEN_STATS === '1' ? 'file' : false,
      };

      nextConfig = addStatoscopePlugin(nextConfig, options);
    }
    nextConfig = addTokenShadowPlugin(nextConfig, { resolvers: [shadow] });

    return nextConfig;
  },
};
