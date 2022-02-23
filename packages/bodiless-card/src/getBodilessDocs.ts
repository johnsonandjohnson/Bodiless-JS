import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getPackageDocsJson } from '@bodiless/documentation/lib/blDocsBuild';

const packageRootDir = path.resolve(__dirname, '..');

export const getBodilessDocs = (namespace: string) => getPackageDocsJson(
  packageRootDir,
  namespace
);
