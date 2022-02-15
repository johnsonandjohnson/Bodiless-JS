const requireEsm = require('esm')(module);

const { getPackageTailwindConfig, mergeConfigs } = requireEsm(
  '@bodiless/fclasses'
);

// We need this 'require' only for watching for changes.
const siteConfig = require('./site.tailwind.config');

const getTailwindConfig = () => getPackageTailwindConfig(__dirname);

const mergedConfigs = mergeConfigs({}, getTailwindConfig());
module.exports = mergedConfigs;
