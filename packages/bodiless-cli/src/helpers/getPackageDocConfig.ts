import path from 'path';
/* eslint-disable global-require, import/no-dynamic-require */

export const getPackageDocConfig = (rootPath: string, nameSpace: string = 'bodiless'): string[] => {
  try {
    const paths: string[] = [];
    const pkgJson = require(path.join(rootPath, '/package.json'));
    const deps = Object.keys({
      ...pkgJson.dependencies,
      ...pkgJson.devDependencies,
    });

    try {
      const docsJsonPath = path.join(rootPath, `${nameSpace}.docs.json`);
      require(docsJsonPath);
      paths.push(docsJsonPath);
    } catch (e) {
      // do nothing
    }

    deps.forEach(dep => {
      try {
        const depDocsJsonPath = require(path.join(dep, 'lib/getBodilessDocConfig'))
          .getBodilessDocs(nameSpace);
        paths.push(depDocsJsonPath[0]);
      } catch (e) {
        // do nothing
      }
    });
    return paths;
  } catch (e) {
    return [];
  }
};

export default getPackageDocConfig;
