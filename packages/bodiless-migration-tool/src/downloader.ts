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

/*
the purpose of this file is to provide utility
for downloading remote files to local file system
leveraging a nodejs library.

internal files will be downloaded only.
downloading of external files is skipped on purpose.
website url, from which resources will be donwloaded,
should be injected as a parameter to the class constructor
so that downloader can distinguish internal files from external.

request (https://www.npmjs.com/package/request) library is chosen as a http client
that is leveraged for downloading files.
*/
/* eslint class-methods-use-this: 0 */
import fs from 'fs';
import http from 'http';
import request from 'request';
import { Promise as BluebirdPromise } from 'bluebird';
import retryRequest from 'retry-request';
import {
  isUrlRelative,
  isUrlExternal,
  ensureDirectoryExistence,
  mapUrlToFilePath,
} from './helpers';
import debug from './debug';

export default class Downloader {
  pageUrl: string;

  downloadPath: string;

  excludePaths: Array<string> | undefined;

  constructor(pageUrl: string, downloadPath: string, excludePaths?: Array<string>) {
    this.pageUrl = pageUrl;
    this.downloadPath = downloadPath;
    this.excludePaths = excludePaths;
  }

  public async downloadFiles(resources: Array<string>) {
    const filteredResources = this.filterResources(resources);
    try {
      await BluebirdPromise.map(
        filteredResources,
        async resource => {
          try {
            await this.downloadFile(resource);
          } catch (e) {
            debug(e.message);
          }
        },
        { concurrency: 4 },
      );
    } catch (err) {
      debug(err);
    }
  }

  /**
    * filter external and already downloaded resources
    * also, preparing urls for downloading
  */
  private filterResources(resources: Array<string>): Array<string> {
    return resources
      // filter external resources
      .filter(resource => resource && !isUrlExternal(this.pageUrl, resource), this)
      // filter already downloaded resources
      .filter(resource => {
        const targetPath = this.getTargetPath(resource);
        return targetPath !== undefined && !fs.existsSync(targetPath);
      }, this)
      // map relative urls to absolute urls
      .map(resource => {
        if (!isUrlRelative(resource)) {
          return resource;
        }
        return (new URL(resource, this.pageUrl)).toString();
      });
  }

  private getTargetPath(resource: string): string | undefined {
    const targetPath = mapUrlToFilePath(resource, this.downloadPath);
    return targetPath ? decodeURIComponent(targetPath) : undefined;
  }

  private downloadFile(resource: string) {
    const targetPath = this.getTargetPath(resource);
    if (targetPath === undefined) {
      return Promise.reject(new Error(`target path for ${resource} is undefined`));
    }
    if (this.excludePaths && (this.excludePaths.indexOf(targetPath.replace(`${this.downloadPath}/`, '')) >= 0)) {
      return Promise.reject(new Error(`Resource ${resource} has been excluded from download.`));
    }

    ensureDirectoryExistence(targetPath);
    return new Promise((resolve, reject) => {
      const followRedirect = (resp: http.IncomingMessage) => {
        if (
          resp.statusCode
          && [301, 302, 307, 308].indexOf(resp.statusCode) !== -1
          && resp.headers.location
        ) {
          this.downloadFile(resp.headers.location);
          return false;
        }
        return true;
      }
      // @ts-ignore retryRequest does not have type definition for the function
      // that produces request.Request.
      const req: request.Request = retryRequest({
        uri: resource,
        followRedirect,
      });

      req
        .on('response', res => {
          if (res.statusCode >= 400) {
            return reject(new Error(`Resource ${resource} is not available for download.`));
          }
          if ([301, 302, 307, 308].indexOf(res.statusCode) !== -1) {
            return reject(new Error(`Resource ${resource} is redirected. No download.`));
          }
          return req.pipe(fs.createWriteStream(targetPath))
            .on('finish', resolve)
            .on('error', err => reject(new Error(`error on streaming ${resource}. ${err}.`)));
        })
        .on('error', err => reject(new Error(`error on downloading ${resource}. ${err}.`)));
    });
  }
}
