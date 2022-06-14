/* eslint-disable import/no-dynamic-require, global-require */
import { getPackageTailwindConfig } from '@bodiless/fclasses';

const resolver = (pkgName) => require.resolve(pkgName);

const twConfig = {
  content: [
    './lib/**/!(*.d).{ts,js,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        demo: {
          boxshadow: '#cbd5e1',
          'primary-interactive': '#473B85', // Kevin's pick: '#005392',
          'primary-interactive-active': '#5A4BA8',
          'table-light': '#CFD7DE',
        },
      },
      maxWidth: {
        64: '16rem',
      },
      minWidth: {
        64: '16rem',
      },
    },
  },
};

module.exports = getPackageTailwindConfig({
  twConfig,
  resolver,
});
