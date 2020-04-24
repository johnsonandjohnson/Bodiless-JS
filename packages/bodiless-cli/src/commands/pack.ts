/**
 * Copyright © 2020 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Command, flags as commandFlags } from '@oclif/command';
import * as fs from 'fs-extra';
import * as path from 'path';
import { pick, isEmpty, intersection } from 'lodash';
import Spawner from '../helpers/Spawner';

/**
 * A map of all packages in a monoreop, containing tarball name and source directory,
 * keyed by package name.
 */
type PackageMap = {
  [pkg: string]: {
    dir: string,
    tarball: string,
  },
};

/**
 * Packs dependencies for bundling.
 */
async function packDeps(map: PackageMap, spawner: Spawner) {
  const packages = Object.keys(map);
  for (let i = 0; i < packages.length; i += 1) {
    // We don't paralellize this so that the output is not interleaved.
    // eslint-disable-next-line no-await-in-loop
    await spawner.spawn('npm', 'pack', map[packages[i]].dir);
  }
}

/**
 * Installs bunled dependencies.
 */
async function installDeps(map: PackageMap, spawner: Spawner) {
  const args = [
    'npm',
    'install',
    ...Object.values(map).map(({ tarball }) => path.join('.', tarball)),
  ];
  await spawner.spawn(...args);
}


/**
 * Filters a dependency map to remove any not required by the site.
 */
const getDepsToReplace = (map: PackageMap, explicitPackages?: string[], force: boolean = false) => {
  const packageJson = fs.readFileSync(path.join('.', 'package.json'));
  const packageJsonData = JSON.parse(packageJson.toString());
  const { dependencies, devDependencies } = packageJsonData;
  let depNames = [...Object.keys(dependencies || {}), ...Object.keys(devDependencies || {})];
  if (explicitPackages) {
    depNames = force ? explicitPackages : intersection(explicitPackages, depNames);
  }
  return pick(map, depNames);
};


/**
 * Defines the 'pack' command.
 */
export default class Pack extends Command {
  static description = 'Pack and install dependencies from a local monorepo.';

  static examples = [
    '$ bl-dev pack /path/to/local/monorepo',
  ];

  static flags = {
    help: commandFlags.help({ char: 'h' }),
    package: commandFlags.string({
      char: 'p',
      multiple: true,
      description: 'Name of package to bundle. may be specified more than once. If omitted, will bundle all matching dependencies',
    }),
    'skip-install': commandFlags.boolean({
      description: 'Only pack, do not install.',
    }),
    force: commandFlags.boolean({
      char: 'f',
      description: 'Install packages even if not current dependencies',
    }),
    site: commandFlags.string({
      description: 'Path to the site into which you wish to install packages. Defaults to current directory',
    }),
  };

  static args = [{
    name: 'repo',
    description: 'Path to the local monorepo, relative to the current directory',
    required: true,
  }];

  /**
   * Gets a map of all packages in a monorepo, containing tarball name and directory keyed by
   * package name.
   */
  getPackageMap(packagesDir: string) {
    return fs.readdirSync(packagesDir).reduce((map, name) => {
      const dir = path.join(packagesDir, name);
      const stats = fs.statSync(dir);
      if (stats.isDirectory()) {
        try {
          const packageJson = fs.readFileSync(`${dir}/package.json`);
          const packageJsonData = JSON.parse(packageJson.toString());
          const tarballName = packageJsonData.name.replace(/@(.+)\//, '$1-');
          const tarball = `${tarballName}-${packageJsonData.version}.tgz`;
          return { ...map, [packageJsonData.name]: { tarball, dir } };
        } catch (e) {
          this.warn(e);
        }
      }
      return map;
    }, {});
  }

  async run() {
    try {
      const { args, flags } = this.parse(Pack);
      if (flags.site) {
        process.chdir(flags.site);
      }
      const packageMap = this.getPackageMap(path.join(args.repo, 'packages'));
      const { package: explicitPackages } = flags;
      const deps = getDepsToReplace(packageMap, explicitPackages, flags.force);
      if (isEmpty(deps)) {
        this.error('No matching packages');
      }
      const spawner = new Spawner(path.resolve(args.repo));
      await packDeps(deps, spawner);
      if (!flags['skip-install']) {
        await installDeps(deps, spawner);
      }
      this.log('Done');
    } catch (e) {
      this.error('An unexpected error was encountered');
      this.error(e);
    }
  }
}
