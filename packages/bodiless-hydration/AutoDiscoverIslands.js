const fs = require('fs');
const path = require('path');
const fg = require('fast-glob');

const getPackages = () => {
  const dependencies = [];
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const packageJSON = require(`${process.cwd()}/package.json`);
  const rootDependencies = Object.keys(packageJSON.dependencies);
  const traverse = (pkg) => {
    if (dependencies.includes(pkg)) return;
    try {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const packageJSON = require(`${pkg}/package.json`);
      dependencies.push(pkg);
      Object.keys(packageJSON.dependencies).forEach(child => traverse(child));
    } catch (error) {
      //
    }
  };
  rootDependencies.forEach(child => traverse(child));
  return dependencies;
};

const getScopedPackages = () => getPackages().filter(pkg => pkg.startsWith('@bodiless/') || pkg.startsWith('@kenvue/'));

const findIslands = (scopedPackages) => {
  const islands = [];

  Object.values(scopedPackages).forEach(pkg => {
    try {
      const packagePath = require.resolve(pkg);
      const files = fg.sync([
        `${path.dirname(packagePath)}/**/islands/*.js`,
      ]);
      files.forEach(file => {
        console.log(`[Island Autodiscovery] Discovered Island in file ${file}`);
        islands.push(file);
      });
    } catch (e) {
      //
    }
  });

  return islands;
};

const generateImports = (islands) => {
  let imports = 'import { loadable } from \'@bodiless/hydration\';\n';
  const exports = [];

  islands.forEach(file => {
    const filename = path.parse(file).name;
    const relativePath = file;
    exports.push(filename);
    imports += `const ${filename} = loadable(() => import('${relativePath}'));\n`;
  });

  imports += `module.exports={
    ${exports.join(',\n')}
  }`;
  return imports;
};

const main = (dest) => {
  const scopedPackages = getScopedPackages();

  const islands = findIslands(scopedPackages);
  const imports = generateImports(islands);

  if (imports) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true});
    }
    fs.writeFileSync(`${dest}/islands.js`, imports);
  }
};
main('.next/cache');
module.exports=main;
