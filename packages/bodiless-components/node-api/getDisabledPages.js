const path = require('path');
const fs = require('fs');

module.exports = () => {
  try {
    const sitePath = path.resolve();
    const disablePagesPath = `${sitePath}/src/data/site/disabled-pages.json`;
    const json = fs.readFileSync(disablePagesPath);
    const data = JSON.parse(json.toString());
    return data.disabledPages || {};
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log("No pages to disable. The file doesn't exist:", error.path);
    } else {
      console.error(error);
    }
    return [];
  }
};
