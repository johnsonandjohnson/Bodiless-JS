/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

module.exports = {
  configure: async (defaultConfig) => {
    const finalConfig = { ...defaultConfig };
    return finalConfig;
  },
};
