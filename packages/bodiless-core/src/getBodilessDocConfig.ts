import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getPackageDocConfig } from '@bodiless/documentation/lib/blDocsBuild';

const packageRootDir = path.resolve(__dirname, '..');

export const getBodilessDocs = (namespace: string) => getPackageDocConfig(
  packageRootDir,
  namespace
);
