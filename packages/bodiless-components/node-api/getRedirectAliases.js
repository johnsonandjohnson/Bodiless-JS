const path = require('path');
const fs = require('fs');

module.exports = () => {
  try {
    const sitePath = path.resolve();
    const aliasesPath = `${sitePath}/src/data/site/redirect-aliases.json`;
    const json = fs.readFileSync(aliasesPath);
    const data = JSON.parse(json.toString());
    return data || {};
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log("No redirect aliases found. The file doesn't exist:", error.path);
    } else {
      console.error(error);
    }
    return [];
  }
};
