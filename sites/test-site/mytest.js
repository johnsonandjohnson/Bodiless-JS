// eslint-disable-next-line import/no-extraneous-dependencies
const requireEsm = require('esm')(module);

// const { getPackageTailwindConfig, mergeConfigs } = requireEsm(
//   '@bodiless/cli'
// );
// // We need the line below only for watching for changes.
// const siteConfig = require('./site.tailwind.config');

const { getTailwindConfig } = requireEsm('@bodiless/accordion/lib/getTailwindConfig');
console.log('getTailwindConfig', getTailwindConfig());

// const getTailwindConfig = () => getPackageTailwindConfig(__dirname);

// const mergedConfigs = mergeConfigs(siteConfig, getTailwindConfig());
// console.log('mergedConfigs', mergedConfigs);
// module.exports = mergedConfigs;
