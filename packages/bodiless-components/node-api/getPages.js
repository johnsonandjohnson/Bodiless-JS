const path = require('path');
const fs = require('fs');

const getFiles = async (dir) => {
  const dirents = await fs.readdirSync(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
};

const parentDir = (path) => path.split('/').slice(0, -1).join('/');

module.exports = async () => {
  try {
    const sitePath = path.resolve();
    const pagesPath = `${sitePath}/src/data/pages`;
    const allowedFileNames = ['index.jsx', 'index.tsx', 'index.json'];
    const dirContent = await getFiles(pagesPath);
    const indexFiles = dirContent.filter(
      (filename) => allowedFileNames.some(end => filename.endsWith(end))
    );
    const pages = indexFiles.map(filename => {
      let cleanedFilename = filename;
      allowedFileNames.forEach(file => { cleanedFilename = cleanedFilename.replace(`/${file}`, ''); });
      return cleanedFilename.replace(pagesPath, '');
    }) || [];

    // Looks for path without index file which parent has subpage_template defined.
    const directories = dirContent.map((file) => parentDir(file));
    const subpages = [...new Set(directories)].filter((path) => {
      if (
        !allowedFileNames.some(allowedFile => fs.existsSync(`${path}/${allowedFile}`))
        && fs.existsSync(`${parentDir(path)}/index.json`)) {
        const json = fs.readFileSync(`${parentDir(path)}/index.json`);
        const data = JSON.parse(json.toString());
        if (data['#subpage_template']) {
          return true;
        }
      }
      return false;
    });

    return [...pages, ...subpages.map(filename => filename.replace(pagesPath, ''))];
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log("No pages available. The directory doesn't exist:", error.path);
    } else {
      console.error(error);
    }
    return [];
  }
};
