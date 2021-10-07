/**
 * Copyright © 2019 Johnson & Johnson
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

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["setEnvVar"] }] */
import fs from 'fs';
import path from 'path';
import util from 'util';
import shelljs from 'shelljs';
import simplegit from 'simple-git/promise';
import {
  deleteFolderRecursive,
  removeAllFilesFromDir,
} from './helpers';
import debug from './debug';

export type JamStackAppParams = {
  gitRepository?: string,
  workDir: string,
  disableTailwind?: boolean,
};

export type JamStackApp = {
  clean(): void,
  setup(): Promise<void>
  startDev(): Promise<void>
  build(): Promise<void>
  serve(): Promise<void>
  getPagesDir(): string
  getSiteDataDir(): string
  getStaticDir(): string
};

export class GatsbyApp implements JamStackApp {
  params: JamStackAppParams;

  constructor(params: JamStackAppParams) {
    this.params = params;
    this.prepare();
    this.setupEnvVars();
  }

  public clean() {
    deleteFolderRecursive(this.params.workDir);
  }

  public async setup() {
    debug('setting up application');
    const cwd = shelljs.pwd();
    await this.setupRepository();
    this.cleanPages();
    this.patchApp();
    this.installPackages();
    shelljs.cd(cwd);
  }

  public async startDev() {
    this.setWorkDir();
    shelljs.exec('npm run build');
  }

  public async build() {
    this.setWorkDir();
    shelljs.exec('npm run build');
  }

  public async serve() {
    this.setWorkDir();
    shelljs.cd(this.getWorkSiteDir());
    const cmd = util.format('%s serve --host=%s', path.resolve('node_modules/.bin/gatsby'), '0.0.0.0');
    shelljs.exec(cmd);
  }

  public getWorkSiteDir() {
    return this.params.workDir;
  }

  public getPagesDir() {
    return path.resolve(this.getWorkSiteDir(), 'src/data/pages');
  }

  public getSiteDataDir() {
    return path.resolve(this.getWorkSiteDir(), 'src/data/site');
  }

  public getStaticDir() {
    return path.resolve(this.getWorkSiteDir(), 'static');
  }

  private prepare() {
    if (!fs.existsSync(this.params.workDir)) {
      fs.mkdirSync(this.params.workDir);
    }
  }

  private setWorkDir() {
    shelljs.cd(this.params.workDir);
  }

  private async setupRepository() {
    if (!this.isCloned()) {
      debug('cloning repository');
      await this.cloneRepository();
    } else {
      debug('resetting repository');
      await this.resetRepository();
    }
  }

  private setEnvVar(envFile: string, envVar: string, val: string): string {
    const envFileByLine = envFile.toString().split('\n');
    const envVarLine = envFileByLine.find(line => line.includes(envVar));

    if (envVarLine) {
      envFileByLine.splice(envFileByLine.indexOf(envVarLine), 1, `${envVar}='${val}'`);
      return envFileByLine.join('\n');
    }

    return [...envFileByLine, `${envVar}='${val}'\n`].join('\n');
  }

  private setupEnvVars(): void {
    if (this.params.disableTailwind) {
      const envFilePath = path.join(this.params.workDir, '.env.site');

      if (fs.existsSync(envFilePath)) {
        const envFile = fs.readFileSync(envFilePath, 'utf8');
        const updatedEnvFile = this.setEnvVar(envFile, 'BODILESS_TAILWIND_THEME_ENABLED', '0');

        fs.writeFileSync(envFilePath, updatedEnvFile, 'utf8');
      }
    }
  }

  private async cloneRepository() {
    if (this.params.gitRepository === undefined) {
      throw new Error('git repository is not set');
    }
    const git = simplegit(this.params.workDir);
    await git.clone(this.params.gitRepository, this.params.workDir);
  }

  private isCloned(): boolean {
    const gitPath = path.join(this.params.workDir, '.git');
    return fs.existsSync(gitPath);
  }

  private async resetRepository() {
    const git = simplegit(this.params.workDir);
    await git.clean('f', ['-d']);
    await git.reset();
  }

  private installPackages() {
    this.setWorkDir();
    // do not use npm install --prefix due to npm issue on windows - https://github.com/npm/npm/issues/20245
    shelljs.cd(this.getWorkSiteDir());
    shelljs.exec('npm install --save --package-lock-only --no-package-lock html-loader');
    shelljs.exec('npm install --save --package-lock-only --no-package-lock gatsby-plugin-root-import');
    this.setWorkDir();
    shelljs.exec('npm run setup');
  }

  private cleanPages() {
    removeAllFilesFromDir(this.getPagesDir());
  }

  private patchApp() {
    const confPath = path.resolve(__dirname, '..', 'conf');
    const gatsbyConfig = path.resolve(confPath, 'gatsby-config.js');
    fs.copyFileSync(gatsbyConfig, path.resolve(this.getWorkSiteDir(), 'gatsby-config.js'));
    const gatsbyNode = path.resolve(confPath, 'gatsby-node.js');
    fs.copyFileSync(gatsbyNode, path.resolve(this.getWorkSiteDir(), 'gatsby-node.js'));
  }
}
