import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, parse } from 'path';
import fg from 'fast-glob';

const getPackages = () => {
  const dependencies: string[] = [];
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const packageJSON = require(`${process.cwd()}/package.json`);
  const rootDependencies = Object.keys(packageJSON.dependencies);
  const traverse = (pkg: string) => {
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

const findIslands = (scopedPackages: string[]) => {
  const islands: string[] = [];

  Object.values(scopedPackages).forEach(pkg => {
    try {
      const packagePath = require.resolve(pkg);
      const files = fg.sync([
        `${dirname(packagePath)}/**/islands/*.js`,
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

const generateImports = (islands: string[]) => {
  let imports = 'import { loadable } from \'@bodiless/hydration\';\n';
  const exports: string[] = [];

  islands.forEach(file => {
    const filename = parse(file).name;
    const relativePath = file;
    exports.push(filename);
    imports += `const ${filename} = loadable(() => import('${relativePath}'));\n`;
  });

  imports += `module.exports={
    ${exports.join(',\n')}
  }`;
  return imports;
};

const AutoDiscoverIslands = (dest: string) => {
  const scopedPackages = getScopedPackages();

  const islands = findIslands(scopedPackages);
  const imports = generateImports(islands);

  if (imports) {
    if (!existsSync(dest)) {
      mkdirSync(dest, { recursive: true});
    }
    writeFileSync(`${dest}/islands.js`, imports);
  }
};
export default AutoDiscoverIslands;
