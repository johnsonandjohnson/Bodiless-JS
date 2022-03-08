import path from 'path';
import { getPackageDocConfig } from './helpers/getPackageDocConfig';

const packageRootDir = path.resolve(__dirname, '..');

export const getBodilessDocs = (namespace: string) => getPackageDocConfig(
  packageRootDir,
  namespace
);
