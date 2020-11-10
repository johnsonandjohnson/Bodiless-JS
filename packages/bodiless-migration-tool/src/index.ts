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

/* eslint class-methods-use-this: 0 */
import { Command, flags } from '@oclif/command';
import fs from 'fs';
import {
  SiteFlattener,
  SiteFlattenerParams,
  TrailingSlash,
} from './site-flattener';
import postBuild from './post-build';
import page404Handler from './page404-handler';
import loadSettings from './loadSettings';

enum CommandType {
  Flatten = 'flatten',
  Postbuild = 'postbuild'
}

class MigrationTool extends Command {
  static description = 'site flattenning tool';

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
  };

  static args = [
    { name: 'command' },
    { name: 'staticDir' },
  ];

  async run() {
    const { args } = this.parse(MigrationTool);
    const command = args.command || CommandType.Flatten;
    const { staticDir } = args;
    switch (command) {
      case CommandType.Flatten:
        return this.flatten();
      case CommandType.Postbuild:
        if (!fs.existsSync(staticDir)) {
          throw new Error('path to static site is not specified');
        }
        return this.postbuild(staticDir);
      default:
        throw new Error('unknown command is specified');
    }
  }

  async flatten() {
    const settings = loadSettings();
    const page404Params = page404Handler.getParams(settings);
    const page404Urls = page404Params.page404Url ? [page404Params.page404Url] : [];
    const flattenerParams: SiteFlattenerParams = {
      websiteUrl: settings.url,
      pageCreatorParams: settings.pageCreator,
      workDir: this.getWorkDir(),
      gitRepository: this.getGitRepo(),
      reservedPaths: ['404'],
      scraperParams: {
        pageUrls: [
          ...page404Urls,
          settings.url,
        ],
        maxDepth: settings.crawler.maxDepth,
        maxConcurrency: settings.crawler.maxConcurrency || 1,
        obeyRobotsTxt: settings.crawler.ignoreRobotsTxt !== true,
        javascriptEnabled: true,
      },
      page404Params,
      steps: {
        setup: false,
        scrape: true,
        startDev: false,
        build: false,
        serve: false,
      },
      trailingSlash: settings.trailingSlash || TrailingSlash.Add,
      transformers: settings.transformers || [],
      exports: settings.exports || {},
      htmltojsx: true,
      disableTailwind: settings.disableTailwind === undefined ? true : settings.disableTailwind,
      allowFallbackHtml: settings.allowFallbackHtml === undefined
        ? true
        : (settings.allowFallbackHtml === true),
    };
    const flattener = new SiteFlattener(flattenerParams);
    await flattener.start();
  }

  async postbuild(staticSiteDir: string) {
    postBuild(staticSiteDir);
  }

  private getWorkDir(): string {
    return process.cwd();
  }

  private getGitRepo(): string {
    return process.env.git_repo || 'https://github.com/johnsonandjohnson/bodiless-js.git';
  }
}

export = MigrationTool;
