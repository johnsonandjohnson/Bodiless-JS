import path from 'path';
/* eslint-disable global-require, import/no-dynamic-require */

export const getPackageEnvConfig = (rootPath: string): string[] => {
  try {
    const paths: string[] = [];
    const pkgJson = require(path.join(rootPath, '/package.json'));
    const deps = Object.keys({
      ...pkgJson.dependencies,
      ...pkgJson.devDependencies,
    });

    try {
      const docsJsonPath = path.join(rootPath, 'bodiless.env.config.js');
      require(docsJsonPath);
      paths.push(docsJsonPath);
    } catch (e) {
      // do nothing
    }

    deps.forEach(dep => {
      try {
        const depDocsJsonPath = require(path.join(dep, 'lib/getBodilessEnvConfig'))
          .getBodilessEnvConfig();
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

export default getPackageEnvConfig;
