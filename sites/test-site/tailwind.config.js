const requireEsm = require('esm')(module);

const { getPackageTailwindConfig, mergeConfigs } = requireEsm(
  '@bodiless/fclasses'
);

// Requre configs files directly in order to watch for changes and to update the page
// instantly (in "live mode") during development:
const siteConfig = require('./site.tailwind.config');
const accordionConfig = require('../../packages/bodiless-accordion/site.tailwind.config');
// const someOtherPackageConfigYouWantToWatchOn = require(<relative_path_to_package>);

// Get configs sorted by precedence and/or exclude some packages:
// const getTailwindConfigExample = () => getPackageTailwindConfig(__dirname, {
//   prefer: ['@bodiless/test-site', '@bodiless/some-package-name'],
//   exclude: ['@bodiless/organisms', '@bodiless/accordion'],
// });

const getTailwindConfig = () => getPackageTailwindConfig(__dirname, {
  prefer: ['@bodiless/test-site'],
});

const mergedConfigs = mergeConfigs({}, getTailwindConfig());
module.exports = mergedConfigs;
