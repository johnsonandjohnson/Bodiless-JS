import path from 'path';
import { getPackageDocConfig } from '@bodiless/cli/lib/helpers/getPackageDocConfig';

const packageRootDir = path.resolve(__dirname, '..');

export const getBodilessDocs = (namespace: string) => getPackageDocConfig(
  packageRootDir,
  namespace
);
