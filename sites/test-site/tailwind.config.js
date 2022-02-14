const { getPackageTailwindConfig, mergeConfigs } = require(
  '@bodiless/cli'
);
// We need the line below only for watching for changes.
const siteConfig = require('./site.tailwind.config');

const getTailwindConfig = () => getPackageTailwindConfig(__dirname);

const mergedConfigs = mergeConfigs({}, getTailwindConfig());
module.exports = mergedConfigs;
