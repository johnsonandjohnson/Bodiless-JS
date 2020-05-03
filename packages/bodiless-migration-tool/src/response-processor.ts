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

import fs from 'fs';
import { Response } from '@bodiless/headless-chrome-crawler/lib/puppeteer';
import debug from './debug';
import {
  isUrlExternal,
} from './helpers';

const jsYaml = require('js-yaml');

interface RedirectRule {
  [key:string]: {
    to: string,
    code: number,
  }
}

enum ExportFormat {
  Yaml = 'yaml',
}

export interface RedirectConfig {
  path: string,
  format: ExportFormat,
}

export default class ResponseProcessor {
  redirects: RedirectRule;

  constructor() {
    this.redirects = {};
  }

  public exportRedirects(redirectConfig: RedirectConfig): void {
    const format = redirectConfig.format || ExportFormat.Yaml;
    switch (format) {
      case ExportFormat.Yaml:
        fs.writeFile(redirectConfig.path, jsYaml.dump({ paths: this.redirects }), err => {
          if (err) throw err;
        });
        break;
      default:
        throw new Error('Unknown format is specified');
    }
  }

  public processRedirect(response: Response): void {
    if ([301, 302, 307, 308].indexOf(response.status()) !== -1) {
      const headers = response.headers();
      const from = ResponseProcessor.getRedirectPath(response.url()).replace(/\/$/g, '');
      const destUrl = headers.location;
      const destination = isUrlExternal(response.request().url(), destUrl)
        ? headers.location
        : ResponseProcessor.getRedirectPath(headers.location);
      debug(`scraped page redirected from ${from} to ${destination}.`);
      this.redirects[from] = {
        to: destination,
        code: response.status(),
      };
    }
  }

  private static getRedirectPath(url: string): string {
    return new URL(url).pathname;
  }
}
