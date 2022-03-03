import { NormalModuleReplacementPlugin } from 'webpack';
import path from 'path';
import fs from 'fs';

const DEFAULT_MATCH = new RegExp(`\\${path.sep}tokens\\${path.sep}`);

export const cxShadowWebpackPlugin = (
  ...packages: string[]
) => new NormalModuleReplacementPlugin(
  DEFAULT_MATCH,
  (resource) => {
    const moduleName = path.basename(resource.request).split('.')[0];
    const foundPaths = packages
      .map(packageName => require.resolve(`${packageName}/${moduleName}`))
      .map(file => fs.existsSync(file))
      .filter(Boolean);
    if (foundPaths.length > 0) {
      const [foundPath] = foundPaths;
      // eslint-disable-next-line no-param-reassign
      resource.request = foundPath;
    }
  }
);
