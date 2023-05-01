const path = require('path');
const NextWebpackConfig = require('@bodiless/next/lib/cjs/Webpack/Config').default;
const bodilessNextConfig = require('@bodiless/next/lib/cjs/NextConfig/nextConfig');
const { addTokenShadowPlugin, addStatoscopePlugin } = require('@bodiless/webpack');
const shadow = require('--vital--/shadow');

module.exports = {
  ...bodilessNextConfig,
  reactStrictMode: false,
  webpack: (config, options) => {
    let nextConfig = addTokenShadowPlugin(config, { resolvers: [shadow] });
    nextConfig = NextWebpackConfig(nextConfig, {
      nextWebpack: options
    });
    if (!options.dev && !options.isServer) {
      const options = {
        enabled: process.env.BODILESS_BUILD_STATS === '1',
        sitePath: path.resolve('./'),
        name: '__vital__',
        open: process.env.BODILESS_OPEN_STATS === '1' ? 'file' : false,
      };

      nextConfig = addStatoscopePlugin(nextConfig, options);
    }
    return nextConfig;
  },
};
