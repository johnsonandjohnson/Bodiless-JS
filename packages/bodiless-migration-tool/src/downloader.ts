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

type Downloaded = {
  targetPath: string;
  url: string;
};

type PrecheckResources = {
  EXISTS: Array<Downloaded>;
  EXTERNAL: Array<string>;
  DOWNLOAD: Array<string>;
};

export default class Downloader {
  pageUrl: string;

  downloadPath: string;

  excludePaths: Array<string> | undefined;

  constructor(
    pageUrl: string,
    downloadPath: string,
    excludePaths?: Array<string>,
  ) {
    this.pageUrl = pageUrl;
    this.downloadPath = downloadPath;
    this.excludePaths = excludePaths;
  }

  /**
   * Downloads array of urls, returns the original url with download path.
   *
   * @param resources - resource urls to be downloaded
   * @returns type Downloaded array.
   */
  public async downloadFiles(resources: Array<string>): Promise<Array<Downloaded>> {
    const precheck = this.precheckResources(resources);
    try {
      const result = await BluebirdPromise.map(
        precheck.DOWNLOAD,
        async (resource): Promise<Downloaded> => {
          try {
            const path = await this.downloadFile(resource);
            return {
              targetPath: path,
              url: resource,
            };
          } catch (e) {
            debug(e.message);
          }
          return {
            targetPath: '',
            url: resource,
          };
        },
        { concurrency: 4 },
      );
      return [...result, ...precheck.EXISTS];
    } catch (err) {
      debug(err);
      return [];
    }
  }

  /**
   * Precheck resources, split urls into 3 categories:
   *   DOWNLOAD: ready for download
   *   EXTERNAL: non-current host resources
   *   EXISTS: resource already in place
   *
   * Notes: instead of removing some resources, return all reources in different state,
   * let downloader decide what to download.
   */
  private precheckResources(resources: Array<string>): PrecheckResources {
    const precheckResources: PrecheckResources = {
      DOWNLOAD: [],
      EXISTS: [],
      EXTERNAL: [],
    };
    resources.forEach(resource => {
      // do nothing when the resource is empty
      if (!resource) {
        return;
      }
      if (isUrlExternal(this.pageUrl, resource)) {
        precheckResources.EXTERNAL.push(resource);
        return;
      }
      const targetPath = this.getTargetPath(resource);
      if (targetPath !== undefined && fs.existsSync(targetPath)) {
        precheckResources.EXISTS.push({
          url: resource,
          targetPath,
        });
        return;
      }
      if (!isUrlRelative(resource)) {
        precheckResources.DOWNLOAD.push(resource);
        return;
      }
      precheckResources.DOWNLOAD.push(new URL(resource, this.pageUrl).toString());
    }, this);
    return precheckResources;
  }

  private getTargetPath(resource: string): string | undefined {
    const targetPath = mapUrlToFilePath(resource, this.downloadPath);
    return targetPath ? decodeURIComponent(targetPath) : undefined;
  }

  private downloadFile(resource: string) {
    return new Promise<string>((resolve, reject) => {
      // @ts-ignore retryRequest does not have type definition for the function
      // that produces request.Request.
      const req: request.Request = retryRequest({ uri: resource });
      let target = resource;
      const targetPath = this.getTargetPath(target);
      return req
        .on('response', res => {
          if (res.statusCode >= 400) {
            return reject(
              new Error(`Resource ${resource} is not available for download.`),
            );
          }
          if (res.request.href !== resource) {
            target = res.request.href;
          }
          if (targetPath === undefined) {
            return Promise.reject(
              new Error(`target path for ${target} is undefined`),
            );
          }
          if (
            this.excludePaths && this.excludePaths.indexOf(
              targetPath.replace(`${this.downloadPath}/`, ''),
            ) >= 0
          ) {
            return Promise.reject(
              new Error(`Resource ${target} has been excluded from download.`),
            );
          }
          ensureDirectoryExistence(targetPath);
          return req.pipe(fs.createWriteStream(targetPath))
            .on('finish', () => {
              resolve(targetPath);
            })
            .on('error', err => reject(new Error(`error on streaming ${resource}. ${err}.`)));
        })
        .on('error', err => reject(new Error(`error on downloading ${resource}. ${err}.`)));
    });
  }
}
