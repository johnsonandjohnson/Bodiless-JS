const requireEsm = require('esm')(module);

const { getPackageTailwindConfig, mergeConfigs } = requireEsm(
  '@bodiless/fclasses'
);

// Uncomment the lines below to update styles instantly in "live mode" during development.
// const siteConfig = require('./site.tailwind.config');
// const accordionConfig = require('../../packages/bodiless-accordion/site.tailwind.config');
// const someotheRPackageConfigYouWantToWatchOn = require(<relative_path_to_package>);

const getTailwindConfig = () => getPackageTailwindConfig(__dirname);

const mergedConfigs = mergeConfigs({}, getTailwindConfig());
module.exports = mergedConfigs;
