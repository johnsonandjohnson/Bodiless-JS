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
  let keys = Object.keys(map);
  if (explicitPackages) {
    keys = intersection(keys, explicitPackages);
  }
  if (keys.length && !force) {
    const packageJson = fs.readFileSync(path.join('.', 'package.json'));
    const packageJsonData = JSON.parse(packageJson.toString());
    const { dependencies, devDependencies } = packageJsonData;
    const depNames = [...Object.keys(dependencies || {}), ...Object.keys(devDependencies || {})];
    keys = intersection(keys, depNames);
  }
  return pick(map, keys);
};

/**
 * Defines the 'pack' command.
 */
export default class Pack extends Command {
  static description = 'Pack and install dependencies from a local monorepo.';

  static examples = [
    '$ bodiless pack -r /path/to/local/monorepo',
    '$ bodiless pack -s /path/to/site',
  ];

  static flags = {
    help: commandFlags.help({ char: 'h' }),
    package: commandFlags.string({
      char: 'p',
      multiple: true,
      parse: p => p.trim(),
      description: 'Name of package to bundle. May be specified more than once. If omitted, will bundle all matching dependencies.',
    }),
    'skip-install': commandFlags.boolean({
      description: 'Only pack, do not install.',
    }),
    force: commandFlags.boolean({
      char: 'f',
      description: 'Install packages even if they are not existing dependencies of the site',
    }),
    'dry-run': commandFlags.boolean({
      description: 'Do not pack or install. Just show list of matching packages.',
    }),
    site: commandFlags.string({
      char: 's',
      default: '.',
      parse: s => s.trim(),
      description: 'Path to the site into which you wish to install packages, relative to the current directory.',
    }),
    repo: commandFlags.string({
      char: 'r',
      default: '.',
      parse: r => r.trim(),
      description: 'Path to the local lerna monorepo, relative to the current directory. Must contain the package source in a `packages` directory.',
    }),
  };

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
      const { flags } = this.parse(Pack);
      const repo = path.resolve(flags.repo);
      const site = path.resolve(flags.site);
      const destIsSrc = repo === site;
      if (destIsSrc) {
        this.warn('Monorepo and site paths are the same. Assuming --force and --skip-install.');
      }
      process.chdir(site);
      const packageMap = this.getPackageMap(path.join(repo, 'packages'));
      // Cast is necessary bc typings do not prpperly handle multiple flags with parse functions.
      // Type of flags.package is string and should be string[].
      const { package: explicitPackages } = flags as any as { package: string[] };
      const deps = getDepsToReplace(packageMap, explicitPackages, flags.force || destIsSrc);
      if (isEmpty(deps)) {
        this.error('No matching dependencies to pack. Use --force (-f) to pack anyway.');
      }
      if (flags['dry-run']) {
        const list = Object.keys(deps).join(', ');
        this.log(`Dry run. Packages which would be packed/installed: ${list}`);
        this.exit(0);
      }
      const spawner = new Spawner(repo);
      await packDeps(deps, spawner);
      if (!flags['skip-install'] && !destIsSrc) {
        await installDeps(deps, spawner);
      }
      this.log('Done');
    } catch (e) {
      this.error(e);
    }
  }
}
