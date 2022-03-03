import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getPackageEnvConfig } from '@bodiless/cli/lib/commands/generate-env-vars/getPackagesEnvConfig';

const packageRootDir = path.resolve(__dirname, '..');

export const getBodilessEnvConfig = () => getPackageEnvConfig(
  packageRootDir,
);
