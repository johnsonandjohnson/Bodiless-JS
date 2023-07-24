/* eslint-disable import/no-dynamic-require, global-require */
import { getPackageTailwindConfig } from '@bodiless/fclasses';

const resolver = (pkgName) => require.resolve(pkgName);

const twConfig = {
  content: [
    './lib/**/!(*.d).{ts,js,jsx,tsx}',
  ],
};

module.exports = getPackageTailwindConfig({
  twConfig,
  resolver,
});
