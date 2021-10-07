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

import fs from 'fs';
import path from 'path';
import url from 'url';

export function trimQueryParamsFromUrl(sourceUrl: string) {
  // https://stackoverflow.com/a/2541083
  return sourceUrl.split('?')[0];
}

// https://stackoverflow.com/questions/13542667/create-directory-when-writing-to-file-in-node-js
export function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
  return true;
}

export function mapUrlToFilePath(inputUrl: string, targetDir: string): string | undefined {
  const assetPath = url.parse(inputUrl).pathname;
  return assetPath ? path.join(targetDir, assetPath) : undefined;
}

export function getUrlToLocalDirectoryMapper(targetDir: string): Function {
  return function getUrlToLocalDirectory(inputUrl: string): string {
    return path.resolve(mapUrlToFilePath(inputUrl, targetDir) || targetDir, '..');
  };
}

function stripWWW(host: string): string {
  return host.replace(/^www\./, '');
}

export function isUrlExternal(baseUrl: string, targetUrl: string) {
  const hasTargetUrlHost = url.parse(targetUrl, true, true).host !== null;
  const baseUrlHost = url.parse(baseUrl).host || '';
  const targetUrlHost = url.parse(targetUrl).host || '';
  return hasTargetUrlHost
    && stripWWW(baseUrlHost) !== stripWWW(targetUrlHost);
}

export function isUrlRelative(path1: string) {
  return url.parse(path1).host === null && path1.indexOf('//') !== 0;
}

function isJavascriptProtocolUrl(url1: string): boolean {
  // eslint-disable-next-line no-script-url
  return url1.startsWith('javascript:');
}

function isFragmentOnly(url1: string): boolean {
  return url1.match(/^#/g) !== null;
}

export function getHostNameWithoutWWW(host: string): string {
  const hostName = url.parse(host).hostname || '';
  return stripWWW(hostName);
}

export function transformRelativeUrlToInternal(relativeUrl: string, pageUrl: string): string {
  if (isJavascriptProtocolUrl(relativeUrl) || isFragmentOnly(relativeUrl)) {
    return relativeUrl;
  }
  const fullUrl = url.resolve(pageUrl, relativeUrl);
  const pathName = url.parse(fullUrl).pathname || '';
  const query = url.parse(fullUrl).search || '';
  const fragment = url.parse(fullUrl).hash || '';
  return pathName.concat(query).concat(fragment);
}

export function transformAbsoluteUrlToRelative(absoluteUrl: string, pageUrl: string): string {
  if (!absoluteUrl || !pageUrl) {
    return absoluteUrl;
  }
  if (isJavascriptProtocolUrl(absoluteUrl)) {
    return absoluteUrl;
  }
  const firstHostName = getHostNameWithoutWWW(absoluteUrl);
  const secondHostName = getHostNameWithoutWWW(pageUrl);
  if (firstHostName && firstHostName === secondHostName) {
    const path1 = url.parse(absoluteUrl).path || '';
    const fragment = url.parse(absoluteUrl).hash || '';
    return path1.concat(fragment);
  }
  return absoluteUrl;
}

export function removeTrailingSlashFromUrl(pageUrl: string): string {
  if (!pageUrl || isJavascriptProtocolUrl(pageUrl)) {
    return pageUrl;
  }
  const parsedUrl = url.parse(pageUrl);
  if (!parsedUrl.pathname || parsedUrl.pathname === '/') {
    return pageUrl;
  }
  const { length } = parsedUrl.pathname;
  const hasSlash = parsedUrl.pathname.charAt(length - 1) === '/';
  if (hasSlash) {
    parsedUrl.pathname = parsedUrl.pathname.slice(0, -1);
  }
  return url.format(parsedUrl);
}

export function isUrlWithExtension(url1:string): boolean {
  return (new RegExp(/\.[^/.]+$/)).test(url1);
}

export function addTrailingSlashToUrl(pageUrl: string): string {
  if (!pageUrl || isJavascriptProtocolUrl(pageUrl) || isUrlWithExtension(pageUrl)) {
    return pageUrl;
  }
  const parsedUrl = url.parse(pageUrl);
  if (!parsedUrl.pathname) {
    return pageUrl;
  }
  const { length } = parsedUrl.pathname;
  const hasSlash = parsedUrl.pathname.charAt(length - 1) === '/';
  if (!hasSlash) {
    parsedUrl.pathname += '/';
  }
  return url.format(parsedUrl);
}

export function deleteFolderRecursive(path1: string) {
  if (fs.existsSync(path1)) {
    fs.readdirSync(path1).forEach(file => {
      const curPath = `${path1}/${file}`;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path1);
  }
}

export function removeAllFilesFromDir(directory: string) {
  // https://stackoverflow.com/questions/27072866/how-to-remove-all-files-from-directory-without-removing-directory-in-node-js/42182416
  const files = fs.readdirSync(directory);
  /* eslint no-restricted-syntax: 1 */
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      deleteFolderRecursive(fullPath);
    } else {
      fs.unlinkSync(fullPath);
    }
  }
}

export function cfDecodeEmail(encodedString: string) {
  // https://usamaejaz.com/cloudflare-email-decoding/
  let email = '';
  const r = parseInt(encodedString.substr(0, 2), 16);
  let n;
  let i;
  for (n = 2; encodedString.length - n; n += 2) {
    // eslint-disable-next-line no-bitwise
    i = parseInt(encodedString.substr(n, 2), 16) ^ r;
    email += String.fromCharCode(i);
  }
  return email;
}

export function prependProtocolToBareUrl(url$: string, protocol = 'https://') {
  if (!url$.match(/^[a-zA-Z]+:\/\//)) {
    return protocol + url$;
  }
  return url$;
}

/**
 * function that strips extension from url
 * @param pageUrl - page url from which extension should be stripped
 * @returns url - path url with stripped extension
 *
 * @example
 * // return /products
 * // removeExtensionFromUrl('/products.html')
 */
export function removeExtensionFromUrl(pageUrl: string) {
  return pageUrl.replace(/\.[^/.]+$/, '');
}
