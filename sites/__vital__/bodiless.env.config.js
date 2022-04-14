const fs = require('fs');
const path = require('path');

module.exports = {
  configure: async (defaultConfig) => {
    if (defaultConfig && typeof defaultConfig.BODILESS_SEARCH_CONFIG === 'string') {
      const confFilePath = path.resolve(defaultConfig.BODILESS_SEARCH_CONFIG);
      if (fs.existsSync(confFilePath) && fs.lstatSync(confFilePath).isFile()) {
        const searchConf = JSON.parse(fs.readFileSync(confFilePath, 'utf8'));
        return {
          ...defaultConfig,
          BODILESS_SEARCH_PARAMS: JSON.stringify(searchConf),
        };
      }
    }
    return defaultConfig;
  },
};
