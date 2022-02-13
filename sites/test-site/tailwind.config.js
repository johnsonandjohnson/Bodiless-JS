const { getPackageTailwindConfig, mergeConfigs } = require(
  '@bodiless/cli'
);

const getTailwindConfig = () => getPackageTailwindConfig(__dirname);

module.exports = mergeConfigs({}, getTailwindConfig());
