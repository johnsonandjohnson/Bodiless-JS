const requireEsm = require('esm')(module);

const { getPackageTailwindConfig, mergeConfigs } = requireEsm(
  '@bodiless/fclasses'
);

const resolver = (pkgName) => requireEsm(pkgName);

const pkgJson = require('./package.json');

const twConfig = {
  purge: [
    './src/**/!(*.d).{ts,js,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};

const getTwConfig = () => getPackageTailwindConfig({
  pkgJson,
  twConfig,
  resolver,
  // options: {
  //   prefer: ['@bodiless/__cxstarter__']
  // }
});

console.log('getTwConfig()', getTwConfig());

const mergedConfigs = mergeConfigs({}, getTwConfig());
module.exports = mergedConfigs;
