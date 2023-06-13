const path = require('path');
const NextWebpackConfig = require('@bodiless/next/lib/cjs/Webpack/Config').default;
const bodilessNextConfig = require('@bodiless/next/lib/cjs/NextConfig/nextConfig');
const {
  addTokenShadowPlugin,
  addStatoscopePlugin,
} = require('@bodiless/webpack');
const shadow = require('@bodiless/vital-demo/shadow');

module.exports = {
  ...bodilessNextConfig,
  reactStrictMode: false,

  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
    },
  },
  webpack: (config, options) => {
    let nextConfig = NextWebpackConfig(config, {
      nextWebpack: options,
      staticReplacement: {
        // Pass false to disable static replacement. Defaults to true.
        enabled: true,
        // Static replacement works by searching for files ending in ".bl-edit" and replacing them
        // with a file with the same name, but ending in ".static" instead. However, all files are
        // skipped by default for compatibility reasons.
        //
        // You can pass a boolean to include or exclude all files easily. True means include all
        // ".bl-edit" files, enabling static replacement on all packages. False disables static
        // replacement, which is the same as passing `enabled: false` in the options object.
        //
        // You can also pass a RegExp which will be matched against the **absolute** path of every
        // .bl-edit file being imported. If it matches and a sibling .static file is found, the file
        // will be replaced. For instance, if you want to include all `vital-editors` and
        // `vital-link` files, you may pass `/vital-editors|vital-link/` to this option.
        //
        // Defaults to false.
        include: true,
        // Pass false to disable logging all resolving operations. Defaults to true.
        logging: true,
        // You can pass a RegExp which will be matched against the **absolute** path of every
        // .bl-edit file being imported. If it matches, the file will not be replaced.
        // For instance, if you want to replace all static but `vital-editors` and
        // `vital-link` files, you may pass true to the option include and
        //  `/vital-editors|vital-link/` to this option.
        //
        // Defaults to false.
        exclude: false,
      }
    });
    if (!options.dev && !options.isServer) {
      const options = {
        enabled: true, // process.env.BODILESS_BUILD_STATS === '1',
        sitePath:
          process.env.BODILESS_STATS_PATH || path.resolve('./public/generated'),
        name: 'vital-demo-next',
        open: true ? 'file' : false,
      };

      nextConfig = addStatoscopePlugin(nextConfig, options);
    }
    nextConfig = addTokenShadowPlugin(nextConfig, { resolvers: [shadow] });

    return nextConfig;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
};
