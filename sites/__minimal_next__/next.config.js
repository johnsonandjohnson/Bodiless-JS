const NextWebpackConfig = require('@bodiless/next/lib/cjs/Webpack/Config').default;
const bodilessNextConfig = require('@bodiless/next/lib/cjs/NextConfig/nextConfig');

module.exports = {
  ...bodilessNextConfig,
  reactStrictMode: false,
  webpack: (config, options) => (
    NextWebpackConfig(config, {
      nextWebpack: options
    })
  ),
};
